/* eslint-disable no-undef */
const { describe } = require("../TodoModel");
const db = require("../models");

const Jsdate = (days) => {
  if(!Number.isInteger(days)){
    throw new Error("pass an integer as days");
  }
  const tod = new Date();
  const OneDay = 60*60*24*1000;
  return new Date(tod.getTime() + days *OneDay);
};

describe("testing",function(){
  beforeAll(async () => {
    await db.sequelize.sync({force:true});
  });

  test("Todo.overdue",async() => {
    await db.Todo.addTask({
      title: "Sample Item",
      dueDate: Jsdate(-2),
      completed:false
    });
    const items = await db.Todo.overdue();
    expect(items.length).toBe(1);
  });
  
  test("Todo.dueToday",async() => {
    const dueTodayItems = await db.Todo.addTask({
      title: "Sample Title",
      dueDate: Jsdate(0),
      completed:false,
    });
    const items = await db.Todo.dueToday();
    expect(items.length).toBe(dueTodayItems.length + 1);
  });

  test("Todo.dueLater", async () => {
    const dueLaterItems = await db.Todo.dueLater();
    await db.Todo.addTask({
      title: "This is a sample item",
      dueDate: getJSDate(2),
      completed: false,
    });
    const items = await db.Todo.dueLater();
    expect(items.length).toBe(dueLaterItems.length + 1);
  });

  test("Todo.markAsComplete", async () => {
    const overdueItems = await db.Todo.overdue();
    const aTodo = overdueItems[0];
    expect(aTodo.completed).toBe(false);
    await db.Todo.markAsComplete(aTodo.id);
    await aTodo.reload();

    expect(aTodo.completed).toBe(true);
  });

  test("For a completed past-due item", async () => {
    const overdueItems = await db.Todo.overdue();
    const aTodo = overdueItems[0];
    expect(aTodo.completed).toBe(true);
    const displayValue = aTodo.displayableString();
    expect(displayValue).toBe(
      `${aTodo.id}. [x] ${aTodo.title} ${aTodo.dueDate}`,
    );
  });

  test("For an incomplete todo in the future", async () => {
    const dueLaterItems = await db.Todo.dueLater();
    const aTodo = dueLaterItems[0];
    expect(aTodo.completed).toBe(false);
    const displayValue = aTodo.displayableString();
    expect(displayValue).toBe(
      `${aTodo.id}. [ ] ${aTodo.title} ${aTodo.dueDate}`,
    );
  });
  test("For an incomplete todo due today,", async () => {
    const dueTodayItems = await db.Todo.dueToday();
    const aTodo = dueTodayItems[0];
    expect(aTodo.completed).toBe(false);
    const displayValue = aTodo.displayableString();
    expect(displayValue).toBe(`${aTodo.id}. [ ] ${aTodo.title}`);
  });

  test("For a complete todo due today", async () => {
    const dueTodayItems = await db.Todo.dueToday();
    const aTodo = dueTodayItems[0];
    expect(aTodo.completed).toBe(false);
    await db.Todo.markAsComplete(aTodo.id);
    await aTodo.reload();
    const displayValue = aTodo.displayableString();
    expect(displayValue).toBe(`${aTodo.id}. [x] ${aTodo.title}`);
  });
})