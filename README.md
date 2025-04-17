# List Management Task

A simple web app for managing a Campaign Monitor mailing list — view subscribers, add new ones, and remove existing ones.

---

## Tech Stack

- **Frontend**: HTML, CSS, Vanilla JavaScript
- **Backend**: Node.js with Express
- **API Integration**: [Campaign Monitor API](https://www.campaignmonitor.com/api/)

---

##  Setup & Running Instructions

### 1. Unzip the Project

Extract the contents of the zip file and open the file in your editor of choice.

### 2. Install Dependencies
Open the project folder in your editor and in the terminal type: 

cd backend
npm install

This will install all the required modules listed in the package.json

## 3. Start the Backend Server

In the terminal cd to the "backend" folder and type:

node index.js

The server will start at http://localhost:3000

## 4. Open the Frontend
In your browser or via live server open "frontend/index.html"

You should be seeing the list of the subscribers.

## 5. Notes
 The Campaign Monitor API can take several seconds to reflect changes. A note and a polling strategy have been implemented to improve UX.

The form includes validation (e.g., name must contain only letters and numbers, email must be valid)
