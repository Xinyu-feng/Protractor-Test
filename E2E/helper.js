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
        minutes: date.getMinutes(),
        seconds: date.getSeconds()
    };

    for (var n in dateComponents) {
        arr[n] = (parseInt(dateComponents[n], 10) < 10 ) ? ('0' + dateComponents[n]) : (dateComponents[n]);
    }

    if (!differentFormat) {
        timestamp = arr.year.toString() + arr.month.toString() + arr.day.toString() + '_' + arr.hours + arr.minutes + arr.seconds;
    }
    else {
        timestamp = arr.year.toString() + arr.month.toString() + arr.day.toString() + arr.hours + arr.minutes + arr.seconds;
    }

    return timestamp;
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


exports.waitElementToBeVisisble = waitElementToBeVisisble;
exports.waitElementToBeClickable = waitElementToBeClickable;
exports.waitElementToDisappear = waitElementToDisappear;
exports.waitElementToBeInvisible = waitElementToBeInvisible;
exports.waitRepeatorToHaveParticularAmountOfRows = waitRepeatorToHaveParticularAmountOfRows;
exports.setBrowserParams = setBrowserParams;
exports.generateTimeStamp = generateTimeStamp;
exports.enableUserTestMode = enableUserTestMode;
exports.switchBrowser = switchBrowser;
