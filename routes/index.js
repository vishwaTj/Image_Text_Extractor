const express = require('express');
const router = express.Router();
const HomeController = require('../controllers/Home_controller');
console.log("router Loaded");

router.get('/', HomeController.Home);
router.post('/',HomeController.fileupload);

module.exports = router;