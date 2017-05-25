describe('test', function() {
  it('simple test', function() {
    browser.get('file:///C://test.html');

    element(by.model('name')).sendKeys('potato');
    expect(element(by.css('h1')).getText()).toEqual('Hello potato');
    browser.sleep(5000);
  });
});
