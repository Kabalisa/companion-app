import initialMessage from '../../../utils/initialMessage';

describe('initial message', () => {
  test('should return the initial message with logged in user', () => {
    const message = initialMessage('Yves');
    expect(message.title).toContain(`Welcome to the Converge Companion App.`);
  });

  test('should return the initial message with default name', () => {
    const message = initialMessage();
    expect(message.title).toContain(
      `Hi Ebun, Welcome to the Converge Companion App.`
    );
  });
});
