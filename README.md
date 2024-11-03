# [Payroll Protocol]

**Payroll Protocol** is a confidential money distribution platform built on top of AIA Chain, designed to provide confidentiality during the distribution of funds on-chain. By leveraging FHE cryptography and smart contracts, Payroll Protocol ensures the **confidentiality**, security, and efficiency of money distribution.

## Video Demo - https://example.com/demo-video

## Protocol Architecture 
![image](https://github.com/TechieeGeeeks/PayRoll_Protocol/assets/99035115/f47981a2-395b-4c38-9f6b-47addb97732d)

## Overview
Payroll Protocol integrates **AIA Chain and INCO FHEVM** to enhance user experience while confidentially distributing money.

INCO FHEVM provides hidden states to store encrypted addresses that hold encrypted amounts on the INCO network, ensuring that all **transactions are secure and confidential**. This integration guarantees that money distribution details and recipient information remain confidential. It uses **modified Hyperlane infrastructure** to bridge these state values from AIA Chain to INCO and vice versa.

## Key Features
1. **Encrypted USDC Distributions:** Protects sensitive information with robust encryption methods.
2. **User-Friendly Interface:** Simplifies the payroll process with one click.
3. **Stealth Hold:** Users can hold stablecoins for an indefinite amount of time without revealing the amount.
4. **Underline Distribution:** Users can completely hide their withdrawals by distributing the encrypted amount to different encrypted addresses on their behalf, providing an experience similar to Tornado Cash.

## Tech Stack
- **Frontend:** Next.js, Tailwind CSS
- **Authentication & Wallets:** Privy
- **Chains:** AIA Chain, INCO FHEVM
- **Encryption:** FHE schemes

## Usage
1. Connect your web3 wallet.
2. Navigate to the distribution page.
3. Enter the recipient addresses and amounts.
4. Confirm the transaction to distribute funds confidentially.

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request with your changes.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## TFHE functions examples: 
```javascript
      mapping(eaddress => euint32) private ownerToBalance;
    // Encrypt a plaintext address to eaddress
    function encryptAddress(address plainAddress) public returns (eaddress) {
        return asEaddress(plainAddress);
    }
      function decryptAddress(eaddress _eAddress) public view returns (address) {
        // Decrypt the encrypted address
        return TFHE.decrypt(_eAddress);
    }
    function encryptAmount(uint32 amount) public view returns (euint32) {
        // Decrypt the encrypted address
        return TFHE.asEuint32(amount);
    }
     function decryptAmount(euint32 encryptedAmount) public view returns (uint32) {
        // Decrypt the encrypted address
        return TFHE.decrypt(encryptedAmount);
    }
```

## Acknowledgements
- [AIA Chain](https://aiachain.org/)
- [INCO FHEVM](https://inco.org/)
