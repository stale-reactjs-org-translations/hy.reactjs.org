---
id: conditional-rendering
title: Պայմանական Պատկերում
permalink: docs/conditional-rendering.html
prev: handling-events.html
next: lists-and-keys.html
redirect_from:
  - "tips/false-in-jsx.html"
---

React-ում դուք կարող եք ստեղծել միմյանցից զատ կոմպոնենտներ որոնք կինկապսուլացնեն ձեզ համար անհրաժեշտ պահվածքը, որից հետո կարող եք պատկերել նրանցից ոմանց ՝ ելենելով հավելվածի վիճակից։

React-ում պայմանական պատկերումը աշխատում է նույն ձեւով ինչ որ պայմանները JavaScript-ում։
Օգտագործեք JavaScript-ի օպերատորներից [`if`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else)-ը կամ [պայմանական օպերատոր](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Conditional_Operator)-ը որպեսզի ստեղծեք էլեմենտեր, որոնք կներկայացնեն ներկա վիճակը և թույլ կտան React-ին թարմացնել UI-ը համապատասխանեցնելով իրենց։

Ուշադրություն դարձրեք այս երկու կոմպոնենտներին.

```js
function UserGreeting(props) {
  return <h1>Բարի վերադարձ!</h1>;
}

function GuestGreeting(props) {
  return <h1>Խնդրում ենք Մուտ գործել!</h1>;
}
```

Մենք կստեղծենք `Greeting` կոմպոնենտը, որը կպատկերի այս կոմպոնենտներից միայն մեկը ՝ կախված օգտագործող-ը մուտք է գործել համակարգ թե ոչ.

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

Այս օրինակը պատկերում է տարբեր `Greeting` կոմպոնենտներ ելնելով `isLoggedIn` հատկության արժեքից։

### Էլեմենտ փոփոխականներ {#element-variables}

Դուք կարող եք օգտագործել փոփոխականներ ՝ էլեմենտները պահելու համար։ Սա կարող է օգնել պայմանականորեն պատկերել կոմպոնենտի մեկ հատված մինչդեռ ելքային արժեքի մնացած մասը մնում է անփոփոխ։

Ուծադրություն դարձրեք այս երկու կոմպոնենտներին, որոնք ներկայացնում են Մուտք և Ելք կոճակները.

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
Այն պետք է պատկերի `<LoginButton />` կամ `<LogoutButton />` ելնելով իր ներկա վիճակից։ Այն նաև կպատկերի `<Greeting />`-ը ՝ նախորդ օրինակից։

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

Իհարկե փոփոխականներ հայտարարելը և `if` օպերատորի օգնությամբ պայմանական նկարելը բավականին լավ տարբերակ է, սակայն կան ավելի կարճ տարբերակներ, որոնք նշված են ստորև օրինակնեում։

### Տրամաբանական && օպերատօրը if-ի փոխարեն {#inline-if-with-logical--operator}

Դուք կարող եք [ներդնել ցանկացած JSX արտահայտություն](/docs/introducing-jsx.html#embedding-expressions-in-jsx) ձևաոր փակագծերի մեջ։ Այն ներառում է JavaScript-ի տրամաբանական `&&` օպերատորը։ Այն կարող է լինել հարմար պայմանկանորեն էլեմենտ ավելացնելու համար։

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

Այն աշխատում է որովհետև JavaScript-ում, `true && արտահայտություն` միշտ արժեքավորվում է որպես `արտահայտություն`, և `false && արտահայտություն` միշտ արժեքավորվում է որպես `false`.

Հետևաբար, եթե արտահայտությունը `true` է, նշանակում էլեմենտը `&&`-ից անմիջապես հետո պետք է պատկերվի ելքային արժեքում։ Եթե այն `false` է ՝ React-ը կանտեսի և բաց կթողնի այն։

### Պայմանական օպերատորը if-else-ի փոխարեն {#inline-if-else-with-conditional-operator}

Մեկ այլ միջոց, որը թույլ է տալիս պայմանականորեն պատկերել էլեմենտը, դա JavaScript-ի [`պայման ? true : false`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Conditional_Operator) օպերատորի օգտագործումն է։

Ստորև բերված օրինակում մենք օգտագործում ենք պայմանական օպերատորը փոքր տեքստային բլոկ պատկերելու համար.

```javascript{5}
render() {
  const isLoggedIn = this.state.isLoggedIn;
  return (
    <div>
      Օգտագործողը մուտք գործած <b>{isLoggedIn ? 'է' : 'չէ'}</b>.
    </div>
  );
}
```

Այն կարող է օգտագործվել նաև մեծ արտահայտություննրի դեպքում չնայած նրան որ այդքան էլ ակնհայտ չէ թե ինչ է կատարվում.
```js{5,7,9}
render() {
  const isLoggedIn = this.state.isLoggedIn;
  return (
    <div>
      {isLoggedIn ? (
        <LogoutButton onClick={this.handleLogoutClick} />
      ) : (
        <LoginButton onClick={this.handleLoginClick} />
      )}
    </div>
  );
}
```

Ինչպես JavaScript-ում, դուք եք ընտրում համապատասխան ոճը, հիմնվելով նրան թե որն եք դուք և ձեր թիմը համարում ավելի կարդացվող։ ԵՎ հիշեք որ եթե պայմանները դառնում են ավելի բարդ, ապա դա շատ լավ ժամանակ է [կոմպոնենտը բաժանել մասերի](/docs/components-and-props.html#extracting-components)։

### Կանխում ենք կոմպոնենտի պատկերումը {#preventing-component-from-rendering}

Միգուցե հազվադեպ դեպքերում ցանկանաք, որ կոմպոնենտը թաքցնի ինքն իրեն ՝ անգամ եթե այն պատկերվել է մեկ այլ կոմպօնենտի կողմից։ Այդ անելու համար ուղակի վերադարձրեք `null` իր ելքային արժեքի փոխարեն։

Ստորև օրինակում `<WarningBanner />`-ը պատկերվում է կախված `warn` հատկության արժեքից։ Եթե նրա արժեքը `false` է, ապա կոմպոնենտը չի պատկերվի։

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

Կոմպոնենտի `render` մեթոդից `null` վերադարձնելու դեպքում կոմպոնենտի կըանքի ցիկլ-ի մեթոդները չեն կանչվելու։ Սակայն `componentDidUpdate`-ը կշարունակի կանչվել։
