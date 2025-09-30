## Week8, Day 2: Create a Frontend for the Voting Contract

**Goal**: Build an HTML/JavaScript frontend for the Voting contract from Week 2, integrating web3.js to vote and view results.

### web3.js Documentation - Advanced Usage

**Read web3.js Docs**:

- Read [web3.js - Sending Transactions](https://web3js.readthedocs.io/en/v1.10.0/web3-eth-contract.html#id28) for `.send()` options.
  - Key points: `.send({ from, gas, value })` for transactions, handle events with `.on('receipt')`.
- Read [web3.js - Events](https://web3js.readthedocs.io/en/v1.10.0/web3-eth-contract.html#events) for listening to contract events.
  - Key points: `contract.events.EventName({ filter: { from: account } }, callback)` to log events like `VoteCast`.
- Example for voting:
  ```
  contract.methods.vote(0).send({ from: accounts[0] })
      .on('receipt', (receipt) => {
          console.log("Vote cast:", receipt.events.VoteCast.returnValues);
      });
  ```

### Practice in HTML/JS

**Create Voting Frontend**:

- Create `/week8/frontend/voting.html`:

  ```
  <!DOCTYPE html>
  <html>
  <head>
      <title>Voting DApp</title>
      <script src="https://cdn.jsdelivr.net/npm/web3@1.8.0/dist/web3.min.js"></script>
  </head>
  <body>
      <button id="connect">Connect MetaMask</button>
      <h3>Candidates</h3>
      <div id="candidates"></div>
      <button id="voteAlice">Vote Alice</button>
      <button id="voteBob">Vote Bob</button>
      <p id="result"></p>

      <script>
          let web3;
          let contract;
          const votingAddress = '0xYOUR_VOTING_CONTRACT_ADDRESS'; // From Week 2
          const ABI = [ /* ABI from Hardhat or Remix */ ];

          document.getElementById('connect').onclick = async () => {
              if (window.ethereum) {
                  web3 = new Web3(window.ethereum);
                  await window.ethereum.request({ method: 'eth_requestAccounts' });
                  contract = new web3.eth.Contract(ABI, votingAddress);
                  loadCandidates();
                  document.getElementById('result').innerHTML = 'Connected!';
              }
          };

          async function loadCandidates() {
              const candidates = await contract.methods.candidates(0).call();
              document.getElementById('candidates').innerHTML = `Alice: ${candidates[1]} votes<br>Bob: ${candidates[1]} votes`; // Adjust for real call
          }

          document.getElementById('voteAlice').onclick = async () => {
              if (contract) {
                  const accounts = await web3.eth.getAccounts();
                  await contract.methods.vote(0).send({ from: accounts[0] })
                      .on('receipt', () => {
                          loadCandidates();
                          document.getElementById('result').innerHTML = 'Voted for Alice!';
                      });
              }
          };

          document.getElementById('voteBob').onclick = async () => {
              if (contract) {
                  const accounts = await web3.eth.getAccounts();
                  await contract.methods.vote(1).send({ from: accounts[0] })
                      .on('receipt', () => {
                          loadCandidates();
                          document.getElementById('result').innerHTML = 'Voted for Bob!';
                      });
              }
          };
      </script>
  </body>
  </html>
  ```

- **Key points**:
  - Load candidates with `call` (e.g., `contract.methods.candidates(0).call()`).
  - Vote with `.send()` and listen for receipt to refresh UI.
- **Test Locally**:
  - Open `voting.html` in a browser with MetaMask on Sepolia.
  - Click "Connect MetaMask".
  - Click "Vote Alice" or "Vote Bob" (approve in MetaMask, refresh candidates).
- **Troubleshooting**:
  - "ABI not found"? Copy ABI from Hardhat (`artifacts/contracts/Voting.sol/Voting.json`) or Remix.
  - "Vote failed"? Ensure `votingAddress` is correct from Week 2 deployment.
