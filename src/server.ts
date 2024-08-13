import app from "./app";
import config from "./app/config";
import mongoose from "mongoose";
import { Server } from "http";

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    server = app.listen(config.port, () => {
      console.log(`app listening on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();

process.on('unhandledRejection', () => {
  console.log('unhandled rejection detected. shutting down .....')
  if (server) {
    server.close(() => {
      process.exit()
    })
  }
  process.exit()
})

process.on('uncaughtException', () => {
  console.log('uncaught exception detected. shutting down .....')
  process.exit()
})

