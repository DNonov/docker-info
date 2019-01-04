## Using Docker
### Running containers

We can run a docker image with:

~~~ bash
docker run <image-name>
~~~

Running an image means that you creating a container out of that image. An image
and a container relationship is same as a class and an object. The image is a
blueprint for containers.

Every container has FS snapshot and Startup Command.
We can pass a different startup command to the container as simply as:

~~~ bash
docker run <image-name> echo hello world
~~~

The result will be:

~~~ bash
hello world
~~~

You can even check what's inside the container yourself. Just pass **sh** unix
program to the **STDIN** of the container as follow:

~~~ bash
docker run -it <image-name> sh
~~~

**-i** and **-t** flags have to be present to keep **STDIN** open and
to allocate pseudo **TTY**

The output will be the **sh** terminal inside the container and you can explore:

~~~ bash
ls
~~~
Output:
~~~ bash
bin dev etc home proc root sys tmp usr var
~~~

Whatever command you pass to the **STDIN** have to be executable in the container.
All programs from the examples above can be found in any UNIX OS, however your container
have to have access to the same executables that you pass.

### What is behind run command and some docker essential commands

There is two steps process behind it. Whenever **Docker run** command is used,
actually docker run two sequential commands behind the scenes.

~~~ bash
docker create <image-name>
~~~

and 

~~~ bash
docker start -a <container-id>
~~~

The first command creates a container out of an image, and the second just starts the
container.

The **-a** flag in the former command just attaches to the **STDOUT/STDERR**  of the container
and forwards signals. By default **docker start** passes the container's id to the **STDOUT**.

In order to obtain more information about the containers you can run two commands:

~~~ bash
docker ps
~~~

To list all currently running containers and

~~~ bash
docker ps --all
~~~

to list all containers that have ever been created.

To stop running containers you can use:

~~~ bash
docker stop <container-id>
~~~

or 

~~~ bash
docker kill <container-id>
~~~

The first command just sends **SIGTERM** signal to the main process of the container
and the second sends **SIGKILL** signal. If the main process in the container is still alive
ten seconds after the **SIGTERM** have been sent, docker is going to send **SIGKILL**.


If you want to restart container you can just simply run:

~~~ bash
docker start -a <container-id>
~~~

or if you want to delete all containers that has been stopped and are no longer needed:

~~~ bash
docker system prune
~~~

Another essential command is:

~~~ bash
docker log <container-id>
~~~

Which gives you all the information that has been passed to the **STDOUT** of the container.

### How to run additional process in a docker container

It is as simple as:

~~~ bash
docker exec -it <container-id> <command>
~~~

and yes **-it** flag shorthand does the same thing as it does on **docker run** command.

This is the best way to obtain a terminal session in your container:

~~~ bash
docker exec -it <container-id> sh
~~~

The difference between the above and **docker run** is **docker exec** won't replace
the main process of the container, it will just initiate new process in parallel to 
the main process.

### How to create a docker image

The docker client will look for Dockerfile and will send it to the docker server and we
will fetch the image from there.

To build an image just use:

~~~ bash
docker build <path-to-the-Dockerfile>
~~~

After that we can use the fetched image id and use:

~~~ bash
docker run <image-id>
~~~
