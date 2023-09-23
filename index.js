const express = require("express");
const { productRoute } = require("./routes/categories.route");
const { connection } = require("./config/db");
const { userRouter } = require("./routes/user.route");
const { cartRoute } = require("./routes/cart.route");
const { orderRouter } = require("./routes/order.route");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");

require("dotenv").config();
const app = express();

app.use(express.json());

const swaggerDocument = YAML.load("swagger.yaml");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (req, res) => {
  res.send("E-COMMERCE");
});

app.use("/product", productRoute);
app.use("/user", userRouter);
app.use("/cart", cartRoute);
app.use("/order", orderRouter);

app.listen(process.env.port, async (req, res) => {
  try {
    await connection;
    console.log(`server is running is on ${process.env.port}`);
  } catch (error) {
    console.log("error while running");
  }
});
