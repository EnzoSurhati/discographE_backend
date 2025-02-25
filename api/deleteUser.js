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

router.delete("/:email", verifyToken, async (req, res, next) => {
  const { email } = req.params;
  try {
    const deleteUser = await prisma.user.delete({
      where: {
        email
      },
    })
    res.status(201).json({ message: "Successful deletion!", deleteUser});
  } catch (error) {
    res.status(404).json("No user was found or already deleted!");
  }
})


module.exports = router;