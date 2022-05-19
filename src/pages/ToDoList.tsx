import React, { useState } from 'react';

export default function ToDoList() {
  const [tasks, setTasks] = useState<string[]>([]);
  const [taskInput, setTaskInputt] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

  function checkInputValue(input: string) {
    if (input.length < 3) return setIsDisabled(true);
    return setIsDisabled(false);
  }

  function handleSubmit(event: React.SyntheticEvent): void {
    event.preventDefault();
    setTasks([...tasks, taskInput]);
  }

  function handleChange(event: React.SyntheticEvent): void {
    const { target } = event;
    const newTask = (target as HTMLInputElement).value;
    checkInputValue(newTask);
    setTaskInputt(newTask);
  }


  return (
    <div>
      <form
        onSubmit={ handleSubmit }
      >
        <input
          onChange={ handleChange }
          type="text"placeholder="Nova Tarefa"
          value={ taskInput }
        />
        <button
          disabled={ isDisabled }
          name="taskButton"
        > Enviar </button>
      </form>
      <div>
        <p> Filtrar por: </p>
        <button> A - Z </button>
        <button> Criado em </button>
        <button> Status </button>
      </div>
      <div>
        <h1> Tarefas </h1>
        <ul>
          { tasks ? tasks.map((task) => {
            return (
              <li key={ task  }>
                { task }
              </li>
            );
          }) : 'Carregando...' }
        </ul>
      </div>
    </div>
  );
}
