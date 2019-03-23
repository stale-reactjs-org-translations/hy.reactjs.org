---
id: composition-vs-inheritance
title: Կոմպոզիցիան ընդդեմ Ժառանգականության
permalink: docs/composition-vs-inheritance.html
redirect_from:
  - "docs/multiple-components.html"
prev: lifting-state-up.html
next: thinking-in-react.html
---

React-ը ունի կոմպոզիցիայի հզոր մոդել, և մենք խորհուրդ ենք տալիս օգտագործել կոմպոզիցիա ժառանգականության փոխարեն\` կոմպոնենտների միջև կոդը վերա-օգտագործելու համար։
React has a powerful composition model, and we recommend using composition instead of inheritance to reuse code between components.

Այս բաժնում, մենք կդիտարկենք մի քանի խնդիրներ, որտեղ ծրագրավորողները, որոնք նորեկ են React-ում, հաճախ հասնում են ժառանգականություն կիրառելով, և ցույց կտանք ինչպես լուծել այդ խնդիրները կոմպոզիցիայի միճոցով։
In this section, we will consider a few problems where developers new to React often reach for inheritance, and show how we can solve them with composition.

## Պահպանում {#containment}
## Containment {#containment}

Որոշ կոմպոնենտներ չգիտեն իրենց զավակների մասին ժամանակից շուտ։ Սա սովորական է հատկապես այնպիսի կոմպոնենտների համար, ինչպիսիք են `Sidebar`-ը կամ `Dialog`-ը, որոնք ներկայացնում ենք ընդհանուր «կաղապարներ»։
Some components don't know their children ahead of time. This is especially common for components like `Sidebar` or `Dialog` that represent generic "boxes".

Մենք խորհուրդ ենք տալիս այսպիսի կոմպոնենտերում օգտագործել հատուկ `children` prop\` փոխանցելու համար զավակ էլեմենտներին անմիջապես նրանց ելքային արժեքներ։
We recommend that such components use the special `children` prop to pass children elements directly into their output:

```js{4}
function FancyBorder(props) {
  return (
    <div className={'FancyBorder FancyBorder-' + props.color}>
      {props.children}
    </div>
  );
}
```

Սա թույլ է տալիս ուրիշ կոմպոնենտերի փոխանցել ցանկացած զավակների նրանց\` JSX-ում ներդրվածություններով։
This lets other components pass arbitrary children to them by nesting the JSX:

```js{4-9}
function WelcomeDialog() {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        Welcome
      </h1>
      <p className="Dialog-message">
        Thank you for visiting our spacecraft!
      </p>
    </FancyBorder>
  );
}
```

[**Փորձել CodePen-ում**](https://codepen.io/gaearon/pen/ozqNOV?editors=0010)

`<FancyBorder>`-ի JSX թեգի մեջ գտնվող ամեն ինչ փոխանցվում է `FancyBorder` կոմպոնենտին\` որպես `children` prop։ Քանի որ `FancyBorder`-ին արտապատկերում է `{props.children}`-ը `<div>`-ի մեջ, փոխանցված էլեմենտները հայտնվում են վերջնական ելքային արժեքում։
Anything inside the `<FancyBorder>` JSX tag gets passed into the `FancyBorder` component as a `children` prop. Since `FancyBorder` renders `{props.children}` inside a `<div>`, the passed elements appear in the final output.

Քանի դեռ սա քիչ հանդիպող է, ժամանակ առ ժամանակ դւոք կոմպոնենտում կարիք կունենաք բազմակի «անցքերի»։ Այդպիսի դեպքերում դուք կհանգեք ձեր իսկ պայմանավորվածությանը\` փոխարենը `children` օգտագործելու։
While this is less common, sometimes you might need multiple "holes" in a component. In such cases you may come up with your own convention instead of using `children`:

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

React էլեմենտները, ինչպիսիք են `<Contacts />`-ը և `<Chat />`-ը ուղղակի օբյեկներ են. այսպիսով դուք կարող եք փոխանցել նրանց որպես props ուրիշ ցանկացած տվյալի նման։ Այս մոտեղումը կարող է Ձեզ հիշացնել ուրիշ գրադարաններում «slot»-երի գաղափարը, սակայն այստեղ չկան սահմանափակումներ թե ինչ կփոխանցես React-ին որպես props.
React elements like `<Contacts />` and `<Chat />` are just objects, so you can pass them as props like any other data. This approach may remind you of "slots" in other libraries but there are no limitations on what you can pass as props in React.

## Մասնագիտացում {#specialization}
## Specialization {#specialization}

Հաճախ մենք մտածում ենք կոմպոնենտների մասին ինչպես «հատուկ դեպք» ուրիշ կոմպոնենտների։ Օրինակ, մոնք կարող ենք ասել, որ `WelcomeDialog`-ը `Dialog`-ի հատուկ դեպք է։
Sometimes we think about components as being "special cases" of other components. For example, we might say that a `WelcomeDialog` is a special case of `Dialog`.

React-ում, սա նույնպես ձեռք է բերվում կոմպոզիցիայով, որտեղ ավելի «սպեցիֆիկ» կոմպոնենտը արտապատկերում է ավելի «ընհանում» կոմպոնենտի և կարգավորում է այն prop-երով։
In React, this is also achieved by composition, where a more "specific" component renders a more "generic" one and configures it with props:

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
      title="Welcome"
      message="Thank you for visiting our spacecraft!" />
  );
}
```

