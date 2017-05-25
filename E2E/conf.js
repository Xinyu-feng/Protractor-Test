let SpecReporter = require('jasmine-spec-reporter').SpecReporter;
var HtmlReporter = require('protractor-html-screenshot-reporter');
exports.config = {
    framework: 'jasmine',
    directConnect: true,
    allScriptsTimeout: 50000,
    rootElement: 'html',
    untrackOutstandingTimeouts: true,

    specs: [
        'specs/createTeacherAndStudentOld.js',
      //  'specs/temp.js',
      //  'specs/manipTeste.js',
      //  'specs/submitFeedback.js',
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
        classRedemptionCode: 'testcode1',
        homeWorkCourse: 'Grade 9 Applied',
        gameShowCourse: 'Grade 9 Applied',
        term: '2016-2017 Full Year',
        gameShowSiteUrl: 'https://alpha.khmath.com/play'
    },
    jasmineNodeOpts: {
        defaultTimeoutInterval: 7200000,
        print: function() {}
    },
    onPrepare: function () {

        global.helper = require('./helper.js');
        global.fs = require('fs');
        global.https = require('https');
        global.LoginPage = require('./pages/loginPage.js');
        global.RegistrationPage = require('./pages/registrationPage.js');
        global.ClassManagementPage = require('./pages/classManagementPage.js');
        global.ChallengesPage = require('./pages/challengesPage.js');
        global.GameShowPage = require('./pages/gameShowPage.js');
        global.QuestionPage = require("./pages/questionPage.js");
        global.loginPage = new LoginPage(browser);
        global.registrationPage = new RegistrationPage(browser);
        global.classManagementPage = new ClassManagementPage(browser);
        global.gameShowPage = new GameShowPage(browser);
        global.challengesPage = new ChallengesPage(browser);

        jasmine.getEnv().addReporter(new HtmlReporter({
          baseDirectory: '/Users/xinyu/Desktop/Screenshot/',
          takeScreenShotsOnlyForFailedSpecs: true,
        }));

        global.EC = protractor.ExpectedConditions;

        jasmine.getEnv().addReporter(new SpecReporter({
          spec: {
            displayStacktrace: true
          },
          colors: {
            enabled: false,
          },
          prefixes: {
            successful: "O ",
            failed: "X ",
          },
        }));
    },
};
