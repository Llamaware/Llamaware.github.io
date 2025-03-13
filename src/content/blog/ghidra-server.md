---
title: "Guide: Setting up a Ghidra server on a remote VPS"
authors: ['OneHalf']
date: '2025-03-12T23:20:00.000Z'
---

A while ago, I got a cheap VPS ($16/year) and have been getting tons of mileage out of it. I've used it as a SoftEther VPN server, a TF2 server, and even more.

One use for a VPS that you might not have considered is using it as a [Ghidra](https://ghidra-sre.org/) server. You can connect to it and collaborate with your team when decompiling a new project in Ghidra.

Here's a straightforward guide on how to set one up over SSH. I assume that your VPS is running Ubuntu and you want the latest version of Ghidra as of this post, which is v11.3.1. (Modify the instructions as needed if you are using a different version.)

There is also a different method that uses Docker, but this method does not require Docker. The process is simple.

### Instructions

1. Allow Ghidra through your firewall (if you are using ufw).

```
sudo ufw allow 13100:13102/tcp
```

2. Install `unzip` and `OpenJDK`. Ghidra v11.3.1 expects Java version 21.

```
sudo apt-get update
sudo apt-get install unzip
sudo apt-get install openjdk-21-jdk
```

3. Confirm that Java is installed.

```
java -version
```

4. Create a nonprivileged user to run the server and a directory for shared Ghidra repositories. We'll call the user `ghidrasrv`.

```
sudo useradd -r -m -d /home/ghidrasrv -s /usr/bin/nologin -U ghidrasrv
sudo mkdir /opt/ghidra-repos
sudo chown ghidrasrv.ghidrasrv /opt/ghidra-repos
```

5. Download Ghidra, unzip it, and move it to the server root directory. The release link is [here](https://github.com/NationalSecurityAgency/ghidra/releases).

```
wget https://github.com/NationalSecurityAgency/ghidra/releases/download/Ghidra_11.3.1_build/ghidra_11.3.1_PUBLIC_20250219.zip -O ghidra.zip
mkdir /tmp/ghidra
cd /tmp/ghidra
unzip ghidra.zip
cd /tmp
rm -f ghidra.zip
rmdir ghidra
```

6. Create a backup of the original server configuration file.

```
cd /opt/ghidrasrv/server
cp server.conf server.conf.orig
```

7. Open `server.conf` with a text editor and make the following changes.

```
nano server.conf
```

- Change the location where repositories will be saved:

```
ghidra.repositories.dir=/opt/ghidra-repos
```

- Change these parameters so that users can specify a username when connecting:

```
wrapper.app.parameter.2=-u
wrapper.app.parameter.3=${ghidra.repositories.dir}
```

- Change ownership of the Ghidra Server process to the `ghidrasrv` user:

```
wrapper.app.account=ghidrasrv
```

- Save the file as `server.conf`.

8. Back in the terminal, change ownership of the Ghidra Server directory to the `ghidrasrv` user.

```
sudo chown -R ghidrasrv.ghidrasrv /opt/ghidrasrv
```

9. Install the Ghidra server as a service.

```
sudo ./svrInstall
```

10. Add users authorized to connect to the server.

```
sudo /opt/ghidrasrv/server/svrAdmin -add myUsername
```

You're all done! When you connect to the server with your username, you will be prompted for a password, which by default is `changeme`. After creating an account, you must connect within 24 hours and change the default password, or else your account will be locked.

### Conclusion

Your Ghidra server should now be up and running! The service will start automatically on every boot. Good luck, and have fun decompiling with friends!

Hopefully, you found this guide helpful, since the included documentation with Ghidra is rather lackluster. It can be found at `ghidra/server/svrREADME.html`.

You can find more info on how to use your new Ghidra server [here](https://byte.how/posts/collaborative-reverse-engineering/).

---

The information in this article was originally from Chris Eagle, Kara Nance - *The Ghidra Book - The Definitive Guide* (2020). It has been modified and updated.