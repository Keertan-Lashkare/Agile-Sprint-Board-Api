import sequelize from '../config/db.js';
import User from './user.js';
import Task from './task.js';



// one user can create multipe task 
User.hasMany(Task, { foreignKey: 'createdBy', as: 'createdTasks' });
Task.belongsTo(User, { foreignKey: 'createdBy', as: 'creator' });

//on user can assing multiple task
User.hasMany(Task, { foreignKey: 'assignedTo', as: 'assignedTasks' });
Task.belongsTo(User, { foreignKey: 'assignedTo', as: 'assignee' });

export { sequelize, User, Task };