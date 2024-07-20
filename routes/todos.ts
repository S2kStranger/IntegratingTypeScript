import { Router } from "express";
const router = Router();

import { Todo } from "../models/todo";
import { todo } from "node:test";

let todos: Todo[] = [];

router.get('/',(req,res,next)=> {
    res.status(200).json({todos: todos});
});

router.post('/todo',(req,res,next)=>{
    const newTodo : Todo = {
        id: req.body.id,
        text: req.body.text
    };

    todos.push(newTodo);
    res.status(200).json({result: "Data Added.", array: todos});
});

router.delete('/delete/:todoid',(req,res,next)=>{
    const id = req.params.todoid;
    const hasId = todos.some((todoitem)=> todoitem.id===id);
    if(hasId)
    {
        todos = todos.filter(todoItem => todoItem.id != id);
        res.status(201).json({message: 'Id has been deleted.',array: todos});
    }
    else
        res.status(404).json({message: 'Item not found'});
})

router.put('/update/:todoid',(req,res,next)=>{
    const id = req.params.todoid;
    const todoIndex = todos.findIndex(todoItem => todoItem.id === id);
    if(todoIndex>=0)
        {
            todos[todoIndex] = { id: id , text: req.body.text };
            res.status(201).json({message: 'Object has been updated',array: todos});
        }
        else
            res.status(404).json({message: 'Item not found'});
})


export default router;