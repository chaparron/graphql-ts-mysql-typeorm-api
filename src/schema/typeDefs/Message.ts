import { GraphQLBoolean, GraphQLObjectType, GraphQLString } from "graphql";

export const MessageType = new GraphQLObjectType({
  name: "message",
  fields: {
    success: { type: GraphQLBoolean },
    message: { type: GraphQLString },
  },
});
