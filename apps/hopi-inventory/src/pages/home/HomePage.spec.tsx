import { render } from '@testing-library/react';
import HomePage from './HomePage'

describe('App', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<HomePage />);
    expect(baseElement).toBeTruthy();
  });
});
