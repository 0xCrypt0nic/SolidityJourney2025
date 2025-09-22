## Interface IERC20

`import "@openzeppelin/contracts/token/ERC20/IERC20.sol";`

---

### Functions

- totalSupply() : Returns the value of tokens in existance.
- balanceOf(account) : Returns the value of tokens owned by `account`.
- transfer(to, value) : Moves a `value` amount of tokens from caller's account to `to` and return a boolean indicating whether the operation succeeded and Emits an `transfer` event.
- allowance(owner, spender) : Returns the remaining number of tokens that `spender`will be allowed to spend on behalf of `owner` through transferFrom. 0 by default. This value changes when `approve` or `transferFrom` are called.
- approve(spender, value) : Sets a `value` amount of tokens as the allowance of `spender`over the caller's tokens. Return a boolean indicating whether the operation succeeded, and Emits an `Approval` event.
- transferFrom(from, to, value) : Moves a `value` amount of tokens from `from`to `to`using the allowance mechanism. Emits a `transfer` event.

### Events

- Transfer(from, to, value) : Emitted when `value`tokens are moved from one account to another.
- Approval(owner, spender, value): Emitted when the allowance of a spender for an owner is set by call to `approve`.
