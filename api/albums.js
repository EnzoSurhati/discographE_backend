const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.use(express.json());

router.get("/", async (req, res, next) => {
  try {
    const allAlbums = await prisma.album.findMany()
    res.status(201).json(allAlbums);
  } catch (error) {
    res.status(404).json("No album found!");
  }
})

router.get("/:id", async (req, res, next) => {
  const {id} = req.params;
  try {
    const singleAlbum = await prisma.album.findUnique({
      where: {
        id: +id
      }
    })
    res.status(201).json(singleAlbum);
  } catch (error) {
    res.status(404).json("No album found!");
  }
});

router.delete("/:id", async (req, res, next) => {
  const {id} = req.params;
  try {
    const singleAlbum = await prisma.album.delete({
      where: {
        id: +id
      }
    })
    res.status(201).json("Deleted!");
  } catch (error) {
    res.status(404).json("Could not delete!");
  }
});

router.patch("/:id", async (req, res, next) => {
  const {id} = req.params;
  const {purchaseQuantity} = req.body;
  try {
    const currentQuantity = await prisma.album.findUnique({
      where: {
        id: +id
      }
    });
    console.log(currentQuantity);
  } catch (error) {
    
  }
  if (currentQuantity.quantity < purchaseQuantity){
    return res.send("stock too low")
  }
  
  let newQuantity = currentQuantity.quantity - purchaseQuantity;

  try {
    const dbNewQuantity = await prisma.album.update({
      where: {
        id: +id
      },
      data: {
        quantity: newQuantity 
      }
    })
    console.log(dbNewQuantity);
    res.status(201).json(dbNewQuantity);
  } catch (error) {
    res.status(404).json("problem adjusting the quantity");
  }
})

module.exports = router;