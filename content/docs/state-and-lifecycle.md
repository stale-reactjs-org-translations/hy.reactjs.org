---
id: state-and-lifecycle
title: Վիճակ և կյանքի ցիկլ
permalink: docs/state-and-lifecycle.html
redirect_from:
  - "docs/interactivity-and-dynamic-uis.html"
prev: components-and-props.html
next: handling-events.html
---

Այս էջը ներկայացնում է վիճակի(state) և կյանքի ցիկլի(lifecycle) գաղափարը React կոմպոնենտում։ Դուք կարող եք գտնել կոմպոնենտի մանրամասն API հղումն [այստեղ](/docs/react-component.html)։

Դիտարկենք «ժամացույցի» աշխատանքի օրինակը\` նկարագրված [վերջին գլուխներից մեկում](/docs/rendering-elements.html#updating-the-rendered-element)։ [Էլեմենտների արտապատկերում](/docs/rendering-elements.html#rendering-an-element-into-the-dom) գլխում մենք UI-ը թարմացնելու միայն մեկ եղանակ ենք սովորել։ Մենք կանչում ենք `ReactDOM.render()`-ը\` փոփոխելու արտապատկերված ելքային արժեքը.

```js{8-11}
function tick() {
  const element = (
    <div>
      <h1>Ողջույն, աշխարհ</h1>
      <h2>Ժամը {new Date().toLocaleTimeString()}-ն է։</h2>
    </div>
  );
  ReactDOM.render(
    element,
    document.getElementById('root')
  );
}

setInterval(tick, 1000);
```

[Փորձել CodePen-ում](https://codepen.io/gaearon/pen/gwoJZk?editors=0010)

Այս գլխում մենք կսովորենք, թե ինչպես դարձնել `Clock` կոմպոնենտը իսկապես բազմակի օգտագործման ենթակա և ինկապսուլացված։ Այն կտեղադրի իր սեփական Ժամաչափը(timer) և կթարմացնի ինքն իրեն ամեն վայրկյան։

Սկզբում առանձնացնենք ժամանակը ցույց տվող կոմպոնենտը.

```js{3-6,12}
function Clock(props) {
  return (
    <div>
      <h1>Ողջույն, աշխարհ</h1>
      <h2>Ժամը {props.date.toLocaleTimeString()}-ն է։</h2>
    </div>
  );
}

function tick() {
  ReactDOM.render(
    <Clock date={new Date()} />,
    document.getElementById('root')
  );
}

