---
id: handling-events
title: Իրադարձությունների մշակում
permalink: docs/handling-events.html
prev: state-and-lifecycle.html
next: conditional-rendering.html
redirect_from:
  - "docs/events-ko-KR.html"
---
Իրադարձությունների մշակումը React֊ի էլեմենտներում շատ նման է իրադարձությունների մշակմանը DOM էլեմենտներում։ Կան որոշ շարահյուսական տարբերություններ։

* React֊ում իրադարձությունների անունները փոքրատառի փոխարեն ուղտագիր են։
* JSX֊ում դուք կարող եք վերագրել ֆունկցիան որպես իրադարձության մշակող, տողային ֆունկցիայի փոխարեն։

Օրինակ, HTML֊ը՝

```html
<button onclick="activateLasers()">
  Ակտիվացնել լազերնրենը
</button>
```

React-ում մի փոքր այլ է՝

```js{1}
<button onClick={activateLasers}>
    Ակտիվացնել լազերնրենը
</button>
```

Մեկ այլ տարբերություններից է այն, որ React-ում դուք չեք կարող վերադարձնել `false`, որպեսզի կանխեք իսկզբանե նախատեսված գործողությունը։
Ակնհայտորեն անհրաժեշտ է կանչել `preventDefault`։ Օրինակ՝ պարզ HTML֊ում, դիտարկիչում հղումը նոր էջում բացելու գործողությունը կանխելու համար դուք կարող եք գրել՝

```html
<a href="#" onclick="console.log('Հղումը սեղմվել է'); return false">
  Սեղմել այստեղ
</a>
```

React֊ում դրա փոխարեն կարող է լինել՝

```js{2-5,8}
function ActionLink() {
  function handleClick(e) {
    e.preventDefault();
    console.log('Հղումը սեղմվել է');
  }

  return (
    <a href="#" onClick={handleClick}>
      Սեղմել այստեղ
    </a>
  );
}
```

