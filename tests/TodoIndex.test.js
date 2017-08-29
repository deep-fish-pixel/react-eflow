/**
 * Created by mawei on 17/8/11.
 */
import React, {Component} from 'react'
import {shallow, mount} from 'enzyme';
import TodoIndex from './todo/component/TodoIndex';
import TodoHeader from './todo/component/TodoHeader';
import TodoList from './todo/component/TodoList';
import todoStore from './todo/store/TodoStore';
import todoFilterStore from './todo/store/TodoFilterStore';

describe('测试 TODO: <TodoIndex />', () => {
  const todoIndex = mount(
    <TodoIndex />
  );
  let todoNames = [];
  for(let i = 0; i < 50; i++){
    todoNames.push(i + 1);
  }
  let result = [],
      completes = 0;

  test(`创建${todoNames.length}个任务`, () => {
    let todoHeader = todoIndex.find('TodoHeader');
    todoNames.forEach(function (text) {
      todoHeader.node.simulateEnterDown(text);
    });
    let todoList = todoIndex.find('TodoList');
    expect(todoList.find('ul').text()).not.toBe('todos!==todos2');

    expect(todoList.find('li').nodes).toHaveLength(todoNames.length);

    let todoFooter = todoIndex.find('TodoFooter');
    expect(todoFooter.find('span').at(0).text())
      .toBe(todoNames.length > 1
        ? todoNames.length + ' items'
        : todoNames.length + ' item');

  });
  test('随机反转任务, 结果是否相同', () => {
    let todoList = todoIndex.find('TodoList');

    todoNames.forEach(function (name, index) {
      if(Math.random() >= 0.5){
        todoList.find('TodoItem').at(index).find('span').at(0).simulate('click');
        result.push(true);
        completes ++;
      }
      else{
        result.push(undefined);
      }
    });
    let state = todoStore.getState(),
        todos = state.todos,
        completesCount = 0;
    todos.forEach(function (todo, index) {
      if(todo.completed === true && result[index] === true){
        completesCount++;
      }
    });

    console.log('随机反转任务数:' + completes, '反转结果任务数:' + completesCount);
    expect(completesCount).toBe(completes);

    let todoFooter = todoIndex.find('TodoFooter');
    expect(todoFooter.find('span').at(0).text())
      .toBe(todoNames.length > 1
        ? todoNames.length + ' items'
        : todoNames.length + ' item');

  });
  test('切换Active状态', () => {
    let todoFooter = todoIndex.find('TodoFooter'),
      filterElement = todoFooter.find('a').at(0);
    filterElement.simulate('click');

    let todoItems = todoIndex.find('TodoList').find('TodoItem');
    let todos = todoFilterStore.filterTodos.data();
    console.log('当前Active任务数:' + todos.length);

    expect(todos.length).toBe(todoItems.nodes.length);

    expect(todoFooter.find('span').at(0).text())
      .toBe(todos.length > 1
        ? todos.length + ' items'
        : todos.length + ' item');
  });
  test('Active列表,完成第一个任务', () => {
    let todos = todoFilterStore.filterTodos.data();
    let todoList = todoIndex.find('TodoList');
    if(todos.length){
      todoList.find('TodoItem').at(0).find('span').at(0).simulate('click');
      completes ++;
      result.pop();

      expect(todoList.find('ul').text()).not.toBe('todos!==todos2');

      let todoItems = todoIndex.find('TodoList').find('TodoItem');
      todos = todoFilterStore.filterTodos.data();
      console.log('完成第一个任务,Active任务数:' + todos.length);
      expect(todos.length).toBe(todoItems.nodes.length);

      let todoFooter = todoIndex.find('TodoFooter');
      expect(todoFooter.find('span').at(0).text())
        .toBe(todos.length > 1
          ? todos.length + ' items'
          : todos.length + ' item');
    }
  });
  test('Active列表删除任务', () => {
    let todos = todoFilterStore.filterTodos.data();
    let todoList = todoIndex.find('TodoList');
    if(todos.length){
      todoList.find('TodoItem').at(0).find('span').at(1).simulate('click');
      completes ++;
      result.pop();

      expect(todoList.find('ul').text()).not.toBe('todos!==todos2');

      let todoItems = todoIndex.find('TodoList').find('TodoItem');
      todos = todoFilterStore.filterTodos.data();
      console.log('删除1个任务,剩余Active任务数:' + todos.length);
      expect(todos.length).toBe(todoItems.nodes.length);

      let todoFooter = todoIndex.find('TodoFooter');
      expect(todoFooter.find('span').at(0).text())
        .toBe(todos.length > 1
          ? todos.length + ' items'
          : todos.length + ' item');
    }
  });
  test('切换Complete状态', () => {
    let todoFooter = todoIndex.find('TodoFooter'),
        filterElement = todoFooter.find('a').at(1);
    filterElement.simulate('click');

    let todoItems = todoIndex.find('TodoList').find('TodoItem');
    let todos = todoFilterStore.filterTodos.data();
    console.log('当前Complete任务数:' + todos.length);
    expect(todos.length).toBe(todoItems.nodes.length);

    expect(todoFooter.find('span').at(0).text())
      .toBe(todos.length > 1
        ? todos.length + ' items'
        : todos.length + ' item');
  });
  test('Complete列表,完成第一个任务', () => {
    let todos = todoFilterStore.filterTodos.data();
    let todoList = todoIndex.find('TodoList');
    if(todos.length){
      todoList.find('TodoItem').at(0).find('span').at(0).simulate('click');
      completes ++;
      result.pop();

      expect(todoList.find('ul').text()).not.toBe('todos!==todos2');

      let todoItems = todoIndex.find('TodoList').find('TodoItem');
      todos = todoFilterStore.filterTodos.data();
      console.log('完成第一个任务,Complete任务数:' + todos.length);
      expect(todos.length).toBe(todoItems.nodes.length);

      let todoFooter = todoIndex.find('TodoFooter');
      expect(todoFooter.find('span').at(0).text())
        .toBe(todos.length > 1
          ? todos.length + ' items'
          : todos.length + ' item');
    }
  });
  test('Complete列表删除任务', () => {
    let todos = todoFilterStore.filterTodos.data();
    let todoList = todoIndex.find('TodoList');
    if(todos.length){
      todoList.find('TodoItem').at(0).find('span').at(1).simulate('click');
      completes ++;
      result.pop();

      expect(todoList.find('ul').text()).not.toBe('todos!==todos2');

      let todoItems = todoIndex.find('TodoList').find('TodoItem');
      todos = todoFilterStore.filterTodos.data();
      console.log('删除1个任务,剩余Complete任务数:' + todos.length);
      expect(todos.length).toBe(todoItems.nodes.length);

      let todoFooter = todoIndex.find('TodoFooter');
      expect(todoFooter.find('span').at(0).text())
        .toBe(todos.length > 1
          ? todos.length + ' items'
          : todos.length + ' item');
    }
  });

  test('切换All状态', () => {
    let todoFooter = todoIndex.find('TodoFooter'),
      filterElement = todoFooter.find('a').at(0);
    filterElement.simulate('click');

    let todoItems = todoIndex.find('TodoList').find('TodoItem');
    let todos = todoFilterStore.filterTodos.data();
    console.log('All任务数:' + todos.length);
    expect(todos.length).toBe(todoItems.nodes.length);
  });

  test('All列表删除任务', () => {
    let todos = todoFilterStore.filterTodos.data();
    let todoList = todoIndex.find('TodoList');
    if(todos.length){
      todoList.find('TodoItem').at(0).find('span').at(1).simulate('click');
      completes ++;
      result.pop();

      expect(todoList.find('ul').text()).not.toBe('todos!==todos2');

      let todoItems = todoIndex.find('TodoList').find('TodoItem');
      todos = todoFilterStore.filterTodos.data();
      console.log('删除1个任务,剩余任务数:' + todos.length);
      expect(todos.length).toBe(todoItems.nodes.length);
    }
  });

  test('使用data方法  const todoIndex = mount(
    <TodoIndex />
  );
  let todoNames = [];
  for(let i = 0; i < 50; i++){
    todoNames.push(i + 1);
  }
  let result = [],
    completes = 0;

  test(`创建${todoNames.length}个任务`, () => {
    let todoHeader = todoIndex.find('TodoHeader');
    todoNames.forEach(function (text) {
      todoHeader.node.simulateEnterDown(text);
    });
    let todoList = todoIndex.find('TodoList');
    expect(todoList.find('ul').text()).not.toBe('todos!==todos2');

    expect(todoList.find('li').nodes).toHaveLength(todoNames.length);

    let todoFooter = todoIndex.find('TodoFooter');
    expect(todoFooter.find('span').at(0).text())
      .toBe(todoNames.length > 1
        ? todoNames.length + ' items'
        : todoNames.length + ' item');

  });
  test('随机反转任务, 结果是否相同', () => {
    let todoList = todoIndex.find('TodoList');

    todoNames.forEach(function (name, index) {
      if(Math.random() >= 0.5){
        todoList.find('TodoItem').at(index).find('span').at(0).simulate('click');
        result.push(true);
        completes ++;
      }
      else{
        result.push(undefined);
      }
    });
    let state = todoStore.getState(),
      todos = state.todos,
      completesCount = 0;
    todos.forEach(function (todo, index) {
      if(todo.completed === true && result[index] === true){
        completesCount++;
      }
    });

    console.log('随机反转任务数:' + completes, '反转结果任务数:' + completesCount);
    expect(completesCount).toBe(completes);

    let todoFooter = todoIndex.find('TodoFooter');
    expect(todoFooter.find('span').at(0).text())
      .toBe(todoNames.length > 1
        ? todoNames.length + ' items'
        : todoNames.length + ' item');

  });
  test('切换Active状态', () => {
    let todoFooter = todoIndex.find('TodoFooter'),
      filterElement = todoFooter.find('a').at(0);
    filterElement.simulate('click');

    let todoItems = todoIndex.find('TodoList').find('TodoItem');
    let todos = todoFilterStore.filterTodos.data();
    console.log('当前Active任务数:' + todos.length);

    expect(todos.length).toBe(todoItems.nodes.length);

    expect(todoFooter.find('span').at(0).text())
      .toBe(todos.length > 1
        ? todos.length + ' items'
        : todos.length + ' item');
  });
  test('Active列表,完成第一个任务', () => {
    let todos = todoFilterStore.filterTodos.data();
    let todoList = todoIndex.find('TodoList');
    if(todos.length){
      todoList.find('TodoItem').at(0).find('span').at(0).simulate('click');
      completes ++;
      result.pop();

      expect(todoList.find('ul').text()).not.toBe('todos!==todos2');

      let todoItems = todoIndex.find('TodoList').find('TodoItem');
      todos = todoFilterStore.filterTodos.data();
      console.log('完成第一个任务,Active任务数:' + todos.length);
      expect(todos.length).toBe(todoItems.nodes.length);

      let todoFooter = todoIndex.find('TodoFooter');
      expect(todoFooter.find('span').at(0).text())
        .toBe(todos.length > 1
          ? todos.length + ' items'
          : todos.length + ' item');
    }
  });
  test('Active列表删除任务', () => {
    let todos = todoFilterStore.filterTodos.data();
    let todoList = todoIndex.find('TodoList');
    if(todos.length){
      todoList.find('TodoItem').at(0).find('span').at(1).simulate('click');
      completes ++;
      result.pop();

      expect(todoList.find('ul').text()).not.toBe('todos!==todos2');

      let todoItems = todoIndex.find('TodoList').find('TodoItem');
      todos = todoFilterStore.filterTodos.data();
      console.log('删除1个任务,剩余Active任务数:' + todos.length);
      expect(todos.length).toBe(todoItems.nodes.length);

      let todoFooter = todoIndex.find('TodoFooter');
      expect(todoFooter.find('span').at(0).text())
        .toBe(todos.length > 1
          ? todos.length + ' items'
          : todos.length + ' item');
    }
  });
  test('切换Complete状态', () => {
    let todoFooter = todoIndex.find('TodoFooter'),
      filterElement = todoFooter.find('a').at(1);
    filterElement.simulate('click');

    let todoItems = todoIndex.find('TodoList').find('TodoItem');
    let todos = todoFilterStore.filterTodos.data();
    console.log('当前Complete任务数:' + todos.length);
    expect(todos.length).toBe(todoItems.nodes.length);

    expect(todoFooter.find('span').at(0).text())
      .toBe(todos.length > 1
        ? todos.length + ' items'
        : todos.length + ' item');
  });
  test('Complete列表,完成第一个任务', () => {
    let todos = todoFilterStore.filterTodos.data();
    let todoList = todoIndex.find('TodoList');
    if(todos.length){
      todoList.find('TodoItem').at(0).find('span').at(0).simulate('click');
      completes ++;
      result.pop();

      expect(todoList.find('ul').text()).not.toBe('todos!==todos2');

      let todoItems = todoIndex.find('TodoList').find('TodoItem');
      todos = todoFilterStore.filterTodos.data();
      console.log('完成第一个任务,Complete任务数:' + todos.length);
      expect(todos.length).toBe(todoItems.nodes.length);

      let todoFooter = todoIndex.find('TodoFooter');
      expect(todoFooter.find('span').at(0).text())
        .toBe(todos.length > 1
          ? todos.length + ' items'
          : todos.length + ' item');
    }
  });
  test('Complete列表删除任务', () => {
    let todos = todoFilterStore.filterTodos.data();
    let todoList = todoIndex.find('TodoList');
    if(todos.length){
      todoList.find('TodoItem').at(0).find('span').at(1).simulate('click');
      completes ++;
      result.pop();

      expect(todoList.find('ul').text()).not.toBe('todos!==todos2');

      let todoItems = todoIndex.find('TodoList').find('TodoItem');
      todos = todoFilterStore.filterTodos.data();
      console.log('删除1个任务,剩余Complete任务数:' + todos.length);
      expect(todos.length).toBe(todoItems.nodes.length);

      let todoFooter = todoIndex.find('TodoFooter');
      expect(todoFooter.find('span').at(0).text())
        .toBe(todos.length > 1
          ? todos.length + ' items'
          : todos.length + ' item');
    }
  });

  test('切换All状态', () => {
    let todoFooter = todoIndex.find('TodoFooter'),
      filterElement = todoFooter.find('a').at(0);
    filterElement.simulate('click');

    let todoItems = todoIndex.find('TodoList').find('TodoItem');
    let todos = todoFilterStore.filterTodos.data();
    console.log('All任务数:' + todos.length);
    expect(todos.length).toBe(todoItems.nodes.length);
  });

  test('All列表删除任务', () => {
    let todos = todoFilterStore.filterTodos.data();
    let todoList = todoIndex.find('TodoList');
    if(todos.length){
      todoList.find('TodoItem').at(0).find('span').at(1).simulate('click');
      completes ++;
      result.pop();

      expect(todoList.find('ul').text()).not.toBe('todos!==todos2');

      let todoItems = todoIndex.find('TodoList').find('TodoItem');
      todos = todoFilterStore.filterTodos.data();
      console.log('删除1个任务,剩余任务数:' + todos.length);
      expect(todos.length).toBe(todoItems.nodes.length);
    }
  });

  test('使用data方法多次保存数据,最后使用dispatch发布', () => {
    let todos = todoStore.todos.data();
    let todoList = todoIndex.find('TodoList');
    let length = todos.length, cacheOperates;
    if(length){
      todoStore.operateTodos(function (updateQueue, todos) {
        cacheOperates = Object.getOwnPropertyNames(updateQueue.queue);
        expect(cacheOperates.length).toBe(2);
      }, function (updateQueue, todos) {
        cacheOperates = Object.getOwnPropertyNames(updateQueue.queue);
        expect(cacheOperates.length).toBe(0);
      });

      expect(todoList.find('ul').text()).not.toBe('todos!==todos2');

      let todoItems = todoIndex.find('TodoList').find('TodoItem');
      todos = todoFilterStore.filterTodos.data();
      console.log(`删除${length - Math.floor(length/2)}个任务,剩余任务数:` + todos.length);
      expect(length - Math.floor(length/2)).toBe(todoItems.nodes.length);
    }
  });
  多次保存数据,最后使用dispatch发布', () => {
    let todos = todoStore.todos.data();
    let todoList = todoIndex.find('TodoList');
    let length = todos.length, cacheOperates;
    if(length){
      todoStore.operateTodos(function (updateQueue, todos) {
        cacheOperates = Object.getOwnPropertyNames(updateQueue.queue);
        expect(cacheOperates.length).toBe(2);
      }, function (updateQueue, todos) {
        cacheOperates = Object.getOwnPropertyNames(updateQueue.queue);
        expect(cacheOperates.length).toBe(0);
      });

      expect(todoList.find('ul').text()).not.toBe('todos!==todos2');

      let todoItems = todoIndex.find('TodoList').find('TodoItem');
      todos = todoFilterStore.filterTodos.data();
      console.log(`删除${length - Math.floor(length/2)}个任务,剩余任务数:` + todos.length);
      expect(length - Math.floor(length/2)).toBe(todoItems.nodes.length);
    }
  });
});

