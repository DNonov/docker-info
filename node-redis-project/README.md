## Simple web server consist of Node.js and redis

This is a simple web server.

To build a docker image use:

~~~ Bash
docker build dnonov/web .
~~~

Port mapping is mandatory!

To map the ports correctly use:

~~~ Bash
docker run -p 3000:3000 <image-name>
~~~

The first port is the host OS's port and the second is the container's
port.

### Docker compose

To run an image:

~~~ Bash
docker-compose up
~~~

To rebuild and run an image:

~~~ Bash
docker-compose up --build
~~~
