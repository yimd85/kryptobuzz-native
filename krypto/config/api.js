import axios from "axios";

const api = {
  getCoinData() {
    let url = "https://api.coinmarketcap.com/v1/ticker/?limit=2";
    return axios.get(url).then(res => res.data);
  },
  getlast7() {
    let url = "https://min-api.cryptocompare.com/data/histoday?fsym=ETH&tsym=USD&limit=7&aggregate=1&e=Kraken&extraParams=your_app_name";
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
