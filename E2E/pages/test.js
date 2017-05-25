var ChallengesPage = function () {
    //Selectors challenges page
    this.allUnits = element.all(by.repeater('Branch in Branches'));
    this.allActivities = 'Activity in Branch.Activities';
    this.continueButton = $('button[ng-click="DisplayContentSlidesBefore()"]');
    this.nextButton = $('button[ng-click="ModalPage = ModalPage + 1"]');
    this.doneButton = $('button[ng-click="CloseModal()"]');
    this.viewQuestionButton = $('button[ng-click="PageState = \'Q\'"]');
    this.continueToQuestion = $('button[ng-click="CloseWorkedExample()"]');
    this.allMultichoiseAnswers = element.all(by.css('div[id*="McAnswer"]'));
    this.correctAnswer = $('div[dynamicangularhtml="CorrectAnswer.AnswerText"]');
    this.textAnswerInput = element(by.model('Question.FreeFormAnswers[$index]'));
    this.submitMCAnswer = $('button[ng-click="SubmitMultipleChoiceAnswer()"]');
    this.submitTextAnswer = $('button[ng-click="SubmitFreeFormAnswers(Question.FreeFormAnswers)"]');
    this.submitFreeFormAnswer = $('a[ng-click="SubmitFreeFormAnswer(AnswerText)"]');
    this.continueButtonModalWindow = $$('button[ng-click="Continue()"]').get(0);
    this.correctAnswerTitle = $('h3[class="label_correct"]');
    this.MasteryButton = $('button[ng-click="LoadMastery()"]');
    this.OkButton = $('button[ng-click="Button1()"]');
    this.yeahButton = element.all(by.partialButtonText('Yeah')).get(0);
    this.wayToGoLabel = $('#gameplaySummaryStarsImg + div');
    this.challengeLabel = $('.student-h1');
    this.letsGoBtn = $('button[ng-click="CreateChallenge()"]');
    this.startChallenge = $('button[ng-click="StartChallenge()"]');
    this.selectChallenge = $('a[ng-show="Branch.MasteryPercent == 100"]');
    this.homeButton = element(by.buttonText('Home'));
    this.okBtn = element.all(by.buttonText('OK'));
    this.questionNumber = $('.gameplayQuestion .pageHeading');
    this.gameplaySummaryTitle = $$('.gameplaySummaryTitle-sm');
    this.earnedLevel = $('div[data-ng-bind-html="Params.Message"] span');
    this.menu = $('.dropdown-toggle');

    //GameShow selectors
    this.correctAnswerGameShow = 'span[ng-show="Choice.IsCorrect && Question.CorrectAnswer != null"]:not(.ng-hide)';
    this.uploadButtonGameShow = 'div[ngf-select="UploadWork($files)"]';

    this.selectUnit = function (unitIndex) {
        this.allUnits.get(unitIndex).click();
    };

    this.getUnitActivities = function (unitIndex) {
        return element.all(by.repeater(this.allActivities));
    };

    this.selectActivityIntoUnit = function (unitIndex, activityIndex) {
        var el = element.all(by.repeater(this.allActivities)).get(activityIndex);
        browser.executeScript('arguments[0].scrollIntoView()', el);
        el.click();
    };


    this.completeGameplayProcess = function (unitIndex, activityIndex, earnedLvl) {
        //Click activity #1
        if (unitIndex >= 0 && activityIndex >= 0) {
          this.selectActivityIntoUnit(unitIndex, activityIndex);
        }

        //Skip the 4 activity instructions; only appears the first time
        for (let i=0; i<2; i++) {
          this.continueButton.isPresent().then(function(state) {
            console.log("before");
            console.log(i);
          });
          console.log("after");
          console.log(i);
        }
        var i = 100;
      };
};

module.exports = new ChallengesPage();
