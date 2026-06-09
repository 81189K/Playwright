import { chromium, test } from "@playwright/test";

test("TS02-01: playwright locator method- xpath, css selector, text, id", async ({ page }) => {

  await page.goto("https://www.saucedemo.com/");

  //1. xpath
  await page.locator("//input[@name='user-name']").fill("standard_user"); //usename

  //2. css selector
  await page.locator("input#password").fill("secret_sauce");  //password
  // await page.locator("input.submit-button").click();  
  await page.locator("input[type='submit']").click(); //login button

  //3. text
  // text='value' //case sensitive
  // text=value //case insensitive

  // await page.locator("text='Sauce Labs Backpack'").click(); //case sensitive - PASS
  // await page.locator("text='Sauce LABS Backpack'").click(); //case sensitive - ❌ FAIL
  await page.locator("text=Sauce LABS Backpack").click(); //case insensitive - PASS

  //4. id | data-testid | data-test-id | data-test,..
  // await page.locator("id=add-to-cart").click(); //id, no need to use quotes after id= & it is case sensitive
  await page.locator("data-test=add-to-cart").click(); //data-test, no need to use quotes after data-testid= & it is also case sensitive
});


test("TS02-02: playwright locator method with options argument- has, hasNot, hasText, hasNotText", async ({ page }) => {

  await page.goto("https://www.saucedemo.com/");

  // await page.locator(".form_group", { has: page.locator("input#user-name") }).fill("standard_user"); 
  /***
  Error:
    Element is not an <input>, <textarea> or [contenteditable]

  fill() works only on:
    <input>
    <textarea>
    [contenteditable]
  
    https://chatgpt.com/s/t_6a219dc2ef0081918a3464518024def1
 */

  //find the div with class form_group which has the input field with id user-name and then type the value
  await page.locator(".form_group", { has: page.locator("input#user-name") }).click();
  await page.locator(".form_group", { has: page.locator("input#user-name") }).pressSequentially("standard_user"); 
  //Note:  pressSequentially() works only after clicking on the element, it will not work if we directly use it without clicking on the element first. 
  // It is used to type the value in the input field, it is used when we want to type the value in the input field which is not an input field but it is inside a div or any other element.

  //enter password using hasNot option - it will find the div with class form_group which does not have the input field with id user-name and then type the value
  await page.locator(".form_group", { hasNot: page.locator("input#user-name") }).click();
  await page.locator(".form_group", { hasNot: page.locator("input#user-name") }).pressSequentially("secret_sauce");

  //click on login button
  await page.locator("input.submit-button").click();

  //hasText option example - it will find the element with class inventory_item_name which has the text Sauce Labs Backpack and then click on it
  // await page.locator(".inventory_item_name", { hasText: "Sauce Labs Backpack" }).click();

  //hasNotText option example - using regular expression
  await page.locator(".inventory_item_name", { hasNotText: /Sauce.*/ }).first().click(); //click on the first element which does not have the text Sauce Labs Backpack
});


test("TS02-03: getBy Methods in Playwright - Detailed", async ({ page }) => {

  //Refer: https://playwright.dev/docs/api/class-page#page-get-by-label

  /***\
   * exact boolean (optional)
   * Whether to find an exact match: case-sensitive and whole-string. Default to false. 
   * Ignored when locating by a regular expression. 
   * Note that exact match still trims whitespace.
   */


  //getByLabel: for <label> or aria-label attribute or aria-labelledby attribute
  await page.goto("https://login.salesforce.com/?locale=in");
  await page.getByLabel("UserName").fill("test@example.com"); // ✅ PASS because case sensitive
  await page.getByLabel("username").fill("fullText"); // full label text username ✅ PASS
  await page.getByLabel("userna").fill("partialText1"); // partial label text username ✅ PASS
  await page.getByLabel("sernam").fill("partialText2"); // partial label text username ✅ PASS
  // await page.getByLabel("sernam", { exact: true }).fill("partialText3"); // ❌ FAIL because PARTIAL text is not allowed when exact option is set to true
  // await page.getByLabel("username", { exact: true }).fill("partialText3"); // ❌ FAIL because Label text is not same as the text we are passing in the getByLabel method when exact option is set to true
  await page.getByLabel("Username", { exact: true }).fill("partialText3"); // ✅ PASS because when exact option is set to true, it will ignore the case sensitivity and it will match the exact text.


  //getByAltText: for <img> and <area> tag with alt attribute
  const altText = await page.getByAltText("lesFORCE Log").getAttribute("alt"); // ✅ PASS because case insensitive
  console.log("Alt text: ", altText); // Alt text: Salesforce login


  await page.goto("https://naveenautomationlabs.com/opencart/");
  //getByTitle: for title attribute: naveenopencart
  const title = await page.getByTitle("NOPENcart").getAttribute("title"); // ✅ PASS because case insensitive
  console.log("Title attribute: ", title); // Title attribute:  naveenopencart

  
  await page.goto("https://www.saucedemo.com/");
  //getByPlaceholder: elements with placeholder attribute like <input> and <textarea>
  await page.getByPlaceholder("UserName").fill("fullText", { timeout: 5000 }); // ✅ PASS because case insensitive
  await page.getByPlaceholder("username").fill("input1"); // full placeholder text Enter your username ✅ PASS
  await page.getByPlaceholder("Username").fill("input2"); // full + exact placeholder text Enter your user ✅ PASS
  await page.getByPlaceholder("sername").fill("input3"); // partial placeholder text your username ✅ PASS


  //getByText: for non-interactive elements like div, span, p, h1, h2, h3, h4, h5, h6, etc.
  let text = await page.getByText("WAG Lab").textContent(); // ✅ PASS because case insensitive
  console.log("getByText: Text content: ", text); // Text content:  Swag Labs


  //getByRole: for ARIA roles and attributes
  //https://playwright.dev/docs/api/class-page#page-get-by-role
  text = await page.getByRole('heading', { name: 'ACCEPted userNAmes ' }).textContent(); // ✅ PASS because case insensitive : Search
  console.log("getByRole: h4 - Text content: ", text); // Text content:  Accepted usernames are:
  

  //getByTestId: for elements with data-testid attribute. 
  // /* NOTE: getByTestId() is strictly case-sensitive by default. It also requires an exact match of the entire string. */
  //https://playwright.dev/docs/api/class-page#page-get-by-role:~:text=Locator%23-,Details,-By%20default%2C%20the
  await page.getByTestId("username").fill("standard_user"); // ✅ PASS because case sensitive & Exact match
  // await page.getByTestId("Username").fill("case sensitive", { timeout: 5000 }); // ❌ FAIL because case sensitive
  // await page.getByTestId("user").fill("partial match", { timeout: 5000 }); // ❌ FAIL because partial match is not allowed in getByTestId method

});