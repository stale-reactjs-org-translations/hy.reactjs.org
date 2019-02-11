function tick() {
  const element = (
    <div>
      <h1>Ողջույն, աշխարհ!</h1>
      <h2>Ժամը {new Date().toLocaleTimeString()} է։</h2>
    </div>
  );
  // highlight-next-line
  ReactDOM.render(element, document.getElementById('root'));
}

setInterval(tick, 1000);
