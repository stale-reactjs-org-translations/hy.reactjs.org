---
title: React Էլեմենտների Factory-ներ և JSX զգուշացումներ
layout: single
permalink: warnings/legacy-factories.html
---

Դուք հավանաբար եկել եք այստեղ, քանի որ ձեր կոդը կանչում է կոմպոնենտն ինչպես ֆունկցիա։ Սա այժմ առարկված(deprecated) է։

```javascript
var MyComponent = require('MyComponent');

function render() {
  return MyComponent({ foo: 'bar' });  // ԶԳՈՒՇԱՑՈՒՄ
}
```

## JSX {#jsx}

React կոմպոնենտներն այլևս չեն կարող ուղղակիորեն կանչվել այսպես։ Փոխարենը [կարող եք օգտագործել JSX](/docs/jsx-in-depth.html)։

```javascript
var React = require('react');
var MyComponent = require('MyComponent');

function render() {
  return <MyComponent foo="bar" />;
}
```

## Առանց JSX {#without-jsx}

Եթե դուք չեք ցանկանում կամ չեք կարող օգտագործել JSX, ապա պետք է փաթաթեք կոմպոնենտը factory-ի մեջ, մինչև կանչելը։

```javascript
var React = require('react');
var MyComponent = React.createFactory(require('MyComponent'));

function render() {
  return MyComponent({ foo: 'bar' });
}
```

Եթե արդեն իսկ ունեք բազում ֆունկցիաների կանչեր, սա հեշտ բարելավման ուղի է։

## Դինամիկ կոմպոնենտներ առանց JSX-ի {#dynamic-components-without-jsx}

Եթե ստանաք կլաս-կոմպոնենտ դինամիկ աղբյուրից, ապա միգուցե կարիք չլինի ստեղծել factory, որին անմիջապես կհղվեք։ Փոխարենը` կարող եք ուղղակիորեն ստեղծել ձեր էլեմենտը։

```javascript
var React = require('react');

function render(MyComponent) {
  return React.createElement(MyComponent, { foo: 'bar' });
}
```

## Խորացված  {#in-depth}

[Կարդացեք ավելին, թե ինչու ենք մենք կատարում այս փոփոխությունները։](https://gist.github.com/sebmarkbage/d7bce729f38730399d28)
