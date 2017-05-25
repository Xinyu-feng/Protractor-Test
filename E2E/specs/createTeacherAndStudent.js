var timestamp = helper.generateTimeStamp(false);
var timestampWOHours = helper.generateTimeStamp(true);
var screenShotSubDir = helper.makeScreenshotSubDir(browser.params.screenshotFolder, timestamp);
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

describe("Check login", function () {
  beforeAll(function () {
      helper.setBrowserParams(browser);
      browser.get(browser.params.siteURL);
      browser.ignoreSynchronization = false; // WORKAROUND for $timeout which is used
  });

  it('Login to teacher account', function () {
    loginPage.login('potatotesterino@gmail.com', 'abcd');
    expect(classManagementPage.allClasses.count()).toBe(1);

    expect(classManagementPage.allClasses.get(0).$(classManagementPage.classNameHomework).getText()).toBe('potato');
    //Screen capture  (20151231_0830_TeacherCreateClassHomework_01.jpg)
    helper.makeScreenshot(screenShotSubDir, timestamp, 'TeacherCreateClassHomework_01.jpg', browser);

    //Click the Class Name to go to Dashboard
    classManagementPage.allClasses.get(0).$(classManagementPage.classNameHomework).click();

    browser.ignoreSynchronization = true; // WORKAROUND for $timeout which is use
    browser.sleep(5000); // WORKAROUND for $timeout which is used

    //TODO
    //Expected: State = Teacher.Dashboard and BranchGroups.length > 0
    //helper.waitRepeatorToHaveParticularAmountOfRows('BranchGroup in BranchGroups', 4);
    //helper.waitElementToBeVisisble(classManagementPage.teacherDashboardTab);
    //expect(classManagementPage.allBranchGroups.count()).toBeGreaterThan(0);
    //expect(classManagementPage.teacherDashboardTab.getAttribute('class')).toBe('navbar-button selected'); */

    //Click “Add Student” box
    classManagementPage.addStudent.click();

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
    classManagementPage.iWillLetThemKnowBtn.click();
    browser.sleep(1000);
    classManagementPage.logout();
  });

    it('Test Case #1: Register as Teacher and Create a HomeWork Class.', function () {
        //Click Register
        loginPage.registerButton.click();

        //Click Teacher
        helper.waitElementToBeClickable(registrationPage.registerTeacher);
        registrationPage.registerTeacher.click();

        //Email
        registrationPage.email.sendKeys(teacherUsername);

        //Password
        registrationPage.password.sendKeys('abcd');

        //Confirm password
        registrationPage.confirmPassword.sendKeys('abcd');

        //Screen capture ({{TIMESTAMP}}_TeacherRegister_01.jpg)
        helper.makeScreenshot(screenShotSubDir, timestamp, 'TeacherRegister_01.jpg', browser);

        //Click Submit
        helper.waitElementToBeClickable(registrationPage.submitBtn);
        registrationPage.submitBtn.click();
        browser.waitForAngular();

        //Salutation = Mr.
        var titlePicker = registrationPage.title;
        titlePicker.click();
        registrationPage.selectTitle(titlePicker, 'Mr.');

        //First Name = Regression
        registrationPage.firstName.sendKeys('Regression');

        //Last Name = Teacher
        registrationPage.lastName.sendKeys('Teacher');

        //Country = Canada
        var countryPicker = registrationPage.country;
        countryPicker.click();
        registrationPage.selectCountry(countryPicker, 'Canada');

        //Province = Ontario
        var statePicker = registrationPage.state;
        statePicker.click();
        registrationPage.selectState(statePicker, 'Ontario');

        //School Board = Toronto District School Board (TDSB)
        registrationPage.schoolBoard.sendKeys('Toronto District');
        helper.waitRepeatorToHaveParticularAmountOfRows('match in matches track by $index', 1);
        registrationPage.autocompleteList.get(0).click();

        //School = Victoria Park Collegiate Institute
        registrationPage.school.sendKeys('Victoria Park Collegiate');
        helper.waitRepeatorToHaveParticularAmountOfRows('match in matches track by $index', 1);
        registrationPage.autocompleteList.get(0).click();

        //Screen capture  (20151231_0830_TeacherRegister_02.jpg)
        helper.makeScreenshot(screenShotSubDir, timestamp, 'TeacherRegister_02.jpg', browser);

        //Click submit
        helper.waitElementToBeClickable(registrationPage.registerBtn);
        registrationPage.registerBtn.click();
        browser.waitForAngular();

        //Expected: URL = #/Teacher and “Add Class” button shows up (button has ID)
        expect(classManagementPage.addClassBtn.isDisplayed()).toBe(true);
        expect(browser.getCurrentUrl()).toBe(browser.params.siteURL + 'App/#/Teacher');

        expect(classManagementPage.allClasses.count()).toBe(0);

        //Click “Add Class”
        helper.waitElementToBeClickable(classManagementPage.addClassBtn);
        classManagementPage.addClassBtn.click();

        //Select “Homework Premium”
        helper.waitElementToBeClickable(classManagementPage.homeWorkPremiumBtn);
        classManagementPage.homeWorkPremiumBtn.click();

        //Class Redemption Code = (Parameter passed into test run. You can use an initial parameter of: testcode1)
        classManagementPage.classRedemptionCode.sendKeys(browser.params.classRedemptionCode);

        classManagementPage.continueBtn.click();

        //Expected: See text “Use 1 credit?”
        expect(classManagementPage.addClassText.getText()).toContain('Use 1 credit?');

        //Submit
        classManagementPage.useCredit.click();

        //Course = (Parameter passed into test run. You can use an initial parameter of: Grade 9 Applied)
        var homeWorkCoursePicker = classManagementPage.homeWorkCoursePicker;
        homeWorkCoursePicker.click();
        classManagementPage.selectCourse(homeWorkCoursePicker, browser.params.homeWorkCourse, classManagementPage.homeWorkCoursePickerOptions);

        //ClassName = Regression Class TIMESTAMP
        classManagementPage.classNameInput.sendKeys('Regression Class ' + timestamp);

        //Term = Fall 2015
        var termPicker = classManagementPage.termPicker;
        termPicker.click();
        classManagementPage.selectTerm(termPicker, '2016-2017 Full Year');

        //Submit form
        browser.element(by.css('button[ng-click="CreateClass()"]')).click();
        browser.waitForAngular();

        //Expected: See text “HomeWork Release Period”
        //expect(classManagementPage.addClassTextAfterSubmit.getText()).toBe('HomeWork Release Period');

        //Click “Done!”
        //classManagementPage.doneButton.click();

        //Expected: Number of classes = 1 and class named “Regression Class TIMESTAMP”\

        browser.navigate().back();
        browser.waitForAngular();
        expect(classManagementPage.allClasses.count()).toBe(1);

        //Screen capture  (20151231_0830_TeacherCreateClassHomework_01.jpg)
        helper.makeScreenshot(screenShotSubDir, timestamp, 'TeacherCreateClassHomework_01.jpg', browser);

        //Click the Class Name to go to Dashboard
        classManagementPage.allClasses.get(0).$(classManagementPage.classNameHomework).click();

        //TODO
        //Expected: State = Teacher.Dashboard and BranchGroups.length > 0
        //helper.waitRepeatorToHaveParticularAmountOfRows('BranchGroup in BranchGroups', 4);
        //helper.waitElementToBeVisisble(classManagementPage.teacherDashboardTab);
        //expect(classManagementPage.allBranchGroups.count()).toBeGreaterThan(0);
        //expect(classManagementPage.teacherDashboardTab.getAttribute('class')).toBe('navbar-button selected'); */

        //Click “Add Student” box
        classManagementPage.addStudent.click();

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
        classManagementPage.closeModalBtn.click();
        classManagementPage.logout();
    });

/*    it('Test Case #2: Student Register.', function () {
        browser.ignoreSynchronization = false;
        //Registration page (go to url #/Register)
        browser.get(browser.params.siteURL + '#/Register');

        //Click Student
        registrationPage.registerStudent.click();

        //Enter class code from last script + submit
        registrationPage.classCode.sendKeys(classCode);

        //registrationPage.classCode.sendKeys('star768');
        registrationPage.sumbitUserRegistration.click();

        //Enter Username = StudentHWTIMESTAMP
        registrationPage.studentUsername.sendKeys(studentUsername);

        //Password = abcd
        registrationPage.studentPassword.sendKeys('abcd');
        registrationPage.studentRepeatPassword.sendKeys('abcd');

        //Submit form
        registrationPage.registerStudentBtn.click();

        //FirstName = Student Homework
        registrationPage.studentFirstName.sendKeys('Student Homework');

        //LastName = TIMESTAMP
        registrationPage.studentLastName.sendKeys(timestamp);

        //Click submit btn
        registrationPage.registerStudentBtn2.click();

        //Click first avatar
        registrationPage.allAvatars.get(0).click();

        //Submit form
        registrationPage.continueStudentRegBtn.click();

        //E-mail = StudentHWTIMESTAMP@testing.com
        registrationPage.studentEmail.sendKeys('StudentHW' + timestamp + '@testing.com');

        //Submit form
        registrationPage.doneBtn.click();

        //Screen capture (20151231_0830_StudentRegister_01.jpg)
        helper.makeScreenshot(screenShotSubDir, timestamp, 'StudentRegister_01.jpg', browser);

        //Expected: URL (#/Student/{{ClassId}}/Home) + Can see “All Challenges” button (ClassId is from Test Case #1)
        expect(browser.getCurrentUrl()).toContain(classId);
        expect(helper.allSkillsBtn.isDisplayed()).toBe(true);
        browser.executeScript("return window.localStorage.getItem(\"KH.AuthData\");").then(function (text) {
            var json = JSON.parse(text);
            userId = json.UserId;
        });

    });

    it('Test Case #3: Student Master a Branch and Run Lightning Challenge', function () {
        //console.log('studentUsername ==== ' + studentUsername);

        //Make direct call to /core/TestScript/MakeTestUser (pass in userId in FormBody) This enables test mode for user
        helper.enableUserTestMode(userId);

        //Log in as student user
        //browser.get(browser.params.siteURL);
        //loginPage.login('StudentHW20160602_1532', 'abcd');

        //Click "All Skills"
        helper.allSkillsBtn.click();

        //Screen capture (20151231_0830_StudentHomework_01.jpg)
        browser.sleep(1500);
        helper.makeScreenshot(screenShotSubDir, timestamp, 'StudentHomework_01.jpg', browser);

        //Expand unit
        challengesPage.selectUnit(0);

        //Keep note of the number of activities in first branch (10 including locked ones)
        expect(challengesPage.getUnitActivities(0).count()).toBe(10);

        //Repeat the Homework Gameplay process for all of the activities in that section
        //The script must be aware of the number of activities
        //After last activity is complete, it should have all of the stars earned.

        challengesPage.completeGameplayProcess(0, 0);
        challengesPage.completeGameplayProcess(0, 1);
        challengesPage.completeGameplayProcess(0, 2);
        challengesPage.completeGameplayProcessWithLvlAssert(0, 3, 'Bronze');
        challengesPage.completeGameplayProcess(0, 4);
        challengesPage.completeGameplayProcess(0, 5);
        challengesPage.completeGameplayProcessWithLvlAssert(0, 6, 'Silver');
        challengesPage.completeGameplayProcess(0, 7);
        challengesPage.completeGameplayProcess(0, 8);
        challengesPage.completeGameplayProcessWithLvlAssert(0, 9, 'Gold');

        //Screen capture
        browser.sleep(5000);
        helper.makeScreenshot(screenShotSubDir, timestamp, 'StudentHomework_02.jpg', browser);

        //Click the light blue lightning icon in that branch
        challengesPage.selectChallenge.click();

        //Expected: State should be ______ + section name (Identify Ratios) should match the section you clicked in
        expect(challengesPage.challengeLabel.getText()).toBe('LIGHTNING CHALLENGE');

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
        });
    });

    it('Test Case #4: Create a GameShow Class and Play a GameShow', function () {
        //Login as a teacher
        loginPage.login('TestScript+Teacher20160608_0957@knowledgehook.com', 'abcd');

        //Expected: URL = /Teacher and “Add Class” button shows up
        expect(browser.getCurrentUrl()).toBe(browser.params.siteURL + 'App/#/Teacher');

        //Click “Add Class”
        classManagementPage.addClassBtn.click();

        //Select “GameShow Free”
        helper.waitElementToBeClickable(classManagementPage.gameShowBtn);
        classManagementPage.gameShowBtn.click();

        //Course = (Parameter passed into test run. You can use initial parameter of: Grade 9 Applied)
        var gameShowCoursePicker = classManagementPage.gameShowCoursePicker;
        gameShowCoursePicker.click();
        classManagementPage.selectCourse(gameShowCoursePicker, browser.params.gameShowCourse, classManagementPage.gameShowCoursePickerOptions);

        //ClassName = Regression GameShow Class TIMESTAMP
        classManagementPage.classNameInput.sendKeys('Regression GameShow Class ' + timestamp);

        //Term = Fall 2015
        var termPicker = classManagementPage.termPicker;
        termPicker.click();
        classManagementPage.selectTerm(termPicker, '2015-2016 Full Year');

        //Submit form
        classManagementPage.addGameShowClass.click();

        helper.waitElementToDisappear(helper.modalOpen);

        //Expected: Number of classes = 2 (if continued from previous user) and class named “Regression GameShow Class TIMESTAMP”
        //expect(classManagementPage.allClasses.count()).toBe(2);
        //expect(classManagementPage.allClasses.get(1).$(classManagementPage.className).getText()).toBe('Regression GameShow Class ' + timestamp);

        //Screen capture (TIMESTAMP_TeacherCreateClassGameShow_01.jpg)
        helper.makeScreenshot(screenShotSubDir, timestamp, 'TeacherCreateClassGameShow_01.jpg', browser);

        //Collect teacher id and enable test user for it
        browser.executeScript("return window.localStorage.getItem(\"KH.AuthData\");").then(function (text) {
            var json = JSON.parse(text);
            teacherId = json.UserId;
            helper.enableUserTestMode(teacherId);
        });

        //Click the class name to go to its GameShows
        //classManagementPage.allClasses.get(1).$(classManagementPage.className).click();
        classManagementPage.allClasses.get(35).$(classManagementPage.classNameGameShow).click();

        //Screen capture (TIMESTAMP_TeacherGameShow_01.jpg)
        //helper.waitElementToBeVisisble(element(by.cssContainingText('.pageHeading', 'Number Sense')));
        helper.makeScreenshot(screenShotSubDir, timestamp, 'TeacherGameShow_01.jpg', browser);

        //Click Play on first GameShow
        classManagementPage.getGameShowAttribute(0, classManagementPage.playButton).click();

        //Click Open Waiting Room
        classManagementPage.openWaitingRoom.click();

        //Record the Game PIN value (student needs this to join)
        classManagementPage.gamePin.getText().then(function (text) {
            gamePin = text;
            //console.log('GamePin === ' + gamePin);
        });

        //Open a new browser, go to GameShow Joining site (passed as parameter, but initial tests will be run on https://alpha.playkh.com
        browser2 = browser.forkNewDriverInstance(false);
        helper.setBrowserParams(browser2);
        helper.switchBrowser(browser2);
        browser2.get(browser.params.gameShowSiteUrl);
        browser2.getWindowHandle().then(function (handle) {
            browser2.switchTo().window(handle);
            //Enter Game PIN value and click “Enter”
            $(gameShowPage.gameShowPin).sendKeys(gamePin);
            $(gameShowPage.enterButton).click();
            //Click “Create Account”
            $(gameShowPage.createAccount).click();
            //Username: TestScriptStudentGs{{TIMESTAMP}}
            $(gameShowPage.usernameInput).sendKeys('TestStudentGs' + timestampWOHours);
            console.log('studentname == ' + 'TestStudentGs' + timestampWOHours);
            //First Name: Test Student GS
            $(gameShowPage.firstName).sendKeys('Test Student GS');
            //Last Initial: 1
            $(gameShowPage.lastName).sendKeys('1');
            //Click “Continue”
            $(gameShowPage.continueButton).click();
            //Password: abcd
            $(gameShowPage.password).sendKeys('abcd');
            //Password confirm: abcd
            $(gameShowPage.passwordConfirm).sendKeys('abcd');
            //Avatar: Select avatar 1 (top right)
            $$(gameShowPage.allAvatars).get(1).click();
            //Click “Enter”
            $(gameShowPage.registerStudentButton).click();
            //It says “You’re in!”
            var welcomeMessage = $(gameShowPage.youAreIn);
            helper.waitElementToBeVisisble(welcomeMessage);
            //It says “You’re in!”
            expect(welcomeMessage.getText()).toBe('You\'re In!');
            //Screen capture (TIMESTAMP_GameShowStudent1_01.jpg)
            helper.makeScreenshot(screenShotSubDir, timestamp, 'GameShowStudent1_01.jpg', browser2);
            browser2.executeScript("return window.localStorage.getItem(\"KH.AuthData\");").then(function (text) {
                var json = JSON.parse(text);
                firstStudentId = json.UserId;
            });
        }).then(function () {
            //Repeat this with a second student, but change these values:
            //Last Initial: 2
            //Avatar: Select avatar 2
            //The screen capture should be named TIMESTAMP_GameShowStudent2_01.jpg
            browser3 = browser.forkNewDriverInstance(false);
            helper.setBrowserParams(browser3);
            helper.switchBrowser(browser3);
            browser3.get(browser.params.gameShowSiteUrl);
            browser3.getWindowHandle().then(function (handle) {
                browser3.switchTo().window(handle);
                //Enter Game PIN value and click “Enter”
                $(gameShowPage.gameShowPin).sendKeys(gamePin);
                $(gameShowPage.enterButton).click();
                //Click “Create Account”
                $(gameShowPage.createAccount).click();
                //Username: TestScriptStudentGs{{TIMESTAMP}}
                //console.log('username ==== ' + 'TestStudent2Gs' + timestampWOHours);
                $(gameShowPage.usernameInput).sendKeys('TestStudent2Gs' + timestampWOHours);
                //First Name: Test Student GS
                $(gameShowPage.firstName).sendKeys('Test Student GS');
                //Last Initial: 1
                $(gameShowPage.lastName).sendKeys('2');
                //Click “Continue”
                $(gameShowPage.continueButton).click();
                //Password: abcd
                $(gameShowPage.password).sendKeys('abcd');
                //Password confirm: abcd
                $(gameShowPage.passwordConfirm).sendKeys('abcd');
                //Avatar: Select avatar 1 (top right)
                $$(gameShowPage.allAvatars).get(2).click();
                //Click “Enter”
                $(gameShowPage.registerStudentButton).click();
                //It says “You’re in!”
                var welcomeMessage = $(gameShowPage.youAreIn);
                helper.waitElementToBeVisisble(welcomeMessage);
                //It says “You’re in!”
                expect(welcomeMessage.getText()).toBe('You\'re In!');
                //Screen capture (TIMESTAMP_GameShowStudent1_01.jpg)
                helper.makeScreenshot(screenShotSubDir, timestamp, 'GameShowStudent2_01.jpg', browser3);
                browser3.executeScript("return window.localStorage.getItem(\"KH.AuthData\");").then(function (text) {
                    var json = JSON.parse(text);
                    secondStudentId = json.UserId;
                });
            });
        }).then(function () {
            helper.switchBrowser(initialBrowser);
            browser.getWindowHandle().then(function (handle) {
                browser.switchTo().window(handle);
                //Run /core/TestScript/MakeTestUser on both users
                helper.enableUserTestMode(firstStudentId);
                helper.enableUserTestMode(secondStudentId);

                //Screen capture TIMESTAMP_TeacherGameShow_02.jpg
                helper.makeScreenshot(screenShotSubDir, timestamp, 'TeacherGameShow_02.jpg', browser);

                //Click “Start Game”
                $(gameShowPage.startQuizButton).click();
                browser.sleep(6000);
                //Screen capture: TIMESTAMP_TeacherGameShow_03.jpg
                helper.makeScreenshot(screenShotSubDir, timestamp, 'TeacherGameShow_03.jpg', browser);
            });
        }).then(function() {
            //Click the correct answer (Student 1)
            helper.switchBrowser(browser2);
            challengesPage.completeGameShowQuestionProcess(browser2);

            //Click the correct answer (Student 2)
            helper.switchBrowser(browser3);
            challengesPage.completeGameShowQuestionProcess(browser3);

            //Screen capture: (TIMESTAMP_TeacherGameShow_04.jpg)
            helper.switchBrowser(initialBrowser);
            browser.sleep(5000);
            helper.makeScreenshot(screenShotSubDir, timestamp, 'TeacherGameShow_04.jpg', browser);

            //Student 1: Expected: Modal saying “Correct!”
            helper.switchBrowser(browser2);
            expect($('.answerCorrectTitle').getText()).toBe('Correct!');

            //Screen capture: TIMESTAMP_GameShowStudent1_02.jpg
            helper.makeScreenshot(screenShotSubDir, timestamp, 'TIMESTAMP_GameShowStudent1_02.jpg', browser2);

            //Click “OK!”
            element(by.buttonText('Yeah!')).click();

            //Now the student can Upload a solution (Student 1)
            var filePath = (__dirname.substr(0, __dirname.length - 5)) + 'files';

            //console.log('This platform is' ${process.platform});
            //$(challengesPage.uploadButtonGameShow).click();
            //browser2.ignoreSynchronization = true;
            //browser.wait(EC.visibilityOf($(challengesPage.uploadButtonGameShow)), 5000);
            browser2.sleep(5000);
            //$(challengesPage.uploadButtonGameShow).sendKeys(filePath + '/triangle1.jpg');
            //browser.actions().mouseMove($(challengesPage.uploadButtonGameShow)).sendKeys(filePath + '/triangle1.jpg').perform();


            //browser.sleep(10000000);
        });
    }); */
});
