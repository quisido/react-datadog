import { render } from '@testing-library/react';
import DataDog from '../..';

describe('DataDog', (): void => {
  it('should render children', (): void => {
    const { getByText } = render(
      <DataDog
        applicationId="test-application-id"
        clientToken="test-client-token"
      >
        Hello world
      </DataDog>,
    );
    getByText('Hello world');
  });
});
