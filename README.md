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
- **Tailwind CSS v4** - Utility-first CSS framework with custom theming

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

## 🎨 Styling & Tailwind CSS v4

> [!IMPORTANT]
> **This project uses Tailwind CSS v4 with a hybrid approach**
>
> The styling system combines:
> - **Tailwind v4 @theme**: Centralized color variables, spacing, and design tokens
> - **Standard CSS**: All actual styles in `@layer base` and `@layer components`
> - **Tailwind utilities**: Used in JSX for layout (flex, grid, padding, margins)

### Tailwind CSS v4 Setup

The project is already configured with Tailwind CSS v4. Here's what's included:

**Dependencies** (already in `package.json`):
```json
{
  "devDependencies": {
    "tailwindcss": "^4.0.0",
    "@tailwindcss/vite": "^4.0.0"
  }
}
```

**Vite Configuration** (`vite.config.js`):
```javascript
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss()  // Tailwind v4 Vite plugin
  ]
})
```

**CSS Configuration** (`src/index.css`):
- `@theme` block defines all design tokens (colors, spacing, fonts)
- `@layer base` contains global element styling
- `@layer components` contains reusable component classes

### Design Theme: Elegant Violet with Glassmorphism

**Color Palette:**
- Primary: `#6d28d9` (Rich Violet)
- Secondary: `#a21caf` (Magenta)
- Background: Radial gradient from `#6d28d9` to `#2e1065`
- Cards: Semi-transparent with glassmorphic effects

**Special Components:**
- `.glass-form` - Glassmorphic form with animated neon border effects
- `.card` - Off-white cards with deep shadows
- `.split-left` / `.split-right` - Split-screen layouts

### Using Tailwind in Components

**Layout & Spacing (use Tailwind utilities):**
```jsx
<div className="flex gap-4 mb-6 p-8">
  <button className="px-6 py-3">Click me</button>
</div>
```

**Custom Styling (use component classes):**
```jsx
<form className="glass-form">
  <div className="card">
    {/* content */}
  </div>
</form>
```

**Theme Colors (use CSS variables):**
```css
background: var(--color-primary);
border-color: var(--color-border);
```

### Important Notes

- ✅ Tailwind processes CSS via the `@tailwindcss/vite` plugin
- ✅ VSCode may show warnings for `@theme` - these are cosmetic only
- ✅ All gradients and complex effects use standard CSS (not Tailwind arbitrary values)
- ❌ Don't use arbitrary values like `bg-[radial-gradient(...)]` - use standard CSS instead

### 🤖 AI Theme Prompt (FOR DEVELOPERS)

When asking AI to build a new component or style a page, **copy and paste this rule** into your prompt:

> "Follow the app's 'Elegant Violet with Glassmorphism' theme using Tailwind CSS v4. Reference the `@theme` variables in `frontend/src/index.css` for colors. Use Tailwind utility classes for layout (flex, grid, spacing) and component classes (`.glass-form`, `.card`) for styling. The background is a rich violet radial gradient, and forms use glassmorphic design with neon purple glow effects."

## 📝 License

MIT
