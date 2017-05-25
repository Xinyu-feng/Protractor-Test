var EC = protractor.ExpectedConditions;

var waitElementToBeVisisble = function (elm) {

    browser.wait(EC.visibilityOf(elm), 25000);
};

var waitElementToBeClickable = function (elm) {

    browser.wait(EC.elementToBeClickable(elm), 15000);
};

var waitElementToBePresented = function (elm) {
    browser.wait(function () {
        return elm.isPresent();
    }, 15000);
};

var waitElementToDisappear = function (locator) {
    browser.wait(function () {
        return browser.isElementPresent(locator) //if element is already present, this line will evaluate to true
            .then(function (presenceOfElement) {
                return !presenceOfElement
            }); // this modifies the previous line so that it evaluates to false until the element is no longer present.
    }, 10000);
}

var setBrowserParams = function () {
    browser.driver.manage().window().setSize(browser.params.screenWidth, browser.params.screenHeight);
    browser.ignoreSynchronization = false;
}

var generateFilename = function () {
    var filename = '';
    var date = new Date();

    var dateComponents = {
        year: date.getFullYear(),
        month: (date.getMonth() + 1),
        day: date.getDay(),
        hours: date.getHours(),
        minutes: date.getMinutes()
    }

    var arr = {};

    for (var n in dateComponents) {
        arr[n] = (parseInt(dateComponents[n], 10) < 10 ) ? ('0' + dateComponents[n]) : (dateComponents[n]);
    }

    filename = arr.year + arr.month + arr.day + '_' + arr.hours + arr.minutes + '_Student_Leaderboard.png';

    return filename;
}

var generateUsername = function () {
    var username = '';
    var date = new Date();

    var dateComponents = {
        year: date.getFullYear(),
        month: (date.getMonth() + 1),
        day: date.getDay(),
        hours: date.getHours(),
        minutes: date.getMinutes(),
        seconds: date.getSeconds()
    }

    var arr = {};

    for (var n in dateComponents) {
        arr[n] = (parseInt(dateComponents[n], 10) < 10 ) ? ('0' + dateComponents[n]) : (dateComponents[n]);
    }

    username = 'T' + arr.year + arr.month + arr.day + '_' + arr.hours + arr.minutes + arr.seconds;

    return username;
}

exports.waitElementToBeVisisble = waitElementToBeVisisble;
exports.waitElementToBeClickable = waitElementToBeClickable;
exports.waitElementToDisappear = waitElementToDisappear;
exports.waitElementToBePresented = waitElementToBePresented;

exports.setBrowserParams = setBrowserParams;
exports.generateFilename = generateFilename;
exports.generateUsername = generateUsername;
