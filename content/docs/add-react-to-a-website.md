---
id: add-react-to-a-website
title: Ավելացնել React-ը վեբկայքում
permalink: docs/add-react-to-a-website.html
redirect_from:
  - "docs/add-react-to-an-existing-app.html"
prev: getting-started.html
next: create-a-new-react-app.html
---

Օգտագործեք այնքան քիչ կամ այնքան շատ React, որքան ինքներդ կցանկանաք։

React-ը իսկզբանե նախագծված է եղել այնպես, որ հնարավոր լինի աստիճանաբար ինտեգրել, և **դուք կարող եք օգտագործել այնքան քիչ կամ այնքան շատ React, որքան ինքներդ կցանկանաք։** Միգուցե ցանկանաք միայն մի փոքր ինտերակտիվություն ավելացնել ձեր գոյություն ունեցող էջին։ Դա անելու համար React կոմպոնենտները հիանալի միջոց են։

Վեբկայքերի մեծ մասը single-page հավելվածներ չեն, և կարիք էլ չունեն լինելու։ **Մի քանի տող կոդով և առանց կառուցման գործիքների** փորձիր React-ը քո վեբկայքի մի փոքր հատվածում։ Հաջորդիվ, դուք կարող եք կամ աստիճանաբար ընդլայնել նրա մասնաբաժինը կամ պահել այն մի քանի դինամիկ widget-ների համար։

---

