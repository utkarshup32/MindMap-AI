const express = require('express');
const cors = require('cors');

require('dotenv').config();

const aiRoutes = require('./Routes/ai'); // Make sure this path is correct

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/ai', aiRoutes); // This is what wires up /api/ai/generate

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
