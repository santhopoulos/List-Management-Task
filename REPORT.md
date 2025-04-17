# Task Report Template

## Overall Process
Describe the overall process you went through in completing the task.
1. Test the communication with the Campaingn Manager API through POSTMAN to ensure that you can talk with their API. Some simple GET, POST and DELETE requests to ensure that interaction is working so we can move on to interact locally with their API.
2. Structure the project and split it into frontend and backend. Keep the structure simple.
3. Make a .env file to stop the API keys.
4. Implement the backend so that it can interact with the Campaign Monitor API. Implement the routes to fetch, add and delete subscribers from the list.
5. Implement the front end so that is clean, easy to use and interacts correctly with the backend
6. Test the overall application.

## Key Decisions
some key decision: Keep the file structure as simple as possible. Add a polling method so the UI finally updates. Some simple form validation. Ensure that the backend is working correctly and that i can locally interact with their API before starting with the front end. Test all routes: Example:  http://localhost:3000/subscribers

## Challenges and Unexpected Issues
What actually slowed me down was the fact that Campaign Monitor would not let me create an account on their website. Even the "forgot your password" butons did not seem to work. I could not access the API keys so i could not talk with their API. However, Melina came to the rescue and provided me with some legit API keys. 

## Problems and Solutions
Could not authenticate with their API --> Melina sent me API keys to do so.
UI was not updating because of their slow API --> I used setInterval() to update the UI every 5 seconds.

## Tools and Techniques
List the tools and techniques you used to complete the task.
POSTMAN (Test the API)
VSCODE (fav editor)
CHATGPT (Regex, debugging)
CAMPAINGN MONITOR DOCUMENTATIONS