setInterval(tick, 1000);
```

[**Փորձել CodePen-ում**](https://codepen.io/gaearon/pen/dpdoYR?editors=0010)

Այնուամենայնիվ, բաց է թողնված առանցքային պահանջ. այն փաստը, որ `Clock`-ը տեղադրում է ժամաչափ և թարմացնում է UI-ը ամեն վայրկյան, պետք է լինի `Clock`-ի իրականացման տարր։

Լավագույն դեպքում մենք ցանկանում ենք գրել սա մեկ անգամ և ունենալ ինքնաթարմացվող `Clock`.

```js{2}
ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```

Սա իրականացնելու համար մենք կարիք ունենք ավելացնելու state `Clock` կոմպոնենտին։

State-ը նման է props-ին, բայց այն private է և ամբողջությամբ կառավարվում է կոմպոնենտի կողմից։

## Ֆունկցիայի փոխարկումը կլասի {#converting-a-function-to-a-class}

Դուք կարող եք փոխարկել `Clock`-ի նման ֆունկցիա-կոմպոնենտը կլասի հինգ քայլով.

1) Ստեղծել նույն անունով [ES6-կլաս](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes)<sub>`eng`</sub>, որն ընդլայնվում է `React.Component`-ից։
2) Նրանում ավելացնել մեկ դատարկ մեթոդ\` `render()` անունով։
3) Տեղափոխել ֆունկցիայի մարմինը `render()` մեթոդի մեջ։
4) Փոխարինել `props`-ը `this.props`-ով `render()`-ի մարմնում։
5) Ջնջել դատարկ մնացած ֆունկցիան։

```js
class Clock extends React.Component {
  render() {
    return (
      <div>
        <h1>Ողջույն, աշխարհ</h1>
        <h2>Ժամը {this.props.date.toLocaleTimeString()}-ն է։</h2>
      </div>
    );
  }
}
```

[**Փորձել CodePen-ում**](https://codepen.io/gaearon/pen/zKRGpo?editors=0010)

`Clock`-ը այժմ հայտարարված է որպես կլաս, ոչ թե ֆունկցիա։

`render` մեթոդը կկանչվի ամեն անգամ, երբ թարմացում տեղի ունենա, բայց այնքան ժամանակ մինչդեռ մենք արտապատկերում ենք `<Clock />`-ը նույն DOM հանգույցի մեջ, `Clock` կլասի միայն մեկ օրինակ(instance) կօգտագործվի։ Այն թույլ կտա մեզ օգտագործել մի քանի լրացուցիչ հատկություններ, ինչպիսիք են լոկալ state-ը և կյանքի ցիկլի մեթոդները։

## Ավելացնել լոկալ state կլասին {#adding-local-state-to-a-class}

Մենք կտեղափոխենք `date`-ը props-ից state երեք քայլով։

1) Փոխարինել `this.props.date`-ը `this.state.date`-ով `render()` մեթոդում.

```js{6}
class Clock extends React.Component {
  render() {
    return (
      <div>
        <h1>Ողջույն, աշխարհ</h1>
        <h2>Ժամը {this.state.date.toLocaleTimeString()}-ն է։</h2>
      </div>
    );
  }
}
```

2) Ավելացնել [կլասի կոնստրուկտոր](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes#Constructor)<sub>`eng`</sub>, որը կվերագրի նախնական `this.state`-ը։

```js{4}
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  render() {
    return (
      <div>
        <h1>Ողջույն, աշխարհ</h1>
        <h2>Ժամը {this.state.date.toLocaleTimeString()}-ն է։</h2>
      </div>
    );
  }
}
```

Ուշադրություն դարձրեք, թե ինչպես ենք փոխանցում `props`-ը հիմնական կոնստրուկտորին.

```js{2}
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }
```

Կլաս-կոմպոնենտները պետք է միշտ կանչեն հիմնական կոնստրուկտորը `props`-ով։

3) Ջնջել `date` prop-ը `<Clock />` էլեմենտից.

```js{2}
ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```

Փոքր-ինչ ավելի ուշ մենք Ժամաչափի կոդը կվերադարձնենք և կտեղադրենք կոմպոնենտի մեջ։

Արդյունքը նման կլինի սրան.

```js{2-5,11,18}
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  render() {
    return (
      <div>
        <h1>Ողջույն, աշխարհ</h1>
        <h2>Ժամը {this.state.date.toLocaleTimeString()}-ն է։</h2>
      </div>
    );
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```

[**Փորձել CodePen-ում**](https://codepen.io/gaearon/pen/KgQpJd?editors=0010)

Հաջորդիվ, `Clock`-ում մենք կտեղադրենք իր սեփական ժամաչափը, որը կթարմացնի ինքն իրեն ամեն վայրկյան։

## Կյանքի ցիկլի մեթոդների ավելացում կլասում {#adding-lifecycle-methods-to-a-class}

Շատ կոմպոնենտներ ունեցող հավելվածներում, կոմպոնենտների ոչնչացվելուց հետո, շատ կարևոր է նրանց կողմից վերցված ռեսուրսների ազատումը։

Մենք ցանկանում ենք [տեղադրել ժամաչափ](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setInterval)<sub>`eng`</sub>, երբ `Clock`-ը արտապատկերվել է DOM-ում առաջին անգամ։ Սա React-ում կոչվում է «mounting»։

Մենք նաև ցանկանում ենք [ջնջել ժամաչափը](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/clearInterval)<sub>`eng`</sub> հենց որ `Clock`-ի կողմից ստեղծված DOM հանգույցը ջնջվի։ Սա React-ում կոչվում է «unmounting»։

Մենք կարող ենք հայտարարել հատուկ մեթոդներ կլաս-կոմպոնենտում, որպեսզի աշխատեցնենք կոդ կոմպոնենտի «mount»-ի և «unmount»-ի ժամանակ.

```js{7-9,11-13}
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  render() {
    return (
      <div>
        <h1>Ողջույն, աշխարհ</h1>
        <h2>Ժամը {this.state.date.toLocaleTimeString()}-ն է։</h2>
      </div>
    );
  }
}
```

Այս մեթոդները կոչվում են «կյանքի ցիկլի մեթոդներ»։

`componentDidMount()` մեթոդը կանչվում է կոմպոնենտի ելքային արժեքի\` DOM-ում արտապատկերվելուց հետո։ Սա հարմար տեղ է ժամաչափ տեղադրելու համար.

```js{2-5}
  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }
