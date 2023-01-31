const {InvalidInputError} = require('../errors');
const taskServices = require('../services/taskServices');

async function getTaskList(req, res, next) {
  try {
    let {isDone} = req.query;
    if (isDone === '0') isDone = false;
    else if (isDone === '1') isDone = true;
    else if (isDone !== undefined) throw InvalidInputError('isDone must be 0 or 1');

    const tasks = await taskServices.getTaskList({isDone});
    res.status(200).json(tasks);
  } catch (err) {
    next(err);
  }
}

async function createTask(req, res, next) {
  try {
    const task = await taskServices.createTask(req.body.task);
    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
}

async function getTaskById(req, res, next) {
  try {
    const task = await taskServices.getTaskById(req.params.taskId);
    res.status(200).json(task);
  } catch (err) {
    next(err);
  }
}

async function editTaskById(req, res, next) {
  try {
    const task = await taskServices.editTaskById(req.params.taskId, req.body);
    res.status(200).json(task);
  } catch (err) {
    next(err);
  }
}

async function deleteTaskById(req, res, next) {
  try {
    await taskServices.deleteTaskById(req.params.taskId);
    res.status(204).end();
  } catch (err) {
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
