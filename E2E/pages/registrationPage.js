var RegistrationPage = function () {
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
    this.studentEmail = element(by.model('UserInfo.Email'));
    this.doneBtn = element(by.buttonText('Done!'));

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
};

module.exports = new RegistrationPage();
