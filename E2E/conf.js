exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    framework: 'jasmine2',
    directConnect: true,
    allScriptsTimeout: 50000,
    rootElement: 'html',
    untrackOutstandingTimeouts: true,

    specs: [
        'specs/createTeacherAndStudent.js'
    ],
    capabilities: {
        browserName: 'chrome'
    },
    params: {
        screenWidth: 1920,
        screenHeight: 1080,
        siteURL: 'https://alpha.khmath.com/',
        portalUsername: '',
        portalPassword: '',
        screenshotFolder: '/Users/xinyu/Desktop/Screenshot/',
        classRedemptionCode: 'testcode1',
        homeWorkCourse: 'Grade 9 Applied',
        gameShowCourse: 'Grade 9 Applied',
        gameShowSiteUrl: 'https://alpha.playkh.com/'
    },
    jasmineNodeOpts: {
        defaultTimeoutInterval: 360000,
        print: function() {}
    },
    onPrepare: function () {

        global.helper = require('./helper.js');
        global.fs = require('fs');
        global.https = require('https');
        global.loginPage = require('./pages/loginPage.js');
        global.registrationPage = require('./pages/registrationPage.js');
        global.classManagementPage = require('./pages/classManagementPage.js');
        global.challengesPage = require('./pages/challengesPage.js');
        global.gameShowPage = require('./pages/gameShowPage.js');

        global.EC = protractor.ExpectedConditions;

        jasmine.getEnv().addReporter(new SpecReporter({
          spec: {
            displayStacktrace: true
          }
        }));
    },
};
