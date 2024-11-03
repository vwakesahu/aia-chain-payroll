// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract TokenLockAndMint is Ownable, ReentrancyGuard {
    // Token instance for interaction with an existing ERC20 token contract
    IERC20 public token;
    
    // Mailbox address for Hyperlane communication
    address public mailbox = 0xA765680070fe008eb52DD4453bf75ACEF5aA7B43;
    
    // Address of the contract on the remote chain that will receive messages
    address public remoteContract;
    
    // Domain ID of the remote chain in Hyperlane
    uint32 public remoteDomain;
    
    // Stores the amount of the last token transfer for easy reference
    uint256 public lastAmount;
    
    // Message type identifiers for different types of operations
    uint8 public LOCK_MESSAGE_TYPE = 1;
    uint8 public WITHDRAW_MESSAGE_TYPE = 2;
    uint8 public DISTRIBUTE_MESSAGE_TYPE = 3;

    // Events for logging actions
    event TokensLocked(address indexed user, uint256 amount, uint256 timestamp);
    event TokensMinted(address indexed user, uint256 amount, uint256 timestamp);

    /**
     * @dev Constructor to initialize the token and remote domain
     * @param _token Address of the token to be locked and minted
     */
    constructor(address _token) Ownable(msg.sender) {
        token = IERC20(_token);
        remoteDomain = 21097; // Set domain ID for the remote chain
    }

    /**
     * @dev Initialize the remote contract address for cross-chain messages
     * @param _remoteContract Address of the remote contract on another chain
     */
    function initialize(address _remoteContract) external onlyOwner {
        remoteContract = _remoteContract;
    }

    /**
     * @dev Locks tokens in this contract and sends a message to mint on the remote chain
     * @param amount Amount of tokens to lock and mint remotely
     */
    function lockTokens(uint256 amount) external nonReentrant {
        require(amount > 0, "Amount must be greater than 0");

        // Transfers tokens from sender to this contract
        token.transferFrom(msg.sender, address(this), amount);

        // Convert amount to uint32 format
        uint32 _amount = usdcToUint32(amount);

        // Encodes the message with user address and token amount
        bytes memory message = abi.encode(msg.sender, _amount);

        // Dispatches the message to the remote contract
        IMailbox(mailbox).dispatch(
            remoteDomain,
            addressToBytes32(remoteContract),
            message
        );

        // Emit event to log tokens locked action
        emit TokensLocked(msg.sender, amount, block.timestamp);
    }

    /**
     * @dev Sends a withdraw message to the remote chain
     */
    function withdrawMessage() external {
        bytes memory message = abi.encode(msg.sender, 0);

        // Dispatches the withdrawal message to the remote chain
        IMailbox(mailbox).dispatch(
            remoteDomain,
            addressToBytes32(remoteContract),
            message
        );
    }

    /**
     * @dev Sends a message for fund distribution to multiple users on the remote chain
     * @param userAddress1 Address of first user
     * @param userAddress2 Address of second user
     * @param userAddress3 Address of third user
     * @param encryptedData Encrypted data for distribution (could be FHE encrypted)
     */
    function distributeFunds(
        address userAddress1,
        address userAddress2,
        address userAddress3,
        bytes memory encryptedData
    ) external {
        bytes memory message = abi.encode(msg.sender, 0);

        // Dispatches the distribution message with encrypted data to remote chain
        IMailbox(mailbox).dispatch(
            remoteDomain,
            addressToBytes32(remoteContract),
            message
        );
    }

    /**
     * @dev Handles incoming messages from the remote chain to update balances
     * @param _origin Domain ID of the originating chain
     * @param _sender Address of the sender contract on the remote chain
     * @param _data Data payload containing the user address and amount
     */
    function handle(
        uint32 _origin,
        bytes32 _sender,
        bytes calldata _data
    ) public onlyMailbox {
        require(_origin == remoteDomain, "Invalid source domain");
        require(
            _sender == bytes32(addressToBytes32(remoteContract)),
            "Invalid source contract"
        );

        // Decode the message to extract user address and amount
        (address user, uint256 amount) = abi.decode(_data, (address, uint256));

        // Transfer the tokens to the user on the local chain
        token.transfer(user, amount);
    }

    /**
     * @dev Sends a withdrawal message with specified amount to remote chain
     * @param amount Amount to withdraw from the remote chain
     */
    function withdrawFunds(uint256 amount) external {
        bytes memory message = abi.encode(msg.sender, amount);

        // Dispatches the withdrawal message with amount to remote chain
        IMailbox(mailbox).dispatch(
            remoteDomain,
            addressToBytes32(remoteContract),
            message
        );
    }

    /**
     * @dev Converts an address to a bytes32 type for compatibility with Hyperlane
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
     * @dev Converts a USDC amount to uint32, assuming 6 decimal places for USDC
     * @param usdcAmount Amount of USDC to be converted
     * @return Whole number equivalent of USDC amount in uint32
     */
    function usdcToUint32(uint256 usdcAmount) public pure returns (uint32) {
        // Divide by 10^6 to get the whole number part, assuming 6 decimal places
        uint32 wholeNumber = uint32(usdcAmount / 10**18);
        return wholeNumber;
    }

    /**
     * @dev Restricts access to only the mailbox contract
     */
    modifier onlyMailbox() {
        require(msg.sender == mailbox, "MailboxClient: sender not mailbox");
        _;
    }
}

interface IMailbox {
    /**
     * @dev Dispatch a cross-chain message to another domain
     * @param destinationDomain The domain ID of the target chain
     * @param recipientAddress The address of the recipient contract on the target chain
     * @param messageBody Encoded data to be sent in the message
     * @return messageId The unique ID of the message
     */
    function dispatch(
        uint32 destinationDomain,
        bytes32 recipientAddress,
        bytes calldata messageBody
    ) external payable returns (bytes32 messageId);

    /**
     * @dev Handle an incoming message from another domain
     * @param _origin The domain ID of the sending chain
     * @param _sender The address of the sending contract on the source chain
     * @param _message The data payload sent in the message
     */
    function handle(
        uint32 _origin,
        bytes32 _sender,
        bytes calldata _message
    ) external payable;
}
