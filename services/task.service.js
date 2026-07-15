import { Task, User } from '../models/Loader.js';
import { Op } from 'sequelize';

export const fetchAllTasks = async (page, limit, queryParams, currentUserId) => {
  const { column, search, priority, assignedTo } = queryParams || {};

  const options = {
    where: {},
    include: [
      { model: User, as: 'creator', attributes: ['id', 'name', 'email'] },
      { model: User, as: 'assignee', attributes: ['id', 'name', 'email'] },
    ],
    order: [['createdAt', 'DESC']],
  };

  const whereClauses = [
    {
      [Op.or]: [
        { createdBy: currentUserId },
        { assignedTo: currentUserId }
      ]
    }
  ];

  if (column) {
    whereClauses.push({ column });
  }

  if (search) {
    whereClauses.push({
      [Op.or]: [
        { title: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } }
      ]
    });
  }

  if (priority && priority !== 'all') {
    whereClauses.push({ priority });
  }

  if (assignedTo) {
    whereClauses.push({ assignedTo: parseInt(assignedTo) });
  }

  options.where = { [Op.and]: whereClauses };

  if (page && limit) {
    options.limit = parseInt(limit);
    options.offset = (parseInt(page) - 1) * parseInt(limit);
  }

  const { count, rows } = await Task.findAndCountAll(options);
  return { tasks: rows, total: count };
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