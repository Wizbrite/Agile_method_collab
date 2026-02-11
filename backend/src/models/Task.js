import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './User.js';
import Category from './Category.js';

/**
 * Task Model
 * Represents individual tasks with status, priority, and deadlines
 */
const Task = sequelize.define('Task', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    status: {
        type: DataTypes.ENUM('todo', 'in_progress', 'completed'),
        defaultValue: 'todo'
    },
    priority: {
        type: DataTypes.ENUM('low', 'medium', 'high'),
        defaultValue: 'medium'
    },
    deadline: {
        type: DataTypes.DATE,
        allowNull: true
    },
    isOverdue: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'categories',
            key: 'id'
        }
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'tasks',
    timestamps: true
});

// Define relationships
Task.belongsTo(User, { foreignKey: 'userId', as: 'user' });
User.hasMany(Task, { foreignKey: 'userId', as: 'tasks' });

Task.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });
Category.hasMany(Task, { foreignKey: 'categoryId', as: 'tasks' });

// TODO: Add deadline validation (SB07)
// TODO: Add status transition validation (SB04)

export default Task;
