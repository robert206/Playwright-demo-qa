Feature: Homepage Functionality

    Scenario: Verify Product Web Testing
        Given User clicks on the "Elements" link
        Then "Checkbox" page link should be visible
        Given user clicks on the "CheckBox" link
        Then "Checkbox" page title should be visible
        When user clicks on "expand all" checkbox
        And there is "17" folders
        Then "0" folder is "Home"
        And "5" folder is "Workspace"
