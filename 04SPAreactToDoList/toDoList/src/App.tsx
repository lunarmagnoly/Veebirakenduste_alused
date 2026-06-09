import { useState } from 'react';
import './App.css';
import ToDoItem from './ToDoItem';
import type { ToDo, Status, Priority, UpdatedProject } from './types';

// Peamine rakendus
const App: React.FC = () => {
  // Kõik projektid
  const [toDos, setToDos] = useState<ToDo[]>([]);

  // Tume teema sisse või välja
  const [darkMode, setDarkMode] = useState(false);

  // Kas vormi aken on avatud
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Vormi väljad
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newDeadline, setNewDeadline] = useState('');
  const [newPriority, setNewPriority] = useState<Priority>('medium');

  // Uue projekti lisamine
  const addToDo = () => {
    if (!newTitle.trim()) return;

    const newProject: ToDo = {
      id: Date.now(),
      text: newTitle.trim(),
      description: newDescription.trim(),
      imageUrl: newImageUrl.trim(),
      deadline: newDeadline,
      completedDate: '',
      status: 'idea',
      priority: newPriority,
      favorite: false,
    };

    setToDos([...toDos, newProject]);

    setNewTitle('');
    setNewDescription('');
    setNewImageUrl('');
    setNewDeadline('');
    setNewPriority('medium');
    setIsFormOpen(false);
  };

  // Projekti kustutamine
  const deleteToDo = (id: number) => {
    setToDos(toDos.filter(toDo => toDo.id !== id));
  };

  // Projekti staatuse muutmine
  const changeStatus = (id: number, newStatus: Status) => {
    // Kui projekt liigub Done veergu, salvestame lõpetamise kuupäeva
    const today = new Date().toISOString().split('T')[0];

    setToDos(
      toDos.map(toDo =>
        toDo.id === id
          ? {
              ...toDo,
              status: newStatus,
              completedDate: newStatus === 'done' ? today : '',
            }
          : toDo
      )
    );
  };

  // Projekti lemmikuks märkimine
  const toggleFavorite = (id: number) => {
    setToDos(
      toDos.map(toDo =>
        toDo.id === id
          ? { ...toDo, favorite: !toDo.favorite }
          : toDo
      )
    );
  };

  // Projekti andmete muutmine
  const editToDo = (id: number, updatedProject: UpdatedProject) => {
    setToDos(
      toDos.map(toDo =>
        toDo.id === id
          ? { ...toDo, ...updatedProject }
          : toDo
      )
    );
  };

  // Veerud, mille järgi projektid jagatakse
  const statuses: Status[] = ['idea', 'progress', 'done'];

  const ideaCount = toDos.filter(t => t.status === 'idea').length;
  const progressCount = toDos.filter(t => t.status === 'progress').length;
  const doneCount = toDos.filter(t => t.status === 'done').length;

  return (
    <div className={`page ${darkMode ? 'dark' : 'light'}`}>
      <div className="app">
        <h1>CodeCat Project Board</h1>

        <button
          className="theme-button"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? '☀ Light Mode' : '🌙 Dark Mode'}
        </button>

        <button
          className="open-modal-button"
          onClick={() => setIsFormOpen(true)}
        >
          + New Project
        </button>

        {/* Näitame vormi ainult siis, kui popup on avatud */}
        {isFormOpen && (
          <div className="modal-overlay">
            <div className="modal-window">
              <button
                className="modal-close"
                onClick={() => setIsFormOpen(false)}
              >
                ×
              </button>

              <h2>New Project</h2>

              <div className="form-container">
                <input
                  type="text"
                  placeholder="Project title"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                />

                <textarea
                  placeholder="Description"
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                />

                <input
                  type="text"
                  placeholder="Image URL"
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                />

                <input
                  type="date"
                  value={newDeadline}
                  onChange={(e) => setNewDeadline(e.target.value)}
                />

                <div className="priority-selector">
                  <button
                    type="button"
                    className={newPriority === 'low' ? 'active' : ''}
                    onClick={() => setNewPriority('low')}
                  >
                    🟢 Low
                  </button>

                  <button
                    type="button"
                    className={newPriority === 'medium' ? 'active' : ''}
                    onClick={() => setNewPriority('medium')}
                  >
                    🟡 Medium
                  </button>

                  <button
                    type="button"
                    className={newPriority === 'high' ? 'active' : ''}
                    onClick={() => setNewPriority('high')}
                  >
                    🔴 High
                  </button>
                </div>

                <button onClick={addToDo}>Add Project</button>
              </div>
            </div>
          </div>
        )}

        <div className="board">
          {statuses.map(status => (
            <div className="board-column" key={status}>
              <h2>
                {status === 'idea' && `Ideas (${ideaCount})`}
                {status === 'progress' && `In Progress (${progressCount})`}
                {status === 'done' && `Done (${doneCount})`}
              </h2>

              {/* Kuvame ainult selle veeru projektid */}
              {toDos
                .filter(toDo => toDo.status === status)
                .sort((a, b) => {
                  // Lemmikprojektid kuvatakse esimesena
                  if (a.favorite !== b.favorite) {
                    return a.favorite ? -1 : 1;
                  }

                  // Kõrgema prioriteediga projektid kuvatakse eespool
                  const priorityOrder = {
                    high: 3,
                    medium: 2,
                    low: 1,
                  };

                  if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
                    return priorityOrder[b.priority] - priorityOrder[a.priority];
                  }

                  // Kui prioriteet on sama, kuvatakse varasem tähtaeg eespool
                  if (a.deadline && b.deadline) {
                    return (
                      new Date(a.deadline).getTime() -
                      new Date(b.deadline).getTime()
                    );
                  }

                  return 0;

                  
                })
                .map(toDo => (
                  <ToDoItem
                    key={toDo.id}
                    toDo={toDo}
                    deleteToDo={deleteToDo}
                    changeStatus={changeStatus}
                    editToDo={editToDo}
                    toggleFavorite={toggleFavorite}
                  />
                ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;