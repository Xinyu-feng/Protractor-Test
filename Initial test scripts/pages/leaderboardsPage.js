var leaderboardsPage = {};

leaderboardsPage.selectors = {};
leaderboardsPage.selectors.homeworkLeaderboard = element.all(by.repeater('Student in HomeworkLeaderboard.Students'));
leaderboardsPage.selectors.divisionLeaderboard = element.all(by.repeater('School in MathCupLeaderboard.Schools'));

exports.selectors = leaderboardsPage.selectors;