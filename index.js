#!/usr/bin/env node

const
  { init, subscribe } = require("@karmared/kafka-transport"),
  logger = topic => data => console.log(`\x1b[36m${topic}:\x1b[0m ${JSON.stringify(data)}`);

start()

async function start() {
  let
    host = process.argv.includes("--host")
      ? process.argv[process.argv.indexOf("--host") + 1]
      : "localhost:9092",
    topics = process.argv.includes("--topics")
      ? process.argv[process.argv.indexOf("--topics") + 1].split(",")
      : ["test"]

  init({connectionString: host})
  topics.forEach(
    topic => subscribe(topic, logger(topic))
  )
}
