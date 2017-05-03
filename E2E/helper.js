var waitElementToBeVisisble = function (elm) {

    browser.wait(EC.visibilityOf(elm), 15000);
};

var waitElementToBeClickable = function (elm) {

    browser.wait(EC.elementToBeClickable(elm), 15000);
};

var waitElementToBeInvisible = function (elm) {

    browser.wait(EC.invisibilityOf(elm), 15000);
};

var waitElementToDisappear = function (locator) {
    browser.wait(function () {
        return browser.isElementPresent(locator) //if element is already present, this line will evaluate to true
            .then(function (presenceOfElement) {
                return !presenceOfElement
            }); // this modifies the previous line so that it evaluates to false until the element is no longer present.
    }, 15000);
};

var waitRepeatorToHaveParticularAmountOfRows = function (locator, numberOfRows) {
    browser.wait(function () {
        return (element.all(by.repeater(locator)).count()).then(function (currentRows) {
            return currentRows == numberOfRows;
        });
    }, 15000);
};

var setBrowserParams = function (browser) {
    browser.driver.manage().window().setSize(browser.params.screenWidth, browser.params.screenHeight);
};

var switchBrowser = function (currentBrowser) {
    browser = currentBrowser;
    element = currentBrowser.element;
    $ = currentBrowser.$;
    $$ = currentBrowser.$$;
};

var generateTimeStamp = function (differentFormat) {
    var timestamp = '';
    var date = new Date();
    var arr = {};

    var dateComponents = {
        year: date.getFullYear(),
        month: (date.getMonth() + 1),
        day: date.getDate(),
        hours: date.getHours(),
        minutes: date.getMinutes()
    };

    for (var n in dateComponents) {
        arr[n] = (parseInt(dateComponents[n], 10) < 10 ) ? ('0' + dateComponents[n]) : (dateComponents[n]);
    }

    if (!differentFormat) {
        timestamp = arr.year.toString() + arr.month.toString() + arr.day.toString() + '_' + arr.hours + arr.minutes;
    }
    else {
        timestamp = arr.year.toString() + arr.month.toString() + arr.day.toString() + arr.hours + arr.minutes;
    }

    return timestamp;
};

var makeScreenshotSubDir = function (folder, timestamp) {
    var screenShotSubDir = '';
    fs.mkdirSync(folder + timestamp);

    if (fs.existsSync(browser.params.screenshotFolder + timestamp + '/')) {
        screenShotSubDir = browser.params.screenshotFolder + timestamp + '/';
    } else {
        screenShotSubDir = browser.params.screenshotFolder + timestamp + '\\';
    }

    return screenShotSubDir;
};

var makeScreenshot = function (folder, timestamp, filename, browser) {
    browser.takeScreenshot().then(function (png) {
        var stream = fs.createWriteStream(folder + timestamp + '_' + filename);
        stream.write(new Buffer(png, 'base64'));
        stream.end();
    });
};

var enableUserTestMode = function (userId) {
    //console.log('userid === ' + userId);
    var postData = JSON.stringify({UserId: userId});

    //console.log('POSTDATA ==== ' + postData);

    var options = {
        hostname: 'alpha.khmath.com',
        path: '/core/TestScript/MakeTestUser',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    var req = https.request(options, function (res) {
        //console.log('STATUS: ' + res.statusCode);
        //console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            //console.log('BODY: ' + chunk);
        });
        res.on('end', function () {
            //console.log('No more data in response.')
        })
    });

    req.on('error', function (e) {
        //console.log('problem with request: ' + e.message);
    });

    // write data to request body
    req.write(postData);
    req.end();
};

var logOut = function () {
    var menu = $('#UserDropdown');
    helper.waitElementToBeClickable(menu);
    menu.click();
    helper.waitElementToBeVisisble($('li[class="dropdown pull-right open"]'));
    var logoutOption = $$('a[ng-click="LogOut()"]').get(0);
    helper.waitElementToBeClickable(logoutOption);
    logoutOption.click();
};

var studentLogOut = function () {
    var menu = challengesPage.menu;
    helper.waitElementToBeClickable(menu);
    menu.click();
    helper.waitElementToBeVisisble($('li[class="dropdown open"]'));
    var logoutOption = $$('a[ng-click="LogOut()"]').get(0);
    helper.waitElementToBeClickable(logoutOption);
    logoutOption.click();
};

var modalOpen = $('body[class$="modal-open"]');
var allSkillsBtn = $('button[data-ui-sref="Student.AllSkills"]');

exports.waitElementToBeVisisble = waitElementToBeVisisble;
exports.waitElementToBeClickable = waitElementToBeClickable;
exports.waitElementToDisappear = waitElementToDisappear;
exports.waitElementToBeInvisible = waitElementToBeInvisible;
exports.waitRepeatorToHaveParticularAmountOfRows = waitRepeatorToHaveParticularAmountOfRows;
exports.setBrowserParams = setBrowserParams;
exports.generateTimeStamp = generateTimeStamp;
exports.makeScreenshot = makeScreenshot;
exports.makeScreenshotSubDir = makeScreenshotSubDir;
exports.enableUserTestMode = enableUserTestMode;
exports.modalOpen = modalOpen;
exports.allSkillsBtn = allSkillsBtn;
exports.logOut = logOut;
exports.studentLogOut = studentLogOut;
exports.switchBrowser = switchBrowser;
