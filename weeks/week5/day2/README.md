## Week5, Day 2: Implement Error Handling in a Contract and Test

**Goal**: Build a contract with robust error handling and test it with Hardhat (TypeScript) to ensure correct behavior.

### Solidity by Example - Advanced Error Handling

**Study Advanced Examples**:

- Revisit [Solidity by Example - Error Handling](https://solidity-by-example.org/error/) and focus on custom errors and gas efficiency.
- Learn:

  - Combine `require` and custom errors for complex validation.
  - Use `assert` sparingly for critical invariants due to gas cost.
  - Example with combined error handling:

    ```
    error Unauthorized();
    error ZeroAmount();

    contract AdvancedError {
        mapping(address => uint) public balances;
        address public owner;

        constructor() {
            owner = msg.sender;
        }

        function deposit(uint amount) public {
            if (amount == 0) revert ZeroAmount();
            balances[msg.sender] += amount;
        }

        function withdraw(uint amount) public {
            require(balances[msg.sender] >= amount, "Insufficient balance");
            if (msg.sender != owner) revert Unauthorized();
            balances[msg.sender] -= amount;
        }
    }
    ```

- Practice in Remix:
  - Deploy the example contract.
  - Test `deposit(0)` (fails with `ZeroAmount`).
  - Test `withdraw` from non-owner (fails with `Unauthorized`).

### Practice in Hardhat

**Create and Test Contract**:

- In your Hardhat project (`blockchain-training`), create `contracts/Bank.sol`:

  ```
  // SPDX-License-Identifier: MIT
  pragma solidity ^0.8.0;

  contract Bank {
      mapping(address => uint) public balances;
      address public owner;

      error Unauthorized(address caller);
      error InsufficientBalance(uint requested, uint available);
      error ZeroAmount();

      constructor() {
          owner = msg.sender;
      }

      function deposit(uint amount) public {
          if (amount == 0) revert ZeroAmount();
          balances[msg.sender] += amount;
      }

      function withdraw(uint amount) public {
          if (msg.sender != owner) revert Unauthorized(msg.sender);
          if (amount > balances[msg.sender]) revert InsufficientBalance(amount, balances[msg.sender]);
          balances[msg.sender] -= amount;
      }

      function checkBalance() public view returns (uint) {
          assert(balances[msg.sender] >= 0);
          return balances[msg.sender];
      }
  }
  ```

- **Deploy Script**: Create `scripts/deploy.ts`:

  ```typescript
  import { ethers } from "hardhat";

  async function main() {
    const Bank = await ethers.getContractFactory("Bank");
    const bank = await Bank.deploy();
    await bank.deployed();
    console.log(`Bank deployed to: ${bank.address}`);
  }

  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  ```

- **Test Script**: Create `test/Bank.test.ts`:

  ```typescript
  import { expect } from "chai";
  import { ethers } from "hardhat";
  import { Signer } from "ethers";
  import { Bank } from "../typechain-types";

  describe("Bank", function () {
    let contractFactory: any;
    let bank: Bank;
    let owner: Signer;
    let nonOwner: Signer;

    beforeEach(async function () {
      contractFactory = await ethers.getContractFactory("Bank");
      [owner, nonOwner] = await ethers.getSigners();
      bank = await contractFactory.deploy();
      await bank.deployed();
    });

    it("should allow deposit and update balance", async function () {
      await bank.deposit(100);
      expect(await bank.checkBalance()).to.equal(100);
    });

    it("should revert deposit with zero amount", async function () {
      await expect(bank.deposit(0)).to.be.revertedWithCustomError(
        bank,
        "ZeroAmount"
      );
    });

    it("should allow owner to withdraw", async function () {
      await bank.deposit(100);
      await bank.withdraw(50);
      expect(await bank.checkBalance()).to.equal(50);
    });

    it("should revert withdraw by non-owner", async function () {
      await bank.deposit(100);
      await expect(
        bank.connect(nonOwner).withdraw(50)
      ).to.be.revertedWithCustomError(bank, "Unauthorized");
    });

    it("should revert withdraw with insufficient balance", async function () {
      await bank.deposit(50);
      await expect(bank.withdraw(100)).to.be.revertedWithCustomError(
        bank,
        "InsufficientBalance"
      );
    });
  });
  ```

- **Compile and Deploy**:
  - Compile: `npx hardhat compile` (generates `typechain-types/Bank.ts`).
  - Deploy on Sepolia: `npx hardhat run scripts/deploy.ts --network sepolia` (ensure test ETH and `.env` with `PRIVATE_KEY`).
  - Run tests: `npx hardhat test`.
- **Verify**: Check for "5 passing" in the terminal. Note the contract address from deployment.
- **Troubleshooting**:
  - Error "Cannot find module 'typechain-types'"? Run `npx hardhat typechain`.
  - "TypeError"? Verify `tsconfig.json` includes `"include": ["scripts", "test", "typechain-types"]`.
  - Test fails? Check error messages in `Bank.sol` match test expectations (e.g., `ZeroAmount`).
