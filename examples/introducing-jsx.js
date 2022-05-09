function formatName(user) {
  return user.firstName + ' ' + user.lastName;
}

const user = {
  firstName: 'Տիգրան',
  lastName: 'Քեշիշյան',
};

const element = <h1>Ողջույն, {formatName(user)}։</h1>;

const root = ReactDOM.createRoot(
  document.getElementById('root')
);
root.render(element);
