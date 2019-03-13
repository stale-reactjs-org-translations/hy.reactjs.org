function Welcome(props) {
  return <h1>Ողջույն, {props.name}</h1>;
}

function App() {
  return (
    <div>
      <Welcome name="Պողոս" />
      <Welcome name="Պետրոս" />
      <Welcome name="Մարտիրոս" />
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
