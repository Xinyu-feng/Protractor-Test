var gameShowPage2;
var gameShowPage3;

var timestamp = helper.generateTimeStamp(false);
var timestampWOHours = helper.generateTimeStamp(true);
var studentUsername = 'StudentHW' + timestamp;
var studentPassword = 'abcd';
var teacherUsername = loginPage.generateUsername(timestamp);
var teacherPassword = 'abcd';
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

    it('Test Case #1: Register as Teacher and Create a HomeWork Class.', function () {
        //Click Register
        loginPage.registerBtn.click();

        //Create teacher user
        registrationPage.registerT(teacherUsername, teacherPassword, timestamp);

        //Create Premium Class
        var redemCode = browser.params.classRedemptionCode;
        var course = browser.params.homeWorkCourse;
        var term = browser.params.term;
        classManagementPage.createNewClass(redemCode, course, term, 'Regression Class ' + timestamp);

        browser.ignoreSynchronization = true; // WORKAROUND for $timeout which is used
        browser.sleep(5000); // WORKAROUND for $timeout which is used

        //Expected: See text “HomeWork Release Period”
        //expect(classManagementPage.addClassTextAfterSubmit.getText()).toBe('HomeWork Release Period');

        //Click “Done!”
        //classManagementPage.doneButton.click();

        //Expected: Number of classes = 1 and class named “Regression Class TIMESTAMP”
        browser.navigate().back();
        browser.sleep(1000);

        expect(classManagementPage.allClasses.count()).toBe(1);

        expect(classManagementPage.allClasses.get(0).$(classManagementPage.classNameHomework).getText()).toBe('Regression Class ' + timestamp);

        //Screen capture  (20151231_0830_TeacherCreateClassHomework_01.jpg)

        //Click the Class Name to go to Dashboard
        classManagementPage.allClasses.get(0).$(classManagementPage.classNameHomework).click();

        //TODO
        //Expected: State = Teacher.Dashboard and BranchGroups.length > 0
        //helper.waitRepeatorToHaveParticularAmountOfRows('BranchGroup in BranchGroups', 4);
        //helper.waitElementToBeVisisble(classManagementPage.teacherDashboardTab);
        //expect(classManagementPage.allBranchGroups.count()).toBeGreaterThan(0);
        //expect(classManagementPage.teacherDashboardTab.getAttribute('class')).toBe('navbar-button selected');
        //Click “Add Student” box
        classManagementPage.addStudent.click();
        browser.sleep(1000);
        //Save Class Code and ClassId for use in the next test case
        classManagementPage.classCode.getText().then(function (text) {
            classCode = text;
            //console.log('classCode === ' + classCode);
        });
        browser.getCurrentUrl().then(function (url) {
            var arr = url.split('/');
            classId = arr[6];
        });
        //Screen capture (20151231_0830_TeacherCreateClassHomework_02.jpg)
        browser.sleep(1000);
        classManagementPage.closeModalBtn.click();
        browser.sleep(1000);
        classManagementPage.logOut();
    });

    it('Test Case #2: Student Master a Branch and Run Lightning Challenge', function () {
      browser.ignoreSynchronization = false;
      //Registration page (go to url #/Register)
      browser.get(browser.params.siteURL + '#/Register');
      //Register Student
      registrationPage.registerS(studentUsername, studentPassword, classCode, timestamp);
      expect(challengesPage.allSkillsBtn.isDisplayed()).toBe(true);

      //console.log('studentUsername ==== ' + studentUsername);
      //Make direct call to /core/TestScript/MakeTestUser (pass in userId in FormBody) This enables test mode for user
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
        for (let i=0; i<1; i++) {
          challengesPage.selectUnit(i);
          challengesPage.getUnitActivities(i).count().then(function(activityCount) {
            for (let j=0; j<1; j++) {
              challengesPage.completeGameplayProcess(false, j);
            }
          });
          challengesPage.backToSkills.click();
        }
      });
      browser.driver.navigate().refresh();
      challengesPage.studentLogOut();
    });

    it('Test Case #3: Create a GameShow Class and Play a GameShow', function () {

        //Login as a teacher
        loginPage.login('potatotesterino@gmail.com', 'abcd');
        //Expected: URL = /Teacher and “Add Class” button shows up
        expect(browser.getCurrentUrl()).toBe(browser.params.siteURL + 'App/#/Teacher');

        //Create Gameshow Class
        var course = browser.params.homeWorkCourse;
        var term = browser.params.term;
        classManagementPage.createNewClass(false, course, term, 'GameShow Class ' + timestamp);
        //Expected: Number of classes = 2 (if continued from previous user) and class named “Regression GameShow Class TIMESTAMP”
        //expect(classManagementPage.allClasses.count()).toBe(2);
        //expect(classManagementPage.allClasses.get(1).$(classManagementPage.className).getText()).toBe('Regression GameShow Class ' + timestamp);
        //Screen capture (TIMESTAMP_TeacherCreateClassGameShow_01.jpg)
        //Collect teacher id and enable test user for it
        browser.executeScript("return window.localStorage.getItem(\"KH.AuthData\");").then(function (text) {
            var json = JSON.parse(text);
            teacherId = json.UserId;
            helper.enableUserTestMode(teacherId);
        });
        //Screen capture (TIMESTAMP_TeacherGameShow_01.jpg)
        //helper.waitElementToBeVisisble(element(by.cssContainingText('.pageHeading', 'Number Sense')));
        browser.waitForAngular();

        // hide footer so that play button is clickable
        browser.executeScript("document.getElementsByClassName('TeacherFooter')[0].style.visibility = 'hidden'");

        //Click Play on first GameShow
        classManagementPage.selectUnit(5, classManagementPage.playBtn).click();
        //Click Open Waiting Room
        classManagementPage.openWaitingRoom.click();
        //Record the Game PIN value (student needs this to join)
        classManagementPage.gamePin.getText().then(function (text) {
            gamePin = text;
            //console.log('GamePin === ' + gamePin);
        });
        //Open a new browser, go to GameShow Joining site (passed as parameter, but initial tests will be run on https://alpha.playkh.com
        browser2 = browser.forkNewDriverInstance(false);
        gameShowPage2 = new GameShowPage(browser2);
        helper.setBrowserParams(browser2);
        helper.switchBrowser(browser2);
        browser2.get(browser.params.gameShowSiteUrl);
        browser2.getWindowHandle().then(function (handle) {
            browser2.switchTo().window(handle);
            gameShowPage2.registerForGameShow(gamePin, 1, timestampWOHours);
            //Screen capture (TIMESTAMP_GameShowStudent1_01.jpg)
        }).then(function () {
            //Repeat this with a second student, but change these values:
            //Last Initial: 2
            //Avatar: Select avatar 2
            //The screen capture should be named TIMESTAMP_GameShowStudent2_01.jpg

            browser3 = browser.forkNewDriverInstance(false);
            gameShowPage3 = new GameShowPage(browser3);
            helper.setBrowserParams(browser3);
            helper.switchBrowser(browser3);
            browser3.get(browser.params.gameShowSiteUrl);
            browser3.getWindowHandle().then(function (handle) {
                browser3.switchTo().window(handle);
                gameShowPage3.registerForGameShow(gamePin, 2, timestampWOHours);
                //Screen capture (TIMESTAMP_GameShowStudent1_01.jpg)
            });
        }).then(function () {
            helper.switchBrowser(initialBrowser);
            browser.getWindowHandle().then(function (handle) {
                browser.switchTo().window(handle);
                //Screen capture TIMESTAMP_TeacherGameShow_02.jpg
                //Click “Start Game”
                gameShowPage.startQuizBtn.click();

                //check for bucket error msg
                var bucketBtn = gameShowPage.bucketBtn;
                bucketBtn.isPresent().then(function (state1) {
                  if (state1) {
                    bucketBtn.isDisplayed().then(function(state2) {
                      if (state2) {
                        bucketBtn.click();
                      }
                    });
                  }
                });
                //Screen capture: TIMESTAMP_TeacherGameShow_03.jpg
            });
        }).then(function() {
          var qNum = 0;
          gameShowPage.questionNum.getText().then(function(text) {
            qNum = text.split(" ")[1];

            for (let i=0; i<qNum; i++) {
              //Click the correct answer (Student 1)
              helper.switchBrowser(browser2);
              gameShowPage2.completeGSQuestion();
              //Click the correct answer (Student 2)
              helper.switchBrowser(browser3);
              gameShowPage3.completeGSQuestion();
              //Screen capture: (TIMESTAMP_TeacherGameShow_04.jpg)
              helper.switchBrowser(initialBrowser);
              if (i !== qNum - 1) {
                gameShowPage.submitQBtn.click();
                gameShowPage.nextBtn.click();
              } else {
                gameShowPage.finishGameBtn.click();
                gameShowPage.totalCorrect.filter(function(el) {
                  return el.getText().then(function(text) {
                    return text !== '';
                  });
                }).getText().then(function(text) {
                  expect(text).not.toBeLessThan(0);
                });
              }
            }
          });
        });
    });
});
