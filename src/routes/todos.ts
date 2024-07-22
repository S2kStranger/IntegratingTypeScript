import { Router } from "express";
const router = Router();

import { Todo } from "../models/todo";
import { todo } from "node:test";

let todos: Todo[] = [];

type RequestBody = {text: string};
type RequestParams = {todoid: string};

router.get('/',(req,res,next)=> {
    res.status(200).json({todos: todos});
});

router.post('/todo',(req,res,next)=>{
    const body = req.body as RequestBody;
    const newTodo : Todo = {
        id: req.body.id,
        text: body.text
    };

    todos.push(newTodo);
    res.status(200).json({result: "Data Added.", array: todos});
});

router.delete('/delete/:todoid',(req,res,next)=>{
    const params = req.params as RequestParams;
    const hasId = todos.some((todoitem)=> todoitem.id===params.todoid);
    if(hasId)
    {
        todos = todos.filter(todoItem => todoItem.id != params.todoid);
        res.status(201).json({message: 'Id has been deleted.',array: todos});
    }
    else
        res.status(404).json({message: 'Item not found'});
})

router.put('/update/:todoid',(req,res,next)=>{
    const params = req.params as RequestParams;
    const todoIndex = todos.findIndex(todoItem => todoItem.id === params.todoid);
    if(todoIndex>=0)
        {
            todos[todoIndex] = { id: params.todoid , text: req.body.text };
            res.status(201).json({message: 'Object has been updated',array: todos});
        }
        else
            res.status(404).json({message: 'Item not found'});
})


export default router;