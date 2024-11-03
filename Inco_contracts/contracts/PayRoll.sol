// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import "fhevm/lib/TFHE.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract PayRoll is Ownable, ReentrancyGuard {
    // ERC20 token instance for interaction with a specified token
    IERC20 public token;

    // Hyperlane mailbox address for inter-chain communication
    address public mailbox = 0xB77B34ecc3E9B432C4E38AbCC15c7EA11e07f54c;

    // Remote contract address on another chain
    address public remoteContract;

    // Remote domain ID in Hyperlane, used to identify the destination chain
    uint32 public remoteDomain;

    // Tracks the last transaction amount for quick reference
    uint256 public lastAmount;

    // Sets token decimals (18 for standard ERC20 tokens like Ether)
    uint256 private constant TOKEN_DECIMALS = 18;

    // Mapping to store encrypted balances for each user address
    mapping(address => euint32) private ownerToBalance;

    /**
     * @dev Constructor initializes the owner and sets the remote domain ID
     */
    constructor() Ownable(msg.sender) {
        remoteDomain = 1320; // Example domain ID, set to your remote chain’s domain
    }

    /**
     * @dev Sets the remote contract address for cross-chain messages
     * @param _remoteContract The address of the corresponding contract on the remote chain
     */
    function initialize(address _remoteContract) external onlyOwner {
        remoteContract = _remoteContract;
    }

    /**
     * @dev Dispatches a message to mint tokens on the remote chain
     * @param amount The amount of tokens to mint
     * @param owner The address of the owner to receive the minted tokens
     */
    function dispatchTokens(uint256 amount, address owner) internal {
        require(amount > 0, "Amount must be greater than 0");

        // Encode the message with the owner’s address and the amount
        bytes memory message = abi.encode(owner, amount);

        // Dispatch message to remote chain’s mailbox
        IMailbox(mailbox).dispatch(
            remoteDomain,
            addressToBytes32(remoteContract),
            message
        );
    }

    /**
     * @dev Handles incoming messages from the remote chain
     * Updates balance of the specified user
     * @param _origin The domain ID of the source chain
     * @param _sender The contract address on the source chain
     * @param _data Payload with user address and token amount
     */
    function handle(
        uint32 _origin,
        bytes32 _sender,
        bytes calldata _data
    ) public payable onlyMailbox {
        require(_origin == remoteDomain, "Invalid source domain");
        require(_sender == bytes32(addressToBytes32(remoteContract)), "Invalid source contract");

        // Decode data to get user address and amount
        (address user, uint32 amount) = abi.decode(_data, (address, uint32));

        // Check if the balance is initialized, if so, add the new amount to the existing balance
        if (TFHE.isInitialized(ownerToBalance[user])) {
            TFHE.allow(ownerToBalance[user], address(this));
            euint32 lastBalance = ownerToBalance[user];
            ownerToBalance[user] = TFHE.add(TFHE.asEuint32(amount), lastBalance);
            lastAmount = amount;
        } else {
            // If not initialized, set balance to 0 and then add the amount
            ownerToBalance[user] = TFHE.asEuint32(0);
            TFHE.allow(ownerToBalance[user], address(this));
            euint32 lastBalance = ownerToBalance[user];
            ownerToBalance[user] = TFHE.add(TFHE.asEuint32(amount), lastBalance);
            lastAmount = amount;
        }

        // Allow this contract, sender, and user to access the updated balance
        TFHE.allow(ownerToBalance[user], address(this));
        TFHE.allow(ownerToBalance[user], msg.sender);
        TFHE.allow(ownerToBalance[user], user);
    }

    /**
     * @dev Distributes funds to a list of users with encrypted amounts
     * @param owner The address of the fund owner
     * @param users Array of user addresses to receive funds
     * @param amount Array of encrypted amounts to distribute
     * @param inputProof Proof for encrypted input (required for FHE operations)
     */
    function distributeFunds(
        address owner,
        address[] calldata users,
        einput[] calldata amount,
        bytes calldata inputProof
    ) external {
        lastAmount++;

        // Initialize cumulative amount for tracking total distribution
        euint32 cumulativeAmount = TFHE.asEuint32(0);

        // Loop through users and distribute funds
        for (uint256 i = 0; i < users.length; i++) {
            euint32 encryptedValueFormatted = TFHE.asEuint32(amount[i], inputProof);
            cumulativeAmount = TFHE.add(cumulativeAmount, encryptedValueFormatted);

            // Check if the balance is initialized for each user
            if (TFHE.isInitialized(ownerToBalance[users[i]])) {
                TFHE.allow(ownerToBalance[users[i]], address(this));
                ownerToBalance[users[i]] = TFHE.add(ownerToBalance[users[i]], encryptedValueFormatted);
            } else {
                // If not initialized, set balance to 0 and then add encrypted amount
                ownerToBalance[users[i]] = TFHE.asEuint32(0);
                TFHE.allow(ownerToBalance[users[i]], address(this));
                ownerToBalance[users[i]] = TFHE.add(ownerToBalance[users[i]], encryptedValueFormatted);
            }

            // Allow this contract, sender, and user to access the updated balance
            TFHE.allow(ownerToBalance[users[i]], address(this));
            TFHE.allow(ownerToBalance[users[i]], msg.sender);
            TFHE.allow(ownerToBalance[users[i]], users[i]);
        }

        // Subtract cumulative amount from the owner's balance
        TFHE.allow(ownerToBalance[owner], address(this));
        ownerToBalance[owner] = TFHE.sub(ownerToBalance[owner], cumulativeAmount);
        TFHE.allow(ownerToBalance[owner], address(this));
        TFHE.allow(ownerToBalance[owner], msg.sender);
    }

    /**
     * @dev Transfers encrypted funds between two addresses
     * @param owner The address of the funds sender
     * @param receiver The address of the funds receiver
     * @param encryptedAmount Encrypted transfer amount
     * @param inputProof Proof for encrypted input (required for FHE operations)
     */
    function transferFunds(
        address owner,
        address receiver,
        einput encryptedAmount,
        bytes calldata inputProof
    ) public {
        euint32 amount = TFHE.asEuint32(encryptedAmount, inputProof);

        // Allowances for sender and receiver to access the modified balances
        TFHE.allow(ownerToBalance[receiver], address(this));
        TFHE.allow(ownerToBalance[owner], msg.sender);

        // Update balances using FHE add and subtract operations
        ownerToBalance[receiver] = TFHE.add(ownerToBalance[receiver], amount);
        ownerToBalance[owner] = TFHE.sub(ownerToBalance[owner], amount);

        // Update permissions for post-transaction access
        TFHE.allow(ownerToBalance[receiver], address(this));
        TFHE.allow(ownerToBalance[owner], msg.sender);
        TFHE.allow(ownerToBalance[owner], owner);
        TFHE.allow(ownerToBalance[receiver], receiver);
    }

    /**
     * @dev Returns the encrypted balance of a user
     * @param _userAddress Address of the user
     * @return Encrypted balance of the user
     */
    function balanceOfUser(address _userAddress)
        external
        view
        returns (euint32)
    {
        return ownerToBalance[_userAddress];
    }

    /**
     * @dev Withdraws funds for a user and sends a message to mint tokens on the remote chain
     * @param owner Address of the user withdrawing funds
     * @param amount Amount to withdraw
     */
    function withdrawFunds(address owner, uint32 amount) external {
        TFHE.allow(ownerToBalance[owner], msg.sender);
        TFHE.allow(ownerToBalance[owner], address(this));

        // Set user balance to 0 on the local chain
        ownerToBalance[owner] = TFHE.asEuint32(0);

        // Allow access for future operations
        TFHE.allow(ownerToBalance[owner], msg.sender);
        TFHE.allow(ownerToBalance[owner], address(this));

        // Dispatch the withdrawal message to mint tokens on remote chain
        dispatchTokens(uint256(amount) * (10**TOKEN_DECIMALS), owner);
    }

    /**
     * @dev Converts an address to bytes32 for compatibility with Hyperlane
     * @param _addr Address to be converted
     */
    function addressToBytes32(address _addr) internal pure returns (bytes32) {
        return bytes32(uint256(uint160(_addr)));
    }

    /**
     * @dev Converts a bytes32 value back to an address
     * @param _buf Bytes32 value to convert
     */
    function bytes32ToAddress(bytes32 _buf) internal pure returns (address) {
        return address(uint160(uint256(_buf)));
    }

    /**
     * @dev Modifier to restrict access to the mailbox contract
     */
    modifier onlyMailbox() {
        require(msg.sender == mailbox, "Sender not authorized");
        _;
    }
}

interface IMailbox {
    /**
     * @dev Dispatch a message to a specific domain with a specified recipient
     * @param destinationDomain ID of the target chain
     * @param recipientAddress Recipient contract address on target chain
     * @param messageBody Encoded message payload
     * @return messageId Unique identifier of the message
     */
    function dispatch(
        uint32 destinationDomain,
        bytes32 recipientAddress,
        bytes calldata messageBody
    ) external payable returns (bytes32 messageId);

    /**
     * @dev Handle incoming messages from another domain
     * @param _origin Source domain ID
     * @param _sender Address of sender on the source chain
     * @param _data Message payload
     */
    function handle(
        uint32 _origin,
        bytes32 _sender,
        bytes calldata _data
    ) external payable;
}