- [Ավելացրու React-ը մեկ րոպեում](#add-react-in-one-minute)
- [Ոչ պարտադիր. փորձիր React-ը JSX-ով](#optional-try-react-with-jsx) (առանց bundler-ի անհրաժեշտության)

## Ավելացրու React-ը մեկ րոպեում {#add-react-in-one-minute}

Այս բաժնում մենք ցույց կտանք, թե ինչպես ավելացնել React կոմպոնենտ գոյություն ունեցող HTML էջում։ Վարժանքի համար կարող եք հետևել քայլերին\` կիրառելով նրանք ձեր սեփական վեբկայքի վրա կամ ստեղծել դատարկ HTML ֆայլ։

Բարդ գործիքներ կամ տեղադրում չկա. **այս բաժինը վերջացնելու համար ձեզ միայն անհրաժեշտ է հասանելիություն համացանցին և հատկացնել մեկ րոպե ձեր ժամանակից։**

Ոչ պարտադիր. [Ներբեռնեք ամբողջ օրինակը (արխիվացրած վիճակով 2ԿԲ)](https://gist.github.com/gaearon/6668a1f6986742109c00a581ce704605/archive/f6c882b6ae18bde42dcf6fdb751aae93495a2275.zip)

### Քայլ 1. Ավելացրեք DOM կոնտեյներ HTML-ում {#step-1-add-a-dom-container-to-the-html}

Սկզբում բացեք HTML ֆայլը, որը ցանկանում եք խմբագրել(edit)։ Ավելացրեք դատարկ `<div>` թեգ\` նշելու համար այն տեղը, որտեղ ցանկանում եք ցույց տալ ինչ-որ բան React-ով։ Օրինակ.

```html{3}
<!-- ... գոյություն ունեցող HTML ... -->

<div id="like_button_container"></div>

<!-- ... գոյություն ունեցող HTML ... -->
```

Մենք այս `<div>`-ին տվեցինք եզակի `id` HTML ատրիբուտ։ Սա մեզ թույլ կտա հետագայում գտնել այն JavaScript կոդից և պատկերել React կոմպոնենտը նրա ներսում։

>Խորհուրդ
>
>Դուք կարող եք տեղադրել այսպիսի `<div>` «կոնտեյներներ» `<body>` թեգի ներսում **ցանկացած** տեղ։ Դուք կարող եք մեկ էջում ունենալ միմյանցից անկախ այնքան DOM կոնտեյներներ, որքան կցանկանաք։ Սովորաբար դրանք լինում են դատարկ. React-ը փոխարինելու է DOM կոնտեյներների ներսում գոյություն ունեցող ցանկացած բովանդակություն։

### Քայլ 2. Ավելացնել script թեգեր {#step-2-add-the-script-tags}

Հաջորդիվ, HTML էջում, անմիջապես `</body>` թեգի փակվելուց առաջ, ավելացրեք երեք `<script>` թեգ.

```html{5,6,9}
  <!-- ... ուրիշ HTML ... -->

<<<<<<< HEAD
  <!-- Ներբեռնել React-ը։ -->
  <!-- Նշում: տեղակայման(deploy) ժամանակ, փոխարինեք «development.js»-ը «production.min.js»-ով։ -->
  <script src="https://unpkg.com/react@16/umd/react.development.js" crossorigin></script>
  <script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js" crossorigin></script>
=======
  <!-- Load React. -->
  <!-- Note: when deploying, replace "development.js" with "production.min.js". -->
  <script src="https://unpkg.com/react@17/umd/react.development.js" crossorigin></script>
  <script src="https://unpkg.com/react-dom@17/umd/react-dom.development.js" crossorigin></script>
>>>>>>> 0bb0303fb704147452a568472e968993f0729c28

  <!-- Ներբեռնել մեր React կոմպոնենտը։ -->
  <script src="like_button.js"></script>

</body>
```

Առաջին երկու թեգերը ներբեռնում են React-ը։ Երրորդը կներբեռնի ձեր կոմպոնենտի կոդը։

### Քայլ 3. Ստեղծել React կոմպոնենտ {#step-3-create-a-react-component}

Ստեղծեք `like_button.js` անունով ֆայլ\` ձեր HTML էջի հարևանությամբ։

Բացեք **[այս սկզբնական կոդը](https://gist.github.com/gaearon/0b180827c190fe4fd98b4c7f570ea4a8/raw/b9157ce933c79a4559d2aa9ff3372668cce48de7/LikeButton.js)** և տեղադրեք այն ֆայլում, որը ստեղծեցիք։

>Խորհուրդ
>
>Այս կոդը հայտարարում է `LikeButton` անունով React կոմպոնենտ։ Մի անհանգստացեք, եթե դուք դեռ չեք հասկանում այն. մենք կծածկենք React-ի կառուցողական բլոկները ավելի ուշ մեր [ձեռնարկում](/tutorial/tutorial.html) և [հիմանական գաղափարների ուղեցույցում](/docs/hello-world.html)։ Հիմա, եկեք ուղղակի նայենք, թե ինչպես է այն պատկերվում էկրանին։

**[Սկզբնական կոդից](https://gist.github.com/gaearon/0b180827c190fe4fd98b4c7f570ea4a8/raw/b9157ce933c79a4559d2aa9ff3372668cce48de7/LikeButton.js)** հետո ավելացրեք ևս երկու տող `like_button.js`-ի վերջում.

```js{3,4}
// ... տեղադրված սկզբնական կոդը ...

const domContainer = document.querySelector('#like_button_container');
ReactDOM.render(e(LikeButton), domContainer);
```

<<<<<<< HEAD
Այս երկու տող կոդը գտնում է `<div>`-ը, որն առաջին քայլում ավելացրել էինք HTML-ում, և հետո ցույց է տալիս մեր React կոմպոնենտը\` «Like» կոճակը դրա ներսում։
=======
These two lines of code find the `<div>` we added to our HTML in the first step, and then display our "Like" button React component inside of it.
>>>>>>> 0bb0303fb704147452a568472e968993f0729c28

### Ահա և վերջ {#thats-it}

Չկա չորորդ քայլ։ **Դուք հենց նոր ավելացրեցիք առաջին React կոմպոնոնտը ձեր վեբկայքում։**

Անցեք հաջորդ բաժիններին, եթե ցանկանում եք իմանալ ավելին React-ի ինտեգրման մասին։

**[Նայեք օրինակի ամբողջ կոդը](https://gist.github.com/gaearon/6668a1f6986742109c00a581ce704605)**

**[Ներբեռնեք ամբողջ օրինակը (արխիվացրած վիճակով 2ԿԲ)](https://gist.github.com/gaearon/6668a1f6986742109c00a581ce704605/archive/f6c882b6ae18bde42dcf6fdb751aae93495a2275.zip)**

### Խորհուրդ. վերաօգտագործեք կոմպոնենտը {#tip-reuse-a-component}

Հիմնականում դուք կցանկանաք պատկերել React կոմպոնենտները HTML էջի մի քանի մասերում։ Այստեղ ներկայացված է օրինակ, որը պատկերում է «Like» կոճակը երեք անգամ և նրան փոխանցում ինչ-որ տվյալներ.

[Նայեք օրինակի ամբողջ կոդը](https://gist.github.com/gaearon/faa67b76a6c47adbab04f739cba7ceda)

[Ներբեռնեք ամբողջ օրինակը (արխիվացրած վիճակով 2ԿԲ)](https://gist.github.com/gaearon/faa67b76a6c47adbab04f739cba7ceda/archive/9d0dd0ee941fea05fd1357502e5aa348abb84c12.zip)

>Խորհուրդ
>
>Այս ռազմավարությունը հատկապես արդյունավետ է, երբ էջի\` React-ով գրված մասերը, միմյանցից մեկուսացված են։ React կոդի ներսում ավելի հեշտ է օգտագործել [կոմպոնենտի կոմպոզիցիա](/docs/components-and-props.html#composing-components)։

### Խորհուրդ. մինիֆիկացրեք JavaScript կոդը production-ի համար {#tip-minify-javascript-for-production}

Մինչ ձեր վեբկայքի production-ում տեղակայելը, հաշվի առեք, որ չմինիֆիկացված JavaScript կոդը կարող է զգալիորեն դանդաղեցնել էջը օգտագործողների համար։

Եթե դուք արդեն մինիֆիկացրել եք հավելվածի սկրիպերը, ապա նաև եղեք համոզված, որ տեղակայված HTML-ը ներբեռնում է React-ի այն տարբերակները, որոնք վերջանում են `production.min.js`-ով.

```js
<script src="https://unpkg.com/react@17/umd/react.production.min.js" crossorigin></script>
<script src="https://unpkg.com/react-dom@17/umd/react-dom.production.min.js" crossorigin></script>
```

Եթե դուք չեք մինիֆիկացրել ձեր սկրիպները, [ահա դա անելու տարբերակներից մեկը](https://gist.github.com/gaearon/42a2ffa41b8319948f9be4076286e1f3)։

## Ոչ պարտադիր. փորձել React-ը JSX-ով {#optional-try-react-with-jsx}

Վերը նշված օրինակներում մենք միայն հիմնվեցինք այն հատկությունների վրա, որոնք բնականոն կերպով աջակցվում են զննարկչի կողմից։ Ահա թե ինչու մենք օգտագործեցինք JavaScript ֆունկցիայի կանչ\` React-ին ասելու համար, թե ինչ պատկերի.

```js
const e = React.createElement;

// Պատկերել "Like" <button>-ը
return e(
  'button',
  { onClick: () => this.setState({ liked: true }) },
  'Like'
);
```

Ինչևէ, React-ը, փոխարենը, նաև առաջարկում է [JSX](/docs/introducing-jsx.html) օգտագործելու տարբերակը.

```js
// Պատկերել "Like" <button>-ը
return (
  <button onClick={() => this.setState({ liked: true })}>
    Like
  </button>
);
```

Այս երկու կոդի կտորները համարժեք են։ Չնայած **JSX-ը [ամենևին պարտադիր չէ](/docs/react-without-jsx.html)**, շատ մարդիկ օգտակար են համարում գրել UI կոդ\` React-ի հետ օգտագործելով այլ գրադարաներ։

Դուք կարող եք խաղալ JSX-ի հետ\` օգտագործելով [այս առցանց փոխարկիչը](https://babeljs.io/en/repl#?babili=false&browsers=&build=&builtIns=false&spec=false&loose=false&code_lz=DwIwrgLhD2B2AEcDCAbAlgYwNYF4DeAFAJTw4B88EAFmgM4B0tAphAMoQCGETBe86WJgBMAXJQBOYJvAC-RGWQBQ8FfAAyaQYuAB6cFDhkgA&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=false&fileSize=false&timeTravel=false&sourceType=module&lineWrap=true&presets=es2015%2Creact%2Cstage-2&prettier=false&targets=&version=7.4.3)։

### Արագ փորձել JSX-ը {#quickly-try-jsx}

Ձեր պրոյեկտում JSX-ը փորձելու ամենաարագ եղանակը\` այս `<script>` թեգի ավելացումն է ձեր էջ.

```html
<script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
```

<<<<<<< HEAD
Հիմա կարող եք օգտագործել JSX ցանկացած `<script>` թեգում\` ավելացնելով `type="text/babel"` ատրիբուտը դրա վրա։ Ահա [JSX-ով HTML ֆայլի օրինակ](https://raw.githubusercontent.com/reactjs/reactjs.org/master/static/html/single-file-example.html), որը կարող եք ներբեռնել և խաղալ։
=======
Now you can use JSX in any `<script>` tag by adding `type="text/babel"` attribute to it. Here is [an example HTML file with JSX](https://raw.githubusercontent.com/reactjs/reactjs.org/main/static/html/single-file-example.html) that you can download and play with.
>>>>>>> 0bb0303fb704147452a568472e968993f0729c28

Այս մոտեցումը հիանալի է սովորելու և հասարակ ցուցադրություններ ստեղծելու համար։ Այնուամենայնիվ, այն դարձնում է ձեր վեբկայքը դանդաղ և **ոչ հարմար production-ի համար**։ Երբ դուք պատրաստ լինեք շարժվել առաջ, ջնջեք այս նոր `<script>` թեգը և `type="text/babel"`ատրիբուտը, որը դուք ավելացրել էիք։ Փոխարենը, հաջորդ բաժնում դուք կտեղադրեք JSX նախապրոցեսոր, որպեսզի ավտոմատ կերպով փոխարկեք ձեր բոլոր `<script>` թեգերը։

### Ավելացնել JSX պրոյեկտին {#add-jsx-to-a-project}

JSX-ի ավելացումը պրոյեկտում չի պահանջում bundler-ի կամ «development server»-ի նման բարդ գործիքներ։ Իրականում, JSX-ի ավելացումը **շատ նման է CSS նախապրոցեսորի ավելացմանը**։ Միակ պահանջը ձեր համակարգչի վրա տեղադրված [Node.js](https://nodejs.org/) ունենալն է։

Տերմինալում, գնացեք ձեր պրոյեկտի պանակ(folder), և գրեք այս երկու հրամանները.

1. **Քայլ 1.** աշխատեցրեք `npm init -y` (եթե այն հաջողությամբ չավարտվի [ստուգեք սա\` ուղղման համար](https://gist.github.com/gaearon/246f6380610e262f8a648e3e51cad40d))
2. **Քայլ 2.** աշխատեցրեք `npm install babel-cli@6 babel-preset-react-app@3`

>Խորհուրդ
>
>Այստեղ մենք **օգտագործում ենք npm միայն այն պատճառով, որ տեղադրենք JSX նախապրոցեսորը.** ուրիշ ոչնչի համար դուք դրա կարիքը չունեք։ Թե՛ React-ը և, թե՛ հավելվածի կոդը կարող են մնալ `<script>` թեգերում առանց որևէ փոփոխության։

Շնորհավորում ենք։ Դուք հենց նոր ձեր պրոյեկտում ավելացրեցիք **production-ի համար պատրաստ JSX կարգավորումներ**։


### Աշխատեցնել JSX նախապրոցեսորը {#run-jsx-preprocessor}

Ստեղծեք `src` անունով պանակ և աշխատեցրեք այս հրամանը տերմինալում.

```
npx babel --watch src --out-dir . --presets react-app/prod
```

>Խորհուրդ
>
>`npx`-ում տառասխալ չկա, սա [փաթեթ(package) աշխատացնող գործիք է, որը գալիս է npm-ի 5.2+ տարբերակների հետ](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b):
>
>Եթե դուք տեսնեք այսպիսի սխալի ծանուցում. «You have mistakenly installed the babel package», ապա հավանաբար դուք բաց եք թողել [նախորդ քայլը](#add-jsx-to-a-project)։ Կատարեք այն նույն պանակում և կրկին փորձեք վերջին հրամանը։

Մի սպասեք սրա ավարտին. այս հրամանը JSX-ի համար միացնում է ավտոմատ «դիտորդ»(watcher)։

Եթե դուք հիմա ստեղծեք `src/like_button.js` անունով ֆայլ, այս **[JSX-ի սկզբնական կոդով](https://gist.github.com/gaearon/c8e112dc74ac44aac4f673f2c39d19d1/raw/09b951c86c1bf1116af741fa4664511f2f179f0a/like_button.js)**, դիտորդը կստեղծի նախապրոցեսավորված `like_button.js` մաքուր JavaScript կոդով\` հարմար զննարկչին։ Երբ դուք խմբագրեք(edit) JSX կոդով ֆայլը, փոխակերպումն ավտոմատ կաշխատի։

Որպես բոնուս, սա նաև թույլ կտա ձեզ օգտագործել ժամանակակից JavaScript շարահյուսության հատկություններ, ինչպիսիք են կլասները, առանց անհանգստանալու հին զննարկիչների համար։ Գործիքը, որը հենց նոր օգտագործեցինք, կոչվում է Babel. կարող եք սովորել ավելին [նրա փաստաթղթավորումից](https://babeljs.io/docs/en/babel-cli/)։

Եթե նկատեք, որ հարմարվել եք կառուցման գործիքների հետ և ցանկանում եք, որ նրանք անեն ավելին ձեզ համար, [հաջորդ բաժինը](/docs/create-a-new-react-app.html) նկարագրում է մի քանի շատ հայտնի և մատչելի գործիքակազմ։ Եթե ոչ, այս սկրիպտ թեգերը հիանալի կանեն իրենց գործը։
