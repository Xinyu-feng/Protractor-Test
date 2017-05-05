var ClassManagementPage = function () {
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
    this.addClassTextAfterSubmit = $('label[uib-tooltip="When you set due dates on HomeWork Missions, they will be invisible and inaccessible until 14 days (by default) before the due date."]');
    this.doneButton = element(by.buttonText('Done!'));
    this.allClasses = $$('div[class="ClassMgmtClass ng-scope"]');
    this.classNameHomework = 'div[ng-show="Class.ClassType == \'H\'"] .labelName';
    this.classNameGameShow = 'div[ng-show="Class.ClassType == \'G\'"] .labelName';
    this.allBranchGroups = element.all(by.repeater('BranchGroup in BranchGroups'));
    this.teacherDashboardTab = $('li[ng-class="{\'selected\': StateName == \'Teacher.Dashboard\'}"]');
    this.addStudent = $$('a[ng-click="AddStudent()"]').first();
    this.classCode = $$('.alert-info h2').first();
    this.iWillLetThemKnowBtn = $('button[ng-click="CloseModal()"]');

    this.allClassesTwo = $$('div[ng-show="!Class.IsArchived && Class.ClassType != \'D\'"]');
    this.classNameTwo = 'a:nth-child(4) div:last-of-type';
    this.allGameShows = 'GameShow in Expectation.GameShows';
    this.playButton = 'a[data-ui-sref="Teacher.GameShowLaunch({GameShowId: GameShow.GameShowId})"]';
    this.openWaitingRoom = $('button[ng-click="OpenWaitingRoom()"]');
    this.gamePin = $('.BarGamePin');

    this.selectCourse = function (coursePicker, course, courseOptions) {
        coursePicker.all(by.options(courseOptions)).each(function (element) {
            element.getText().then(function (text) {
                if (text === course)
                    element.click();
            });
        });
    };

    this.selectTerm = function (termPicker, term) {
        termPicker.all(by.options(this.termPickerOptions)).each(function (element) {
            element.getText().then(function (text) {
                if (text === term)
                    element.click();
            });
        });
    };

    this.getGameShowAttribute = function (gameShowIndex, selector) {
        var gameShow = element.all(by.repeater(this.allGameShows)).get(gameShowIndex);
        return gameShow.$(selector);
    };
};

module.exports = new ClassManagementPage();
