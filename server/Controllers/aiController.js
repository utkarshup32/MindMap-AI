require('dotenv').config();
const axios = require('axios');


const generateMindMap = async (req, res) => {
  const { topic } = req.body;

  if (!topic) {
    return res.status(400).json({ error: 'Topic is required' });
  }

  try {
    console.log("🔑 Loaded API key:", process.env.OPENROUTER_API_KEY);

    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: "openai/gpt-4o",
        max_tokens: 1000,  
        messages: [
          {
            role: 'user',
            content: `Create a mind map on "${topic}" in this JSON format:

{
  "title": "Main Topic",
  "branches": [
    {
      "label": "Main Branch",
      "children": ["Subtopic 1", "Subtopic 2"]
    }
  ]
}`
          }
        ]
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'http://localhost:5173', // required
          'X-Title': 'MindMap.AI'                  // required
        }
      }
    );

    const content = response.data.choices[0].message.content;
    const jsonStart = content.indexOf('{');
    const jsonEnd = content.lastIndexOf('}');
    const mindMap = JSON.parse(content.slice(jsonStart, jsonEnd + 1));

    res.json(mindMap);
  } catch (error) {
  console.error('🛑 OpenRouter Error Message:', error.message);
  if (error.response) {
    console.error('🧾 Response Data:', error.response.data);
    console.error('📎 Status Code:', error.response.status);
    console.error('📨 Headers:', error.response.headers);
  }
  res.status(500).json({ error: 'Mind map generation failed.' });
}

};

const ping = (req, res) => {
  res.json({ message: 'Backend + OpenRouter connected ✅' });
};

module.exports = {
  generateMindMap,
  ping
};
