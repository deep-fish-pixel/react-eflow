/**
 * Created by mawei on 17/8/11.
 */
import React, {Component} from 'react'
import {shallow, mount} from 'enzyme';
import {TodoStore} from './todo/store/TodoStore';

describe('测试 TODO: TodoStore', () => {
  var store = new TodoStore();
  store.addTodo('11');
  store.addTodo('22');

  test(`创建2个任务`, () => {
    const todos = store.todos.data();
    expect(todos.length)
      .toBe(2);

  });


});

