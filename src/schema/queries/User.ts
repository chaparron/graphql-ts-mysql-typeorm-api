import { GraphQLID, GraphQLList, GraphQLString } from "graphql";
import { Users } from "../../entities/Users";
import { UserType } from "../typeDefs/User";

export const GET_ALL_USERS = {
  type: GraphQLList(UserType),
  resolve: async () => {
    return await Users.find();
  },
};

export const GET_USER = {
  type: UserType,
  args: {
    id: { type: GraphQLID },
  },
  async resolve(_: any, args: any) {
    return await Users.findOneBy({ id: args.id });
  },
};
