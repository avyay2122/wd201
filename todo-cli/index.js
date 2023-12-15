const { connect } = require("./connectDB");
const Todo = require("./TodoModel");

const createTodo = async() => {
    try {
        await connect();
        const todo = await Todo.addTask({
            title: "second Item",
            dueDate: new Date(),
            completed: false,
        });
        console.log(`created with todo id: ${todo.id}`);;
    } catch (error) {
        console.error(error);
    }
};

const countItems = async() => {
    try{
        const totalCount = await Todo.count();
        console.log(`found ${totalCount} items in table`);
    } catch(error){
        console.error(error);
    }
}

const getAllTodos = async () => {
    try{
        const todos = await Todo.findAll();
        const todoList = todos.map(todo => todo.displayableString()).join("\n");
        console.log(todoList);
    }
    catch(error){
        console.error(error);
    }
}

const getSingleTodo = async () => {
    try{
        const todo = await Todo.findOne({
            where: {
                completed: false
            },
            order: [
            ['id','DESC']
            ]
        });
        console.log(todo.displayableString());
        console.log(todoList);
    }
    catch(error){
        console.error(error);
    }
}

const updateItem = async (id) => {
    try {
        const todo = await Todo.update({completed: true},{
            where: {
                id: id
            }
        });
    }
    catch(error) {
        console.error(error);
    }
}

const deleteItem = async (id) => {
    try{
        const deletedRowCount = await Todo.destroy({
            where: {
                id : id
            }
        });
        console.log(`deleted ${deletedRowCount} rows!`);
    }
    catch(error) {
        console.error(error);
    }
}
( async () => {
    await getAllTodos();
    await countItems();
}
)();

//run();


// (async() => {
//     // await createTodo();
//     // await countItems();
//     await getAllTodos();
//     // await updateItem(2);
//     await deleteItem(2);
//     await getAllTodos();
// })();