import * as React from 'react';

export function wrapComponent(
    component: React.Component | Function,
    updaters: any[],
    customPropsMapping?: {})
: any;
//定义wrapComponent装饰
export function wrapComponent<P>(updaters: any[], customPropsMapping?: {})
: (<Target extends React.ComponentClass<P>>(target: Target)
    => (Target & React.ComponentClass<P>));

export class Store<P>{
    constructor(props: P);

    updateQueue: object;
    initState(state: object): void;

    dispatch(method: Function): Function;
    dispatch(method: Function, data: any): void;
    dispatch(data: any): void;

    contextDispatch(method: Function): Function;
    contextDispatch(method: Function, data: any): void;
    contextDispatch(data: any): void;

    bindDispatch(method: Function): Function;

    data(method: Function, data: any): any;
    data(method: Function): any;
    data(): any;

    contextData(method: Function, data: any): any;
    contextData(data: any): any;
    contextData(): any;

    getState(): any;
    reset(): void;
}
//dispatch装饰：有参数
export function dispatch(methodName: string): Function
//dispatch装饰：无参数
export function dispatch(
                target: Object,
                propertyKey: string,
                descriptor: TypedPropertyDescriptor<any>): TypedPropertyDescriptor<any>;
//data装饰：有参数
export function data(method?: string): Function;
//data装饰：无参数
export function data(
    target: Object,
    propertyKey: string,
    descriptor: TypedPropertyDescriptor<any>): TypedPropertyDescriptor<any>;
//setData装饰：有参数
export function setData(method?: string): Function;
//setData装饰：无参数
export function setData(
    target: Object,
    propertyKey: string,
    descriptor: TypedPropertyDescriptor<any>): TypedPropertyDescriptor<any>;

export function param(...decorators: string[]): Function;

export type Method = {
    dispatch: 'dispatch',
    data: 'data',
    setData: 'setData',
    contextDispatch: 'contextDispatch',
    contextData: 'contextData'
};

export function flowFrom(...decorators: string[]): Function;
export function stateKey(stateKeyName: string): Function;