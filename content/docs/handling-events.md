---
id: handling-events
title: Իրադարձությունների մշակում
permalink: docs/handling-events.html
prev: state-and-lifecycle.html
next: conditional-rendering.html
redirect_from:
  - "docs/events-ko-KR.html"
---
Իրադարձությունների մշակումը React-ի էլեմենտներում շատ նման է իրադարձությունների մշակմանը DOM էլեմենտներում։ Կան որոշ շարահյուսական տարբերություններ։

<<<<<<< HEAD
* React-ում իրադարձությունների անունները փոքրատառի փոխարեն ուղտաԳիր են։
* JSX-ում  տողային ֆունկցիայի փոխարեն, որպես իրադարձություն մշակող դուք փոխանցում եք ֆունկցիա։
=======
Handling events with React elements is very similar to handling events on DOM elements. There are some syntax differences:
>>>>>>> 0bb0303fb704147452a568472e968993f0729c28

Օրինակ, HTML-ը\`

```html
<button onclick="activateLasers()">
  Ակտիվացնել լազերները
</button>
```

React-ում մի փոքր այլ է\`

```js{1}
<button onClick={activateLasers}>
  Ակտիվացնել լազերները
</button>
```

<<<<<<< HEAD
Մեկ այլ տարբերությունն է այն, որ React-ում դուք չեք կարող վերադարձնել `false`, որպեսզի կանխեք լռությամբ սահմանված պահվածքը։ Անհրաժեշտ է բացահայտ կանչել `preventDefault`-ը։ Օրինակ\` դիտարկիչում հղումը նոր էջում բացելու գործողությունը կանխելու համար, սովորական HTML-ում, դուք կարող եք գրել\`

```html
<a href="#" onclick="console.log('Հղումը սեղմվել է'); return false">
  Սեղմել այստեղ
</a>
=======
Another difference is that you cannot return `false` to prevent default behavior in React. You must call `preventDefault` explicitly. For example, with plain HTML, to prevent the default form behavior of submitting, you can write:

```html
<form onsubmit="console.log('You clicked submit.'); return false">
  <button type="submit">Submit</button>
</form>
>>>>>>> 0bb0303fb704147452a568472e968993f0729c28
```

React-ում դրա փոխարեն կարող է լինել\`

```js{3}
function Form() {
  function handleSubmit(e) {
    e.preventDefault();
<<<<<<< HEAD
    console.log('Հղումը սեղմվել է');
  }

  return (
    <a href="#" onClick={handleClick}>
      Սեղմել այստեղ
    </a>
=======
    console.log('You clicked submit.');
  }

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">Submit</button>
    </form>
>>>>>>> 0bb0303fb704147452a568472e968993f0729c28
  );
}
```

<<<<<<< HEAD
Այստեղ `e`-ն արհեստական իրադարձություն է։ React-ը սահմանում է այս արհեստական իրադարձությունները համաձայն [W3C spec](https://www.w3.org/TR/DOM-Level-3-Events/)<sub>`eng`</sub>-ին։ Այսպիսով դուք կարիք չունեք մտահոգվելու տարաբնույթ զննարկիչների համատեղելիության համար։ Տես\` [`SyntheticEvent`](/docs/events.html) ուղեցույցը ավելին իմանալու համար։
=======
Here, `e` is a synthetic event. React defines these synthetic events according to the [W3C spec](https://www.w3.org/TR/DOM-Level-3-Events/), so you don't need to worry about cross-browser compatibility. React events do not work exactly the same as native events. See the [`SyntheticEvent`](/docs/events.html) reference guide to learn more.
>>>>>>> 0bb0303fb704147452a568472e968993f0729c28

Երբ օգտագործում եք React, դուք սովորաբար կարիք չունեք կանչելու addEventListener, որպեսզի ավելացնեք listener-ներ DOM էլեմնտներ վրա, վերջինիս ստեղծվելուց հետո։

Երբ դուք ստեղծում եք կոմպոնտենտ\` օգտագործելով [ES6 կլաս](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes)<sub>`eng`</sub>, դա նշանակում է, որ իրադարձությունների մշակողը պետք է լինի կլասի մեթոդ։ Օրինակ\` այս `Toggle` կոմպոնտենտը արտապատկերում է մի կոճակ, որը օգտվողին թույլ է տալիս կատարել վիճակի փոփոխություն «ՄԻԱՑՆԵԼ»-ի և «ԱՆՋԱՏԵԼ»-ի միջև\` 

```js{6,7,10-14,18}
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};

    // Այս կցումը պարտադիր է որպեսզի this-ը աշխատի հետկանչում
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
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

