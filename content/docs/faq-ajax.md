---
id: faq-ajax
title: AJAX և API-ներ
permalink: docs/faq-ajax.html
layout: docs
category: FAQ
---

### Ինչպե՞ս կարող եմ ստեղծել AJAX կանչ {#how-can-i-make-an-ajax-call}

React-ում դուք կարող եք օգտագործել զննարկիչում ներկառուցված [window.fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)<sub>`eng`</sub>-ը կամ ցանկացած AJAX գրադարան, ինչպիսիք են [Axios](https://github.com/axios/axios)<sub>`eng`</sub>-ը կամ [jQuery AJAX](https://api.jquery.com/jQuery.ajax/)<sub>`eng`</sub>-ը։

### Կոմպոնենտի կյանքի ցիկլի ո՞ր հատվածում կարող եմ ստեղծել AJAX կանչ {#where-in-the-component-lifecycle-should-i-make-an-ajax-call}

Դուք պետք է ստանաք տվյալները AJAX հարցման միջոցով [`componentDidMount`](/docs/react-component.html#mounting) կյանքի ցիկլի մեթոդում։ Այնուհետև, տվյալները ստանալուց հետո դուք կարող եք օգտագործել `setState`\` կոմպոնենտը թարմացնելու համար։

### Օրինակ. թարմացնել լոկալ state-ը\` օգտագործելով AJAX հարցման արդյունքները {#example-using-ajax-results-to-set-local-state}

Ստորև ներկայացված կոմպոնենտը ցույց է տալիս, թե ինչպես կարելի է թարմացնել լոկալ state-ը\` կատարելով AJAX հարցում `componentDidMount`-ում։

Պատկերացնենք API-ը վերադարձնում է այսպիսի JSON օբյեկտ\`

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
        // Նշում. կարևոր է մշակել սխալներն այստեղ,
        // և ոչ թե «catch()» բլոկում, որպեսզի չմշակենք
        // կոմպոնենտի փաստացի սխալների բացառությունները։
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
      return <div>Սխալ. {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Բեռնում...</div>;
    } else {
      return (
        <ul>
          {items.map(item => (
            <li key={item.id}>
              {item.name} {item.price}
            </li>
          ))}
        </ul>
      );
    }
  }
}
```

Here is the equivalent with [Hooks](https://reactjs.org/docs/hooks-intro.html): 

```js
function MyComponent() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    fetch("https://api.example.com/items")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.name} {item.price}
          </li>
        ))}
      </ul>
    );
  }
}
```
