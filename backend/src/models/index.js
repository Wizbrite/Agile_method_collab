/**
 * Models Index
 * Central export point for all Sequelize models
 */

import User from './User.js';
import Task from './Task.js';
import Category from './Category.js';

// All relationships are defined in individual model files
// This file serves as a convenient import point

export { User, Task, Category };
