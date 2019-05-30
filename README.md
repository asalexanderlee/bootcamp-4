# bootcamp-4

Morning folks! This morning we are going to learn how to send emails, setup cron jobs, and secure our API. Then, we'll do a warm up exercise to prime us for React and Redux.

Before you start, copy all your valid code from Bootcamp-3 into this repo.

Friendly note: As you're getting more comfortable with Javascript and Express, your instructions will be come less and less specific. Lean in!

## Breakouts

* Morning: Environmental Variables & Advanced Express
* Afternoon: Introduction to React

### Release 0

It's time we have "the talk." The talk about security, that is. If your website (or your code) is anywhere online (including GitHub) you are vulnerable to attack! AH! There are a lot of ways that attackers can make your life miserable. Some will scrape GitHub for passwords or SSH keys that were accidentally committed. With this information they cause take ahold of your servers and mine for BitCoin (and incurring $1000s of costs to you). Or, if you're not careful writing your code, hackers can inject all sorts of malicious code into your site. Or, even if you do everything right, a hacker can find a vulnerability in a package you are using and exploit you and everyone else using the package. With every line of code you write, you have to keep security in mind. Here are some best practices:

* NEVER EVER write passwords, api keys, or anything secret into your code. Instead, use [environmental variables](https://medium.com/the-node-js-collection/making-your-node-js-work-everywhere-with-environment-variables-2da8cdf6e786). The package `dotenv` is a great place to start.
* Install and enable `helmet`. It adds some basic security to Express.
* Keep system logs (see [morgan](https://www.npmjs.com/package/morgan)) so you can track for suspicious activity.
* Always use ODMs like Mongoose to validate user data.
* Always sanitize params and form data. Use `express-sanitizer`.
* Always set your NODE_ENV environmental variable to `production` when in a production environment (we will talk about the differences between your development and production environments later).

While there are many other ways to protect your app, we'll start by implementing the above list. In the future, we will also learn how to keep a site secure by using TLS. But you don't have to worry about that now.

---

### Release 1

_STOP:_ Before you start on release 1, commit you code and push it up to GitHub, then checkout a new branch called `[yourusername]-release1`. Release 1 is just for practice and learning. We won't want to keep any of the changes.

Since we are thinking about security, let's add an authorization layer to our API. In the future our web apps are going to use a package called Passport to handle user logins and registration, but before we get there, we need to understand the fundamentals.

* Create a route that allows a new user to register an account. For this (very contrived) example, a user can register by posting a unique username, password, and email to the server. Upon post of the account, the server should return a unique key (hint: guid/uuid) that's associated with the account.
* The user should pass this unique key in as a header with every request to the server.
* If a user tries to interact with the API without a valid key in the header, the API should return a 403 (forbidden) status code.
* Once you enable auth, add a field in your Todo called `userId` and associate it with the `_id` of the user.

_NOTE: You should never ever send passwords to a server without an HTTPS connection. And you should never store raw passwords in your database. But for the sake of learning, we are violating both of those rules and doing it anyways~~~~_

### Release 2

_STOP:_ Before you start on release 2, checkout a new branch called `[yourusername]-release2` from the branch you were working on in release 0. Release 2 is just for practice and learning. We won't want to keep any of the changes.

You are almost ready to start working with React and Redux on the front end. But before you do, it'll be helpful for you to know how industry _used_ to develop the frontend of applications.

In days of lore, if a client requested a page (let's say a homepage) Express would send the entire HTML doc over in response.

```javascript
app.get("/" (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en-US">
    <head>
    <title>Website</title>
    </head>
    <style>
      body {
        background-color: black;
        color: white;
      }
    </style>
    <body>
      <p>I'm a website! Click <span id="alert">here</span> for an alert!</p>
    </body>
    <script>
    document.getElementById("alert").onclick = () => alert("Hey, queen.");
    </script>
    </html>
  `)
})
```

Writing HTML in your routes becomes a little burdensome, so in days of lore, developers often turned to rendering engines like Handlebars, Jade, or EJS.

Your task is to integrate [EJS](http://ejs.co/) into Express and then use it to render an HTML webpage that allows users to add or remove items from their todo list.

**Several Tips:**
- be sure to set your render engine AND tell your server where to get static files (i.e. css, pictures) in your server.js
- write a `GET /` route in index.js that will render your views. The only difference between this route and the routes that you've written before is that this `GET /` route will serve up a view instead of info from your db
- HINT: use `res.render()` within your `GET /` 

### Release 3

_STOP:_ Commit and push your scratch branch to github and checkout the branch you were working on in `release 1`.

* Emails! Let's use [NodeMailer](https://nodemailer.com/about/) to send emails to our users. Setup a [cronjob](https://github.com/kelektiv/node-cron) that sends the following email to all of its users everyday at 10:00am.

```javascript
`Hello, ${username},

This week you have completed ${x} tasks. Great job! You still have ${x} tasks to go. They are:

1. Task 1.
2. Task 2.
3. Task 3.
...
n. Task n.`;
```

* To send emails you'll have to connect NodeMailer with a valid SMTP mail server. Luckily Davidson runs SMTP mail servers, which means you can use your Davidson email and password to send and receive emails from your server. Just make sure you save your username and password in a secure .env file. DO NOT expose your password in your code.

Hint: It's not required, but it may be helpful to use EJS for this task!

### Release 4

Do a little dance! You've completed Part 1 of the bootcamp! Now it's time to start developing the frontend!
