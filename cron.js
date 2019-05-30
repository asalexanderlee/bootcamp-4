const CronJob = require("cron").CronJob;
const NodeMailer = require("nodemailer");
const env = require("dotenv").config();

async function sendEmail(numCompleted, outstandingTasks, username) {
  // create reusable transporter object using the default SMTP transport
  let transporter = NodeMailer.createTransport({
    host: "smtp.davidson.edu",
    port: 25,
    secure: false
  });
  // verify connection configuration
  transporter.verify(function(error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });
  // send mail with defined transport object
  return await transporter.sendMail({
    from: '"Test Account 😎" <asalexanderlee@davidson.edu>', // sender address
    to: "asalexanderlee@davidson.edu", // list of receivers
    subject: "Hello ✔", // Subject line
    html: "<b>Hello world?</b>" // html body
  });
}

async function sendUpdateEmails() {
  //get all users
  // try {
  //   const users = await User.find({});
  //   users.forEach(user => {
  //     const numCompleteTasks =
  //   })
  // } catch (err) {
  //   console.log(err);
  // }

  //for each user:
  console.log("Sending update email...");
  //get all tasks
  //find num completed
  //find outstanding tasks
  sendEmail()
    .then(info => console.log(`Message sent: ${info.messageId}`))
    .catch(err => console.error);
}

const job = new CronJob({
  cronTime: "00 06 16 * * *" /* Run job every day at 3:59 am */,
  onTick: sendUpdateEmails /* Function to run */,
  start: true /* Run the job right now */,
  timeZone: "America/New_York" /* Time zone of this job. */
});
