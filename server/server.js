import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const users = [
  {
    id: 1,
    name: "John Doe",
    age: 30,
    isMarried: true,
  },
  {
    id: 2,
    name: "Jane Smith",
    age: 28,
    isMarried: false,
  },
];

//api endpoints in Query,Mutations --> [] List,  ! required
//Query = to query data
//Mutations = to mutate data --create
const typeDefs = `
    type Query {
        getUsers: [User]
        getUserById(id:ID!): User
    }

    type Mutations {
        createUser(name: String!, age: Int!, isMarried: Boolean): User 
    }

    type User {
        id: ID
        name: String
        age: Int
        isMarried: Boolean
    }
        `;

// resolvers tell how to interact with Query stated above
const resolvers = {
  Query: {
    getUsers: () => {
      return users;
    },
    getUserById: (parent, args) => {
      const id = args.id;
      return users.find((user) => user.id === id);
    },
  },

  Mutations: {
    createUser: (parent, args) => {
      const { name, age, isMarried } = args;
      const newUser = {
        id: users[users.length - 1].id + 1,
        name,
        age,
        isMarried,
      };
      users.push(newUser);
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`Server running on port ${url}`);
