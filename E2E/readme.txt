1. Install latest stable nodeJs (if you do not have it yet):
sudo npm cache clean -f
sudo npm install -g n
sudo n stable

2. Install latest protractor globally (3.0.0):
sudo npm install protractor -g

3. Install & update webdriver manager
sudo webdriver-manager install
sudo webdriver-manager update

4. In order to launch script you need Google Chrome browser installed

5. Go to directory which contains conf.js file and launch such command via command line:

Params description:
a. screenshotFolder - absolutePath to the folder where you would like to receive screenshots - MANDATORY PARAM
b. classRedemptionCode - Class Redemption Code, if empty default value: testcode1
c. homeWorkCourse - Homework Course, if empty default value: Grade 9 Applied
d. gameShowCourse - Game Show Course, if empty default value: Grade 9 Applied
e. gameShowSiteUrl - Game Show Site, if empty https://alpha.playkh.com/

protractor conf.js --params.screenshotFolder="/Users/sergeyteplyakov/Desktop/TestTest/" --params.classRedemptionCode="testcode1" --params.course="Grade 9 Applied"

6. Receive results into console

NOTE: sudo is not mandatory, apply it only if you wont be able to proceed without it