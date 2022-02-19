const express = require('express');
const router = express.Router();
const { register, login } = require('./controllers/auth');
const { getDummyUser, search } = require('./controllers/dummyData');

router.post("/register",register);
router.post("/login", login);
router.get("/getdummyuser",getDummyUser);
router.get("/search",search);

module.exports = router;