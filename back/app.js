const express = require("express");
const app = express();
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const categorieRoutes = require("./routes/categorieRoutes");
const entiteRoutes = require("./routes/entiteRoutes")
const apiLimiter = require("./middleware/expressRateLimit");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const cors = require("cors");

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/login/", apiLimiter);

app.use(userRoutes);
app.use(postRoutes);
app.use(categorieRoutes);
app.use(entiteRoutes);





module.exports = app;