```

Ուշադրություն դարձրեք, թե ինչպես ենք մենք պահում ժամաչափի ID-ն `this`-ում (`this.timerID`)։

Քանի դեռ `this.props`-ը տեղադրված է React-ի կողմից և `this.state`-ը ունի հատուկ նշանակություն, դուք ազատ եք ավելացնելու հավելյալ դաշտեր կլասում ինքնուրույն, երբ կարիք ունեք պահելու ինչ-որ բան, որը կապ չունի տվյալների հոսքի հետ (օրինակ\` ժամաչափի ID-ի նման)։

Մենք կջնջենք ժամաչափը `componentWillUnmount()` կյանքի ցիկլի մեթոդում.

```js{2}
  componentWillUnmount() {
    clearInterval(this.timerID);
  }
```

Վերջապես, մենք կիրականացնենք `tick()` անունով մեթոդ, որին `Clock` կոմպոնենտը կաշխատեցնի ամեն վայրկյան։

Այն կօգտագործի `this.setState()`-ը\` պլանավորելու կոմպոնենտի լոկալ state-ի թարմացումները.

```js{18-22}
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <h1>Ողջույն, աշխարհ</h1>
        <h2>Ժամը {this.state.date.toLocaleTimeString()}-ն է։</h2>
      </div>
    );
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```

[**Փորձել CodePen-ում**](https://codepen.io/gaearon/pen/amqdNA?editors=0010)

Այժմ ժամացույցը թարմանում է ամեն վայրկյան։

Եկեք արագ իմի բերենք այն, թե ինչ է տեղի ունենում և ինչ հերթականությամբ են կանչվում մեթոդները.

1) Երբ `<Clock />`-ը փոխանցվում է `ReactDOM.render()`-ին, React-ը կանչում է `Clock` կոմպոնենտի կոնստրուկտորը։ Քանի որ `Clock`-ը կարիք ունի պատկերելու ընթացիկ ժամը, այն սկզբնարժեքավորում է `this.state`-ը օբյեկտով, որը պարունակում է ընթացիկ ժամը։ Ավելի ուշ մենք կթարմացնենք այս state-ը։
2) Հետո React-ը կանչում է `Clock` կոմպոնենտի `render()` մեթոդը։ Ահա թե ինչպես է React-ն իմանում, թե ինչ պիտի պատկերի էկրանին։ Այնուհետև React-ը թարմացնում է DOM-ը , որպեսզի ստանա `Clock`-ի `render`-ի ելքային արժեքը։
3) Երբ `Clock`-ի ելքային արժեքը ավելացված է DOM-ում, React-ը կանչում է `componentDidMount()` կյանքի ցիկլի մեթոդը։ Դրա ներսում `Clock` կոմպոնենտը հարցնում է զննարկչին ժամաչափ տեղադրելու համար, որպեսզի կանչի կամպոնենտի `tick()` մեթոդը վայրկյանը մեկ։
4) Վայրկյանը մեկ զննարկիչը կանչում է `tick()` մեթոդը։ Դրա ներսում, `Clock` կոմպոնենտը պլանավորում է UI-ի թարմացումը\` կանչելով `setState()` ընթացիկ ժամը պարունակող օբյեկտով։ `setState()`-ի կանչի շնորհիվ React-ը գիտի, որ state-ը փոխվել է և կանչում է `render()` մեթոդը կրկին\` իմանալու համար, թե ինչը պետք է լինի էկրանին։ Այս անգամ, `render()`-ում `this.state.date`-ը կլինի ուրիշ, և այսպիսով, render-ի ելքային արժեքը կներառի թարմացված ժամանակը։ React-ը կթարմացնի DOM-ը համապատասխանաբար։
5) Եթե `Clock` կոմպոնենտը երբևիցե ջնջվի DOM-ից, React-ը կկանչի `componentWillUnmount()` կյանքի ցիկլի մեթոդը, որի հետևանքով ժամաչափը կկանգնի։

## State-ի ճիշտ օգտագործում {#using-state-correctly}

Կա երեք բան `setState()`-ի մասին, որ պետք է իմանալ։

### Մի փոփոխեք state-ը անմիջականորեն {#do-not-modify-state-directly}

Օրինակ, սա չի վերա-արտապատկերի կոմպոնենտը.

```js
// Սխալ
this.state.comment = 'Ողջույն';
```

Փոխարենը\` օգտագործեք `setState()`.

```js
// Ճիշտ
this.setState({comment: 'Ողջույն'});
```

`this.state`-ին վերագրում կարող եք կատարել միայն կոնստրուկտորում։

### State-ը կարող է թարմանալ ասինխրոն {#state-updates-may-be-asynchronous}

React-ը կարող է խմբավորել մի քանի `setState()` կանչեր մեկ թարմացման մեջ արտադրողականության համար։

Քանի որ `this.props`-ը և `this.state`-ը կարող են թարմացված լինել ասինխրոն, դուք չպետք է հիմնվեք նրանց արժեքների վրա\` հաջորդ state-ը հաշվելու համար։

Օրինակ, այս կոդը կարող է ճիշտ չթարմացնել counter-ը.

```js
// Սխալ
this.setState({
  counter: this.state.counter + this.props.increment,
});
```

Սա ֆիքսելու համար օգտագործեք `setState()`-ի երկրորդ ձևը, որն ընդունում է ֆունկցիա օբյեկտի փոխարեն։ Այս ֆունկցիան կստանա նախորդ state-ը որպես առաջին արգումենտ և թարմացման պահի props-ը, որպես երկրորդ արգումենտ.

```js
// Ճիշտ
this.setState((state, props) => ({
  counter: state.counter + props.increment
}));
```

Վերը մենք օգտագործում ենք [սլաք-ֆունկցիա](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/Arrow_functions)<sub>`eng`</sub>, բայց այն աշխատում է նաև սովորական ֆունկցիաների հետ.

```js
// Ճիշտ
this.setState(function(state, props) {
  return {
    counter: state.counter + props.increment
  };
});
```

### State-ի թարմացումները միավորվում են {#state-updates-are-merged}

Երբ դուք կանչում եք `setState()`, React-ը միավորում է ձեր տրամադրած օբյեկտը ընթացիկ state-ի հետ։

Օրինակ, ձեր state-ը կարող է պարունակել մի քանի իրարից անկախ փոփոխականներ.

```js{4,5}
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      comments: []
    };
  }
