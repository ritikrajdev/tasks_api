const {json} = require('express');

let tasks = [];
let id = 1;

function getTaskListController(req, res) {
  res.json(tasks);
}

function createTaskController(req, res) {
  let task = req.body;

  if (task.name === undefined)
    return res.sendStatus(400);

  task = {id, name: task.name, isDone: false};
  id += 1;

  tasks.push(task);

  res.status(201);
  res.json(task);
}

function getTaskDetailController(req, res) {
  const id = req.params.id;

  const selectedTask = tasks.filter(task => task.id == id);
  if (selectedTask.length === 0) {
    return res.sendStatus(404);
  }
  res.json(selectedTask[0]);
}

function patchTaskController(req, res) {
  const id = req.params.id;

  let jsonData = req.body;
  const allowed_keys = ['name', 'isDone'];
  for (let key of Object.keys(jsonData)) {
    if (!allowed_keys.includes(key)) {
      return res.sendStatus(400);
    }
  }

  let foundObject;
  tasks.find((task, idx) => {
    if (task.id == id) {
      for (let key of Object.keys(jsonData)) {
        tasks[idx][key] = jsonData[key];
      }
      foundObject = tasks[idx];
      return true;
    }

    return false;
  });

  if (!foundObject) {
    return res.sendStatus(404);
  }

  res.json(foundObject);
}

function deleteTaskController(req, res) {
  const id = req.params.id;

  let foundObjIndex = tasks.findIndex(task => task.id == id);
  if (foundObjIndex === -1)
    return res.sendStatus(404);

  tasks.pop(foundObjIndex);
  return res.sendStatus(204);
}

module.exports = {
  getTaskListController,
  createTaskController,
  getTaskDetailController,
  patchTaskController,
  deleteTaskController,
};
