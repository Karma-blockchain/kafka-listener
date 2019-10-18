#!/usr/bin/env node


const
  repl = require('repl'),
  uuid = require('uuid/v4'),
  chalk = require('chalk'),
  { init, push, fetch, subscribe } = require("@karmared/kafka-transport"),
  logger = topic => data => console.log(`${chalk.cyan(topic)}: ${JSON.stringify(data)}`);


function initializeContext(context) {
  let
    topic,
    host = process.argv.includes("--host")
      ? process.argv[process.argv.indexOf("--host") + 1]
      : "localhost:9092";

  init({ connectionString: host })

  //context.init = init
  context.push = (...args) => { push(...args) }
  context.fetch = fetch
  context.subscribe = (...args) => { subscribe(...args) }

  context.topic = _topic => {
    topic = _topic
    r.setPrompt(`${chalk.green(topic)}> `)
  }

  context.send = (data, key) => {
    push(topic, data, key ? key : uuid())
  }

  context.action = (action, data) => {
    context.send({ action, data })
  }

  if (process.argv.includes("--topics"))
    start()
}


const r = repl.start({ prompt: '> ' });
initializeContext(r.context);


r.on('reset', initializeContext);


async function start() {
  let
    topics = process.argv.includes("--topics")
      ? process.argv[process.argv.indexOf("--topics") + 1].split(",")
      : ["test"]

  topics.forEach(
    topic => subscribe(topic, logger(topic))
  )
}
