const errors = require('../errors');
const db = require('../models');


async function getTaskList(filters = {isDone: undefined}) {
  return typeof filters.isDone === 'boolean' ?
    await db.Task.findAll({
      where: {isDone: filters.isDone}
    }) :
    await db.Task.findAll();
}

async function createTask(task) {
  return await db.Task.create({task, isDone: false});
}

async function getTaskById(taskId) {
  const foundTaskObject = await db.Task.findByPk(taskId);

  if (!foundTaskObject)
    throw new errors.NotFoundError(`task with ${taskId} not found.`);

  return foundTaskObject;
}

async function editTaskById(taskId, sourceTask = {task: undefined, isDone: undefined}) {
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
