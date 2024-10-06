import {
  ActionPostResponse,
  createPostResponse,
  ActionGetResponse,
  ActionPostRequest,
  createActionHeaders,
  ActionError,
  LinkedAction,
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
  try {
    const requestUrl = new URL(req.url);
    const actions: LinkedAction[] = [
      {
        type: "transaction",
        label: "Create Challenge",
        href: "/api/actions/create-challenge?truth1={truth1}&truth2={truth2}&lie={lie}&amount={amount}",
        parameters: [
          {
            name: "truth1",
            label: "Truth 1",
            required: true,
            type: "text",
          },
          {
            name: "truth2",
            label: "Truth 2",
            required: true,
            type: "text",
          },
          {
            name: "lie",
            label: "Lie",
            required: true,
            type: "text",
          },
          {
            name: "amount",
            label: "Bet Amount (in SOL)",
            required: true,
            type: "number",
          },
        ],
      },
    ];
    const payload: ActionGetResponse = {
      type: "action",
      title: "Truth N Lie",
      icon: new URL("/logo.png", requestUrl.origin).toString(),
      description:
        "Create a new challenge for the 2 Truths and 1 Lie game. \nProvide two truths and one lie, and let you friend guess which one is the lie.",
      label: "Create Challenge",
      links: {
        actions,
      },
    };
    return Response.json(payload, {
      headers,
    });
  } catch (err) {
    console.log(err);
    let actionError: ActionError = { message: "An unknown error occurred" };
    if (typeof err == "string") actionError.message = err;
    return Response.json(actionError, {
      status: 400,
      headers,
    });
  }
};

// DO NOT FORGET TO INCLUDE THE `OPTIONS` HTTP METHOD
// THIS WILL ENSURE CORS WORKS FOR BLINKS
export const OPTIONS = async () => Response.json(null, { headers });

// export const POST = async (req: Request) => {
//   try {
//     const requestUrl = new URL(req.url);

//     return Response.json(payload, {
//       headers,
//     });
//   } catch (err) {
//     console.log(err);
//     let actionError: ActionError = { message: "An unknown error occurred" };
//     if (typeof err == "string") actionError.message = err;
//     return Response.json(actionError, {
//       status: 400,
//       headers,
//     });
//   }
// };

function validatedQueryParams(requestUrl: URL) {
  let truth1: string;
  let truth2: string;
  let lie: string;
  let amount: number;

  try {
    truth1 = requestUrl.searchParams.get("truth1")!;
    if (!truth1) throw "truth1 is required";
  } catch (err) {
    throw "Invalid input query parameter: truth1";
  }

  try {
    truth2 = requestUrl.searchParams.get("truth2")!;
    if (!truth2) throw "truth2 is required";
  } catch (err) {
    throw "Invalid input query parameter: truth2";
  }

  try {
    lie = requestUrl.searchParams.get("lie")!;
    if (!lie) throw "lie is required";
  } catch (err) {
    throw "Invalid input query parameter: lie";
  }

  try {
    amount = parseFloat(requestUrl.searchParams.get("amount")!);
    if (isNaN(amount) || amount <= 0) throw "amount is too small";
  } catch (err) {
    throw "Invalid input query parameter: amount";
  }

  return {
    truth1,
    truth2,
    lie,
    amount,
  };
}
