import loadable from '../loadable';

describe('Loadable tests', () => {
  it('should ensure that lazy function is being called', () => {
    const submitspy = jest.fn();
    loadable(submitspy);
    expect(submitspy).toBeCalled();
  });
});
