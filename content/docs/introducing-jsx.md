---
id: introducing-jsx
title: Ծանոթացում JSX-ի հետ
permalink: docs/introducing-jsx.html
prev: hello-world.html
next: rendering-elements.html
---

Դիտարկենք այս փոփոխականի հայտարարումը.

```js
const element = <h1>Ողջույն, աշխարհ</h1>;
```

Այս հետաքրքիր շարահյուսությունը ոչ տող է ոչ HTML։

Այն կոչվում է JSX և հանդիսանում է JavaScript-ի շարահյուսական ընդլայնում։ Մենք խորհուրդ ենք տալիս օգտագործել այն React-ի հետ\` սահմանելու համար, թե ինչ տեսք պետք է ունենա UI-ը։ JSX-ը կարող է ձեզ հիշեցնել ձևանմուշային լեզու, բայց այն ներառում է JavaScript-ի ամբողջ հզորությունը։

JSX-ը «արտադրում» է React էլեմենտներ։ Այն, թե ինչպես են նրանք արտապատկերվում DOM-ում, մենք կբացահայտենք [հաջորդ գլխում](/docs/rendering-elements.html)։ Ստորև դուք կարող եք գտնել JSX-ի հետ աշխատել սկսելու համար անհրաժեշտ հիմքային գաղափարները։

### ինչու՞ JSX? {#why-jsx}

React-ն ընդունում է այն գաղափարը, որ արտապատկերման տրամաբանությունը, ըստ էության, կապված է UI տրամաբանության հետ. այն, թե ինչպես են իրադարձությունները մշակվում, թե ինչպես է state-ը փոփոխվում ժամանակի ընթացքում, և, թե ինչպես են տվյալները պատրաստվում պատկերվելու համար։

Փոխանակ նշարկումն(markup) ու տրամաբանությունն(logic) առանձին ֆայլերում դնելով տեխնոլոգիաները արհեստականորեն բաժանելու\` React-ը կիրառում է [պատասխանատվության բաժանում](https://en.wikipedia.org/wiki/Separation_of_concerns)<sub>`eng`</sub>\` «կոմպոնենտներ» կոչվող, միմյանց հետ թույլ կապված բլոկների հետ, որոնք երկուսն էլ պարունակում են։ Մենք դեռ կանդրադառնանք կոմպոնենտներին [հաջորդ գլխում](/docs/components-and-props.html)։ Բայց եթե դեռ չեք հարմարվել նշարկումը JS-ի մեջ դնելու գաղափարի հետ, ապա գուցե [այս զեկույցը](https://www.youtube.com/watch?v=x7cQ3mrcKaY) համոզի ձեզ հակառակը։

React-ը [չի պահանջում](/docs/react-without-jsx.html) JSX-ի օգտագործումը, բայց շատ մարդիկ, որպես տեսողական օգնություն, համարում են դա օգտակար, երբ JavaScript կոդում աշխատում են UI-ի հետ։ Դա նաև թույլ է տալիս React-ին ցույց տալ ավելի օգտակար ծանուցումներ սխալների և զգուշացումների մասին։

Սա հասկացանք, շարժվենք առաջ։

### Ներդրված արտահայտություններ JSX-ում {#embedding-expressions-in-jsx}

Ստորև ներկայացված օրինակում մենք հայտարարում ենք `name` անունով փոփոխական և օգտագործում այն JSX-ի ներսում\` փաթաթելով այն ձևավոր փակագծերով.

```js{1,2}
const name = 'Պողոս Պողոսյան';
const element = <h1>Ողջույն, {name}</h1>;

ReactDOM.render(
  element,
  document.getElementById('root')
);
```

JSX-ում\` ձևավոր փակագծերի ներսում, դուք կարող եք տեղադրել ցանկացած վավեր [JavaScript արտահայտություն](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators#Expressions)<sub>`eng`</sub>։ Օրինակ. `2 + 2`, `user.firstName`, կամ `formatName(user)`. սրանք բոլորը վավեր JavaScript արտահայտություններ են։

Իսկ այս մի օրինակում, մենք ներդնում ենք JavaScript ֆունկցիայի կանչի արդյունքը\` `formatName(user)`, `<h1>` էլեմենտի մեջ։

```js{12}
function formatName(user) {
  return user.firstName + ' ' + user.lastName;
}

const user = {
  firstName: 'Պողոս',
  lastName: 'Պողոսյան'
};

const element = (
  <h1>
    Ողջույն, {formatName(user)}!
  </h1>
);

