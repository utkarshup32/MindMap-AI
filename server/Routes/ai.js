const express = require('express');
const router = express.Router();
const { generateMindMap } = require('../controllers/aiController');

router.post('/generate', generateMindMap);

module.exports = router;
