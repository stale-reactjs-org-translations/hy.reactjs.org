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

HTML form էլեմենտները React-ում ուրիշ DOM էլեմենտներից մի փոքր տարբեր են աշխատում, որովհետև form էլեմենտները իրականում պահում են որոշ ներքին վիճակ։ Դիտարկենք form-ի հետևյալ օրինակը.

```html
<form>
  <label>
    Name:
    <input type="text" name="name" />
  </label>
  <input type="submit" value="Submit" />
</form>
```

Այս form-ը լռությամբ ունի ունի HTML form-ի պահվածք, այն է, հաստատման(submit) ժամանակ գնալ նոր էջ։ Եթե ցանկանաք նման պահվածք React-ում, վերը նշված օրինակը ողղակի կաշխատի։ Բայց հիմնականում, հարմար է ունենալ JavaScript ֆունկցիա, որը կմշակի form-ի հաստատումը և կունենա հասանելիություն օգտագործողի կողմից մուտքագրված տվյալներին։ Սրան հասնելու միջոցներից մեկը «կառավարվող կոմպոնենտներ»(controlled components) գործելակերպի օգտագործումն է։

## Կառավարվող կոմպոնենտներ {#controlled-components}

HTML-ում, form էլեմենտները, ինչպիսիք են `<input>`-ը, `<textarea>`-ն կամ `<select>`-ը սովորաբար ղեկավարում են իրանց սեփական վիճակը և թարմացնում այն հիմնվելով օգտագործողի մուտքագրումների վրա։ React-ում փոփոխված վիճակը պահվում է կոմպոնենտի state հատկությունում և թարմացվում միայն [`setState()`](/docs/react-component.html#setstate)-ով։

Մենք կարող ենք համատեղել երկու մոտեցումները\` դարձնելով React-ի state-ը «ճշմարտության միակ աղբյուր»(single source of truth)։ Այդպիսով, React կոմպոնենտը, որը արտապատկերում է form-ը, նաև կկառավարի այդ form-ի պահվածքն ու վիճակը օգտագործողի հաջորդական մուտքագրների ժամանակ։ Մուտքագրվող form էլեմենտը, որի արժեքը կառավարվում է React-ի կողմից այս կերպ, կոչվում է «կառավարվող կոմպոնենտ»։

Օրինակ. եթե դուք ցանկանում եք ստեղծել նախորդ օրինակը, որում հաստատման ժամանակ նաև կտպվի օգտագործողի անունը, մենք կարող ենք գրել form-ը, որպես կառավարվող կոմպենոնտ.

```javascript{4,10-12,24}
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
    alert('Մուրքագրված անունն է` ' + this.state.value);
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

Տեղադրելով `value` ատրիբուտը մեր form էլեմենտի վրա, պատկերվող արժեքը միշտ կլինի `this.state.value`-ն\` դարձնելով React-ի վիճակը ճշմարտության աղբյուր։ Ու քանի որ օգտագործողի ամեն կոճակ սեղմելուց աշխատում է `handleChange`-ը, որը թարմացնում է React-ի state-ը, ապա պատկերվող արժեքը կթարմացվի օգտագործողի սեղմման ժամանակ։

Կառավարվող կոմպոնենտներում, վիճակի ցանկացած փոփոխության կապված է մշակող ֆունկցիա։ Դա կհեշտացնի օգտագործողի մուտքագրած արժեքի փոփոխումը կամ վավերացումը։ Օրինակ. եթե ցանկանում ենք, որ օգտագործողի կողմից գրված անունները ամբողջությամբ լինեն մեծատառ, մենք կարող ենք գրել `handleChange`-ը այսպես.

```javascript{2}
handleChange(event) {
  this.setState({value: event.target.value.toUpperCase()});
}
```

## textarea թեգ {#the-textarea-tag}

HTML-ում, `<textarea>` էլեմենտի տեքսն են հանդիսանում նրա զավակները.

```html
<textarea>
  Բարև Ձեզ, սա ինչ-որ տեքստ է textarea-ում
</textarea>
```

React-ում `<textarea>`-ն դրա փոխարեն օգտագործում է `value` ատրիբուտ։ Այդ իսկ պատճառով `<textarea>`-ի օգտագործումը կարող է նման լինել միատող input-ի օգտագոտծմանը.

```javascript{4-6,12-14,26}
class EssayForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'Խնդրում ենք գրել բանաստեղծություն ձեր նախնտրած DOM էլեմենտի մասին։'
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('Բանաստեղծությունը հետևյալն է` ' + this.state.value);
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

Նկատեք, որ `this.state.value`-ն սկզբնարժեքավորված է կոստրուկտորում, այսինքն, textarea-ն պատկերվելու է արդեն իսկ ինչ-որ տեքս պարունակելով։

## select թեգ {#the-select-tag}

HTML-ում `<select>`-ը ստեծում է ներքև-բացվող ցուցակ։ Օրինակ\` այս HTML-ը կստեղծի «համերի» ներքև-բացվող ցուցակ.

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
    alert('Ձեր նախնտրած համն է` ' + this.state.value);
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

ԵՎ առհասարակ, այն դարձնում է `<input type="text">`-ը, `<textarea>`-ն և `<select>`-ը իրար նման\` աշխատանքի տեսանկյունից. նրանք բոլորը ընդունում են `value` ատրիբուտ, որը դուք կարող եք օգտագործել կառավարվող կոմպոնենտ իրականացնելու հարմար։

> Նշում
>
> `value` ատրիբուտին կարող եք փոխանցել զանգված, որը թույլ կտա ընտրել բազմակի տարբերակներ `select` թեգում.
>
>```js
><select multiple={true} value={['B', 'C']}>
>```

## file input թեգ {#the-file-input-tag}

HTML-ում `<input type="file">`-ը օգտագործողին թույլ է տալիս սարքի պահոցից ընտրել մեկ կամ ավել ֆայլեր, դրանք սերվեր վերբեռնելու կամ դրանց հետ JavaScript-ով ([File API](https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications)<sub>`eng`</sub>-ի միջոցով) աշխատել համար։

```html
<input type="file" />
```

Քանի որ նրա արժեքը միայն կարդալու համար է(read-only), այն համարվում է **չկառավարվող** կոմպոնենտ React-ում։ Այն և ուրիշ այլ չկառավարվող կոմպոնենտներ կուսումնասիրվեն [ավելի ուշ](/docs/uncontrolled-components.html#the-file-input-tag)։

## Բազմակի Input-ների մշակում {#handling-multiple-inputs}

Երբ դուք կարիք ունեք մշակելու բազմակի կառավարվող `input` էլեմենտներ, դուք կարող եք ավելացնել `name` ատրիբուտ ամեն մի էլեմենտի վրա և թույլ տալ մշակող ֆունկցիային ընտրել թե ինչ անել\` հիմնվելով `event.target.name` արժեքի վրա։

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

Նկատեք թե ինչպես ենք մենք օգտագործում ES6-ի [«computed property name»](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Object_initializer#Computed_property_names)<sub>`eng`</sub> շարահյուսությունը\` վիճակի բանալին համապատասխան տրված մուտքային արժեքով թարմացնելու համար.

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

Նաև, քանի որ `setState()`-ը ավտոմատ [համադրում է թարմացնող օբյեցտը ընթացիկ state-ի հետ](/docs/state-and-lifecycle.html#state-updates-are-merged), մենք պետք է կանչենք այն փոփոխված մասերով միայն։

## Կառավարվող Input-ի null արժեք {#controlled-input-null-value}

Սահմանելով value prop-ը [կառավարվող կոմպոնենտի](/docs/forms.html#controlled-components) վրա, կանխվում է օգտագործողի փոփոխությունները input-ում, քանի դեռ դուք չեք ցանկացաել հակառակը։ Եթե դուք սահմանել եք `value`-ն, բայց input-ը մնացել է փոփոխելի, ապա միգուցե `value`-ին պատահմամբ փոխանցել եք `undefined` կամ `null`։

Հետևյալ կոդը ցուցադրում է վերը նշվածը։ (Այս input-ը սկզբից «կողպված» է, բայց փոքր-ինչ հետո այն կդառնա փոփոխելի։)

```javascript
ReactDOM.render(<input value="hi" />, mountNode);

setTimeout(function() {
  ReactDOM.render(<input value={null} />, mountNode);
}, 1000);

```

## Այլընտրանքներ կառավարելի կոմպոնենտներին {#alternatives-to-controlled-components}

Կառավարելի կոմպոնենտների օգտագործումը կարող է լինել հոգնեցուցիչ, որովհետև դուք պետ է գրեք իրադարձություն մշակող(event handler) ձեր տվյալների յուրաքանչյուր ուղղության համար և անցկացնեք ամբողջ մուտքագրված տվյալները React կոմպոնենտով։ Սա կարող է մասամբ լինել նիարդայնեցնող, երբ օրինակ փոխակերպեք արդեն իսկ գոյություն ունեցող կոդը React-ի, կամ ինտեգրեք React հավելվածը ոչ-React գրադարանի հետ։ Այսպիսի դեպքերում, հնարավոր է ցանկանաք փորձել [չկառավարվող կոմպոնենտները](/docs/uncontrolled-components.html). ալտերնատիվ գործելակերպ մուտքային form-երի իրականացման համար։

## Ամբողջական լուծում {#fully-fledged-solutions}

Եթե դուք փնտրում եք ամբողջական լուծում ներառած վավերացումը, այցելած դաշտերի հիշելը և form-ի հաստատման մշակումը, ապա [Formik](https://jaredpalmer.com/formik)<sub>`eng`</sub>-ը ամենահայտնի լուծումներից է։ Ինչևէ, այն կառուցված է նույն\` կառավարվող կոմպոնենտների ու վիճակի կառավարման, գաղափարների վրա. այդպիսով բաց մի թողեք նրանց ուսուցումը։