ReactDOM.render(
  element,
  document.getElementById('root')
);
```

[Փորձել CodePen-ում](codepen://introducing-jsx)

Մենք բաժանում ենք JSX-ը բազմաթիվ տողերի ընթեռնելիության համար։ Այդպիսի դեպքերում, չնայած դա պարտադիր չէ, մենք նաև խորհուրդ ենք տալիս դնել դրանց փակագծերի մեջ\` [կետ-ստորակետների ավտոմատ տեղադրման](https://stackoverflow.com/q/2846283)<sub>`eng`</sub> ժամանակ անկանխատեսելի խնդիրներից խուսափելու համար։

### JSX-ը նույնպես արտահայտություն է {#jsx-is-an-expression-too}

Կոմպիլյացիայից հետո JSX արտահայտությունները վերածվում են սովորական JavaScript ֆունկցիայի կանչերի և հաշվարկվում որպես JavaScript օբյեկտներ։

Սա նշանակում է, որ դուք կարող եք օգտագործել JSX-ը `if` պայմանի կամ `for` ցիկլի ներսում, վերագրել այն փոփոխականների, ընդունել այն որպես արգումենտ և վերադարձնել այն ֆունկցիաներից.

```js{3,5}
function getGreeting(user) {
  if (user) {
    return <h1>Ողջույն, {formatName(user)}!</h1>;
  }
  return <h1>Ողջույն, անծանոթ։</h1>;
}
```

### Ատրիբուտների սահմանում JSX-ում {#specifying-attributes-with-jsx}

Դուք կարող եք օգտագործել ապաթարցեր\` հայտարարելու համար տողային լիտերալներ որպես ատրիբուտներ.

```js
const element = <div tabIndex="0"></div>;
```

Դուք նաև կարող եք օգտագործել ձևավոր փակագծեր\` ներդնելու համար JavaScript արտահայտություններ ատրիբուտում.

```js
const element = <img src={user.avatarUrl}></img>;
```

Մի դրեք ապաթարցեր ձևավոր փակագծերի շուրջ, երբ ներդնում եք JavaScript արտահայտություն ատրիբուտում։ Դուք պետք է կա՛մ օգտագործեք ապատարցեր (տողային արժեքների համար), կա՛մ ձևավոր փակագծեր (արտահայտությունների համար), բայց ոչ երկուսը միասին նույն ատրիբուտում։

>**Զգուշացում.**
>
>Քանի որ JSX-ն ավելի մոտ է JavaScript-ին, քան HTML-ին, ReactDOM-ը HTML ատրիբուտների անուների փոխարեն օգտագործում է `ուղտաԳիր` հատկությունների անունների պայմանավորվածություն։
>
>Օրինակ. `class`-ը JSX-ում դառնում է [`className`](https://developer.mozilla.org/en-US/docs/Web/API/Element/className)<sub>`eng`</sub>, `tabindex`-ը դառնում է [`tabIndex`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/tabIndex)<sub>`eng`</sub>։

### Զավակների հայտարարումը JSX-ում {#specifying-children-with-jsx}

Եթե թեգը դատարկ է, դուք կարող եք անմիջապես փակել այն սրանով `/>`, ինչպես XML-ում.

```js
const element = <img src={user.avatarUrl} />;
```

JSX թեգերը կարող են պարունակել զավակներ.

```js
const element = (
  <div>
    <h1>Ողջույն!</h1>
    <h2>Ուրախ ենք Ձեզ տեսնել այստեղ։</h2>
  </div>
);
```

### JSX-ը կանխում է ներարկման հարձակումները {#jsx-prevents-injection-attacks}

Ապահով է ներդնել օգտագործողի input-ը JSX-ում.

```js
const title = response.potentiallyMaliciousInput;
// This is safe:
const element = <h1>{title}</h1>;
```

Լռությամբ, ReactDOM-ն [էկրանավորում](https://stackoverflow.com/questions/7381974/which-characters-need-to-be-escaped-on-html)<sub>`eng`</sub> է JSX-ում ներդրված ցանկացած արժեք մինչ նրանց արտապատկերումը։ Այդպիսով նա երաշխավորում է, որ դուք երբեք չեք կարող «ներարկել» այն, ինչ ակնհայտորեն գրված չէ ձեր հավելվածում։ Ամեն ինչ ձևափոխվում է տողի մինչ արտապատկերվելը։ Սա թույլ է տալիս կանխել [XSS (cross-site-scripting)](https://en.wikipedia.org/wiki/Cross-site_scripting)<sub>`eng`</sub> հարձակումները։

### JSX-ն իրենից ներկայացնում է օբյեկտներ {#jsx-represents-objects}

Babel-ը կոմպիլացնում է JSX-ը `React.createElement()` կանչերի։

Այս երկու օրինակները համարժեք են.

```js
const element = (
  <h1 className="greeting">
    Ողջույն, աշխարհ
  </h1>
);
```

```js
const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Ողջույն, աշխարհ'
);
```

`React.createElement()`-ը կատարում է մի քանի ստուգում\` օգնելու համար ձեզ գրել սխալներից ազատ կոդ, բայց, ըստ էության, այն ստեղծում է այսպիսի օբյեկտ.

```js
// Նշում. այս կառուցվածքը պարզեցված է
const element = {
  type: 'h1',
  props: {
    className: 'greeting',
    children: 'Ողջույն, աշխարհ'
  }
};
```

Այս օբյեկտները կոչվում են «React էլեմենտներ»։ Դուք կարող եք դրանք համարել այն բաների նկարագրություն, որոնք ցանկանում եք տեսնել էկրանին։ React-ը կարդում է այդ օբյեկտները և օգտագործում է նրանց DOM-ը կառուցելու և այն թարմ պահելու համար։

<<<<<<< HEAD
Մենք կուսումնասիրենք React էլեմենտների արտապատկերումը DOM-ում հաջորդ գլխում։
=======
We will explore rendering React elements to the DOM in the [next section](/docs/rendering-elements.html).
>>>>>>> 0bb0303fb704147452a568472e968993f0729c28

>**Խորհուրդ:**
>
<<<<<<< HEAD
>Մենք խորհուրդ ենք տալիս օգտագործել [«Babel լեզվի սահմանում»](https://babeljs.io/docs/editors)-ը ձեր խմբագրիչի համար, որպեսզի ES6 և JSX կոդերն ընդգծվեն ինչպես հարկն է։
=======
>We recommend using the ["Babel" language definition](https://babeljs.io/docs/en/next/editors) for your editor of choice so that both ES6 and JSX code is properly highlighted.
>>>>>>> 0bb0303fb704147452a568472e968993f0729c28
