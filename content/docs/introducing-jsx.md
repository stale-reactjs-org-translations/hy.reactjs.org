---
id: introducing-jsx
title: Ցանոթացում JSX-ի հետ
permalink: docs/introducing-jsx.html
prev: hello-world.html
next: rendering-elements.html
---

Դիտարկենք այս փոփոխականի հայտարարումը.

```js
const element = <h1>Ողջույն, աշխարհ</h1>;
```

Այս հետաքրքիր շարահյուսությունը ոչ տող է ոչ HTML։

Այն կոչվում է JSX և հանդիսանում է JavaScript-ի շարահյուսական ընդլայնում։ Մենք խորհուրդ ենք տալիս օգտագործել այն React-ի հետ\` սահմանելու համար թե ինչ տեսք պետք է ունենա UI-ը։ JSX-ը կարող է ձեզ հիշացնել ձևանմուշային լեզու, բայց այն ներառում է JavaScript-ի ամբողջ հզորությունը։
JSX may remind you of a template language, but it comes with the full power of JavaScript.

JSX-ը «արտադրում» է React էլեմենտներ։ Մենք կբացահայտենք նրաց արտապատկերումը DOM-ում [հաջորդ գլխում](/docs/rendering-elements.html)։ Վարը դուք կարող եք գտնել JSX-ի հետ աշխատել սկսելու համար անհրաժեշտ հիմքային գաղափարները։
JSX produces React "elements". We will explore rendering them to the DOM in the [next section](/docs/rendering-elements.html). Below, you can find the basics of JSX necessary to get you started.

### ինչու՞ JSX? {#why-jsx}
### Why JSX? {#why-jsx}

React-ը ընդունում է այն գաղափարը, որ արտապատկերման տրամաբանությունը ըստ էության կապված է UI տրամաբանության հետ. թե ինչպես են իրադարձությունները մշակվում, թե ինչպես է state-ը փոփոխվում ժամանակի ընթացքում և թե ինչպես են տվյալները պատրաստվում նկարվելու համար։
React embraces the fact that rendering logic is inherently coupled with other UI logic: how events are handled, how the state changes over time, and how the data is prepared for display.

Ի տարբերություն արհեստական բաժանող *տեխնոլոգիաների*, որոնք օգտագործում են նշարկումն(markup) ու տրամաբանությունը առանձին ֆայլերում, React-ը կիրառում է [պատասխանատվության տարանջատում](https://en.wikipedia.org/wiki/Separation_of_concerns)<sub>`eng`</sub> «կեմպոնենտներ» կոչվող, միմյանց հետ թույլ կապված, բոլկերի հետ, որոնք երկուս էլ պարունակում են։ Մենք դեռ կանդրադառնանք կոմպոնենտներին [հաջորդ գլխում](/docs/components-and-props.html)։ Բայց եթե դուք դեռ հարմարավետ չեք զգում նշարկումը JS-ի մեջ դնելու գաղափարի հետ, ապա [այս զեկույցը](https://www.youtube.com/watch?v=x7cQ3mrcKaY) միգուցե համոզի ձեզ հակառակում։
Instead of artificially separating *technologies* by putting markup and logic in separate files, React [separates *concerns*](https://en.wikipedia.org/wiki/Separation_of_concerns) with loosely coupled units called "components" that contain both. We will come back to components in a [further section](/docs/components-and-props.html), but if you're not yet comfortable putting markup in JS, [this talk](https://www.youtube.com/watch?v=x7cQ3mrcKaY) might convince you otherwise.

React-ը [չի խահանջում](/docs/react-without-jsx.html) JSX-ի օգտագործումը, բայց շատ մարդիկ համարում են դա հարմար, որպես վիզուալ օգնական, երբ JavaScript կոդի մեջ աշխատում եք UI-ի հետ։ Դա թույլ է տալիս React-ին ցույց տալ ավելի օգտակար ծանուցումներ սխալմների և զգուշացումների համար։
React [doesn't require](/docs/react-without-jsx.html) using JSX, but most people find it helpful as a visual aid when working with UI inside the JavaScript code. It also allows React to show more useful error and warning messages.

Սա հասկացանք, շարժվենք առաջ։
With that out of the way, let's get started!

### Ներդրված արտահայտություններ JSX-ում {#embedding-expressions-in-jsx}
### Embedding Expressions in JSX {#embedding-expressions-in-jsx}

Վարը ներկայացվածը օրինակում, մենք հայտարարում ենք `name` անունով փոփոխական և օգտագործում ենք այն JSX-ի ներսում փաթաթելով այն ձևավոր փակագծերում.
In the example below, we declare a variable called `name` and then use it inside JSX by wrapping it in curly braces:

```js{1,2}
const name = 'Պողոս Պողոսյան';
const element = <h1>Ողջույն, {name}</h1>;

