# 🛠️ Dummy Jira Backend

This is the backend API for a **Jira-like Task Management System**, built using **Express.js**, **MongoDB**, and **Mongoose**. It provides robust project, task, and user management APIs, with clean architecture and middleware support.

---

## 🚀 Features

- 🧑 User authentication and secure password hashing with **bcrypt**
- 🗂️ CRUD operations for **projects**, **tasks**, and **users**
- 📊 Project-level task **statistics aggregation**
- 🌐 CORS-enabled for frontend communication
- 📦 Environment variable configuration via `.env`

---

## 🏗️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Validation**: Custom validation using Joi/Zod (as per `schemaValidation.js`)
- **Auth**: JWT (planned via `ACCESS_TOKEN_SECRET`)
- **Environment Config**: dotenv

---

## 📁 Project Structure

```bash
dummy-jira/
├── config/             # Configuration (PORT, Mongo URI, etc.)
├── controllers/        # Request handlers (CRUD logic)
├── db/                 # MongoDB connection logic
├── middlewares/        # Custom middleware (validation, auth)
├── models/             # Mongoose Schemas
├── routes/             # API route definitions
├── validations/        # Request body schema validators
├── .env                # Environment variables (not committed)
└── index.js           # Main Express app entry point
```

---

## ⚙️ Getting Started

### 1⃣ Clone the Repository

```bash
git clone https://github.com/Mr-Ayush25/Assignement
cd dummy-jira
```

### 2⃣ Install Dependencies

```bash
npm install
```

### 3⃣ Configure Environment

Create a `.env` file in the root directory:

```env
# .env
EXPRESSPORT=5001
ACCESS_TOKEN_SECRET="your-secret-token"
ACCESS_TOKEN_EXPIRY=10h

# Replace with your Mongo URI
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<your-db-name>?retryWrites=true&w=majority&appName=Cluster0
```

> 🔒 **Important:** Never commit your real credentials. Use environment variables securely.

### 4⃣ Start the Server

```bash
npm run dev
```

> Server will run at: [http://localhost:5001](http://localhost:5001)

---

## 🔗 API Endpoints

| Method | Route                 | Description                           |
| ------ | --------------------- | ------------------------------------- |
| GET    | `/projects`           | List all projects                     |
| POST   | `/projects`           | Create a new project                  |
| GET    | `/projects/:id`       | Get project by ID                     |
| GET    | `/projects/:id/stats` | Task stats (with optional `?status=`) |
| POST   | `/tasks`              | Create a task                         |
| PUT    | `/tasks/:id`          | Update a task                         |
| DELETE | `/tasks/:id`          | Delete a task                         |

> Full route structure lives in `routes/index.js`.

---

## 📊 Sample Project Stats Response

```json
{
    "stats": {
        "Backlog": 4,
        "In Progress": 2,
        "Completed": 1
    }
}
```

> Add `?status=Backlog` to filter by task status.

---

## ✨ Future Enhancements

- ✅ JWT-based Authentication

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## 🙌 Acknowledgements

Built with ❤️ by \[Ayush]
