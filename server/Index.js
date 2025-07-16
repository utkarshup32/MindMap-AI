require('dotenv').config();
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

const aiRoutes = require('./Routes/ai');
app.use('/api/ai', aiRoutes); // 👈 This should be mounted here

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
