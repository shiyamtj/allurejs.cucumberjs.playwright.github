@smoke
Feature: Sauce Demo Site login

  Scenario: Login with valid credentials
    Given I navigate to "https://www.saucedemo.com/"
    Then I should see locator "[data-test=\"username\"]" tobeVisible
    And I should see locator "[data-test=\"password\"]" tobeVisible
    And I should see locator "[data-test=\"login-button\"]" tobeVisible
    When I fill "standard_user" locator with "[data-test=\"username\"]"
    Then I should see locator "[data-test=\"username\"]" toHaveValue as "standard_user"
    When I fill "secret_sauce" locator with "[data-test=\"password\"]"
    And I click locator "[data-test=\"login-button\"]"
    Then I should see button role element with text "Open Menu" tobeVisible
    When I click button role element with text "Open Menu"
    Then I should see button role element with text "Close Menu" tobeVisible
    Then I should see locator "[data-test=\"logout-sidebar-link\"]" tobeVisible
    When I click locator "[data-test=\"logout-sidebar-link\"]"
    Then I should see locator "[data-test=\"login-button\"]" tobeVisible