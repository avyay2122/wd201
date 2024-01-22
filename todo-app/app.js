const express = require("express");
const app = express();
const { Todo } = require("./models");
const bodyParser = require("body-parser");
const path = require("path");
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");

app.get("/", async (request, response) => {
  await Todo.getTodos();
  if (request.accepts("html")) {
    const overdues = await Todo.overdue();
    const todaydues = await Todo.todaydue();
    const laterdues = await Todo.laterdue();
    const comptodos = await Todo.completedtodos();
    console.log(overdues, todaydues, laterdues, comptodos);
    response.render("index", {
      overdues,
      todaydues,
      laterdues,
      comptodos,
    });
  } else {
    const overdues = await Todo.overdue();
    const todaydues = await Todo.todaydue();
    const laterdues = await Todo.laterdue();
    const comptodos = await Todo.completedtodos();
    return response.json({
      overdues,
      todaydues,
      laterdues,
      comptodos,
    });
  }
});

app.use(express.static(path.join(__dirname, "public")));
// app.get("/", function (request, response) {
//   response.send("Hello World");
// });

// app.get("/todos", async function (_request, response) {
//   console.log("Processing list of all Todos ...");
//   // FILL IN YOUR CODE HERE
//   try {
//     const todos = await Todo.findAll();
//     return response.json(todos);
//   } catch (error) {
//     console.log(error);
//     return response.status(422).json(error);
//   }
//   // First, we have to query our PostgerSQL database using Sequelize to get list of all Todos.
//   // Then, we have to respond with all Todos, like:
//   // response.send(todos)
// });
app.get("/todos", async function (request, response) {
  console.log("Processing list of all Todos ...");
  try {
    const overdues = await Todo.overdue(request.user.id);
    const todaydues = await Todo.todaydue(request.user.id);
    const laterdues = await Todo.laterdue(request.user.id);
    const comptodos = await Todo.completedtodos(request.user.id);
    console.log(overdues, todaydues, laterdues, comptodos);
    if (request.accepts("html")) {
      response.render("todos", { overdues, todaydues, laterdues, comptodos });
    } else {
      return response.json({ overdues, todaydues, laterdues, comptodos });
    }
  } catch (err) {
    console.log(err);
    response.status(422).send(err);
  }
});

app.get("/todos/:id", async function (request, response) {
  try {
    const todo = await Todo.findByPk(request.params.id);
    return response.json(todo);
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

app.post("/todos", async function (request, response) {
  try {
    await Todo.addTodo(request.body);
    return response.redirect("/");
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

app.put("/todos/:id/markAsCompleted", async function (request, response) {
  const todo = await Todo.findByPk(request.params.id);
  try {
    const updatedTodo = await todo.markAsCompleted();
    return response.json(updatedTodo);
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

app.put("/todos/:id", async function (request, response) {
  const todo = await Todo.findByPk(request.params.id);
  try {
    const updatedTodo = await todo.setCompletionStatus(request.body.completed);
    return response.json(updatedTodo);
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

app.delete("/todos/:id", async function (request, response) {
  console.log("We have to delete a Todo with ID: ", request.params.id);
  // FILL IN YOUR CODE HERE
  try {
    await Todo.remove(request.params.id);
    console.log("--");
    return response.json({ success: true });
  } catch (error) {
    return response.status(422).json(error);
  }

  // First, we have to query our database to delete a Todo by ID.
  // Then, we have to respond back with true/false based on whether the Todo was deleted or not.
  // response.send(true)
});

module.exports = app;
