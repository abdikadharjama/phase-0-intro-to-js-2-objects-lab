
const assert = require('assert');
const {
  createEmployee,
  updateEmployeeWithKeyAndValue,
  destructivelyUpdateEmployeeWithKeyAndValue,
  deleteFromEmployeeByKey,
  destructivelyDeleteFromEmployeeByKey,
} = require('../index');

describe('employees', function () {
  let employee;

  beforeEach(function () {
    // Initialize employee before each test
    employee = createEmployee('John Doe', '123 Main St');
  });

  it('returns an employee with the original key value pairs and the new key value pair', function () {
    const updatedEmployee = updateEmployeeWithKeyAndValue(employee, 'position', 'Manager');
    assert.deepEqual(updatedEmployee, {
      name: 'John Doe',
      streetAddress: '123 Main St',
      position: 'Manager',
    });
  });

  it('updates `employee` with the given `key` and `value` (it is destructive) and returns the entire updated employee', function () {
    const updatedEmployee = destructivelyUpdateEmployeeWithKeyAndValue(employee, 'position', 'Manager');
    assert.deepEqual(updatedEmployee, {
      name: 'John Doe',
      streetAddress: '123 Main St',
      position: 'Manager',
    });
  });

  it('deletes `key` from a clone of employee and returns the new employee (it is non-destructive)', function () {
    const newEmployee = deleteFromEmployeeByKey(employee, 'streetAddress');
    assert.deepEqual(newEmployee, {
      name: 'John Doe',
    });
  });

  it('does not modify the original employee (it is non-destructive)', function () {
    deleteFromEmployeeByKey(employee, 'streetAddress');
    assert.deepEqual(employee, {
      name: 'John Doe',
      streetAddress: '123 Main St',
    });
  });

  it('returns employee without the deleted key/value pair', function () {
    const updatedEmployee = destructivelyDeleteFromEmployeeByKey(employee, 'streetAddress');
    assert.deepEqual(updatedEmployee, {
      name: 'John Doe',
    });
  });

  it('modifies the original employee', function () {
    destructivelyDeleteFromEmployeeByKey(employee, 'streetAddress');
    assert.deepEqual(employee, {
      name: 'John Doe',
    });
  });
});
