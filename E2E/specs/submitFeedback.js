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

describe("Test suite which submits a solution and gives feedback on it.", function () {

    beforeAll(function () {
        helper.setBrowserParams(browser);
        browser.get(browser.params.siteURL);
    });

    it('should register as teacher and create a mission.', function () {
        //Click Register
        loginPage.registerBtn.click();

        //Click Teacher
        registrationPage.registerT(teacherUsername, teacherPassword, timestamp);
        expect(classManagementPage.addClassBtn.isDisplayed()).toBe(true);

        //Create Premium Class
        var redemCode = browser.params.classRedemptionCode;
        var course = browser.params.homeWorkCourse;
        var term = browser.params.term;
        classManagementPage.createNewClass(redemCode, course, term, 'Regression Class ' + timestamp);

        browser.ignoreSynchronization = true; // WORKAROUND for $timeout which is used
        browser.sleep(5000); // WORKAROUND for $timeout which is used

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
        browser.sleep(1000);
        classManagementPage.closeModalBtn.click();
        browser.sleep(1000);

        classManagementPage.addMissionBtn.click();
        browser.sleep(5000);
        classManagementPage.selectUnit(0, classManagementPage.assignMissionBtn).click();
        browser.sleep(1000);
        classManagementPage.dueDate.sendKeys('3000-11-11');
        browser.sleep(1000);
        classManagementPage.confirmAssignBtn.click();
        var closeToastBtn = classManagementPage.closeToastBtn;
        browser.sleep(3000);
        closeToastBtn.isPresent().then(function(state) {
          if (state) {
            closeToastBtn.click();
          }
        });
        browser.sleep(2000);
        classManagementPage.logOut();
    });

    it('should register a student and submit a solution.', function () {
      browser.ignoreSynchronization = false;
      //Registration page (go to url #/Register)
      browser.get(browser.params.siteURL + '#/Register');
      //Register Student
      registrationPage.registerS(studentUsername, studentPassword, classCode, timestamp);
      //hide navbars so they don't block buttons
      browser.waitForAngular();

      browser.executeScript("document.getElementsByTagName('header')[0].style.display = 'none'");
      browser.executeScript("document.getElementById('studentBottomNav').style.display = 'none'");

      //Go to assigned mission
      challengesPage.allMissions.get(0).click();

      challengesPage.completeGameplayProcess(true, 0);
      browser.executeScript("document.getElementsByTagName('header')[0].style.display = 'initial'");
      browser.executeScript("document.getElementById('studentBottomNav').style.display = 'initial'");
      helper.waitElementToBeVisisble(challengesPage.portfolio);
      challengesPage.portfolio.click();
      expect(challengesPage.portfolioImage.isPresent()).toBe(true);

      challengesPage.studentLogOut();
    });

    it('should login to teacher account, give feedback and like solution', function () {
      loginPage.login(teacherUsername, teacherPassword);

      browser.waitForAngular();
      //go into the mission class
      expect(classManagementPage.allClasses.count()).toBe(1);
      classManagementPage.allClasses.get(0).click();
      browser.waitForAngular();
      //select the student who gave feedback
      expect(classManagementPage.allStudents.count()).toBe(1);
      classManagementPage.allStudents.get(0).click();
      browser.waitForAngular();
      //hide footer from blocking clicks
      browser.executeScript("document.getElementsByClassName('FooterLinks')[0].style.visibility = 'hidden'");
      //check if feedback is there, click like
      expect(challengesPage.portfolioImage.isPresent()).toBe(true);
      classManagementPage.likeBtn.click();
      //give feedback
      classManagementPage.feedbackBtn.click();
      browser.waitForAngular();
      classManagementPage.comments.sendKeys('Mango Sushi is good!');
      classManagementPage.saveFeedbackBtn.click();
      classManagementPage.closeToastBtn.click();
      classManagementPage.closeModalBtn.click();

      browser.waitForAngular();
      classManagementPage.logOut();
    });

    it('should login to student account, check feedback and like has shown up', function () {
      loginPage.login(studentUsername, studentPassword);

      challengesPage.portfolio.click();
      browser.waitForAngular();

      expect(challengesPage.likedTxt.isPresent()).toBe(true);
      expect(challengesPage.feedbackTxt.getText()).toBe('Mango Sushi is good!');
      //manual check: uncomment sleep below
      //browser.sleep(5000);
    });
});
