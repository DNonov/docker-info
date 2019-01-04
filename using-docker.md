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
docker run busybox echo hello world
~~~

The result will be:

~~~ bash
hello world
~~~

You can even check what's inside the container yourself. Just pass **sh** unix
program to the **STDIN** of the container as follow:

~~~ bash
docker run -it busybox sh
~~~

**-i** and **-t** flags have to be present to keep **STDIN** open and
to allocate pseudo **TTY**

The output will be the **sh** terminal inside the container and you can explore:

~~~ bash
ls
~~~
Output:
~~~ bash
bin   dev   etc   home  proc  root  sys   tmp   usr   var
~~~
~~~ bash
cd bin
ls | grep sh
~~~
Output:
~~~ bash
sh
~~~
