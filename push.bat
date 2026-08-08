@echo off
echo ========================================================
echo Initializing Git and Pushing to GitHub
echo ========================================================

:: Initialize repository
git init

:: Add all files
git add .

:: Commit files
git commit -m "Initial commit: Premium interactive developer portfolio template"

:: Set branch name
git branch -M main

:: Add remote origin (handle case if it already exists)
git remote remove origin 2>nul
git remote add origin https://github.com/dynovolt/Portfolio-Template.git

:: Push to remote
echo.
echo Pushing to GitHub...
echo.
git push -u origin main

echo ========================================================
echo Finished!
echo ========================================================
pause
