# $avvier ([App](https://savvier.netflify.app/))

I created $avvier to make my own personal budgeting and finance easier. I got sick of loading data into a spreadsheet and haven't found any of the budgeting tools out there to be customizable enough and repeatedly ask me to reconnect my accounts.

![App screenshot](https://github.com/callumnelson/savvier-front-end/blob/main/src/assets/images/screenshot.png)

## How it works 📗

$avvier create their own categories and subcategories for budgeting and track their progress against budgeting goals with a high degree of granularity. When users sign up for $avvier, they will automatically be provided two demo accounts and a year's worth of fake data. This enables users to explore the site without having to load their own data. They are also given a default categorization schema that they can build on and fully customize. Once they are ready, users can begin to upload their own data, which is as easy as downloading a csv of transactions from one of their accounts and uploading it to $avvier.

## Getting started 🏁

Once they are signed up, users can:
- Adjust the Categories and Subcategories to create their desired schema
- Create accounts and delete the demo accounts
- Upload a csv of transactions from their banks
- Analyze their spending and savings trends through the dashboard

## Technologies used 💾

* PERN Stack in Typescript
  * PostgreSQL
  * Express
  * React
  * Node
* Recharts.js
* JWT authorization and authentication
* Supabase
* Cloudinary
* Fly.io
* Netlify
* Git
* Github

## Attributions 🤩

* (Currency.js)[https://currency.js.org/] provides easy parsing of financial data
* (Recharts.js)[https://recharts.org/en-US] is an incredibly powerful and easy to use package for building beautiful charts within React

## Ice Box Features ⏭️

- [x] Implement custom category and subcategory schema
- [x] Build out responsive dashboard with charts from Recharts.js
- [] Create a budgeting & planning section to allow users to set goals and track progress towards them
- [] Implement a mobile-friendly version of the app
- [] Implement state management through Redux