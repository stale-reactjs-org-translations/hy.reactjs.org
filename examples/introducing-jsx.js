function formatName(user) {
  return user.firstName + ' ' + user.lastName;
}

const user = {
  firstName: 'Տիգրան',
  lastName: 'Քեշիշյան',
};

const element = <h1>Ողջույն, {formatName(user)}։</h1>;

ReactDOM.render(element, document.getElementById('root'));
