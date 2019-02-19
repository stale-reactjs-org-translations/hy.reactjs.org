---
id: lists-and-keys
title: Ցուցակներ և Բանալիներ
permalink: docs/lists-and-keys.html
prev: conditional-rendering.html
next: forms.html
---

Առաջին հերթին եկեք տեսնենք թե ինչպես եք JavaScript-ում ստանում ցուցակներ։

Ստորև բերված կոդի օրինակում մենք օգտագործում ենք [`map()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) ֆունկցիան, որպեսզի վերցնենք `թվեր`-ի զանգված եվ կրկնապատկենք նրանց արժեքները, այնուհետև `doubled` փոփոխականին վերագրում ենք նոր զանգված ՝ վերադարձված `map()` ֆունկցիայի կողմից և տպում ենք այն։

```javascript{2}
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map((number) => number * 2);
console.log(doubled);
```

Այս կոդը կտպի `[2, 4, 6, 8, 10]` կոնսոլում։

React-ում զանգվածների փոփոխությունները [էլեմենտների](/docs/rendering-elements.html) ցուցակների գրեթե նունն են։

### Բազմաթիվ Կոմպոնենտների Պատկերումը {#rendering-multiple-components}

Դուք կարող եք ստեղծել էլեմենտների հավաքածուներ և [ներդնել նրանց JSX-ի մեջ](/docs/introducing-jsx.html#embedding-expressions-in-jsx) օգտագործելով ձևավոր փակագծերը `{}`։

Ստորև օրինակում մենք օգտագործելով JavaScript-ի [`map()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) ֆունկցիան անցնում ենք թվերի զանգվածի վրայով և յուրաքանչյուր զանգվածի էլեմենտի համար վերադարձնում `<li>` էլեմենտ։ ԵՎ ի վերջո ստացված էլեմենտների զանգվածը վերագրում ենք `listItems`-ին։

```javascript{2-4}
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  <li>{number}</li>
);
```

