---
id: composition-vs-inheritance
title: Կոմպոզիցիան ընդդեմ Ժառանգականության
permalink: docs/composition-vs-inheritance.html
redirect_from:
  - "docs/multiple-components.html"
prev: lifting-state-up.html
next: thinking-in-react.html
---

React-ն ունի կոմպոզիցիայի հզոր մոդել, և մենք խորհուրդ ենք տալիս օգտագործել կոմպոզիցիա ժառանգականության փոխարեն\` կոմպոնենտների միջև կոդի վերաօգտագործման համար։

Այս գլխում, մենք կդիտարկենք մի քանի խնդիրներ, որտեղ ծրագրավորողները, որոնք նորեկ են React-ում, հաճախ փորձում են լուծել ժառանգականության միջոցով, և ցույց կտանք\` ինչպես լուծել այդ խնդիրները կոմպոզիցիայի միջոցով։

## Պահպանում {#containment}

Որոշ կոմպոնենտներ չգիտեն իրենց զավակներին նախապես։ Սա սովորական է հատկապես այնպիսի կոմպոնենտների համար, ինչպիսիք են `Sidebar`-ը կամ `Dialog`-ը, որոնք իրենցից ներկայացնում ենք ընդհանուր «կաղապարներ»։

Մենք խորհուրդ ենք տալիս այսպիսի կոմպոնենտերում օգտագործել հատուկ `children` prop\` փոխանցելու զավակ էլեմենտներին անմիջապես նրանց ելքային արժեքներին.

```js{4}
function FancyBorder(props) {
  return (
    <div className={'FancyBorder FancyBorder-' + props.color}>
      {props.children}
    </div>
  );
}
```

Սա թույլ է տալիս ուրիշ կոմպոնենտերի փոխանցել ցանկացած զավակներ նրանց\` ներդնելով JSX-ում.

```js{4-9}
function WelcomeDialog() {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        Բարի գալուստ
      </h1>
      <p className="Dialog-message">
        Շնորհակալություն մեր տիեզերանավ հաճախելու համար։
      </p>
    </FancyBorder>
  );
}
```

[**Փորձել CodePen-ում**](https://codepen.io/gaearon/pen/ozqNOV?editors=0010)

`<FancyBorder>`-ի JSX թեգի մեջ գտնվող ամեն ինչ փոխանցվում է `FancyBorder` կոմպոնենտին որպես `children` prop։ Քանի որ `FancyBorder`-ը արտապատկերում է `{props.children}`-ը `<div>`-ի մեջ, փոխանցված էլեմենտները հայտնվում են վերջնական ելքային արժեքում։

Չնայած սա քիչ է հանդիպում, սակայն ժամանակ առ ժամանակ կոմպոնենտում անհրաժեշտ է լինում ունենալ մեկից ավել «տեղադրման կետերի»։ Այդպիսի դեպքերում children օգտագործելու փոխարեն, դուք կարող եք հանգել ձեր իսկ ձևաչափին.

```js{5,8,18,21}
function SplitPane(props) {
  return (
    <div className="SplitPane">
      <div className="SplitPane-left">
        {props.left}
      </div>
      <div className="SplitPane-right">
        {props.right}
      </div>
    </div>
  );
}

function App() {
  return (
    <SplitPane
      left={
        <Contacts />
      }
      right={
        <Chat />
      } />
  );
}
```

[**Փորձել CodePen-ում**](https://codepen.io/gaearon/pen/gwZOJp?editors=0010)

React էլեմենտները, ինչպիսիք են `<Contacts />`-ը և `<Chat />`-ը ուղղակի օբյեկներ են. այսպիսով դուք կարող եք փոխանցել նրանց որպես props ուրիշ ցանկացած տվյալի նման։ Այս մոտեցումը կարող է ձեզ հիշեցնել ուրիշ գրադարաններում «slot»-երի գաղափարը, սակայն այստեղ չկան սահմանափակումներ, թե ինչ կփոխանցեք React-ում որպես props։

## Մասնագիտացում {#specialization}

Հաճախ մենք կոմպոնենտների մասին մտածում ենք ինչպես ուրիշ կոմպոնենտների «հատուկ դեպքեր»։ Օրինակ, մենք կարող ենք ասել, որ `WelcomeDialog`-ը `Dialog`-ի հատուկ դեպք է։

React-ում սա նույնպես ձեռք է բերվում կոմպոզիցիայով, որտեղ ավելի «սպեցիֆիկ» կոմպոնենտը արտապատկերում է ավելի «ընդհանուր» կոմպոնենտի և կարգավորում է այն prop-երով.

```js{5,8,16-18}
function Dialog(props) {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        {props.title}
      </h1>
      <p className="Dialog-message">
        {props.message}
      </p>
    </FancyBorder>
  );
}

function WelcomeDialog() {
  return (
    <Dialog
      title="Բարի գալուստ"
      message="Շնորհակալություն մեր տիեզերանավ հաճախելու համար։" />
  );
}
```

[**Փորձել CodePen-ում**](https://codepen.io/gaearon/pen/kkEaOZ?editors=0010)

Կոմպոզիցիան հավասարապես լավ է աշխատում որպես կլասներ հայտարաված կոմպոնենտների համար.

```js{10,27-31}
function Dialog(props) {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        {props.title}
      </h1>
      <p className="Dialog-message">
        {props.message}
      </p>
      {props.children}
    </FancyBorder>
  );
}

class SignUpDialog extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.state = {login: ''};
  }

  render() {
    return (
      <Dialog title="Մարսի հետազոտական ծրագիր"
              message="Ինչպե՞ս կարող ենք ձեզ դիմել">
        <input value={this.state.login}
               onChange={this.handleChange} />
        <button onClick={this.handleSignUp}>
          Գրանցեք ինձ
        </button>
      </Dialog>
    );
  }

  handleChange(e) {
    this.setState({login: e.target.value});
  }

  handleSignUp() {
    alert(`Բարի գալուստ, ${this.state.login}!`);
  }
}
```

[**Փորձել CodePen-ում**](https://codepen.io/gaearon/pen/gwZbYa?editors=0010)

## Այսպիսով, իսկ ի՞նչ կարող ենք ասել ժառանգականության մասին {#so-what-about-inheritance}

Facebook-ում մենք օգտագործում ենք React հազարավոր կոմպոնենտներում, և մենք չենք գտել այնպիսի դեպքեր, որտեղ խորհուրդ կտայինք ստեղծել կոմպոնենտի ժառանգականության հիերարխիաներ։

Prop-երը և կոմպոզիցիան ձեզ տալիս են այն բոլոր ճկունությունը, որի կարիքը դուք ունեք կոմպոնենտի տեսքը և պահվածքը բացահայտ եղանակով կարգավորելու համար։ Հիշեք, որ կոմպոնենտները կարող ենք ընդունել ցանկացած prop, այդ թվում տարրական արժեքներ, React էլեմենտներ և ֆունկցիաներ։

Եթե դուք ցանկանում ենք վերաօգտագործել ոչ UI-ական ֆունկցիոնալություն կոմպոնենտների միջև, մենք կառաջարկենք տարանջատել այն առանձին JavaScrtipt մոդուլի։ Կոմպոնենտները կարող են ներկրել(import) դա և օգտագործել այդ ֆունկցիան, օբյեկտը կամ կլասը առանց ընդլայնելու այն։
