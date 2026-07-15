import * as taskService from '../services/task.service.js';

export const getAllTasks = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const tasks = await taskService.fetchAllTasks(page, limit);
    return res.status(200).json(tasks);
  } catch (error) {
    console.error(' get all tasks error:', error.message);
    return res.status(500).json({ message: 'Error retrieving tasks', error: error.message });
  }
};

export const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description are required' });
    }

    const newTask = await taskService.createTaskRecord(req.body, req.user.id);
    return res.status(201).json(newTask);
  } catch (error) {
    console.error(' Create Task Error:', error.message);
    return res.status(500).json({ message: 'Error creating task', error: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTask = await taskService.updateTaskRecord(id, req.body);
    
    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    return res.status(200).json(updatedTask);
  } catch (error) {
    console.error(' Update Task Error:', error.message);
    return res.status(500).json({ message: 'Error updating task', error: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const isDeleted = await taskService.deleteTaskRecord(id);
    
    if (!isDeleted) {
      return res.status(404).json({ message: 'Task not found' });
    }
    return res.status(200).json({ message: 'Task deleted successfully', taskId: parseInt(id) });
  } catch (error) {
    console.error(' Delete Task Error:', error.message);
    return res.status(500).json({ message: 'Error deleting task', error: error.message });
  }
};