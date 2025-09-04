## Week 4, Day 3: Explore Solidity Libraries and Document Usage

**Goal**: Explore Solidity libraries for reusable code and document their implementation in a contract.

### Solidity Documentation - Libraries

**Read Solidity Docs**:

- Read [Solidity - Libraries](https://docs.soliditylang.org/en/latest/contracts.html#libraries) for details on creating and using libraries.
  - Key points: Libraries are stateless, reusable contracts deployed once, called with `DELEGATECALL` to share code (e.g., math operations).
  - No storage variables; functions are `internal` or `external`.
  - Deployed separately, linked at compile time.
- Read [OpenZeppelin - SafeMath](https://docs.openzeppelin.com/contracts/5.x/api/utils#SafeMath) for a library example.
  - Key points: SafeMath prevents overflow/underflow (e.g., `using SafeMath for uint;` adds safe operations like `add`).
- Example library usage:

  ```
  library SafeMath {
      function add(uint a, uint b) internal pure returns (uint) {
          uint c = a + b;
          require(c >= a, "Addition overflow");
          return c;
      }
  }

  contract MathContract {
      using SafeMath for uint;

      uint public result;

      function addSafe(uint _a, uint _b) public {
          result = _a.add(_b);
      }
  }
  ```

### Practice in Remix

**Create Library Contract in Remix**:

- Open [Remix IDE](https://remix.ethereum.org/) and create `SafeMathLibrary.sol`:

  ```
  // SPDX-License-Identifier: MIT
  pragma solidity ^0.8.0;

  library SafeMath {
      function add(uint a, uint b) internal pure returns (uint) {
          uint c = a + b;
          require(c >= a, "Addition overflow");
          return c;
      }

      function sub(uint a, uint b) internal pure returns (uint) {
          require(b <= a, "Subtraction overflow");
          return a - b;
      }
  }
  ```

- Create `LibraryExample.sol`:

  ```
  // SPDX-License-Identifier: MIT
  pragma solidity ^0.8.0;

  import "./SafeMathLibrary.sol";

  contract LibraryExample {
      using SafeMath for uint;

      uint public value = 100;

      function addValue(uint _amount) public {
          value = value.add(_amount);
      }

      function subValue(uint _amount) public {
          value = value.sub(_amount);
      }
  }
  ```

- Compile with Solidity version 0.8.x.
- Deploy `LibraryExample` on Sepolia via MetaMask (ensure test ETH from [Sepolia Faucet](https://sepoliafaucet.com/)).
- Test:
  - Call `addValue(50)` (value becomes 150).
  - Call `subValue(30)` (value becomes 120).
  - Test overflow: Call `addValue(type(uint).max - 100 + 1)` (fails with "Addition overflow").
  - Test underflow: Call `subValue(121)` (fails with "Subtraction overflow").
- Take a screenshot of Remix interface showing deployment, test results, or overflow error.
