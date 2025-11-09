
# 🚀 Equipment Lending Portal – Phase 2 (AI-Assisted Enhanced Version)

### 🎯 Overview
The **Equipment Lending Portal** is an advanced full-stack web application built upon the manual foundation from **Phase 1**.  
This phase demonstrates the use of **AI-assisted development tools (ChatGPT & Copilot)** to enhance, optimize, and refactor the original manual codebase.

Key goals in this phase include:
- Introducing **role-based functionality** (Student, Staff, Admin)
- Implementing **full CRUD operations** for Equipment
- Adding **Return workflow** for borrowed items
- Improving **UI design and navigation**
- Optimizing backend APIs and frontend component logic

---

## 🤖 AI-Assisted Development Details

| Tool | Usage Area | Description |
|------|-------------|-------------|
| **ChatGPT (OpenAI)** | Backend and Frontend Refactoring | Used for API restructuring, role-based UI logic, and optimized Axios usage |
| **GitHub Copilot** | Code Completion | Used for form validation, component structure suggestions |

---

## 🧠 Improvements Over Phase 1

| Area | Phase 1 | Phase 2 (AI-Assisted) |
|------|----------|----------------------|
| **Roles** | Only Student/Admin roles | Added Staff with approval rights |
| **UI** | Basic HTML UI | Responsive React UI with styled buttons and flex layouts |
| **Requests Management** | Simple approval | Full lifecycle: request → approve → return |
| **Data Mapping** | Displayed IDs only | Shows user and equipment names dynamically |
| **Backend APIs** | Minimal error handling | Structured routes with validation and better JWT logic |
| **UX** | Basic navigation | Dynamic Navbar based on role |
| **Testing** | Manual Postman tests | Automated scripts + manual validation |

---

## 🏗️ Tech Stack (Same Core, Improved Integration)

| Layer | Technology | Description |
|--------|-------------|-------------|
| Frontend | React (Vite) + Axios | Enhanced UI, modular components, API integration |
| Backend | Flask (Python) + Flask-CORS + JWT | Role-based secured REST API |
| Database | SQLite + SQLAlchemy ORM | Data persistence for users, equipment, and requests |
| Tools | Copilot, ChatGPT, Cursor | AI-based refactoring, debugging, and optimization |

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
    │   │   ├── Dashboard.jsx
    │   │   ├── EquipmentList.jsx
    │   │   ├── MyRequests.jsx
    │   │   └── ManageRequests.jsx
    │   ├── App.jsx
    │   └── main.jsx
    └── package.json
```

---

## 🚀 Key Features Implemented (Phase 2)

| Feature | Description |
|----------|-------------|
| **Role-Based Access Control** | Students, Staff, and Admin roles with specific permissions |
| **Full Equipment CRUD** | Admins can add, edit, and delete equipment |
| **Enhanced Borrow Flow** | Requests go through approval and return lifecycle |
| **Dynamic Mapping** | Equipment and user names displayed instead of IDs |
| **Return Equipment** | Students can mark equipment as returned |
| **UI Enhancements** | Styled buttons, layout, and improved readability |
| **Token-Based Auth** | Secure JWT flow integrated with Axios interceptors |
| **Optimized Backend** | Improved API error handling and modular route structure |

---

## 📡 Enhanced API Flow

1. **User Login/Register** → JWT token generated  
2. **Frontend Stores Token** → Axios automatically includes token in headers  
3. **Borrow Request** → Student requests an item  
4. **Approval Stage** → Staff/Admin reviews requests  
5. **Return Stage** → Student marks as returned  
6. **Admin Management** → Add/Edit/Delete equipment and manage approvals  

---

## 🧩 Setup Instructions

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python run.py
```
Backend runs at: `http://127.0.0.1:5001/`

### Frontend
```bash
cd frontend
npm install
npm run dev
```
Frontend runs at: `http://localhost:5173/`

---

## 💡 Architecture Overview

**Frontend:** React handles UI, state, and Axios API calls.  
**Backend:** Flask REST API for CRUD + JWT authentication.  
**Database:** SQLite stores users, equipment, and requests.  
**Communication:** JSON over HTTP with CORS enabled.

---

## 📈 AI Usage Reflection

### Example Prompts Used
- “Add staff role to approval flow in Flask routes.”  
- “Refactor React component to display equipment names instead of IDs.”  
- “Generate API documentation table for all endpoints.”

### AI Benefits
✅ Improved code efficiency and readability  
✅ Faster refactoring of redundant logic  
✅ Consistent naming conventions and structure  

### AI Limitations
⚠️ Some auto-generated suggestions caused JWT or indentation errors  
⚠️ Needed manual debugging for async Axios calls  
⚠️ Limited understanding of project context without guidance

---

## 🧠 Learnings from AI Integration
- AI tools excel at pattern-based refactoring but still require human understanding of logic flow.  
- Combining manual judgment with AI suggestions results in cleaner and more maintainable code.  
- Debugging AI-generated code deepened understanding of async frontend flows and Flask routing.  

---

## 📚 Documentation
See the full system design and API reference in:  
📄 
[Equipment_Lending_Portal_Documentation_UtsabRoy.docx](https://github.com/user-attachments/files/23441016/Equipment_Lending_Portal_Documentation_UtsabRoy.docx)

---

## 👨‍💻 Author
**Utsab Roy**  
M.Tech – Software Engineering (Full Stack Specialization)  
BITS Pilani  
