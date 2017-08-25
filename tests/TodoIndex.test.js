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
  let todoNames = [1,2,3,4,5,6,7,8,9,10];
  let result = [],
      completes = 0;

  test(`创建${todoNames.length}个任务`, () => {
    let todoHeader = todoIndex.find('TodoHeader');
    todoNames.forEach(function (name) {
      todoHeader.node.simulateEnterDown(name);
    });
    let todoList = todoIndex.find('TodoList');
    expect(todoList.find('li').nodes).toHaveLength(todoNames.length);
  });
  test('随机完成任务, 结果是否相同', () => {
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

    console.log('随机完成任务数:' + completes, '完成结果任务数:' + completesCount);
    expect(completesCount).toBe(completes);
  });

  test('切换Active状态', () => {
    let todoFooter = todoIndex.find('TodoFooter'),
        filterElement = todoFooter.find('a').at(0);
    let todoList = todoIndex.find('TodoList').find('li');
    filterElement.simulate('click');
    let count = 0;
    for(let i = 0; i < todoList.nodes.length; i++){
      if(Object.getOwnPropertyNames(todoList.nodes[i]).length){
        count++;
      }
    }
    let todos = todoFilterStore.filterTodos.data();
    expect(todos.length).toBe(count);
  });
  test('切换Complete状态', () => {
    let todoFooter = todoIndex.find('TodoFooter'),
      filterElement = todoFooter.find('a').at(1);
    let todoList = todoIndex.find('TodoList').find('li');
    filterElement.simulate('click');
    let count = 0;
    for(let i = 0; i < todoList.nodes.length; i++){
      console.log(todoList.nodes[i]);
      if(Object.getOwnPropertyNames(todoList.nodes[i]).length){
        count++;
      }
    }
    let todos = todoFilterStore.filterTodos.data();
    expect(todos.length).toBe(count);
  });
  test('切换All状态', () => {
    let todoFooter = todoIndex.find('TodoFooter'),
      filterElement = todoFooter.find('a').at(0);
    filterElement.simulate('click');
    expect(todos.length).toBe(todoNames.length);
  });
});

