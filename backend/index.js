// backend/index.js
import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Backend is running');
});

// Endpoint to get the list of subscribers
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

// Endpoint to add a new subscriber
app.post('/add-subscriber', async (req, res) => {
  const { name, email } = req.body;
  const { CM_API_KEY, CM_LIST_ID } = process.env;

  // const startTime = Date.now();  // Start timer to check if local server has the problem. --> Their Api is slow 

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  try {
    const response = await axios.post(
      `https://api.createsend.com/api/v3.3/subscribers/${CM_LIST_ID}.json`,
      {
        EmailAddress: email,
        Name: name,
        ConsentToTrack: "Yes", // Set automatically to "Yes"
      },
      {
        auth: {
          username: CM_API_KEY,
          password: '',
        },
      }
    );


    // const endTime = Date.now();  // End timer
    // console.log(`Add subscriber processed in ${endTime - startTime}ms`);

    // Success
    res.json({ message: 'Subscriber added successfully', data: response.data });
  } catch (error) {
    console.error('Error adding subscriber:', error.message);
    res.status(500).json({ error: 'Failed to add subscriber' });
  }
});

// Endpoint to remove a subscriber
app.delete('/delete-subscriber', async (req, res) => {
  const { email } = req.query; // Get the email from query parameters
  const { CM_API_KEY, CM_LIST_ID } = process.env;

  if (!email) {
    return res.status(400).json({ error: 'Email address is required' });
  }

  try {
    // Make a DELETE request to the Campaign Monitor API to remove the subscriber by email (no wy to get ID)
    const response = await axios.delete(
      `https://api.createsend.com/api/v3.3/subscribers/${CM_LIST_ID}.json`, // Use the correct endpoint as per the API documentation
      {
        params: {
          email: email, // Pass the email as a query parameter in the URL
        },
        auth: {
          username: CM_API_KEY, // Authentication using the API key
          password: '',
        },
      }
    );

    // Check if the deletion was successful
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


// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
