import app from "./app";
import { PORT } from "./config";
import { AppDataSource } from "./db";

async function main() {
  try {
    await AppDataSource.initialize();
    app.listen(PORT);
    console.log("App listening on port:", PORT);
  } catch (error) {
    console.log(error);
  }
}

main();
