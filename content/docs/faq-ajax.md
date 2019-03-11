---
id: faq-ajax
title: AJAX-ը և API-ները
permalink: docs/faq-ajax.html
layout: docs
category: FAQ
---

### Ինչպե՞ս կարող եմ ստեղծել AJAX կանչ {#how-can-i-make-an-ajax-call}

React֊ում դուք կարող եք օգտագործել ձեր նախընտրած ցանկացած AJAX գրադարան։ Ահա դրանցից մի քանի հանրաճանաչները\` [Axios](https://github.com/axios/axios)<sub>`eng`</sub>-ը, [jQuery AJAX](https://api.jquery.com/jQuery.ajax/)<sub>`eng`</sub>֊ը և զննարկիչի ներկառուցված [window.fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)<sub>`eng`</sub>-ը։

### Կոմպոնենտի կյանքի ցիկլի ո՞ր հատվածում կարող եմ ստեղծել AJAX կանչ  {#where-in-the-component-lifecycle-should-i-make-an-ajax-call}

You should populate data with AJAX calls in the [`componentDidMount`](/docs/react-component.html#mounting) lifecycle method. This is so you can use `setState` to update your component when the data is retrieved.

### Օրինակ\` Սահմանել լոկալ state-ը՝ օգտագործելով AJAX-ի արդյունքները {#example-using-ajax-results-to-set-local-state}

The component below demonstrates how to make an AJAX call in `componentDidMount` to populate local component state. 

The example API returns a JSON object like this:

```
{
  "items": [
    { "id": 1, "name": "Խնձորներ",  "price": "$2" },
    { "id": 2, "name": "Դեղձեր", "price": "$5" }
  ] 
}
```

```jsx
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    fetch("https://api.example.com/items")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.items
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Սխալ\` {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Բեռնվում է...</div>;
    } else {
      return (
        <ul>
          {items.map(item => (
            <li key={item.name}>
              {item.name} {item.price}
            </li>
          ))}
        </ul>
      );
    }
  }
}
```
