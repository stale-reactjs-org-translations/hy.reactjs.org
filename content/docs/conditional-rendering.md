---
id: conditional-rendering
title: Պայմանական արտապատկերում
permalink: docs/conditional-rendering.html
prev: handling-events.html
next: lists-and-keys.html
redirect_from:
  - "tips/false-in-jsx.html"
---

React-ում դուք կարող եք ստեղծել միմյանցից զատ կոմպոնենտներ որոնք կինկապսուլացնեն ձեզ համար անհրաժեշտ պահվածքը, որից հետո կարող եք արտապատկերել նրանցից ոմանց\` ելենելով հավելվածի վիճակից։

React-ում պայմանական արտապատկերումը աշխատում է այնպես, ինչպես պայմանները JavaScript-ում։
Օգտագործեք JavaScript-ի օպերատորներից [`if-ը`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else) կամ [պայմանական օպերատորը](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Conditional_Operator), որպեսզի ստեղծեք էլեմենտներ, որոնք կներկայացնեն ընթացիկ վիճակը և թույլ կտան React-ին թարմացնել UI-ը համապատասխանեցնելով իրենց։

Դիտարկեք այս երկու կոմպոնենտները.

```js
function UserGreeting(props) {
  return <h1>Բարի վերադարձ</h1>;
}

function GuestGreeting(props) {
  return <h1>Խնդրում ենք մուտք գործել</h1>;
}
```

Մենք կստեղծենք `Greeting` կոմպոնենտը, որը ցույց կտա այս կոմպոնենտներից միայն մեկը\` կախված օգտագործողը մուտք է գործել համակարգ թե ոչ.

```javascript{3-7,11,12}
function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}

ReactDOM.render(
  // Փորձեք փոխել isLoggedIn={true}:
  <Greeting isLoggedIn={false} />,
  document.getElementById('root')
);
```

[**Փորձել CodePen-ում**](https://codepen.io/gaearon/pen/ZpVxNq?editors=0011)

Այս օրինակը արտապատկերում է տարբեր `Greeting` կոմպոնենտներ ելնելով\` `isLoggedIn` հատկության արժեքից։

### Էլեմենտ փոփոխականներ {#element-variables}

Դուք կարող եք օգտագործել փոփոխականներ\` էլեմենտները պահելու համար։ Սա կարող է օգնել պայմանականորեն արտապատկերել կոմպոնենտի մեկ հատված մինչդեռ ելքային արժեքի մնացած մասը մնում է անփոփոխ։

Դիտարկեք այս այս երկու կոմպոնենտները, որոնք ներկայացնում են Մուտք և Ելք կոճակները.

```js
function LoginButton(props) {
  return (
    <button onClick={props.onClick}>
      Մուտք
    </button>
  );
}

function LogoutButton(props) {
  return (
    <button onClick={props.onClick}>
      Ելք
    </button>
  );
}
```

Ստորև բերված օրինակում, մենք կստեղծենք `LoginControl` անունով [վիճակով կոմպոնենտ](/docs/state-and-lifecycle.html#adding-local-state-to-a-class)։
Այն կարտապատկերի `<LoginButton />` կամ `<LogoutButton />` ելնելով իր ներկա վիճակից։ Այն նաև կարտապատկերի `<Greeting />`-ը նախորդ օրինակից։

```javascript{20-25,29,30}
class LoginControl extends React.Component {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = {isLoggedIn: false};
  }

  handleLoginClick() {
    this.setState({isLoggedIn: true});
  }

  handleLogoutClick() {
    this.setState({isLoggedIn: false});
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    let button;

    if (isLoggedIn) {
      button = <LogoutButton onClick={this.handleLogoutClick} />;
    } else {
      button = <LoginButton onClick={this.handleLoginClick} />;
    }

    return (
      <div>
        <Greeting isLoggedIn={isLoggedIn} />
        {button}
      </div>
    );
  }
}

ReactDOM.render(
  <LoginControl />,
  document.getElementById('root')
);
```

[**Փորձել CodePen-ում**](https://codepen.io/gaearon/pen/QKzAgB?editors=0010)

Իհարկե փոփոխականներ հայտարարելը և `if` օպերատորի օգնությամբ պայմանական արտապատկերումը բավականին լավ տարբերակ է, սակայն կան ավելի կարճ տարբերակներ, որոնք նշված են ստորև օրինակնեում։

### Տրամաբանական && օպերատօրը if-ի փոխարեն {#inline-if-with-logical--operator}

<<<<<<< HEAD
Դուք կարող եք [ներդնել ցանկացած JSX արտահայտություն](/docs/introducing-jsx.html#embedding-expressions-in-jsx) ձևավոր փակագծերի մեջ։ Այն ներառում է JavaScript-ի տրամաբանական `&&` օպերատորը։ Այն կարող է լինել հարմար էլեմենտը պայմանկանորեն ավելացնելու համար։
=======
You may [embed expressions in JSX](/docs/introducing-jsx.html#embedding-expressions-in-jsx) by wrapping them in curly braces. This includes the JavaScript logical `&&` operator. It can be handy for conditionally including an element:
>>>>>>> 0bb0303fb704147452a568472e968993f0729c28

```js{6-10}
function Mailbox(props) {
  const unreadMessages = props.unreadMessages;
  return (
    <div>
      <h1>Hello!</h1>
      {unreadMessages.length > 0 &&
        <h2>
          Դուք ունեք {unreadMessages.length} չկարդացված հաղորդագրություններ։
        </h2>
      }
    </div>
  );
}

