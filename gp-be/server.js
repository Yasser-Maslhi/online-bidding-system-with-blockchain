const mongoose = require("mongoose");
const app = require("./app");
// const config = require("./config/config");
// const logger = require("./config/logger");
const cors = require("cors");
let server;

app.use(
  cors({
    origin: "",
    sub_origin: "",
  }),
);
// mongoose.connect(config?.mongoose?.url, config?.mongoose?.options).then(() => {
//   logger.info("Connected to MongoDB");
//   server = app.listen(config.port, () => {
//     logger.info(`Listening to port ${config.port}`);
//   });

//   // Attach WebSocket server to HTTP server created by Express
//   const io = socketIo(server, {
//     cors: {
//       origin: [
//         "",
//         "",
//         "http://localhost:3000",
//       ],
//       methods: ["GET", "POST"],
//       credentials: true,
//     },
//   });
// });

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info("Server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

// const unexpectedErrorHandler = (error) => {
//   logger.error(error);
//   exitHandler();
// };

// process.on("uncaughtException", unexpectedErrorHandler);
// process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
  logger.info("SIGTERM received");
  if (server) {
    server.close();
  }
}); 