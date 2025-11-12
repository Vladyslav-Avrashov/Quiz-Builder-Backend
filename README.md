# 🚀 Quiz Builder Backend

A **REST API** for creating, managing, and retrieving quizzes.
Built with **Node.js**, **Express**, **TypeScript**, and **MongoDB**, featuring a clean service-controller architecture, request validation, and robust error handling.

## 🛠️ Prerequisites

Before you begin, ensure you have the following installed:

- 🟢 Node.js (v24.x or later recommended)

- 📦 npm (usually comes with Node.js)

- 🌿 Git

- 💻 Code editor (like VS Code)

- 📮 REST API client (like Postman or Insomnia)

### 💾 1. How to Set Up the Database

This project requires a MongoDB database.
Recommend using MongoDB Atlas for a free cloud-hosted database.

**🔹 Steps**:

**1. Create a Cluster:**
Go to [MongoDB Atlas](https://www.mongodb.com/products/platform/atlas-database), and create a free M0 Sandbox cluster.

**2. Create a User:**
Under “Database Access”, create a new user.
Save the username and password.

**3. Allow Network Access:**
Under “Network Access”, add
`0.0.0.0/0`

(Allow Access from Anywhere) so your local machine and Render (for deployment) can connect.

**4. Get Cluster URL:**
Go to **“Databases → Connect → Drivers”**.
Copy the connection string — it starts with:
`mongodb+srv://...`

The part between `@` and `/` is your **cluster URL**.

## 🔑 Environment Variables

Create a file named `.env` in the root directory of the project.

Copy the following contents into your `.env` file:
```bash
# MongoDB Connection Details from Atlas
MONGODB_USER=YOUR_DATABASE_USERNAME
MONGODB_PASSWORD=YOUR_DATABASE_PASSWORD
MONGODB_URL=YOUR_CLUSTER_URL.mongodb.net
MONGODB_DB=quizdb

# Server Port (default is 3000 if not specified)
PORT=3000
```

🧩 Replace the placeholder values with your actual MongoDB Atlas credentials.

### ⚡️ 2. How to Start the Backend

Now that your database is configured, you can install dependencies and run the server.

**🧱 Clone the repository:**
```bash
git clone https://github.com/YOUR_USERNAME/quiz-builder-backend.git
cd quiz-builder-backend
```
**📦 Install dependencies:**
```bash
npm install
```
**💻 Run in Development Mode**
This command starts the server with nodemon, which will automatically restart when you save a file.
```bash
npm run dev
```
**✅ You should see:**
```bash
MongoDB: Connection successfully established!
Server is running on port 3000
```
🚀 Run in Production Mode

This compiles your TypeScript code into JavaScript (in the `/dist` folder) and runs the optimized version.
```bash
# Step 1: Build the project
npm run build

# Step 2: Start the server
npm start
```
### 👩‍💻 3. How to Create a Sample Quiz (API Usage)

You can interact with the running API using **Postman** or **Insomnia**.

---

### 📚 API Endpoints

| Method | Endpoint | Description |
|:-------|:----------|:-------------|
| **POST** | `/api/quizzes` | 📝 Creates a new quiz |
| **GET** | `/api/quizzes` | 📋 Gets a list of all quizzes (title only) |
| **GET** | `/api/quizzes/:id` | 📘 Gets full details of a single quiz by ID |
| **DELETE** | `/api/quizzes/:id` | 🗑️ Deletes a quiz by ID |


##🎯 Example: Creating a Quiz

**Tool:** Postman
**Method:** `POST`
**URL:** `http://localhost:3000/api/quizzes`
**Body:** (Select **raw → JSON**)
Paste the following:
```bash
{
  "title": "JavaScript Fundamentals",
  "questions": [
    {
      "text": "What does 'typeof null' return?",
      "options": ["null", "undefined", "object"],
      "correctAnswerIndex": 2
    },
    {
      "text": "Which of these is NOT a primitive type?",
      "options": ["string", "number", "array", "boolean"],
      "correctAnswerIndex": 2
    }
  ]
}
```
## ✅ Success Response (Status: 201 Created)
```bash
{
  "title": "JavaScript Fundamentals",
  "questions": [
    {
      "text": "What does 'typeof null' return?",
      "options": ["null", "undefined", "object"],
      "correctAnswerIndex": 2
    },
    {
      "text": "Which of these is NOT a primitive type?",
      "options": ["string", "number", "array", "boolean"],
      "correctAnswerIndex": 2
    }
  ],
  "_id": "664f6b158b4d8c7c7f1a3b9c",
  "createdAt": "2024-05-23T14:43:01.373Z",
  "updatedAt": "2024-05-23T14:43:01.373Z"
}
```
## ❌ Error Response (Status: 400 Bad Request)

If you send invalid data (e.g., forget the `"title"`), the validation middleware will catch it and return a descriptive error:
```bash
{
  "status": 400,
  "message": "Bad Request",
  "data": {
    "message": "\"title\" is required"
  }
}
```
