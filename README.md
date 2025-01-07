# Zero Waste Project

First verion. Use Google Spreadsheets and Apps Script to help us not to let things expire.

## Setup local development environment

1. Install node:
   
   Please reference https://nodejs.org/en/download
2. Install clasp:
   ```bash
   npm install @google/clasp -g
   ```
3. Clone this repo and change the working directory
   ```
   git clone git@github.com:edwardshao/zero-waste.git
   cd zero-waste
   ```
4. Use `clasp` to login Google Apps Script:
   ```
   clasp login
   ```
5. Use `clasp` to create your own Google Apps Script project for development:
   ```
   clasp create zero-waste
   ```
6. Use `clasp` to push all files:
   ```
   clasp push -f
   ```
7. Go to `https://script.google.com/home`. You should find your project and start your development locally.

## Deployment

The project automatically deploys to Google Apps Script when:
- Pushing to the main branch
- Manually triggering the workflow

## License

MIT