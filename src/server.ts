import app from "./app";
import "./queues/reminder.worker"; 

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Notification service is running on ${PORT}`);
});
