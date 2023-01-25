const {
  getTaskListController,
  createTaskController,
  getTaskDetailController,
  patchTaskController,
  deleteTaskController,
  getStatusCodeController
} = require('./controllers');

const routeControllerMapping = {
  '/tasks': {
    'GET': getTaskListController,
    'POST': createTaskController
  },
  '/tasks/\\d+': {
    'GET': getTaskDetailController,
    'PATCH': patchTaskController,
    'DELETE': deleteTaskController
  }
};


function getRouteController(req) {
  for (let urlPattern of Object.keys(routeControllerMapping)) {
    if (RegExp(`^${urlPattern}$`).test(req.url)) {
      let routeControllers = routeControllerMapping[urlPattern];
      let routeMethodController = routeControllers[req.method];
      return routeMethodController ?? getStatusCodeController(405);
    }
  }

  return getStatusCodeController(404);
}

module.exports = {
  getRouteController,
};