```

Այնուհետ, դուք կարող եք թարմացնել նրանց իրարից անկախ առանձին `setState()` կանչերով.

```js{4,10}
  componentDidMount() {
    fetchPosts().then(response => {
      this.setState({
        posts: response.posts
      });
    });

    fetchComments().then(response => {
      this.setState({
        comments: response.comments
      });
    });
  }
```

Միավորումը մակերեսային է, այսպիսով\` `this.setState({comments})`-ը թողնում է `this.state.posts`-ին «անվնաս», բայց ամբողջությամբ փոխարինում է `this.state.comments`-ը։

## Տվյալները հոսում են ներքև {#the-data-flows-down}

Ո'չ ծնող, ո'չ զավակ կոմպոնենտները չեն կարող իմանալ, արդյո՞ք տվյալ կոմպոնենտը վիճակով(stateful) է կամ վիճակազուրկ(stateless), և նրանց չպետք է հետաքրքրի այն, թե դա հայտարարված է որպես ֆունկցիա, թե որպես կլաս։

Ահա թե ինչու state-ը հաճախ անվանվում է լոկալ կամ ինկապսուլացված։ Այն հասանելի չէ ուրիշ ոչ մի կոմպոնենտից, բացի այն մեկից, որին պատկանում է և որը տեղադրել է իրեն։

Կոմպոնենտը կարող է փոխանցել իր state-ը ներքև, որպես props, իր զավակ կոմպոնենտներին.

```js
<<<<<<< HEAD
<h2>Ժամը {this.state.date.toLocaleTimeString()}-ն է։</h2>
```

Սա նաև աշխատում է օգտագործողի կողմից հայտարարված կոմպոնենտների համար.

```js
=======
>>>>>>> 0bb0303fb704147452a568472e968993f0729c28
<FormattedDate date={this.state.date} />
```

`FormattedDate` կոմպոնենտը կստանա `date`-ը իր props-ում և չի իմանա\` այն եկել էր `Clock`-ի state-ից, `Clock`-ի props-ից, թե գրված էր ձեռքով.

```js
function FormattedDate(props) {
  return <h2>Ժամը {props.date.toLocaleTimeString()}-ն է։</h2>;
}
```

[**Փորձել CodePen-ում**](https://codepen.io/gaearon/pen/zKRqNB?editors=0010)

Սա սովորաբար կոչվում է «վերևից-ներքև» կամ «միակողմանի» տվյալների հոսք։ Ցանկացած state միշտ պատկանում է որևէ սպեցիֆիկ կոմպոնենտի, և ցանկացած տվյալ կամ UI ստացված այդ state-ից կարող է ազդել միայն ծառում դրանից «ներքև» գտնվող կոմպոնենտների վրա։

Եթե դուք պատկերացնեք կոմպոնենտների ծառը որպես prop-երի ջրվեժ, ապա ամեն կոմպոնենտի state նման է լրացուցիչ ջրի աղբյուրի, որը միանում է դրան կամայական կետում, բայց նաև հոսում է ներքև։

Որպեսզի ցույց տանք, որ բոլոր կոմպոնենտները իսկապես մեկուսացված են, մենք կարող ենք ստեղծել `App` կոմպոնենտ, որը կարտապատկերի երեք `<Clock>`։

```js{4-6}
function App() {
  return (
    <div>
      <Clock />
      <Clock />
      <Clock />
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```

[**Փորձել CodePen-ում**](https://codepen.io/gaearon/pen/vXdGmd?editors=0010)

Ամեն `Clock`-ում տեղադրված է իր սեփական ժամաչափը և թարմացվում է անկախ կերպով։

React հավելվածներում կոմպոնենտի վիճակով կամ առանց վիճակի լինելը համարվում է կոմպոնենտի իրականացման տարր, որը կարող է փոխվել ժամանակի ընթացքում։ Դուք կարող եք օգտագործել առանց վիճակի կոմպոնենտներ վիճակով կոմպոնենտի ներսում և հակառակը։
