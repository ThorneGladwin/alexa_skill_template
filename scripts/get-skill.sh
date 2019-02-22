#!/bin/bash
set -o pipefail

# get environment variables from .env
[ -f .env ] && source .env

localOrCloud="local"
target="skill"

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
echo "Get definition for skill: $SKILL_ID"

# Create backup folder
source $PWD/scripts/backup-helper.sh
localBackupFolder=$(createBackupFolder $localOrCloud $target)
echo "Backup folder created on $localOrCloud for $target: $cloudBackupFolder"

cp -R skill.json "$localBackupFolder"
echo "If there are any problems, please check the backup folder: $localBackupFolder"

# get skill
echo "Updating skill: $PWD/skill.json"
ask api get-skill -p $SKILL_PROFILE -s $SKILL_ID > "$PWD/skill.json"

echo "Done!"