# Steps followed to setup Okta Integration

### Account creation in Okta developer portal

* Created developer account in https://developer.okta.com


### Okta Application setup

* Created Application in okta admin panel under 

        Applications => Add Application

        Platform: Web
        Settings: Added redirect url, enabled Authorization Code checkbox and Implicity checkbox


* Updating User Profile Attributes to have tow more attributes for xxxxxxxx company, role

        Users => Profile Editor

        Added role attribute in Application which created earlier and mapped it to okta base attribute


* Created two groups Admin and Users

        Users => Groups => Add Group

        created two groups Admin and Users

* Add Users

        Users => People => Add Person

        Provided user details like firstName, lastName, email and Role attribute which is mapped earlier as (admin or user)

        We have another Groups attribute while creating new user which can be assigned to either one of the groupls Admin or Users which created earlier

        Password attribute can be set by admin or Set by User from activation link sent to User via Email.


* Assign User to Application

        Applications => <xxxxxxxx Dev Web> (Specific Application created earlier)

        Navigate to Assignments tab under specific applciation

        Assign => Assign to People 

        Select user to assign application


Now we have application and users assigned to it.


### Web setup

        Collect clientID and domain information for application to integrate into UI follow the steps mentioned in  https://developer.okta.com/code/javascript


### NodeJS setup

        we are using two npm modules to communicate Okta services @okta/jwt-verifier and @okta/okta-sdk-nodejs

        we need ApiToken to access Okta API which can be available under 

        API => Authorization Servers => Tokens => Create Token

### Development approach for validating okta user

    * UI Landing page => Okta Login => Callback to UI Application with access token

    * UI sends  /my-preferences request to xxxxxxxx API along with access token in Headers

    * xxxxxxxx API parses token and verify with Okta if token is valid system sends request to Okta API for user information and stores in DB.

    * xxxxxxxx API sends user preference and user profile(okta profile) in response to UI.