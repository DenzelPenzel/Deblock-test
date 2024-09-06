const url =
  'https://api.coingecko.com/api/v3/simple/price?ids=ethereum,bitcoin&vs_currencies=eur';

export async function fetchPrices(): Promise<any> {
  try {
    const response = await fetch(url, {
      method: "GET",
    });
    return await response.json();
  } catch (error) {
    console.log(
      `sendRequest: error sending request: ${(error as Error).message}`,
    );
    throw error;
  }
}
