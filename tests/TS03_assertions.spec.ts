import { expect, test } from "@playwright/test";

test("TS03-01: playwright assertions", async ({ page }) => {

  await page.goto("https://www.saucedemo.com/");

  //1. toHaveCount: to verify the count of elements on the page
  await expect(page.locator("data-test=login-button")).toHaveCount(1); //assertion to verify that there is only one login button on the page

  //2. toBeEnabled: to verify that the element is enabled on the page
  await expect(page.locator("data-test=login-button")).toBeEnabled(); //assertion to verify that the login button is enabled on the page

  //3. toBeDisabled: to verify that the element is disabled on the page
  // +
  // Negative Matchers: not
  await expect(page.locator("data-test=login-button")).not.toBeDisabled(); //assertion to verify that the login button is not disabled on the page
  // +
  // soft assertions: it will not fail the test if the assertion fails, it will just log the failure in the test report
  // await expect.soft(page.locator("data-test=login-button")).toBeDisabled(); //assertion to verify that the login button is disabled on the page, it will not fail the test if the assertion fails, it will just log the failure in the test report
  
  //4. toBeVisible: to verify that the element is visible on the page
  await expect(page.locator("data-test=login-button")).toBeVisible(); //assertion to verify that the login button is visible on the page

  //5. tobeHidden: to verify that the element is hidden on the page
  await expect(page.locator("data-test=login-button")).not.toBeHidden(); //assertion to verify that the login button is not hidden on the page
  //soft assertion
  // await expect.soft(page.locator("data-test=login-button")).toBeHidden();

  //6. toHaveText: to verify that the element has the expected text
  await expect(page.locator("data-test=login-button")).toHaveText("Login"); //assertion to verify that the login button has the text Login
  await expect(page.locator("data-test=login-button")).toHaveText("login", { ignoreCase: true }); //assertion to verify that the login button has the text Login, case insensitive

  //7. toHaveAttribute: to verify that the element has the expected attribute and value
  await expect(page.locator("data-test=login-button")).toHaveAttribute("type", "submit"); //assertion to verify that the login button has the attribute type with value submit

  //8. toHaveId: to verify that the element has the expected id
  await expect(page.locator("data-test=login-button")).toHaveId("login-button"); //assertion to verify that the login button has the id login-button

  //9. toHaveClass: to verify that the element has the expected class
  await expect(page.locator("data-test=login-button")).toHaveClass(/submit-button/); //assertion to verify that the login button has the class submit-button, using regex

  //10. toHaveURL: to verify that the page has the expected URL
  await expect(page).toHaveURL("https://www.saucedemo.com/"); //assertion to verify that the page has the URL https://www.saucedemo.com/

  //11. toHaveTitle: to verify that the page has the expected title
  await expect(page).toHaveTitle("Swag Labs"); //assertion to verify that the page has the title Swag Labs

  //12. toHaveValue: to verify that the element has the expected value
  await page.locator("input#user-name").fill("standard_user");
  await expect(page.locator("input#user-name")).toHaveValue("standard_user"); //assertion to verify that the input field with id user-name has the value standard_user

  //custom error message
  // await expect(page, "This is a custom error message for the page title assertion").toHaveTitle("Google"); //commenting to avoid test failure, it will fail because the expected title is Google but the actual title is Swag Labs

});
