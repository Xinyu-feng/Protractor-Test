var GameShowPage = function (browserInstance) {
  helper.switchBrowser(browserInstance);
  var questionPage = new QuestionPage(browserInstance);

  //Selectors Game show page
  this.gameShowPin = element(by.model('GameShowPin'));
  this.enterBtn = $('button[ng-click="SubmitPin(GameShowPin)"]');
  this.createAccount = $('button[ng-click="CurrentState = \'CreateAccount\'; ScrollToTop()"]');
  this.usernameInput = element(by.model('Student.Username'));
  this.firstName = element(by.model('Student.FirstName'));
  this.lastName = element(by.model('Student.LastName'));
  this.continueBtn = $('button[ng-click="ValidateUsername(Student)"]');
  this.password = element(by.model('Student.Password'));
  this.passwordConfirm = element(by.model('Student.Password2'));
  this.registerStudentBtn = $('button[ng-click="RegisterStudent(Student)"]');
  this.allAvatars = $$('div[ng-repeat="Avatar in Avatars"]');
  this.youAreIn = $('h2[class="first-heading"]');
  this.startQuizBtn = $('button[ng-show="Students.length > 0"]');
  this.submitQBtn = element(by.buttonText('Next Question'));
  this.nextBtn = element(by.buttonText('Next'));
  this.finishGameBtn = element(by.buttonText('Finish Game'));
  this.bucketBtn = $('button[ng-click="NextQuestion()"]');
  this.questionNum = $('span[class*="secondary_text"]');
  this.totalCorrect = $$('div[class*="label_count"]');
  this.yeahBtn = element.all(by.partialButtonText('Yeah')).get(0);

  this.registerForGameShow = function (gamePin, studentNumber, timestampWOHours) {
      //Enter Game PIN value and click “Enter”
      this.gameShowPin.sendKeys(gamePin);
      this.enterBtn.click();
      //Click “Create Account”
      this.createAccount.click();
      //Username: TestScriptStudentGs{{TIMESTAMP}}
      this.usernameInput.sendKeys('TestStudentGs' + studentNumber + timestampWOHours);
      //First Name: Test Student GS
      this.firstName.sendKeys('Test Student GS');
      //Last Initial: 1
      this.lastName.sendKeys(studentNumber);
      //Click “Continue”
      this.continueBtn.click();
      //Password: abcd
      this.password.sendKeys('abcd');
      //Password confirm: abcd
      this.passwordConfirm.sendKeys('abcd');
      //Avatar: Select avatar 1 (top right)
      this.allAvatars.get(studentNumber).click();
      //Click “Enter”
      this.registerStudentBtn.click();
      //It says “You’re in!”
      var welcomeMessage = this.youAreIn;
      helper.waitElementToBeVisisble(welcomeMessage);
      //It says “You’re in!”
      expect(welcomeMessage.getText()).toBe('You\'re In!');

      browser.executeScript("return window.localStorage.getItem(\"KH.AuthData\");").then(function (text) {
        var json = JSON.parse(text);
        studentId = json.UserId;
        helper.enableUserTestMode(studentId);
      });
  };

  this.completeGSQuestion = function() {
    var yeahBtn = this.yeahBtn;

    yeahBtn.isPresent().then(function (state) {
      if (state) {
        /*if (earnedLvl != '') {
          challengesPage.checkEarnedLvl(earnedLvl);
        }*/
        yeahBtn.click();
      }
    });

    element(by.css('div[class*="GameplayAnswerFreeFormBlock"]')).getAttribute('aria-hidden').then(function(hideFreeQ) {
      if (hideFreeQ === 'false') { // free form
        questionPage.fractionQ.isPresent().then(function(frQ) {
          if (frQ) {
            questionPage.completeFractionQuestion();
          }
        });

        questionPage.algebraTiles.isPresent().then(function(algQ) {
          if (algQ) {
            questionPage.completeAlgebraQuestion();
          }
        });
        questionPage.textAnswerInput.getAttribute('aria-hidden').then(function(hideTextQ) {
          if (hideTextQ === 'false') {
            questionPage.completeTextQuestion();
          }
        });
      }
    });

    element(by.css('div[ng-show="Question.AnswerType==\'M\'"]')).getAttribute('aria-hidden').then(function(hideMcQ) {
      if (hideMcQ === 'false') { //multiple choice
        questionPage.completeMcMsQuestion(false);
      }
    });

    element(by.css('div[ng-show="Question.AnswerType==\'S\'"]')).getAttribute('aria-hidden').then(function(hideMsQ) {
      if (hideMsQ === 'false') { //multipleSelect questions
        questionPage.completeMcMsQuestion(true);
      }
    });
  };
};

module.exports = GameShowPage;
