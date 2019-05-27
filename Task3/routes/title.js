const express = require('express');
const router = express.Router();

//acquire controller
var titleController = require('../controllers/titleController');

//handle request to /I/want/title
router.get('/', titleController.listTitle);

module.exports = router;