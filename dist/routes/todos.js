"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
let todos = [];
router.get('/', (req, res, next) => {
    res.status(200).json({ todos: todos });
});
router.post('/todo', (req, res, next) => {
    const body = req.body;
    const newTodo = {
        id: req.body.id,
        text: body.text
    };
    todos.push(newTodo);
    res.status(200).json({ result: "Data Added.", array: todos });
});
router.delete('/delete/:todoid', (req, res, next) => {
    const params = req.params;
    const hasId = todos.some((todoitem) => todoitem.id === params.todoid);
    if (hasId) {
        todos = todos.filter(todoItem => todoItem.id != params.todoid);
        res.status(201).json({ message: 'Id has been deleted.', array: todos });
    }
    else
        res.status(404).json({ message: 'Item not found' });
});
router.put('/update/:todoid', (req, res, next) => {
    const params = req.params;
    const todoIndex = todos.findIndex(todoItem => todoItem.id === params.todoid);
    if (todoIndex >= 0) {
        todos[todoIndex] = { id: params.todoid, text: req.body.text };
        res.status(201).json({ message: 'Object has been updated', array: todos });
    }
    else
        res.status(404).json({ message: 'Item not found' });
});
exports.default = router;
