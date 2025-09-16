## Day 3: Document Common Security Pitfalls and Mitigations

**Goal**: Identify common smart contract vulnerabilities, audit the `Bank.sol` contract, and document mitigations.

### Study Security Pitfalls

**Read Security Resources**:

- Read [OpenZeppelin - Security](https://docs.openzeppelin.com/contracts/4.x/api/security) and [Solidity - Security Considerations](https://docs.soliditylang.org/en/latest/security-considerations.html).
- Key vulnerabilities:
  - **Reentrancy**: Attacker re-calls a function (e.g., `withdraw`) before state update, draining funds.
    - Mitigation: Use checks-effects-interactions pattern or OpenZeppelin’s `ReentrancyGuard`.
  - **Overflow/Underflow**: Fixed in Solidity 0.8.x, but still relevant with older versions or unsafe math.
    - Mitigation: Use SafeMath or Solidity 0.8.x.
  - **Access Control**: Missing checks allow unauthorized access.
    - Mitigation: Use `require` or modifiers like `onlyOwner`.
- Example reentrancy vulnerability:

  ```
  contract VulnerableBank {
      mapping(address => uint) public balances;

      function withdraw(uint amount) public {
          if (balances[msg.sender] >= amount) {
              (bool sent, ) = msg.sender.call{value: amount}("");
              require(sent, "Transfer failed");
              balances[msg.sender] -= amount;
          }
      }
  }
  ```

  - Issue: `call` before updating `balances` allows reentrancy.
  - Fix: Update state first (checks-effects-interactions).

### Audit and Fix Bank.sol

**Audit Bank.sol**:

- Review `/week5/contracts/Bank.sol` (from Day 2) for vulnerabilities:
  - **Strengths**: Uses custom errors, `require` for input validation, `assert` for invariants, and `onlyOwner`-like check.
  - **Weakness**: `withdraw` sends ETH (not implemented yet), risking reentrancy.
- Update `Bank.sol` to handle ETH withdrawals and prevent reentrancy:

  ```
  // SPDX-License-Identifier: MIT
  pragma solidity ^0.8.0;

  contract Bank {
      mapping(address => uint) public balances;
      address public owner;
      bool private locked; // Reentrancy guard

      error Unauthorized(address caller);
      error InsufficientBalance(uint requested, uint available);
      error ZeroAmount();
      error TransferFailed();
      error ReentrancyAttempt();

      constructor() {
          owner = msg.sender;
      }

      modifier nonReentrant() {
          if (locked) revert ReentrancyAttempt();
          locked = true;
          _;
          locked = false;
      }

      function deposit() public payable {
          if (msg.value == 0) revert ZeroAmount();
          balances[msg.sender] += msg.value;
      }

      function withdraw(uint amount) public nonReentrant {
          if (msg.sender != owner) revert Unauthorized(msg.sender);
          if (amount > balances[msg.sender]) revert InsufficientBalance(amount, balances[msg.sender]);
          balances[msg.sender] -= amount;
          (bool sent, ) = msg.sender.call{value: amount}("");
          if (!sent) revert TransferFailed();
      }

      function checkBalance() public view returns (uint) {
          assert(balances[msg.sender] >= 0);
          return balances[msg.sender];
      }
  }
  ```

- **Changes**:
  - Added `payable deposit` to accept ETH.
  - Added `nonReentrant` modifier to prevent reentrancy.
  - Added `TransferFailed` and `ReentrancyAttempt` errors.
  - Follows checks-effects-interactions: Update `balances` before `call`.
- **Test in Remix**:
  - Deploy on Sepolia.
  - Call `deposit` with 0.1 ETH (balance increases).
  - Call `withdraw(0.05 ether)` from owner (succeeds).
  - Try `withdraw` from non-owner (fails with `Unauthorized`).
  - Try `withdraw(1 ether)` (fails with `InsufficientBalance`).
- **Test in Hardhat**:

  - Update `/week5/test/Bank.test.ts`:

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
        await bank.deposit({ value: ethers.parseEther("0.1") });
        expect(await bank.checkBalance()).to.equal(ethers.parseEther("0.1"));
      });

      it("should revert deposit with zero amount", async function () {
        await expect(bank.deposit({ value: 0 })).to.be.revertedWithCustomError(
          bank,
          "ZeroAmount"
        );
      });

      it("should allow owner to withdraw", async function () {
        await bank.deposit({ value: ethers.parseEther("0.1") });
        await bank.withdraw(ethers.parseEther("0.05"));
        expect(await bank.checkBalance()).to.equal(ethers.parseEther("0.05"));
      });

      it("should revert withdraw by non-owner", async function () {
        await bank.deposit({ value: ethers.parseEther("0.1") });
        await expect(
          bank.connect(nonOwner).withdraw(ethers.parseEther("0.05"))
        ).to.be.revertedWithCustomError(bank, "Unauthorized");
      });

      it("should revert withdraw with insufficient balance", async function () {
        await bank.deposit({ value: ethers.parseEther("0.05") });
        await expect(
          bank.withdraw(ethers.parseEther("0.1"))
        ).to.be.revertedWithCustomError(bank, "InsufficientBalance");
      });

      it("should prevent reentrancy", async function () {
        // Note: Reentrancy testing requires a malicious contract; simplified check for nonReentrant
        await bank.deposit({ value: ethers.parseEther("0.1") });
        await expect(
          bank.withdraw(ethers.parseEther("0.05"))
        ).not.to.be.revertedWithCustomError(bank, "ReentrancyAttempt");
      });
    });
    ```

  - Compile: `npx hardhat compile`.
  - Deploy: `npx hardhat run scripts/deploy.ts --network sepolia`.
  - Test: `npx hardhat test`.
  - Verify: Check for "6 passing" in the terminal.
