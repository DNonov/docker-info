const express = require("express");
const redis   = require("redis");
const app     = express();
const client  = redis.createClient({
  // Docker related option to connect the containers
  host: 'redis-server',
  port: 6379
});

client.set('visits', 0);

app.get("/", (req, res) => {
  client.get("visits", (err, visits) => {
    res.send("Number of visits is " + visits);
    client.set('visits', parseInt(visits) + 1);
  });
});

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
