const express = require("express");
const app = express();
const { Todo } = require("./models");
const bodyParser = require("body-parser");
let response;
// const { Model } = require('sequelize')
app.use(bodyParser.json());
//app.METHOD(PATH,HANDLER) get,delete,post .....
//OR
//app.METHOD(PATH,CALLBACK[,CALLBACK.....])

//eslint-disable-next-line no-unused-vars
app.get("/todos", (request, response) => {
  // response.send("Hello World")
  console.log("Todo-list");
});
app.post("/todos", async (request, reponse) => {
  console.log("Creating a todo", request.body);
  //TODO
  try {
    const todo = await Todo.addTodo({
      title: request.body.title,
      dueDate: request.body.dueDate,
      completed: false,
    });
    return reponse.json(todo);
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});
app.put("/todos/:id/markAsCompleted", async (request, response) => {
  console.log("We have to update a todo with ID:", request.params.id);
  const todo = await Todo.findByPk(request.params.id);
  try {
    const updatedTodo = await todo.markAsCompleted();
    return response.json(updatedTodo);
  } catch (error) {
    return response.status(422).json(error);
  }
});
//eslint-disable-next-line no-unused-vars
app.delete("/todo/:id", (request, response) => {
  console.log("delete a todo by ID: ", request.params.id);
});

module.exports = app;
