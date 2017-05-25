var RegistrationPage = function (browserInstance) {
    helper.switchBrowser(browserInstance);
    //Selectors Login page
    this.email = element(by.model('Teacher.Email'));
    this.password = element(by.model('Teacher.Password'));
    this.confirmPassword = element(by.model('Password2'));
    this.submitBtn = $('button[ng-click="ValidateEmail()"]');

    this.studentUsername = element(by.model('StudentData.Username'));
    this.studentPassword = element(by.model('StudentData.Password'));
    this.studentRepeatPassword = element(by.model('StudentData.Password2'));
    this.registerStudentBtn = $$('button[ng-click="step1Submitted = true"]').first();
    this.studentFirstName = element(by.model('UserInfo.FirstName'));
    this.studentLastName = element(by.model('UserInfo.LastName'));
    this.registerStudentBtn2 = $('button[ng-click="step2Submitted = true"]');

    this.registerStudent = $('a[href="#/Register/Student"]');
    this.registerTeacher = $('a[href="#/Register/Teacher"]');

    this.allAvatars = element.all(by.repeater('Avatar in Avatars'));
    this.continueStudentRegBtn = $('button[ng-click="step3Submitted = true"]');
<<<<<<< HEAD
    //Selectors for teacher registration last step
    this.title = element.all(by.model('Teacher.Salutation')).first();
    this.titlePickerOptions = 'Salutation for Salutation in Salutations';
    this.firstName = element(by.model('Teacher.FirstName'));
    this.lastName = element(by.model('Teacher.LastName'));
    this.country = element(by.model('Country'));
    this.countryPickerOptions = 'Country.Name for Country in Countries';
    this.state = element(by.model('Region'));
    this.statePickerOptions = 'Region.Name for Region in Country.Regions';
    this.schoolBoard = element(by.model('Teacher.SchoolBoard'));
    this.school = element(by.model('Teacher.School'));
    this.registerBtn = $('button[ng-click="RegisterTeacher()"]');
    this.classCode = element(by.model('StudentData.ClassPin'));
    this.submitUserRegistration = $$('button[btn-loading="sending"]').first();

    this.autocompleteList = element.all(by.repeater('match in matches track by $index'));

    this.selectTitle = function(titlePicker, title){
        titlePicker.all(by.options(this.titlePickerOptions)).each(function (element) {
            element.getText().then(function (text) {
                if (text === title)
                    element.click();
            });
        });
    };

    this.selectCountry = function(countryPicker, country){
        countryPicker.all(by.options(this.countryPickerOptions)).each(function (element) {
            element.getText().then(function (text) {
                if (text === country)
                    element.click();
            });
        });
    };

    this.selectState = function(statePicker, state){
        statePicker.all(by.options(this.statePickerOptions)).each(function (element) {
            element.getText().then(function (text) {
                if (text === state)
                    element.click();
            });
        });
    };

    this.registerT = function(username, password, timestamp) {
      //Click Teacher
      helper.waitElementToBeClickable(this.registerTeacher);
      this.registerTeacher.click();

      //Email
      this.email.sendKeys(username);

      //Password
      this.password.sendKeys(password);

      //Confirm password
      this.confirmPassword.sendKeys(password);

      //Click Submit
      helper.waitElementToBeClickable(this.submitBtn);
      this.submitBtn.click();

      //Salutation = Mr.
      var titlePicker = this.title;
      titlePicker.click();
      this.selectTitle(titlePicker, 'Mr.');

      //First Name = Regression
      this.firstName.sendKeys('Regression');

      //Last Name = Teacher
      this.lastName.sendKeys('Teacher');

      //Country = Canada
      var countryPicker = this.country;
      countryPicker.click();
      this.selectCountry(countryPicker, 'Canada');

      //Province = Ontario
      var statePicker = this.state;
      statePicker.click();
      this.selectState(statePicker, 'Ontario');

      //School Board = Toronto District School Board (TDSB)
      this.schoolBoard.sendKeys('Toronto District');
      helper.waitRepeatorToHaveParticularAmountOfRows('match in matches track by $index', 1);
      this.autocompleteList.get(0).click();

      //School = Victoria Park Collegiate Institute
      this.school.sendKeys('Victoria Park Collegiate');
      helper.waitRepeatorToHaveParticularAmountOfRows('match in matches track by $index', 1);
      this.autocompleteList.get(0).click();

      //Click submit
      helper.waitElementToBeClickable(this.registerBtn);
      this.registerBtn.click();

      //Expected: URL = #/Teacher and “Add Class” button shows up (button has ID)
      expect(browser.getCurrentUrl()).toBe(browser.params.siteURL + 'App/#/Teacher');
    };

    this.registerS = function(username, password, code, timestamp) {
      //Click Student
      this.registerStudent.click();
      browser.waitForAngular();
      //Enter class code from last script + submit
      this.classCode.sendKeys(code);
      //registrationPage.classCode.sendKeys('star768');
      this.submitUserRegistration.click();
      //Enter Username = StudentHWTIMESTAMP
      this.studentUsername.sendKeys(username);
      //Password = abcd
      this.studentPassword.sendKeys(password);
      this.studentRepeatPassword.sendKeys(password);
      //Submit form
      this.registerStudentBtn.click();
      //FirstName = Student Homework
      this.studentFirstName.sendKeys('Student Homework');
      //LastName = TIMESTAMP
      this.studentLastName.sendKeys(timestamp);
      //Click submit btn
      this.registerStudentBtn2.click();
      //Click first avatar
      this.allAvatars.get(0).click();
      //Submit form
      this.continueStudentRegBtn.click();
      //Expected: URL (#/Student/{{ClassId}}/Home) + Can see “All Challenges” button (ClassId is from Test Case #1)
      browser.executeScript("return window.localStorage.getItem(\"KH.AuthData\");").then(function (text) {
          var json = JSON.parse(text);
          userId = json.UserId;
          helper.enableUserTestMode(userId);
      });
    };
};

module.exports = RegistrationPage;
