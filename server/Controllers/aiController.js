const OpenAI = require('openai');
require('dotenv').config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

exports.generateMindMap = async (req, res) => {
  const { topic } = req.body;

  const prompt = `Generate a structured mind map on the topic: "${topic}".
Return it in this JSON format:
{
  "title": "Topic",
  "branches": [
    {
      "label": "Main Branch",
      "children": ["Subpoint 1", "Subpoint 2"]
    }
  ]
}`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    });

    const content = completion.choices[0].message.content;
    const mindMap = JSON.parse(content);
    res.json(mindMap);
  } catch (error) {
    console.error('OpenAI Error:', error.message);
    res.status(500).json({ error: error.message });
  }
};
