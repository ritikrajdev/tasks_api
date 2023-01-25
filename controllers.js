const {getRequestBody} = require('./requestUtils');

let tasks = [];
let id = 1;

function getTaskListController(req, res) {
  res.writeHead(200, {'Contet-Type': 'application/json'});
  res.write(JSON.stringify(tasks));
  res.end();
}

function createTaskController(req, res) {
  getRequestBody(req).then(body => {
    let taskName = '';

    try {
      const task = JSON.parse(body);
      if (task.name === undefined)
        return getStatusCodeController(400)(req, res);
      taskName = task.name;
    } catch (err) {
      return getStatusCodeController(400)(req, res);
    }

    const task = {id, name: taskName, isDone: false};
    id += 1;

    tasks.push(task);
    res.writeHead(201, {'Contet-Type': 'application/json'});
    res.write(JSON.stringify(task));
    res.end();
  });
}

function getTaskDetailController(req, res) {
  const id = req.url.split('/').pop();
  const selectedTask = tasks.filter(task => task.id == id);
  if (selectedTask.length === 0) {
    return getStatusCodeController(404)(req, res);
  }
  res.write(JSON.stringify(selectedTask[0]));
  res.end();
}

function patchTaskController(req, res) {
  const id = req.url.split('/').pop();

  getRequestBody(req).then(data => {
    let jsonData = {};
    try {
      const allowed_keys = ['name', 'isDone'];
      jsonData = JSON.parse(data);
      for (let key of Object.keys(jsonData)) {
        if (!allowed_keys.includes(key)) {
          return getStatusCodeController(400)(req, res);
        }
      }
    } catch (err) {
      return getStatusCodeController(400)(req, res);
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
      return getStatusCodeController(404)(req, res);
    }

    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(JSON.stringify(foundObject));
    res.end();
  });
}

function deleteTaskController(req, res) {
  const id = req.url.split('/').pop();

  let foundObjIndex = tasks.findIndex(task => task.id == id);
  if (foundObjIndex === -1)
    return getStatusCodeController(404)(req, res);

  tasks.pop(foundObjIndex);
  return getStatusCodeController(204)(req, res);
}

function getStatusCodeController(statusCode) {
  return function (req, res) {
    res.statusCode = statusCode;
    res.end();
  };
}


module.exports = {
  getTaskListController,
  createTaskController,
  getTaskDetailController,
  patchTaskController,
  deleteTaskController,
  getStatusCodeController
};
