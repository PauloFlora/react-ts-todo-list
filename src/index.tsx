import React from 'react';
import ReactDOM from 'react-dom/client';
import ToDoList from './pages/ToDoList';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ToDoList />
  </React.StrictMode>
);