Մենք ողջ `listItems` զանգվածը ներդնում ենք `<ul>` էլեմենտ-ի մեջ և [render it to the DOM](/docs/rendering-elements.html#rendering-an-element-into-the-dom). 

```javascript{2}
ReactDOM.render(
  <ul>{listItems}</ul>,
  document.getElementById('root')
);
```

[**Փորձել CodePen-ում**](https://codepen.io/gaearon/pen/GjPyQr?editors=0011)

Այս կոդը ցույց է տալիս 1-ից 5-ը թվերի ցուցակ։

### Հիմնական Ցուցակ Կոմպոնենտ {#basic-list-component}

Սովորաբար դուք խատկերելու եք ցուցակները [կոմպոնենտ](/docs/components-and-props.html)-ի մեջ։

Մենք կարող ենք վերամշակել նախորդ օրինակը և ստանալ կոմպոնենտ, որը ընդունում է թվերի զանգված և որպես ելքային արժեք վերադարձնում էլեմենտների ցուցակ։

```javascript{3-5,7,13}
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li>{number}</li>
  );
  return (
    <ul>{listItems}</ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```

Երբ այս կոդը աշխատացնեք դուք կստանաք զգուշացում այն մասին, որ ցուցակի էլեմենտերը պետք է ունենան բանալիներ։ "Բանալին" դա հատուկ տողային ատրիբուտ է, որը պետք է ներառեք էլեմենտների ցուցակ ստեղծելուց։ Թե ինչի է դա կարևոր ՝ մենք կքննարկենք հաջորդ բաժնում։

Եկեք `numbers.map()`-ի մեջ մեր զանգվածի էլեմենտներին վերագրենք `key` և ուղղենք բաց թողնված բանալու խնդիրը։

```javascript{4}
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li key={number.toString()}>
      {number}
    </li>
  );
  return (
    <ul>{listItems}</ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```

[**Փորձել CodePen-ում**](https://codepen.io/gaearon/pen/jrXYRR?editors=0011)

## Բանալիներ {#keys}

Բանալիները React-ին օգնում են հայտնաբերել փոփոխված, ավելացված կամ հեռացված էլեմենտները։ Բանալիները պետք է փոխանցել զանգվածի միջի էլէմենտներին ՝ նրանց կայուն տարբերակիչ տալու համար.

```js{3}
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  <li key={number.toString()}>
    {number}
  </li>
);
```

Բանալին կցելու լավագույն ձևը  դա տողի փոխանցումն է, որը իր հարևան էլեմենտների մեջ ունիկալ է։ Շատ հաճախ դուք որպես բանալի կկոգտագործեք ձեր տվյալների `ID`-ները. 

```js{2}
const todoItems = todos.map((todo) =>
  <li key={todo.id}>
    {todo.text}
  </li>
);
```

Եթե դուք չունեք հաստատուն ID-ներ էլեմենտների արտապատկերման համար, ապա որպես վերջին միջոց կարող էք օգտագործել էլեմենտի ինդեքսը. 

```js{2,3}
const todoItems = todos.map((todo, index) =>
  // Սա արեք միայն այն դեպքում երբ էլեմենտը չունի հաստատուն ID
  <li key={index}>
    {todo.text}
  </li>
);
```

Խորհուրդ չենք տալիս օգտագործել ինդեքները այն դեպքում երբ էլեմենտների դասավորությունը կարող է փոխվել։ Այն կարող է բացասական ազդեցություն ունենալ արտադրողականության վրա և խնդիրներ առաջացնել կոմպոնենտի վիճակի հետ։
Կարդա Ռոբին Պոկորնեի [ինդեքսները որպես բանալի օգտագործելու բացասական ազդեցությունների խորը բացատրկան ](https://medium.com/@robinpokorny/index-as-a-key-is-an-anti-pattern-e0349aece318) հոդվածը։ Եթե դուք որոշեք բացահայտորեն չփոխանցել բանալին ցուցակի էլեմենտներին, ապա React-ը ըստ նախնականի կօգտակործի ինդեքսները որպես բանալի։

Եթե հետաքրքրված եք սովորել ավելին, ապա [այստեղ կգտնեք խորը բացատրություն, թե ինչու են բանալիները կարևոր։](/docs/reconciliation.html#recursing-on-children)։

### Extracting Components with Keys {#extracting-components-with-keys}

Keys only make sense in the context of the surrounding array.

For example, if you [extract](/docs/components-and-props.html#extracting-components) a `ListItem` component, you should keep the key on the `<ListItem />` elements in the array rather than on the `<li>` element in the `ListItem` itself.

**Example: Incorrect Key Usage**

```javascript{4,5,14,15}
function ListItem(props) {
  const value = props.value;
  return (
    // Wrong! There is no need to specify the key here:
    <li key={value.toString()}>
      {value}
    </li>
  );
}

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    // Wrong! The key should have been specified here:
    <ListItem value={number} />
  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```

**Example: Correct Key Usage**

```javascript{2,3,9,10}
function ListItem(props) {
  // Correct! There is no need to specify the key here:
  return <li>{props.value}</li>;
}

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    // Correct! Key should be specified inside the array.
    <ListItem key={number.toString()}
              value={number} />
  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```

[**Փորձել CodePen-ում**](https://codepen.io/gaearon/pen/ZXeOGM?editors=0010)

A good rule of thumb is that elements inside the `map()` call need keys.

### Keys Must Only Be Unique Among Siblings {#keys-must-only-be-unique-among-siblings}

Keys used within arrays should be unique among their siblings. However they don't need to be globally unique. We can use the same keys when we produce two different arrays:

```js{2,5,11,12,19,21}
function Blog(props) {
  const sidebar = (
    <ul>
      {props.posts.map((post) =>
        <li key={post.id}>
          {post.title}
        </li>
      )}
    </ul>
  );
  const content = props.posts.map((post) =>
    <div key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
    </div>
  );
  return (
    <div>
      {sidebar}
      <hr />
      {content}
    </div>
  );
}

const posts = [
  {id: 1, title: 'Hello World', content: 'Welcome to learning React!'},
  {id: 2, title: 'Installation', content: 'You can install React from npm.'}
];
ReactDOM.render(
  <Blog posts={posts} />,
  document.getElementById('root')
);
```

[**Փորձել CodePen-ում**](https://codepen.io/gaearon/pen/NRZYGN?editors=0010)

Keys serve as a hint to React but they don't get passed to your components. If you need the same value in your component, pass it explicitly as a prop with a different name:

```js{3,4}
const content = posts.map((post) =>
  <Post
    key={post.id}
    id={post.id}
    title={post.title} />
);
```

With the example above, the `Post` component can read `props.id`, but not `props.key`.

### Embedding map() in JSX {#embedding-map-in-jsx}

In the examples above we declared a separate `listItems` variable and included it in JSX:

```js{3-6}
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <ListItem key={number.toString()}
              value={number} />
  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}
```

JSX allows [embedding any expression](/docs/introducing-jsx.html#embedding-expressions-in-jsx) in curly braces so we could inline the `map()` result:

```js{5-8}
function NumberList(props) {
  const numbers = props.numbers;
  return (
    <ul>
      {numbers.map((number) =>
        <ListItem key={number.toString()}
                  value={number} />
      )}
    </ul>
  );
}
```

[**Փորձել CodePen-ում**](https://codepen.io/gaearon/pen/BLvYrB?editors=0010)

Sometimes this results in clearer code, but this style can also be abused. Like in JavaScript, it is up to you to decide whether it is worth extracting a variable for readability. Keep in mind that if the `map()` body is too nested, it might be a good time to [extract a component](/docs/components-and-props.html#extracting-components).
