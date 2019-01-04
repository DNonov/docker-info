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

And busybox image is:

>BusyBox combines tiny versions of many common UNIX utilities into a single small
executable. It provides replacements for most of the utilities you usually find
in GNU fileutils, shellutils, etc. The utilities in BusyBox generally have fewer
options than their full-featured GNU cousins; however, the options that are
included provide the expected functionality and behave very much like their GNU
counterparts. BusyBox provides a fairly complete environment for any small or
embedded system.

[Official page in dockerhub](https://hub.docker.com/_/busybox/)

You can even check what's inside the container yourself. Just pass **sh** unix
program to the **STDIN** of the container as follow:

~~~ bash
docker run -it busybox sh
~~~

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

This is the proof that this container has the **sh** program and can run it.
This container as any UNIX OS can run all the programs in the **bin** folder.
This is the reason why was able to print "hello world" in the first example,
simply because has the **echo** program located in the **bin** folder.
