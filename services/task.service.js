import { Task, User } from '../models/Loader.js';

export const fetchAllTasks = async (page, limit) => {
  const options = {
    include: [
      { model: User, as: 'creator', attributes: ['id', 'name', 'email'] },
      { model: User, as: 'assignee', attributes: ['id', 'name', 'email'] },
    ],
    order: [['createdAt', 'DESC']],
  };

  if (page && limit) {
    options.limit = parseInt(limit);
    options.offset = (parseInt(page) - 1) * parseInt(limit);
  }

  return await Task.findAll(options);
};

export const createTaskRecord = async (taskData, creatorId) => {
  const { title, description, priority, column, assignedTo, dueDate } = taskData;
  
  const task = await Task.create({
    title,
    description,
    priority: priority || 'low',
    column: column || 'todo',
    dueDate: dueDate || null,
    assignedTo: assignedTo || null,
    createdBy: creatorId,
  });

  return await Task.findByPk(task.id, {
    include: [
      { model: User, as: 'creator', attributes: ['id', 'name', 'email'] },
      { model: User, as: 'assignee', attributes: ['id', 'name', 'email'] },
    ]
  });
};

export const updateTaskRecord = async (id, updateData) => {
  const task = await Task.findByPk(id);
  if (!task) return null;

  const { title, description, priority, column, assignedTo, dueDate } = updateData;

  if (title !== undefined) task.title = title;
  if (description !== undefined) task.description = description;
  if (priority !== undefined) task.priority = priority;
  if (column !== undefined) task.column = column;
  if (assignedTo !== undefined) task.assignedTo = assignedTo;
  if (dueDate !== undefined) task.dueDate = dueDate;

  await task.save();

  return await Task.findByPk(task.id, {
    include: [
      { model: User, as: 'creator', attributes: ['id', 'name', 'email'] },
      { model: User, as: 'assignee', attributes: ['id', 'name', 'email'] },
    ]
  });
};

export const deleteTaskRecord = async (id) => {
  const task = await Task.findByPk(id);
  if (!task) return false;

  await task.destroy();
  return true;
};