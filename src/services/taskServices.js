const {v4} = require('uuid');

const uuidV4 = v4;

const {isUuidV4} = require('../utils/uuidUtils');
const errors = require('../errors');

let tasks = [
  {
    id: uuidV4(),
    task: 'make tasks api using http module',
    isDone: true
  },
  {
    id: uuidV4(),
    task: 'make tasks api using http module',
    isDone: true
  }
];


function getTaskList(filters = {isDone: undefined}) {
  if (!['undefined', 'boolean'].includes(typeof filters.isDone))
    throw new errors.InvalidInputError('isDone must be a boolean true/false expression.');

  return typeof filters.isDone === 'boolean' ?
    tasks.filter(taskObject => taskObject.isDone === filters.isDone) :
    tasks;
}

function createTask(task) {
  if (typeof task !== 'string')
    throw new errors.InvalidInputError('task must be a string.');

  const taskObject = {id: uuidV4(), task, isDone: false};
  tasks.push(taskObject);
  return taskObject;
}

function getTaskById(taskId) {
  if (typeof taskId !== 'string')
    throw new errors.InvalidInputError('taskId must be a string.');

  if (!isUuidV4(taskId))
    throw new errors.InvalidInputError('taskId is not a valid id.');

  const foundTaskObject = tasks.find(({id}) => id === taskId);

  if (!foundTaskObject)
    throw new errors.NotFoundError(`task with ${taskId} not found.`);

  return foundTaskObject;
}

function editTaskById(taskId, sourceTask = {task: undefined, isDone: undefined}) {
  if (typeof taskId !== 'string')
    throw new errors.InvalidInputError('taskId must be a string.');

  if (!isUuidV4(taskId))
    throw new errors.InvalidInputError('taskId is not a valid id.');

  if (!['undefined', 'string'].includes(typeof sourceTask.task))
    throw new errors.InvalidInputError('task must be a string.');

  if (!['undefined', 'boolean'].includes(typeof sourceTask.isDone))
    throw new errors.InvalidInputError('isDone must be a boolean true/false expression.');


  const taskObjectIdx = tasks.findIndex(task => task.id === taskId);

  if (taskObjectIdx === -1)
    throw new errors.NotFoundError(`task with ${taskId} not found.`);

  const newTaskObject = {...tasks[taskObjectIdx]};
  for (let key in sourceTask) {
    if (newTaskObject[key] === undefined) {
      throw new errors.InvalidInputError(`invalid parameter found ${key}.`);
    } else {
      newTaskObject[key] = sourceTask[key] ?? newTaskObject[key];
    }
  }

  tasks[taskObjectIdx] = newTaskObject;
  return newTaskObject;
}

function deleteTaskById(taskId) {
  if (typeof taskId !== 'string')
    throw new errors.InvalidInputError('taskId must be a string.');

  if (!isUuidV4(taskId))
    throw new errors.InvalidInputError('taskId is not a valid id.');

  const taskObjectIdx = tasks.findIndex(task => task.id === taskId);

  if (taskObjectIdx === -1)
    throw new errors.NotFoundError(`task with ${taskId} not found.`);

  tasks.pop(taskObjectIdx);
}

module.exports = {
  getTaskList,
  createTask,
  getTaskById,
  editTaskById,
  deleteTaskById,
};
