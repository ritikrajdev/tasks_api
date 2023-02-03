const router = require('express').Router();
const taskController = require('../../controllers/taskController');
const taskSchemas = require('../../schemas/tasks.schema');
const {validationMiddleware} = require('../../middlewares/validation.middleware');

router.get(
  '/',
  validationMiddleware(taskSchemas.getTaskListQuerySchema, 'query'),
  taskController.getTaskList
);
router.post(
  '/',
  validationMiddleware(taskSchemas.createTaskBodySchema),
  taskController.createTask
);


router.get(
  '/:taskId',
  validationMiddleware(taskSchemas.getTaskParamSchema, 'params'),
  taskController.getTaskById
);
router.patch(
  '/:taskId',
  validationMiddleware(taskSchemas.editTaskBodySchema),
  validationMiddleware(taskSchemas.editTaskParamSchema, 'params'),
  taskController.editTaskById
);
router.delete(
  '/:taskId',
  validationMiddleware(taskSchemas.deleteTaskParamSchema),
  taskController.deleteTaskById
);

module.exports = router;
