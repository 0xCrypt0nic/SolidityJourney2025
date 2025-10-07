## Week9, Day 2: Update Voting Frontend to Use ethers.js

**Goal**: Modify the `Voting.sol` frontend from Week 8 (`voting.html`) to use ethers.js instead of web3.js, adding voting functionality and error handling.

### ethers.js Documentation - Transactions

**Read ethers.js Docs**:

- Read [ethers.js - Contract Interaction](https://docs.ethers.io/v5/api/contract/contract/#Contract--write):
  - Key points: Use `contract.functionName(args, { options })` for transactions (e.g., `vote`).
  - Handle transaction receipts with `await tx.wait()` to confirm success.
  - Catch errors with `try/catch` for revert messages (e.g., "Already voted").
- Example for voting:
  ```javascript
  const tx = await contract.vote(0, { gasLimit: 100000 });
  const receipt = await tx.wait();
  console.log("Vote successful:", receipt.transactionHash);
  ```

### Practice in HTML/JS

**Update Voting Frontend**:

- Create `/week9/frontend/voting-ethers.html` based on `/week8/frontend/voting.html`:

  ```html
  <!DOCTYPE html>
  <html>
    <head>
      <title>Voting DApp with ethers.js</title>
      <script src="https://cdn.ethers.io/lib/5.7.2/ethers.min.js"></script>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 20px;
        }
        button {
          padding: 10px;
          margin: 5px;
        }
        #candidates {
          margin: 10px 0;
        }
      </style>
    </head>
    <body>
      <button id="connect">Connect MetaMask</button>
      <h3>Candidates</h3>
      <div id="candidates"></div>
      <button id="voteAlice">Vote Alice</button>
      <button id="voteBob">Vote Bob</button>
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
            loadCandidates();
            document.getElementById("result").innerHTML = "Connected!";
          } else {
            document.getElementById("result").innerHTML = "MetaMask not found!";
          }
        };

        async function loadCandidates() {
          if (contract) {
            try {
              const candidate1 = await contract.candidates(0);
              const candidate2 = await contract.candidates(1);
              document.getElementById("candidates").innerHTML = `
                          ${candidate1.name}: ${candidate1.voteCount} votes<br>
                          ${candidate2.name}: ${candidate2.voteCount} votes
                      `;
            } catch (error) {
              document.getElementById("result").innerHTML =
                "Error loading candidates";
              console.error(error);
            }
          }
        }

        document.getElementById("voteAlice").onclick = async () => {
          if (contract) {
            try {
              const tx = await contract.vote(0, { gasLimit: 100000 });
              await tx.wait();
              loadCandidates();
              document.getElementById("result").innerHTML = "Voted for Alice!";
            } catch (error) {
              let errorMessage = "Transaction failed: Unknown error";
              if (error.reason) {
                errorMessage = `Transaction failed: ${error.reason}`;
              } else if (error.message) {
                errorMessage = `Transaction failed: ${error.message}`;
              }
              document.getElementById("result").innerHTML = errorMessage;
              console.error(error);
            }
          }
        };

        document.getElementById("voteBob").onclick = async () => {
          if (contract) {
            try {
              const tx = await contract.vote(1, { gasLimit: 100000 });
              await tx.wait();
              loadCandidates();
              document.getElementById("result").innerHTML = "Voted for Bob!";
            } catch (error) {
              let errorMessage = "Transaction failed: Unknown error";
              if (error.reason) {
                errorMessage = `Transaction failed: ${error.reason}`;
              } else if (error.message) {
                errorMessage = `Transaction failed: ${error.message}`;
              }
              document.getElementById("result").innerHTML = errorMessage;
              console.error(error);
            }
          }
        };
      </script>
    </body>
  </html>
  ```

- **Key points**:
  - Replace web3.js with ethers.js (`ethers.providers.Web3Provider`, `ethers.Contract`).
  - Use `tx.wait()` to confirm transactions.
  - Add error handling for reverts (e.g., "Already voted").
  - Include basic CSS for better UI.
- **Test Locally**:
  - Open `voting-ethers.html` in a browser with MetaMask on Sepolia.
  - Click "Connect MetaMask".
  - Click "Vote Alice" or "Vote Bob" (approve in MetaMask, verify UI refresh).
  - Try voting twice to confirm error handling (e.g., "Transaction failed: Already voted").
- **Troubleshooting**:
  - **"Invalid ABI"**? Copy ABI from Hardhat or Remix.
  - **"Transaction failed"**? Check `votingAddress`, ensure Sepolia, and verify gas limit.
  - Take a screenshot of the frontend showing a vote or error (e.g., `voting-ethers-screenshot.png`).
