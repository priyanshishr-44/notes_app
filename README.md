#  Notes App

## 1. Project Introduction

Notes App is a full-stack web application developed to help users create, manage, update, and delete their personal notes easily.

The application provides a user-friendly interface where users can register, log in, and manage their notes securely.

This project is developed using React.js for the frontend, Node.js and Express.js for the backend, and MongoDB for database management.

## 2. Technologies Used

### Frontend
- React.js
- Vite
- JavaScript
- HTML5
- CSS3
- Axios
- React Router DOM

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- Middleware

### Development Tools
- Visual Studio Code
- MongoDB Atlas
- Git & GitHub
- npm

## 3. Features

- **User Registration:** New users can create an account.
- **User Login:** Registered users can log in.
- **Authentication:** JWT-based authentication for user security.
- **Create Notes:** Users can create and save new notes.
- **View Notes:** Users can view their saved notes.
- **Update Notes:** Users can edit existing notes.
- **Delete Notes:** Users can delete notes they no longer need.
- **Database Integration:** MongoDB stores user and notes data.
- **Responsive Interface:** Simple and user-friendly interface.

## 4. Project Structure

```text
NotesApp/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── pages/
│   │   ├── api.js
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── notesapp/
│   ├── middlewere/
│   ├── model/
│   ├── routes/
│   ├── db.js
│   ├── server.js
│   └── package.json
│
└── README.md
```

## 5. Installation Steps

Follow these steps to run the project locally.

### Step 1: Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### Step 2: Open the Project

```bash
cd NotesApp
```

### Step 3: Install Backend Dependencies

```bash
cd notesapp
npm install
```

### Step 4: Configure Environment Variables

Create a `.env` file inside the `notesapp` folder.

Add the following variables:

```env
mongourl=YOUR_MONGODB_CONNECTION_STRING
JWT_SECRET=YOUR_SECRET_KEY
```

Replace the placeholder values with your actual configuration. Never upload your real `.env` file to GitHub.

### Step 5: Install Frontend Dependencies

Open another terminal:

```bash
cd frontend
npm install
```

## 6. How to Run Frontend

Open the VS Code terminal and navigate to the frontend folder.

```bash
cd frontend
npm run dev
```

The frontend application will run on:

```text
http://localhost:5173
```

Open this URL in your browser.

## 7. How to Run Backend

Open another terminal in VS Code and navigate to the backend folder.

```bash
cd notesapp
```

Start the backend server using the configured npm script.

If your `package.json` has a start script:

```bash
npm start
```

Alternatively, if no start script is configured:

```bash
node server.js
```

The backend server will run on its configured local port.

## 8. Database

MongoDB Atlas is used as the database service.

It stores:
- User information
- User authentication data
- Notes created by users

Mongoose is used to connect the Node.js backend with MongoDB.

## 9. Project Objective

The main objective of this project is to understand and implement full-stack web development concepts, including frontend development, backend APIs, database connectivity, authentication, and CRUD operations.

## 10. Author

**Priyanshi Sharma**

B.Sc. Computer Science

Developed as a Full Stack Web Development Project.
