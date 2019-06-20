import initialMessage from '../../../utils/initialMessage';

describe('initial message', () => {
  test('should return the initial message with logged in user', () => {
    const message = initialMessage('Yves');
    expect(message.title).toEqual(
      `Hi Yves, Welcome to the Converge Companion App. What would you like to do?`
    );
  });

  test('should return the initial message with default name', () => {
    const message = initialMessage();
    expect(message.title).toEqual(
      'Hi Ebun, Welcome to the Converge Companion App. What would you like to do?'
    );
  });
});
