# 🏛 Complaint Management System

A **React.js application** for managing public complaints with role-based access for citizens and department officials. The app allows users to sign up, log in, file complaints, and track their statuses, while officials can update statuses, provide descriptions, and manage complaints.

---

## 🚀 Features

### 👤 User (Citizen)

* Sign up with profile photo and details.
* Log in securely with stored credentials.
* File complaints with relevant details.
* View complaint status updates in real-time.

### 🏢 Department Official

* Access **Resolve Complaints** page.
* Search and filter complaints.
* Update complaint status (`Pending`, `Work Initiation`, `In Progress`, `Completed`, `Rejected`).
* Provide department-side description.
* Report violations and mark complaints accordingly.
* Like button support for engagement.

### 🔒 General

* Data persistence via **localStorage** (no backend).
* Role-based navigation (different views for citizens and officials).
* Profile page with editable fields and photo preview.

---

## 📂 Project Structure

```bash
complaint-management/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── components/
│   │   ├── Home.js
│   │   ├── Signup.js
│   │   ├── Login.js
│   │   ├── Profile.js
│   │   ├── Complaints.js
│   │   └── ResolveComplaints.js
│   ├── styles/
│   │   ├── home.css
│   │   ├── signup.css
│   │   ├── profile.css
│   │   ├── complaints.css
│   │   └── resolveComplaints.css
│   ├── App.js
│   └── index.js
├── package.json
└── README.md
```

---

## ⚙️ Installation & Setup

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/complaint-management.git
cd complaint-management
```

2. **Install dependencies**

```bash
npm install
```

3. **Start the development server**

```bash
npm start
```

4. Open in browser:

```
http://localhost:3000
```

---

## 🧩 Usage

* **Citizens**: Sign up → Log in → File complaints → Track status.
* **Officials**: Log in → Go to *Resolve Complaints* → Update status / description.
* **Profile page**: Edit personal info, preview photos, update details.

---

## 🛠 Tech Stack

* **Frontend**: React.js (functional components + hooks)
* **Styling**: CSS (modular per component)
* **Storage**: Browser localStorage (temporary, no backend)

---

## 📌 Future Improvements

* Integrate real backend (Node.js + Express + MongoDB).
* Add authentication & JWT tokens.
* Role-based authorization.
* File upload handling with cloud storage.
* Real-time complaint tracking via WebSocket.

---

## 🤝 Contributing

1. Fork this repository.
2. Create a new branch (`feature/new-feature`).
3. Commit changes (`git commit -m 'Add new feature'`).
4. Push to your branch (`git push origin feature/new-feature`).
5. Open a Pull Request.