const messages = ['React', 'Re: React', 'Re:Re: React'];
ReactDOM.render(
  <Mailbox unreadMessages={messages} />,
  document.getElementById('root')
);
```

[**Փորձել CodePen-ում**](https://codepen.io/gaearon/pen/ozJddz?editors=0010)

Այն աշխատում է որովհետև JavaScript-ում, `true && արտահայտություն`-ը միշտ արժեքավորվում է որպես `արտահայտություն`, և `false && արտահայտություն`-ը միշտ արժեքավորվում է որպես `false`.

Հետևաբար, եթե արտահայտությունը `true` է, նշանակում էլեմենտը `&&`-ից անմիջապես հետո պետք է արտապատկերվի ելքային արժեքում։ Եթե այն `false` է\` React-ը կանտեսի և բաց կթողնի այն։

<<<<<<< HEAD
### Պայմանական օպերատորը if-else-ի փոխարեն {#inline-if-else-with-conditional-operator}
=======
Note that returning a falsy expression will still cause the element after `&&` to be skipped but will return the falsy expression. In the example below, `<div>0</div>` will be returned by the render method.

```javascript{2,5}
render() {
  const count = 0;
  return (
    <div>
      { count && <h1>Messages: {count}</h1>}
    </div>
  );
}
```

### Inline If-Else with Conditional Operator {#inline-if-else-with-conditional-operator}
>>>>>>> 0bb0303fb704147452a568472e968993f0729c28

Մեկ այլ միջոց, որը թույլ է տալիս պայմանականորեն արտապատկերել էլեմենտը, դա JavaScript-ի [`պայման ? true : false`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Conditional_Operator) օպերատորի օգտագործումն է։

Ստորև բերված օրինակում մենք օգտագործում ենք պայմանական օպերատորը փոքր տեքստային բլոկ արտապատկերելու համար.

```javascript{5}
render() {
  const isLoggedIn = this.state.isLoggedIn;
  return (
    <div>
      Օգտագործողը մուտք <b>{isLoggedIn ? 'է' : 'չի'}</b> գործել.
    </div>
  );
}
```

Այն կարող է օգտագործվել նաև մեծ արտահայտությունների դեպքում չնայած նրան որ այդքան էլ ակնհայտ չէ թե ինչ է կատարվում.
```js{5,7,9}
render() {
  const isLoggedIn = this.state.isLoggedIn;
  return (
    <div>
      {isLoggedIn
        ? <LogoutButton onClick={this.handleLogoutClick} />
        : <LoginButton onClick={this.handleLoginClick} />
      }
    </div>
  );
}
```

Ինչպես JavaScript-ում, դուք եք ընտրում համապատասխան գրելաոճը, հիմնվելով նրան, թե որն եք դուք և ձեր թիմը համարում ավելի ընթերնելի։ ԵՎ հիշեք որ եթե պայմանները ավելի են բարդանում, ապա դա շատ լավ ժամանակ է [կոմպոնենտը բաժանել մասերի](/docs/components-and-props.html#extracting-components)։

### Կոմպոնենտի արտապատկերման կանխում {#preventing-component-from-rendering}

Միգուցե, հազվադեպ դեպքերում ցանկանաք, որ կոմպոնենտը թաքցնի ինքն իրեն, անգամ եթե այն արտապատկերվել է մեկ այլ կոմպոնենտի կողմից։ Այդ անելու համար ուղղակի վերադարձրեք `null` որպես ելքային արժեք։

Ստորև բերված օրինակում `<WarningBanner />`-ը արտապատկերվում է կախված `warn` հատկության արժեքից։ Եթե նրա արժեքը `false` է, ապա կոմպոնենտը չի արտապատկերվի։

```javascript{2-4,29}
function WarningBanner(props) {
  if (!props.warn) {
    return null;
  }

  return (
    <div className="warning">
      Warning!
    </div>
  );
}

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {showWarning: true};
    this.handleToggleClick = this.handleToggleClick.bind(this);
  }

  handleToggleClick() {
    this.setState(state => ({
      showWarning: !state.showWarning
    }));
  }

  render() {
    return (
      <div>
        <WarningBanner warn={this.state.showWarning} />
        <button onClick={this.handleToggleClick}>
          {this.state.showWarning ? 'Թաքցնել' : 'Ցույց տալ'}
        </button>
      </div>
    );
  }
}

ReactDOM.render(
  <Page />,
  document.getElementById('root')
);
```

[**Փորձել CodePen-ում**](https://codepen.io/gaearon/pen/Xjoqwm?editors=0010)

Կոմպոնենտի `render` մեթոդից `null` վերադարձնելու դեպքում կոմպոնենտի կյանքի ցիկլի մեթոդները չեն կանչվելու։ Սակայն `componentDidUpdate`-ը կշարունակի կանչվել։
