import React from 'react';
import { renderWithIntl } from '@utils/testUtils';
import ErrorBoundary from '../index';

const Something = () => null;

describe('ErrorBoundary', () => {
  it('should match the snapshot', () => {
    const { wrapper } = renderWithIntl(
      <ErrorBoundary>
        <Something />
      </ErrorBoundary>
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('should throw Error', () => {
    const Throws = () => {
      throw new Error('Oh no!');
    };
    const { getAllByTestId } = renderWithIntl(
      <ErrorBoundary>
        <Throws />
      </ErrorBoundary>
    );
    expect(getAllByTestId('error')).toMatchSnapshot();
    expect(Throws).toThrow('Oh no!');
  });
});
