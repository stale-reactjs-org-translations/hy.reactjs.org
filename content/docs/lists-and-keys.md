---
id: lists-and-keys
title: Ցուցակներ և բանալիներ
permalink: docs/lists-and-keys.html
prev: conditional-rendering.html
next: forms.html
---

Նախ վերհիշենք, թե ինչպես ենք աշխատում ցուցակների հետ JavaScript-ում։

Ստորև բերված կոդում, `թվեր`-ի զանգված վերցնելու և նրանց արժեքները կրկնապատկելու համար, մենք օգտագործում ենք [`map()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)<sub>eng</sub> ֆունկցիան։ Այնուհետև, `doubled` փոփոխականին վերագրում ենք այն, ինչ վերադարձվել է `map()` ֆունկցիայի կողմից և տպում ենք այն։

```javascript{2}
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map((number) => number * 2);
console.log(doubled);
```

Այս կոդը կոնսոլում տպում է `[2, 4, 6, 8, 10]`։

React-ում զանգվածների փոխակերպումը [էլեմենտների](/docs/rendering-elements.html) ցուցակների կատարվում է նման եղանակով։

### Մի քանի կոմպոնենտների արտապաատկերում {#rendering-multiple-components}

Դուք կարող եք ստեղծել էլեմենտների հավաքածուներ և օգտագործելով ձևավոր փակագծերը `{}`\` [ներդնել դրանք JSX-ի մեջ](/docs/introducing-jsx.html#embedding-expressions-in-jsx)։

Ստորև, մենք, օգտագործելով JavaScript-ի [`map()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)<sub>eng</sub> ֆունկցիան, անցնում ենք թվերի զանգվածի վրայով և զանգվածի յուրաքանչյուր էլեմենտի համար վերադարձնում ենք `<li>` էլեմենտ։ Եվ, ի վերջո, ստացված էլեմենտների զանգվածը վերագրում ենք `listItems`-ին։

```javascript{2-4}
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  <li>{number}</li>
);
```

