#!/bin/bash
set -o pipefail

# get environment variables from .env
[ -f .env ] && source .env

localOrCloud="local"
target="accountlinking"

# check we have the profile
if [ -z $SKILL_PROFILE ]; then 
    echo "Please add SKILL_PROFILE env file in your .env."
    exit 1
fi

# check we have the skill id
if [ -z $SKILL_ID ]; then 
    echo "Please add SKILL_ID env file in your .env."
    exit 1
fi
echo "Current skill ID: $SKILL_ID"

# Create backup folder
source $PWD/scripts/backup-helper.sh
cloudBackupFolder=$(createBackupFolder $localOrCloud $target)
echo "Backup folder created on $localOrCloud for $target: $cloudBackupFolder"

# Get account linking information (for backup)
echo "Get account linking information from the cloud  $language: $cloudBackupFolder/accountlinking.json"
ask api get-account-linking -p $SKILL_PROFILE -s $SKILL_ID -g $SKILL_ENV > "$cloudBackupFolder/accountlinking.json"
echo "Account linking information saved!"

# Deploy the new account linking connection
echo "Deploying account linkking"
echo "You will be prompted to introduce the values manually due to the sensitive nature."
# ask api create-account-linking -p $SKILL_PROFILE -s $SKILL_ID -g $SKILL_ENV --file <filepath>

echo "Done!"
