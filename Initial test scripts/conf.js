exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    framework: 'jasmine2',
    allScriptsTimeout: 50000,
    rootElement: 'html',
    directConnect: true,

    specs: [
        'specs/studentGamePlay.js',
        'specs/basicPages.js',
        'specs/studentRegistration.js'
    ],
    capabilities: {
        browserName: 'chrome',
        //shardTestFiles: true,
        //maxInstances: 4
    },
    params: {
        screenWidth: 1024,
        screenHeight: 768,
        login: 'Hanson',
        password: 'abcd',
        adminLogin: 'AdminTest',
        adminPassword: 'Test/456',
        siteUrl: 'http://alpha.khmath.com',
        screenshotFolder: '/Users/sergeyteplyakov/Desktop/123/'
    },
    jasmineNodeOpts: {
        defaultTimeoutInterval: 360000
    },

    onPrepare: function() {
        browser.driver.manage().timeouts().implicitlyWait(5000);
    }
}