const router = require('express').Router();
const taskController = require('../../controllers/taskController');

router.get('/', taskController.getTaskList);
router.post('/', taskController.createTask);

router.get('/:taskId', taskController.getTaskById);
router.patch('/:taskId', taskController.editTaskById);
router.delete('/:taskId', taskController.deleteTaskById);

module.exports = router;