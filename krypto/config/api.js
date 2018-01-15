import axios from "axios";

const api = {
  getCoinData() {
    let url = "https://api.coinmarketcap.com/v1/ticker/?limit=20";
    return axios.get(url).then(res => res.data);
  }
};
module.exports = api;

// <PricingCard
//   color="#4f9deb"
//   title={params.coinName}
//   price={params.coinPrice}
//   info={[`Open: ${coinDataState.OPENDAY}`, `Low: ${coinDataState.LOWDAY}`, `High: ${coinDataState.HIGHDAY}`]}
//   button={{ title: "BUY NOW", icon: "flight-takeoff" }}
// />
//
