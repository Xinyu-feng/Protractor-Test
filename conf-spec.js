let SpecReporter = require('jasmine-spec-reporter').SpecReporter;
exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  framework: 'jasmine2',
  directConnect: true,
  allScriptsTimeout: 50000,
  rootElement: 'html',
  untrackOutstandingTimeouts: true,

  specs: ['test.js'],

  capabilities: {
      browserName: 'chrome'
  },

  params: {
    screenWidth: 1920,
    screenHeight: 1080,
    screenshotFolder: '/Users/xinyu/Desktop/Screenshot/',
  },

  jasmineNodeOpts: {
      defaultTimeoutInterval: 360000,
      print: function() {}
  },

  onPrepare: function() {
    jasmine.getEnv().addReporter(new SpecReporter({
        spec: {
            displayStacktrace: true
        }
      }));
    browser.resetUrl = 'file:///';
  }
};
