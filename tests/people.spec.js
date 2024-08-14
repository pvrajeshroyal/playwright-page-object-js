const { test, expect } = require('@playwright/test');
const data = require('../testData/data.json');
const Login = require('../pageObjects/login');
const { faker } = require('@faker-js/faker');


test('add person', async ({ page }) => {
  const login = new Login(page);
  await page.goto(data.baseUrl + 'people/new');
  
  await login.signIn(data.userName, data.password);

  let title = page.locator('h1.main-title');
  await waitForPaceLoader(page);
  await expect(title).toContainText('Add new person');
  
  // Add person
  const first = faker.person.firstName();
  const last = faker.person.lastName();
  const email = `${Math.floor(Math.random() * 100000000)}-${faker.internet.email()}`;

  await page.fill('input#inputfirstname', first);
  await page.fill('input#inputname', last);
  await page.fill('input#inputemail', email);
  await page.click('.step .button.blue');

  await waitForPaceLoader(page);

  title = page.locator('h1.main-title');
  await expect(title).toContainText('Employee self onboarding');

  await expect(page.locator('.buttons.mobile_text-center .button')).toHaveCount(2);

  // Skip self-service onboarding
  await page.click('.buttons.mobile_text-center .skip');

  await waitForPaceLoader(page);

  await expect(page).toHaveURL(/.*people\/\d+/); // URL should be /people/1234
  const newPersonId = page.url().split('/').reverse()[0];

  await expect(page.locator('.person-header .details .name')).toContainText(`${first} ${last}`);
  await expect(page.locator(`a:text("${email}")`)).toHaveCount(1); // Link to work email
  await expect(page.locator('.box.box-yellow')).toHaveCount(1); // Not on payroll box

  // Event log last entry
  await expect(await page.locator('.ActivityFeed div.event:first-of-type .summary').innerText()).toMatch(new RegExp(`added ${first} ${last} as an employee`));

  // Person exists in list
  await page.click('a.link[href="/people"]');

  await waitForPaceLoader(page);

  await expect(page).toHaveURL(/.*people/); // URL should be /people
  await expect(page.locator('.table.list.boxxed a.tr:first-of-type .flex > span')).toContainText(`${first} ${last}`);
  await expect(page.locator(`.table.list.boxxed a.tr:first-of-type[href="/people/${newPersonId}"]`)).toHaveCount(1);
});

const sleep = (ms = 0) => new Promise((resolve) => setTimeout(resolve, ms))
const waitForPaceLoader = async (page) => {
  // Wait until pace is done
  await page.waitForSelector('.pace-done');

  // wait an extra 0.2 seconds just to be sure the page is fully loaded
  await sleep(200);

  return page;
}
module.exports.waitForPaceLoader = waitForPaceLoader
