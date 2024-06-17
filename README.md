# Task Management App

## Overview

This Task Management App is designed to help users efficiently manage their tasks through a structured and user-friendly interface. The application allows users to create and delete boards, tasks, and subtasks. It also includes features for user authentication, such as login and signup. The frontend is built with React, while the backend is powered by Django.

## Features

- **User Authentication**: Secure login and signup functionality.
- **Board Management**: Create and delete boards.
- **Task Management**: Create and delete tasks within boards.
- **Subtask Management**: Create and delete subtasks within tasks.
- **Responsive Design**: Ensuring compatibility across various devices.

## Technologies Used

- **Frontend**: React
- **Backend**: Django
- **Database**: SQLite (default for Django, can be replaced with PostgreSQL or others)
- **Styling**: CSS
- **API Requests**: Axios
- **State Management**:  Redux 

## Setup and Installation

### Prerequisites

- Node.js
- npm or yarn
- Python
- pip

### Backend Setup

1. **Clone the Repository**
   ```sh
   git clone https://github.com/Benkennyt/task_manager.git
   cd task_manager/backend
   ```

2. **Create a Virtual Environment**
   ```sh
   python -m venv venv
   ```

3. **Activate the Virtual Environment**
   ```sh
   # On Windows
   venv\Scripts\activate
   # On macOS/Linux
   source venv/bin/activate
   ```

4. **Install Dependencies**
   ```sh
   pip install -r requirements.txt
   ```

5. **Run Migrations**
   ```sh
   python manage.py migrate
   ```

6. **Start the Django Development Server**
   ```sh
   python manage.py runserver
   ```

### Frontend Setup

1. **Navigate to the Frontend Directory**
   ```sh
   cd ../frontend
   ```

2. **Install Dependencies**
   ```sh
   npm install
   ```

3. **Run the Development Server**
   ```sh
   npm start
   ```

### Environment Variables

Create a `.env` file in the `frontend` and `backend` directories and add the necessary environment variables as shown in the `.env.example` files.

## Project Structure

```
task_manager/
│
├── backend/
│   ├── manage.py
│   ├── backend/
│   ├── venv/
│   └── requirements.txt
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── .env
│   ├── package.json
│   └── ...
│
└── README.md
```

## Usage

1. **Access the Application**
   - Navigate to `http://localhost:3000` in your web browser.

2. **Sign Up or Log In**
   - Use the signup form to create a new account or log in with existing credentials.

3. **Create Boards**
   - Create new boards to organize your tasks.

4. **Manage Tasks**
   - Within each board, create and delete tasks as needed.

5. **Manage Subtasks**
   - Within each task, create and delete subtasks to break down your work into smaller, manageable pieces.


## Contact

For any questions or feedback, please contact me at [kehindetemitayo.b@gmail.com].
