# kafka-listener
Package for listen topics in kafka

## How to install

```
$ git clone git@github.com:Karma-blockchain/kafka-listener.git
$ yarn
```

## How to use

```
$ ./index.js --topics <topic-one>,<topic-two> --host <host:port>
```

For default `host` equal `localhost:9092`.

For default `topics` equal `test`

### How to send

For send message use `push` function in REPL-mode:
```
$ ./index.js
> push(<topic>, <message>, <key>)
```

If you want set `<topic>` for default, use:

```js
> topic(<topic>)
> send(<message>, <key>)
> send(<message>) //generate <key> how random uuid
```