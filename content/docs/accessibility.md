---
id: accessibility
title: Հասանելիություն
permalink: docs/accessibility.html
---

## Ինչու՞ հասանելիություն {#why-accessibility}

Վեբ հասանելիությունը (հղվում է նաև [**a11y**](https://en.wiktionary.org/wiki/a11y)-ին) այնպիսի վեբ կայքի կառուցվածքն ու պատրաստումն է, որը կարող է օգտագործել յուրաքանչյուրը։ Հասանելիության ապահովումը անհրաժեշտ է, որպեսզի օգնական տեխնոլոգիաները հնարավորություն ունենան վեբ էջերը ինտերպրետացնելու։

React֊ը լիովին հնարավորություն է տալիս սարքել հասանելի վեբ կայքեր, հաճախ օգտագործելով HTML֊ի ստանդարտ գործելակերպեր։

## Ստանդարտներ և ուղեցույցներ {#standards-and-guidelines}

### WCAG {#wcag}

[Վեբ բովանդակության հասնաելիության ուղեցույցը](https://www.w3.org/WAI/intro/wcag) տրամադրում է ուղեցույց հասանելի վեբ կայքեր ստեղծելու համար։ 

WCAG֊ի հետևյալ ցուցակները տրամադրված են դիտարկման\`

- [WCAG ցուցակ Wuhcag֊ից](https://www.wuhcag.com/wcag-checklist/)
- [WCAG ցուցակ WebAIM֊ից](https://webaim.org/standards/wcag/checklist)
- [Ցուցակ A11Y ծրագրից](https://a11yproject.com/checklist.html)

### WAI-ARIA {#wai-aria}

[Վեբ հասանելիության նախաձեռնություն - հարուստ հասանելիությամբ ինտերնետ հավելվածներ](https://www.w3.org/WAI/intro/aria) փաստաթուղթը պարունակում է լիովին հասանելի JavaScript widget-ներ կառուցելու գործելակերպեր։

Ուշադրություն դարձրեք, որ բոլոր `aria-*` HTML ատրիբուտները լրիվ սպասարկվում են JSX֊ի կողմից։ Ի տարբերություն DOM֊ի մյուս ատրիբուտների և հատկություների, որոնք React֊ում ուղտագիր են, սրանք պետք է լինեն գծիկագիր(հայտնի է նաև ինչպես քաբաբագիր, լիսպագիր, և այլն), ինչպես մաքուր HTML ֊ում։

```javascript{3,4}
<input
  type="text"
  aria-label={labelText}
  aria-required="true"
  onChange={onchangeHandler}
  value={inputValue}
  name="անուն"
/>
```

## Իմաստավոր HTML {#semantic-html}

Իմաստային HTML֊ը վեբ հավելվածում հասանելիության հիմքն է։ Մեր վեբ կայքերում HTML տարբեր էլեմենտների օգտագործումը ինֆորմացիան նշանակալի դարձնելու համար,
հաճախ ուղղակի օժտում է մեզ հասանելիությամբ։

- [MDN HTML էլեմենտներ](https://developer.mozilla.org/en-US/docs/Web/HTML/Element)

Երբեմն մենք փչացնում ենք HTML իմաստաբանությունը, երբ `<div>` ենք ավելացնում մեր JSX֊ին, որպեզի մեր React կոդը աշխատի, հատկապես երբ աշխատում ենք ցուցակների (`<ol>`, `<ul>` կամ `<dl>`) կամ HTML `<table>`֊ի հետ։
Նման դեպքերում մենք պետք է անշուշտ օգտագործենք [React Fragment-ներ](/docs/fragments.html), որպեսզի խմբավորենք միասին բազմաթիվ էլեմենտներ։

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

Դուք կարող եք արտապատկերել առարկաների զանգվածը fragment-ներով, ինչպես և ցանկացած այլ էլեմենտ\`

```javascript{6,9}
function Glossary(props) {
  return (
    <dl>
      {props.items.map(item => (
        // Fragment-ը նաև պարտադիր պետք է ունենա `key` prop, երբ արտապատկերում ենք հավաքածուներ
        <Fragment key={item.id}>
          <dt>{item.term}</dt>
          <dd>{item.description}</dd>
        </Fragment>
      ))}
    </dl>
  );
}
```

Երբ դուք կարիք չունեք որևէ prop լինի Fragment tag-ի վրա, դուք կարող եք օգտագործել [կարճ գրառումը](/docs/fragments.html#short-syntax), եթե ձեր գործիքները նպաստում են դրան\`

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

Մանրամասների համար նայեք [Fragment-ների փաստաթուղթը](/docs/fragments.html)։

## Հասանելի form-եր {#accessible-forms}

### Անվանադրություն {#labeling}
Յուրաքանչյուր HTML form-ի կառավարում, ինչպիսիք են `<input>` կամ `<textarea>`, պահանջում են հասանելի անվանում։ Մենք պետք է տրամադրենք բնութագրող անվանումներ, որոնք կտրամադրվեն նաև էկրան կարդացողներին։

Հետևյալ ռեսուրսները ցույց են տալիս, թե ինչպես\`

- [W3C֊ը ցույց է տալիս ինչպես անվանադրել էլեմենտները](https://www.w3.org/WAI/tutorials/forms/labels/)
- [WebAIM֊ը ցույց է տալիս ինչպես անվանադրել էլեմենտները](https://webaim.org/techniques/forms/controls)
- [Paciello Group֊ը բացատրում է հասանելի անունները](https://www.paciellogroup.com/blog/2017/04/what-is-an-accessible-name/)

Ինչպես նաև այսպիսի ստանդարտ HTML հմտությունները կարող են օգտագործվել անմիջապես React֊ում, նշենք որ `for` ատրիբուտը գրված է `htmlFor` JSX֊ում\`

```javascript{1}
<label htmlFor="namedInput">Անուն\`</label>
<input id="namedInput" type="text" name="անուն"/>
```

### Տեղեկացնում ենք օգտագործողին սխալների մասին {#notifying-the-user-of-errors}

Սխալ իրադրությունները պետք է հասկանալի լինեն բոլոր օգտագործողների համար։ Հետևյալ հղումները ի ցույց են դնում, ինչպես ներկայացնել սխալ տեքստերը էկրան կարդացողներին\`

- [W3C֊ը ցուցադրում է օգտագործողի ծանուցումները](https://www.w3.org/WAI/tutorials/forms/notifications/)
- [WebAIM ցուցադրում է form-ի վավերացումը](https://webaim.org/techniques/formvalidation/)

## Focus-ի կառավարում {#focus-control}

Համոզվեք, որ ձեր վեբ հավելվածը հնարավոր է լրիվ օգտագործել ստեղնաշարի միջոցով\`

- [WebAIM֊ը խոսում է ստեղնաշարի հասանելիությունից](https://webaim.org/techniques/keyboard/)

### Ստեղնաշարի focus և focus-ի եզրագծեր {#keyboard-focus-and-focus-outline}

Ստեղնաշարի focus-ը վերաբերվում է DOM֊ում արդի էլեմենտին, որը ընտրված է ստեղնաշարի մուտքային տվյալները ընդունելու համար։ Մենք ամենուրեք տեսնում ենք, որ focus-ի ուրվագիծը նման է հետևյալ ցուցադրված նկարին\`

<img src="../images/docs/keyboard-focus.png" alt="Ստեղնաշարի focus-ի կապույտ ուրվագիծ նշված հղման շուրջը։" />

Հեռացրեք ուրվագիծը, օրինակ `outline: 0` սահմանելով, CSS֊ի միջոցով միայն, եթե դուք այն փոխարինելու եք focus-ի ուրվագծի ուրիշ տարբերակով։

### Ցանկալի բովանդակությանը անցնելու մեխանիզմներ {#mechanisms-to-skip-to-desired-content}

Տրամադրեք մեխանիզմեր, որոնք օգտագործողներին թույլ կտան ձեր հավելվածում անցնել նախկին ղեկավարման բաժին, քանի որ դա օգնում և արագացնում է ստեղնաշարի ղեկավարումը։

Skiplinks կամ անցման ղեկավարման հղումները թաքնված ղեկավարման հղումներ են, որոն դառնում են տեսանելի, երբ օգտատիրոջ ստեղնաշարը փոխազդում է էջի հետ։ Դրանք շատ հեշտ է սարքել ներսի էջի խարիսխներով և մի քիչ styling-ով\`

- [WebAIM - Անցման ղեկավարման հղումներ](https://webaim.org/techniques/skipnav/)

Նաև օգտագործեք ուղենշային էլեմենտներ և նշանակություններ, ինչպիսիք են `<main>` կամ `<aside>`, որ էջի տարբեր մասերը տարանջատենք որպես օգնական տեխնոլոգիա, որը օգտատիրոջը թույլ կտա արագ տեղափոխվել ուրիշ բաժիններ։

Read more about the use of these elements to enhance accessibility here:
Հասանելիության բարձրացման համար կարդացեք այս էլեմենտների օգտագործման մասին ավելին\`

- [Հասանելի ուղենիշեր](https://www.scottohara.me/blog/2018/03/03/landmarks.html)

### Programmatically ղեկավարել focus-ը {#programmatically-managing-focus}

Մեր React հավելվածները շարունակաբար փոփոխում են HTML DOM֊ը կատարման ընթացքում, որը երբեմն հանգեցնում է ստեղնաշարի focus-ի կորստի կամ անսպասելի էլեմենտի վրա հայտնվելուն։ Ուղղելու համար, մենք պետք է programmatically շտկենք ստեղնաշարի focus-ը ճիշտ ուղղությամբ։ Օրինակ\` հետ վերադարձնելով ստեղնաշարի focus-ը այն կոճակին, որը բացել է մոդալ պատուհանը, մոդալ պատուհանի փակվելուց հետո։

MDN Վեբ փաստաթղթավորումը ուշադրություն է դարձրել սրան և նկարագրել ինչպես կարող ենք սարքել [ստեղնաշարային-ղեկավարվող JavaScript widget-ներ](https://developer.mozilla.org/en-US/docs/Web/Accessibility/Keyboard-navigable_JavaScript_widgets).

React֊ում focus-ը սահամանելու համար մենք կարող ենք օգտագործել [Հղումներ DOM էլեմենտներին](/docs/refs-and-the-dom.html).

Օգտագործելով սա, մենք նախ և առաջ ստեղծում ենք հղում կոմպենենտի կլասի JSX֊ի էլեմենտի վրա\`

```javascript{4-5,8-9,13}
class CustomTextInput extends React.Component {
  constructor(props) {
    super(props);
    // Ստեղծենք հղում textInput DOM էլէմենտը պահելու համար
    this.textInput = React.createRef();
  }
  render() {
  // Օգտագործեք `ref` հետկանչի ֆունկցիան text input(տեքստային մուտքագրման) DOM
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

Հետո մենք կարող ենք focus-ը տեղադրել մեր կոմպոնենտում որևէ տեղ երբ պետք լինի\`

 ```javascript
 focus() {
   // Ուղղակի focus-ը տեղափոխեք text input-ին օգտագործելով մաքուր DOM API
   // Նշում\` մենք վերցնում ենք "current"֊ը, որ հասնենք DOM հանգույցին
   this.textInput.current.focus();
 }
 ```

Երբեմն ծնող կոմպոնենտը կարիք ունի focus տեղադրելու ժառանգ կոմպոնենտի էլեմենտի վրա։ Մենք կարող ենք դա անել DOM հղումները ծնող կոմպոնենտներին տրամադրելով](/docs/refs-and-the-dom.html#exposing-dom-refs-to-parent-components) ժառանգ կոմպոնենտի հատուկ prop֊ի միջոցով, որը 
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

// Այժմ դուք կարող եք focus-ը տեղադրել երբ անհրաժեշտ է։
this.inputElement.current.focus();
```

Երբ կոմպոնենտները ընդլայնելու համար HOC ես օգտագործում, խորհուրդ է տրվում ուղարկել հղումը ներդրված կոմպոնենտին օգտագործելով React֊ի `forwardRef` ֆունկցիան։ Եթե միջնորդ HOC֊ը չի կիրառում հղման ուղարկում, ապա վերը նշված ձևը կարող է օգտագործվել որպես fallback(պահեստային) տարբերակ։

focus-ի կառավարման հրաշալի օրինակ է [react-aria-modal](https://github.com/davidtheclark/react-aria-modal)-ը։ Սա լրիվ հասանելի մոդալ պատուհանի համեմատաբար լավ տարբերակ է։ Սա ոչ միայն սահմանում է սկզբանական focus-ը չեղարկելու կոճակի վրա (կանխարգելելով ստեղնաշարից օգտվողին պատահաբար ակտիվացնել (success)հաջողակ գործողությունը) և հեռացնում ստեղնաշարի focus-ը մոդալի ներսից, այլև վերադարձնում է focus-ը հետ այն էլեմենտին, որը ի սկզբանե ազդել էր մոդալի վրա։

>
>Նշում:
>
>Բացի նրանից, որ սա շատ կարևոր հասանելիության ֆունկցիոնալ է, սա նաև գործելակերպ է, որը պետք է կշռադատված օգտագործել։ Օգտագործեք այն ստեղնաշարի focus-ի սահունության վերականգնման համար, երբ այն խախտված է, ոչ թե փորձեք կամ կանխատեսեք ինչպես
>օգտագործողը կցանկանա օգտվել հավելվածներից.

## Մկնիկի և սլաքի իրադարձություններ {#mouse-and-pointer-events}

Համոզվեք որ ամբողջ ֆունկցիոնալը տրամադրված մկնիկի կամ սլաքի իրադարձությամբ, նաև հասանելի են մենակ ստեղնաշարի օգտագործմամբ։ Հիմնվելը մենակ սլաքային սարքերի վրա, կհանգեցնի բազում դեպքերի, երբ ստեղնաշարից օգտվողը չի կարողանա օգտվել ձեր հավելվածից։

Սա ցուցադրելու համար, եկեք դիտարկենք քլիքի իրադարձությունների հետևանքով վնասված հասանելիությամբ առատ օրինակ։ Սա արտաքին մասի քլիքի օրինակ է, որտեղ օգտատերը կարող է փակել բացված popover էլեմենտից դուրս քլիք անելով։

<img src="../images/docs/outerclick-with-mouse.gif" alt="Դրոշակ կոճակ, որը բացում է popover ցուցակը իրագործված դրսի քլիք տարբերակով և մկնիկի կողմից մշակվող, որը ցույցադրում է փակել գործողության աշխատանքը։" />

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
        <button onClick={this.onClickHandler}>Ընտրել տարբերակ</button>
        {this.state.isOpen ? (
          <ul>
            <li>Տարբերակ 1</li>
            <li>Տարբերակ 2</li>
            <li>Տարբերակ 3</li>
          </ul>
        ) : null}
      </div>
    );
  }
}
```

Սա կարող է լավ աշխատել սլաքով սարքերի օգտագործողների համար, մկան նման, բայց այս ամենը մենակ ստեղնաշարով կառավարելը հանգեցնում է խախտված ֆունկցիոնալի, tab-ով հաջորդ էլեմենտին անցնելու ժամանակ,
քանի որ `window` օբյեկտը երբեք չի ընդունում `click` իրադարձություն։ Սա հանգեցնում է անհասկանալի ֆունկցիոնալության, որը խոչընդոտում է օգտագործողներին օգտվել ձեր հավելվածից։

<img src="../images/docs/outerclick-with-keyboard.gif" alt="Դրոշակ կոճակը բացում է popover ցուցակ իրագործված դրսի քլիք տարբերակով, և ստեղնաշարի կողմից մշակում ցույց տալով, որ popover-ը չի փակվում ֆոկուսից դուրս գալուց և դա խանգարում է էկրանի մյուս էլեմենտներին։" />

Միևնույն ֆունկցիոնալին կարելի է հասնել փոխարենը օգտագործելով համապատասխան իրադարձություն մշակողներ, ինչպիսիք են `onBlur` կամ `onFocus`։

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

  // Մենք փակում ենք ՝popover՝-ը հաջորդ քայլին, օգտագործելով "setTimeout":
  // Սա անհրաժեշտ է, որովհետև մենք նախ կարիք ունենք ստուգել, արդյոք
  // էլեմենտի ուրիշ ժառանգ չի ստացել focus իրադարձությունը,
  // քանի որ blur իրադարձությունը (fires) նախորդում է նոր focus իրադարձությանը։
  onBlurHandler() {
    this.timeOutId = setTimeout(() => {
      this.setState({
        isOpen: false
      });
    });
  }

  // Եթե ժառանգը ստանում է ֆոկուս իրադարձություն popover-ը չի փակվում։ 
  onFocusHandler() {
    clearTimeout(this.timeOutId);
  }

  render() {
    // React-ը օգնում է մեզ, տարածելով blur և
    // ֆոկուս իրադարձությունները ծնողին։
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
            <li>Տարբերակ 1</li>
            <li>Տարբերակ 2</li>
            <li>Տարբերակ 3</li>
          </ul>
        ) : null}
      </div>
    );
  }
}
```

Այս կոդը տրամադրում է ֆունկցիանալություն երկուսին էլ\` և սլաքով սարքերին, և ստեղնաշարով օգտատերերին։ Նկատեք նաև հավելված `aria-*` `props`-երը screen-reader-ի օգտագործողներին օգնելու համար։ Պարզության համար ստեղնաշարի սլաք կոճակի փոխազդեցությունը popover-ի հետ, իրագործված չէ։

<img src="../images/docs/blur-popover-close.gif" alt="popover ցուցակ, որը ճշգրիտ փակվում է և մկնիկի, և ստեղնաշարի օգտագործողների համար։" />

Սա բազմաթիվ օրինակներից մեկն է, որտեղ կախված մենակ սլաքի և մկնիկի իրադարձություններից, կխախտվի ստեղնաշարի օգտագործողի ֆունկցիոնալությունը։ Միշտ ստուգելը ստեղնաշարով անմիջապես
ընդգծում է խնդրահարույց շրջանները, որոնք կարող են ուղղվել ստեղնաշարին հարմարեցված իրադարձություն մշակողներից օգտվելիս։

## Ավելի Complex widget-ներ {#more-complex-widgets}

Ավելի complex օգտագործողի փորձը չպետք է նշանակի, սակավ հասանելի։ Մինչդեռ հասանելիությունը ավելի հեշտ է տրվում, երբ ծրագրավորում ես հնարավորինս HTML-ին մոտ. 
նույնիսկ ամենակոմպլեքս widget-ը հնարավոր է ծրագրավորել հասանելի։

Այստեղ մենք պահանջում ենք [ARIA դերերի](https://www.w3.org/TR/wai-aria/#roles) իմացություն, ինչպես նաև [ARIA վիճակներ և հատկանիշներ](https://www.w3.org/TR/wai-aria/#states_and_properties).
Սրանք toolboxes են լրացված HTML ատրիբուտներով, որոնք լրիվ սպասարկվում են JSX-ում և հնարավորություն են տալիս մեզ կառուցել լրիվ հասանելի, հագեցած ֆունկցիոնալով React կոմպոնենտներ։

Widget-ի յուրաքանչյուր տեսակ ունի իրեն հատուկ design-ի ձևը և սպասվում է, որ պետք է աշխատի որոշակի ձևով, ինչպես օգտագործողների, այնպես էլ օգտագործողին սպասարկողի համար:

- [WAI-ARIA հեղինակային վարպետություններ - Design Patterns և widget-ներ](https://www.w3.org/TR/wai-aria-practices/#aria_ex)
- [Heydon Pickering - ARIA Օրինակներ](https://heydonworks.com/practical_aria_examples/)
- [Ներառված կոմպոնենտներ](https://inclusive-components.design/)

## Խորհելու այլ թեմաներ {#other-points-for-consideration}

### Լեզվի կարգավորումը {#setting-the-language}

Նշեք էջի տեքստերի մարդկային լեզուն, քանի որ screen reader ծրագիրը օգտագործում է դա, ճիշտ ձայնային կարգավորման համար:

- [WebAIM - Փաստաթղթի լեզուն](https://webaim.org/techniques/screenreader/#language)

### Փաստաթղթի վերնագրի կարգավորումը {#setting-the-document-title}

Նշեք փաստաթղթի `<title>`-ը տվյալ էջի պարունակությունը ճշգրիտ նկարագրելու համար, քանի որ դա ապահովում է, որ օգտագործողը իրազեկված լինի էջի բովանդակությունից\`

- [WCAG - Հասկանում ենք փաստաթղթի վերնագրի պահանջմունքը](https://www.w3.org/TR/UNDERSTANDING-WCAG20/navigation-mechanisms-title.html)

React-ում մենք կարող ենք սա նշել օգտագործելով [React Document Title կոմպոնենտը](https://github.com/gaearon/react-document-title).

### Գունային համադրությունը {#color-contrast}

Համոզվեք, որ ձեր կայքի բոլոր կարդացվող տեքստերը ունեն համապատասխան գունային համադրությունը, մնալով հնարավորինս կարդացվող վատ տեսողություն ունեցող օգտագործողների համար\`

- [WCAG - Հասկանում ենք գունային համադրության պահանջմունքը](https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html)
- [Ամեն ինչ գունային համադրության մասին և ինչու դուք պետք է վերաիմաստավորեք այն](https://www.smashingmagazine.com/2014/10/color-contrast-tips-and-tools-for-accessibility/)
- [A11yProject - Ինչ է գունային համադրությունը](https://a11yproject.com/posts/what-is-color-contrast/)

Կարող է ձանձրալի լինել ձեռքով հաշվարկել ճշգրիտ գունային կոմբինացիաները ձեր կայքի բոլոր դեպքերի համար, դրա փոխարեն դուք կարող եք [հաշվարկել ամբողջ գունային ներկապնակը Colorable-ի միջոցով](https://jxnblk.com/colorable/)։

Ներքևում նշված և aXe, և WAVE գործիքները, նույնպես ներառում են գունային համադրության թեստեր և կհաղորդեն համադրության սխալների մասին։

Եթե ուզում եք ընդլայնել համադրություն ստուգելու ձեր ունակությունները, դուք կարող եք օգտվել հետևյալ գոծիքներից\` 

- [WebAIM - Գունային համադրության ստուգիչ](https://webaim.org/resources/contrastchecker/)
- [The Paciello Group - Գունային համադրության վերլուծիչ](https://www.paciellogroup.com/resources/contrastanalyser/)

## Development և ստուգող գործիքներ {#development-and-testing-tools}

Կան մի քանի գործիքներ, որոնք մենք կարող ենք օգտագործել հասանելի վեբ հավելվածների ստեղծմանը օգնելու համար։

### Ստեղնաշարը {#the-keyboard}

Ինչևէ ամենահեշտ և միաժամանակ նաև ամենակարևոր ստուգումը, դա ստուգելն է, արդյո՞ք ձեր ամբողջ կայքը հասանելի է և այն հնարավոր է օգտագործել միայն ստեղնաշարով։ Սա անելու համար\`

1. Անջատեք ձեր մկնիկը։
1. Օգտագործեք `Tab` և `Shift+Tab` թերթելու համար։
1. օգտագործեք `Enter`-ը էլեմենտները ակտիվացնելու համար։
1. Որտեղ որ անհրաժեշտ է, օգտագործեք ստեղնաշարի սլաքով կոճակները, ինչ-որ էլեմենտների հետ փոխազդելու համար, դրանցից են menu-ներ կամ dropdown-ներ։

### Development օգնություն {#development-assistance}

Մենք կարող ենք ստուգել որոշ հասանելիության feature-ներ անմիջապես ձեր JSX կոդում։ Հաճախ intellisense-ի ստուգումները արդեն տրամադրված են JSX-ում, տեղեկացնելու IDE-ներին ARIA դերերի, վիճակների և հատկանիշների մասին։ Մենք նաև
հետևյալ գործիքի հնարավորությունը ունենք\`

#### eslint-plugin-jsx-a11y {#eslint-plugin-jsx-a11y}

[eslint-plugin-jsx-a11y](https://github.com/evcohen/eslint-plugin-jsx-a11y) ESLint-ի plugin-ը տրամադրում է AST linting հետադարձ կապ, կապված ձեր JSX-ում հասանելիության խնդիրների հետ։ Բազմաթիվ
IDE-ներ թույլատրում են միակցել նման որոնումները անմիջապես կոդի վերլուծության և source կոդի պատուհաններում։

[Create React App](https://github.com/facebookincubator/create-react-app) ունի այս plugin-ը կանոնների ինչ-որ ենթաբազմությունը ակտիվացրած։ Եթե դուք ուզում եք միացնել ավելի շատ հասանելիության կանոններ,
դուք կարող եք ստեղծել `.eslintrc` ֆայլը ձեր ծրագրի հիմքում, հետևյալ պարունակությամբ\`

  ```json
  {
    "extends": ["react-app", "plugin:jsx-a11y/recommended"],
    "plugins": ["jsx-a11y"]
  }
  ```

### Ստուգում ենք հասանելիությունը ձեր զննարկիչում {#testing-accessibility-in-the-browser}

Գոյություն ունեն մի քանի գործիքներ, որոնք կարող են աշխատեցնել հասանելիության audit-ները ձեր զննարկչի վեբ կայքերում։ Խնդրում ենք օգտագործեք դրանք համադրելով այստեղ նշված հասանելության մյուս ստուգումների հետ, քանի որ
դրանք միայն կարող են ստուգել ձեր HTML-ի տեխնիկական հասանելիությունը։


#### aXe, aXe-core և react-axe {#axe-axe-core-and-react-axe}

Deque Systems առաջարկում է [aXe-core](https://github.com/dequelabs/axe-core)-ը ձեր հավելվածների ավտոմատացված և end-to-end հասանելիության թեստավորման համար։ Այս մոդուլը ներառում է ինտեգրացիա Selenium-ի հետ։

[The Accessibility Engine](https://www.deque.com/products/axe/) կամ aXe, զննարկչի հասանելիության հսկիչ հավելված է, կառուցված `aXe-core`-ով։

Դուք կարող եք նաև օգտագործել [react-axe](https://github.com/dylanb/react-axe)-ը մոդուլը կառուցման և debug-ի ընթացքում այս հասանելիության արդյունքները անմիջապես կոնսոլում հաղորդելու համար։

#### WebAIM WAVE {#webaim-wave}

[Վեբ հասանելիութունը գնահատելու գործիք](https://wave.webaim.org/extension/)-ը զննարկիչի մեկ այլ հավելված է հասանելիության համար։

#### Հասանելիության ստուգիչներ և հասանելիության ծառը {#accessibility-inspectors-and-the-accessibility-tree}

[Հասանելիության ծառը](https://www.paciellogroup.com/blog/2015/01/the-browser-accessibility-tree/) DOM ծառի ենթաբազմություն է, որը պարունակում է հասանելի օբյեկտներ DOM ծառի յուրաքանչյուր էլեմենտի համար, որը ծառայում է որպես օժանդակ տեխնոլոգիա,
ինչպիսիք են էկրան կարդացողները։

Որոշ զննարկիչներում մենք հեշտությամբ կարող ենք տեսնել յուրաքանչյուր էլեմենտի համար հասանելիության ինֆորմացիան հասանելիության ծառում\`

- [Հասանելիության դիտարկչի օգտագործումը Firefox-ում](https://developer.mozilla.org/en-US/docs/Tools/Accessibility_inspector)
- [Ակտիվացնում ենք հասանելիության դիտարկիչը Chrome-ում](https://gist.github.com/marcysutton/0a42f815878c159517a55e6652e3b23a)
- [հասանելիության դիտարկչի օգտագործումը OS X Safari-ում](https://developer.apple.com/library/content/documentation/Accessibility/Conceptual/AccessibilityMacOSX/OSXAXTestingApps.html)

### Էկրան կարդացողներ {#screen-readers}

Էկրան կարդացողի թեստավորումը պետք է մաս կազմի ձեր հասանելիության թեստերում։

Ուշադրություն դարձրեք, որ զննարկիչ / էկրան կարդացող կոմբինացիան կարևոր է։ Խորհուրդ է տրվում ձեր հավելվածը թեստավորել զննարկչում, որը առավել հարմարեցված է ձեր ընտրած էկրան կարդացողին։

### Հիմնական օգտագործվող էկրան կարդացողներ {#commonly-used-screen-readers}

#### NVDA-ն Firefox-ում {#nvda-in-firefox}

[Ոչ տեսանելի աշխատասեղանի մուտք](https://www.nvaccess.org/) կամ NVDA-ն բաց source-ով Windows-ի էկրան կարդացող է, որը լայնորեն օգտագործվում է։

Հղվեք հետևյալ ուղեցույցներին NVDA-ից ավելի լավ օգտվելու համար\`

- [WebAIM\` օգտագործում ենք NVDA-ն վեբ հասանելիությունը գնահատելու համար](https://webaim.org/articles/nvda/)
- [Deque\` NVDA ստեղնաշարի կարճուղիներ](https://dequeuniversity.com/screenreaders/nvda-keyboard-shortcuts)

#### VoiceOver-ը Safari-ում {#voiceover-in-safari}

VoiceOver-ը Apple-ի սարքերում ինտեգրված էկրան կարդացող է։

Հղվեք հետևյալ ուղեցույցներին VoiceOver-ի օգտագործման և ակտիվացման համար\`

- [WebAIM - Օգտագործում ենք VoiceOver վեբ հասանելիությունը գնահատելու համար](https://webaim.org/articles/voiceover/)
- [Deque - VoiceOver\` OS X-ի ստեղնաշարի կարճուղիների համար](https://dequeuniversity.com/screenreaders/voiceover-keyboard-shortcuts)
- [Deque - VoiceOver\` iOS-ի կարճուղիների համար](https://dequeuniversity.com/screenreaders/voiceover-ios-shortcuts)

#### JAWS-ը Internet Explorer-ում {#jaws-in-internet-explorer}

[Աշխատանքի հասանելիությունը խոսքի միջոցով](https://www.freedomscientific.com/Products/software/JAWS/) կամ JAWS, լայն օգտագործվող էկրան կարդացող է Windows-ում։

Հղվեք հետևյալ ուղեցույցներին JAWS-ից ավելի լավ օգտվելու համար\`

- [WebAIM - Օգտագործում ենք JAWS վեբ հասանելիությունը գնահատելու համար](https://webaim.org/articles/jaws/)
- [Deque\` JAWS ստեղնաշարի կարճուղիներ](https://dequeuniversity.com/screenreaders/jaws-keyboard-shortcuts)

### Այլ էկրան կարդացողներ {#other-screen-readers}

#### ChromeVox-ը Google Chrome-ում {#chromevox-in-google-chrome}

[ChromeVox](https://www.chromevox.com/)-ը Chromebook-երին ինտեգրված էկրան կարդացող ծրագիր է և հասանելի է [որպես ընդլայնում](https://chrome.google.com/webstore/detail/chromevox/kgejglhpjiefppelpmljglcjbhoiplfn?hl=en) Google Chrome-ի համար։

Հղվեք հետևյալ ուղեցույցներին ChromeVox-ից ավելի լավ օգտվելու համար\`

- [Google Chromebook Help - Օգտագործեք Built-in Screen Reader](https://support.google.com/chromebook/answer/7031755?hl=en)
- [ChromeVox\` ստեղնաշարի դասական կարճուղիների տեղեկանք](https://www.chromevox.com/keyboard_shortcuts.html)
