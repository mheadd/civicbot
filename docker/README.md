## Running CivicBot in a Docker Container

You can find a Dockerfile in the ```docker``` directory. Fisrt, build the image:

```
docker build -t {username}/node-civicbot -f docker/Dockerfile .
```

Run it:

```
docker run --env slack_token={your-slack-token} --env wit_token={your-wit-token} -d {username}/node-civicbot
```