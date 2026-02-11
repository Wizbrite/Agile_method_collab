# TEAM IMPLEMENTATION GUIDE

**FOR JUNIOR DEVELOPERS USING AI ASSISTANCE**

This guide explains how to safely complete the task manager skeleton using AI tools like ChatGPT, GitHub Copilot, or Antigravity.

---

## 📋 Table of Contents

1. [How This Skeleton Works](#how-this-skeleton-works)
2. [Sprint Backlog → File Mapping](#sprint-backlog--file-mapping)
3. [AI Prompt Templates](#ai-prompt-templates)
4. [Testing Your Contributions](#testing-your-contributions)
5. [Unbreakable Rules](#unbreakable-rules)

---

## 1. How This Skeleton Works

### ✅ What's Already Done

- **Folder structure** - All directories created, don't add new ones
- **Database models** - User, Task, Category defined with relationships
- **API routes** - All endpoints wired to controllers
- **Controllers** - Request/response handlers that call services
- **React pages** - Login, Register, TaskList, CreateTask, EditTask
- **Components** - TaskCard, TaskForm, TaskFilter, CategorySelector
- **Routing** - Frontend routes configured with React Router
- **Authentication structure** - Middleware and token handling ready

### ❌ What's Missing (Your Work)

- **Business logic** in service files (marked with `TODO` comments)
- **JWT generation** and verification
- **Password hashing** with bcrypt
- **Database queries** in services
- **Form validation** logic
- **Notification** implementations
- **Error handling** improvements

### 📦 Handling Dependencies

A common question is whether you should push the `node_modules` folder to GitHub. The answer is **NEVER**.

1. **Why?** Some libraries (like `bcrypt`) compile "native" code during installation. If you install on Windows and push it, a teammate on Mac will get errors.
2. **How?** Each developer must run `npm install` in both the `backend` and `frontend` folders after cloning the project.
3. **Guardrail:** I have included `.gitignore` files to prevent you from accidentally pushing these folders.

### 🎯 Why This Approach?

This skeleton ensures that:
- You can't accidentally break the project structure
- AI completions fit perfectly into predefined slots
- Team members won't create conflicting files
- Import paths and dependencies are locked in
- You learn by seeing complete patterns

---

## 2. Sprint Backlog → File Mapping

### SB01: User Registration & Login

| Task | Backend File | Frontend File |
|------|-------------|---------------|
| Password hashing | `backend/src/services/auth.service.js` | - |
| JWT generation | `backend/src/services/auth.service.js` | - |
| Token verification | `backend/src/middlewares/auth.middleware.js` | - |
| Registration form | - | `frontend/src/pages/Register.jsx` |
| Login form | - | `frontend/src/pages/Login.jsx` |
| Token storage | - | `frontend/src/api/auth.api.js` |

**AI Prompts:** [See Section 3.1](#31-sb01-authentication)

---

### SB02: Task Creation

| Task | Backend File | Frontend File |
|------|-------------|---------------|
| Task creation logic | `backend/src/services/task.service.js` | - |
| Validation | `backend/src/controllers/task.controller.js` | - |
| Create form | - | `frontend/src/pages/CreateTask.jsx` |
| Form component | - | `frontend/src/components/TaskForm.jsx` |

**AI Prompts:** [See Section 3.2](#32-sb02-task-creation)

---

### SB03: Task Listing & Filtering

| Task | Backend File | Frontend File |
|------|-------------|---------------|
| Get tasks with filters | `backend/src/services/task.service.js` | - |
| Query building | `backend/src/services/task.service.js` | - |
| Filter UI | - | `frontend/src/components/TaskFilter.jsx` |
| Task display | - | `frontend/src/pages/TaskList.jsx` |

**AI Prompts:** [See Section 3.3](#33-sb03-task-listing)

---

### SB04-SB09: Additional Features

See detailed mappings in the [Sprint Mapping Document](./sprint_mapping.md).

---

## 3. AI Prompt Templates

### 3.1 SB01: Authentication

#### Backend: Password Hashing in auth.service.js

**Copy this prompt to your AI:**

```
I have a Sequelize-based Express backend. I need to complete the registerUser function in backend/src/services/auth.service.js.

Current skeleton:
- User model is at backend/src/models/User.js
- User has fields: id, username, email, password
- bcrypt is already installed

Requirements:
1. Check if user already exists by email
2. Hash password using bcrypt (salt rounds: 10)
3. Create user in database using User.create()
4. Return user object WITHOUT password field

File path: backend/src/services/auth.service.js
Function to complete: registerUser(userData)

Do NOT modify:
- Import statements (keep existing)
- Function signature
- Other functions in the file

Return ONLY the completed registerUser function code.
```

#### Backend: JWT Token Generation in auth.service.js

**Copy this prompt to your AI:**

```
I need to complete the loginUser function in backend/src/services/auth.service.js.

Context:
- JWT_SECRET is in process.env.JWT_SECRET
- JWT_EXPIRES_IN is in process.env.JWT_EXPIRES_IN
- jsonwebtoken is already imported as jwt
- bcrypt is already imported

Requirements:
1. Find user by email using User.findOne()
2. Throw error if user not found: "Invalid credentials"
3. Compare password with bcrypt.compare()
4. Throw error if password wrong: "Invalid credentials"
5. Generate JWT containing { id: user.id, email: user.email }
6. Return { user: {id, username, email}, token }

File path: backend/src/services/auth.service.js
Function to complete: loginUser(email, password)

Return ONLY the completed loginUser function code.
```

#### Backend: JWT Verification Middleware

**Copy this prompt to your AI:**

```
Complete the authenticateToken middleware in backend/src/middlewares/auth.middleware.js.

Context:
- JWT_SECRET is in process.env.JWT_SECRET
- jsonwebtoken is imported as jwt
- Middleware receives (req, res, next)

Requirements:
1. Get token from Authorization header (format: "Bearer TOKEN")
2. If no token, return 401 with error: "Access token required"
3. Verify token using jwt.verify()
4. If valid, attach decoded payload to req.user
5. Call next()
6. If invalid, return 403 with error: "Invalid or expired token"

File path: backend/src/middlewares/auth.middleware.js
Function to complete: authenticateToken

Return ONLY the completed middleware function code.
```

---

### 3.2 SB02: Task Creation

#### Backend: Create Task Service

**Copy this prompt to your AI:**

```
Complete the createTask function in backend/src/services/task.service.js.

Context:
- Task model is imported from '../models/index.js'
- Category model is also available
- Function signature: createTask(userId, taskData)
- taskData contains: { title, description, status, priority, deadline, categoryId }

Requirements:
1. Validate that title is not empty (throw error if empty)
2. If categoryId provided, verify category exists
3. Create task using Task.create() with userId and all taskData fields
4. Fetch the created task with category relationship using Task.findByPk() with include
5. Return the task with category

File path: backend/src/services/task.service.js
Function to complete: createTask(userId, taskData)

Return ONLY the completed createTask function code.
```

#### Frontend: Task Form Validation

**Copy this prompt to your AI:**

```
Add client-side validation to the TaskForm component in frontend/src/components/TaskForm.jsx.

Current state:
- Form has fields: title, description, status, priority, deadline, categoryId
- Form submits to onSubmit prop

Requirements:
1. Validate title is not empty (min 3 characters)
2. Validate deadline (if provided) is in the future
3. Show inline error messages below each field
4. Disable submit button if validation fails
5. Clear errors on field change

Keep:
- Existing useState for formData
- Existing handleChange function
- Existing form structure

Add:
- errors state object
- validation function
- error display elements

Return ONLY the modified TaskForm component code.
```

---

### 3.3 SB03: Task Listing

#### Backend: Get Tasks with Filters

**Copy this prompt to your AI:**

```
Complete the getTasks function in backend/src/services/task.service.js.

Context:
- Task and Category models imported
- Sequelize Op imported from 'sequelize'
- Function signature: getTasks(userId, filters = {})
- filters object may contain: { status, priority, categoryId, search }

Requirements:
1. Build where clause for userId (always required)
2. If filters.status provided, add to where clause
3. If filters.priority provided, add to where clause
4. If filters.categoryId provided, add to where clause
5. If filters.search provided, search in title OR description using Op.like
6. Include category relationship
7. Order by deadline ascending (null last) then by createdAt descending
8. Return array of tasks

File path: backend/src/services/task.service.js
Function to complete: getTasks(userId, filters)

Return ONLY the completed getTasks function code.
```

---

### 3.4 SB04: Task Update

**Copy this prompt to your AI:**

```
Complete the updateTask function in backend/src/services/task.service.js.

Context:
- Task model imported
- Function signature: updateTask(taskId, userId, updates)
- updates may contain any task fields

Requirements:
1. Find task by ID using Task.findByPk()
2. Throw error if task not found: "Task not found"
3. Verify task belongs to userId, throw error if not: "Unauthorized"
4. Update allowed fields: title, description, status, priority, deadline, categoryId
5. Save changes using task.save()
6. Reload task with category using task.reload({ include: ... })
7. Return updated task

File path: backend/src/services/task.service.js
Function to complete: updateTask(taskId, userId, updates)

Return ONLY the completed updateTask function code.
```

---

### 3.5 SB05: Task Deletion

**Copy this prompt to your AI:**

```
Complete the deleteTask function in backend/src/services/task.service.js.

Context:
- Task model imported
- Function signature: deleteTask(taskId, userId)

Requirements:
1. Find task by ID
2. Throw error if not found: "Task not found"
3. Verify ownership (userId matches)
4. Delete task using task.destroy()
5. Return true

File path: backend/src/services/task.service.js
Function to complete: deleteTask(taskId, userId)

Return ONLY the completed deleteTask function code.
```

---

### 3.6 SB06: Category Management

**Copy this prompt to your AI:**

```
Complete all CRUD functions in backend/src/services/category.service.js.

Context:
- Category model imported
- Functions: getAllCategories, createCategory, updateCategory, deleteCategory

Requirements:

getAllCategories():
- Fetch all categories
- Include count of tasks for each category
- Return array

createCategory(categoryData):
- Validate name is not empty
- Check if category name already exists (case insensitive)
- Create category with name and color
- Return created category

updateCategory(categoryId, updates):
- Find category by ID
- Update name and/or color
- Return updated category

deleteCategory(categoryId):
- Find category
- Check if it has tasks
- If has tasks, set their categoryId to null
- Delete category
- Return true

Return ALL FOUR completed functions.
```

---

### 3.7 SB09: Overdue Task Detection

**Copy this prompt to your AI:**

```
Complete the updateOverdueTasks function in backend/src/services/task.service.js and the checkOverdueTasks function in backend/src/jobs/overdue.job.js.

Context:
- Task service has updateOverdueTasks() placeholder
- Job file has checkOverdueTasks() that calls the service function
- Sequelize Op is available
- notification service sendOverdueNotification is available

Requirements for updateOverdueTasks():
1. Find all tasks where:
   - deadline < current time
   - status != 'completed'
   - isOverdue = false
2. Update isOverdue to true for all found tasks
3. For each task, call notificationService.sendOverdueNotification(task.userId, task)
4. Return count of updated tasks

Requirements for checkOverdueTasks():
- Just call taskService.updateOverdueTasks()
- Log result
- Handle errors

Return BOTH completed functions.
```

---

## 4. Testing Your Contributions

### Backend Testing

#### 4.1 Test Auth Endpoints (SB01)

**Registration:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"password123"}'
```

Expected: Status 201, returns user object without password

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

Expected: Status 200, returns user and token

#### 4.2 Test Task Creation (SB02)

```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{"title":"Test Task","description":"Test description","priority":"high"}'
```

Expected: Status 201, returns created task

#### 4.3 Test Task Listing (SB03)

```bash
# All tasks
curl http://localhost:5000/api/tasks \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"

# Filtered tasks
curl "http://localhost:5000/api/tasks?status=todo&priority=high" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

Expected: Status 200, returns array of tasks

### Frontend Testing

1. **Registration Flow (SB01)**
   - Go to http://localhost:5173/register
   - Fill form with valid data
   - Submit → should redirect to login

2. **Login Flow (SB01)**
   - Go to http://localhost:5173/login
   - Enter credentials
   - Submit → should redirect to task list

3. **Create Task (SB02)**
   - Click "New Task" button
   - Fill form
   - Submit → should redirect to task list showing new task

4. **Filters (SB03)**
   - Use filter dropdowns
   - Verify tasks update without page reload

---

## 5. Unbreakable Rules

### ❌ DO NOT:

1. **Change folder structure**
   - Don't create new directories
   - Don't rename existing folders
   - Don't move files between folders

2. **Modify import paths**
   - Keep all imports exactly as they are
   - Don't change relative path depths
   - Don't switch between default/named exports

3. **Change function signatures**
   - Controllers must keep (req, res, next)
   - Services must keep their parameter lists
   - Don't add new route files

4. **Remove existing code**
   - Only fill in TODOs
   - Don't delete skeleton code
   - Don't remove comments

5. **Add dependencies**
   - Don't install new npm packages without approval
   - All needed packages are already installed
   - Ask before adding libraries

6. **Push `node_modules`**
   - NEVER push the `node_modules` directory.
   - It is already in `.gitignore`, keep it that way.

7. **The Theme is Law**
   - Theme Name: **Elegant Violet**
   - Do not change the global colors in `index.css`.
   - Use `var(--primary-gradient)` for all main buttons.
   - Use `var(--radius)` for rounded elements (30px).
   - **MANDATORY:** Always include this line in your AI prompts: *"Follow the Elegant Violet theme using gradients and variables from index.css. Use the .card and .container classes."*

### ✅ DO:

1. **Fill TODOs only**
   - Complete logic in marked sections
   - Add code inside existing functions
   - Implement specified requirements

2. **Add error handling**
   - Wrap database calls in try-catch
   - Return appropriate HTTP status codes
   - Add validation logic

3. **Test incrementally**
   - Test after completing each function
   - Use curl for backend, browser for frontend
   - Fix errors before moving to next sprint item

4. **Follow patterns**
   - Match style of existing code
   - Use async/await consistently
   - Follow file naming conventions

5. **Ask questions**
   - If AI response doesn't fit
   - If you're unsure about structure
   - Before making structural changes

---

## 6. Workflow Example

**Example: Completing SB01 (Authentication)**

1. **Choose Sprint Item:** SB01 - User Registration & Login

2. **Identify Files:**
   - `backend/src/services/auth.service.js`
   - `backend/src/middlewares/auth.middleware.js`
   - `frontend/src/pages/Login.jsx`

3. **Use AI Prompts:**
   - Copy "Password Hashing" prompt from Section 3.1
   - Paste into ChatGPT/AI tool
   - Review generated code

4. **Paste Code:**
   - Open `backend/src/services/auth.service.js`
   - Find `registerUser` function
   - Replace TODO section with AI-generated code

5. **Test:**
   - Start backend: `npm run dev` in backend folder
   - Test registration with curl command
   - Verify it works

6. **Repeat for Login:**
   - Use "JWT Token Generation" prompt
   - Complete `loginUser` function
   - Test login endpoint

7. **Move to Frontend:**
   - Frontend forms are already built
   - Test in browser at http://localhost:5173
   - Verify registration and login work end-to-end

8. **Commit:**
   ```bash
   git add .
   git commit -m "feat: implement SB01 - user authentication"
   git push
   ```

---

## 7. Common Pitfalls

### Problem: "Cannot find module"
**Solution:** You likely changed an import path. Revert to original import statements.

### Problem: "User.create is not a function"
**Solution:** Check that models are imported correctly from '../models/index.js'

### Problem: "req.user is undefined"
**Solution:** Ensure auth middleware is added to the route in routes file

### Problem: Frontend shows 401 error
**Solution:** Check that token is stored in localStorage and Authorization header is set

### Problem: Database connection failed
**Solution:** Verify .env file has correct MySQL credentials and database exists

---

## 8. Success Checklist

Before marking a Sprint item complete:

- [ ] All TODO comments in related files are completed
- [ ] Backend endpoint returns expected response
- [ ] Frontend UI shows expected behavior
- [ ] Error cases are handled (404, 401, 400, etc.)
- [ ] Console shows no errors
- [ ] Changes follow existing patterns
- [ ] Code is committed with clear message
- [ ] Tested manually with actual data

---

## 9. Getting Help

If you're stuck:

1. **Check TODO comments** - They often have hints
2. **Review existing completed functions** - Match their pattern
3. **Test endpoints individually** - Isolate the problem
4. **Check browser console and terminal logs** - Read error messages
5. **Ask your team or mentor** - Don't stay blocked

---

## 10. Next Steps

Once all Sprint Backlog items (SB01-SB09) are complete:

1. Run full test suite (if you add tests)
2. Deploy to staging environment
3. Conduct user acceptance testing
4. Plan additional features

**Remember:** This skeleton is a learning tool. The goal is to understand how full-stack applications work by completing real implementations with AI assistance.

Good luck! 🚀
