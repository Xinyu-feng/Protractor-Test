var myProfilePage = {};

myProfilePage.selectors = {};
myProfilePage.selectors.profileLeagueDetails = $('.profileLeagueDetails');
myProfilePage.selectors.allBadges = element.all(by.repeater('Badge in Profile.Badges'));

exports.selectors = myProfilePage.selectors;