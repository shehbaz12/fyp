# How to Push Your Code to GitHub

It seems `git` is not installed or configured in your current terminal environment. I couldn't automatically push the code for you.

Please verify you have [Git installed](https://git-scm.com/downloads) and follow these steps manually in a terminal where git is accessible (like Git Bash or Command Prompt with Git).

## 1. Initialize and Push

Open a terminal in `d:\Fyp\Frontend` and run:

```bash
# Initialize git repository
git init

# Add all files (Frontend + Backend)
git add .

# Commit changes
git commit -m "Complete authentication system implementation"

# Rename branch to main (optional but recommended)
git branch -M main

# Add your remote repository
git remote add origin https://github.com/shehbaz12/fyp.git

# Push code
git push -u origin main
```

## 2. If 'origin' Already Exists
If you get an error that `origin` already exists, use this instead:
```bash
git remote set-url origin https://github.com/shehbaz12/fyp.git
git push -u origin main
```

## 3. Force Push (Careful!)
If you want to overwrite everything on the remote repo:
```bash
git push -f origin main
```
