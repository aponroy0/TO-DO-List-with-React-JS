import React from 'react'
import { useState } from 'react'
import { RxComponentPlaceholder } from 'react-icons/rx';
import './index.css'

// This is the only JSX component that are registered into main..

const App = () => {

// There are two states. One is being used for taking input instantly
// from user input box. The other is for storing values in an array.
// States helps when we want to change something inside a componenet.
// It only renders the specific element based on the expectation.
// It changes dynamically and renders the exact DOM element we want to change..  
  const [task, setTask] = useState('');
  const [addTask, setAddTask] = useState([]);


// This scope is for handeling input. In that, each character are storing
// in the task varible. This is a function. That receives a e[obj] argument
// each time user fires a key. Where e has target proprerty named target.
// target actually refers to that specific DOM element from where the 
// even has occured.
  const handleInput = (e) => {
    setTask(e.target.value);
  }


// This scope of the code is for adding object elemet to the addTask
// varible. It stores element with some additional info with help
// of spread operator. 
  const handleAdd = () => {

  
      const item ={
      id: addTask.length+1,
      text: task,
      completed:false,
      isEditing:false,
    }
    setAddTask(prev => [...prev, item]);
    setTask('');
    
   
  }
  


// This scope of code is for handeling the checkbox with a strike
// We are checking in the basis of the id..
  const toggleCompleted =(id)=>{

    setAddTask(addTask.map((t)=>{
       if(t.id === id)
       {
        return{
          ...t,
          completed: !t.completed
        }
       }
       else{
        return t;
       }
  }))

  }


// This scope of code is for deleting the task
// Process 
// We are filtering the data based on the id.
  const handleDelete =(id)=>{
     
    setAddTask(addTask.filter((f)=>(
      f.id !== id
    )))
  }

// This scope is for edit of the existing Task-Lists
const handleEdit =(id)=> {

  setAddTask(addTask.map((m)=>{
    if(m.id === id){
       return {
        ...m,
        isEditing : !m.isEditing,
       }
    }
    else{
      return m;
    }
    
    
}))
    
}

// Handling save
const handleEditInput =(id,e)=>{

  setAddTask(addTask.map((m)=>{
          
    if(m.id == id)
    {
     
     return{
      ...m,
      text: e.target.value,

     }
    }
     else{
      return m;
     }


    
  }))


}




// This is a return scope where the return happens. It returns only one element at a time.
// This scope is actually resposible for the rederring.
//  
  return (
       <>
       <div className='Main-div'>
        <input 
             type="text" 
             placeholder='Enter Your To-Do' 
             onChange={(e)=> handleInput(e)} 
             value={task}
      />

      <button 
        onClick={ task? handleAdd : ''}
        className='Add'
      >  
        Add Task
      </button>
      <div>
        <ul>
          {addTask.map((m) => (
            <li key={m.id}>
                  <input className='input' type='checkbox' checked={m.completed} onChange={()=>toggleCompleted(m.id)}/>
                  <span className={m.completed ? "strikethrough" : ''}>{m.isEditing? (<input type="text" value={m.text} onChange={(e)=> handleEditInput(m.id,e)}/>): (m.text) } </span>  
                  <button
                   onClick={()=> handleDelete(m.id)}
                  >Delete</button>

                  <button onClick={()=>handleEdit(m.id)}>
                   {m.isEditing ? (<span>Save</span>) : (<span>Edit</span>)} 
                  </button>

            </li>
        
          ))}
        </ul>

      </div>  
        
        
         </div>
      


       </>

       
  )
}

export default App