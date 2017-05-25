describe('class list', function() {
  var classList;
  browser.get('https://www.khmath.com');

  element(by.model('LoginData.Username')).sendKeys('Hanson');
  element(by.model('LoginData.Password')).sendKeys('abcd');
  element(by.id('btnLogin')).click();

  browser.waitForAngular();

  classList = element(by.model('ClassInfo.ClassId'));

  it('should start with Grade 9 Academic', function() {
    var selectedClass = classList.element(by.css('option[selected="selected"]'));
    expect(selectedClass.getText()).toEqual('Grade 9 Academic');
    browser.sleep(5000);
  });

  it('should change to Hi', function() {
    classList.element(by.css('option[label="Hi"]')).click();
    var selectedClass = classList.element(by.css('option[selected="selected"]'));
    expect(selectedClass.getText()).toEqual('Hi');
    browser.sleep(5000);
  });
});
