var ClassManagementPage = function (browserInstance) {
    helper.switchBrowser(browserInstance);
    //Selectors class management page
    this.addClassBtn = $('div[ng-click="AddClass()"]');
    this.gameShowBtn = $('button[ng-click="SelectClassType(\'G\')"]');
    this.homeWorkPremiumBtn = $$('button[ng-click="SelectClassType(\'H\')"]').first();
    this.classRedemptionCode = element(by.model('Class.RedemptionCode'));
    this.homeWorkCoursePicker = $('select[ng-show="Class.ClassType == \'H\'"]');
    this.gameShowCoursePicker = $('select[ng-show="Class.ClassType != \'H\'"]');
    this.homeWorkCoursePickerOptions = 'Course.CourseId as Course.Name for Course in HomeworkCourses';
    this.gameShowCoursePickerOptions = 'Course.CourseId as Course.Name for Course in Courses';
    this.classNameInput = element(by.model('Class.ClassName'));
    this.termPicker = element(by.model('Class.Term'));
    this.termPickerOptions = 'Term.Term as Term.Description for Term in Terms';
    this.continueBtn = $('button[ng-click="ValidateClassCode()"]');
    this.addGameShowClass = $('button[ng-click="ValidateGameshowCourse()"]');
    this.addClassText = $('div[ng-show="AddClassStep == 2"]');
    this.useCredit = element(by.buttonText('Use Credit'));
    this.createClass = element(by.css('button[ng-click="CreateClass()"]'));
    this.addClassTextAfterSubmit = $('label[uib-tooltip="When you set due dates on HomeWork Missions, they will be invisible and inaccessible until 14 days (by default) before the due date."]');
    this.doneBtn = element(by.buttonText('Done!'));
    this.allClasses = $$('div[class="ClassMgmtClass ng-scope"]');
    this.classNameHomework = 'div[ng-show="Class.ClassType == \'H\'"] .labelName';
    this.classNameGameShow = 'div[ng-show="Class.ClassType == \'G\'"] .labelName';
    this.allBranchGroups = element.all(by.repeater('BranchGroup in BranchGroups'));
    this.teacherDashboardTab = $('li[ng-class="{\'selected\': StateName == \'Teacher.Dashboard\'}"]');
    this.addStudent = $$('a[ng-click="AddStudent()"]').first();
    this.allStudents = $$('a[data-ui-sref="Teacher.StudentSummary({StudentId: Student.StudentId})"]');
    this.classCode = $$('.alert-info h2').first();
    this.closeModalBtn = $('button[ng-click="CloseModal()"]');

    this.addMissionBtn = $$('a[data-ui-sref="Teacher.Missions.Curriculum"]').get(0);
    this.assignMissionBtn = 'a[ng-click="DisplayAssignMissionModal(Unit);"]';
    this.dueDate = element(by.model('Mission.DueDate'));
    this.confirmAssignBtn = $('button[ng-click="QuickMissionAssign(Mission)"]');
    this.closeToastBtn = $('button[class="toast-close-button"]');
    this.feedbackBtn = $('button[ng-click="DisplayFeedbackPage(Item.Question.QuestionBucketId, Item.AttemptId)"]');
    this.comments = element(by.model('CurrentSolution.TeacherComments'));
    this.saveFeedbackBtn = $('button[ng-click="SaveComment(CurrentSolution.AttemptId, CurrentSolution.AttemptItemOrder, CurrentSolution.TeacherComments)"]');
    this.likeBtn = $('a[ng-click="ToggleLike(Item);"]');

    this.allClassesTwo = $$('div[ng-show="!Class.IsArchived && Class.ClassType != \'D\'"]');
    this.classNameTwo = 'a:nth-child(4) div:last-of-type';
    this.allGameShows = 'BranchGroup in BranchGroups';
    this.allUnits = 'Unit in Branch.Units';
    this.playBtn = 'a[ui-sref="Teacher.GameShowLaunch({PublicUnitId: Unit.PublicUnitId})"]';
    this.openWaitingRoom = $('button[ng-click="OpenWaitingRoom()"]');
    this.gamePin = $('.BarGamePin');

    this.selectCourse = function (coursePicker, courseOptions, course) {
        coursePicker.all(by.options(courseOptions)).each(function (element) {
            element.getText().then(function (text) {
                if (text === course)
                    element.click();
            });
        });
    };

    this.selectTerm = function (term) {
        var termPicker = this.termPicker;
        termPicker.all(by.options(this.termPickerOptions)).each(function (element) {
          element.getText().then(function (text) {
            if (text === term) {
              element.click();
            }
          });
        });
    };

    this.selectUnit = function (unitIndex, selector) {
        var unit = element.all(by.repeater(this.allUnits)).get(unitIndex);
        return unit.$(selector);
    };

    this.createNewClass = function(redemCode, course, term, name) {
        this.addClassBtn.click();

        //Select “Homework Premium”
        if (redemCode) {
          this.homeWorkPremiumBtn.click();

          //Class Redemption Code = (Parameter passed into test run. You can use an initial parameter of: testcode1)
          this.classRedemptionCode.sendKeys(redemCode);
          this.continueBtn.click();
          //Expected: See text “Use 1 credit?”
          expect(this.addClassText.getText()).toContain('Use 1 credit?');
          //Submit
          this.useCredit.click();

          //Course = (Parameter passed into test run. You can use an initial parameter of: Grade 9 Applied)
          var courseP = this.homeWorkCoursePicker;
          var courseO = this.homeWorkCoursePickerOptions;
        } else {
          this.gameShowBtn.click();

          //Course = (Parameter passed into test run. You can use an initial parameter of: Grade 9 Applied)
          var courseP = this.gameShowCoursePicker;
          var courseO = this.gameShowCoursePickerOptions;
        }

        //Course = (Parameter passed into test run. You can use an initial parameter of: Grade 9 Applied)

        courseP.click();
        this.selectCourse(courseP, courseO, course);

        //ClassName = Regression Class TIMESTAMP
        this.classNameInput.sendKeys(name);

        //Term = Fall 2015
        var termPicker = this.termPicker;
        termPicker.click();
        this.selectTerm(term);

        //Submit form
        this.createClass.click();
    };


    this.logOut = function () {
        var menu = $('#UserDropdown');
        helper.waitElementToBeClickable(menu);
        menu.click();
        helper.waitElementToBeVisisble($('li[class="dropdown pull-right open"]'));
        var logoutOption = $$('a[ng-click="LogOut()"]').get(0);
        helper.waitElementToBeClickable(logoutOption);
        logoutOption.click();
    };
};

module.exports = ClassManagementPage;
