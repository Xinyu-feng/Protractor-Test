var ChallengesPage = function (browserInstance) {
  helper.switchBrowser(browserInstance);
  var questionPage = new QuestionPage(browserInstance);

  this.classSelect = element(by.model("ClassInfo.ClassId"));
  //Selectors challenges page
  this.allUnits = element.all(by.repeater('Branch in Branches'));
  this.allActivities = 'Activity in Branch.Activities';
  this.allMissions = element.all(by.repeater('Mission in StudentClass.Missions | orderBy: \'-DueDate\''));
  this.allMissionActivities = $$('div[ng-repeat="Activity in Mission.Activities"]');
  this.continueBtn = $('button[ng-click="DisplayContentSlidesBefore()"]');
  this.nextBtn = $('button[ng-click="ModalPage = ModalPage + 1"]');
  this.doneBtn = $('button[ng-click="CloseModal()"]');
  this.viewQuestionBtn = $('button[ng-click="PageState = \'Q\'"]');
  this.continueToQuestion = $('button[ng-click="CloseWorkedExample()"]');
  this.continueBtnModalWindow = $$('button[ng-click="Continue()"]').get(0);
  this.correctAnswerTitle = $('h3[class="label_correct"]');
  this.MasteryBtn = $$('button[ng-click="LoadMastery()"]').get(0);
  this.OkBtn = $('button[ng-click="Button1()"]');
  this.yeahBtn = element.all(by.partialButtonText('Yeah')).get(0);
  this.wayToGoLabel = $('#gameplaySummaryStarsImg + div');
  this.challengeLabel = $('.student-h1');
  this.letsGoBtn = $('button[ng-click="CreateChallenge()"]');
  this.startChallenge = $('button[ng-click="StartChallenge()"]');
  this.backToSkills = $('a[data-ui-sref="Student.AllSkills"]');
  this.homeBtn = element(by.buttonText('Home'));
  this.okBtn = element.all(by.buttonText('OK'));
  this.questionNumber = $('.gameplayQuestion .pageHeading');
  this.gameplaySummaryTitle = $$('.gameplaySummaryTitle-sm');
  this.earnedLevel = $('div[data-ng-bind-html="Params.Message"] span');
  this.menu = $('.dropdown-toggle');

  this.portfolio = $('img[src="images/student-nav-portfolio.png"]');
  this.portfolioImage = $('img[class="PortfolioImage"]');
  this.likedTxt = $('div[ng-show="Item.Feedback.IsLiked"]');
  this.feedbackTxt = $('div[ng-bind-html="Item.Feedback.TeacherComments | unsafe"]');
  //GameShow selectors
  this.uploadBtnMission = $$('div[ngf-select="UploadWork($files)"]').get(0);
  this.inputFile = $$('input[type="file"]').get(0);
  this.modalOpen = $('body[class$="modal-open"]');
  this.allSkillsBtn = $('button[data-ui-sref="Student.AllSkills"]');


  this.selectUnit = function (unitIndex) {
    this.allUnits.get(unitIndex).click();
  };


  this.getUnitActivities = function () {
    return element.all(by.repeater(this.allActivities));
  };


  this.selectActivityIntoUnit = function (missionBool, activityIndex) {
    if (missionBool) {
      this.allMissionActivities.get(activityIndex).click();
    } else {
      element.all(by.repeater(this.allActivities)).get(activityIndex).click();
    }
  };


  this.completeGameplayProcess = function (missionBool, activityIndex) {
    //Select Activity
    this.selectActivityIntoUnit(missionBool, activityIndex);

    //Skip the 4 activity instructions; only appears the first time
    var nextBtn = this.nextBtn;
    var doneBtn = this.doneBtn
    nextBtn.isPresent().then(function(state) {
      if (state) {
        nextBtn.click();
        nextBtn.click();
        nextBtn.click();
        doneBtn.click();
      }
    });

    //[IF] If you see a screen for “I can” statements (“Learning Goal” as heading) click
    browser.waitForAngular();
    var continueBtn = this.continueBtn;
    continueBtn.isPresent().then(function(state1) {
      if (state1) {
        continueBtn.isDisplayed().then(function(state2) {
          if (state2) {
            continueBtn.click();
          }
        });
      }
    });

    //[IF] If you see a screen with "BUCKET SLIDE", click
    browser.waitForAngular();
    var viewQuestionBtn = this.viewQuestionBtn;
    viewQuestionBtn.isPresent().then(function(state1) {
      if (state1) {
        viewQuestionBtn.isDisplayed().then(function(state2) {
          if (state2) {
            viewQuestionBtn.click();
          }
        });
      }
    });

    //[IF] If you see a Worked Example (set ID on heading?), click Continue to Question
    browser.waitForAngular();
    var continueToQuestion = this.continueToQuestion;
    continueToQuestion.isPresent().then(function(state1) {
      if (state1) {
        continueToQuestion.isDisplayed().then(function(state2) {
          if (state2) {
            continueToQuestion.click();
          }
        });
      }
    });

    // number of questions depends on number of stars in activity
    this.completeQuestionProcess(missionBool);
    this.completeQuestionProcess(missionBool);
    this.completeQuestionProcess(missionBool);
    browser.waitForAngular();

    //Click “Home”
    var homeBtn = this.homeBtn;
    homeBtn.isPresent().then(function(state1) {
      if (state1) {
        homeBtn.isDisplayed().then(function(state2) {
          if (state2) {
            homeBtn.click();
          }
        });
      }
    });

    browser.waitForAngular();
    this.checkMedalAndLevel(); // sometimes medal/level gain is after pressing home page
  };


  this.completeQuestionProcess = function(uploadWorkBool) {
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

    // [IF] If you complete the skill challenge on the first try with no mistakes, click
    var OkBtn = this.OkBtn;
    OkBtn.isPresent().then(function(state1) {
      if (state1) {
        OkBtn.click();
      }
    });

    //After submitting answer, Expected: Modal saying “Correct!”
    helper.waitElementToBeVisisble(this.modalOpen);
    expect(this.correctAnswerTitle.getText()).toBe('Correct!');

    if (uploadWorkBool) {
      //upload work
      var path = require('path');

      var filePath = (__dirname.substr(0, __dirname.length - 5)) + 'files';
      var fileToUpload = '\\triangle1.jpg',
          absPath = filePath + fileToUpload;
      this.inputFile.sendKeys(absPath);
    }
    //Click Continue
    this.continueBtnModalWindow.click();

    this.checkMedalAndLevel();
  };


  // Check if student earned medal or leveled up
  this.checkMedalAndLevel = function() {
    //[IF] Modal: Badge “You’ve earned a Badge!” → click “Yeah!”
    var yeahBtn = this.yeahBtn;

    yeahBtn.isPresent().then(function (state) {
      if (state) {
        /*if (earnedLvl != '') {
          challengesPage.checkEarnedLvl(earnedLvl);
        }*/
        yeahBtn.click();
        //[IF] Modal: Badge “You’ve earned a Badge!” → click “Yeah!”
        browser.waitForAngular();
        var secondYeahBtn = this.yeahBtn;
        if (typeof secondYeahBtn != 'undefined') {
          if (state) {
            /*if (earnedLvl != '') {
              challengesPage.checkEarnedLvl(earnedLvl);
            }*/
            secondYeahBtn.click();
            browser.waitForAngular();
            //[IF] Modal: Badge “You’ve earned a Badge!” → click “Yeah!”
            var thirdYeahBtn = this.yeahBtn;
            if (typeof thirdYeahBtn != 'undefined') {
              if (state) {
                /*if (earnedLvl != '') {
                challengesPage.checkEarnedLvl(earnedLvl);
              }*/
              secondYeahBtn.click();
              }
            }
          }
        }
      }
    });
  };


  this.studentLogOut = function () {
      var menu = this.menu;
      helper.waitElementToBeClickable(menu);
      menu.click();
      helper.waitElementToBeVisisble($('li[class="dropdown open"]'));
      var logoutOption = $$('a[ng-click="LogOut()"]').get(0);
      helper.waitElementToBeClickable(logoutOption);
      logoutOption.click();
  };

/*    // expect earnedLvl to be shown
this.checkEarnedLvl = function(earnedLvl) {
var level = this.earnedLevel;
level.isPresent().then(function() {
if (state) {
level.getText().then(function(text) {
expect(text).toBe(earnedLvl);
});
}
});
}; */
};


module.exports = ChallengesPage;
