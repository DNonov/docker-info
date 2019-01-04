## Simple web server

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
