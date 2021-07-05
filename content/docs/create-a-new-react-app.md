---
id: create-a-new-react-app
title: Ստեղծել նոր React հավելված
permalink: docs/create-a-new-react-app.html
redirect_from:
  - "docs/add-react-to-a-new-app.html"
prev: add-react-to-a-website.html
next: cdn-links.html
---

Օգտագործիր ինտեգրված գործիքակազմ\` օգտագործողի և ծրագրավորողի լավագույն փոխազդեցության փորձի համար։

Այս էջը նկարագրում է մի քանի հայտնի React գործիքակազմեր, որոնք կօգնեն նմանատիպ առաջադրանքներ լուծելիս.

* Ընդլայնում մինչև մեծ քանակի ֆայլեր և կոմպոնենտներ։
* Կողմնակի գրադարանների օգտագործում npm-ից։
* Հիմնական սխալների վաղաժամ հայտնաբերում։
* Կառուցման ընթացքում CSS-ի և JS-ի ինտերակտիվ խմբագրում։
* Վերջնական ելքային արժեքի օպտիմիզացիա։

Այս էջում խորհուրդ տրված գործիքակազմերը **սկսելու համար կարգավորումներ չեն պահանջում**։

## հնարավոր է, որ դուք գործիքակազմի կարիք չունենաք {#you-might-not-need-a-toolchain}

Եթե դուք փորձ չունեք վերը ներկայացված խնդիրների հետ կամ դեռ ձեզ հարմարավետ չեք զգում JavaScript գործիքներ օգտագործելիս, դիտարկեք [«ավելացնել React-ը ինչպես `<script>` թեգ HTML էջում»](/docs/add-react-to-a-website.html) և, ոչ պարտադիր, [«Փորձիր React-ը JSX-ի հետ»](/docs/add-react-to-a-website.html#optional-try-react-with-jsx) բաժինները։

Սա նաև **հեշտագույն ճանապարհն է React-ը գոյություն ունեցող վեբկայքում ինտեգրելու համար։** Դուք միշտ կարող եք ավելացնել ավելի մեծ գործիքակազմ, եթե գտնեք դա օգտակար։

## Խորհուրդ տրվող գործիքակազմեր {#recommended-toolchains}

React-ի թիմը նախ և առաջ խորհուրդ է տալիս այս լուծումները.

- Եթե դուք **սովորում եք** կամ **ստեղծում եք նոր [single-page](/docs/glossary.html#single-page-application) հավելված** օգտագործեք [Create React App](#create-react-app)-ը։
- Եթե դուք կառուցում եք **սերվերում արտապատկերվող վեբկայք Node.js-ով**, ապա փորձեք [Next.js](#nextjs)-ը։
- Եթե դուք կառուցում եք **ստատիկ բովանդակություն-կողմնորոշված վեբկայք**, ապա փորձեք [Gatsby](#gatsby)-ին։
- Եթե դուք կառուցում եք **կոմպոնենտների գրադարան** կամ **ինտեգրում եք գոյություն ունեցող կոդի հետ**, ապա փորձեք [ավելի ճկուն գործիքակազմ](#more-flexible-toolchains).

### Create React App {#create-react-app}

[Create React App](https://github.com/facebookincubator/create-react-app)<sub>`eng`</sub>-ը հարմար միջավայր է **React-ը սովորելու**  համար, և լավագույն տարբերակը React-ով **նոր [single-page](/docs/glossary.html#single-page-application) հավելված** կառուցելու համար։

<<<<<<< HEAD
Այն տեղադրում է ձեր կառուցման միջավայրը\` թույլ տալով օգտագործել վերջին JavaScript հատկությունները, տրամադրում է գեղեցիկ փոխազդեցության փորձ ծրագրավորողի համար, և օպտիմիզացնում է ձեր հավելվածը production-ի համար։ Դուք պետք է ունենաք Node >= 8.10 և npm >= 5.6 ձեր մեքենայի վրա։ Պրոյեկտ ստեղծելու համար աշխատեցրեք.
=======
It sets up your development environment so that you can use the latest JavaScript features, provides a nice developer experience, and optimizes your app for production. You’ll need to have [Node >= 10.16 and npm >= 5.6](https://nodejs.org/en/) on your machine. To create a project, run:
>>>>>>> 0bb0303fb704147452a568472e968993f0729c28

```bash
npx create-react-app my-app
cd my-app
npm start
```

>Խորհուրդ
>
>`npx`-ում տառասխալ չկա, սա [փաթեթ(package) աշխատեցնող գործիք է, որը գալիս է npm-ի 5.2+ տարբերակների հետ](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b)<sub>`eng`</sub>:

«Create React App»-ը չի մշակում backend-ի տրամաբանություն կամ տվյալների հենքեր. այն ընդամենը ստեղծում է frontend-ի կառուցման քայլերը. այսպիսով կարող եք օգտագործել այն ձեր ցանկացած backend-ի հետ։ Իրականում, այն իր հերթին օգտագործում է [Babel](https://babeljs.io/)<sub>`eng`</sub> և [webpack](https://webpack.js.org/)<sub>`eng`</sub>, բայց դուք կարիք չունեք իմանալ նրանց մասին։

Երբ պատրաստ լինեք տեղակայելու production-ում, աշխատեցրեք `npm run build`։ Այն `build` պանակում կստեղծի ձեր հավելվածի օպտիմիզացված տարբերակը։ «Create React App»-ի մասին կարող եք իմանալ ավելին նրա [README-ից](https://github.com/facebookincubator/create-react-app#create-react-app--)<sub>`eng`</sub> և [օգտագործողի ձեռնարկից](https://facebook.github.io/create-react-app/)<sub>`eng`</sub>։

### Next.js {#nextjs}

[Next.js](https://nextjs.org/)<sub>`eng`</sub>-ը React-ով կառուցված հայտնի և թեթև framework է, **ստատիկ և սերվերում արտապատկերվող հավելվածների** համար։ Այն ներառում է **ձևավորման և routing-ի լուծումներ** և ենթադրում է, որ դուք օգտագործում եք [Node.js](https://nodejs.org/)<sub>`eng`</sub>-ը որպես սերվերի միջավայր։

Սովորիր Next.js-ը նրա պաշտոնական [ձեռնարկով](https://nextjs.org/learn/)<sub>`eng`</sub>։

### Gatsby {#gatsby}

[Gatsby](https://www.gatsbyjs.org/)<sub>`eng`</sub>-ն լավագույն տարբերակն է React-ով **ստատիկ վեբկայքեր** ստեղծելու համար։ Այն թույլ է տալիս ձեզ օգտագործել React կոմպոնենտներ, բայց ելքային արժեքում ստանալ նախա-արտապատկերված HTML և CSS\` երաշխավորելու համար ամենաարագ ներբեռնումը։

Սովորիր Gatsby-ն նրա պաշտոնական [ձեռնարկով](https://www.gatsbyjs.org/docs/)<sub>`eng`</sub> և [այս մեկնարկային փաթեթների ցանկից](https://www.gatsbyjs.org/docs/gatsby-starters/)։

### Ավելի ճկուն գործիքակազմեր {#more-flexible-toolchains}

Ներկայացված գործիքակազմերը առաջարկում են ավելի մեծ ճկունություն և ընտրություն։ Վերջիններս մենք առաջարկում ենք ավելի փորձառու օգտագործողներին.

- **[Neutrino](https://neutrinojs.org/)**<sub>`eng`</sub>-ն համատեղում է իր մեջ [webpack](https://webpack.js.org/)-ի հզորությունը և preset-ների պարզությունը. ներառում է preset [React հավելվածների](https://neutrinojs.org/packages/react/) և [React կոմպոնենտների](https://neutrinojs.org/packages/react-components/) համար։

<<<<<<< HEAD
- **[Parcel](https://parceljs.org/)**<sub>`eng`</sub>-ն արագ, զրո կարգավորումներով վեբ հավելվածների bundler է, որն աշխատում է [React-ի հետ](https://parceljs.org/recipes.html#react)<sub>`eng`</sub>։
=======
- **[Nx](https://nx.dev/react)** is a toolkit for full-stack monorepo development, with built-in support for React, Next.js, [Express](https://expressjs.com/), and more.

- **[Parcel](https://parceljs.org/)** is a fast, zero configuration web application bundler that [works with React](https://parceljs.org/recipes.html#react).
>>>>>>> 0bb0303fb704147452a568472e968993f0729c28

- **[Razzle](https://github.com/jaredpalmer/razzle)**<sub>`eng`</sub>-ը սերվերում արտապատկերող framework է, որը չի պահանջում որևէ կարգավորում, բայց առաջարկում է ավելի մեծ ճկունություն, քան Next.js-ը։

## Ստեղծել գործիքակազմ զրոյից {#creating-a-toolchain-from-scratch}

Սովորաբար JavaScript-ի կառուցման գործիքակազմը բաղկացած է.

* **Փաթեթների մենեջերից**, ինչպիսին է [Yarn](https://yarnpkg.com/)<sub>`eng`</sub>-ը կամ [npm](https://www.npmjs.com/)<sub>`eng`</sub>-ը։ Այն տալիս է հասանելիություն կողմնակի փաթեթների մեծ մասին և թույլ է տալիս հեշտությամբ տեղադրել կամ թարմացնել դրանք։

* **bundler**-ից, ինչպիսին է [webpack](https://webpack.js.org/)<sub>`eng`</sub>-ը կամ [Parcel](https://parceljs.org/)<sub>`eng`</sub>-ը։ Այն թույլ է տալիս գրել մոդուլային կոդ և հավաքել այն միասին փոքր փաթեթների\` օպտիմիզացնելու համար ներբեռնման ժամանակը։

* **Կոմպիլյատորից**, ինչպիսին է [Babel](https://babeljs.io/)-ը։ Այն թույլ է տալիս գրել ժամանակակից JavaScript կոդ, որը շարունակում է աշխատել հին զննարկիչներում։

Եթե նախընտրում եք տեղադրել ձեր սեփական JavaScript գործիքակազմը զրոյից, ապա [նայեք այս ձեռնարկը](https://blog.usejournal.com/creating-a-react-app-from-scratch-f3c693b84658)<sub>`eng`</sub>, որում վերստեղծվում են «Create React App»-ի որոշ ֆունկցիոնալներ։

Մի մոռացեք համոզվել, որ ձեր գործիքակազմը [ճիշտ է կարգավորված production-ի համար](/docs/optimizing-performance.html#use-the-production-build)։
