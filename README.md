# Admission Management & CRM (Minimal BRS)

## 📌 Objective
A simple web-based Admission Management system built for the **Edumerge Junior Software Developer Assignment**.  
This project demonstrates how colleges can configure programs and quotas, manage applicants, allocate seats without quota violations, confirm admissions, and view dashboards.

---

## 🚀 Features
- **Master Setup**: Institution, Campus, Department, Program, Academic Year, Course Type, Entry Type, Admission Mode
- **Seat Matrix & Quota**: Define intake, configure quotas (KCET, COMEDK, Management), enforce quota rules
- **Applicant Management**: Create applicants with basic details, category, quota type, marks, and document checklist
- **Admission Allocation**: Allocate seats with quota validation, block allocation if quota full
- **Admission Confirmation**: Confirm admission only if fee is paid, generate unique immutable admission number
- **Dashboards**: Intake vs admitted, quota-wise filled seats, remaining seats, pending documents, fee pending list

---

## 🛠 Tech Stack
- **Backend**: Node.js, Express, MongoDB (Mongoose)
- **Frontend**: React, Heroicons, Axios
- **Other**: REST APIs, GitHub for version control

---

## ⚙️ Setup Instructions

### 1. Clone the repo
```bash
git clone https://github.com/<your-username>/admission-management-crm.git
cd admission-management-crm

### backend setup
cd backend
npm install
npm start
Backend runs on http://localhost:5000

### frontend setup
cd frontend
npm install
npm start
Frontend runs on http://localhost:3000
