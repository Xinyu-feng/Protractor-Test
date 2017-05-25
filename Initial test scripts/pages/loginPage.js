var loginPage = {};

loginPage.inputs = {};
loginPage.inputs.login = element(by.name('username'));
loginPage.inputs.password = element(by.name('password'));

loginPage.buttons = {};
loginPage.buttons.loginBtn = $('#btnLogin');

exports.inputs = loginPage.inputs;
exports.buttons = loginPage.buttons;