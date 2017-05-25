var loginPage = new LoginPage(browser);
var registrationPage = new RegistrationPage(browser);
var classManagementPage = new ClassManagementPage(browser);
var gameShowPage = new GameShowPage(browser);
var challengesPage = new ChallengesPage(browser);

var timestamp = helper.generateTimeStamp(false);
var timestampWOHours = helper.generateTimeStamp(true);
var studentUsername = 'StudentHW' + timestamp;
var teacherUsername = loginPage.generateUsername(timestamp);console.log('teacher === ' + teacherUsername);
var classId = '';
var classCode = '';
var userId = '';
var gamePin = '';
var firstStudentId = '';
var secondStudentId = '';
var teacherId = '';
var initialBrowser = browser;
var browser2;
var browser3;

describe("Test suite which creates teacher, class and student.", function () {

    beforeAll(function () {
        helper.setBrowserParams(browser);
        browser.get(browser.params.siteURL);
    });

    it('Test Case #3: Student Master a Branch and Run Lightning Challenge', function () {
      loginPage.login('imatestuser123', 'abcd');

      challngesPage.classSelect.get(1).click();

      //console.log('studentUsername ==== ' + studentUsername);
      //Make direct call to /core/TestScript/MakeTestUser (pass in userId in FormBody) This enables test mode for user
      //Log in as student user
      //browser.get(browser.params.siteURL);
      //loginPage.login('StudentHW20160602_1532', 'abcd');
      browser.waitForAngular();
      // Remove headers
      browser.executeScript("document.getElementsByTagName('header')[0].style.display = 'none'");
      browser.executeScript("document.getElementById('studentBottomNav').style.display = 'none'");

      //Click "All Skills"
      challengesPage.allSkillsBtn.click();
      //Screen capture (20151231_0830_StudentHomework_01.jpg)
      browser.sleep(1500);
      //Expand unit
      browser.waitForAngular();

      challengesPage.allUnits.count().then(function(unitCount) {
        for (let i=0; i<unitCount; i++) {
          challengesPage.selectUnit(i);
          challengesPage.getUnitActivities(false).count().then(function(activityCount) {
            for (let j=0; j<activityCount; j++) {
              challengesPage.completeGameplayProcess(false, j);
            }
          });
          challengesPage.backToSkills.click();
        }
      });
    /*  challengesPage.selectUnit(1);
      //Keep note of the number of activities in first branch (10 including locked ones)
      expect(challengesPage.getUnitActivities(0).count()).toBe(10);
      //Repeat the Homework Gameplay process for all of the activities in that section
      //The script must be aware of the number of activities
      //After last activity is complete, it should have all of the stars earned.
      challengesPage.completeGameplayProcess(0, 0, '');
      challengesPage.completeGameplayProcess(0, 1, '');
      challengesPage.completeGameplayProcess(0, 2, '');
      challengesPage.completeGameplayProcess(0, 3, 'Bronze');
      challengesPage.completeGameplayProcess(0, 4, '');
      challengesPage.completeGameplayProcess(0, 5, '');
      challengesPage.completeGameplayProcess(0, 6, 'Silver');
      challengesPage.completeGameplayProcess(0, 7, '');
      challengesPage.completeGameplayProcess(0, 8, '');
      challengesPage.completeGameplayProcess(0, 9, 'Gold');
      //Screen capture
      browser.sleep(5000);
      helper.makeScreenshot(screenShotSubDir, timestamp, 'StudentHomework_02.jpg', browser);
      //Click the light blue lightning icon in that branch
      challengesPage.selectChallenge.click();
      //Expected: State should be ______ + section name (Identify Ratios) should match the section you clicked in
      /*expect(challengesPage.challengeLabel.getText()).toBe('LIGHTNING CHALLENGE');
      //Click Let’s Go!
      challengesPage.letsGoBtn.click();
      //Screen capture
      browser.sleep(2000);
      helper.makeScreenshot(screenShotSubDir, timestamp, 'StudentHomework_03.jpg', browser);
      //Click Start Challenge
      challengesPage.startChallenge.click();
      browser.ignoreSynchronization = true; // WORKAROUND for $timeout which is used
      browser.sleep(5000); // WORKAROUND for $timeout which is used
      var steps = 0;
      //Pick an answer or type it in (doesn’t matter if it’s correct)
      //Count the number of questions, the first one says Question 1/7
      helper.waitRepeatorToHaveParticularAmountOfRows('Choice in Question.Choices', 4);
      helper.waitElementToBeClickable(challengesPage.allMultichoiseAnswers.get(0));
      challengesPage.allMultichoiseAnswers.get(0).click().then(function () {
          expect(challengesPage.questionNumber.getText()).toContain('1/10');
          challengesPage.allMultichoiseAnswers.get(0).click();
          steps = steps + 1;
      }).then(function () {
          browser.sleep(3000);
          expect(challengesPage.questionNumber.getText()).toContain('2/10');
          challengesPage.allMultichoiseAnswers.get(0).click();
          steps = steps + 1;
      }).then(function () {
          browser.sleep(3000);
          expect(challengesPage.questionNumber.getText()).toContain('3/10');
          challengesPage.allMultichoiseAnswers.get(0).click();
          steps = steps + 1;
      }).then(function () {
          browser.sleep(3000);
          expect(challengesPage.questionNumber.getText()).toContain('4/10');
          challengesPage.allMultichoiseAnswers.get(0).click();
          steps = steps + 1;
      }).then(function () {
          browser.sleep(3000);
          expect(challengesPage.questionNumber.getText()).toContain('5/10');
          challengesPage.allMultichoiseAnswers.get(0).click();
          steps = steps + 1;
      }).then(function () {
          browser.sleep(3000);
          expect(challengesPage.questionNumber.getText()).toContain('6/10');
          challengesPage.allMultichoiseAnswers.get(0).click();
          steps = steps + 1;
      }).then(function () {
          browser.sleep(3000);
          expect(challengesPage.questionNumber.getText()).toContain('7/10');
          challengesPage.answerInput.isDisplayed().then(function(state){
              if (state) {
                  challengesPage.answerInput.sendKeys('123');
                  challengesPage.submitFreeFormAnswer.click();
                  steps = steps + 1;
              } else {
                  challengesPage.allMultichoiseAnswers.get(0).click();
                  steps = steps + 1;
              }
          });
      }).then(function () {
          browser.sleep(3000);
          expect(challengesPage.questionNumber.getText()).toContain('8/10');
          challengesPage.allMultichoiseAnswers.get(0).click();
          steps = steps + 1;
      }).then(function () {
          browser.sleep(3000);
          expect(challengesPage.questionNumber.getText()).toContain('9/10');
          challengesPage.allMultichoiseAnswers.get(0).click();
          steps = steps + 1;
      }).then(function () {
          browser.sleep(3000);
          expect(challengesPage.questionNumber.getText()).toContain('10/10');
          challengesPage.allMultichoiseAnswers.get(0).click();
          steps = steps + 1;
      }).then(function () {
          helper.waitElementToBeVisisble(helper.modalOpen);
          browser.sleep(1000);
          //After last one, Expected: Modal: “Your challenger hasn’t finished yet.”
          expect(challengesPage.gameplaySummaryTitle.get(0).getText()).toContain('Your challenger');
          expect(challengesPage.gameplaySummaryTitle.get(0).getText()).toContain('hasn\'t finished yet');
          challengesPage.okBtn.get(0).click();
      }).then(function () {
          browser.sleep(2000);
          //Then second modal, hit “OK”
          challengesPage.okBtn.get(0).click();
          //Expected: Question count should match the number of activities in the section
          expect(steps).toBe(10);
          browser.ignoreSynchronization = false;
          helper.studentLogOut();
      }); */
  });
});
