# 🚀 Team Task Manager

A **modern full-stack task management system** built with the MERN stack that helps teams manage projects, assign tasks, and track progress efficiently with a clean SaaS-style UI.

---

## 🌐 Live Demo

🔗 https://team-task-manager-3ggn.onrender.com/login

---

## ✨ Features

### 🔐 Authentication

* Secure Signup & Login (JWT-based)

### 👥 Role-Based Access Control

* **Admin**

  * Create/Delete Projects
  * Create/Delete Tasks
* **Member**

  * View assigned tasks
  * Update task status

### 📁 Project Management

* Create and manage projects
* Assign team members

### ✅ Task Management

* Create and assign tasks
* Track status:

  * To Do
  * In Progress
  * Done
* Set priority and due dates

### 📊 Dashboard

* Task statistics overview
* Status tracking
* Overdue task monitoring

### 🎨 Modern UI

* Dark SaaS-style dashboard
* Sidebar navigation
* Responsive design
* Built with Tailwind CSS

---

## 🛠 Tech Stack

### Frontend

* React.js
* Tailwind CSS
* React Router

### Backend

* Node.js
* Express.js

### Database

* MongoDB

---

## 📂 Project Structure

```bash
team-task-manager/
│
├── backend/                # API & Server
│   ├── config/
│   ├── routes/
│   ├── models/
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── Layout.js
│   │   │
│   │   ├── pages/
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── Dashboard.js
│   │   │   ├── Projects.js
│   │   │   └── Tasks.js
│   │   │
│   │   ├── api.js
│   │   └── App.js
│   │
│   └── build/             # Production build (served by backend)
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/YOUR-USERNAME/team-task-manager.git
cd team-task-manager
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
npm start
```

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm start
```

---

## 🔑 Environment Variables

Create `.env` file in backend:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

---

## 🚀 Deployment

* Frontend is built using:

```bash
npm run build
```

* Backend serves frontend build using Express:

```js
app.use(express.static(path.join(__dirname, "../frontend/build")));
```

* Deployed on **Render**

---

## 📸 Screenshots

### 🔐 Login Page

<img width="1915" height="919" alt="Screenshot 2026-05-03 031017" src="https://github.com/user-attachments/assets/b9f5b4e4-9e4b-48f8-a258-bd76c1e09c55" />


### 📊 Dashboard

<img width="1919" height="923" alt="Screenshot 2026-05-03 031100" src="https://github.com/user-attachments/assets/a6d91345-7776-43a3-bc54-d8bcc8384e92" />


### 📁 VS Code screenshots
<img width="1919" height="1079" alt="Screenshot 2026-05-03 031332" src="https://github.com/user-attachments/assets/fa7c7e54-6963-401e-a9be-5375905d0f91" />


## 🌟 Future Improvements

* Real-time updates 
* Notifications system
* Dark mode toggle

---

## 👨‍💻 Author

**Yashveer Singh**

* 💼 Full Stack Developer (MERN)
* 📧 [yashveer.singh3535@gmail.com](mailto:yashveer.singh3535@gmail.com)
* 🔗 LinkedIn: https://www.linkedin.com/in/yash-veer-singh-592756255

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!
