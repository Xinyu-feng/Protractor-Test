var challengesPage = {};

challengesPage.selectors = {};
challengesPage.selectors.counterBlockStars = $('.counterBlockStars span');
challengesPage.selectors.counterBlockXp = $('.counterBlockXp span');
challengesPage.selectors.PropertiesofLinearRelationships = element.all(by.cssContainingText('.challengeContainer', 'Properties of Linear Relationships')).first();
challengesPage.selectors.descriptionOpened = $('div[class$="collapse in"]');
//temporary locator
challengesPage.selectors.firstStar = element(by.repeater('Activity in Section.Activities').row(35));
challengesPage.selectors.continueToQuestion = $('button[data-ng-click="CloseWorkedExample()"]');
challengesPage.selectors.correctAnswer = $('div[data-ng-repeat="Choice in Question.Choices"] span[class="glyphicon glyphicon-ok green"]');
challengesPage.selectors.paceDoneModal = $('body[class$="modal-open"]');
challengesPage.selectors.uploadButton = $('.gameplayQuestionResultModalFooter input[type="file"]');
challengesPage.selectors.uploadSuccessfulMsg = $('.modal-dialog div[data-ng-show="SolutionUploadStatus == 2"]');
challengesPage.selectors.continueBtn = $('.gameplayQuestionResultModalFooter button[data-ng-click="Continue()"]');
challengesPage.selectors.continueBtnThirdQuestion = $('.gameplayAlertNextButtonContainer button[data-ng-click="Continue()"]');
challengesPage.selectors.incorrectAnswer = $$('.gameplayAnswerValue span[class="glyphicon glyphicon-ok green ng-hide"] + span > table').first();
challengesPage.selectors.firstIncorrect = $('div[data-ng-show="FirstIncorrect"]');
challengesPage.selectors.incorrectThirdAnswer = $$('.gameplayAnswerValue span[class="glyphicon glyphicon-ok green ng-hide"] + span > p');
challengesPage.selectors.oopsAlert = $('div[class="ribbon ribbon-hang-alert"]');
challengesPage.selectors.oneStar = $('img[src="images/1-stars-big.png"]');
challengesPage.selectors.homeBtn = $('button[data-ng-click="CloseModal();Params.ReturnHome();"]');
challengesPage.selectors.okButton = $('button[data-ng-click="CloseModal()"]');
challengesPage.selectors.timerWindow = $('.gameplayAnswerContainer div[class="gameplayTimerPenaltyBox gameplayTimerPenaltyBoxReady"]');
challengesPage.selectors.leaderboards = $('.hidden-xs a[data-ui-sref="Student.Leaderboard"]');
challengesPage.selectors.myProfile = $('.hidden-xs a[data-ui-sref="Student.SelfProfile"]');

exports.selectors = challengesPage.selectors;