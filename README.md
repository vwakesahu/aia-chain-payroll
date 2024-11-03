# [Payroll Protocol]

**Payroll Protocol** is a confidential money distribution platform built on top of AIA Chain, designed to provide confidentiality during the distribution of funds on-chain. By leveraging FHE cryptography and smart contracts, Payroll Protocol ensures the **confidentiality**, security, and efficiency of money distribution.

## Video Demo - https://youtu.be/JWXaH_IXKAc

## Protocol Architecture 
![image](https://github.com/TechieeGeeeks/PayRoll_Protocol/assets/99035115/f47981a2-395b-4c38-9f6b-47addb97732d)

## Flow-Diagram:
![flow.jpg](https://cdn.dorahacks.io/static/files/190774c66d9b0c61478004b4beda3ee1.jpg)

## Overview
Payroll Protocol integrates **AIA Chain and INCO FHEVM** to enhance user experience while confidentially distributing funds.

INCO FHEVM provides hidden states to store encrypted addresses that hold encrypted amounts on the INCO network, ensuring that all **transactions are secure and confidential**. This integration guarantees that money distribution details and recipient information remain confidential. It uses **modified Hyperlane infrastructure** to bridge these state values from AIA Chain to INCO and vice versa.

## Key Features
1. **Encrypted USDC Distributions**: Protects sensitive information with robust encryption methods.
2. **User-Friendly Interface**: Simplifies the payroll process with one click.
3. **Stealth Hold**: Users can hold stablecoins for an indefinite amount of time without revealing the amount.
4. **Underline Distribution**: Users can completely hide their withdrawals by distributing the encrypted amount to different encrypted addresses, similar to Tornado Cash.

## Tech Stack
- **Frontend**: Next.js, Tailwind CSS
- **Authentication & Wallets**: Privy
- **Chains**: AIA Chain, INCO FHEVM
- **Encryption**: FHE schemes

---

## Contracts Overview

### 1. TokenLockAndMint Contract

This contract enables users to lock tokens on the AIA Chain and triggers token minting on a remote chain, utilizing Hyperlane’s cross-chain communication features.

#### Important Functions

- **initialize**: Sets the remote contract address on the target chain, allowing for cross-chain messages.
  
- **lockTokens**: Transfers a specified `amount` of tokens from the user to this contract, locks them, and dispatches a message to the remote contract on another chain to mint an equivalent amount of tokens.

- **withdrawMessage**: Sends a withdrawal message to the remote contract, which could trigger a corresponding action on the remote chain.

- **distributeFunds**: Enables distribution of funds across multiple addresses on the remote chain. It accepts multiple recipient addresses and an encrypted data payload to maintain confidentiality.

- **handle**: Receives and processes incoming messages from the remote chain to update user balances locally, using Hyperlane’s `IMailbox` interface.

- **withdrawFunds**: Allows users to withdraw funds by dispatching a message with the requested amount to the remote chain.

#### Supporting Functions

- **addressToBytes32** and **bytes32ToAddress**: Utility functions for converting between `address` and `bytes32` formats to maintain compatibility with Hyperlane.

- **usdcToUint32**: Converts USDC values to a 32-bit unsigned integer to fit the message structure for dispatch.

### 2. PayRoll Contract

The `PayRoll` contract manages confidential fund distribution and balance tracking. It uses Fully Homomorphic Encryption (FHE) for secure balance operations, ensuring that funds are transferred and distributed confidentially.

#### Important Functions

- **initialize**: Sets the address of the remote contract on the target chain.

- **dispatchTokens**: Sends a message to the remote chain to mint tokens for a specified `amount` and `owner` on the remote chain.

- **handle**: Processes incoming messages from the remote chain and updates the encrypted balance of the specified user. It initializes balances where necessary and performs secure addition to keep balances accurate.

- **distributeFunds**: Distributes encrypted funds across multiple users, ensuring confidentiality of amounts and ownership. It uses FHE to add encrypted amounts to each recipient’s balance and subtracts the total from the owner’s balance.

- **transferFunds**: Allows the owner to transfer encrypted funds to another address. This function performs encrypted addition and subtraction to adjust the balances confidentially.

- **balanceOfUser**: Provides the encrypted balance of a specified user, ensuring that their balance remains private while accessible only through FHE methods.

- **withdrawFunds**: Withdraws funds by setting the user’s balance to zero locally and dispatching a token-minting request to the remote chain.

#### Supporting Functions

- **addressToBytes32** and **bytes32ToAddress**: Utility functions for address conversion between `address` and `bytes32` formats for Hyperlane compatibility.

- **onlyMailbox**: A modifier that restricts access to functions intended for the mailbox, ensuring only trusted entities interact with sensitive functions.

---

## Usage

1. **Connect** your web3 wallet.
2. **Navigate** to the distribution page.
3. **Enter** recipient addresses and amounts.
4. **Confirm** the transaction to distribute funds confidentially.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [AIA Chain](https://aiachain.org/)
- [INCO FHEVM](https://inco.org/)d under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements
- [AIA Chain](https://aiachain.org/)
- [INCO FHEVM](https://inco.org/)
