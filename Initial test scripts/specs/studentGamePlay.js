var helper = require('./../helper.js');
var loginPage = require('./../pages/loginPage.js');
var challengesPage = require('./../pages/challengesPage.js');

describe("Test Script #1: Student Gameplay", function () {

    var pathDir = __dirname;

    beforeAll(function () {
        helper.setBrowserParams();
        browser.get(browser.params.siteUrl);
    });

    it('Test Script #1: Student Gameplay', function () {
        loginPage.inputs.login.sendKeys(browser.params.login);
        loginPage.inputs.password.sendKeys(browser.params.password);
        loginPage.buttons.loginBtn.click();

        //EXPECTED: XP counter > 1
        expect(challengesPage.selectors.counterBlockStars.getText()).toBeGreaterThan(1);

        //EXPECTED: Stars counter > 1
        expect(challengesPage.selectors.counterBlockXp.getText()).toBeGreaterThan(1);
        challengesPage.selectors.PropertiesofLinearRelationships.click();
        helper.waitElementToBePresented(challengesPage.selectors.descriptionOpened);
        challengesPage.selectors.firstStar.click();
        browser.waitForAngular();
        challengesPage.selectors.okButton.isPresent().then(function (result) {
            if (result == true) {
                challengesPage.selectors.okButton.click();
            }
            helper.waitElementToDisappear(challengesPage.selectors.paceDoneModal);
            challengesPage.selectors.continueToQuestion.click();
            challengesPage.selectors.correctAnswer.click();

            //EXPECTED: Should show this “Correct!” modal
            expect(challengesPage.selectors.paceDoneModal.isPresent()).toBe(true);
            challengesPage.selectors.uploadButton.sendKeys(pathDir + '/Documents/images.jpeg');

            //EXPECTED: Should show “Upload Successful” message
            expect(challengesPage.selectors.uploadSuccessfulMsg.getText()).toBe('Solution uploaded!');
            challengesPage.selectors.continueBtn.click();
            browser.waitForAngular();
            challengesPage.selectors.incorrectAnswer.click();

            //EXPECTED: Should show “Incorrect, try again” message
            expect(challengesPage.selectors.firstIncorrect.getText()).toBe('Incorrect, try again...');
            browser.waitForAngular();
            challengesPage.selectors.correctAnswer.click();

            //EXPECTED: Should load “Correct” modal
            expect(challengesPage.selectors.paceDoneModal.isPresent()).toBe(true);
            challengesPage.selectors.continueBtn.click();
            browser.waitForAngular();
            challengesPage.selectors.incorrectThirdAnswer.get(0).click();
            challengesPage.selectors.incorrectThirdAnswer.get(1).click();

            //EXPECTED: Should load this “Oops!” alert
            expect(challengesPage.selectors.oopsAlert.getText()).toBe('Oops! Next Question!');
            challengesPage.selectors.continueBtnThirdQuestion.click();

            //EXPECTED: Should load the Summary modal with 1 star
            expect(challengesPage.selectors.oneStar.isPresent()).toBe(true);
            challengesPage.selectors.homeBtn.click();

            //EXPECTED: Should return to “Challenges” page
            expect(challengesPage.selectors.PropertiesofLinearRelationships.isDisplayed()).toBe(true);
        });
    });
});