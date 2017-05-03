var ChallengesPage = function () {
    //Selectors challenges page
    this.allUnits = element.all(by.repeater('Branch in Branches'));
    this.allActivities = 'Activity in Branch.Activities';
    this.continueButton = $('button[ng-click="CloseStatement()"]');
    this.continueToQuestion = $('button[ng-click="CloseWorkedExample()"]');
    this.allMultichoiseAnswers = element.all(by.repeater('Choice in Question.Choices'));
    this.correctAnswer = $('span[ng-show="Choice.IsCorrect"]:not(.ng-hide)');
    this.correctTextAnswer = $('div[dynamicangularhtml="Question.CorrectAnswer.AnswerText"]');
    this.answerInput = element(by.model('AnswerText'));
    this.submitAnswer = element(by.buttonText('Submit Answer'));
    this.submitFreeFormAnswer = $('a[ng-click="SubmitFreeFormAnswer(AnswerText)"]');
    this.continueButtonModalWindow = $('.modal-footer button[ng-click="Continue()"]');
    this.correctAnswerTitle = $('.answerCorrectTitle');
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
        element.all(by.repeater(this.allActivities)).get(activityIndex).click();
    };

    this.completeGameplayProcess = function (unitIndex, activityIndex) {
        //Click activity #1
        this.selectActivityIntoUnit(unitIndex, activityIndex);

        //[IF] If you see a screen for “I can” statements (“Learning Goal” as heading) click
        if (this.continueButton.isDisplayed())
            this.continueButton.click();

        //[IF] If you see a Worked Example (set ID on heading?), click Continue to Question
        if (this.continueToQuestion.isDisplayed())
            this.continueToQuestion.click();

        //Repeat Question Process (3 times total)
        this.completeQuestionProcess();
        this.completeQuestionProcess();
        this.completeQuestionProcess();

        //[IF] Modal: Level Up → click “Yeah!”
        var yeahBtn = this.yeahButton;
        yeahBtn.isPresent().then(function (state) {
            if (state) {
                helper.waitElementToBeVisisble(helper.modalOpen);
                browser.sleep(2000);
                helper.waitElementToBeClickable(yeahBtn);
                yeahBtn.click();
                //[IF] Modal: Badge “You’ve earned a Badge!” → click “Yeah!”
                var secondYeahBtn = this.yeahButton;
                if (typeof secondYeahBtn != 'undefined') {
                    secondYeahBtn.isPresent().then(function (state) {
                        if (state) {
                            helper.waitElementToBeVisisble(helper.modalOpen);
                            browser.sleep(2000);
                            helper.waitElementToBeClickable(secondYeahBtn);
                            secondYeahBtn.click();
                        }
                    });
                }
            }
        });

        //Expected: Modal: “Way to go!”
        expect(this.wayToGoLabel.getText()).toBe('Way to go!');
        browser.sleep(1000);

        //Click “Home”
        var homeBtn = this.homeButton;
        helper.waitElementToBeClickable(homeBtn);
        homeBtn.click();
    };


    this.completeGameplayProcessWithLvlAssert = function (unitIndex, activityIndex, earnedLvl) {
        //Click activity #1
        this.selectActivityIntoUnit(unitIndex, activityIndex);

        //[IF] If you see a screen for “I can” statements (“Learning Goal” as heading) click
        if (this.continueButton.isDisplayed())
            this.continueButton.click();

        //[IF] If you see a Worked Example (set ID on heading?), click Continue to Question
        if (this.continueToQuestion.isDisplayed())
            this.continueToQuestion.click();

        //Repeat Question Process (3 times total)
        this.completeQuestionProcess();
        this.completeQuestionProcess();
        this.completeQuestionProcess();


        //[IF] Modal: Badge “You’ve earned a Badge!” → click “Yeah!”
        var yeahBtn = this.yeahButton;
        var level = this.earnedLevel;

        yeahBtn.isPresent().then(function (state) {
            if (state) {
                helper.waitElementToBeVisisble(helper.modalOpen);
                browser.sleep(2000);
                helper.waitElementToBeClickable(yeahBtn);
                //expect(level.getText()).toBe(earnedLvl);
                yeahBtn.click();
                //[IF] Modal: Level Up → click “Yeah!”
                var secondYeahBtn = element.all(by.partialButtonText('Yeah')).get(0);
                helper.waitElementToBeClickable(secondYeahBtn);
                if (typeof secondYeahBtn != 'undefined') {
                    secondYeahBtn.isPresent().then(function (state) {
                        if (state) {
                            helper.waitElementToBeVisisble(helper.modalOpen);
                            browser.sleep(2000);
                            helper.waitElementToBeClickable(secondYeahBtn);
                            //expect(level.getText()).toBe(earnedLvl);
                            secondYeahBtn.click();
                        }
                    });
                }
            }
        });

        browser.sleep(1000);

        //Click “Home”
        var homeBtn = this.homeButton;
        helper.waitElementToBeClickable(homeBtn);
        homeBtn.click();
    };


    this.completeQuestionProcess = function () {
        //IF] If it’s multiple choice, click the answer with a checkmark
        var correctAnswer = this.correctAnswer;
        correctAnswer.isPresent().then(function (state) {
            if (state) {
                helper.waitElementToBeClickable(correctAnswer);
                browser.sleep(1000);
                correctAnswer.click();
            }
        });

        //After submitting answer, Expected: Modal saying “Correct!”
        helper.waitElementToBeVisisble(helper.modalOpen);
        expect(this.correctAnswerTitle.getText()).toBe('Correct!');

        //Click Continue
        this.continueButtonModalWindow.click();
    };

    this.completeGameShowQuestionProcess = function (currentBrowser) {
        currentBrowser.wait(EC.visibilityOf($(this.correctAnswerGameShow)), 15000);
        $(this.correctAnswerGameShow).click();

        ////After submitting answer, Expected: Modal saying “Correct!”
        //helper.waitElementToBeVisisble(helper.modalOpen);
        //expect(this.correctAnswerTitle.getText()).toBe('Correct!');
        //
        ////Click Continue
        //this.continueButtonModalWindow.click();
    };

    this.completeQuestionProcessTextQuestion = function () {
        //[IF] If it’s free form, enter the correct answer (need to expose answer before answering)
        var correctTextAnswer = this.correctTextAnswer;
        correctTextAnswer.getText().then(function (answerText) {
            var input = $('input[ng-model="Choice.AnswerText"]');
            input.sendKeys(answerText);
            var submitAnswerBtn = element(by.buttonText('Submit Answer'));
            submitAnswerBtn.click();
        });

        //After submitting answer, Expected: Modal saying “Correct!”
        helper.waitElementToBeVisisble(helper.modalOpen);
        expect(this.correctAnswerTitle.getText()).toBe('Correct!');

        //Click Continue
        this.continueButtonModalWindow.click();
    };
};

module.exports = new ChallengesPage();