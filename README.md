# Micro Graphql CryptoCompare Example

Note: This example was put together extremely quickly.

## Getting Started

```
yarn install
npm run dev
# npm start # for production
```

Now visit:
http://localhost:3000/graphiql?query=%7B%0A%20%20books%20%7B%0A%20%20%20%20title%0A%20%20%20%20author%0A%20%20%7D%0A%20%20coin%20%7B%0A%20%20%20%20Response%0A%20%20%20%20Type%0A%20%20%20%20Aggregated%0A%20%20%20%20TimeTo%0A%20%20%20%20TimeFrom%0A%20%20%20%20FirstValueInArray%0A%20%20%20%20Data%20%7B%0A%20%20%20%20%20%20time%0A%20%20%20%20%20%20close%0A%20%20%20%20%20%20high%0A%20%20%20%20%20%20low%0A%20%20%20%20%20%20open%0A%20%20%20%20%20%20volumefrom%0A%20%20%20%20%20%20volumeto%0A%20%20%20%20%7D%0A%20%20%20%20ConversionType%20%7B%0A%20%20%20%20%20%20type%0A%20%20%20%20%20%20conversionSymbol%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D