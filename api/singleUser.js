const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


router.use(express.json());

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

router.get("/", verifyToken, async (req, res, next) => {
  const { email } = req.body;
  try {
    const singleUser = await prisma.user.findUnique({
      where: {
        email
      }
    })
    res.status(201).json(singleUser);
  } catch (error) {
    res.status(404).json("No user found!");
  }
})

module.exports = router;

