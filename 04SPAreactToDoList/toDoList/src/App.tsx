import { useState } from 'react'
import './App.css'
import ToDoItem from './ToDoItem';

type ToDo = {
  id: number;
  text: string;
  completed: boolean;
}

//mida tähendab React.FC?
// React.FC on funktsioon, mis tagastab React komponendi
// React.FC on tüübi määratlus, mis võimaldab meil defineerida funktsionaalset komponenti Reactis
const App: React.FC = () => {
  const [toDos, setToDos] = useState<ToDo[]>([]);
  const [newToDo, setNewToDo] = useState('');
  //mis on useState?
// useState on Reacti hook, mis võimaldab meil lisada komponentidele olekut.
// See tagastab massiivi, kus esimene element on praegune olek ja teine 
// element on funktsioon, mida saab kasutada oleku värskendamiseks.

const addToDo = () => {
  if (!newToDo.trim()) return; // Ignore empty tasks
  setToDos([...toDos, { id: Date.now(), text: newToDo.trim(), completed: false }]);
  // Date.now() annab meile unikaalse ID, mis põhineb praegusest ajast.
  // ...toDos tähendab, et me võtame olemasolevad ülesanded ja lisame uue ülesande massiivi lõppu.
  // newToDo.trim() eemaldab tühikud teksti algusest ja lõpust, et vältida tühjade ülesannete lisamist.
  // completed: false tähendab, et uus ülesanne on algselt lõpetamata.
  setNewToDo('');
  };
  // Pärast uue ülesande lisamist tühjendame sisendvälja, et kasutaja saaks kohe uue ülesande lisada.
  const toggleTodo = (id: number) => {
    // toggleTodo funktsioon võtab ülesande ID ja muudab selle completed oleku vastupidiseks.
    // toDos.map() läbib kõik ülesanded ja kui leitud ülesanne vastab ID-le, siis luuakse 
    // uus objekt, kus completed väärtus on mitte tehtud.
    setToDos(toDos.map(toDo => 
      toDo.id === id ? { ...toDo, completed: !toDo.completed } : toDo
    ));
  };

  const deleteTodo = (id: number) => {
    // deleteTodo funktsioon võtab ülesande ID ja eemaldab selle toDos massiivist.
    // toDos.filter() loob uue massiivi, mis sisaldab ainult neid ülesandeid, 
    // mille ID ei ole kustutatud.
    setToDos(toDos.filter(toDo => toDo.id !== id));
  };


  return (
    <div className="app">
      <h1>To-Do List</h1>
      {/* To-Do List UI goes here */}
      <div className="input-row">
        <input 
          type="text"
          value={newToDo}
          onChange={e => setNewToDo(e.target.value)}
          placeholder="Add a new task"
          onKeyDown={e => e.key === 'Enter' && addToDo()}
        />
        <button onClick={addToDo}>Add</button>
      </div>
      <ul className="todo-list">
        {toDos.map(toDo => (
          <ToDoItem 
            key={toDo.id} 
            toDo={toDo}
            toggleToDo={toggleTodo}
            deleteToDo={deleteTodo}
            />
        ))}
      </ul>
    </div>
  );
};

export default App