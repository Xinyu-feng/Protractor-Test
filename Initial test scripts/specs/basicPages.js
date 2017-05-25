var fs = require('fs');

var helper = require('./../helper.js');
var loginPage = require('./../pages/loginPage.js');
var challengesPage = require('./../pages/challengesPage.js');
var leaderboardsPage = require('./../pages/leaderboardsPage.js');
var myProfilePage = require('./../pages/myProfilePage.js');

describe("Test Script #2: Basic Pages are Loading", function () {

    beforeAll(function () {
        helper.setBrowserParams();
        browser.get(browser.params.siteUrl);
        browser.sleep(2000);
    });

    it('Test Script #2: Basic Pages are Loading', function () {
        loginPage.inputs.login.sendKeys(browser.params.login);
        loginPage.inputs.password.sendKeys(browser.params.password);
        loginPage.buttons.loginBtn.click();
        challengesPage.selectors.leaderboards.click();

        //EXPECTED: The Homework Sprint leaderboard shows at least 3 students.
        expect(leaderboardsPage.selectors.homeworkLeaderboard.count()).toBeGreaterThan(3);

        //EXPECTED: The Division Leaderboard shows at least 3 schools
        expect(leaderboardsPage.selectors.divisionLeaderboard.count()).toBeGreaterThan(3);

        //SCREENSHOT: Save a screenshot for us to view outside of the GIT repo, in a designated folder
        if (!fs.existsSync(browser.params.screenshotFolder)) {
            fs.mkdirSync(browser.params.screenshotFolder);
        }
        browser.takeScreenshot().then(function (png) {
            var stream = fs.createWriteStream(browser.params.screenshotFolder + helper.generateFilename());
            stream.write(new Buffer(png, 'base64'));
            stream.end();
        })

        challengesPage.selectors.myProfile.click();

        //EXPECTED: It should give a league name (like “Diamond League”)
        expect(myProfilePage.selectors.profileLeagueDetails.getText()).toContain('Diamond League');

        //EXPECTED: There should be at least 3 Knowledge Badges in the section at the bottom
        expect(myProfilePage.selectors.allBadges.count()).toBeGreaterThan(2);
    })
});
