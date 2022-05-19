import '@testing-library/jest-dom';
import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import ToDoList from '../pages/ToDoList';

describe('Ao carregar a página', () => {
  beforeEach(() => {
    render(<ToDoList />);
  });
  test('todos os elementos estão renderizados.', async () => {
    
    const taskInput = screen.getByPlaceholderText('Nova Tarefa');
    const taskButton = screen.getByText('Enviar');
  
    const aToZFilter = screen.getByText('A - Z');
    const dateFilter = screen.getByText('Criado em');
    const statusFilter = screen.getByText('Status');
  
    const taksHeader = screen.getByRole('heading', { level: 1 });
    const taskList = screen.getByRole('list');
  
    expect(taskInput).toBeInTheDocument();
    expect(taskButton).toBeInTheDocument();
  
    expect(aToZFilter).toBeInTheDocument();
    expect(dateFilter).toBeInTheDocument();
    expect(statusFilter).toBeInTheDocument();
    
    expect(taksHeader).toBeInTheDocument();
    expect(taskList).toBeInTheDocument();
  });

  test('o botão de Enviar está desabilitado', async () => {
    const taskButton = screen.getByText('Enviar');
  
    expect(taskButton).toBeDisabled();
  });
});

describe('Ao digitar uma tarefa no input', () => {
  beforeEach(() => {
    render(<ToDoList />);
  });
  test('o botão Enviar será habilitado.', () => {
    const taskInput = screen.getByPlaceholderText('Nova Tarefa');
    const taskButton = screen.getByText('Enviar');

    userEvent.type(taskInput, 'Teste');
  
    expect(taskButton).toBeEnabled();
  });
  test('e ao clicar Enviar, uma nova Tarefa é renderizada na página', () => {
    const taskInput = screen.getByPlaceholderText('Nova Tarefa');
    const taskButton = screen.getByText('Enviar');

    userEvent.type(taskInput, 'Teste 1');
    userEvent.click(taskButton);
    
    userEvent.type(taskInput, 'Teste 2');
    userEvent.click(taskButton);
    
    const tasks = screen.getAllByRole('listitem');
    expect(tasks[0]).toBeInTheDocument();
    expect(tasks[1]).toBeInTheDocument();

  });
});

describe('Ao ordenar as tarefas', () => {
  beforeEach(() => {
    render(<ToDoList />);
  });
  test('em ordem alfabética, a lista deve ser renderizada na ordem correta', () => {
    const taskInput = screen.getByPlaceholderText('Nova Tarefa');
    const taskButton = screen.getByText('Enviar');
    const aToZFilter = screen.getByText('A - Z');

    userEvent.type(taskInput, 'B tarefa 2');
    userEvent.click(taskButton);
    
    userEvent.type(taskInput, 'A tarefa 1');
    userEvent.click(taskButton);

    userEvent.click(aToZFilter);

    const tasks = screen.getAllByRole('listitem');
  
    expect(tasks[0]).toHaveTextContent('A tarefa 1');
  });
  test('pela data de criação, a lista deve ser renderizada na ordem correta', () => {
    const taskInput = screen.getByPlaceholderText('Nova Tarefa');
    const taskButton = screen.getByText('Enviar');
    const aToZFilter = screen.getByText('A - Z');
    const dateFilter = screen.getByText('Criado em');

    userEvent.type(taskInput, 'B tarefa 2');
    userEvent.click(taskButton);
    
    userEvent.type(taskInput, 'A tarefa 1');
    userEvent.click(taskButton);

    userEvent.click(aToZFilter);
    let tasks = screen.getAllByRole('listitem');

    expect(tasks[0]).toHaveTextContent('A tarefa 1');

    userEvent.click(dateFilter);
    tasks = screen.getAllByRole('listitem');
  
    expect(tasks[0]).toHaveTextContent('B tarefa 2');
  });
});

