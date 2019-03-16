---
id: faq-styling
title: Ձևավորում և CSS
permalink: docs/faq-styling.html
layout: docs
category: FAQ
---

### Ինչպե՞ս կարող եմ կոմպոնենտներին ավելացնել CSS կլասներ {#how-do-i-add-css-classes-to-components}

Փոխանցել տողշ\` որպես `className`-ի ատրիբուտ\`

```jsx
render() {
  return <span className="menu navigation-menu">Մենյու</span>
}
```

Սովորաբար CSS կլասները կախված են կոմպոնենտի props-ից կամ state-ից\`

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
>Եթե դուք հաճախ եք գրում նմանատիպ կոդ, [classnames](https://www.npmjs.com/package/classnames#usage-with-reactjs)<sub>eng</sub> հավելումը ավելի հեշտ կդարձնի այն։

### Կարո՞ղ եմ օգտագործել ներկառուցված ձևավորումներ {#can-i-use-inline-styles}

Այո, տես ձևավորման փաստաթղթավորումն [այտեղ](/docs/dom-elements.html#style)։

### Արդյո՞ք ներկառուցված ձևավորումները վատ են {#are-inline-styles-bad}

CSS կլասներն ընդհանուր առմամբ ավելի լավ են արտադրողականության համար, քան\` ներկառուցված ձևավորումները։

### Ի՞նչ է CSS-in-JS-ը {#what-is-css-in-js}

«CSS-in-JS»-ը օրինակ է, որտեղ CSS-ը արտաքին ֆայլերում գրելու փոխարեն այն ստեղծվում է JavaScript-ի միջոցով։ Կարդա CSS-in-JS գրադարանների համեմատությունն [այստեղ](https://github.com/MicheleBertoli/css-in-js)<sub>eng</sub>։

_Նկատի ունեցեք, որ այս գործառույթը React-ի մաս չի կազմում, այն տրամադրվում է կողմնակի գրադարանների կողմից։_ React-ը չգիտի, թե ինչպես են ձևավորումները սահմանված. եթե դեռ համոզված չեք, լավ սկիզբ է, ինչպես որ նախկինում\` սահմանել ձևավորումները առանձնացված `*.css` ֆայլում և կցել դրանք օգտագործելով [`className`](/docs/dom-elements.html#classname)։

### Կարո՞ղ եմ React-ում ստեղծել անմիացիաներ {#can-i-do-animations-in-react}

React-ը կարող է օգտագործվել անիմացիաներ ստեղծելու համար։ Օրինակ. տես\` [React Transition Group](https://reactcommunity.org/react-transition-group/)<sub>eng</sub>-ը և [React Motion](https://github.com/chenglou/react-motion)-ը։
