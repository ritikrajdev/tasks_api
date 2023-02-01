const {describe, it} = require('@jest/globals');

const taskController = require('../../src/controllers/taskController');
const taskServices = require('../../src/services/taskServices');
const {InvalidInputError, RequiredKeyError} = require('../../src/errors');


describe('getTaskList', () => {
  const tasks = [
    {id: 1, isDone: true, task: 'some task a'},
    {id: 2, isDone: false, task: 'some task b'}
  ];

  it('should call next to handle invalid isDone filter with error handling middleware', async () => {
    const mockReq = {
      query: {isDone: 'hello'}
    };
    const mockRes = {};
    const next = jest.fn();
    
    await taskController.getTaskList(mockReq, mockRes, next);
    expect(next).toBeCalledWith(new InvalidInputError('isDone must be 0 or 1'));
  });

  it('should return list of all tasks', async () => {
    const mockReq = {
      query: {},
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const next = () => {};

    jest.spyOn(taskServices, 'getTaskList').mockResolvedValue(tasks);

    await taskController.getTaskList(mockReq, mockRes, next);
    expect(mockRes.status).toBeCalledWith(200);
    expect(mockRes.json).toBeCalledWith(tasks);
  });
});

describe('createTask', () => {
  it('should call next to handle task not sent with error handling middleware', async () => {
    const mockReq = {
      body: {}
    };
    const mockRes = {};
    const next = jest.fn();
    
    await taskController.createTask(mockReq, mockRes, next);
    expect(next).toBeCalledWith(new RequiredKeyError('task is required'));
  });

  it('should send object back with id and isDone on creation', async () => {
    const createdObject = {
      id: 1,
      task: 'task 1',
      isDone: false
    };
    const mockReq = {
      body: {
        task: 'task 1',
      }
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const next = () => {};

    jest.spyOn(taskServices, 'createTask').mockResolvedValue(createdObject);

    await taskController.createTask(mockReq, mockRes, next);
    expect(mockRes.status).toBeCalledWith(201);
    expect(mockRes.json).toBeCalledWith(createdObject);
  });
});

describe('getTaskById', () => {
  it('should send object on correct input', async () => {
    const mockReq = {
      params: {
        taskId: 1
      }
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const next = () => {};

    const task = {
      id: 1,
      task: 'some task',
      isDone: false
    };

    jest
      .spyOn(taskServices, 'getTaskById')
      .mockResolvedValue(task);
    
    await taskController.getTaskById(mockReq, mockRes, next);
    expect(mockRes.status).toBeCalledWith(200);
    expect(mockRes.json).toBeCalledWith(task);
  });
});

describe('editTaskById', () => {
  it('should edit object on correct input', async () => {
    const mockReq = {
      params: {
        taskId: 1
      },
      body: {
        task: 'updated task'
      }
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const next = () => {};

    const task = {
      id: 1,
      task: 'updated task',
      isDone: false
    };

    jest
      .spyOn(taskServices, 'editTaskById')
      .mockResolvedValue(task);
    
    await taskController.editTaskById(mockReq, mockRes, next);
    expect(mockRes.status).toBeCalledWith(200);
    expect(mockRes.json).toBeCalledWith(task);
  });
});

describe('deleteTaskById', () => {
  it('should send 204 on succesful deletion', async () => {
    const mockReq = {
      params: {
        taskId: 1
      }
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      end: jest.fn()
    };
    const next = () => {};

    jest
      .spyOn(taskServices, 'deleteTaskById')
      .mockResolvedValue(undefined);
    
    await taskController.deleteTaskById(mockReq, mockRes, next);
    expect(mockRes.status).toBeCalledWith(204);
    expect(mockRes.end).toBeCalled();
  });
});