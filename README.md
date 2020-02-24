# Alexa Skill Template
A basic template for building an Alexa skill with deployment &amp; backup scripts

## Setup
### AWS
1. Create a new Alexa skill using the [Alexa Developer Console](https://developer.amazon.com/alexa/console/ask).
    > Select the 'Custom' and 'Provision your own' and 'Start from Scratch' options when running through the setup.
2. Create a new Policy and IAM role for your Lambda to execute as.
    > Create a new policy under the AWS IAM console. Select 'Lambda' as the Serivce and then select 'Read' and 'Write' as the Access level.
    > Create a new role in the AWS IAM console with a use case of 'Lambda'.
    > Under 'permissions' attach your new policy.
2. Create a new [Lambda function](https://docs.aws.amazon.com/lambda/latest/dg/getting-started-create-function.html).
    > Under the permissions section, select 'Use an existing role' and select your newly created IAM role.
3. Configure the new Lambda function to accept your newly created Alexa skill.
    > Within the AWS console, open the Lambda function and click to 'add trigger'. From the dropdown list, select 'Alexa Skills Kit' and enter the arn address of your newly created Alexa skill.
    > The arn address of your Alexa skill can be found under 'Endpoint' within the 'Build' tab of the [Alexa Developer Console](https://developer.amazon.com/alexa/console/ask).
4. Set the new Lambda function as the default "endpoint" value for your newly created Alexa skill.
    > This is set under 'Endpoint' within the 'Build' tab of the [Alexa Developer Console](https://developer.amazon.com/alexa/console/ask).
    > The ARN of your Lambda function can be found in the top right corner when you select the Lambda function in the AWS console.
5. Create a new IAM user.
    > In the AWS IAM console, create a new user with 'Access type' set to 'Programmatic access'.
    > Under permissions, select 'Attach existing policies directly' and select the policy that you created in step 2.
    > Make note of the Access key ID and Secret access key generated.
### Local
1. Run the following command to install the ASK CLI on your machine.
    ```
    npm install -g ask-cli
    ```
2. Run the following command to authenticate the ASK CLI with your Alexa Developer Console user and newly created IAM user.
    ```
    ask init
    ```
    > Make sure you set the profile name as 'default'.
    > Select 'Y' when asked to associate an AWS profile and enter the Access key ID and Secret access key of your newly created IAM user.
3. Open `/.ask/config` and replace [skill_id] within this file.
4. Copy ./env.example to a new file called .env and update the variables.
5. Run the following command to get the skill manifest details from your newly created Alexa skill.
    ```
    npm run get:skill
    ```
6. Run the following command to finish.
    ```
    npm run deploy:all
    ```
## Scripts

#### get:model
Replaces the existing content within ./models/ with the interaction models saved on the cloud.

#### get:lambda
Creates a backup of the existing lambda function functionality and saves it in the backup folder. The local version of lambda is replaces with the latest version of lambda from the cloud.

#### get:skill
Retrieves the latest skill manifest from the cloud. A backup of the local version will be taken beforehand.

#### get:all
Runs get:skill, get:model and get:lambda together.

#### deploy:skill
Deploys the local version of skill.json to the cloud. A backup of the cloud version is taken beforehand.

#### deploy:model
Deploys the local version of ./models/ to the cloud. A backup of the cloud version is taken beforehand.

#### deploy:lambda
Deploys the local version of lambda to the cloud. A backup of the cloud version is taken beforehand.

#### deploy:all
Runs deploy:skill, deploy:model and deploy:lambda together.
