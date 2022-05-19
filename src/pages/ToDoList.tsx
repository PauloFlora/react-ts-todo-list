import React, { useState, useEffect, useCallback } from 'react';

interface ITask {
  id: number,
  task: string,
  status: string,
}

export default function ToDoList() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [taskInput, setTaskInputt] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

  // fetch functions
  const getTasks = useCallback(async (): Promise<void> => {
    const resposne: Response = await fetch('http://localhost:3001/tasks');
    const newTasks = await resposne.json();
    setTasks(newTasks);
  }, []);

  async function deleteTask(event: React.SyntheticEvent) {
    const { target } = event;
    const { id } = (target as HTMLInputElement);
    const requestOptions = {
      method: 'DELETE',
    };
    await fetch(`http://localhost:3001/tasks/${id}`, requestOptions);
    await getTasks();
  }

  // Sorting functions
  function sortAToZ() {
    console.log('a to z');
    
    const sortedTasks = tasks.sort((a: ITask, b:ITask) => {
      if(a.task < b.task) return -1;
      if(b.task < a.task) return 1;
      return 0;
    });
    setTasks([...sortedTasks]);
  }

  function sortByDate() {
    console.log('date');
    const sortedTasks = tasks.sort((a: ITask, b:ITask) => {
      if(a.id < b.id) return -1;
      if(b.id < a.id) return 1;
      return 0;
    });
    setTasks([...sortedTasks]);
  }

  //validations 
  function checkInputValue(input: string) {
    if (input.length < 3) return setIsDisabled(true);
    return setIsDisabled(false);
  }

  // handlers 
  function handleChange(event: React.SyntheticEvent): void {
    const { target } = event;
    const newTask = (target as HTMLInputElement).value;
    checkInputValue(newTask);
    setTaskInputt(newTask);
  }

  async function handleSubmit(event: React.SyntheticEvent): Promise<void> {
    event.preventDefault();
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ newTask: taskInput })
    };
    await fetch('http://localhost:3001/tasks', requestOptions);
    await getTasks();
    setTaskInputt('');
    setIsDisabled(false);
  }

  //useEffects
  useEffect(() => {
    getTasks();
  }, []);

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
        <button
          onClick={ sortAToZ }
        > A - Z </button>
        <button
          onClick={ sortByDate }
        > Criado em </button>
        <button> Status </button>
      </div>
      <div>
        <h1> Tarefas </h1>
        <ul>
          { tasks ? tasks.map((task) => {
            return (
              <li key={ task.id  }>
                <p> { task.task } </p>
                <button> { task.status } </button>
                <button
                  id={ `${task.id}` }
                  onClick={ deleteTask }
                > X </button>
              </li>
            );
          }) : 'Carregando...' }
        </ul>
      </div>
    </div>
  );
}
