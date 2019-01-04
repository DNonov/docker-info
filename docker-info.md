## How to Install Docker

### Ubuntu 16.04

The Docker installation package available in the official Ubuntu 16.04
repository may not be the latest version. To get this latest version,
install Docker from the official Docker repository.

First, in order to ensure the downloads are valid, add the GPG key for
the official Docker repository to your system:

``` bash
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
```
Add the Docker repository to APT sources:

``` bash
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
```
Next, update the package database with the Docker packages from the
newly added repo:

``` bash
sudo apt-get update
```
Make sure you are about to install from the Docker repo instead of the
default Ubuntu 16.04 repo:

``` bash
apt-cache policy docker-ce
```

You should see output similar to the follow:

``` bash
docker-ce:
  Installed: (none)
  Candidate: 18.06.1~ce~3-0~ubuntu
  Version table:
     18.06.1~ce~3-0~ubuntu 500
        500 https://download.docker.com/linux/ubuntu xenial/stable amd64 Packages
```
Notice that **docker-ce** is not installed, but the candidate for installation
is from the Docker repository for Ubuntu 16.04(xenial).

Finally, install Docker:

``` bash
sudo apt-get install -y docker-ce
```

Docker should now be installed, the daemon started, and the process enabled
to start on boot. Check that it's running:


``` bash
sudo systemctl status docker
```

The output should be similar to the following, showing that the service is
active and running:


``` bash
● docker.service - Docker Application Container Engine
   Loaded: loaded (/lib/systemd/system/docker.service; enabled; vendor preset: enabled)
   Active: active (running) since Thu 2018-10-18 20:28:23 UTC; 35s ago
     Docs: https://docs.docker.com
 Main PID: 13412 (dockerd)
   CGroup: /system.slice/docker.service
           ├─13412 /usr/bin/dockerd -H fd://
           └─13421 docker-containerd --config /var/run/docker/containerd/containerd.toml
```

Installing Docker now gives you not just the Docker service(daemon) but also
the docker command line utility, or the Docker client.

## Executing Docker without sudo prefix

By default, running the **docker** command requires root privileges - that is,
you have to prefix your docker command with sudo. It can also be run by a user 
in the **docker** group, which is automatically created during the installation
of Docker. If you attempt to run the Docker command without prefixing it with
**sudo** or without being in the docker group, you will get an output like
this:


``` bash
docker: Got permission denied while trying to connect to the Docker daemon socket at 
unix:///var/run/docker.sock: Post http://%2Fvar%2Frun%2Fdocker.sock/v1.39/containers/create: 
dial unix /var/run/docker.sock: connect: permission denied.
See 'docker run --help'.
```

If you want to avoid typing sudo whenever you run docker command, add your
username to the **docker** group:

``` bash
sudo usermod -aG docker <user>
```

To apply the new group membership, you can log out of the server and back in,
or you can type the following:

``` bash
su - <user>
```

You will be prompted to enter your user's password to continue. Afterwards,
you can confirm that your user is now added to the docker group by typing:

``` bash
id -nG
```

If you need to add a user to the **docker** group that you're not logged in
as, declare that username explicitly using:

``` bash
sudo usermod -aG docker <username>
```

[The original guide by Digital Ocean](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-16-04)

