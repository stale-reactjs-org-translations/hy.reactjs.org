const root = ReactDOM.createRoot(
  document.getElementById('root')
);

function tick() {
  const element = (
    <div>
      <h1>Ողջույն, աշխարհ</h1>
      <h2>Ժամը {new Date().toLocaleTimeString()} է։</h2>
    </div>
  );
  // highlight-next-line
  root.render(element);
}

setInterval(tick, 1000);
