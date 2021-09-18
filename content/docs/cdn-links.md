---
id: cdn-links
title: CDN հղումներ
permalink: docs/cdn-links.html
prev: create-a-new-react-app.html
next: release-channels.html
---

Ե՛Վ React-ը, և՛ ReactDOM-ը հասանելի են CDN-ից։

```html
<script crossorigin src="https://unpkg.com/react@17/umd/react.development.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@17/umd/react-dom.development.js"></script>
```

Վերը նշված տարբերակները միայն կառուցման ընթացքի(development)-ի համար են և հարմար չեն production-ի համար։ React-ի մինիֆիկացված և օպտիմիզացված տարբերակները հասանելի են\`

```html
<script crossorigin src="https://unpkg.com/react@17/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@17/umd/react-dom.production.min.js"></script>
```

<<<<<<< HEAD
`react`-ի և `react-dom`-ի հատուկ տարբերակ բեռնելու համար, փոխարինեք `16`-ը տարբերակի համարով։
=======
To load a specific version of `react` and `react-dom`, replace `17` with the version number.
>>>>>>> 0bb0303fb704147452a568472e968993f0729c28

### Ինչի՞ համար է `crossorigin` ատրիբուտը {#why-the-crossorigin-attribute}

Եթե ներբեռնում եք React-ը CDN-ից, մենք խորհուրդ ենք տալիս պահել [`crossorigin`](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes)<sub>`eng`</sub> ատրիբուտը։

```html
<script crossorigin src="..."></script>
```

Մենք նաև խորհուրդ ենք տալիս ստուգել, թե արդյոք ձեր օգտագործած CDN-ը տեղադրում է `Access-Control-Allow-Origin: *` HTTP header.

![Access-Control-Allow-Origin: * ](../images/docs/cdn-cors-header.png)

Սա թույլ է տալիս ունենալ [սխալների մշակման ավելի լավ փորձ](/blog/2017/07/26/error-handling-in-react-16.html) React 16-ում և հաջորդ տարբերակներում։
