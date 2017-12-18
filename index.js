const micro = require('micro')
const { send } = micro;
const { get, post, router } = require('microrouter');
const { microGraphiql, microGraphql } = require("apollo-server-micro");
const { makeExecutableSchema } = require('graphql-tools');
const axios = require('axios');

// Some fake data
const books = [
  {
    title: "Harry Potter and the Sorcerer's stone",
    author: 'J.K. Rowling'
  },
  {
    title: 'Jurassic Park',
    author: 'Michael Crichton'
  }
];

// The GraphQL schema in string form
const typeDefs = `
  type Query {
    books: [Book]
    coin: Coin
  }

  type Book {
    title: String
    author: String
  }

  type Coin {
    Response: String
    Type: String
    Aggregated: Boolean
    TimeTo: Int
    TimeFrom: Int
    FirstValueInArray: Boolean
    Data: [CoinData]
    ConversionType: ConversionType
  }

  type CoinData {
    time: Float
    close: Float
    high: Float
    low: Float
    open: Float
    volumefrom: Float
    volumeto: Float
  }

  type ConversionType {
    type: String
    conversionSymbol: String
  }
`;

// The resolvers
const resolvers = {
  Query: {
    books: () => books,
    coin: async () => {
      const url = 'https://min-api.cryptocompare.com/data/histoday?fsym=BTC&tsym=USD&limit=12';
      
      return await axios
        .get(url)
        .then(response => {
          console.log('graphql response:', response.data);
          return response.data;
        }).catch(err => {
          console.log('graphql error:', err);
        });
    },
  }
};

// Put together a schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

const graphqlHandler = microGraphql({ schema });
const graphiqlHandler = microGraphiql({ endpointURL: '/graphql' });

const server = micro(
  router(
    get('/graphql', graphqlHandler),
    post('/graphql', graphqlHandler),
    get('/graphiql', graphiqlHandler),
    (req, res) => send(res, 404, 'not found')
  )
);

server.listen(3000);
