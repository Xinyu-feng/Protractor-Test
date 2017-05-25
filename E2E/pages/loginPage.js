var LoginPage = function (browserInstance) {
    helper.switchBrowser(browserInstance);
    //Selectors Login page
    this.loginBtn = element(by.id('btnLogin'));
    this.usernameInput = element(by.name('username'));
    this.passwordInput = element(by.name('password'));
    this.registerBtn = $('a[href="#/Register"]');

    this.login = function (username, password) {
        this.usernameInput.sendKeys(username);
        this.passwordInput.sendKeys(password);
        this.loginBtn.click();
    };

    this.generateUsername = function (timestamp) {
        var username = '';
        username = 'TestScript+Teacher' + timestamp + '@knowledgehook.com';

        return username;
    };
};

module.exports = LoginPage;
