import { db } from "./db";

export async function createUserIfNotExists(wallet: string, name: string) {
  const existingUser = await getUser(wallet);

  if (existingUser) {
    return existingUser;
  }

  return db.user.create({
    data: {
      wallet,
      name,
    },
  });
}

export async function getUser(wallet: string) {
  return db.user.findUnique({
    where: {
      wallet,
    },
  });
}

export async function createChallenge(
  wallet: string,
  maxChallengers: number,
  statements: string[],
  lieIndex: number
) {
  // validations
  if (statements.length !== 3) {
    throw new Error("There must be exactly 3 statements");
  }
  if (lieIndex < 0 || lieIndex > 2) {
    throw new Error("lieIndex must be between 0 and 2");
  }

  const existingWallet = await db.user.findUnique({
    where: { wallet },
  });

  if (!existingWallet) {
    throw new Error("Wallet not found");
  }

  const challenge = await db.challenge.create({
    data: {
      wallet,
      maxChallengers,
      statements,
      lieIndex,
    },
  });
  return challenge.id;
}

export async function getChallenge(id: string) {
  return db.challenge.findUnique({
    where: {
      id,
    },
  });
}

export async function getChallenges(wallet: string) {
  return db.challenge.findMany({
    where: {
      wallet,
    },
  });
}

export async function getChallengesByChallenger(wallet: string) {
  return db.challenge.findMany({
    where: {
      challengers: {
        some: {
          wallet,
        },
      },
    },
  });
}

export async function addChallenger(
  challengeId: string,
  wallet: string,
  guessSignature: string,
  correct: boolean
) {
  return db.challenge.update({
    where: {
      id: challengeId,
    },
    data: {
      challengers: {
        connect: {
          wallet,
        },
      },
      [correct ? "correctGuesses" : "incorrectGuesses"]: {
        push: guessSignature,
      },
    },
  });
}
