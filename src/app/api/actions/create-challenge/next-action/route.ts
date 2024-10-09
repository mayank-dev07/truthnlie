import { vaultPublicKey } from "@/lib/constants";
import { createChallenge, createUserIfNotExists } from "@/lib/dbUtils";
import {
  shuffleArray,
  validatedCreateChallengeQueryParams,
} from "@/lib/helper";
import {
  ActionPostResponse,
  createPostResponse,
  ActionGetResponse,
  ActionPostRequest,
  createActionHeaders,
  ActionError,
  LinkedAction,
  CompletedAction,
  NextActionPostRequest,
} from "@solana/actions";
import {
  clusterApiUrl,
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";

// create the standard headers for this route (including CORS)
const headers = createActionHeaders();

export const GET = async (req: Request) => {
  return Response.json(
    { message: "Method not supported" },
    {
      headers,
    }
  );
};

// DO NOT FORGET TO INCLUDE THE `OPTIONS` HTTP METHOD
// THIS WILL ENSURE CORS WORKS FOR BLINKS
export const OPTIONS = async () => Response.json(null, { headers });

export const POST = async (req: Request) => {
  try {
    const requestUrl = new URL(req.url);
    const { truth1, truth2, lie, competitors, amount } =
      validatedCreateChallengeQueryParams(requestUrl);
    const body: NextActionPostRequest = await req.json();

    // validate the client provided input
    let account: PublicKey;
    try {
      account = new PublicKey(body.account);
    } catch (err) {
      throw 'Invalid "account" provided';
    }

    let signature: string;
    try {
      signature = body.signature!;
      if (!signature) throw "Invalid signature";
    } catch (err) {
      throw 'Invalid "signature" provided';
    }

    console.log(
      `Creating challenge with truth1: ${truth1}, truth2: ${truth2}, lie: ${lie}, competitors: ${competitors}, amount: ${amount} and signature: ${signature}, account: ${account.toBase58()}`
    );

    try {
      await createUserIfNotExists(account.toBase58(), "User");
    } catch (err) {
      throw "Failed to create user";
    }
    const statements = [truth1, truth2, lie];
    const shuffledStatements = shuffleArray(statements);
    const lieIndex = shuffledStatements.indexOf(lie);

    let challengeId: string;
    try {
      challengeId = await createChallenge(
        account.toBase58(),
        competitors,
        shuffledStatements,
        lieIndex
      );
    } catch (err) {
      console.error(err);
      throw "Failed to create challenge";
    }

    const payload: CompletedAction = {
      type: "completed",
      title: "Challenge created",
      description: `Your challenge has been created successfully\n URL: https://dial.to/developer?url=${requestUrl.origin}/challenge/${challengeId}`,
      icon: new URL("/logo.png", requestUrl.origin).toString(),
      label: "Challenge created",
    };

    return Response.json(payload, {
      headers,
    });
  } catch (err) {
    console.error(err);
    let actionError: ActionError = { message: "An unknown error occurred" };
    if (typeof err == "string") actionError.message = err;
    return Response.json(actionError, {
      status: 400,
      headers,
    });
  }
};
