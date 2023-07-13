import React, { useState } from 'react';

const TodoForm = () => {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');

  const handleTaskInputChange = (e) => {
    setTaskInput(e.target.value);
  };

  const handleAddTask = () => {
    if (taskInput.trim() !== '') {
      setTasks([...tasks, taskInput]);
      setTaskInput('');
    }
  };

  const handleCompleteTask = (index) => {
    const completedTask = tasks[index];
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    setCompletedTasks([...completedTasks, completedTask]);
  };

  const handleMoveToIncomplete = (index) => {
    const incompleteTask = completedTasks[index];
    const updatedCompletedTasks = completedTasks.filter((_, i) => i !== index);
    setCompletedTasks(updatedCompletedTasks);
    setTasks([...tasks, incompleteTask]);
  };

  return (
    <div>

      <div>
        <div>
          <h3>未達成</h3>
          <ul>
            {tasks.map((task, index) => (
              <li key={index}>
                {task}
                <span style={{ marginRight: '30px' }}></span>
                <button onClick={() => handleCompleteTask(index)}>達成</button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3>達成</h3>
          <ul>
            {completedTasks.map((task, index) => (
              <li key={index}>
                {task}
                <span style={{ marginRight: '20px' }}></span>
                <button onClick={() => handleMoveToIncomplete(index)}>未達成に戻す</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      <div style={{ marginBottom: '80px' }}></div>
      <div>
        <h3>フォーム追加（仮）</h3>
        <input type="text" value={taskInput} onChange={handleTaskInputChange} />
        <button onClick={handleAddTask}>追加</button>
      </div>

    </div>
 
  );
};

export default TodoForm;







// const Achievement = () => {
//   return (
//     <div>
//       <h3>未達成</h3>
//       <ul>
//         <li>  
//           <input type="text" id="name" name="name" required minlength="4" maxlength="8" size="20"></input>
//           <input type="checkbox" id="horns" name="horns"></input>
//         </li> 
//       </ul>

//       <h3>達成</h3>
//       <ul>
//         <li>
//           <input type="text" id="name" name="name" required minlength="4" maxlength="8" size="20"></input>
//           <input type="checkbox" id="horns" name="horns"></input>
//         </li>
//       </ul>
//     </div>
//   )  
// }
// export default Achievement;