ReactDOM.render(
  element,
  document.getElementById('root')
);
```

JSX-ում\` ձևավոր փակագծերի ներսում, դուք կարող եք տեղադրել ցանկացած վավեր [JavaScript արտահայտություն](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators#Expressions)<sub>`eng`</sub>։ Օրինակ. `2 + 2`, `user.firstName`, կամ `formatName(user)`. սրանք բոլորը վավել JavaScript արտահայտություններ են։
You can put any valid [JavaScript expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators#Expressions) inside the curly braces in JSX. For example, `2 + 2`, `user.firstName`, or `formatName(user)` are all valid JavaScript expressions.

Իսկ այս մի օրինակում, մենք ներդնում ենք JavaScript ֆունկցիայի կանչի արդյունքը\` `formatName(user)`, `<h1>` էլեմենտի մեջ։
In the example below, we embed the result of calling a JavaScript function, `formatName(user)`, into an `<h1>` element.

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

Մենք բաժանում ենք JSX-ը բազմակի տողերի ընթեռնելիության համար։ Այդպիսի դեպքերում, չնայած դա պարտադիր չէ, մենք նաև խորհուրդ ենք տալիս դնել դրանց փակագծերի մեջ\` [կետ-ստորակետների ավտոմատ տեղադրման](https://stackoverflow.com/q/2846283)<sub>`eng`</sub> ժամանակ անկանխատեսելի խնդիրներից խուսափելու համար։
We split JSX over multiple lines for readability. While it isn't required, when doing this, we also recommend wrapping it in parentheses to avoid the pitfalls of [automatic semicolon insertion](https://stackoverflow.com/q/2846283).

### JSX-ը նույնպես արտահայտություն է {#jsx-is-an-expression-too}
### JSX is an Expression Too {#jsx-is-an-expression-too}

Կոմպիլյացիայից հետո, JSX արտահայտությունը վերածվում է սովորական JavaScript ֆունկցիայի կանչի և հաշվարկվում որպես JavaScript օբյեկտ։
After compilation, JSX expressions become regular JavaScript function calls and evaluate to JavaScript objects.

Սա նշանակում է, որ դուք կարող եք օգտագործել JSX `if` պայմանի կամ `for` ցիկլի ներսում, վերագրել այն փոփոխականների, ընդունել այն որպես արգումենտ և վերադարձնել այն ֆունկցիաներից.
This means that you can use JSX inside of `if` statements and `for` loops, assign it to variables, accept it as arguments, and return it from functions:

```js{3,5}
function getGreeting(user) {
  if (user) {
    return <h1>Ողջույն, {formatName(user)}!</h1>;
  }
  return <h1>Ողջույն անծանոթ։</h1>;
}
```

### Ատրիբուտների սահմանում JSX-ում {#specifying-attributes-with-jsx}
### Specifying Attributes with JSX {#specifying-attributes-with-jsx}

Դուք կարող եք օգտագործել ապաթարցեր հայտարարելու համար տողային լիտերալներ որպես ատրիբուտներ.
You may use quotes to specify string literals as attributes:

```js
const element = <div tabIndex="0"></div>;
```

Դուք նաև կարող եք օգտագործել ձևավոր փակագծեր ներդնելու համար JavaScropt արտահայտություններ ատրիբուտում.
You may also use curly braces to embed a JavaScript expression in an attribute:

```js
const element = <img src={user.avatarUrl}></img>;
```

Մի դրեք ապաթարցեր ձևավոր փակագծերի շուրջ երբ ներդրված է JavaScript արտահայտություն ատրիբուտում։ Դուք պետք է կամ օգտագործեք ապատարցեր (տողային արժեքների համար) կամ ձևավոր փակագծեր (արտահայտությունների համար), բայց ոչ երկուսը միասին նույն ատրիբուտում։
Don't put quotes around curly braces when embedding a JavaScript expression in an attribute. You should either use quotes (for string values) or curly braces (for expressions), but not both in the same attribute.

>**Զգուշացում:**
>
>Քանի որ JSX-ը ավելի մոտ է JavaScript-ին քան HTML-ին, ReactDOM-ը HTML ատրիբուտների անուների փոխարեն օգտագործում է `ուղտաԳիր` հատկությունների անունների պայմանավորվածություն։
>
>Օրինակ. `class`-ը JSX-ում դառնում է [`className`](https://developer.mozilla.org/en-US/docs/Web/API/Element/className)<sub>`eng`</sub> կամ `tabindex`-ը դառնում է [`tabIndex`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/tabIndex)<sub>`eng`</sub>։

>**Warning:**
>
>Since JSX is closer to JavaScript than to HTML, React DOM uses `camelCase` property naming convention instead of HTML attribute names.
>
>For example, `class` becomes [`className`](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) in JSX, and `tabindex` becomes [`tabIndex`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/tabIndex).

### Զավակների հայտարարումը JSX-ում {#specifying-children-with-jsx}
### Specifying Children with JSX {#specifying-children-with-jsx}

Եթե թեգը դատարկ է, դուք կարող եք անմիջապես փակել այն սրանով `/>`, ինչպես XML-ում.
If a tag is empty, you may close it immediately with `/>`, like XML:

```js
const element = <img src={user.avatarUrl} />;
```

JSX թեգերը կարող են պարունակել զավակներ.
JSX tags may contain children:

```js
const element = (
  <div>
    <h1>Ողջույն!</h1>
    <h2>Ուրախ ենք Ձեզ տեսնել այստեղ։</h2>
  </div>
);
```

### JSX-ը կանխում է ներարկման հարձակումները {#jsx-prevents-injection-attacks}
### JSX Prevents Injection Attacks {#jsx-prevents-injection-attacks}

Ապահով է ներդնել օգտագործողի input-ը JSX-ում.
It is safe to embed user input in JSX:

```js
const title = response.potentiallyMaliciousInput;
// This is safe:
const element = <h1>{title}</h1>;
```

Լռությամբ, ReactDOM-ը էկրանավորում է JSX-ում ներդրված ցանկացած արժեք մինչ նրանց արտապատկերումը։ Այդպիսով նա երաշխավորում է, որ դուք երբեք չեք կարող «ներարկել» այն ինչ ակնհայտորեն գրված չի ձեր հավելվածում։ Ամեն ինչ ձևափոխվում է տողի մինչ արտապատկերվելը։ Սա թույլ է տալիս կանխել [XSS (cross-site-scripting)](https://en.wikipedia.org/wiki/Cross-site_scripting)<sub>`eng`</sub> հարձակումները։
By default, React DOM [escapes](https://stackoverflow.com/questions/7381974/which-characters-need-to-be-escaped-on-html) any values embedded in JSX before rendering them. Thus it ensures that you can never inject anything that's not explicitly written in your application. Everything is converted to a string before being rendered. This helps prevent [XSS (cross-site-scripting)](https://en.wikipedia.org/wiki/Cross-site_scripting) attacks.

### JSX իրենից ներկայացնում է օբյեկտ {#jsx-represents-objects}
### JSX Represents Objects {#jsx-represents-objects}

Babel-ը կոմպիլացնում է JSX-ը `React.createElement()` կանչերի։
Babel compiles JSX down to `React.createElement()` calls.

Այս երկու օրինակները միանման են.
These two examples are identical:

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

`React.createElement()`-ը կատարում է մի քանի ստուգում օգնելու համար ձեզ գրել սխալներից ազատ կոդ, բայց ըստ էության այն ստեղծում է այսպիսի օբյեկտ.
`React.createElement()` performs a few checks to help you write bug-free code but essentially it creates an object like this:

```js
// Նշում: այս կառուցվածքը պարզեցված ա
const element = {
  type: 'h1',
  props: {
    className: 'greeting',
    children: 'Ողջույն, աշխարհ'
  }
};
```

Այս օբյեկտները կոչվում են «React էլեմենտներ»։ Դուք կարող եք դրանք համարել այն բաների նկարագրություն, որոնք ցանկանում եք տեսնել էկրանին։ React-ը կարդում է այդ օբյեկտները և օգտագերծում է նրանց DOM կառուցելու և նրան թարմ պահելու համար։
These objects are called "React elements". You can think of them as descriptions of what you want to see on the screen. React reads these objects and uses them to construct the DOM and keep it up to date.

Մենք կուսումնասիրենք React էլեմենտների արտապատկերումը DOM-ում հաջորդ գլխում։
We will explore rendering React elements to the DOM in the next section.


>**Խորհուրդ:**
>
>Մենք խորհուրդ ենք տալիս օգտագործել [«Babel լեզվի սահմանում»](https://babeljs.io/docs/editors) ձեր խմբագրիչի համար, որպեսզի ES6 և JSX կոդերը ճիշտ ընդգծվեն։ Այս վեբկայքը օգտագործում է [«Oceanic Next»](https://labs.voronianski.com/oceanic-next-color-scheme/) գունային սխեման, որը համատեղելի է դրա հետ։

>**Tip:**
>
>We recommend using the ["Babel" language definition](https://babeljs.io/docs/editors) for your editor of choice so that both ES6 and JSX code is properly highlighted. This website uses the [Oceanic Next](https://labs.voronianski.com/oceanic-next-color-scheme/) color scheme which is compatible with it.
