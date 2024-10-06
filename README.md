# TruthNLie 🎯

**TruthNLie** is a fun, competitive, blockchain-based guessing game built on **Solana** using Blinks. It’s a simple 1v1 game where one player creates a challenge by providing two truths and one lie. The challenge is shared with a friend, who must guess which of the statements is the lie. The game is decentralized, with players signing transactions to initiate and participate in challenges, while rewards are paid out based on the result.

## Key Features

- **1v1 Challenges**: A player creates a challenge consisting of two truths and one lie. The statements are shuffled and sent to the opponent, who has to guess the lie.
- **Blockchain-Powered**: Built on the Solana blockchain, all transactions are recorded on-chain. Players must sign transactions to initiate challenges and make guesses.
- **Native SOL Rewards**: Players wager a small amount of SOL to start a game. If the guesser identifies the lie correctly, they win the combined SOL amount. If not, the initiator takes the reward.
- **Randomized Order**: To prevent pattern guessing, the order of the statements is randomized when shared with the opponent.

## How It Works

1. **Create a Challenge**: One player (the initiator) creates a challenge by providing two truths and one lie. The statements are shuffled and stored in a randomized order, so the opponent cannot guess based on position.
2. **Share the Challenge**: The initiator shares the challenge with their friend via a unique link or other methods. The friend (challenger) then makes a guess, trying to spot the lie.
3. **Guess the Lie**: The challenger guesses which statement is the lie. They submit their guess by signing a transaction that pays a small SOL amount.
4. **Winner Takes the Prize**: If the challenger guesses correctly, they win the combined SOL amount from both players. If they guess wrong, the initiator wins the reward.

## Technologies Used

- **Next.js** (Frontend)
- **TypeScript**
- **Prisma ORM** (Database Management)
- **PostgreSQL** (Database)
- **Solana Blockchain** (Transaction management, and SOL payments)
- **Solana Web3.js** (For interacting with the Solana blockchain)
