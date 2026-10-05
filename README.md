# CGU Security Software

A comprehensive **Full-Stack Security Management System** developed as a 4th-year Software Engineering Case Study for C.V. Raman Global University (CGU).

## 📌 Project Overview
This web application is designed to digitalize and streamline the security infrastructure of a university campus. It replaces traditional paper-based logs with a modern, real-time dashboard that enables campus security to track visitors, report incidents, manage lost items, and monitor student out-passes.

## ✨ Key Features
- **Real-Time Dashboard**: A centralized control panel displaying live metrics (Active Visitors, Guards on Duty, Campus Threat Level, etc.) and a quick-dial university directory.
- **Visitor Management**: Logs external guests, parents, and vendors entering the campus, including their purpose and precise check-in/check-out timestamps.
- **Incident Reporting**: A digital ledger for logging campus incidents (e.g., theft, damages) categorized by severity and specific campus locations (BS Building, RIHC, MBA Gallery).
- **Lost & Found Registry**: Tracks misplaced items across the campus until claimed by their rightful owners.
- **Student Leave (Out-Pass) System**: A dedicated register for students leaving the campus for extended periods (e.g., medical leave, family functions), integrated with their Registration IDs.
- **Emergency Broadcasts**: Simulated alert system for sending out general or critical campus-wide warnings.
- **Guard Shift Logs**: Roster and time-tracking system for security personnel across all major campus checkpoints.

## 🛠️ Technology Stack
- **Frontend**: React.js, Vite, Vanilla CSS (Glassmorphism UI), Lucide React (Icons).
- **Backend**: Node.js, Express.js.
- **Database**: SQLite3 (Serverless, self-contained SQL database).

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) installed on your machine.

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/nazishfardeen/CGU-security-software.git
   cd CGU-security-software
   ```

2. **Start the Backend Server:**
   ```bash
   cd server
   npm install
   node index.js
   ```
   *The backend API will run on `http://localhost:3000`.*

3. **Start the Frontend Application:**
   Open a new terminal window and run:
   ```bash
   cd client
   npm install
   npm run dev
   ```
   *The React app will be accessible at `http://localhost:5173`.*

## 📂 Project Structure
```text
CGU-security-software/
│
├── client/                # React Frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components (Sidebar/Layout)
│   │   ├── pages/         # Core application views (Dashboard, Visitors, etc.)
│   │   ├── App.css        # Core styling (Glassmorphism & tokens)
│   │   └── index.css
│   └── package.json
│
└── server/                # Node.js Backend
    ├── index.js           # Express API Endpoints
    ├── db.js              # SQLite Schema Definitions
    ├── cgu_security.db    # Local Database File
    └── package.json
```

## 👨‍💻 Developed By
**Nazish Fardeen**  
*4th Year Software Engineering Project*