Մենք ողջ `listItems` զանգվածը ներդնում ենք `<ul>` էլեմենտի մեջ և [արտապատկերում այն DOM-ում](/docs/rendering-elements.html#rendering-an-element-into-the-dom)։

```javascript{2}
ReactDOM.render(
  <ul>{listItems}</ul>,
  document.getElementById('root')
);
```

[**Փորձել CodePen-ում**](https://codepen.io/gaearon/pen/GjPyQr?editors=0011)

Այս կոդը ցույց է տալիս 1-ից 5-ը թվերի ցուցակ։

### Հասարակ ցուցակ-կոմպոնենտ {#basic-list-component}

Սովորաբար դուք արտապատկերելու եք ցուցակները ինչ-որ [կոմպոնենտի](/docs/components-and-props.html) մեջ։

Մենք կարող ենք վերամշակել նախորդ օրինակը և ստանալ կոմպոնենտ, որը ընդունում է թվերի զանգված և որպես ելքային արժեք վերադարձնում է էլեմենտների ցուցակ։

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

Երբ այս կոդը աշխատեցնեք, դուք կստանաք զգուշացում այն մասին, որ ցուցակի էլեմենտները պետք է ունենան բանալիներ։ «Բանալին» դա հատուկ տողային ատրիբուտ է, որը պետք է նշեք էլեմենտների ցուցակ ստեղծելիս։ Թե ինչի համար է դա կարևոր, կքննարկենք հաջորդ բաժնում։

Եկեք `numbers.map()`-ի մեջ մեր զանգվածի էլեմենտներին փոխանցենք `key` և ուղղենք բաց թողնված բանալու խնդիրը։

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

Բանալիները React-ին օգնում են տարբերել փոփոխված, ավելացված կամ հեռացված էլեմենտները։ Բանալիները պետք է փոխանցել էլեմենտներին ՝ նրանց կայուն տարբերակիչ տալու համար։

```js{3}
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  <li key={number.toString()}>
    {number}
  </li>
);
```

Բանալի ընտրելու լավագույն տարբերակը դա այնպիսի տողային փոփոխականի օգտագործումն է, որը միարժեք կտարբերակի ցուցակի տարրին նրա հարևաններից։ Շատ հաճախ դուք կօգտագործեք ձեր տվյալների `ID`-ները, որպես բանալի։

```js{2}
const todoItems = todos.map((todo) =>
  <li key={todo.id}>
    {todo.text}
  </li>
);
```

Եթե դուք չունեք հաստատուն ID-ներ էլեմենտների արտապատկերման համար, ապա որպես վերջին միջոց կարող եք օգտագործել էլեմենտի ինդեքսը։ 

```js{2,3}
const todoItems = todos.map((todo, index) =>
  // Սա արեք միայն այն դեպքում, երբ էլեմենտները չունեն հաստատուն ID-ներ
  <li key={index}>
    {todo.text}
  </li>
);
```

Խորհուրդ չենք տալիս օգտագործել ինդեքսները որպես բանալիներ այն դեպքում երբ էլեմենտների դասավորությունը կարող է փոխվել։ Դա կարող է բացասաբար ազդել արտադրողականության վրա և կոմպոնենտի վիճակի հետ կապված խնդիրներ հարուցել։
Կարդացեք Ռոբին Պոկորնեի հոդվածը\` [ինդեքսները, որպես բանալի օգտագործելու բացասական ազդեցության խորը բացատրության](https://medium.com/@robinpokorny/index-as-a-key-is-an-anti-pattern-e0349aece318)<sub>eng</sub> մասին։ Եթե դուք որոշեք ցուցակի էլեմենտներին բացահայտորեն բանալի չփոխանցել, ապա React-ը որպես բանալի լռելյայն կօգտագործի ինդեքսները։

Եթե հետաքրքրված եք սովորել ավելին, ապա [այստեղ կգտնեք խորը բացատրություն, թե ինչու են բանալիները կարևոր](/docs/reconciliation.html#recursing-on-children)։

### Կոմպոնենտների տարանջատումը բանալիներով {#extracting-components-with-keys}

Բանալիների կիրառությունը իմաստ ունի միայն զանգվածի կոնտեքստում։

Օրինակ, եթե [տարանջատեք](/docs/components-and-props.html#extracting-components) `ListItem` կոմպոնենտը, ապա դուք պետք է բանալին փոխանցեք `<ListItem />` կոմպոնենտներին, ոչ թե `<ListItem />`-ի միջ `<li>` էլեմենտին։

**Բանալու սխալ օգտագործման օրինակ.**

```javascript{4,5,14,15}
function ListItem(props) {
  const value = props.value;
  return (
    // Սխալ. կարիք չկա նշել բանալին այստեղ.
    <li key={value.toString()}>
      {value}
    </li>
  );
}

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    // Սխալ. բանալին պետք է նշված լինի այստեղ.
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

**Բանալու ճիշտ օգտագործոման օրինակ.**

```javascript{2,3,9,10}
function ListItem(props) {
  // Ճիշտ. այստեղ կարիք չկա նշել բանալին.
  return <li>{props.value}</li>;
}

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
<<<<<<< HEAD
    // Ճիշտ. բանալին պետք է նշված լինի զանգվածի մեջ.
    <ListItem key={number.toString()}
              value={number} />
=======
    // Correct! Key should be specified inside the array.
    <ListItem key={number.toString()} value={number} />
>>>>>>> 0bb0303fb704147452a568472e968993f0729c28
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

Որպես կանոն\` `map()`-ի կանչի մեջ էլեմենտները բանալիների կարիք ունեն։

### Բանալիները պետք է լինեն եզակի միայն հարևանների շրջանում {#keys-must-only-be-unique-among-siblings}

<<<<<<< HEAD
Բանալիները, որոնք օգտագործվում են զանգվածի մեջ, պետք է լինեն ունիկալ հարևան էլեմենտների մեջ։ Սակայն, նրանք պետք չէ որ լինեն գլոբալ ունիկալ։ Մենք կարող ենք օգտագործել նույն բանալիները երբ ներկայացնում ենք երկու տարբեր զանգվածներ\`
=======
Keys used within arrays should be unique among their siblings. However, they don't need to be globally unique. We can use the same keys when we produce two different arrays:
>>>>>>> 0bb0303fb704147452a568472e968993f0729c28

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
  {id: 1, title: 'Ողջույն աշխարհ', content: 'Բարի գալուստ React-ի ուսուցում։'},
  {id: 2, title: 'Տեղադրում', content: 'Դուք կարող եք React-ը տեղադրել npm-ից։'}
];
ReactDOM.render(
  <Blog posts={posts} />,
  document.getElementById('root')
);
```

[**Փորձել CodePen-ում**](https://codepen.io/gaearon/pen/NRZYGN?editors=0010)

Բանալիները React-ի համար ծառայում են որպես հուշում, սակայն նրանք չեն փոխանցվում ձեր կոմպոնենտին։ Եթե դուք նույն արժեքի կարիքն ունեք ձեր կոմպոնենտում, ապա ուղղակի փոխանցեք այն որպես հատկություն մեկ այլ անվան տակ.

```js{3,4}
const content = posts.map((post) =>
  <Post
    key={post.id}
    id={post.id}
    title={post.title} />
);
```

Վերոնշյալ օրինակում `Post` կոմպոնենտը կարող է կարդալ `props.id`-ին, բայց ոչ `props.key`-ին։

### Ներդրված map() JSX-ում {#embedding-map-in-jsx}

Մինչ այս օրինակներում մենք հայտարարում էինք առանձին `listItems` փոփոխական և տեղադրում այն JSX-ում\`

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

JSX-ը թույլ է տալիս ձևավոր փակագծերի մեջ [ներդնել ցանկացած արտահայտություն](/docs/introducing-jsx.html#embedding-expressions-in-jsx)<sub>eng</sub>, այսպիսով մենք կարող ենք տեղադրել `map()`-ից ստացած արդյունքը\`

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


Երբեմն սա բերում է ավելի մաքուր կոդի, սակայն այս ոճը նույնպես կարող է չարաշահվել։ Ինչպես JavaScript-ում, այստեղ նույնպես ձեր հայեցողության տակ է որոշելը\` տարանջատել փոփոխականը ավելի ընթեռնելի դարձնելու համար, թե\` ոչ։ Մտապահեք, որ եթե map()-ի մարմինը չափազանց ներդրված է, ապա գուցե կարիք կա [կոմպոնենտը տարանջատելու](/docs/components-and-props.html#extracting-components)։
