const CronJob = require("cron").CronJob;
const NodeMailer = require("nodemailer");
const User = require("mongoose").model("User");
const Todo = require("mongoose").model("Todo");
const env = require("dotenv").config();

async function sendUpdateEmail(username, userEmail, completeTasks, outstandingTasks, transporter) {
  //create a list of tasks to pass in to our message
  const tasks = outstandingTasks.reduce((acc, task) => acc + `<li>${task.description}</li>`, "");

  // send mail with defined transport object
  return await transporter.sendMail({
    from: '"Test Account 😎" <asalexanderlee@davidson.edu>', // sender address
    to: userEmail, // receiver
    subject: "Daily Task Update", // Subject line
    html: `<p>Hello, ${username},</p></br><p>This week you have completed ${
      completeTasks.length
    } task(s). Great job! You still have ${outstandingTasks.length} to go. They are: </br><ol>${tasks}</ol>` // html body
  });
}

function setUpMailer() {
  // create reusable transporter object using the default SMTP transport
  let transporter = NodeMailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false
  });
  // verify connection configuration
  transporter.verify(
    (err, success) => (err ? console.error(err) : console.log("Server is ready to take our messages"))
  );
  return transporter;
}

async function sendUserUpdates() {
  //create the transporter object
  const transporter = setUpMailer();
  //get all users
  const users = await User.find({}).catch(err => console.error("Could not read users from db"));
  //for each user, find complete/incomplete tasks and send update email
  users.forEach(async user => {
    const completeTasks = await Todo.find({ userId: user._id, completedOn: { $ne: null } });
    const outstandingTasks = await Todo.find({ userId: user._id, completedOn: null });

    try {
      const info = await sendUpdateEmail(user.username, user.email, completeTasks, outstandingTasks, transporter);
      console.log(`Message sent: ${info.messageId}`);
    } catch (err) {
      console.error(`Failed to send update to user: ${user.username}`);
    }
  });
}

const job = new CronJob({
  cronTime: "00 00 10 * * *" /* Run job every day at 3:59 am */,
  onTick: sendUserUpdates /* Function to run */,
  start: true /* Run the job right now */,
  timeZone: "America/New_York" /* Time zone of this job. */
});
