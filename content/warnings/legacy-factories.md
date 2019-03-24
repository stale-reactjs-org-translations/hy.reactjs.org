---
title: Ռեակտ Էլեմենտ Factory-ներ and JSX զգուշացումներ
layout: single
permalink: warnings/legacy-factories.html
---

Դուք հավանաբար եկել եք այստեղ, քանի որ Ձեր կոդը կանչում է կոմպոնենտ ինչպես պարզ ֆունկցիայի կանչ։ Սա այժմ առարկված(deprecated) է։

```javascript
var MyComponent = require('MyComponent');

function render() {
  return MyComponent({ foo: 'bar' });  // ԶԳՈւՇԱՑՈւՄ
}
```

## JSX {#jsx}

Ռեակտ կոմպոնենտը այլևս չի կարող ուղղակիորեն կանչվել այսպես։ Փոխարենը [կարող եք օգտագործել JSX](/docs/jsx-in-depth.html)։

```javascript
var React = require('react');
var MyComponent = require('MyComponent');

function render() {
  return <MyComponent foo="bar" />;
}
```

## Առանց JSX {#without-jsx}

Եթե Դուք չեք ցանկանում կամ չեք կարող օգտագործել JSX, ապա պետք է փաթաթեք կոմպոնենտը factory-ի մեջ, մինչև կանչելը։

```javascript
var React = require('react');
var MyComponent = React.createFactory(require('MyComponent'));

function render() {
  return MyComponent({ foo: 'bar' });
}
```

Սա հեշտ բարելավման ուղղի է, եթե ունեք բազում առկա ֆունկցիաների կանչեր։

## Դինամիկ կոմպոնենտներ առանց JSX {#dynamic-components-without-jsx}

Եթե Դուք ստանաք կլաս-կոմպոնենտ դինամից աղբյուրից, այդժամ հնարավոր է կարիք չլինի ստեղծել factory որը անմիջապես կկանչեք։ Փոխարենը կարող եք ստեղծել Ձեր տարրը տողում։

```javascript
var React = require('react');

function render(MyComponent) {
  return React.createElement(MyComponent, { foo: 'bar' });
}
```

## In Depth {#in-depth}

[Կարդացեք ավելին թե ինչու ենք մենք կատարել այս փոփոխությունները.](https://gist.github.com/sebmarkbage/d7bce729f38730399d28)
