---
id: accessibility
title: Accessibility
title: Հասանելիություն
permalink: docs/accessibility.html
---

## Why Accessibility? {#why-accessibility}
## Ինչու հասանելիություն? {#why-accessibility}


Web accessibility (also referred to as [**a11y**](https://en.wiktionary.org/wiki/a11y)) is the design and creation of websites that can be used by everyone. Accessibility support is necessary to allow assistive technology to interpret web pages.
Վեբ հասանելիությունը (հղվում է նաև [**a11y**](https://en.wiktionary.org/wiki/a11y)) դա վեբ կայքի կառուցվածքն ու պատրաստումն է, որը կարող է օգտագործել յուրաքանչյուրը։ Հասանելիության ապահովումը անհրաժեշտ է, որպեսզի օգնող տեխնոլոգիաները հնարավորություն ունենան վեբ էջերը ինտերպրետացնելու։

React fully supports building accessible websites, often by using standard HTML techniques.
React֊ը լիովին հնարավորություն է տալիս սարքել հասանելի վեբ կայքեր, հաճախ օգտագործելով HTML֊ի ստանդարտ տեխնոլոգիաները։

## Standards and Guidelines {#standards-and-guidelines}
## Ստանդարտներ և Ուղեցույցեր {#standards-and-guidelines}


### WCAG {#wcag}
### WCAG {#wcag}

The [Web Content Accessibility Guidelines](https://www.w3.org/WAI/intro/wcag) provides guidelines for creating accessible web sites.
Վեբ [բովանդակության հասնաելիության ուղեցույցը](https://www.w3.org/WAI/intro/wcag) տրամադրում է հասանելի վեբ կայքեր սարքելու ուղեցույց։

The following WCAG checklists provide an overview:
WCAG֊ի հետևյալ ցուցակները տրամադրված են դիտարկման\`

- [WCAG ցուցակ Wuhcag֊ից](https://www.wuhcag.com/wcag-checklist/)
- [WCAG ցուցակ WebAIM֊ից](https://webaim.org/standards/wcag/checklist)
- [Ցուցակ A11Y ծրագրից](https://a11yproject.com/checklist.html)

### WAI-ARIA {#wai-aria}

The [Web Accessibility Initiative - Accessible Rich Internet Applications](https://www.w3.org/WAI/intro/aria) document contains techniques for building fully accessible JavaScript widgets.
[Վեբ հասանելիության Նախաձեռնություն - Հարուստ հասանելիությամբ ինտերնետ հավելվածներ](https://www.w3.org/WAI/intro/aria) փաստաթուղթը պարունակում է լիովին հասանելի JavaScript ոիդգետներ կառուցելու տեխնոլոգիաներ։

Note that all `aria-*` HTML attributes are fully supported in JSX. Whereas most DOM properties and attributes in React are camelCased, these attributes should be hyphen-cased (also known as kebab-case, lisp-case, etc) as they are in plain HTML:
Ուշադրություն դարձրեք, որ բոլոր `aria-*` HTML ատրիբուտները լրիվ սպասարկվում են JSX֊ի կողմից։ Ի տարբերությունDOM֊ի մյուս ատրիբուտների և հատկություների, որոնք React֊ում ուղտագիր են, սրանք պետք է լինեն շեղագիր(հայտնի է նաև ինչպես քաբաբագիր, lisp-case, և այլն), ինչպես մաքուր HTML ֊ում։

```javascript{3,4}
<input
  type="text"
  aria-label={labelText}
  aria-required="true"
  onChange={onchangeHandler}
  value={inputValue}
  name="name"
/>
```

## Semantic HTML {#semantic-html}
## Իմաստային HTML {#semantic-html}

Semantic HTML is the foundation of accessibility in a web application. Using the various HTML elements to reinforce the meaning of information
in our websites will often give us accessibility for free.
Իմաստային HTML֊ը վեբ հավելվածում հասանելիության հիմնադրամ է։ Մեր վեբ կայքերում HTML տարբեր էլեմենտների օգտագործումը ինֆորմացիան նշանակալի դարձնելու համար, հաճախ ուղղակի օժտում է մեզ հասանելիությամբ;

- [MDN HTML elements reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Element)
- [MDN HTML էլեմենտներ](https://developer.mozilla.org/en-US/docs/Web/HTML/Element)

Sometimes we break HTML semantics when we add `<div>` elements to our JSX to make our React code work, especially when working with lists (`<ol>`, `<ul>` and `<dl>`) and the HTML `<table>`.
Երբեմն մենք փչացնում ենք HTML իմաստը, երբ `<div>` ենք ավելացնում մեր JSX֊ին, որպեզի մեր React կոդը աշխատի, հատկապես երբ աշխատում ենք ցուցակների (`<ol>`, `<ul>` կամ `<dl>`) կամ HTML `<table>`֊ի հետ։
In these cases we should rather use [React Fragments](/docs/fragments.html) to group together multiple elements.
Նման դեպքերում մենք պետք է անշուշտ օգտագործենք [React Հատվածներ](/docs/fragments.html), որպեսզի խմբավորենք միասին բազմակի էլեմենտներ։

For example,
Օրինակ\`

```javascript{1,5,8}
import React, { Fragment } from 'react';

function ListItem({ item }) {
  return (
    <Fragment>
      <dt>{item.term}</dt>
      <dd>{item.description}</dd>
    </Fragment>
  );
}

function Glossary(props) {
  return (
    <dl>
      {props.items.map(item => (
        <ListItem item={item} key={item.id} />
      ))}
    </dl>
  );
}
```

You can map a collection of items to an array of fragments as you would any other type of element as well:
Դուք կարող եք արտապատկերել առարկաների զանգվածը հատվածներով, ինչպես և ցանկացած այլ էլեմենտ`

```javascript{6,9}
function Glossary(props) {
  return (
    <dl>
      {props.items.map(item => (
        // Fragments should also have a `key` prop when mapping collections
        <Fragment key={item.id}>
          <dt>{item.term}</dt>
          <dd>{item.description}</dd>
        </Fragment>
      ))}
    </dl>
  );
}
```

When you don't need any props on the Fragment tag you can use the [short syntax](/docs/fragments.html#short-syntax), if your tooling supports it:
Երբ դուք կարիք չունեք որևէ prop լինի հատված tagի վրա  դուք կարող եք օգտագործել [կարճ գրառումը](/docs/fragments.html#short-syntax), եթե ձեր գործիքները նպաստում են դրան\`

```javascript{3,6}
function ListItem({ item }) {
  return (
    <>
      <dt>{item.term}</dt>
      <dd>{item.description}</dd>
    </>
  );
}
```

For more info, see [the Fragments documentation](/docs/fragments.html).
Մանրամասների համար նայեք [Հատվածների փաստաթուղթը](/docs/fragments.html)։

## Accessible Forms {#accessible-forms}
## Հասանելի ձևեր {#accessible-forms}

### Labeling {#labeling}
### Անվանադրություն {#անվանադրություն}
Every HTML form control, such as `<input>` and `<textarea>`, needs to be labeled accessibly. We need to provide descriptive labels that are also exposed to screen readers.
Յուրաքանչյուր HTML ձևի հսկողություն, ինչպիսիք են `<input>` կամ `<textarea>`, պահանջում են հասանելի անվանում․ Մենք պետք է տրամադրենք բնութագրող անվանումներ, որոնք կցուցադրվեն նաև ընթերցողին։

The following resources show us how to do this:
Հետևյալ ռեսուրսները ցույց են տալիս, թե ինչպես\`

- [The W3C shows us how to label elements](https://www.w3.org/WAI/tutorials/forms/labels/)
- [W3C֊ը ցույց է տալիս ինչպես անվանադրել էլեմենտները](https://www.w3.org/WAI/tutorials/forms/labels/)
- [WebAIM֊ը ցույց է տալիս ինչպես անվանադրել էլեմենտները](https://webaim.org/techniques/forms/controls)
- [Paciello Group֊ը բացատրում է հասանելի անունները](https://www.paciellogroup.com/blog/2017/04/what-is-an-accessible-name/)

Although these standard HTML practices can be directly used in React, note that the `for` attribute is written as `htmlFor` in JSX:
Ինչպես նաև այսպիսի ստանդարտ HTML հմտությունները կարող են օգտագործվել անմիջապես React֊ում, նշենք որ `for` attribute֊ը գրված է `htmlFor` JSX֊ում\`

```javascript{1}
<label htmlFor="namedInput">Անուն\`</label>
<input id="namedInput" type="text" name="name"/>
```

### Notifying the user of errors {#notifying-the-user-of-errors}
### Տեղեկացում օգտատիրոջը սխալների մասին {#notifying-the-user-of-errors}

Error situations need to be understood by all users. The following link shows us how to expose error texts to screen readers as well:
Սխալ իրադրությունները պետք է հասկանալի լինեն բոլոր օգտատերերի համար։ Հետևյալ հղումները սովորեցնում են, ինչպես ցուցադրել սխալ տեքստերը ընթերողին\`

- [The W3C demonstrates user notifications](https://www.w3.org/WAI/tutorials/forms/notifications/)
- [W3C֊ը ցուցադրում է օգտատիրոջ ծանուցումները](https://www.w3.org/WAI/tutorials/forms/notifications/)
- [WebAIM looks at form validation](https://webaim.org/techniques/formvalidation/)
- [WebAIM ցուցդադրում է ձևի վավերացումը](https://webaim.org/techniques/formvalidation/)

## Focus Control {#focus-control}
## Ֆոկուսի կառավարում {#focus-control}

Ensure that your web application can be fully operated with the keyboard only:
Համոզվեք, որ ձեր վեբ հավելվածը հնարավոր է լրիվ օգտագործել ստեղնաշարի միջոցով\`

- [WebAIM talks about keyboard accessibility](https://webaim.org/techniques/keyboard/)
- [WebAIM֊ը խոսում է ստեղնաշարի հասանելիութհունից](https://webaim.org/techniques/keyboard/)

### Keyboard focus and focus outline {#keyboard-focus-and-focus-outline}
### Ստեղնաշարի ֆոկուս և Ֆոկուսի եզրագծեր {#ստեղնաշարի֊ֆոկուս֊և֊Ֆոկուսի֊եզրագծեր}

Keyboard focus refers to the current element in the DOM that is selected to accept input from the keyboard. We see it everywhere as a focus outline similar to that shown in the following image:
Ստեղնաշարի ֆոկուսը վերաբերվում է DOM֊ում արդի էլեմենտին, որը ընտրված է ստեղնաշարի մուտքային տվյալները ընդունելուն։ Մենք ամենուրեք տեսնում ենք, որ ֆոկուսի ուրվագիծը նման է հետևյալ ցուցադրված նկարին\`

<img src="../images/docs/keyboard-focus.png" alt="Blue keyboard focus outline around a selected link." />
<img src="../images/docs/keyboard-focus.png" alt="Ստեղնաշարի ֆոկուսի կապույտ ուրվագիծ նշված հղման շուրջը։" />

Only ever use CSS that removes this outline, for example by setting `outline: 0`, if you are replacing it with another focus outline implementation.
Հեռացրեք ուրվագիծը, օրինակ `outline: 0` սահմանելով, CSS֊ի միջոցով միայն, եթե դուք այն փոխարինելու եք ֆոկուսի ուրվագծի ուրիշ տարբերակով։

### Mechanisms to skip to desired content {#mechanisms-to-skip-to-desired-content}
### Ցանկալի բովանդակությանը անցնելու մեխանիզմներ {#mechanisms-to-skip-to-desired-content}

Provide a mechanism to allow users to skip past navigation sections in your application as this assists and speeds up keyboard navigation.
Տրամադրեք մեխանիզմեր, որոնք օգտատերերին թույլ կտան ձեր հավելվածում անցնել նախկին ղեկավարման բաժին, քանի որ դա օգնում և արագացնում է ստեղնաշարի ղեկավարումը։

Skiplinks or Skip Navigation Links are hidden navigation links that only become visible when keyboard users interact with the page. They are very easy to implement with
internal page anchors and some styling:
Skiplinks կամ անցման ղեկավարման հղումները թաքնված ղեկավարման հղումներ են, որոն դառնում են տեսնալի, երբ օգտատիրոջ ստեղնաշարը փոխազդում է էջի հետ։ Դրանք շատ հեշտ է սարքել ներսի էջի խարիսխներով և մի քիչ 

- [WebAIM - Skip Navigation Links](https://webaim.org/techniques/skipnav/)
- [WebAIM - Անցման ղեկավարման հղումներ](https://webaim.org/techniques/skipnav/)

Also use landmark elements and roles, such as `<main>` and `<aside>`, to demarcate page regions as assistive technology allow the user to quickly navigate to these sections.
Նաև օգտագործեք ուղենշային էլեմենտներ և նշանակություններ, ինչպիսիք են `<main>` կամ `<aside>`, որ էջի տարբեր մասերը տարանջատենք որպես օգնական տեխնոլոգիա, որը օգտատիրոջը թույլ կտա արագ տեղափոխվել ուրիշ բաժիններ։

Read more about the use of these elements to enhance accessibility here:
Հասանելիության բարձրացման համար կարդացեք այս էլեմենտների օգտագործման մասին ավելին\`

- [Հասանելի ուղենիշեր](https://www.scottohara.me/blog/2018/03/03/landmarks.html)

### Programmatically managing focus {#programmatically-managing-focus}
### Ծրագրային ղեկավարել ֆոկուսը {#programmatically-managing-focus}

Our React applications continuously modify the HTML DOM during runtime, sometimes leading to keyboard focus being lost or set to an unexpected element. In order to repair this,
we need to programmatically nudge the keyboard focus in the right direction. For example, by resetting keyboard focus to a button that opened a modal window after that modal window is closed.
Մեր React հավելվածները շարունակական փոփոխում են HTML DOM֊ը կատարման ընթացքում, որը երբեմն հանգեցնում է ստեղնաշարի ֆոկուսի կորստի կամ անսպասելի էլեմենտի վրա հայտնվելուն։ Ուղղելու համար, մենք պետք է ծրագրային շտկեո ստեղնաշարի ֆոկուսը ճիշտ ուղղությամբ։ Օրինակ\` հետ վերադարձնելով ստեղնաշարի ֆոկուսը այն կոճակին, որը բացել է մոդալ պատուհանը, մոդալ պատուհանի փակվելուց հետո։

MDN Web Docs takes a look at this and describes how we can build [keyboard-navigable JavaScript widgets](https://developer.mozilla.org/en-US/docs/Web/Accessibility/Keyboard-navigable_JavaScript_widgets).
MDN Վեբ փաստաթղթավորումը ուշադրություն է դարձրել սրան և նկարագրել ինչպես կարող ենք սարքել [ստեղնաշարային-ղեկավարվող JavaScript widgetներ](https://developer.mozilla.org/en-US/docs/Web/Accessibility/Keyboard-navigable_JavaScript_widgets).

To set focus in React, we can use [Refs to DOM elements](/docs/refs-and-the-dom.html).
React֊ում Ֆոկուսը սահամանելու համար մենք կարող ենք օգտագործել [Հղումներ DOM էլեմենտներին](/docs/refs-and-the-dom.html).

Using this, we first create a ref to an element in the JSX of a component class:
Օգտագործելով սա, մենք նախ և առաջ ստեղծում ենք հղում կոմպենենտ կլասի JSX֊ի էլեմենտի վրա\`

```javascript{4-5,8-9,13}
class CustomTextInput extends React.Component {
  constructor(props) {
    super(props);
    // Create a ref to store the textInput DOM element
    // Ստեղծենք հղում textInput DOM էլէմենտը պահելու համար
    this.textInput = React.createRef();
  }
  render() {
  // Use the `ref` callback to store a reference to the text input DOM
  // element in an instance field (for example, this.textInput).
  // Օգտագործեք `ref` հետկանչի ֆունկցիան տեքստային մուտքագրման DOM
  // էլեմենտի հղումը օրինակի դաշտում պահելու համար  (Օրինակ\` this.textInput).
    return (
      <input
        type="text"
        ref={this.textInput}
      />
    );
  }
}
```

Then we can focus it elsewhere in our component when needed:
Հետո մենք կարող ենք ֆոկուսը տեղադրել մեր կոմպոնենտում որևէ տեղ երբ պետք լինի\`

 ```javascript
 focus() {
   // Explicitly focus the text input using the raw DOM API
   // Ուղղակի ֆոկուսը տեղափոխեք տեքսատային մուտքագրումը օգտագործելով մաքուր DOM API
   // Note: we're accessing "current" to get the DOM node
   // Նշում\` մենք վերցնում ենք "current"֊ը, որ հասնենք DOM հանգույցին
   this.textInput.current.focus();
 }
 ```

Sometimes a parent component needs to set focus to an element in a child component. We can do this by [exposing DOM refs to parent components](/docs/refs-and-the-dom.html#exposing-dom-refs-to-parent-components)
through a special prop on the child component that forwards the parent's ref to the child's DOM node.
Երբեմն ծնող կոմպոնենտը կարիք ունի ֆոկուս տեղադրելու ժառանգ կոմպոնենտի էլեմենտի վրա։ Մենք կարող ենք դա անել DOM հղումները ծնող կոմպոնենտներին տրամադրելով](/docs/refs-and-the-dom.html#exposing-dom-refs-to-parent-components) ժառանգ կոմպոնենտի հատուկ prop֊ի միջոցով, որը 
ուղարկում է ծնողի հղումը, ժառանգ DOM հանգույցին։
```javascript{4,12,16}
function CustomTextInput(props) {
  return (
    <div>
      <input ref={props.inputRef} />
    </div>
  );
}

class Parent extends React.Component {
  constructor(props) {
    super(props);
    this.inputElement = React.createRef();
  }
  render() {
    return (
      <CustomTextInput inputRef={this.inputElement} />
    );
  }
}

// Now you can set focus when required.
// Այժմ դուք կարող եք ֆոկուսը տեղադրել երբ անհրաժեշտ է։
this.inputElement.current.focus();
```

When using a HOC to extend components, it is recommended to [forward the ref](/docs/forwarding-refs.html) to the wrapped component using the `forwardRef` function of React. If a third party HOC
does not implement ref forwarding, the above pattern can still be used as a fallback.
Երբ կոմպոնենտները ընդլայնելու համար HOC ես օգտագործում, խորհուրդ է տրվում ուղարկել հղումը ներդրված կոմպոնենտին օգտագործելով React֊ի `forwardRef` ֆունկցիան։ Եթե միջնորդ HOC֊ը չի կիրառում հղման ուղարկում, ապա վերը նշված ձևը կարող է օգտագործվել որպես պահեստային տարբերակ։

A great focus management example is the [react-aria-modal](https://github.com/davidtheclark/react-aria-modal). This is a relatively rare example of a fully accessible modal window. Not only does it set initial focus on
the cancel button (preventing the keyboard user from accidentally activating the success action) and trap keyboard focus inside the modal, it also resets focus back to the element that
initially triggered the modal.
Ֆոկուսի կառավարման հրաշալի օրինակ է [react-aria-modal](https://github.com/davidtheclark/react-aria-modal)։ Սա լրիվ հասանելի մոդալ պատուհանի համեմատաբար լավ տարբերակ է։ Սա ոչ միայն սահմանում է սկզբանական ֆոկուսը չեղարկելու կոչակի վրա (խոչնդոտելով ստեղնաշարից օգտվողին պատահաբար ակտիվացնել հաջողակ գործողությունը) և հեռացնում ստեղնաշարի ֆոկուսը մոդալի ներսից, այլև վերադարձնում է ֆոկուսը հետ այն էլեմենտին, որը ի սկզբանե ազդել էր մոդալի վրա։

>Note:
>
>While this is a very important accessibility feature, it is also a technique that should be used judiciously. Use it to repair the keyboard focus flow when it is disturbed, not to try and anticipate how
>users want to use applications.
>Նշում:
>
>Բացի նրանից, որ սա շատ կարևոր հասանելիության ֆունկցիոնալ է, սա նաև տեխնիկա է, որը պետք է կշռադատված օգտագործել. Օգտագործեք այն ստեղնաշարի ֆոկուսի սահունության վերականգնման համար, երբ այն խախտված է, ոչ թե փորձեք կամ կանխատեսեք ինչպես
>օգտատերերը կցանկանային օգտագործել հավելվածները.

## Mouse and pointer events {#mouse-and-pointer-events}
## Մկնին և սլաքի իրադարձություններ {#mouse-and-pointer-events}

Ensure that all functionality exposed through a mouse or pointer event can also be accessed using the keyboard alone. Depending only on the pointer device will lead to many cases where
keyboard users cannot use your application.
Համոզվեք որ ամբողջ ֆունկցիոնալը տրամադրված մկնիկի կամ սլաքի իրադարփությունով, նաև հասանելի են մենակ ստեղնաշարի օգտագործմամբ։ Հենվելով մենակ սլաքային սարքերի վրա, կտանի դեպի բազում դեպքեր, երբ ստեղնաշարիղ օգտվողը չի կարողանա օգտվել ձեր հավելվածից։

To illustrate this, let's look at a prolific example of broken accessibility caused by click events. This is the outside click pattern, where a user can disable an opened popover by clicking outside the element.
Սա ցուցադրելու համար, եկեք դիտարկենք քլիքի իրադարձությունների հետևանքով վնասված հասանելիությամբ առատ օրինակ։ Սա արտաքին մասի քլիքի օրինակ է, որտեղ օգտատերը կարող է փակել բացված popover էլեմենտից դուրս քլիք անելով։

<img src="../images/docs/outerclick-with-mouse.gif" alt="A toggle button opening a popover list implemented with the click outside pattern and operated with a mouse showing that the close action works." />
<img src="../images/docs/outerclick-with-mouse.gif" alt="Դրոշակ կոչակ, որը բացում է popover ցուցակը իրագործված դրսի քլիք տարբերակով և մկնիկի կողմից մշակվող, որը ցույցադրում է փակել գործողության աշխատանքը։" />

This is typically implemented by attaching a `click` event to the `window` object that closes the popover:
Սա սովորաբար իրականացվում է `click` իրադարձությունը `window` օբյեկտին կցելով, որը փակում է popover֊ը։

```javascript{12-14,26-30}
class OuterClickExample extends React.Component {
constructor(props) {
    super(props);

    this.state = { isOpen: false };
    this.toggleContainer = React.createRef();

    this.onClickHandler = this.onClickHandler.bind(this);
    this.onClickOutsideHandler = this.onClickOutsideHandler.bind(this);
  }

  componentDidMount() {
    window.addEventListener('click', this.onClickOutsideHandler);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.onClickOutsideHandler);
  }

  onClickHandler() {
    this.setState(currentState => ({
      isOpen: !currentState.isOpen
    }));
  }

  onClickOutsideHandler(event) {
    if (this.state.isOpen && !this.toggleContainer.current.contains(event.target)) {
      this.setState({ isOpen: false });
    }
  }

  render() {
    return (
      <div ref={this.toggleContainer}>
        <button onClick={this.onClickHandler}>Select an option</button>
        {this.state.isOpen ? (
          <ul>
            <li>Option 1</li>
            <li>Option 2</li>
            <li>Option 3</li>
          </ul>
        ) : null}
      </div>
    );
  }
}
```

This may work fine for users with pointer devices, such as a mouse, but operating this with the keyboard alone leads to broken functionality when tabbing to the next element
as the `window` object never receives a `click` event. This can lead to obscured functionality which blocks users from using your application.

<img src="../images/docs/outerclick-with-keyboard.gif" alt="A toggle button opening a popover list implemented with the click outside pattern and operated with the keyboard showing the popover not being closed on blur and it obscuring other screen elements." />

The same functionality can be achieved by using an appropriate event handlers instead, such as `onBlur` and `onFocus`:
Միևնույն ֆունկցիոնալին կարելի է հասնել փոխարնեը օգտագործելով համապատասխան իրադարձություն մշակողներ, ինչպիսիք են `onBlur` կամ `onFocus`։

```javascript{19-29,31-34,37-38,40-41}
class BlurExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = { isOpen: false };
    this.timeOutId = null;

    this.onClickHandler = this.onClickHandler.bind(this);
    this.onBlurHandler = this.onBlurHandler.bind(this);
    this.onFocusHandler = this.onFocusHandler.bind(this);
  }

  onClickHandler() {
    this.setState(currentState => ({
      isOpen: !currentState.isOpen
    }));
  }

  // We close the popover on the next tick by using setTimeout.
  // This is necessary because we need to first check if
  // another child of the element has received focus as
  // the blur event fires prior to the new focus event.
  onBlurHandler() {
    this.timeOutId = setTimeout(() => {
      this.setState({
        isOpen: false
      });
    });
  }

  // If a child receives focus, do not close the popover.
  onFocusHandler() {
    clearTimeout(this.timeOutId);
  }

  render() {
    // React assists us by bubbling the blur and
    // focus events to the parent.
    return (
      <div onBlur={this.onBlurHandler}
           onFocus={this.onFocusHandler}>
        <button onClick={this.onClickHandler}
                aria-haspopup="true"
                aria-expanded={this.state.isOpen}>
          Select an option
        </button>
        {this.state.isOpen ? (
          <ul>
            <li>Option 1</li>
            <li>Option 2</li>
            <li>Option 3</li>
          </ul>
        ) : null}
      </div>
    );
  }
}
```

This code exposes the functionality to both pointer device and keyboard users. Also note the added `aria-*` props to support screen-reader users. For simplicity's sake
the keyboard events to enable `arrow key` interaction of the popover options have not been implemented.

<img src="../images/docs/blur-popover-close.gif" alt="A popover list correctly closing for both mouse and keyboard users." />

This is one example of many cases where depending on only pointer and mouse events will break functionality for keyboard users. Always testing with the keyboard will immediately
highlight the problem areas which can then be fixed by using keyboard aware event handlers.

## More Complex Widgets {#more-complex-widgets}

A more complex user experience should not mean a less accessible one. Whereas accessibility is most easily achieved by coding as close to HTML as possible,
even the most complex widget can be coded accessibly.

Here we require knowledge of [ARIA Roles](https://www.w3.org/TR/wai-aria/#roles) as well as [ARIA States and Properties](https://www.w3.org/TR/wai-aria/#states_and_properties).
These are toolboxes filled with HTML attributes that are fully supported in JSX and enable us to construct fully accessible, highly functional React components.

Each type of widget has a specific design pattern and is expected to function in a certain way by users and user agents alike:

- [WAI-ARIA Authoring Practices - Design Patterns and Widgets](https://www.w3.org/TR/wai-aria-practices/#aria_ex)
- [Heydon Pickering - ARIA Examples](https://heydonworks.com/practical_aria_examples/)
- [Inclusive Components](https://inclusive-components.design/)

## Other Points for Consideration {#other-points-for-consideration}

### Setting the language {#setting-the-language}

Indicate the human language of page texts as screen reader software uses this to select the correct voice settings:

- [WebAIM - Document Language](https://webaim.org/techniques/screenreader/#language)

### Setting the document title {#setting-the-document-title}

Set the document `<title>` to correctly describe the current page content as this ensures that the user remains aware of the current page context:

- [WCAG - Understanding the Document Title Requirement](https://www.w3.org/TR/UNDERSTANDING-WCAG20/navigation-mechanisms-title.html)

We can set this in React using the [React Document Title Component](https://github.com/gaearon/react-document-title).

### Color contrast {#color-contrast}

Ensure that all readable text on your website has sufficient color contrast to remain maximally readable by users with low vision:

- [WCAG - Understanding the Color Contrast Requirement](https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html)
- [Everything About Color Contrast And Why You Should Rethink It](https://www.smashingmagazine.com/2014/10/color-contrast-tips-and-tools-for-accessibility/)
- [A11yProject - What is Color Contrast](https://a11yproject.com/posts/what-is-color-contrast/)

It can be tedious to manually calculate the proper color combinations for all cases in your website so instead, you can [calculate an entire accessible color palette with Colorable](https://jxnblk.com/colorable/).

Both the aXe and WAVE tools mentioned below also include color contrast tests and will report on contrast errors.

If you want to extend your contrast testing abilities you can use these tools:

- [WebAIM - Color Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [The Paciello Group - Color Contrast Analyzer](https://www.paciellogroup.com/resources/contrastanalyser/)

## Development and Testing Tools {#development-and-testing-tools}

There are a number of tools we can use to assist in the creation of accessible web applications.

### The keyboard {#the-keyboard}

By far the easiest and also one of the most important checks is to test if your entire website can be reached and used with the keyboard alone. Do this by:

1. Plugging out your mouse.
1. Using `Tab` and `Shift+Tab` to browse.
1. Using `Enter` to activate elements.
1. Where required, using your keyboard arrow keys to interact with some elements, such as menus and dropdowns.

### Development assistance {#development-assistance}

We can check some accessibility features directly in our JSX code. Often intellisense checks are already provided in JSX aware IDE's for the ARIA roles, states and properties. We also
have access to the following tool:

#### eslint-plugin-jsx-a11y {#eslint-plugin-jsx-a11y}

The [eslint-plugin-jsx-a11y](https://github.com/evcohen/eslint-plugin-jsx-a11y) plugin for ESLint provides AST linting feedback regarding accessibility issues in your JSX. Many
IDE's allow you to integrate these findings directly into code analysis and source code windows.

[Create React App](https://github.com/facebookincubator/create-react-app) has this plugin with a subset of rules activated. If you want to enable even more accessibility rules,
you can create an `.eslintrc` file in the root of your project with this content:

  ```json
  {
    "extends": ["react-app", "plugin:jsx-a11y/recommended"],
    "plugins": ["jsx-a11y"]
  }
  ```

### Testing accessibility in the browser {#testing-accessibility-in-the-browser}

A number of tools exist that can run accessibility audits on web pages in your browser. Please use them in combination with other accessibility checks mentioned here as they can only
test the technical accessibility of your HTML.

#### aXe, aXe-core and react-axe {#axe-axe-core-and-react-axe}

Deque Systems offers [aXe-core](https://github.com/dequelabs/axe-core) for automated and end-to-end accessibility tests of your applications. This module includes integrations for Selenium.

[The Accessibility Engine](https://www.deque.com/products/axe/) or aXe, is an accessibility inspector browser extension built on `aXe-core`.

You can also use the [react-axe](https://github.com/dylanb/react-axe) module to report these accessibility findings directly to the console while developing and debugging.

#### WebAIM WAVE {#webaim-wave}

The [Web Accessibility Evaluation Tool](https://wave.webaim.org/extension/) is another accessibility browser extension.

#### Accessibility inspectors and the Accessibility Tree {#accessibility-inspectors-and-the-accessibility-tree}

[The Accessibility Tree](https://www.paciellogroup.com/blog/2015/01/the-browser-accessibility-tree/) is a subset of the DOM tree that contains accessible objects for every DOM element that should be exposed
to assistive technology, such as screen readers.

In some browsers we can easily view the accessibility information for each element in the accessibility tree:

- [Using the Accessibility Inspector in Firefox](https://developer.mozilla.org/en-US/docs/Tools/Accessibility_inspector)
- [Activate the Accessibility Inspector in Chrome](https://gist.github.com/marcysutton/0a42f815878c159517a55e6652e3b23a)
- [Using the Accessibility Inspector in OS X Safari](https://developer.apple.com/library/content/documentation/Accessibility/Conceptual/AccessibilityMacOSX/OSXAXTestingApps.html)

### Screen readers {#screen-readers}

Testing with a screen reader should form part of your accessibility tests.

Please note that browser / screen reader combinations matter. It is recommended that you test your application in the browser best suited to your screen reader of choice.

### Commonly Used Screen Readers {#commonly-used-screen-readers}

#### NVDA in Firefox {#nvda-in-firefox}

[NonVisual Desktop Access](https://www.nvaccess.org/) or NVDA is an open source Windows screen reader that is widely used.

Refer to the following guides on how to best use NVDA:

- [WebAIM - Using NVDA to Evaluate Web Accessibility](https://webaim.org/articles/nvda/)
- [Deque - NVDA Keyboard Shortcuts](https://dequeuniversity.com/screenreaders/nvda-keyboard-shortcuts)

#### VoiceOver in Safari {#voiceover-in-safari}

VoiceOver is an integrated screen reader on Apple devices.

Refer to the following guides on how activate and use VoiceOver:

- [WebAIM - Using VoiceOver to Evaluate Web Accessibility](https://webaim.org/articles/voiceover/)
- [Deque - VoiceOver for OS X Keyboard Shortcuts](https://dequeuniversity.com/screenreaders/voiceover-keyboard-shortcuts)
- [Deque - VoiceOver for iOS Shortcuts](https://dequeuniversity.com/screenreaders/voiceover-ios-shortcuts)

#### JAWS in Internet Explorer {#jaws-in-internet-explorer}

[Job Access With Speech](https://www.freedomscientific.com/Products/software/JAWS/) or JAWS, is a prolifically used screen reader on Windows.

Refer to the following guides on how to best use JAWS:

- [WebAIM - Using JAWS to Evaluate Web Accessibility](https://webaim.org/articles/jaws/)
- [Deque - JAWS Keyboard Shortcuts](https://dequeuniversity.com/screenreaders/jaws-keyboard-shortcuts)

### Other Screen Readers {#other-screen-readers}

#### ChromeVox in Google Chrome {#chromevox-in-google-chrome}

[ChromeVox](https://www.chromevox.com/) is an integrated screen reader on Chromebooks and is available [as an extension](https://chrome.google.com/webstore/detail/chromevox/kgejglhpjiefppelpmljglcjbhoiplfn?hl=en) for Google Chrome.

Refer to the following guides on how best to use ChromeVox:

- [Google Chromebook Help - Use the Built-in Screen Reader](https://support.google.com/chromebook/answer/7031755?hl=en)
- [ChromeVox Classic Keyboard Shortcuts Reference](https://www.chromevox.com/keyboard_shortcuts.html)
