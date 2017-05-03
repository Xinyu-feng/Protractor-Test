var GameShowPage = function () {
    //Selectors Game show page
    this.gameShowPin = 'input[ng-model="GameShowPin"]';
    this.enterButton = 'a[data-ui-sref="GamePin({GameShowPin: GameShowPin})"]';
    this.createAccount = 'button[ng-click="CurrentState = \'CreateAccount\'"]';
    this.usernameInput = 'input[ng-model="Student.Username"]';
    this.firstName = 'input[ng-model="Student.FirstName"]';
    this.lastName = 'input[ng-model="Student.LastName"]';
    this.continueButton = 'button[ng-click="ValidateUsername(Student)"]';
    this.password = 'input[ng-model="Student.Password"]';
    this.passwordConfirm = 'input[ng-model="Student.Password2"]';
    this.registerStudentButton = 'button[ng-click="RegisterStudent(Student)"]';
    this.allAvatars = 'div[ng-repeat="Avatar in Avatars"]';
    this.youAreIn = 'h2[class="first-heading"]';
    this.startQuizButton = 'button[ng-click="StartQuiz()"]';

    this.registerForGameShow = function (browserInstance, gamePin, studentNumber, timestamp, timestampWOHours) {
        browserInstance = browser.forkNewDriverInstance(false);
        helper.setBrowserParams(browserInstance);
        helper.switchBrowser(browserInstance);
        browserInstance.get(browser.params.gameShowSiteUrl);
        browserInstance.getAllWindowHandles().then(function (handles) {
            browserInstance.switchTo().window(handles[0]);
            //Enter Game PIN value and click “Enter”
            $(gameShowPage.gameShowPin).sendKeys(gamePin);
            $(gameShowPage.enterButton).click();
            //Click “Create Account”
            $(gameShowPage.createAccount).click();
            //Username: TestScriptStudentGs{{TIMESTAMP}}
            $(gameShowPage.usernameInput).sendKeys('TestStudentGs' + timestampWOHours);
            //First Name: Test Student GS
            $(gameShowPage.firstName).sendKeys('Test Student GS');
            //Last Initial: 1
            $(gameShowPage.lastName).sendKeys(studentNumber);
            //Click “Continue”
            $(gameShowPage.continueButton).click();
            //Password: abcd
            $(gameShowPage.password).sendKeys('abcd');
            //Password confirm: abcd
            $(gameShowPage.passwordConfirm).sendKeys('abcd');
            //Avatar: Select avatar 1 (top right)
            $$(gameShowPage.allAvatars).get(studentNumber).click();
            //Click “Enter”
            $(gameShowPage.registerStudentButton).click();
            //It says “You’re in!”
            var welcomeMessage = $(gameShowPage.youAreIn);
            helper.waitElementToBeVisisble(welcomeMessage);
            //It says “You’re in!”
            expect(welcomeMessage.getText()).toBe('You\'re In!');
            //Screen capture (TIMESTAMP_GameShowStudent1_01.jpg)
            helper.makeScreenshot(screenShotSubDir, timestamp, 'GameShowStudent1_0' + studentNumber, browserInstance);
        });
    }
};

module.exports = new GameShowPage();