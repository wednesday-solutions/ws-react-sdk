import loadable from '../loadable';

describe('Loadable tests', () => {
  it('should ensure that lazy function is being called', () => {
    const submitspy = jest.fn();
    const data = loadable(submitspy);
    expect(submitspy).toBeCalled();
    // https://stackoverflow.com/questions/53189059/how-to-test-snapshots-with-jest-and-new-react-lazy-16-6-api
  });
});
