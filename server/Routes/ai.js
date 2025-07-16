const express = require('express');
const router = express.Router();
const { generateMindMap } = require("../Controllers/aiController")

router.post('/generate', generateMindMap);
router.get('/ping', (req, res) => {
  res.json({ message: 'Frontend and backend are connected! 🎉' });
});

module.exports = router;
