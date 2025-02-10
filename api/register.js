const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.use(express.json());


router.post("/", async (req, res, next) =>{
  const { email, firstname, lastname, password } = req.body;
  try {
    const hashPassword = await bcrypt.hash(password, 5);
    const user = await prisma.user.create({
      data: {
        email,
        firstname,
        lastname,
        password: hashPassword
      },
    });
    const token = jwt.sign({email, id: user.id}, process.env.JWT_SECRET || "secret", {expiresIn: "24h"});
    res.status(201).json({token, message: "User was successfully created!"});
  } catch (error) {
    res.status(404).json({message: "Something went wrong. Try again!", error});
  }
})

module.exports = router;