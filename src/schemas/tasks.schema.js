const joi = require('joi');

const taskSchema = {
  id: joi
    .number()
    .min(0),
  task: joi
    .string(),
  isDone: joi
    .boolean()
};

const paramSchema = joi.object({
  taskId: taskSchema.id.required()
});

module.exports = {
  getTaskListQuerySchema: joi.object({
    isDone: joi
      .string()
      .valid('0', '1')
  }),

  createTaskBodySchema: joi.object({
    task: taskSchema.task.required()
  }),

  getTaskParamSchema: paramSchema,

  editTaskParamSchema: paramSchema,

  editTaskBodySchema: joi.object({
    task: taskSchema.task,
    isDone: taskSchema.isDone
  }).min(1),

  deleteTaskParamSchema: paramSchema,
};
