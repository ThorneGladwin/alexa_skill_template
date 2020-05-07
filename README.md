# Alexa Skill Template
A simple template that can be used help create new Alexa skills.

## Prerequisites 
- You will need to have installed:
    - The latest version of [Node.js](https://nodejs.org).
    - The latest version of the [ask-cli](https://developer.amazon.com/en-GB/docs/alexa/smapi/quick-start-alexa-skills-kit-command-line-interface.html).
    ```bash
    npm install -g ask-cli
    ```
- To have created a fresh new Alexa skill using the [Alexa Developer Console](https://developer.amazon.com/alexa/console/ask).
    > Select the 'Custom' and 'Provision your own' and 'Start from Scratch' options when running through the setup.
- To have created a new IAM Policy with the following permissions:
    - Lambda
        - GetFunction
        - UpdateFunctionCode
        - UpdateFunctionConfiguration
    - IAM
        - GetRole 
    > Create a new policy under the AWS IAM console, using the 'Visual editor'.
- To have created an IAM role that inherits your newly created IAM Policy.
    > Create a new role in the AWS IAM console with a use case of 'Lambda'.
    > Under 'permissions' attach your new policy.
- To have created a new [Lambda function](https://docs.aws.amazon.com/lambda/latest/dg/getting-started-create-function.html).
    > Under the permissions section, select 'Use an existing role' and select your newly created IAM role.
- To have created an IAM user to execute deployments.
    > In the AWS IAM console, create a new user with 'Access type' set to 'Programmatic access'.
    > Under permissions, select 'Attach existing policies directly' and select the policy that you created above.
    > Make note of the Access key ID and Secret access key generated.

## Setup
1. Configure the new Lambda function to accept your newly created Alexa skill.
    > Within the AWS console, open the Lambda function and click to 'add trigger'. From the dropdown list, select 'Alexa Skills Kit' and enter the Skill ID of your newly created Alexa skill.
    > The Skill ID of your Alexa skill can be found under 'Endpoint' within the 'Build' tab of the [Alexa Developer Console](https://developer.amazon.com/alexa/console/ask).
2. Set the new Lambda function as the default region under "Endpoint" for your newly created Alexa skill.
    > This is set under 'Endpoint' within the 'Build' tab of the [Alexa Developer Console](https://developer.amazon.com/alexa/console/ask).
    > The ARN of your Lambda function can be found in the top right corner when you select the Lambda function in the AWS console.
3. Update the variables for [skillId], [iamRole] and [lambda.arn] under `.ask/ask-states.json` locally.
4. Update the variables for [endpoint.uri] and [locale.name] under `skill-package/skill.json` locally.
3. Run the following command to authenticate the ASK CLI with your Alexa Developer Console user and newly created IAM user.
    ```bash
    ask init
    ```
    > Make sure you set the profile name as 'default'.
    > Select 'Y' when asked to associate an AWS profile and enter the Access key ID and Secret access key of your newly created IAM user.
4. Run the following command to finish.
    ```bash
    ask deploy
    ```

## Tests
Run the following commands at the root of the project to run your unit tests.
```bash
npm install
npm run test
```