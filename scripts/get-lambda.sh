#!/bin/bash
set -o pipefail

# get environment variables from .env
[ -f .env ] && source .env

localOrCloud="local"

# check we have the skill id
if [ -z $SKILL_LAMBDA_FUNCTION ]; then 
    echo "Please add SKILL_LAMBDA_FUNCTION env file in your .env."
    exit 1
fi
echo "Get lambda funtion: $SKILL_LAMBDA_FUNCTION"

# check we have lambda code folder
if [ -z $SKILL_LAMBDA_FOLDER ]; then
    echo "No lambda code folder provided on .env. Default is lambda/custom"
    codeFolder="$PWD/lambda/custom"
else
    codeFolder="$PWD/$SKILL_LAMBDA_FOLDER"
fi
echo "Lambda code folder: $codeFolder"

if [ ! -d $codeFolder ]; then
    echo "$codeFolder doesn't exists. Creating it..."
    mkdir -p $codeFolder;
fi

# Create backup folder
source $PWD/scripts/backup-helper.sh
localBackupFolder=$(createBackupFolder $localOrCloud $SKILL_LAMBDA_FOLDER)
echo "Backup folder created on $localOrCloud for $SKILL_LAMBDA_FOLDER: $cloudBackupFolder"

cp -R "$codeFolder/." "$localBackupFolder"
echo "If there are any problems, please check the backup folder: $localBackupFolder"

ask lambda download --function $SKILL_LAMBDA_FUNCTION --dest $localBackupFolder

echo "Done!"


