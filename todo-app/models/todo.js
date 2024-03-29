"use strict";
const { Model, Op } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
    static addTodo({ title, dueDate }) {
      return this.create({ title: title, dueDate: dueDate, completed: false });
    }
    static getTodos() {
      return this.findAll();
    }

    markAsCompleted() {
      return this.update({ completed: true });
    }
    setCompletionStatus(params) {
      return this.update({ completed: !params });
    }
    static overdue() {
      return this.findAll({
        where: {
          [Op.and]: {
            dueDate: { [Op.lt]: new Date() },
            completed: { [Op.not]: true },
          },
        },
      });
    }

    static todaydue() {
      return this.findAll({
        where: {
          [Op.and]: {
            dueDate: { [Op.eq]: new Date() },
            completed: { [Op.not]: true },
          },
        },
      });
    }
    static remove(id) {
      return Todo.destroy({
        where: {
          id: id,
        },
      });
    }

    static laterdue() {
      return this.findAll({
        where: {
          [Op.and]: {
            dueDate: { [Op.gt]: new Date() },
            completed: { [Op.not]: true },
          },
        },
      });
    }

    static completedtodos() {
      return this.findAll({
        where: {
          completed: true,
        },
      });
    }
  }
  Todo.init(
    {
      title: DataTypes.STRING,
      dueDate: DataTypes.DATEONLY,
      completed: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Todo",
    },
  );
  return Todo;
};