[**Փորձել CodePen-ում**](https://codepen.io/anon/pen/mommWK?editors=0010)

JSX-ի հետկանչում ուշադիր եղեք `this`-ի նշանակությանը։ JavaScript-ում կլասի մեթոդները լռությամբ [կցված](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_objects/Function/bind)<sub>`eng`</sub> չեն կոնտեքստին։ Եթե դուք մոռանաք կցել `this.handleClick`-ը և փոխանցեք դա `onClick`-ում, `this`-ի արժեքը կլինի `undefined` երբ ֆունկցիան կանչվի։

Դա կապված չէ React-ի հետ։ Դա մաս է կազմում «[ինչպես են ֆունկցիաները աշխատում JavaScript-ում](https://www.smashingmagazine.com/2014/01/understanding-javascript-function-prototype-bind/)<sub>`eng`</sub>»-ին։ Ընդհանուր առմամբ, եթե դուք հղվում եք մեթոդին առանց վերջում ավելացնելու `()`, օր.\` `onClick={this.handleClick}`, ապա դուք պետք է կցեք այն։

Եթե `bind`-ի տարբերակը ձեզ դուր չի գալիս, ապա երկու տարբերակ կա դրանից խուսափելու համար։ Եթե դուք օգտագործում եք փորձնական [ կլասի public դաշտերի շարահյուսությունը](https://babeljs.io/docs/plugins/transform-class-properties/)<sub>`eng`</sub> ապա օգտագործեք այն հետկանչները ճիշտ կցելու համար.


```js{2-6}
class LoggingButton extends React.Component {
  //  Այս շարահյուսությունը ապահովում է `this`-ի կցված լինելը handleClick-ին
  // Ուշադրություն\` սա *փորձնական* շարահյուսություն է
  handleClick = () => {
    console.log('սա this-ն է`', this);
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

Այս շարահյուսությունը լռությամբ միացված է [Create React App](https://github.com/facebookincubator/create-react-app)<sub>`eng`</sub>-ում։

թե դուք չեք օգտագործում «կլասի դաշտեր» շարահյուսությունը, դուք կարող եք օգտագործել [սլաք–ֆունկցիա](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/Arrow_functions)<sub>`eng`</sub> հետկանչում\`

```js{7-9}
class LoggingButton extends React.Component {
  handleClick() {
    console.log('սա this-ն է`', this);
  }

  render() {
    // Այս շարահյուսությունը ապահովում է `this`-ի կցված լինելը handleClick-ին
    return (
<<<<<<< HEAD
      <button onClick={(e) => this.handleClick(e)}>
        Սեղմել այստեղ
=======
      <button onClick={() => this.handleClick()}>
        Click me
>>>>>>> 0bb0303fb704147452a568472e968993f0729c28
      </button>
    );
  }
}
```

Այս գրելաձևի խնդիրը կայանում է նրանում, որ ամեն անգամ, երբ `LoggingButton` արտապատկերվում է, մեկ այլ հետկանչ է ստեղծվում։ Հիմնականում դա խնդիր չի առաջացնում։ Այնուամենայնիվ, եթե այս հետկանչը փոխանցված է որպես prop ավելի ցածր կոմպոնենտների, այդ կոմպոնենտները կարող են անել հավելյալ վաերա-արտապատկերում։ Ընդհանուր առմամբ մենք խորհուրդ ենք տալիս կցումը կատարել կոստրուկտրում կամ օգտագործել «կլասի public դաշտերի շարահյուսությունը», որպեսզի խուսափեք նման արտադրողականության խնդիրներից։

## Փոխանցել արգումենտներ  իրադարձություն մշակողներին {#passing-arguments-to-event-handlers}

Ցիկլի ներսում սովորաբար անհրաժեշտ է լինում իրադարձություն մշակողներին փոխանցել հավելյալ պարամետրներ։ Օրինակ, եթե `id`-ն տողի տարբերակիչն է, ապա և՛ առաջին տարբերակը կաշխատի, և՛ երկրորդը\`

```js
<button onClick={(e) => this.deleteRow(id, e)}>Ջնջել տողը</button>
<button onClick={this.deleteRow.bind(this, id)}>Ջնջել տողը</button>
```

Վերը նշված երկու տողերի աշխատանքները համարժեք են, դուք կարող եք օգտագործել թե [սլաք–ֆունկցիա](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)<sub>`eng`</sub>-ները և թե [`Function.prototype.bind`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Function/bind)<sub>`eng`</sub>-ը։

Երկու դեպքում էլ e արգումենտը, որը ներկայացնում է React-ի իրադարձությունը, պետք է փոխանցվի որպես երկրորդ արգումենտ\` ID-ից հետո։ Սլաք–ֆունկցիայի դեպքում մենք ստիպված ենք ակնհայտորեն փոխանցել այն, բայց bind-ի դեպքում բոլոր հետագա արգումենտները ավտոմատ կերպով կփոխանցվեն։

