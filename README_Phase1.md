
# 🧰 Equipment Lending Portal – Phase 1 (Manual Development)

### 🎯 Overview
The **Equipment Lending Portal** is a web application that allows students and staff to borrow and return departmental equipment.  
This version was **manually developed** using fundamental full-stack practices without any AI assistance.  

It focuses on getting the **core functionality** working end-to-end:
- Basic authentication (login/register)
- Equipment listing and borrowing
- Simple request management for approval/rejection
- SQLite-based persistent storage  

---

## 🏗️ Tech Stack
| Layer | Technology | Description |
|--------|-------------|-------------|
| Frontend | **React (Vite)** | Handles UI and page navigation |
| Backend | **Flask (Python)** | REST APIs for authentication and CRUD |
| Database | **SQLite + SQLAlchemy** | Lightweight relational database |
| Communication | **Axios + CORS** | API integration between React ↔ Flask |

---

## 📂 Project Structure
```
equipment-lending-portal/
├── backend/
│   ├── app/
│   │   ├── models.py
│   │   ├── routes/
│   │   │   ├── user_routes.py
│   │   │   ├── equipment_routes.py
│   │   │   └── request_routes.py
│   │   └── __init__.py
│   ├── run.py
│   └── requirements.txt
└── frontend/
    ├── src/
    │   ├── components/
    │   │   └── Navbar.jsx
    │   ├── pages/
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   ├── EquipmentList.jsx
    │   │   ├── MyRequests.jsx
    │   │   └── ManageRequests.jsx
    │   ├── App.jsx
    │   └── main.jsx
    └── package.json
```

---

## ⚙️ Installation & Setup

### 🖥️ Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python run.py
```
Backend runs at: `http://127.0.0.1:5001/`

### 💻 Frontend
```bash
cd frontend
npm install
npm run dev
```
Frontend runs at: `http://localhost:5173/`

---

## 🚀 Features Implemented (Phase 1)

| Feature | Description |
|----------|-------------|
| **User Authentication** | Simple login/register using JWT |
| **Equipment Management** | List and borrow equipment |
| **Borrow Requests** | Students can send requests; admins approve/reject |
| **Basic UI** | Minimal React UI for navigation and operations |
| **SQLite Integration** | Simple relational data persistence |

---

## 📡 Core API Endpoints

| Method | Endpoint | Description |
|--------|-----------|-------------|
| POST | `/api/users/register` | Register new user |
| POST | `/api/users/login` | Login and obtain JWT |
| GET | `/api/equipment/` | List all equipment |
| POST | `/api/requests/` | Create a new borrow request |
| GET | `/api/requests/my` | View current user's requests |
| PUT | `/api/requests/<id>/status` | Approve or reject request |

---

## 🗃️ Database Models
**User** – id, name, email, password, role  
**Equipment** – id, name, category, quantity, available_quantity  
**BorrowRequest** – id, user_id, equipment_id, status, dates  

---

## 🧠 Assumptions
- Trusted environment (no external OAuth).  
- Only approved requests reduce available quantity.  
- SQLite chosen for easy portability.  
- Minimal error handling (improved in Phase 2).  

---

## 🧩 Future Improvements (to be done in Phase 2)
- Role-based UI (students, staff, admin)
- Add/Edit/Delete for admins
- Enhanced request tracking and return flow
- Better styled frontend with responsive design
- AI-assisted optimization of API and component structure

---

## 📚 Documentation
See the detailed technical documentation here:  
📄 `Equipment_Lending_Portal_Documentation_UtsabRoy.docx`

---

## 👨‍💻 Author
**Utsab Roy**  
M.Tech – Software Engineering (Full Stack Specialization)  
BITS Pilani  
