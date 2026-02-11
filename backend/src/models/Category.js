import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

/**
 * Category Model
 * Represents task categories for organization
 */
const Category = sequelize.define('Category', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    color: {
        type: DataTypes.STRING(7), // Hex color code #RRGGBB
        defaultValue: '#3B82F6'
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
    tableName: 'categories',
    timestamps: true
});

// TODO: Add validation for color format (SB06)

export default Category;
