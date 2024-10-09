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

export function shuffleArray(array: string[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
