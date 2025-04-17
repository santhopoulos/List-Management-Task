// backend/index.js
import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 10000;

// Enable CORS & JSON parsing
app.use(cors());
app.use(express.json());

// Serve static files from the frontend folder
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendPath = path.join(__dirname, 'frontend');
app.use(express.static(frontendPath));

// Serve index.html for the root route
app.get('/', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

// --- API ROUTES ---

// Get subscribers
app.get('/subscribers', async (req, res) => {
  const { CM_API_KEY, CM_LIST_ID } = process.env;
  try {
    const response = await axios.get(
      `https://api.createsend.com/api/v3.3/lists/${CM_LIST_ID}/active.json`,
      {
        auth: {
          username: CM_API_KEY,
          password: '',
        },
      }
    );

    const subscribers = response.data.Results.map(sub => ({
      name: sub.Name,
      email: sub.EmailAddress,
      id: sub.SubscriberID,
    }));

    res.json(subscribers);
  } catch (error) {
    console.error('Error fetching subscribers:', error.message);
    res.status(500).json({ error: 'Failed to fetch subscribers' });
  }
});

// Add subscriber
app.post('/add-subscriber', async (req, res) => {
  const { name, email } = req.body;
  const { CM_API_KEY, CM_LIST_ID } = process.env;

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  try {
    const response = await axios.post(
      `https://api.createsend.com/api/v3.3/subscribers/${CM_LIST_ID}.json`,
      {
        EmailAddress: email,
        Name: name,
        ConsentToTrack: 'Yes',
      },
      {
        auth: {
          username: CM_API_KEY,
          password: '',
        },
      }
    );

    res.json({ message: 'Subscriber added successfully', data: response.data });
  } catch (error) {
    console.error('Error adding subscriber:', error.message);
    res.status(500).json({ error: 'Failed to add subscriber' });
  }
});

// Delete subscriber
app.delete('/delete-subscriber', async (req, res) => {
  const { email } = req.query;
  const { CM_API_KEY, CM_LIST_ID } = process.env;

  if (!email) {
    return res.status(400).json({ error: 'Email address is required' });
  }

  try {
    const response = await axios.delete(
      `https://api.createsend.com/api/v3.3/subscribers/${CM_LIST_ID}.json`,
      {
        params: { email },
        auth: {
          username: CM_API_KEY,
          password: '',
        },
      }
    );

    if (response.status === 200) {
      return res.json({ message: `Subscriber ${email} removed successfully.` });
    } else {
      return res.status(500).json({ error: 'Failed to remove subscriber' });
    }
  } catch (error) {
    console.error('Error deleting subscriber:', error.message);
    return res.status(500).json({ error: 'Failed to remove subscriber' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
