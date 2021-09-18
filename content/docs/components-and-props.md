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

Կոմպոնենտները թույլ են տալիս մասնատել UI-ը միմյանցից անկախ, բազմակի օգտագործման ենթակա կտորների և մտածել ամեն կտորի մասին առանձին։ Այս էջը Ձեզ կծանոթացնի կոմպոնենտների գաղափարի հետ։ Դուք կարող եք գտնել կոմպենտների API-ի հղումների մանրամասն նկարագիրն [այստեղ](/docs/react-component.html)։

Գաղափարապես, կոմպոնենտները նման են JavaScript ֆունկցիաներին։ Դրանք ընդունում են կամայական մուտքային արժեքներ (որոնք կոչվում են «props») և վերադարձնում են React էլեմենտներ, որոնք նկարագրում են այն, թե ինչ է հայտնվելու էկրանին։

## Ֆունկցիա և կլաս կոմպոնենտեր {#function-and-class-components}

Կոմպոնենտ հայտարարելու պարզագույն եղանակը JavaScript ֆունկցիա գրելն է.

```js
function Welcome(props) {
  return <h1>Ողջույն, {props.name}</h1>;
}
```

Այս ֆունկցիան վավեր React կոմպոնենտ է, որովհետև այն ընդունում է տվյալները օբյեկտով, որպես մեկ արգումենտ(«props»), և վերադարձնում է React էլեմենտ։ Այսպիսի կոմպոնենտները մենք անվանում ենք «ֆունկցիա-կոմպոնենտ», որովհետև նրանք ըստ էության JavaScript ֆունկցիաներ են։

Կոմպոնենտ հայտարարելու համար դուք կարող եք նաև օգտագործել [ES6 կլաս](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes)<sub>`eng`</sub>։

```js
class Welcome extends React.Component {
  render() {
    return <h1>Ողջույն, {this.props.name}</h1>;
  }
}
```

Վերը նշված երկու կոմպոնենտները React-ի տեսանկյունից համարժեք են։

<<<<<<< HEAD
Կլասներն ունեն մի քանի լրացուցիչ հնարավորություններ, որոնց մասին մենք կխոսենք [հաջորդ բաժնում](/docs/state-and-lifecycle.html)։ Մինչ այդ, մենք կօգտագործենք ֆունկցիա-կոմպոնենտներ նրանց հակիրճության համար։
=======
Function and Class components both have some additional features that we will discuss in the [next sections](/docs/state-and-lifecycle.html).
>>>>>>> 0bb0303fb704147452a568472e968993f0729c28

## Կոմպոնենտի արտապատկերում {#rendering-a-component}

Նախկինում, մենք միայն հանդիպել ենք այնպիսի React էլեմենտների, որոնք իրենցից ներկայացնում էին DOM թեգեր.

```js
const element = <div />;
```

Ինչևէ, էլեմենտները կարող են իրենցից ներկայացնել օգտագործողի կողմից հայտարարված կոմպոնենտներ.

```js
const element = <Welcome name="Անահիտ»" />;
```

<<<<<<< HEAD
Երբ React-ը տեսնում է էլեմենտ, որն իրենից ներկայացնում է օգտագործողի կողմից հայտարարված կոմպոնենտ, ապա փոխանցում է JSX ատրիբուտներ այդ կոմպոնենտին որպես մեկ օբյեկտ։ Մենք անվանում ենք այդ օբյեկտը «props»։
=======
When React sees an element representing a user-defined component, it passes JSX attributes and children to this component as a single object. We call this object "props".
>>>>>>> 0bb0303fb704147452a568472e968993f0729c28

Օրինակ, այս կոդը կարտապատկերի «Ողջույն, Անահիտ».

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
3) Մեր `Welcome` կոմպոնենտը, որպես արդյունք, վերադարձնում է `<h1>Ողջույն, Անահիտ</h1>` էլեմենտը։
4) React DOM-ը արդյունավետորեն թարմացնում է DOM-ը, որպեսզի ստանա `<h1>Ողջույն, Անահիտ</h1>`։

