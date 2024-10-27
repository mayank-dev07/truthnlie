// create a function that run after every minute and check if challenge is full, if yes then payout

import { getAllChallenges } from "@/lib/dbUtils";
import { sendPayouts } from "@/lib/payout.helper";

async function checkIfChallengeIsFull() {
  const challenges = await getAllChallenges();
  for (const challenge of challenges) {
    if (
      challenge.correctGuessesSig.length +
        challenge.incorrectGuessesSig.length ==
      challenge.maxChallengers
    ) {
      return sendPayouts(challenge.id);
    }
  }
  return false;
}

setInterval(checkIfChallengeIsFull, 60000);
