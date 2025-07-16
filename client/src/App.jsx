import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [message, setMessage] = useState('');
  const [topic, setTopic] = useState('');
  const [mindMap, setMindMap] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // 🟢 Backend Ping Test
  useEffect(() => {
    axios.get('http://localhost:5000/api/ai/ping')

      .then(res => {
        setMessage(res.data.message);
      })
      .catch(() => {
        setMessage('❌ Backend not connected');
      });
  }, []);

  // 🧠 Submit topic to generate mind map
  const generateMindMap = async () => {
    setLoading(true);
    setError('');
    setMindMap(null);

    try {
      const res = await axios.post('http://localhost:5000/api/ai/generate', {
        topic: topic
      });
      setMindMap(res.data);
    } catch (err) {
      console.error(err);
      setError('Error generating mind map.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '2rem', maxWidth: '600px', margin: 'auto' }}>
      <h1>🧠 MindMap.AI</h1>

      {/* ✅ Backend Status */}
      <p style={{ color: message.includes('connected') ? 'green' : 'red' }}>{message}</p>

      {/* 📝 Topic Input */}
      <input
        type="text"
        placeholder="Enter a topic..."
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        style={{ padding: '0.5rem', width: '100%', marginBottom: '1rem' }}
      />

      <button
        onClick={generateMindMap}
        disabled={loading || !topic}
        style={{ padding: '0.5rem 1rem', marginBottom: '1rem' }}
      >
        {loading ? 'Generating...' : 'Generate Mind Map'}
      </button>

      {/* ❌ Error */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* ✅ Output */}
      {mindMap && (
        <div style={{ background: '#f4f4f4', padding: '1rem', borderRadius: '8px',color: '#222'  }}>
          <h3>{mindMap.title}</h3>
          <ul>
            {mindMap.branches.map((branch, index) => (
              <li key={index}>
                <strong>{branch.label}</strong>
                <ul>
                  {branch.children.map((child, idx) => (
                    <li key={idx}>{child}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
