---
id: components-and-props
title: Կոմպոնենտներ
permalink: docs/components-and-props.html
redirect_from:
  - "docs/reusable-components.html"
  - "docs/reusable-components-zh-CN.html"
  - "docs/transferring-props.html"
  - "docs/transferring-props-it-IT.html"
  - "docs/transferring-props-ja-JP.html"
  - "docs/transferring-props-ko-KR.html"
  - "docs/transferring-props-zh-CN.html"
  - "tips/props-in-getInitialState-as-anti-pattern.html"
  - "tips/communicate-between-components.html"
prev: rendering-elements.html
next: state-and-lifecycle.html
---

Կոմպոնենտները թույլ են տալիս մասնատել UI-ը միմյանցից անկախ, բազմակի օգտագործման ենթակա կտորների և մտածել ամեն կտորի մասին առանձին։ Այս էջը կծանոթացնի կոմպոնենտների գաղափարի հետ։ Դուք կարող եք գտնել կոմպենտների API-ի հղումների մանրամասն նկարագիր [այստեղ](/docs/react-component.html)։

Գաղափարապես, կոմպոնենտները նման են JavaScript ֆունկցիաների։ Դրանք ընդունում են ցանկացած մուտքային արժեքներ (որոնք կոչվում են «props») և վերադարձնում են React էլեմենտներ, որոնք նկարագրում են այն, թե ինչ է հայտնվելու էկրանին։

## Ֆունկցիա և Կլաս Կոմպոնենտեր {#function-and-class-components}

Հեշտագույն եղանակը կոմպոնենտ հայտարարելու դա JavaScript ֆունկցիա գրելն է.

```js
function Welcome(props) {
  return <h1>Ողջույն, {props.name}</h1>;
}
```

Այս ֆունկցիան վավեր React կոմպոնենտ է, որովհետև այն ընդունում է տվյալները օբյեկտով, որպես մեկ արգումենտ(«props») և վերադարձնում է վավեր React էլեմենտ։ Այսպիսի կոմպոնենտները մենք անվանում ենք «ֆունկցիա-կոմպոնենտ», որովհետև նրանք բառացիորեն JavaScript ֆունկցիաներ են։

Կոմպոնենտ հայտարարելու համար դուք նաև կարող եք օգտագործել [ES6 կլաս](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes)<sub>`eng`<sub>։

```js
class Welcome extends React.Component {
  render() {
    return <h1>Ողջույն, {this.props.name}</h1>;
  }
}
```

Վերը նշված երկու կոմպոնենտները React-ի տեսանկյունից համարժեք են։

Կլասները ունեն մի քանի ավել հնարավորություններ, որոնց մասին մենք կխոսենք [հաջորդ բաժնում](/docs/state-and-lifecycle.html)։ Մինչ այդ, մենք կօգտագործենք ֆունկցիա-կոմպոնենտներ նրանց հակիճության համար։

## Կոմպոնենտի Արտապատկերում {#rendering-a-component}

Նախկինում, մենք միայն հանդիպել ենք React էլեմենտներ, որոնք իրենցից ներկայացնում էին DOM թեգեր.

```js
const element = <div />;
```

Ինչևէ, էլեմենտները կարող են իրենցից ներկայացնել օգտագործողի կողմից հայտարաված կոմպոնենտներ.

```js
const element = <Welcome name="Անահիտ»" />;
```

Երբ React-ը տեսնում է էլեմենտ, որը իրենից ներկայացնում է օգտագործողի կողմից հայտարարված կոմպոնենտ, ապա փոխանցում է JSX ատրիբուտներ այդ կոմպոնենտին, որպես մեկ օբյեկտ. մենք անվանում ենք այդ օբյեկտը «props»։

Օրինակ, այս կոդը կարտապատկերի «Ողջույն, Անահիտ»

```js{1,5}
function Welcome(props) {
  return <h1>Ողջույն, {props.name}</h1>;
}

const element = <Welcome name="Անահիտ»" />;
ReactDOM.render(
  element,
  document.getElementById('root')
);
```

