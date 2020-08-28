import React from 'react'
import Todo from './Todo'

const TodoList = (props => {
    const { todosList,  isCheckedAll, checkedAllTodos} = props
    return(
        <section className = "main">
            <input className = "toggle-all" type = "checkbox" checked={isCheckedAll}/>
            <label htmlFor = "toggle-all" onClick = {checkedAllTodos} ></label>
            <ul className = "todo-list">
                {
                    todosList.map((todo, index) => <Todo index = {index} key = {`todo${todo.id}`} {...{todo}} {...props}  />)
                }
                
            </ul>
        </section>
    )
})
export default TodoList