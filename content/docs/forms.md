---
id: forms
title: Ձևաթուղթ
permalink: docs/forms.html
prev: lists-and-keys.html
next: lifting-state-up.html
redirect_from:
  - "tips/controlled-input-null-value.html"
  - "docs/forms-zh-CN.html"
---

<<<<<<< HEAD
HTML form էլեմենտները React-ում ուրիշ DOM էլեմենտների հետ համեմատած մի փոքր այլ կերպ են աշխատում, որովհետև form էլեմենտներն իրականում պահում են որոշ ներքին վիճակ։ Դիտարկենք form-ի հետևյալ օրինակը.
=======
HTML form elements work a bit differently from other DOM elements in React, because form elements naturally keep some internal state. For example, this form in plain HTML accepts a single name:
>>>>>>> 0bb0303fb704147452a568472e968993f0729c28

```html
<form>
  <label>
    Name:
    <input type="text" name="name" />
  </label>
  <input type="submit" value="Submit" />
</form>
```

Այս form-ը լռությամբ ունի HTML form-ի պահվածք, այն է\` հաստատման(submit) ժամանակ գնալ նոր էջ։ Եթե ցանկանաք նման պահվածք React-ում, վերը նշված օրինակն ուղղակի կաշխատի։ Բայց հիմնականում, հարմար է ունենալ JavaScript ֆունկցիա, որը կմշակի form-ի հաստատումը և կունենա հասանելիություն օգտագործողի կողմից մուտքագրված տվյալներին։ Սրան հասնելու ստանդարտ միջոցը «կառավարվող կոմպոնենտներ»(controlled components) գործելակերպի օգտագործումն է։

## Կառավարվող կոմպոնենտներ {#controlled-components}

HTML-ում, form էլեմենտները, ինչպիսիք են `<input>`-ը, `<textarea>`-ն կամ `<select>`-ը սովորաբար ղեկավարում են իրենց սեփական վիճակը և թարմացնում այն\` հիմնվելով օգտագործողի մուտքագրումների վրա։ React-ում փոփոխված վիճակը պահվում է կոմպոնենտի state հատկությունում և թարմացվում միայն [`setState()`](/docs/react-component.html#setstate)-ով։

Մենք կարող ենք համատեղել երկու մոտեցումները\` դարձնելով React-ի state-ը «ճշմարտության միակ աղբյուր»(single source of truth)։ Այդպիսով, React կոմպոնենտը, որն արտապատկերում է form-ը, նաև կկառավարի այդ form-ի պահվածքն ու վիճակը օգտագործողի հաջորդական մուտքագրումների ժամանակ։ Մուտքագրվող form էլեմենտը, որի արժեքը կառավարվում է React-ի կողմից այս կերպ, կոչվում է «կառավարվող կոմպոնենտ»։

Օրինակ. եթե մենք ցանկանում եք, որ նախորդ օրինակը հաստատման ժամանակ նաև տպի օգտագործողի անունը, մենք կարող ենք գրել form-ը որպես կառավարվող կոմպոնենտ.

```javascript{4,10-12,21,24}
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('Մուտքագրված անունն է` ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

[**Try it on CodePen**](https://codepen.io/gaearon/pen/VmmPgp?editors=0010)

Քանի որ `value` ատրիբուտը տեղադրված է մեր form էլեմենտի վրա, պատկերվող արժեքը միշտ կլինի `this.state.value`-ն\` դարձնելով React-ի վիճակը ճշմարտության աղբյուր։ Ու քանի որ օգտագործողի ամեն կոճակ սեղմելիս աշխատում է `handleChange`-ը, որը թարմացնում է React-ի state-ը, ապա պատկերվող արժեքը կթարմացվի հենց որ օգտագործողը սեղմի կոճակը։

<<<<<<< HEAD
Կառավարվող կոմպոնենտներում վիճակի ցանկացած փոփոխության կապված է մշակող ֆունկցիա։ Դա կհեշտացնի օգտագործողի մուտքագրած արժեքի փոփոխումը կամ վավերացումը։ Օրինակ. եթե ցանկանում ենք, որ օգտագործողի կողմից գրված անունները ամբողջությամբ լինեն մեծատառ, մենք կարող ենք գրել `handleChange`-ն այսպես.

```javascript{2}
handleChange(event) {
  this.setState({value: event.target.value.toUpperCase()});
}
```
=======
With a controlled component, the input's value is always driven by the React state. While this means you have to type a bit more code, you can now pass the value to other UI elements too, or reset it from other event handlers.
>>>>>>> 0bb0303fb704147452a568472e968993f0729c28

## textarea թեգ {#the-textarea-tag}

HTML-ում, `<textarea>` էլեմենտի տեքստն են հանդիսանում իր զավակները.

```html
<textarea>
  Բարև Ձեզ, սա ինչ-որ տեքստ է textarea-ում
</textarea>
```

React-ում `<textarea>`-ն դրա փոխարեն օգտագործում է `value` ատրիբուտ։ Այդ իսկ պատճառով `<textarea>`-ի օգտագործումը կարող է նման լինել միատող input-ի օգտագործմանը.

```javascript{4-6,12-14,26}
class EssayForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'Խնդրում ենք գրել շարադրություն ձեր նախընտրած DOM էլեմենտի մասին։'
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('Շարադրությունը հետևյալն է` ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Essay:
          <textarea value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

Նկատեք, որ `this.state.value`-ն սկզբնարժեքավորված է կոստրուկտորում, այսինքն, textarea-ն պատկերվելու է արդեն իսկ ինչ-որ տեքստ պարունակելով։

## select թեգ {#the-select-tag}

HTML-ում `<select>`-ը ստեղծում է ներքև-բացվող ցուցակ։ Օրինակ\` այս HTML-ը կստեղծի «համերի» ներքև-բացվող ցուցակ.

```html
<select>
  <option value="grapefruit">Գրեյպֆրուտ</option>
  <option value="lime">Լայմ</option>
  <option selected value="coconut">Կոկոս</option>
  <option value="mango">Մանգո</option>
</select>
```

Նկատեք, որ «Կոկոս» տարբերակը իսկզբանե ընտրված է, քանի որ տեղադրված է `selected` ատրիբուտ։ React-ը `selected` ատրիբուտ օգտագործելու փոխարեն, օգտագործում է `value` ատրիբուտ անմիջապես `select` թեգի վրա։ Կառավարվող կոմպոնենտներում սա ավելի հարմար է, քանի որ դուք պետք է այն թարմացնենք միայն մեկ տեղում։ Օրինակ.

```javascript{4,10-12,24}
class FlavorForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: 'coconut'};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('Ձեր նախընտրած համն է` ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Pick your favorite flavor:
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="grapefruit">Գրեյպֆրուտ</option>
            <option value="lime">Լայմ</option>
            <option value="coconut">Կոկոս</option>
            <option value="mango">Մանգո</option>
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

[**Փորձել CodePen-ում**](https://codepen.io/gaearon/pen/JbbEzX?editors=0010)

ԵՎ առհասարակ, այն դարձնում է `<input type="text">`-ը, `<textarea>`-ն և `<select>`-ն իրար նման\` աշխատանքի տեսանկյունից. նրանք բոլորն ընդունում են `value` ատրիբուտ, որը դուք կարող եք օգտագործել կառավարվող կոմպոնենտ իրականացնելու հարմար։

> Նշում
>
> `value` ատրիբուտին կարող եք փոխանցել զանգված, որը թույլ կտա ընտրել բազմաթիվ տարբերակներ `select` թեգում.
>
>```js
><select multiple={true} value={['B', 'C']}>
>```

## file input թեգ {#the-file-input-tag}

HTML-ում `<input type="file">`-ը օգտագործողին թույլ է տալիս սարքի պահոցից ընտրել մեկ կամ ավելի ֆայլեր, դրանք սերվեր վերբեռնելու կամ դրանց հետ JavaScript-ով ([File API](https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications)<sub>`eng`</sub>-ի միջոցով) աշխատելու համար։

```html
<input type="file" />
```

Քանի որ նրա արժեքը միայն կարդալու համար է(read-only), այն համարվում է **չկառավարվող** կոմպոնենտ React-ում։ Այն և ուրիշ այլ չկառավարվող կոմպոնենտներ կուսումնասիրվեն [ավելի ուշ](/docs/uncontrolled-components.html#the-file-input-tag)։

## Բազմաթիվ Input-ների մշակում {#handling-multiple-inputs}

Երբ դուք կարիք ունեք մշակելու բազմաթիվ կառավարվող `input` էլեմենտներ, դուք կարող եք ավելացնել `name` ատրիբուտ ամեն մի էլեմենտի վրա և թույլ տալ մշակող ֆունկցիային ընտրել, թե ինչ անել\` հիմնվելով `event.target.name` արժեքի վրա։

Օրինակ.

```javascript{15,18,28,37}
class Reservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isGoing: true,
      numberOfGuests: 2
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <form>
        <label>
          Is going:
          <input
            name="isGoing"
            type="checkbox"
            checked={this.state.isGoing}
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          Հյուրերի քանակ.
          <input
            name="numberOfGuests"
            type="number"
            value={this.state.numberOfGuests}
            onChange={this.handleInputChange} />
        </label>
      </form>
    );
  }
}
```

[**Փորձել CodePen-ում**](https://codepen.io/gaearon/pen/wgedvV?editors=0010)

Նկատեք, թե ինչպես ենք մենք օգտագործում ES6-ի [«computed property name»](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Object_initializer#Computed_property_names)<sub>`eng`</sub> շարահյուսությունը\` վիճակի բանալին տրված մուտքային արժեքին համապատասխան թարմացնելու համար.

```js{2}
this.setState({
  [name]: value
});
```

Սա համարժեք է այս ES5 կոդին.

```js{2}
var partialState = {};
partialState[name] = value;
this.setState(partialState);
```

Նաև, քանի որ `setState()`-ն ավտոմատ [համադրում է թարմացնող օբյեկտն ընթացիկ state-ի հետ](/docs/state-and-lifecycle.html#state-updates-are-merged), մենք պետք է կանչենք այն փոփոխված մասերով միայն։

## Կառավարվող Input-ի null արժեք {#controlled-input-null-value}

Սահմանելով value prop-ը [կառավարվող կոմպոնենտի](/docs/forms.html#controlled-components) վրա\` կանխվում են օգտագործողի փոփոխությունները input-ում, քանի դեռ դուք չեք ցանկացել հակառակը։ Եթե դուք սահմանել եք `value`-ն, բայց input-ը մնացել է խմբագրելի(editable), ապա միգուցե `value`-ին պատահմամբ փոխանցել եք `undefined` կամ `null`։

Հետևյալ կոդը ցուցադրում է վերը նշվածը։ (Այս input-ը սկզբում «կողպված» է, բայց փոքր-ինչ հետո այն կդառնա խմբագրելի։)

```javascript
ReactDOM.render(<input value="hi" />, mountNode);

setTimeout(function() {
  ReactDOM.render(<input value={null} />, mountNode);
}, 1000);

```

## Այլընտրանքներ կառավարելի կոմպոնենտներին {#alternatives-to-controlled-components}

Կառավարելի կոմպոնենտների օգտագործումը կարող է լինել հոգնեցուցիչ, որովհետև դուք պետք է գրեք իրադարձություն մշակող(event handler) ձեր տվյալների յուրաքանչյուր հնարավոր փոփոխությունների համար և անցկացնեք ամբողջ մուտքագրված տվյալները React կոմպոնենտով։ Սա կարող է լինել հատկախես նյարդայնեցնող, երբ օրինակ փոխակերպեք արդեն իսկ գոյություն ունեցող կոդը React-ի կամ ինտեգրեք React հավելվածը ոչ-React գրադարանի հետ։ Այսպիսի դեպքերում, հնարավոր է ցանկանաք փորձել [չկառավարվող կոմպոնենտները](/docs/uncontrolled-components.html)\` ալտերնատիվ գործելակերպ մուտքային form-երի իրականացման համար։

## Ամբողջական լուծումներ {#fully-fledged-solutions}

Եթե դուք փնտրում եք ամբողջական լուծում\` ներառյալ վավերացումը, այցելած դաշտերը հիշելը և form-ի հաստատման մշակումը, ապա [Formik](https://jaredpalmer.com/formik)<sub>`eng`</sub>-ը ամենահայտնի լուծումներից է։ Այնուամենայնիվ, այն կառուցված է նույն\` կառավարվող կոմպոնենտների ու վիճակի կառավարման գաղափարների վրա. այդպիսով բաց մի թողեք նրանց ուսուցումը։
