@REM Execute in Windows using: .\EXFiles\scripts\CreateOrg.bat
@echo off
echo "*** Creating scratch Org..."
call sfdx force:org:create -f config/project-scratch-def.json --setdefaultusername --setalias soDEX602 -d 30
@REM echo "*** Opening scratch Org..."
@REM call sfdx force:org:open
@REM echo "*** Pushing metadata to scratch Org..."
@REM call sfdx force:source:push
@REM echo "*** Assigning permission set to your user..."
@REM call sfdx force:user:permset:assign --permsetname Certification
@REM echo "*** Creating required users..."
@REM call sfdx force:apex:execute -f EXFiles/data/CreateUsers.txt
@REM echo "*** Creating data"
@REM @REM call sfdx ETCopyData:import -c EXFiles/data --loglevel warn
@REM call sfdx force:apex:execute -f EXFiles/data/DeleteAndLoadData.txt
