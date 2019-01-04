## Using docker volumes

First what is docker volume? Docker volume is part of the **host OS'** **fs** shared
with a container. If some part of the project will be changed constantly the best solution
is to make it a volume.

~~~ Bash
docker run -v <host-dir>:<container-dir>
~~~

In this specific case of react app it will be:

~~~ Bash
docker run -p 3000:3000 -v /app/node_modules -v $(pwd):/app <image-name>
~~~

The first **-v** flag is used just as placeholder of the /app/node_modules folder in the
container. As you can see there is no mapping to the **host OS** it's just volume that can be
accessed any time while the container is running. Now whenever we change something in
**/frontend** the change will appear in the container as well because of the second volume.

The another option is to use docker-compose.yml file as follows:

~~~ yml
version: '3'
services:
  react:
    build:
      context: .
      dockerfile: Dockerfile.dev
    ports:
      - "3000:3000"
    volumes:
      - /app/node_modules
      - .:/app
~~~

and in the same dir just run:

~~~ Bash
docker-compose up
~~~

The former way is the one chosen for this app.

## Testing react app

The best way is to build an image and run it with **npm run test** command:

~~~ Bash
docker build -f Dockerfile.dev .
~~~

and use the image name that you going to get:

~~~ Bash
docker run <image-name> npm run test
~~~

There is other way via docker-compose. If you add another service to the **docker-compose.yml**:

~~~ yml
version: '3'
services:
  react:
    build:
      context: .
      dockerfile: Dockerfile.dev
    ports:
      - "3000:3000"
    volumes:
      - /app/node_modules
      - .:/app
  tests:
    build:
      context: .
      dockerfile: Dockerfile.dev
    volumes:
      - /app/node_modules
      - .:/app
    command: ["npm", "run", "test"]
~~~

Once any file inside the app changes the **test** service will
run the tests.

## Multi step build 

Multi step builds are appropriate if you need to use two or more base images.
Here is example how you can use node and nginx together:


~~~ dockerfile
FROM node:alpine as builder
WORKDIR "/app"
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

FROM nginx
COPY --from=builder /app/build /usr/share/nginx/html
~~~
