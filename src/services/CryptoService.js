import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://api.coingecko.com/api/v3/simple",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default {
  fetchCryptoData() {
    return apiClient.get(
      "/price?ids=bitcoin%2Cethereum%2Cbinancecoin%2Clitecoin%2Cripple%2Cbitcoin-cash%2Ctornado-cash&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&include_last_updated_at=true"
    );
  },
};
