import React from 'react';

export default function ToDoList() {
  return (
    <div>
      <form>
        <input />
        <button> Enviar </button>
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
          <li> 1. Teste </li>
        </ul>
      </div>
    </div>
  );
}
