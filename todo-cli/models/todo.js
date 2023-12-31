'use strict';
const { Model, Op } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static async addTask(params) {
      return await Todo.create(params);
    }
    static async showList() {
      console.log("My Todo list \n");

      console.log("Overdue");
      // FILL IN HERE
      let over = await Todo.overdue();

      let ods = over
        .map((item) => {
          console.log(item.displayableString());
        })
        .join("\n");

      console.log(ods);

      // console.log("\n");

      console.log("Due Today");
      // FILL IN HERE
      const dt = await this.dueToday();
      const dtd = dt.map((t) => t.displayableString());
      console.log(dtd.join("\n").trim());

      console.log("\n");

      console.log("Due Later");
      // FILL IN HERE
      let later = await Todo.dueLater();

      let ols = later
        .map((item) => {
          console.log(item.displayableString());
        })
        .join("\n");
    }

    static async overdue() {
      // FILL IN HERE TO RETURN OVERDUE ITEMS
      return await Todo.findAll({
        where: {
          dueDate: {
            [Op.lt]: new Date(),
          },
        },
      });
    }

    static async dueToday() {
      // FILL IN HERE TO RETURN ITEMS DUE tODAY
      return await Todo.findAll({
        where: {
          dueDate: {
            [Op.eq]: new Date().toISOString().split("T")[0],
          },
        },
      });
    }

    static async dueLater() {
      // FILL IN HERE TO RETURN ITEMS DUE LATER
      return await Todo.findAll({
        where: {
          dueDate: {
            [Op.gt]: new Date().toISOString().split("T")[0],
          },
        },
      });
    }

    static async markAsComplete(id) {
      // FILL IN HERE TO MARK AN ITEM AS COMPLETE
      return await Todo.update(
        { completed: true },
        {
          where: {
            id: id,
          },
        },
      );

    }

    displayableString() {
      let checkbox = this.completed ? "[x]" : "[ ]";
      const day = new Date(this.dueDate);
      return day.getDate() === new Date().getDate()
        ?` ${this.id}. ${checkbox} ${this.title}`.trim()
        :` ${this.id}. ${checkbox} ${this.title} ${this.dueDate}`.trim();
      }
  }
  Todo.init({
    title: DataTypes.STRING,
    dueDate: DataTypes.DATEONLY,
    completed: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};
