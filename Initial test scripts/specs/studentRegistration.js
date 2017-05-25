var helper = require('./../helper.js');
var loginPage = require('./../pages/loginPage.js');
var adminPage = require('./../pages/adminPage.js');

describe("Test Script #3: Student Registration", function () {
    beforeAll(function () {
        helper.setBrowserParams();
        browser.get(browser.params.siteUrl);
    });

    it('Test Script #3: Student Registration', function () {
        loginPage.inputs.login.sendKeys(browser.params.adminLogin);
        loginPage.inputs.password.sendKeys(browser.params.adminPassword);
        loginPage.buttons.loginBtn.click();

        adminPage.selectors.menu.click();
        adminPage.selectors.adminOptionInMenu.click();

        //Dynamically create Teacher
        var username = helper.generateUsername();
        adminPage.selectors.addUserUsername.sendKeys(username);
        adminPage.selectors.addUserPassword.sendKeys('abcd');
        adminPage.selectors.addUserBtn.click();

        //Add User to Role:
        adminPage.selectors.addUserToRoleUsername.sendKeys(username);
        adminPage.selectors.roleSelect.click();
        //Commented because two Teacher roles were found, hardcoded for now
        //adminPage.selectRole('Teacher');
        adminPage.selectors.roleSelect.$('option[value="10"]').click();
        adminPage.selectors.addUserToRole.click();

        //Set the School
        adminPage.selectors.setSchoolUsername.sendKeys(username);
        adminPage.selectors.schoolSelect.click();
        adminPage.selectSchool('Demo School');
        adminPage.selectors.setUserSchoolBtn.click();

        //Create the Class Group
        adminPage.selectors.classGroupName.clear().sendKeys('Test Class ' + username);
        adminPage.selectors.className.clear().sendKeys('Test Class ' + username);
        adminPage.selectors.courseSelector.click();
        adminPage.selectCourse('Grade 9 Academic');
        adminPage.selectors.teacher.sendKeys(username);
        adminPage.selectors.termSelector.click();
        adminPage.selectTerm('Term 2 (2014-2015)');
        adminPage.selectors.createClassGroupBtn.click();

        //Generate PINs for that class
        adminPage.selectors.classNamePinSection.sendKeys(username + ' (Test Class ' + username + ')');
        adminPage.selectors.pinAmount.clear().sendKeys('5');
        adminPage.selectors.generatePins.click();

        browser.sleep(5000);
    });
});