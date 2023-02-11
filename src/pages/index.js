
import { Inter } from '@next/font/google'
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ['latin'] })

function Home() {

  const [menu, setMenu] = useState(0);

  function changeMenu(event) {
    setMenu(parseInt(event.target.value));
  }
  function getMenu() {
    switch (menu) {
      // eslint-disable-next-line
      case 0: return false; break;
      // eslint-disable-next-line
      case 1: return true; break;
      default: return 'Error 404: Page not found';
    }
  }

      const [todos, setTodos] = useState([])
    const [todo, setTodo] = useState({
        title: '',
        description: '',
        done: 'False',
        isEditing: false,
        index: -1,
    })
    const titleChange = (e) => {
        setTodo({...todo, title: e.target.value})
    }
    const descriptionChange = (e) => {
        setTodo({...todo, description: e.target.value})
    }

    const buttonClicked = () => {
        setTodos([...todos, todo])
        setTodo({title: '', description: '', done: 'False'})
    }
    
    function doneClicked(index){
        let checkTodos = todos.filter((data, todoindex) => {
            if(index === todoindex){
                 data.done = 'True'
            }
                return data;
        })
        setTodos(checkTodos)
        console.log(checkTodos)
    }

    function deleteClicked(index){
        let modifedTodos = todos.filter((data, todoIndex) => {
            if(index !== todoIndex)
                return data;
        })
        setTodos(modifedTodos)
        console.log(modifedTodos)
    }

    function editClicked(index, todoItem){
        setTodo({title: todoItem.title, description: todoItem.description,done: todoItem.done, isEditing: true, index: index})
    }

    function updateClicked(){
        let newTodos = todos.map((data, index) => {
            if(index === todo.index){
                return {title: todo.title, description: todo.description, done: todo.done}
            }
            return data;
        })
        setTodos(newTodos)
        setTodo({...todo, title: '', description: '',done: '', isEditing: false})
        console.log(newTodos)
    }


  return (
<div className="flex justify-center flex-col items-center">
  <div className="App-header">
    <div className="flex gap-5 pb-10 font-bold text-3xl">
      <button className='btn' id="choices" name="choices" value={0} onClick={changeMenu}>Todo</button>
      <button className='btn' id="choices" name="choices" value={1} onClick={changeMenu}>Done</button>
    </div>
  </div>
    <div> 
    {menu ? (
                            <div className="grow shrink-0 w-[400px]">
                            <div className="pt-5">
                            <div className="text-2xl font-bold">Done:</div>
                            </div>
                              <ul>
                                {todos.map((todo, index) => {
                                    if (todo.done == 'True'){
                                        return(
                                        <li className="text-lg pt-5 flex" key={index}>
                                            <div className="grow">
                                                <div className="font-bold">{index+1}: {todo.title}</div>
                                                <div>{todo.description}</div>
                                            </div>
                                            <div>
                                                <button onClick={() => deleteClicked(index)} className="mt-3 shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
                                                    Delete
                                                </button>
                                            </div>
                                        </li>
                                    )}
                                })}
                              </ul>
                            </div>

                    ): (
                      <div className="grow shrink-0 w-[400px]">
                      <div className="pt-5">
                          <div className="text-2xl font-bold">Todo:</div>
                          Title: <input name="title" value={todo.title} onChange={titleChange} className="shadow pb-2 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" />
                          Description: <input name="description" value={todo.description} onChange={descriptionChange} className="shadow pb-2 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" />
                          {todo.isEditing ? (
                              <button onClick={updateClicked} className="mt-3 shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
                                  Update
                              </button>
                          ): (
                              <button onClick={buttonClicked} className="mt-3 shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
                                  Add todo
                              </button>
                          )}
                      </div>
                      <ul>
                          {todos.map((todo, index) => {
                              if (todo.done != 'True'){
                                  return(
                                  <li className="text-lg pt-5 flex" key={index}>
                                      <div className="grow">
                                          <div className="font-bold">{index+1}: {todo.title}</div>
                                          <div>{todo.description}</div>
                                      </div>
                                      <div>
                                      <button onClick={() => doneClicked(index, todo)} className="mt-3 mr-4 shadow bg-blue-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-3 rounded" type="button">
                                              Done
                                          </button>
                                          <button onClick={() => editClicked(index, todo)} className="mt-3 mr-4 shadow bg-indigo-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-3 rounded" type="button">
                                              Edit
                                          </button>
                                          <button onClick={() => deleteClicked(index)} className="mt-3 shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-3 rounded" type="button">
                                              Delete
                                          </button>
                                      </div>
                                  </li>
                              )}
                          })}
                      </ul>
                     </div>

                    )}
    </div>
</div>
  )
}

export default Home;
