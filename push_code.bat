@echo off
echo ==========================================
echo      DMS Project - Push to GitHub
echo ==========================================

set GIT_CMD="C:\Program Files\Git\cmd\git.exe"

echo [1/6] Treating nested git repositories...
if exist "dms-landing\.git" (
    echo Removing nested .git directory in dms-landing to merge history...
    rmdir /s /q "dms-landing\.git"
)

echo [2/6] Initializing Git...
%GIT_CMD% init
%GIT_CMD% config user.name "DMS Developer"
%GIT_CMD% config user.email "developer@dms.local"

echo [3/6] Fixing potential submodule issues...
%GIT_CMD% rm --cached dms-landing 2>nul
%GIT_CMD% add .

echo [4/6] Committing changes...
%GIT_CMD% commit -m "Fix: Upload actual frontend files instead of submodule"

echo [5/6] Setting branch to main...
%GIT_CMD% branch -M main

echo [6/6] Adding remote...
%GIT_CMD% remote remove origin 2>nul
%GIT_CMD% remote add origin https://github.com/shehbaz12/fyp.git

echo [7/7] Pushing to GitHub...
%GIT_CMD% push -u origin main

echo.
echo ==========================================
echo Done!
echo ==========================================
pause
