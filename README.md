# SERN Task Manager

A full-stack task management application built with **S**equelize, **E**xpress, **R**eact, and **N**ode.js (SERN Stack) using MySQL.

## 🎯 Purpose

This is a **skeleton project template** designed for junior developers to complete using AI assistance. The structure is fully set up, but business logic is intentionally left as TODOs for implementation.

## 🛠️ Tech Stack

### Backend
- **Node.js** (v18+) - JavaScript runtime
- **Express** - Web framework
- **Sequelize** - ORM for MySQL
- **MySQL** - Relational database
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **node-cron** - Background job scheduling

### Frontend
- **React** (v18) - UI library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Axios** - HTTP client

## 📁 Project Structure

```
task-manager/
├── backend/
│   ├── src/
│   │   ├── config/         # Database configuration
│   │   ├── models/         # Sequelize models (User, Task, Category)
│   │   ├── routes/         # API route definitions
│   │   ├── controllers/    # Request handlers
│   │   ├── services/       # Business logic (TODOs here)
│   │   ├── jobs/           # Cron jobs for notifications
│   │   ├── middlewares/    # Auth and other middleware
│   │   └── app.js          # Express app setup
│   ├── server.js           # Server entry point
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── api/           # API service layer
│   │   ├── components/    # Reusable React components
│   │   ├── pages/         # Page components
│   │   ├── App.jsx        # Main app with routing
│   │   └── main.jsx       # React entry point
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
└── README.md
```

## 🚀 Setup Instructions

### Prerequisites
- Node.js v18 or higher
- MySQL installed and running
- Git

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd Agile_method_collab
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies (Node.js must be version 18+)
npm install

# IMPORTANT: Create your local environment file
# If you are on Windows:
copy .env.example .env
# If you are on Mac/Linux:
cp .env.example .env

# Edit .env and update DB_PASSWORD with your actual MySQL password
# Example: DB_PASSWORD=your_password_here

# Create the MySQL database
mysql -u root -p
# Inside the MySQL shell:
CREATE DATABASE task_manager;
exit;

# Start backend server
npm run dev
```

Backend will run on `http://localhost:5000`

### 3. Frontend Setup

Open a new terminal:

```bash
cd frontend

# Install dependencies
npm install

# Start frontend dev server
npm run dev
```

Frontend will run on `http://localhost:5173`

### 4. Database Initialization

The database tables will be automatically created when you first start the backend server (using Sequelize sync).

## 📦 Dependency Management

> [!IMPORTANT]
> **Never push the `node_modules` directory to GitHub.**
>
> Each developer must install dependencies locally. This is because:
> 1. **Native Modules:** Some libraries (like `bcrypt`) compile code specifically for your OS (Windows, Mac, Linux).
> 2. **Performance:** `node_modules` is massive and will slow down your repository.
> 3. **Consistency:** The `package.json` file ensures everyone gets the correct versions.
>
> If you are just starting, run `npm install` in both `backend` and `frontend` folders.

## 🎓 For Junior Developers

### How This Skeleton Works

✅ **What's Complete:**
- Project structure and folder organization
- Database models with relationships
- API routes wired to controllers
- React pages and components
- Authentication flow structure
- Background job schedulers

❌ **What You Need to Complete:**
- Business logic in service files
- JWT token generation/verification
- Password hashing
- Task filtering and sorting logic
- Notification sending logic
- Form validation
- Error handling improvements

### Sprint Backlog Map

Each Sprint Backlog item maps to specific files. See `TEAM_IMPLEMENTATION_GUIDE.md` for:
- Exact file locations for each sprint item
- Copy-paste AI prompts to complete implementations
- Testing instructions
- Rules to prevent breaking changes

### Getting Started

1. Pick a Sprint Backlog item (start with **SB01: User Registration & Login**)
2. Open `TEAM_IMPLEMENTATION_GUIDE.md`
3. Find the AI prompt template for that sprint item
4. Use AI (ChatGPT, Copilot, etc.) with the provided prompt
5. Paste the generated code into the specified files
6. Test functionality
7. Move to next sprint item

## 🧪 Testing

### Backend Health Check
```bash
curl http://localhost:5000/health
```

### Test Registration (after implementing SB01)
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"test","email":"test@example.com","password":"password123"}'
```

## 📚 Documentation

- **[TEAM_IMPLEMENTATION_GUIDE.md](./TEAM_IMPLEMENTATION_GUIDE.md)** - Complete guide for AI-assisted development
- **Sprint Backlog Mapping** - See guide for file-to-feature mapping
- **API Documentation** - Routes are documented in controller files

## ⚠️ Important Notes

- Never modify folder structure
- Keep import paths as they are
- Complete TODOs in order of Sprint Backlog
- Test after each implementation
- Don't skip placeholder validation logic

## 🤝 Team Collaboration

This project supports team-based development:
- Each team member can pick different Sprint Backlog items
- Use git branches for each feature
- Follow the file mapping in TEAM_IMPLEMENTATION_GUIDE.md
- Use provided AI prompts to ensure consistency

## 🎨 Design System & Theme

> [!IMPORTANT]
> **Theme: Elegant Split (Rich Violet Deep Glow & Off-White)**
>
> A premium theme with a multi-layered rich violet deep radial glow background and sophisticated split-screen "Off-White" cards.
>
> - **Background:** Rich Violet Deep Glow (`#6d28d9` center to `#2e1065` edges)
> - **Cards:** Off-White (`#fdfaff`) with high-contrast absolute black text.
> - **Layout:** Split-screen (`.split-left` for forms, `.split-right` for gradients).
> - **Primary Gradient:** `linear-gradient(135deg, #6d28d9, #a21caf)`
> - **Corners:** Highly rounded (`var(--radius)` = 30px)
>
> Do not use hardcoded colors. Always reference the variables in `index.css`.

### 🤖 AI Theme Prompt (FOR DEVELOPERS)

When asking AI to build a new component or style a page, **copy and paste this rule** into your prompt:

> "Follow the app's 'Elegant Split' theme. Use `frontend/src/index.css` global variables: a multi-layered rich violet radial glow background centered behind the card, and split-screen off-white cards. Ensure all text inside cards uses `#000000` (absolute black) for perfect readability."

## 📝 License

MIT
