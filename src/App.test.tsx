import React from 'react';
import { render, fireEvent, screen, within } from '@testing-library/react';
import App from './App';

test('добавление задачи', () => {
  render(<App />);
  const input = screen.getByPlaceholderText(/Введите новую задачу/i);
  fireEvent.change(input, { target: { value: 'Новая задача' } });
  fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

  const allTasksList = screen.getByRole('heading', { name: /Все задачи/i }).nextElementSibling;
  if (!allTasksList) {
    throw new Error('The task list was not found');
  }
  expect(within(allTasksList as HTMLElement).getByText('Новая задача')).toBeInTheDocument();
});

test('переключение состояния задачи', () => {
  render(<App />);
  const input = screen.getByPlaceholderText(/Введите новую задачу/i);
  fireEvent.change(input, { target: { value: 'Задача' } });
  fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

  const checkbox = screen.getByRole('checkbox');
  expect(checkbox).not.toBeChecked();

  fireEvent.click(checkbox);
  expect(checkbox).toBeChecked();
});

test('очистка выполненных задач', () => {
  render(<App />);
  const input = screen.getByPlaceholderText(/Введите новую задачу/i);
  fireEvent.change(input, { target: { value: 'Задача' } });
  fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

  const checkbox = screen.getByRole('checkbox');
  fireEvent.click(checkbox);
  fireEvent.click(screen.getByText(/Очистить выполненные/i));

  expect(screen.queryByText('Задача')).not.toBeInTheDocument();
});
