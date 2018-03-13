# Serverless Meetup API Proxy

### Service created primarily for use in [BackEndBr](https://github.com/backend-br/backend-br.github.io) site.

---

### Problem:
Meetup API only accepts requests with OAuth, if you need to get some data using a static site this will not be possible, so it is necessary to create a separate service to accomplish this.

---

### How it works:

- Client sends a request to the proxy passing some rules about the data (fields filters, ordering, endpoints, etc.)
- Proxy makes a call to the Meetup API with the rules requested by the client and with the authentication key
- Proxy returns data from the Meetup API to the client

Meetup API access tokens should be saved directly in the proxy settings.
This remove any connection between the client and the Meetup API, eliminating problems with oauth.

---

### Run

```sh
# install dependencies
yarn install
# set env variables
cp variables.env.example variables.env
# run serverless local
sls offline start --skipCacheInvalidation
```

### Deploy
```sh
# deploy to aws lambda
sls deploy
```

### How to use
Make requests to `https://YOUR_LAMBDA_FUNCTION_URL?group=MEETUP_GROUP&endpoint=events&photo-host=public&page=20&status=upcoming,past`
You can pass other parameters and other endpoint (See [Meetup API](https://www.meetup.com/meetup_api/)).
