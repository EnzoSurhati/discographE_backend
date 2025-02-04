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
  try {
    const allUsers = await prisma.user.findMany()
    res.status(201).json(allUsers);
  } catch (error) {
    res.status(404).json("No users found!");
  }
})

router.post("/", verifyToken, async (req, res, next) => {
  try{
    console.log(req.user);
    res.status(201).json(req.user);

  }catch(err){
    console.error('couldnt get about me', err)
  }
})

module.exports = router;