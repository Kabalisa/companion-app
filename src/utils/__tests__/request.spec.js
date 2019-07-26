import request from '../request';

const makeRequest = async () => request('https://api-me.global.com');
describe('Request function', () => {
  it('should resolve with 200 status', async () => {
    global.fetch = jest.fn().mockImplementation(() => ({
      json: () => ({ message: 'ok' }),
      status: 200
    }));
    const data = await makeRequest();
    expect(data.message).toEqual('ok');
  });

  it('should resolve with 200 status', async () => {
    global.fetch = jest.fn().mockImplementation(() => ({
      json: () => ({ message: 'created' }),
      status: 201
    }));
    const data = await makeRequest();
    expect(data.message).toEqual('created');
  });

  it('should resolve with 200 status', async () => {
    global.fetch = jest.fn().mockImplementation(() => ({
      json: () => ({ message: 'not found' }),
      status: 404
    }));
    try {
      await makeRequest();
    } catch (error) {
      expect(error.message).toEqual('not found');
    }
  });

  it('should resolve with 200 status', async () => {
    global.fetch = jest.fn().mockImplementation(() => ({
      json: () => ({ message: 'bad request' }),
      status: 400
    }));
    try {
      await makeRequest();
    } catch (error) {
      expect(error.message).toEqual('bad request');
    }
  });
});
