import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import TaskList from './pages/TaskList.jsx';
import CreateTask from './pages/CreateTask.jsx';
import EditTask from './pages/EditTask.jsx';

/**
 * Main App Component
 * Handles routing and layout
 */
function App() {
    // TODO: Implement authentication context/provider (SB01)
    // For now, simple token check
    const isAuthenticated = () => {
        return !!localStorage.getItem('token');
    };

    // Protected route wrapper
    const ProtectedRoute = ({ children }) => {
        return isAuthenticated() ? children : <Navigate to="/login" />;
    };

    return (
        <BrowserRouter>
            <div style={{ minHeight: '100vh' }}>
                {/* TODO: Add navigation header (optional enhancement) */}
                <Routes>
                    {/* Public routes */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    {/* Protected routes */}
                    <Route
                        path="/tasks"
                        element={
                            <ProtectedRoute>
                                <TaskList />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/tasks/new"
                        element={
                            <ProtectedRoute>
                                <CreateTask />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/tasks/:id/edit"
                        element={
                            <ProtectedRoute>
                                <EditTask />
                            </ProtectedRoute>
                        }
                    />

                    {/* Default redirect */}
                    <Route path="/" element={<Navigate to="/tasks" />} />
                    <Route path="*" element={<Navigate to="/tasks" />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
