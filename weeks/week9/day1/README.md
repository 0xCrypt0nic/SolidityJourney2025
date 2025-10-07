## Week9, Day 1: Learn ethers.js as an Alternative to web3.js

**Goal**: Understand ethers.js for blockchain interactions, focusing on connecting to MetaMask and interacting with `Voting.sol`.

### ethers.js Documentation

**Read ethers.js Docs**:

- Visit [ethers.js - Getting Started](https://docs.ethers.io/v5/getting-started/) and study:
  - **ethers.js**: JavaScript library for Ethereum interactions, more modular than web3.js.
  - **Provider**: Connects to Ethereum node (e.g., MetaMask via `ethers.providers.Web3Provider`).
  - **Contract**: Create contract instance with `new ethers.Contract(address, ABI, signer)`.
  - **Key Methods**:
    - `call`: Read contract functions (e.g., `getCandidates`) using `contract.functionName()`.
    - `send`: Write to contract (e.g., `vote`) using `contract.functionName(args, { options })`.
- Key points:
  - Install: `npm install ethers`.
  - MetaMask integration: `const provider = new ethers.providers.Web3Provider(window.ethereum)`.
  - ABI: Same as web3.js, copied from Hardhat or Remix.
- Example basic setup:

  ```javascript
  import { ethers } from "ethers";

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(contractAddress, ABI, signer);

  async function getBalance() {
    const balance = await contract.getTokenBalance(signer.getAddress());
    console.log(ethers.utils.formatEther(balance));
  }
  ```

### Practice in JavaScript

**Create Basic ethers.js Frontend**:

- Create `/week9/frontend/ethers-test.html`:

  ```html
  <!DOCTYPE html>
  <html>
    <head>
      <title>ethers.js Test</title>
      <script src="https://cdn.ethers.io/lib/5.7.2/ethers.min.js"></script>
    </head>
    <body>
      <button id="connect">Connect MetaMask</button>
      <button id="getCandidates">Get Candidates</button>
      <p id="result"></p>

      <script>
        let provider;
        let signer;
        let contract;
        const votingAddress = "0xYOUR_VOTING_ADDRESS"; // From Week 2
        const ABI = [
          /* ABI from Voting.sol */
        ];

        document.getElementById("connect").onclick = async () => {
          if (window.ethereum) {
            provider = new ethers.providers.Web3Provider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            signer = provider.getSigner();
            contract = new ethers.Contract(votingAddress, ABI, signer);
            document.getElementById("result").innerHTML = "Connected!";
          } else {
            document.getElementById("result").innerHTML = "MetaMask not found!";
          }
        };

        document.getElementById("getCandidates").onclick = async () => {
          if (contract) {
            try {
              const candidates = await contract.candidates(0); // Adjust for your Voting.sol
              document.getElementById(
                "result"
              ).innerHTML = `Candidate: ${candidates.name}, Votes: ${candidates.voteCount}`;
            } catch (error) {
              document.getElementById("result").innerHTML =
                "Error fetching candidates";
              console.error(error);
            }
          }
        };
      </script>
    </body>
  </html>
  ```

- **Key points**:
  - Use ethers.js CDN (`ethers.min.js`) for simplicity.
  - Connect MetaMask with `provider.send('eth_requestAccounts', [])`.
  - Create contract instance with `new ethers.Contract`.
  - Call `candidates(0)` to test reading from `Voting.sol`.
- **Test Locally**:
  - Open `ethers-test.html` in a browser with MetaMask on Sepolia.
  - Click "Connect MetaMask" (should display "Connected!").
  - Click "Get Candidates" (should display candidate details, e.g., "Candidate: Alice, Votes: 0").
- **Troubleshooting**:
  - **"MetaMask not found"**? Install MetaMask extension.
  - **"Invalid ABI"**? Copy ABI from Hardhat (`artifacts/contracts/Voting.sol/Voting.json`) or Remix.
  - **"Provider error"**? Ensure MetaMask is on Sepolia.
  - Take a screenshot of the frontend showing candidate details (e.g., `ethers-test-screenshot.png`).