[**Փորձել CodePen-ում**](https://codepen.io/gaearon/pen/kkEaOZ?editors=0010)

Կոմպոզիցիան աշխատում է հավասարապես լավ կոմպոնենտների համար\` հայտարաված որպես կլասներ։
Composition works equally well for components defined as classes:

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
      <Dialog title="Mars Exploration Program"
              message="How should we refer to you?">
        <input value={this.state.login}
               onChange={this.handleChange} />
        <button onClick={this.handleSignUp}>
          Sign Me Up!
        </button>
      </Dialog>
    );
  }

  handleChange(e) {
    this.setState({login: e.target.value});
  }

  handleSignUp() {
    alert(`Welcome aboard, ${this.state.login}!`);
  }
}
```

[**Փորձել CodePen-ում**](https://codepen.io/gaearon/pen/gwZbYa?editors=0010)

## Այսպիսով, իսկ ինչ կարող ենք ասել ժառանգականության մասին {#so-what-about-inheritance}
## So What About Inheritance? {#so-what-about-inheritance}

Facebook-ում, մենք օգտագործում ենք հազարավոր կոմպոնենտներ և մենք չենք գտել այնպիսի դեպքեր, որտեղ խորհուրդ կտաինք ստեղծել կոմպոնենտ ժառանգականության հեիրարխիաով։
At Facebook, we use React in thousands of components, and we haven't found any use cases where we would recommend creating component inheritance hierarchies.

Prop-երը և կոմպոզիցիան քեզ տալիս են այն բոլոր ճկունությունը, որի կարիքը կա կարգավորելու կոմպոնենտի տեսքը և պահվածքը բացահայտ եղանակով։ Հիեք. կոմպոնենտները կարող ենք ընդունել ցանկացած prop, այդ թվում տարրական արժեքներ, React էլեմենտներ և ֆունկցիաներ։
Props and composition give you all the flexibility you need to customize a component's look and behavior in an explicit and safe way. Remember that components may accept arbitrary props, including primitive values, React elements, or functions.

Եթե դուք ցանկանում ենք վերա-օգտագործել ոչ UI-ական ֆունկցիոնալություն կոմպոնենտների միջև, մենք կառաջարկենք տարանջատեք այն առանձին JavaScrtip մոդուլների։ Կոմպոնենտները կարող են ներկրել(import) դա և օգտագործել այդ ֆունկցիան, օբյեկտը կամ կլասը առանց ընդլայնելու այն։
If you want to reuse non-UI functionality between components, we suggest extracting it into a separate JavaScript module. The components may import it and use that function, object, or a class, without extending it.
