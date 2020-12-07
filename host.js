//Host
if (process.env.NODE_ENV !== "dev") {
  const express = require('express');
  const server = express();

  server.all('/', (req, res)=>{
    var today = new Date();
    var time = (today.getMonth() + 1) + "/" + (today.getDay() - 1) + "/" + today.getFullYear() + " - " + (today.getHours() + 1) + ":" + today.getMinutes() + ":" + today.getSeconds();

    res.send('Your bot is alive! ' + time);
    console.log('Your bot is alive! ' + time);
  })

  server.listen(3000, ()=>{console.log("Server is Ready!")});
}
