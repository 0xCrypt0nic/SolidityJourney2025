## Week 6, Day 1: Study the ERC-20 Token Standard via OpenZeppelin

**Goal**: Understand the ERC-20 token standard, its functions, and events using OpenZeppelin’s documentation and examples.

### OpenZeppelin Documentation

**Read OpenZeppelin ERC-20 Docs**:

- Visit [OpenZeppelin - ERC20](https://docs.openzeppelin.com/contracts/5.x/erc20) and study:
  - **ERC-20 Standard**: Defines a fungible token interface (e.g., `transfer`, `approve`, `balanceOf`) for interoperability.
  - **Key Functions**:
    - `totalSupply()`: Returns total token supply.
    - `balanceOf(address)`: Returns account balance.
    - `transfer(address to, uint amount)`: Transfers tokens to an address.
    - `approve(address spender, uint amount)`: Allows spender to transfer tokens.
    - `transferFrom(address from, address to, uint amount)`: Transfers tokens on behalf of `from`.
    - `allowance(address owner, address spender)`: Returns allowed amount for spender.
  - **Events**:
    - `Transfer(address indexed from, address indexed to, uint256 value)`: Emitted on token transfers.
    - `Approval(address indexed owner, address indexed spender, uint256 value)`: Emitted on approvals.
  - **OpenZeppelin Implementation**: Provides a secure, audited ERC-20 base contract with additional features (e.g., `burn`, `mint`).
- Example minimal ERC-20 from OpenZeppelin:

  ```
  // SPDX-License-Identifier: MIT
  pragma solidity ^0.8.0;

  import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

  contract MyToken is ERC20 {
      constructor(uint256 initialSupply) ERC20("MyToken", "MTK") {
          _mint(msg.sender, initialSupply);
      }
  }
  ```

- Key points:
  - Inherits `ERC20` from OpenZeppelin, which implements all standard functions.
  - Constructor sets token name and symbol, mints initial supply to deployer.
  - Uses `internal` `_mint` for secure minting.

### Solidity by Example

**Study ERC-20 Example**:

- Visit [Solidity by Example - ERC20](https://solidity-by-example.org/app/erc20/) and review:
  - Basic ERC-20 implementation without OpenZeppelin.
  - Compare with OpenZeppelin’s version to understand benefits (security, audited code).
- Practice in Remix:
  - Copy the Solidity by Example ERC-20 code.
  - Deploy on Remix’s JavaScript VM.
  - Test `transfer`, `approve`, and `transferFrom` functions.
  - Note gas costs and limitations (e.g., no overflow protection pre-0.8.0).
