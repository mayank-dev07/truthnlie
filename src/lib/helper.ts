/**
 * Validates and extracts query parameters from the given URL for creating a challenge.
 *
 * @param {URL} requestUrl - The URL containing the query parameters.
 * @returns {Object} An object containing the validated query parameters:
 * - `truth1` {string}: The first truth statement.
 * - `truth2` {string}: The second truth statement.
 * - `lie` {string}: The lie statement.
 * - `competitors` {number}: The number of competitors, must be a positive number.
 * - `amount` {number}: The amount, must be a positive number.
 *
 * @throws Will throw an error if any of the required query parameters are missing or invalid:
 * - "Invalid input query parameter: truth1" if `truth1` is missing or invalid.
 * - "Invalid input query parameter: truth2" if `truth2` is missing or invalid.
 * - "Invalid input query parameter: lie" if `lie` is missing or invalid.
 * - "Invalid input query parameter: competitors" if `competitors` is missing, not a number, or not a positive number.
 * - "Invalid input query parameter: amount" if `amount` is missing, not a number, or not a positive number.
 */
export function validatedCreateChallengeQueryParams(requestUrl: URL) {
  let truth1: string;
  let truth2: string;
  let lie: string;
  let competitors: number;
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
    competitors = parseInt(requestUrl.searchParams.get("competitors")!);
    if (isNaN(competitors) || competitors <= 0)
      throw "competitors should be a positive number";
  } catch (err) {
    throw "Invalid input query parameter: competitors";
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
    competitors,
    amount,
  };
}

/**
 * Shuffles an array of strings in place using the Fisher-Yates algorithm.
 *
 * @param array - The array of strings to shuffle.
 * @returns The shuffled array.
 */
export function shuffleArray(array: string[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
