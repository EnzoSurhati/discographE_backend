require('dotenv').config();
const express = require('express');
const app = express();
const PORT = 3000;
const api = require("./api/index");
const jwt = require("jsonwebtoken");
const stripeRoutes = require("./api/stripePayments");
const cors = require("cors");
const deleteUserRoute = require('./api/deleteUser');

app.use(express.json());
app.use(cors({origin: ["http://localhost:5173"]}))
app.use("/api/stripePayments", stripeRoutes);


const verifyToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if(!authHeader){
    return res.status(401).json("No token present");
  }
  const token = authHeader.split(" ")[1];
  if(!token){
    return res.status(404).json("Error");
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) =>{
    if(err){
      console.log("verification failed");
      return res.status(401).json({message: "Unauthorized", err})
    }
    req.user = decoded;
    console.log('DECODE', decoded)
    next();
  })
}

app.use("/api", api);
app.use("/api/deleteUser", deleteUserRoute);

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});

module.exports = { verifyToken };