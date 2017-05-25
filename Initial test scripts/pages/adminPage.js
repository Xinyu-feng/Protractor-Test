var adminPage = {};

adminPage.selectors = {};

//Main page after user logged as admin
adminPage.selectors.menu = $('.dropdown-toggle');
adminPage.selectors.adminOptionInMenu = $('.dropdown-menu a[data-ui-sref="Admin"]');

//Administration page
adminPage.selectors.addUserUsername = $('#UserName');
adminPage.selectors.addUserPassword = $('form[class="form-horizontal ng-valid ng-dirty"] #Password');
adminPage.selectors.addUserBtn = $('button[data-ng-click="AddUser()"]');
adminPage.selectors.addUserToRoleUsername = $('input[ng-model="NewUserRole.User"]');
adminPage.selectors.roleSelect = $('select[data-ng-model="NewUserRole.RoleName"]');
adminPage.selectors.addUserToRole = $('button[data-ng-click$="RoleName)"]');
adminPage.selectors.setSchoolUsername = element(by.model('UserSchool.User'));
adminPage.selectors.schoolSelect = $('select[data-ng-model="UserSchool.School"]');
adminPage.selectors.setUserSchoolBtn = $('button[data-ng-click$="UserSchool.School.SchoolId)"]');
adminPage.selectors.classGroupName = $('#NewClassGroupName');
adminPage.selectors.className = $('#NewClassGroupClassName');
adminPage.selectors.courseSelector = $('select[data-ng-model="NewClassGroup.CourseId"]');
adminPage.selectors.teacher = element(by.model('NewClassGroup.Teacher'));
adminPage.selectors.termSelector = $('select[data-ng-model="NewClassGroup.Term"]');
adminPage.selectors.createClassGroupBtn = $('button[data-ng-click="CreateClassGroup()"]');
adminPage.selectors.classNamePinSection = element(by.model('PinGeneration.Class'));
adminPage.selectors.pinAmount = $('input[data-ng-model="NumPins"]');
adminPage.selectors.generatePins = $('button[data-ng-click="GenerateClassPins()"]');


var selectRole = function (roleName) {
    adminPage.selectors.roleSelect.element(by.cssContainingText('option', roleName)).click();
}

var selectSchool = function (schoolName) {
    adminPage.selectors.schoolSelect.element(by.cssContainingText('option', schoolName)).click();
}

var selectCourse = function (courseName) {
    adminPage.selectors.courseSelector.element(by.cssContainingText('option', courseName)).click();
}

var selectTerm = function(termName){
    adminPage.selectors.termSelector.element(by.cssContainingText('option', termName)).click();
}

exports.selectors = adminPage.selectors;
exports.selectRole = selectRole;
exports.selectSchool = selectSchool;
exports.selectCourse = selectCourse;
exports.selectTerm = selectTerm;
