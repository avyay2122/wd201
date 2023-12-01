const todoList = () => {
  let currentDate = new Date();
  let year = currentDate.getFullYear();
  let month = currentDate.getMonth() + 1;
  let date = currentDate.getDate();
  if (month < 10) {
    month = "0" + month;
  }
  if (date < 10) {
    date = "0" + date;
  }
  currentDate = year + "-" + month + "-" + date;

  all = [];

  const add = (todoItem) => {
    all.push(todoItem);
  };

  const markAsComplete = (index) => {
    all[index].completed = true;
  };

  const overdue = () => {
    // Write the date check condition here and return the array
    // of overdue items accordingly.

    let result = all.filter((item) => {
      let [iyear, imonth, idate] = item.dueDate.split("-");

      if (iyear < year) {
        return item;
      } else if (iyear == year) {
        if (imonth < month) {
          return item;
        } else if (imonth == month) {
          if (idate < date) {
            return item;
          }
        }
      }
    });

    return result;
  };

  const dueToday = () => {
    // Write the date check condition here and return the array
    // of todo items that are due today accordingly.
    let result = all.filter((item) => {
      let [iyear, imonth, idate] = item.dueDate.split("-");
      if (iyear == year && imonth == month && idate == date) return item;
    });

    return result;
  };

  const dueLater = () => {
    // Write the date check condition here and return the array
    // of todo items that are due later accordingly.
    let result = all.filter((item) => {
      let [iyear, imonth, idate] = item.dueDate.split("-");

      if (iyear > year) {
        return item;
      } else if (iyear == year) {
        if (imonth > month) {
          return item;
        } else if (imonth == month) {
          if (idate > date) {
            return item;
          }
        }
      }
    });

    return result;
  };

  const toDisplayableList = (list) => {
    // Format the To-Do list here, and return the output string
    // as per the format given above.
    return list
      .map((item) => {
        const check = item.completed ? "[x]" : "[ ]";
        const date =
          new Date(item.dueDate).toDateString() === new Date().toDateString()
            ? ""
            : ` ${formattedDate(new Date(item.dueDate))}`;
        return `${check} ${item.title}${date}`;
      })
      .join("\n");
  };

  const formattedDate = (d) => {
    return d.toISOString().split("T")[0];
  };

  return {
    all,
    add,
    markAsComplete,
    overdue,
    dueToday,
    dueLater,
    toDisplayableList,
  };
};

// ####################################### #
// DO NOT CHANGE ANYTHING BELOW THIS LINE. #
// ####################################### #

const todos = todoList();

const formattedDate = (d) => {
  return d.toISOString().split("T")[0];
};

var dateToday = new Date();
const today = formattedDate(dateToday);
const yesterday = formattedDate(
  new Date(new Date().setDate(dateToday.getDate() - 1))
);
const tomorrow = formattedDate(
  new Date(new Date().setDate(dateToday.getDate() + 1))
);

todos.add({ title: "Submit assignment", dueDate: yesterday, completed: false });
todos.add({ title: "Pay rent", dueDate: today, completed: true });
todos.add({ title: "Service Vehicle", dueDate: today, completed: false });
todos.add({ title: "File taxes", dueDate: tomorrow, completed: false });
todos.add({ title: "Pay electric bill", dueDate: tomorrow, completed: false });

console.log("My Todo-list\n");

console.log("Overdue");
var overdues = todos.overdue();
var formattedOverdues = todos.toDisplayableList(overdues);
console.log(formattedOverdues);
console.log("\n");

console.log("Due Today");
let itemsDueToday = todos.dueToday();
let formattedItemsDueToday = todos.toDisplayableList(itemsDueToday);
console.log(formattedItemsDueToday);
console.log("\n");

console.log("Due Later");
let itemsDueLater = todos.dueLater();
let formattedItemsDueLater = todos.toDisplayableList(itemsDueLater);
console.log(formattedItemsDueLater);
console.log("\n\n");
