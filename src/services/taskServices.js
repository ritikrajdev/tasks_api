const {where} = require('sequelize');
const errors = require('../errors');
const db = require('../models');


async function getTaskList(filters = {isDone: undefined}) {
  return typeof filters.isDone === 'boolean' ?
    await db.Task.find({
      where: {isDone: filters.isDone}
    }) :
    await db.Task.findAll();
}

async function createTask(task) {
  if (typeof task !== 'string')
    throw new errors.InvalidInputError('task must be a string.');

  return await db.Task.create({task, isDone: false});
}

async function getTaskById(taskId) {
  if (typeof taskId !== 'string')
    throw new errors.InvalidInputError('taskId must be a string.');

  if (isNaN(taskId))
    throw new errors.InvalidInputError('taskId is not a valid id.');

  const foundTaskObject = await db.Task.findByPk(taskId);

  if (!foundTaskObject)
    throw new errors.NotFoundError(`task with ${taskId} not found.`);

  return foundTaskObject;
}

async function editTaskById(taskId, sourceTask = {task: undefined, isDone: undefined}) {
  if (typeof taskId !== 'string')
    throw new errors.InvalidInputError('taskId must be a string.');

  if (isNaN(taskId))
    throw new errors.InvalidInputError('taskId is not a valid id.');

  if (!['undefined', 'string'].includes(typeof sourceTask.task))
    throw new errors.InvalidInputError('task must be a string.');

  if (!['undefined', 'boolean'].includes(typeof sourceTask.isDone))
    throw new errors.InvalidInputError('isDone must be a boolean true/false expression.');

  for (let key in sourceTask) {
    if (!['isDone', 'task'].includes(key)) {
      throw new errors.InvalidInputError(`invalid parameter found ${key}.`);
    }
  }

  const taskObject = await db.Task.findByPk(taskId);
  if (!taskObject) {
    throw new errors.NotFoundError(`task with ${taskId} not found.`);
  }

  for (let key in sourceTask) {
    taskObject[key] = sourceTask[key];
  }
  taskObject.save();

  return taskObject;
}


async function deleteTaskById(taskId) {
  if (typeof taskId !== 'string')
    throw new errors.InvalidInputError('taskId must be a string.');

  if (isNaN(taskId))
    throw new errors.InvalidInputError('taskId is not a valid id.');

  const status = await db.Task.destroy({
    'where': {
      'id': taskId
    }
  });

  if (status === 0)
    throw new errors.NotFoundError(`task with ${taskId} not found.`);
}

module.exports = {
  getTaskList,
  createTask,
  getTaskById,
  editTaskById,
  deleteTaskById,
};
