import React, { Component, useEffect, useLayoutEffect, useState } from 'react';
import TodoList from './components/TodoList'
import Header from './components/Header'
import Footer from './components/Footer'
import './style/todo.css'

const ListTodo = [
    {
        id: 1,
        text: 'todo 1',
        isCompleted: true
    }, {
        id: 2,
        text: 'todo 2',
        isCompleted: false
    }
]


const App = () => {

    const [todosList, setTodosList] = useState(ListTodo)
    const [todoEditingId, setTodoEditingId] = useState('')
    const [isCheckedAll, setIsCheckAll] = useState(false)
    const [status, setStatus] = useState("ALL")

    useLayoutEffect(() => {
        setIsCheckAll(!isNotCheckedAll(todosList))
    }, [todosList])

    const isNotCheckedAll = (todos) => todos.find(todo => !todo.isCompleted)
    const filterByStatus = (todos, status, id = '') => {
        console.log("TODOS", todos)
        switch (status) {
            case 'ACTIVE':
                return todos.filter(todo => !todo.isCompleted)
            case 'COMPLETED':
                return todos.filter(todo => todo.isCompleted)
            case 'REMOVE':
                return todos.filter(todo => todo.id !== id)
            default:
                return todos
        }
    }
    const addTodo = (todo = {}) => {
        setTodosList([...todosList, todo])
    }

    const getTodoEditingId = () => {
        setTodoEditingId('')
    }
    const onEditTodo = (todo = {}, index = -1) => {
        if (index >= 0) {
            const list = todosList
            list.splice(index, 1, todo)
            setTodosList(list)
            setTodoEditingId('')
        }
    }

    const markCompleted = (id) => {
        const updatedList = todosList.map((todo) => {
            console.log("MEEEE", todo.isCompleted)
            if (todo.id === id) {todo.isCompleted =  !todo.isCompleted } 
            return todo
        })
        console.log("UPDATE", updatedList)
        setTodosList(updatedList)
        setIsCheckAll(!isNotCheckedAll(updatedList))
    }

    const checkedAllTodos = () => {
        console.log("HERE")
        setIsCheckAll(!isCheckedAll)
        setTodosList(todosList.map(todo => ({ ...todo, isCompleted: !isCheckedAll })))
    }

    const setStatusFilter = (newStatus) => {
        setStatus(newStatus)
    }
    const clearCompleted = () => {
        setTodosList(filterByStatus(todosList, 'ACTIVE'))
    }

    const removeTodo = (id = '') => {
        setTodosList(filterByStatus(todosList, 'REMOVE', id))
    }

    return (
        <div className="todoapp">
            <Header
                addTodo={addTodo}
                isCheckedAll={isCheckedAll}
            />
            <TodoList
                todosList={filterByStatus(todosList, status)}
                getTodoEditingId={getTodoEditingId}
                todoEditingId={todoEditingId}
                onEditTodo={onEditTodo}
                markCompleted={markCompleted}
                isCheckedAll={isCheckedAll}
                checkedAllTodos={checkedAllTodos}
                removeTodo={removeTodo} />
            <Footer
                setStatusFilter={setStatusFilter}
                status={status}
                clearCompleted={clearCompleted}
                numOfTodos={todosList.length}
                numOfTodosLeft={filterByStatus(todosList, 'ACTIVE').length}
            />
        </div>
    );
}

export default App;