[Փորձել CodePen-ում](codepen://components-and-props/rendering-a-component)

Եկեք իմի բերենք այն ինչ տեղի է ունենում այս օրինակում.

1) Մենք կանչում ենք `ReactDOM.render()`-ը `<Welcome name="Անահիտ" />` էլեմենտով։
2) React-ը կանչում է `Welcome` կոմպոնենտը `{name: 'Անահիտ'}` օբյեկտով, որպես props։
3) Մեր `Welcome` կոմպոնենտը, որպես արդյունք վերադարձնում է `<h1>Ողջույն, Անահիտ</h1>` էլեմենտը։
4) React DOM-ը արդյունավետորեն թարմացնում է DOM-ը, որպեսզի ստանա `<h1>Ողջույն, Անահիտ</h1>`։

>**Նշում:** Միշտ կոմպոնենտի անունը սկսիր մեծատառով։
>
>React-ը փոքրատարով սկսվող կոմպոնենտներին դիտարկում է, որպես DOM թեգեր։ Օրինակ, `<div />`-ը իրենից ներկայացնում է HTML-ի div թեգը, իսկ `<Welcome />`-ը արդեն կոմպոնենտ է, որը պետք է լինի տեսանելիության տիրույթում։
>
>Այս պայմանավորվածության պատճառներին ավելի լավ ծանոթանալու համար կարդացեք [Խորացված JSX](/docs/jsx-in-depth.html#user-defined-components-must-be-capitalized).

## Կոմպոնենտների Կոմպոզիցիան {#composing-components}

Կոմպոնենտները կարող են հղվել ուրիշ կոմպոնենտների վրա իրենց ելքային արժեքում։ Դա թույլ է տալիս մեզ օգտագործել նույն կոմպոնենտ-աբստրակցիան հավելվածի տարբեր մակարդակներում։ button, form, dialog, screen. React հավելվածներում սրանք բոլորը, հիմնականում հանդես են գալիս, որպես կոմպոնենտ։

Օրինակ, մենք կարող ենք ստեղծել `App` կոմպոնենտ, որը կարտապատկերի `Welcome`-ը բազմում անգամներ։

```js{8-10}
function Welcome(props) {
  return <h1>Ողջույն, {props.name}</h1>;
}

function App() {
  return (
    <div>
      <Welcome name="Պողոս" />
      <Welcome name="Պետրոս" />
      <Welcome name="Մարտիրոս" />
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```

[Փորձել CodePen-ում](codepen://components-and-props/composing-components)

Ինչպես կանոն, նոր React հավելվածները ունեն միակ `App` կոմպոնենտ ամենավերևում։ Այնուամենայնիվ, եթե դուք փորձեք ինտեգրել React-ը արդեն գոյություն ունեցող հավելվածի մեջ, դուք կարող եք սկսել փոքր կոմպոնենտներից, ինչպիսին է `Button`-ը և հիրարխիայով աստիճանաբար շարժվել դեպի «վերև»։

## Կոմպոնենտների տարանջատում {#extracting-components}

Մի վախեցեք կոմպոնենտները ավելի փոքր կոմպոնենտների բաժանելուց։

Օրինակ, դիտարկենք այս `Comment` կոմպոնենտը:

```js
function Comment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
        <img className="Avatar"
          src={props.author.avatarUrl}
          alt={props.author.name}
        />
        <div className="UserInfo-name">
          {props.author.name}
        </div>
      </div>
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
```

[Փորձել CodePen-ում](codepen://components-and-props/extracting-components)

Այն ընդունում է `author` (օբյեկտ է), `text` (տող է) և `date` (date տիպի է), որպես props և նկարագրում է մեկնաբանություն (comment) սոցիալական կայքում։

Այս կոմպոնենտը կարող լինել անհարմար փոփոխությունների համար, նրա ներդրվածությունների պատճառով։ ԵՎ, նայև, բարդ է օգտագործել նրա առանձին կտորները։ Եկեք նրանից տարանջատենք մի քանի կոմպոնենտներ։

Նախ, մենք կտարանջատենք `Avatar`-ը.

```js{3-6}
function Avatar(props) {
  return (
    <img className="Avatar"
      src={props.user.avatarUrl}
      alt={props.user.name}
    />
  );
}
```

`Avatar`-ը կարիք չունի իմանալու, որ արտապատկերվում է `Comment`-ի մեջ։ Դրա համար նրա prop-ին տվել ենք ավելի ընհանուր անուն\` `user`, փոխարենը `author`-ի։

Մենք խորհուրդ ենք տալիս անվանել prop-ները component-ի տեսանկյունից, ոչ թե կոնտեքստի, որում այն օգտագործվում է։

Այժմ, մենք կարող ենք մի փոքր պարզեցնել `Comment`-ը։
We can now simplify `Comment` a tiny bit:

```js{5}
function Comment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
        <Avatar user={props.author} />
        <div className="UserInfo-name">
          {props.author.name}
        </div>
      </div>
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
```

Հաջորդիվ, մենք կտարանջատենք `UserInfo` կոմպոնենտը, որը օգտագործողի անունից հետո արտապատկերում է `Avatar`։

```js{3-8}
function UserInfo(props) {
  return (
    <div className="UserInfo">
      <Avatar user={props.user} />
      <div className="UserInfo-name">
        {props.user.name}
      </div>
    </div>
  );
}
```

Դա թույլ է տալիս մեզ էլ ավելի պարզեցնել `Comment` կոմպոնենտը։

```js{4}
function Comment(props) {
  return (
    <div className="Comment">
      <UserInfo user={props.author} />
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
```

[Փորձել CodePen-ում](codepen://components-and-props/extracting-components-continued)

Սկզբում, կոմպոնենտների տարանջատումը, կարող է թվալ «անշնորհակալ» գործ, բայց բազմակի օգտագերծվող կոմպոնենտների պալիտրա ունենալը կարդարացնի իրեն մեծ հավելվածներում։ Հիմնական սկզբունքն այն է, որ եթե ձեր UI-ի մի մասը օգտագործվում է բազմակի անգամներ (`Button`, `Panel`, `Avatar`) կամ բավականին բարդ է ինքն իրենով (`App`, `FeedStory`, `Comment`), ապա այն լավ թեկնածու է, որպեսի դառնա բազմակի օգտագործման կոմպոնենտ։

## Prop-ները Read-Only են {#props-are-read-only}

Անկախ ինչպես կհայտարարեք կոմպոնենտը, [որպես ֆունկցիա թե կլաս](#function-and-class-components), այն երբեք չպետք է փոփոխի իր prop-ները։

Դիտարկենք այս `sum` ֆունկցիան.

```js
function sum(a, b) {
  return a + b;
}
```

Այսպիսի ֆունկցիաները կոչվում են [«մաքուր»](https://en.wikipedia.org/wiki/Pure_function)<sub>`eng`</sub>, որովհետև նրանք չեն փորձում փոխել իրենց մուտքային արժեքները և նույն մուտքային արժեքների դեպքում միշտ վերադարևնում են նույն արդյունքը։

Ի հակադրություն դրան, այս ֆունկցիան «մաքուր» չէ, որովհետև այն փոխում է իր մուտքային արժեքները.

```js
function withdraw(account, amount) {
  account.total -= amount;
}
```

React-ը բավականին ճկուն է, բայց այն ունի մեկ խիստ կանոն.

**Բոլոր React կոմպոնենտները իրենց prop-ների նկատմամբ պետք է իրենց դրսեվորեն, որպես մաքուր ֆունկցիաներ**

Իհարկե, հավելվածի UI-ը դինամիկ է և փոխվում է ժամանակի ընթացքում։ [Հաջորդ բաժնում](/docs/state-and-lifecycle.html) մենք կներկայացնենք նոր կոնցեպտ - «վիճակ»(state). State-ը թույլ է տալիս React կոմպոնենտին փոխել իր ելքային արժեքները ժամանակի ընթացքում ի պատասխան օգտագործողի գործողություններին, ցանցային պատասխաններին և այլն\` չխախտելով այս կանոնը։
