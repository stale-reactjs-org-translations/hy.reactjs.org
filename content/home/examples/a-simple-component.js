class HelloMessage extends React.Component {
  render() {
    return (
      <div>
        Ողջույն {this.props.name}
      </div>
    );
  }
}

ReactDOM.render(
  <HelloMessage name="Պողոս" />,
  document.getElementById('hello-example')
);
