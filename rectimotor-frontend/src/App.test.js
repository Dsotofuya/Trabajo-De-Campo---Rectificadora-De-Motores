import { render, screen } from '@testing-library/react';
import App from './App';

test('renders App', () => {
  render(<App />);
  screen.debug();
  const title = screen.getByText();
});

test('renders content', () => {
    const note = {
      content: 'This is a test', 
      important: true
    }
  }
)

const component = render(<ConsultOrders />)
console.log(component);