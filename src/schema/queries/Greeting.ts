import { GraphQLString } from "graphql";

export const GREETING = {
  type: GraphQLString,
  resolve: () => "Hello world",
};
// Graphql tiene sus propios tipos
// hay que importarlos para que se autodocumente
