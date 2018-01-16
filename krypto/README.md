# Krypto Buzz

 <br>

### Crypto Currency Hub

Crypto currency app that allows you to read recent Crypto news and historical data for specific coins, Created by [Lester Loor](https://github.com/lesterloor)

<br>

## Getting Started

**This App will only run on iOS.**

Download the [Expo Client for iOS](https://itunes.apple.com/app/apple-store/id982107779?ct=www&mt=8).

Then, scan the QR code below:

<img src="./images/code.png" align= "center" width="100" height="100" />

or go to our [project](https://expo.io/@nethanelkohen/Daddys-Watching) on Expo.

Homepage will show recent crypto currency news. Stats page list the top coins based on market cap, Clicking the coins will render a chart with that coins last 100 days statistics.

## Project Structure

```
├── krypto    # Source code
│   ├── App.js         ## Loads react navigation
│   ├──app.json        ## Handles Expo render data
│   ├── images         ## Contains images
│   ├── components     ## Accessible components
│   │   └── Chart.js     ### Renders chart with crypto compare API data
│   │   └── CoinList.js   ### Loads top coins into list view
│   │   └── Tabs.js     ### Handles react Navigation settings
│   └── config        ### Any shared components
│       └── api.js     ### Handles api calls
│   └── screens        ### Any shared components
│       └── Home.js     ### Renders recent crypto news
│       └── Profile.js      ### Navigates to map
│       └── Stats.js      ### Handle stack navigator for Chart and Coinlist
│
└──
```

## What's Inside

Application was built using React-Native, Expo, Crypto compare api, and news.org api

## Contribute

Add to our project! Please read the [contribution guidelines](CONTRIBUTING.md) first.

# Inspiration

* [Coinstats](https://itunes.apple.com/us/app/coin-stats-crypto-portfolio/id1247849330?mt=8) - Name/concept

## License

This React-Native app is under the [MIT License](https://github.com/nethanelkohen/ByeBye/blob/master/LICENSE).
