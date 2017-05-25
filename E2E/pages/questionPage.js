var QuestionPage = function(browserInstance) {
  helper.switchBrowser(browserInstance);
  //answer inputs
  this.textAnswerInput = element(by.model('Question.FreeFormAnswers[$index]'));
  this.allMultichoiseAnswers = $$('div[id*="McAnswer"]');
  this.allMultiSelectAnswers = $$('div[id*="MsAnswer"]');
  //correct answer types
  this.correctAnswer = element.all(by.repeater('CorrectAnswer in Question.CorrectAnswers')).get(0);
  //submit answer buttons
  this.submitMCAnswer = $('button[ng-click="SubmitMultipleChoiceAnswer()"]');
  this.submitMSAnswer = $('button[ng-click="SubmitMultipleSelectionAnswer(Question.QuestionChoices)"]');
  this.submitFreeFormAnswer = $('button[ng-click="SubmitFreeFormAnswers(Question.FreeFormAnswers)"]');
  //fraction question elements
  this.fractionQ = $('div[fraction="Question.FreeFormAnswers[0]"]');
  this.addStrip = $('button[ng-click="AddFractionStrip()"]');
  this.resetStrips = $('a[ng-click="ResetStrips()"]');
  this.allStrips = $$('table[ng-click*="SelectFractionStrip"]');
  //algebra tiles elements
  this.algebraTiles = element(by.id('ManipAlgebraTilesContainer'));
  this.addTile = $('button[ng-click="AddTile()"]');
  this.allTiles = $$('img[ng-click*="AddTile"]');
  this.submitAlgAnswer = $('button[ng-click="$emit(\'SubmitAnswer\', Expression)"]');
  //counter elements
  this.counter = $('span[itemindex="Question.Manip.ItemIndex"]');

  this.modalOpen = $('body[class$="modal-open"]');
  var allSkillsBtn = $('button[data-ui-sref="Student.AllSkills"]');

  this.completeMcMsQuestion = function (multiSelect) {
    //[IF] If it’s multiple choice, click the correct answer
    var correctAnswer = this.correctAnswer;

    // if there are multiple correct answers but you only need to choose one
    if (!multiSelect) {
      var qType = this.allMultichoiseAnswers;
      var submitType = this.submitMCAnswer;
    } else { // if there are multiple correct answers and yuo have to choose all of them
      var qType = this.allMultiSelectAnswers;
      var submitType = this.submitMSAnswer;
    }

    // [IF] If question has image as correct answer
    correctAnswer.element(by.css('img')).isPresent().then(function(state1) {
      if (state1) {
        correctAnswer.element(by.css('img')).getAttribute('src').then(function(atb1) {
          qType.filter(function(elem) {
            return elem.element(by.css('img')).isPresent().then(function(state2) {
              if (state2) {
                return elem.element(by.css('img')).getAttribute('src').then(function(atb2) { // some questions have imgs and text
                  return atb1 === atb2;
                });
              }
            });
          }).click();
        });
        //[IF] if question has text as corrext answer
      } else {
        correctAnswer.evaluate('Question.CorrectAnswers.length').then(function(count1) {
          // if it's multiple choice but more than one correct answer, select first one
          if (!multiSelect) {
            count1 = 1;
          }

          for (let i=0; i<count1; i++) {
            correctAnswer.evaluate('Question.CorrectAnswers[' + i + '].AnswerText').then(function(corAns) {
              qType.get(0).evaluate('Question.QuestionChoices.length').then(function(count2) {
                for (let j=0; j<count2; j++) {
                  qType.get(0).evaluate('Question.QuestionChoices[' + j + '].AnswerText').then(function(choice) {
                    if (choice === corAns) {
                      qType.get(j).click();
                    }
                  });
                }
              });
            });
          }
        });
      }
    });
    helper.waitElementToBeClickable(submitType);
    submitType.click();
  };


  this.completeTextQuestion = function () {
    var correctAnswer = this.correctAnswer;
    var input = this.textAnswerInput;

    correctAnswer.getText().then(function(text) {
      input.sendKeys(text);
    });

    this.submitFreeFormAnswer.click();
  };


  this.completeFractionQuestion = function() {
    var correctAnswer = this.correctAnswer;
    var addStrip = this.addStrip;
    var allStrips = this.allStrips;
    var resetStrips = this.resetStrips;

    correctAnswer.getText().then(function(text) {
      helper.waitElementToBeClickable(addStrip);
      addStrip.click();
      allStrips.count().then(function(stripNum) {
        helper.waitElementToBeClickable(allStrips.get(0));
        allStrips.get(0).click();
        helper.waitElementToBeClickable(resetStrips);
        resetStrips.click();

        var numAndDenAns = text.split('/'); // creates array, where 0 index is num and 1 index is den
        var fractions = new Array(stripNum);
        for (let i=0; i<stripNum; i++) {
          var den = i + 1; // value of fraction denominator
          if (den === 7) { // 7th element in array should be 1/8
            den = 8;
          } else if (den === 8) { // 8th element in array should be 1/10
            den = 10;
          } // can add other cases if needed

          // if answer den does not divide into fraction den, don't need to use this fraction
          if (numAndDenAns[1] % den !== 0) {
            var num = -1;
          } else {
            var num = numAndDenAns[1] / den;
          }

          fractions[i] = [num, 0];
        }

        findFracCombo(fractions, numAndDenAns[0]);

        for (let i=0; i<stripNum; i++) {
          for (let j=0; j<fractions[i][1]; j++) {
            helper.waitElementToBeClickable(addStrip);
            addStrip.click();
            browser.waitForAngular();
            allStrips.get(i).click();
          }
        }
      });
    });
    helper.waitElementToBeClickable(this.submitFreeFormAnswer);
    this.submitFreeFormAnswer.click();
  };


  //completeFractionQuestion helper function
  var findFracCombo = function(numArr, goalVal) {
    if (goalVal === 0) {
      return true;
    }

    for (let i=0; i<numArr.length; i++) {
      if (numArr[i][0] < 0 || numArr[i][0] > goalVal) {
        continue;
      }
      numArr[i][1]++;
      var found = findFracCombo(numArr, goalVal - numArr[i][0]); // CHECK if i need challengesPage or this
      if (!found) {
        numArr[i][1]--; // revert change and keep looking
      } else {
        return true;
      }
    }
    return false; // no possible values to lower goalVal
  };


  this.completeAlgebraQuestion = function() {
    var correctAnswer = this.correctAnswer;
    var addTile = this.addTile;
    var allTiles = this.allTiles;

    correctAnswer.getText().then(function(text) {
      var ans = [0, 0, 0, 0, 0, 0];
      var xSqrSplit = text.replace(/\n/g, "").split('x2');
      var splitIndex = 0;

      if (xSqrSplit.length === 2) { // x^2 value is non-zero
        if (xSqrSplit[0] > 0) {
          ans[4] = xSqrSplit[0];
        } else {
          ans[5] = xSqrSplit[0].substring(1); //ignores subtraction sign
        }
        splitIndex = 1;
      }

      var xSplit = xSqrSplit[splitIndex].split('x');
      // NOTE: it's possible for xSplit to be [''], since the answer could only be ax^2

      if (xSplit.length === 2) { // x value is non-zero
        if (xSplit[0] > 0) {
          ans[2] = xSplit[0];
        } else {
          ans[3] = xSplit[0].substring(1);
        }

        if (xSplit[1] !== '') {
          if (xSplit[1] > 0) {
            ans[0] = xSplit[1];
          } else {
            ans[1] = xSplit[1].substring(1);
          }
        }
      } else { // no x value, check constant value
        if (xSplit[0] !== '') {
          if (xSplit[0] > 0) {
            ans[0] = xSplit[0];
          } else {
            ans[1] = xSplit[0].substring(1);
          }
        }
      }

      for (let i=0; i<ans.length; i++) {
        for (let j=0; j<ans[i]; j++) {
          helper.waitElementToBeClickable(addTile);
          addTile.click();
          helper.waitElementToBeVisisble(this.modalOpen);
          allTiles.get(i).click();
        }
      }
    });
    helper.waitElementToBeClickable(this.submitAlgAnswer);
    this.submitAlgAnswer.click();
  };
};

module.exports = QuestionPage;