Այստեղ `e`֊ն արհեստական իրադարձություն է։ React-ը սահմանում է այս արհեստական իրադարձությունները համապատասխանաբար [W3C spec](https://www.w3.org/TR/DOM-Level-3-Events/)֊ին։ Այսպիսով դուք կարիք չունեք մտահոգվելու տարաբնույթ զննարկիչների համատեղելիության համար։ Տես՝ [`SyntheticEvent`](/docs/events.html) ուղեցույցը ավելին իմանալու համար։

React-ում ընդհանրապես պետք չէ կանչել `addEventListener`֊ը DOM էլեմենտներին ազդակներ ավելացնելու համար՝ էլեմենտի ստեղծելուց հետո։ Դրա փոխարեն ուղակի պետք է ապահովել ազդակ, երբ էլեմենտը արտապատկերվում է։

Երբ դուք ստեղծում եք կոմպոնտենտ՝ օգտագործելով [ES6 կլաս](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes), դա նշանակում է, որ իրադարձությունների մշակողը պետք է լինի կլասի մեթոդ։
Օրինակ՝ այս `Toggle` կոմպոնտենտը արտապատկերում է մի կոճակ, որը օգտվողին թույլ է տալիս անցել "ՄԻԱՑՆԵԼ"֊ի և "ԱՆՋԱՏԵԼ"֊ի միջև՝ 

```js{6,7,10-14,18}
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};
    
    // Այս կցումը պարտադիր է որպեսզի `this`֊ը աշխատի հետկանչում
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ՄԻԱՑՆԵԼ' : 'ԱՆՋԱՏԵԼ'}
      </button>
    );
  }
}

ReactDOM.render(
  <Toggle />,
  document.getElementById('root')
);
```

[**Փորձել CodePen֊ում**](https://codepen.io/anon/pen/mommWK?editors=0010)

JSX֊ի հետկանչում ուշադիր եղեք `this`֊ի նշանակությանը։ JavaScript֊ում կլասի մեթոդները իսկզբանե [կցված](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_objects/Function/bind) չեն։ Եթե դուք մոռանաք կցել `this.handleClick`֊ը և տեղադրել դա `onClick`֊ում, `this`֊ի արժեքը կլինի `undefined` երբ ֆունկցիան կանչվի։

Դա կապված չէ React֊ի հետ։ Դա մաս է կազմում «[ինչպես են ֆունկցիաները աշխատում JavaScript֊ում](https://www.smashingmagazine.com/2014/01/understanding-javascript-function-prototype-bind/)»֊ին։ Ընդհանուր առմամբ, եթե դուք դիմեք որևէ մեթոդի առանց վերջում ավելացնելու `()`, Օրինակ՝ `onClick={this.handleClick}`, դուք կկցեք այդ մեթոդը։

Եթե `bind`֊ի տարբերակը ձանձրացնում է ձեզ, կա երկու ճանապարհ դա անելու համար։ Եթե դուք օգտագործում եք փորձարարական [հրապարակային կլասի հատկության շարահյուսությունը](https://babeljs.io/docs/plugins/transform-class-properties/) դուք կարող եք օգտագործել կլասի հատկությունը հետկանչին ճիշտ ձևով կապելու համար՝


```js{2-6}
class LoggingButton extends React.Component {
  // Այս կցումը պարտադիր է որպեսզի `this`֊ը աշխատի հետկանչում
  // Ուշադրություն՝ սա *փորձարարական* շարահյուսություն է
  handleClick = () => {
    console.log('սա this֊ն է՝', this);
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        Սեղմել այստեղ
      </button>
    );
  }
}
```

Այս շարահյուսությունը իսկզբանե միացված է [Ստեղծել React ծրագիր](https://github.com/facebookincubator/create-react-app)֊ում։

Եթե դուք չեք օգտագործում կլասի հատկության շարահյուսությունը, դուք կարող եք օգտագործել [սլաք ֆունկցիա](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/Arrow_functions) ետկանչում՝

```js{7-9}
class LoggingButton extends React.Component {
  handleClick() {
    console.log('սա this֊ն է՝', this);
  }

  render() {
    // Այս շարահյուսությունը ապահովում է `this`֊ի կցված լինելը handleClick֊ին
    return (
      <button onClick={(e) => this.handleClick(e)}>
        Սեղմել այստեղ
      </button>
    );
  }
}
```

Շարահյուսության խնդիրը կայանում է նրանում, որ ամեն անգամ, երբ `LoggingButton` արտապատկերվում է, մեկ այլ ետկանչ է ստեղծվում։ Մեծամասամբ դա լավ է։ Այնուամենայնիվ եթե ետկանչը փոխանցված է որպես հենակ ավելի ցածր կոմպոնենտների համար, այդ կոմպոնենտները կարող են հանգեցնել հավելյալ կրկնակի արտապատկերման։
Ընդհանուր առմամբ մենք խորհուրդ ենք տալիս կցումը կատարել constructor֊ում կամ օգտագործել հրապարակային կլասի հատկության շարահյուսությունը, որպեսզի խուսափեք նման արտադրողականության խնդիրներից։

## Փոխանցել արգումենտներ իրադարձությունների մշակողին {#passing-arguments-to-event-handlers}

Ցիկլի ներսում սովորաբար անհրաժեշտ է լինում իրադարձությունների մշակողին փոխանցել հավելյալ պարամետրներ։ Օրինակ եթե `id`֊ն տողի հերթական համարն է, ապա և առաջին տարբերակը կաշխատի և երկրորդը՝

```js
<button onClick={(e) => this.deleteRow(id, e)}>Ջնջել տողը</button>
<button onClick={this.deleteRow.bind(this, id)}>Ջնջել տողը</button>
```

Վերը նշված երկու տողերի աշխատանքները համարժեք են, դուք կարող եք օգտագործել թե [սլաք ֆունկցիաները](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) և թե [`Function.prototype.bind`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Function/bind)֊ը։

Երկու դեպքում էլ `e` արգումնենտը ներկայացնում է React֊ի իրադարձությունը, որը պետք է փոխանցվի, որպես երկրորդ արգումենտ՝ տողի հերթական համարից հետո։
Սլաք ֆունկցիայի դեպքում մենք ակնհայտորեն պետք է փոխանցենք դա, իսկ `bind`֊ի դեպքում բոլոր հետագա արգումենտները ավտոմատ կերպով կփոխանցվեն։

