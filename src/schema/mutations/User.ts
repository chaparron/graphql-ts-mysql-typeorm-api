import {
  GraphQLBoolean,
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLString,
} from "graphql";
import { Users } from "../../entities/Users";
import { UserType } from "../typeDefs/User";
import bcrypt from "bcryptjs";
import { MessageType } from "../typeDefs/Message";

export const CREATE_USER = {
  type: UserType,
  // Ahora sí, con el UserType creado es lo que devolveremos
  args: {
    name: { type: GraphQLString },
    username: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  async resolve(_: any, args: any) {
    const { name, username, password } = args;

    const encryptPassword = await bcrypt.hash(password, 10);

    const result = await Users.insert({
      name,
      username,
      password: encryptPassword,
    });
    return { ...args, id: result.identifiers[0].id, password: encryptPassword };
  },
};

export const DELETE_USER = {
  type: GraphQLBoolean,
  args: {
    id: { type: GraphQLID },
  },
  async resolve(_: any, { id }: any) {
    const result = await Users.delete(id);
    if (result.affected === 1) return true;
    // el objeto que devuelve tiene en affected 1 si lo ha eliminado
    return false;
  },
};

export const UPDATE_USER = {
  type: MessageType,
  args: {
    id: { type: GraphQLID },
    input: {
      type: new GraphQLInputObjectType({
        name: "userInput",
        fields: {
          name: { type: GraphQLString },
          username: { type: GraphQLString },
          oldPassword: { type: GraphQLString },
          newPassword: { type: GraphQLString },
        },
      }),
    },
  },
  async resolve(_: any, { id, input }: any) {
    const userFound = await Users.findOneBy({ id });
    if (userFound === null)
      return {
        success: false,
        message: "User not found",
      };
    const passwordMatch = await bcrypt.compare(
      input.oldPassword,
      userFound.password
    );
    if (!passwordMatch)
      return {
        success: false,
        message: "Password not match",
      };
    const newPasswordHash = await bcrypt.hash(input.newPassword, 10);
    const response = await Users.update(
      { id },
      { name: input.name, username: input.username, password: newPasswordHash }
    );
    if (response.affected === 0)
      return {
        success: false,
        message: "No rows affected",
      };
    return {
      success: true,
      message: "User successfully updated",
    };
  },
};