>**Նշում:** Միշտ կոմպոնենտի անունը սկսիր մեծատառով։
>
>React-ը փոքրատառով սկսվող կոմպոնենտներին դիտարկում է որպես DOM թեգեր։ Օրինակ, `<div />`-ը իրենից ներկայացնում է HTML-ի div թեգը, իսկ `<Welcome />`-ը արդեն կոմպոնենտ է, որը պետք է լինի տեսանելիության տիրույթում։
>
>Այս պայմանավորվածության պատճառներին ավելի լավ ծանոթանալու համար կարդացեք [Խորացված JSX](/docs/jsx-in-depth.html#user-defined-components-must-be-capitalized).

## Կոմպոնենտների կոմպոզիցիա {#composing-components}

Կոմպոնենտները կարող են հղվել ուրիշ կոմպոնենտների վրա իրենց ելքային արժեքում։ Դա թույլ է տալիս մեզ օգտագործել նույն կոմպոնենտ-աբստրակցիան հավելվածի տարբեր մակարդակներում։ button, form, dialog, screen. սրանք բոլորը React հավելվածներում հիմնականում հանդես են գալիս որպես կոմպոնենտ։

Օրինակ, մենք կարող ենք ստեղծել `App` կոմպոնենտ, որը կարտապատկերի `Welcome`-ը բազում անգամներ։

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

Որպես կանոն, նոր React հավելվածներն ունեն միակ `App` կոմպոնենտ ամենավերևում։ Այնուամենայնիվ, եթե դուք փորձեք ինտեգրել React-ը արդեն գոյություն ունեցող հավելվածի մեջ, դուք կարող եք սկսել փոքր կոմպոնենտներից, ինչպիսին է `Button`-ը և հիերարխիայով աստիճանաբար շարժվել դեպի «վեր»։

## Կոմպոնենտների տարանջատում {#extracting-components}

Մի խուսափեք կոմպոնենտները ավելի փոքր կոմպոնենտների բաժանելուց։

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

Այն ընդունում է `author` (օբյեկտ է), `text` (տող է) և `date` (date տիպի է) որպես props և նկարագրում է մեկնաբանություն (comment) սոցիալական կայքում։

Հնարավոր է, որ այս կոմպոնենտը փոփոխության ենթարկելիս բարդություն առաջանա իր բոլոր ներդրվածությունների պատճառով։ ԵՎ, նաև, բարդ է օգտագործել նրա առանձին կտորները։ Եկեք նրանից տարանջատենք մի քանի կոմպոնենտներ։

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

`Avatar`-ը կարիք չունի իմանալու, որ արտապատկերվում է `Comment`-ի մեջ։ Դա է պատճառը, որ նրա prop-ին տվել ենք ավելի ընդհանուր անուն, այն է `user`, `author`-ի փոխարեն։

Մենք խորհուրդ ենք տալիս անվանել prop-երը component-ի տեսանկյունից, այլ ոչ թե այն կոնտեքստի, որում այն օգտագործվում է։

Այժմ, կարող ենք մի փոքր պարզեցնել `Comment`-ը։

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

Հաջորդիվ, մենք կտարանջատենք `UserInfo` կոմպոնենտը, որն օգտագործողի անունից հետո արտապատկերում է `Avatar`։

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

<<<<<<< HEAD
Սկզբում, կոմպոնենտների տարանջատումը կարող է թվալ «անշնորհակալ» գործ, բայց բազմակի օգտագործվող կոմպոնենտների պալիտրա ունենալը կարդարացնի իրեն ավելի մեծ հավելվածներում։ Հիմնական սկզբունքն այն է, որ եթե ձեր UI-ի մի մասն օգտագործվում է բազում անգամներ (`Button`, `Panel`, `Avatar`) կամ բավականին բարդ է ինքն իրենով (`App`, `FeedStory`, `Comment`), ապա այն հարմար թեկնածու է բազմակի օգտագործման կոմպոնենտ դառնալու համար։
=======
Extracting components might seem like grunt work at first, but having a palette of reusable components pays off in larger apps. A good rule of thumb is that if a part of your UI is used several times (`Button`, `Panel`, `Avatar`), or is complex enough on its own (`App`, `FeedStory`, `Comment`), it is a good candidate to be extracted to a separate component.
>>>>>>> 0bb0303fb704147452a568472e968993f0729c28

## Prop-երը կարելի է միայն կարդալ (read-only) {#props-are-read-only}

Անկախ նրանից, թե ինչպես կհայտարարեք կոմպոնենտը\` [որպես ֆունկցիա, թե որպես կլաս](#function-and-class-components), այն երբեք չպետք է փոփոխի իր prop-երը։

Դիտարկենք այս `sum` ֆունկցիան.

```js
function sum(a, b) {
  return a + b;
}
```

Այսպիսի ֆունկցիաները կոչվում են [«մաքուր»](https://en.wikipedia.org/wiki/Pure_function)<sub>`eng`</sub>, որովհետև նրանք չեն փորձում փոխել իրենց մուտքային արժեքները և նույն մուտքային արժեքների դեպքում միշտ վերադարձնում են նույն արդյունքը։

Ի հակադրություն դրան, այս ֆունկցիան «մաքուր» չէ, որովհետև այն փոխում է իր մուտքային արժեքները.

```js
function withdraw(account, amount) {
  account.total -= amount;
}
```

React-ը բավականին ճկուն է, բայց այն ունի մեկ խիստ կանոն.

**Բոլոր React կոմպոնենտներն իրենց prop-երի նկատմամբ պետք է իրենց դրսևորեն որպես մաքուր ֆունկցիաներ**

Իհարկե, հավելվածի UI-ը դինամիկ է և ժամանակի ընթացքում փոփոխվում է։ [Հաջորդ բաժնում](/docs/state-and-lifecycle.html) մենք կներկայացնենք նոր կոնցեպտ - «վիճակ»(state). State-ը թույլ է տալիս React կոմպոնենտին փոփոխել իր ելքային արժեքները ժամանակի ընթացքում\` ի պատասխան օգտագործողի գործողություններին, ցանցային պատասխաններին և այլն\` չխախտելով այս կանոնը։
