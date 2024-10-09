import {
  ActionPostResponse,
  createPostResponse,
  ActionGetResponse,
  ActionPostRequest,
  createActionHeaders,
  ActionError,
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

    // return Response.json(payload, {
    //   headers,
    // });
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
