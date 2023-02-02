const {expect, it, describe} = require('@jest/globals');
const taskServices = require('../../src/services/taskServices');
const {Task} = require('../../src/models');

describe('getTaskList', () => {
  it('should return list of objects', async () => {
    const dbReturnedValues = [
      {
        id: 1,
        task: 'ek task',
        isDone: false
      },
      {
        id: 2,
        task: 'do task',
        isDone: true
      }
    ];

    jest.spyOn(Task, 'findAll')
      .mockResolvedValue(dbReturnedValues);

    const returedVal = await taskServices.getTaskList();
    expect(returedVal)
      .toBe(dbReturnedValues);
  });
});