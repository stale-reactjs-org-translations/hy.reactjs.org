---
id: faq-styling
title: Ձևավորում և CSS
permalink: docs/faq-styling.html
layout: docs
category: FAQ
---

### Ինչպե՞ս կարող եմ կոմպոնենտներին ավելացնել CSS կլասներ {#how-do-i-add-css-classes-to-components}

Փոխանցել տողը\` որպես `className`-ի ատրիբուտ.

```jsx
render() {
  return <span className="menu navigation-menu">Մենյու</span>
}
```

Սովորաբար CSS կլասները կախված են կոմպոնենտի props-ից կամ state-ից.

```jsx
render() {
  let className = 'menu';
  if (this.props.isActive) {
    className += ' menu-active';
  }
  return <span className={className}>Մենյու</span>
}
```

>Խորհուրդ
>
>Եթե դուք հաճախ եք գրում նմանատիպ կոդ, [classnames](https://www.npmjs.com/package/classnames#usage-with-reactjs)<sub>eng</sub> փաթեթը կպարզեցնի այն։

### Կարո՞ղ եմ օգտագործել ներկառուցված ձևավորումներ {#can-i-use-inline-styles}

Այո, տես ձևավորման փաստաթղթավորումն [այտեղ](/docs/dom-elements.html#style)։

### Արդյո՞ք ներկառուցված ձևավորումների օգտագործումը վատ է {#are-inline-styles-bad}

CSS կլասներն ընդհանուր առմամբ ավելի լավ են արտադրողականության տեսանկյունից, քան\` ներկառուցված ձևավորումները։

### Ի՞նչ է CSS-in-JS-ը {#what-is-css-in-js}

<<<<<<< HEAD
«CSS-in-JS»-ը հղվում է ձևանմուշին, որտեղ CSS-ը արտաքին ֆայլերում սահմանվելու փոխարեն այն ստեղծվում է JavaScript-ի միջոցով։ Կարդա CSS-in-JS գրադարանների համեմատությունն [այստեղ](https://github.com/MicheleBertoli/css-in-js)<sub>eng</sub>։
=======
"CSS-in-JS" refers to a pattern where CSS is composed using JavaScript instead of defined in external files.
>>>>>>> 0bb0303fb704147452a568472e968993f0729c28

_Նկատի ունեցեք, որ այս գործառույթը React-ի մաս չի կազմում, այն տրամադրվում է կողմնակի գրադարանների կողմից։_ React-ը չգիտի, թե ինչպես են ձևավորումները սահմանված. եթե դեռ չեք կողմնորոշվել, ապա սկզբի համար կարող եք, սովորականի պես, սահմանել ձևավորումներն առանձնացված `*.css` ֆայլում և հղվել դրանց օգտագործելով [`className`](/docs/dom-elements.html#classname)։

### Կարո՞ղ եմ React-ում ստեղծել անիմացիաներ {#can-i-do-animations-in-react}

React-ը կարող է օգտագործվել անիմացիաներ ստեղծելու համար։ Օրինակ. տես\` [React Transition Group](https://reactcommunity.org/react-transition-group/)<sub>eng</sub>-ը և [React Motion](https://github.com/chenglou/react-motion)-ը կամ [React Spring](https://github.com/react-spring/react-spring)-ը։
