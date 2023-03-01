import express from "express";
import { graphqlHTTP } from "express-graphql";
import { schema } from "./schema";

const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    graphiql: true,
    schema,
    // Imprescindible Schema para el funcionamiento
    // schema: schema  importado de ./schema
  })
);

export default app;
