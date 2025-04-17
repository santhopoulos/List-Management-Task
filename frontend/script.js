const API_URL = 'http://localhost:3000';

// DOM Elements
const form = document.getElementById('addSubscriberForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const subscriberList = document.getElementById('subscriberList');

// fetch and display subscribers
async function fetchSubscribers() {
  try {
    const response = await fetch(`${API_URL}/subscribers`);
    const subscribers = await response.json();

    // Clear the current list and repopulate
    subscriberList.innerHTML = '';
    subscribers.forEach(subscriber => {
      const listItem = document.createElement('li');
      listItem.textContent = `${subscriber.name} - ${subscriber.email}`;

      // Add a remove button
      const removeButton = document.createElement('button');
      removeButton.textContent = 'Remove';
      removeButton.addEventListener('click', () => removeSubscriber(subscriber.email));
      
      listItem.appendChild(removeButton);
      subscriberList.appendChild(listItem);
    });
  } catch (error) {
    console.error('Error fetching subscribers:', error);
  }
}

// Function to add a subscriber
async function addSubscriber(name, email) {
  try {
    const response = await fetch(`${API_URL}/add-subscriber`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email })
    });

    if (response.ok) {
      fetchSubscribers(); // Refresh the list after adding
      nameInput.value = '';
      emailInput.value = '';
    } else {
      console.error('Failed to add subscriber');
    }
  } catch (error) {
    console.error('Error adding subscriber:', error);
  }
}

// Function to remove a subscriber
async function removeSubscriber(email) {
  try {
    const response = await fetch(`${API_URL}/delete-subscriber?email=${encodeURIComponent(email)}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      fetchSubscribers(); // Refresh the list after removing
    } else {
      console.error('Failed to remove subscriber');
    }
  } catch (error) {
    console.error('Error removing subscriber:', error);
  }
}

// Event listener for the form submission
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();

  // Updated validation
  const nameValid = /^[a-zA-Z0-9\s]+$/.test(name); // allows letters, numbers, spaces
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); // standard email pattern

  if (!name || !email) {
    alert('Both fields are required.');
    return;
  }

  if (!nameValid) {
    alert('Name can only contain letters, numbers, and spaces.');
    return;
  }

  if (!emailValid) {
    alert('Please enter a valid email address.');
    return;
  }

  addSubscriber(name, email);
});

// Initial fetch to load the subscribers
fetchSubscribers();


// Poll every 5 seconds because their api is slow
setInterval(() => {
  fetchSubscribers();
}, 5000);  // Refresh every 5 second
