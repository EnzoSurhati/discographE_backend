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

router.put("/:id", verifyToken, async (req, res, next) => {
  const { email, firstname, lastname, password } = req.body;
  const { id } = req.params;
  try {
    const hashPassword = await bcrypt.hash(password, 5);
    const allUsers = await prisma.user.update({
      where: {
        id: +id
      },
      data: {
        email,
        firstname,
        lastname,
        password: hashPassword
      },
    })
    res.status(201).json(allUsers);
  } catch (error) {
    res.status(404).json("Nothing was updated!");
  }
})


module.exports = router;