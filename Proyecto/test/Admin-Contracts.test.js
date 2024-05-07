const supertest = require('supertest');
const dbConnection = require('../src/Config/dbConfig'); // assuming this is the mock for the database connection

jest.mock('../src/Config/dbConfig');

const app = require('../app'); // assuming this is where your Express app is initialized

describe('Admin-Contracts.js', () => {
  beforeEach(() => {
    dbConnection.beginTransaction.mockImplementation((callback) => callback());
    dbConnection.query.mockImplementation((query, params, callback) => {
      const mockResponse = {
        success: true,
        data: [], // Replace with appropriate data for successful responses
      };
      callback(null, mockResponse);
    });
    dbConnection.commit.mockImplementation((callback) => callback());
    dbConnection.rollback.mockImplementation((callback) => callback());
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should update user and tenant information, contacts, and account information successfully (editarregistro)', async () => {
    const reqBody = {
      opt: 'editarregistro',
      // ... other request body properties
    };

    const response = await supertest(app)
      .post('/admin-contracts')
      .send(reqBody);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      success: true,
      message: 'Registros actualizados correctamente',
    });
    expect(dbConnection.beginTransaction).toHaveBeenCalledTimes(1);
    expect(dbConnection.query).toHaveBeenCalledTimes(multiple); // Replace with the expected number of calls
    expect(dbConnection.commit).toHaveBeenCalledTimes(1);
  });

  it('should handle error during transaction initiation (editarregistro)', async () => {
    dbConnection.beginTransaction.mockImplementation((callback) => callback(new Error('Transaction error')));

    const reqBody = {
      opt: 'editarregistro',
      // ... other request body properties
    };

    const response = await supertest(app)
      .post('/admin-contracts')
      .send(reqBody);

    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual({
      success: false,
      message: 'Error en el servidor',
      recommendation: 'Error al iniciar la transacción',
    });
    expect(dbConnection.rollback).toHaveBeenCalledTimes(1);
  });

  it('should handle error during user update (editarregistro)', async () => {
    dbConnection.query.mockImplementation((query, params, callback) => {
      if (query.includes('UPDATE user')) {
        callback(new Error('Error updating user'));
      } else {
        callback(null, { success: true, data: [] });
      }
    });

    const reqBody = {
      opt: 'editarregistro',
      // ... other request body properties
    };

    const response = await supertest(app)
      .post('/admin-contracts')
      .send(reqBody);

    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual({
      success: false,
      message: 'Error en el servidor',
      recommendation: 'Verifica la actualización del email del usuario',
    });
    expect(dbConnection.rollback).toHaveBeenCalledTimes(1);
  });

  // Add test cases for other functionalities (opt values) in Admin-Contracts.js
  // following the same structure:
  // - describe the functionality
  // - mock the database responses
  // - make the request using supertest
  // - assert the response status code and body
  // - assert the expected database interactions (calls to mock functions)
});
