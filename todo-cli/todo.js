/* eslint-disable no-undef */

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
          if( new Date(item.dueDate).toDateString() === new Date().toDateString()){
            return `${check} ${item.title}`
          }else{
            return `${check} ${item.title}${date}`;
          }
      })
      .join("\n");
  };

  const formattedDate = (d) => {
    return d.toISOString().split("T")[0];
  };
  toDisplayableList([{ completed: true, dueDate: "2023-12-15", title: "Hi to" }]);
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
todoList();
module.exports = todoList;
