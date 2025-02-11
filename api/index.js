const express = require("express");
const router = express.Router();

const registerRoute = require('./register');
const loginRoute = require('./login');
const aboutUserRoute = require('./aboutUser');
const allUsersRoute = require('./allUsers');
const singleUserRoute = require('./singleUser');
const deleteUserRoute = require('./deleteUser');
const updateUserRoute = require('./updateUser');
const stripePaymentsRoute = require('./stripePayments');
const albumsRoute = require('./albums');

router.use(express.json());

router.use("/register", registerRoute);
router.use("/login", loginRoute);
router.use("/aboutUser", aboutUserRoute);
router.use("/allUsers", allUsersRoute); 
router.use("/singleUser", singleUserRoute);
router.use("/deleteUser", deleteUserRoute);
router.use("/updateUser", updateUserRoute);
router.use("/stripePayments", stripePaymentsRoute);
router.use("/albums", albumsRoute);

module.exports = router;