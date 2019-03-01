# Alexa Skill Template
A basic template for building an Alexa skill with deployment &amp; backup scripts


## Setup
1. Create a new Alexa skill using the [Alexa Developer Console](https://developer.amazon.com/alexa/console/ask).
2. Create a new [Lambda function](https://docs.aws.amazon.com/lambda/latest/dg/getting-started-create-function.html).
3. Configure the new Lambda function to accept your newly created Alexa skill.
4. Set the new Lambda function as the default "endpoint" value for your newly created Alexa skill.
5. Create a new IAM user in AWS to be used for deployment.
6. Run the following command to install the ASK CLI globally
    ```
    npm install -g ask-cli
    ```
7. Run the following command to authenticate the ASK CLI with the user created at step 5. Make note of the profile name that you use for the first step of ask init.
    ```
    ask init
    ```
8. Open /.ask/config and set [your_ask_profile] to the profile created in the previous step. Also replace [skill_id] and [lambda_function] within this file.
9. If your user account for AWS uses MFA, run the following command to generate a token. You will need to have added MFA_SERIAL to your .env file.
    ```
    source ./scripts/updateAWSCredentials.sh [your_mfa_code]
    ```
    > Each time you open a new terminal session, you will need to re-run this command. 
10. Set all the environment variables that are mentioned in ./env.example
11. Run the following command to get the skill manifest details from your newly created Alexa skill.
    ```
    npm run get:skill
    ```
12. Run the following command to finish.
    ```
    npm run deploy:all
    ```
## Scripts

### get:model
Replaces the existing content within ./models/ with the interaction models saved on the cloud.

### get:lambda
Creates a backup of the existing lambda function functionality and saves it in the backup folder. The local version of lambda is replaces with the latest version of lambda from the cloud.

## get:skill
Retrieves the latest skill manifest from the cloud. A backup of the local version will be taken beforehand.

## get:all
Runs get:skill, get:model and get:lambda together.

### deploy:skill
Deploys the local version of skill.json to the cloud. A backup of the cloud version is taken beforehand.

### deploy:model
Deploys the local version of ./models/ to the cloud. A backup of the cloud version is taken beforehand.

### deploy:lambda
Deploys the local version of lambda to the cloud. A backup of the cloud version is taken beforehand.

### deploy:all
Runs deploy:skill, deploy:model and deploy:lambda together.
