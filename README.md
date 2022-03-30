

# unoserver-api

Unoserver as a webservice

## Docker

Build image

```bash
$ docker build -t unoserver .
```

Run image

```bash
$ docker run -d -p 80:3000 --name unoserver unoserver
```

## Usage

Post the file you want to convert to the server and get the converted file in return.

See all possible conversions on the [unoserver website](https://github.com/unoconv/unoserver).

API for the webservice is /unoconv/{format-to-convert-to} so a docx to pdf would be

```bash
$ curl --form file=@myfile.docx http://localhost/unoconv/pdf > myfile.pdf
```

### Formats

To see all possible formats for convertion visit ```/unoconv/formats```

To see formats for a given type ```/unoconv/formats/{document|graphics|presentation|spreadsheet}```

### Versions

To see all versions of installed dependencies lookup ```/unoconv/versions```

### Healthz

Are we alive? ```/healthz```

returns

```JavaScript
{
  uptime: 18.849
}
```

## Environment

You can change the webservice port and filesize-limit by changing environment variables.

SERVER_PORT default is 3000

PAYLOAD_MAX_SIZE default is 1048576 (1 MB)

PAYLOAD_TIMEOUT default is 2 minutes (120 000 milliseconds)

TIMEOUT_SERVER default is 2 minutes (120 000 milliseconds)

TIMEOUT_SOCKET default is 2 minutes and 20 seconds (140 000 milliseconds)

Change it in the Dockerfile or create an env-file and load it at containerstart

```bash
$ docker run --env-file=docker.env -d -p 80:3000 --name unoserver unoserver
```

## Reference 

This Repository is fork from [tfk-api-unoconv](https://github.com/zrrrzzt/tfk-api-unoconv)

## License

[MIT](LICENSE)
