const taskServices = require('../services/taskServices');

async function getTaskList(req, res, next) {
  try {
    const tasks = await taskServices.getTaskList(req.query);
    res.status(200).json(tasks);
  } catch (err) {
    if (err.name === 'InvalidInputError')
      return res.status(400).json({message: err.message});
    else
      next(err);
  }
}

async function createTask(req, res, next) {
  try {
    const task = await taskServices.createTask(req.body.task);
    res.status(201).json(task);
  } catch (err) {
    if (err.name === 'InvalidInputError')
      return res.status(400).json({message: err.message});
    else
      next(err);
  }
}

async function getTaskById(req, res, next) {
  try {
    const task = await taskServices.getTaskById(req.params.taskId);
    res.status(200).json(task);
  } catch (err) {
    if (err.name === 'InvalidInputError')
      return res.status(400).json({message: err.message});
    else if (err.name === 'NotFoundError')
      return res.status(404).json({message: err.message});
    else
      next(err);
  }
}

async function editTaskById(req, res, next) {
  try {
    const task = await taskServices.editTaskById(req.params.taskId, req.body);
    res.status(200).json(task);
  } catch (err) {
    if (err.name === 'InvalidInputError')
      return res.status(400).json({message: err.message});
    else if (err.name === 'NotFoundError')
      return res.status(404).json({message: err.message});
    else
      next(err);
  }
}

async function deleteTaskById(req, res, next) {
  try {
    await taskServices.deleteTaskById(req.params.taskId);
    res.status(204).end();
  } catch (err) {
    if (err.name === 'InvalidInputError')
      return res.status(400).json({message: err.message});
    else if (err.name === 'NotFoundError')
      return res.status(404).json({message: err.message});
    else
      next(err);
  }
}

module.exports = {
  getTaskList,
  createTask,
  getTaskById,
  editTaskById,
  deleteTaskById,
};