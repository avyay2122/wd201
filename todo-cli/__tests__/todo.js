/* eslint-disable no-undef */
const todoList = require("../todo");

const { all, markAsComplete, add, overdue, dueToday, dueLater } = todoList();

const today = new Date();
let yesterday = new Date(today);
yesterday.setDate(today.getDate() - 1);

yesterday =
  yesterday.getFullYear() +
  "-" +
  String(yesterday.getMonth() + 1).padStart(2, "0") +
  "-" +
  String(yesterday.getDate()).padStart(2, "0");

let tmrw = new Date(today);
tmrw.setDate(today.getDate() + 1);

tmrw =
  tmrw.getFullYear() +
  "-" +
  String(tmrw.getMonth() + 1).padStart(2, "0") +
  "-" +
  String(tmrw.getDate()).padStart(2, "0");

describe("TodoList Test Suite", () => {
  beforeAll(() => {
    add({
      title: "Test todo",
      completed: false,
      dueDate: new Date().toLocaleDateString("en-CA"),
    });
    add({
      title: "Test todo",
      completed: false,
      dueDate: yesterday,
    });
    add({
      title: "Test todo",
      completed: false,
      dueDate: tmrw,
    });
  });
  test("Should add new todo", () => {
    const todoItemsCount = all.length;
    add({
      title: "Test todo",
      completed: false,
      dueDate: new Date().toLocaleDateString("en-CA"),
    });
    expect(all.length).toBe(todoItemsCount + 1);
  });
  test("should mark todo as complete", () => {
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });
  test("should retrieve overdue items", () => {
    const overdueItems = overdue();

    expect(overdueItems.length).toBe(1);
  });

  test("should retrieve duelater items", () => {
    const dueLaters = dueLater();

    expect(dueLaters.length).toBe(1);
  });

  test("should retrieve duetoday items", () => {
    const dueTodays = dueToday();

    expect(dueTodays.length).toBe(2);
  });
});
