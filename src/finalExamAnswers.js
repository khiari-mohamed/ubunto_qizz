export const finalExamAnswers = {
  1: {
    title: "Virtual Machine Setup",
    correctAnswer: `You must enable Hardware Virtualization (Intel VT-x or AMD-V) in the BIOS/UEFI settings.

This setting is necessary because:
- VirtualBox requires hardware-level virtualization support to create and run virtual machines efficiently
- Without VT-x/AMD-V, the VM would run in software emulation mode, which is extremely slow
- Modern hypervisors like VirtualBox, VMware, and Hyper-V all require this feature
- The setting is usually found in BIOS under "Advanced" → "CPU Configuration" → "Intel Virtualization Technology" or "AMD-V"

Steps to enable:
1. Restart computer and enter BIOS (F2, F12, or Del during boot)
2. Navigate to Advanced → CPU Configuration
3. Enable "Intel VT-x" or "AMD-V"
4. Save and exit BIOS`,
    commands: [
      "# Check if virtualization is enabled in Linux:",
      "egrep -c '(vmx|svm)' /proc/cpuinfo",
      "# If output > 0, virtualization is supported",
      "",
      "# Check VT-x support:",
      "lscpu | grep Virtualization"
    ],
    keyPoints: ["VT-x", "AMD-V", "BIOS", "hardware virtualization", "hypervisor"],
    maxPoints: 10
  },

  2: {
    title: "Network Configuration", 
    correctAnswer: `Use Bridged Adapter mode in VirtualBox network settings.

Configuration:
- Network Adapter: Bridged Adapter
- Name: Select your host's network interface (Wi-Fi or Ethernet)
- IP Configuration: Either DHCP (automatic) or Static IP in same subnet as host

Why Bridged Mode:
- VM gets its own IP address on the physical network
- Other computers can access the VM directly
- VM appears as a separate device on the network
- Required for server services that need external access

IP Configuration Options:
1. DHCP (Automatic): VM gets IP from router (192.168.1.x)
2. Static IP: Manually assign IP in same range (e.g., 192.168.1.150)`,
    commands: [
      "# Configure static IP in Ubuntu:",
      "sudo nano /etc/netplan/00-installer-config.yaml",
      "",
      "# Example netplan configuration:",
      "network:",
      "  version: 2",
      "  ethernets:",
      "    enp0s3:",
      "      dhcp4: false",
      "      addresses: [192.168.1.150/24]",
      "      gateway4: 192.168.1.1",
      "      nameservers:",
      "        addresses: [8.8.8.8, 8.8.4.4]",
      "",
      "# Apply configuration:",
      "sudo netplan apply",
      "",
      "# Check IP configuration:",
      "ip addr show",
      "ip route show"
    ],
    keyPoints: ["bridged adapter", "static IP", "DHCP", "netplan", "192.168.1.x"],
    maxPoints: 15
  },

  3: {
    title: "Web Server Installation",
    correctAnswer: `Install and configure Apache2 web server:

Installation Commands:
1. Update package list: sudo apt update
2. Install Apache2: sudo apt install apache2
3. Start service: sudo systemctl start apache2
4. Enable auto-start: sudo systemctl enable apache2

Verification Steps:
1. Check service status: sudo systemctl status apache2
2. Test locally: curl localhost or open browser to http://localhost
3. Check if port 80 is listening: sudo netstat -tlnp | grep :80
4. Test from another computer: http://VM_IP_ADDRESS

Default web root: /var/www/html/
Configuration files: /etc/apache2/`,
    commands: [
      "# Update package repository:",
      "sudo apt update",
      "",
      "# Install Apache2 web server:",
      "sudo apt install apache2 -y",
      "",
      "# Start Apache2 service:",
      "sudo systemctl start apache2",
      "",
      "# Enable Apache2 to start on boot:",
      "sudo systemctl enable apache2",
      "",
      "# Check Apache2 status:",
      "sudo systemctl status apache2",
      "",
      "# Test web server locally:",
      "curl localhost",
      "",
      "# Check listening ports:",
      "sudo netstat -tlnp | grep :80",
      "",
      "# Check Apache2 processes:",
      "ps aux | grep apache2",
      "",
      "# View Apache2 logs:",
      "sudo tail -f /var/log/apache2/access.log"
    ],
    keyPoints: ["sudo apt install apache2", "systemctl", "status", "enable", "start"],
    maxPoints: 15
  },

  4: {
    title: "HTTPS Security Setup",
    correctAnswer: `HTTPS uses port 443 and requires SSL/TLS certificates.

Port Information:
- HTTP: Port 80 (unencrypted)
- HTTPS: Port 443 (encrypted with SSL/TLS)

Certificate Types for Production:
1. Let's Encrypt (Free, automated renewal)
2. Commercial CA certificates (DigiCert, GlobalSign, etc.)
3. Extended Validation (EV) certificates for high security

Configuration Steps:
1. Enable SSL module: sudo a2enmod ssl
2. Install certificate files
3. Configure virtual host for HTTPS
4. Redirect HTTP to HTTPS
5. Test SSL configuration

For development: Self-signed certificates
For production: Let's Encrypt or commercial certificates`,
    commands: [
      "# Enable SSL module in Apache:",
      "sudo a2enmod ssl",
      "",
      "# Enable SSL site:",
      "sudo a2ensite default-ssl",
      "",
      "# Create self-signed certificate (development only):",
      "sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 \\",
      "  -keyout /etc/ssl/private/apache-selfsigned.key \\",
      "  -out /etc/ssl/certs/apache-selfsigned.crt",
      "",
      "# Install Let's Encrypt (production):",
      "sudo apt install certbot python3-certbot-apache",
      "",
      "# Get Let's Encrypt certificate:",
      "sudo certbot --apache -d yourdomain.com",
      "",
      "# Test SSL configuration:",
      "sudo apache2ctl configtest",
      "",
      "# Restart Apache:",
      "sudo systemctl restart apache2",
      "",
      "# Check HTTPS port:",
      "sudo netstat -tlnp | grep :443"
    ],
    keyPoints: ["443", "SSL", "TLS", "certificate", "Let's Encrypt", "HTTPS"],
    maxPoints: 15
  },

  5: {
    title: "File Sharing Protocol",
    correctAnswer: `Use SMB/CIFS protocol with Samba server for Windows-Linux file sharing.

Why SMB/CIFS:
- Native Windows protocol for file sharing
- Cross-platform compatibility (Windows, Linux, macOS)
- Supports user authentication and permissions
- Network browsing capabilities
- Better performance than FTP for file sharing

Installation and Configuration:
1. Install Samba: sudo apt install samba
2. Configure shares in /etc/samba/smb.conf
3. Create Samba users: sudo smbpasswd -a username
4. Set folder permissions appropriately
5. Restart Samba service

Alternative protocols: NFS (Linux-only), FTP (less secure), SFTP (secure but complex)`,
    commands: [
      "# Install Samba server:",
      "sudo apt install samba samba-common-bin -y",
      "",
      "# Backup original config:",
      "sudo cp /etc/samba/smb.conf /etc/samba/smb.conf.backup",
      "",
      "# Edit Samba configuration:",
      "sudo nano /etc/samba/smb.conf",
      "",
      "# Add share configuration:",
      "[shared]",
      "   path = /home/shared",
      "   browseable = yes",
      "   writable = yes",
      "   guest ok = no",
      "   valid users = @sambashare",
      "",
      "# Create shared directory:",
      "sudo mkdir /home/shared",
      "sudo chown :sambashare /home/shared",
      "sudo chmod 770 /home/shared",
      "",
      "# Add user to Samba:",
      "sudo smbpasswd -a username",
      "",
      "# Add user to sambashare group:",
      "sudo usermod -aG sambashare username",
      "",
      "# Restart Samba services:",
      "sudo systemctl restart smbd nmbd",
      "",
      "# Check Samba status:",
      "sudo systemctl status smbd",
      "",
      "# Test Samba configuration:",
      "testparm"
    ],
    keyPoints: ["SMB", "CIFS", "Samba", "cross-platform", "Windows"],
    maxPoints: 15
  },

  6: {
    title: "User Permission Management",
    correctAnswer: `Add user to www-data group and set appropriate permissions.

Safe Permission Strategy:
1. Add user to www-data group: sudo usermod -aG www-data username
2. Change group ownership: sudo chgrp -R www-data /var/www/html
3. Set directory permissions: sudo chmod -R 775 /var/www/html
4. Set file permissions: sudo find /var/www/html -type f -exec chmod 664 {} \\;

Why This Approach:
- Follows principle of least privilege
- User gets necessary access without root privileges
- Maintains Apache's ability to serve files
- Allows collaborative editing among web developers
- Preserves security boundaries

Avoid: chmod 777 (security risk), giving root access, changing ownership to user`,
    commands: [
      "# Add user to www-data group:",
      "sudo usermod -aG www-data newuser",
      "",
      "# Change group ownership of web directory:",
      "sudo chgrp -R www-data /var/www/html",
      "",
      "# Set directory permissions (775 = rwxrwxr-x):",
      "sudo chmod -R 775 /var/www/html",
      "",
      "# Set file permissions (664 = rw-rw-r--):",
      "sudo find /var/www/html -type f -exec chmod 664 {} \\;",
      "",
      "# Verify user groups:",
      "groups newuser",
      "",
      "# Check permissions:",
      "ls -la /var/www/html",
      "",
      "# Test user access:",
      "sudo -u newuser touch /var/www/html/test.html",
      "",
      "# Set sticky bit for new files (optional):",
      "sudo chmod g+s /var/www/html"
    ],
    keyPoints: ["www-data", "group", "usermod", "chmod", "775", "664"],
    maxPoints: 15
  },

  7: {
    title: "System Monitoring & Troubleshooting",
    correctAnswer: `Use system monitoring commands to identify performance issues:

Process Monitoring:
- top: Real-time process viewer
- htop: Enhanced version of top (if installed)
- ps aux: Static process list

Disk Space Monitoring:
- df -h: Disk space usage by filesystem
- du -sh /path: Directory size
- ncdu: Interactive disk usage analyzer

Memory Monitoring:
- free -h: Memory usage
- vmstat: Virtual memory statistics

I/O Monitoring:
- iostat: I/O statistics
- iotop: I/O usage by process

Network Monitoring:
- netstat -i: Network interface statistics
- ss -tuln: Active network connections`,
    commands: [
      "# Real-time process monitoring:",
      "top",
      "# Press 'P' to sort by CPU, 'M' to sort by memory",
      "",
      "# Enhanced process viewer (if available):",
      "htop",
      "",
      "# Static process list:",
      "ps aux --sort=-%cpu | head -10",
      "",
      "# Check disk space:",
      "df -h",
      "",
      "# Check directory sizes:",
      "du -sh /var/log /tmp /home",
      "",
      "# Find large files:",
      "find / -type f -size +100M 2>/dev/null",
      "",
      "# Memory usage:",
      "free -h",
      "",
      "# System load average:",
      "uptime",
      "",
      "# I/O statistics:",
      "iostat -x 1 5",
      "",
      "# Network connections:",
      "ss -tuln",
      "",
      "# System resource summary:",
      "vmstat 1 5"
    ],
    keyPoints: ["top", "htop", "ps", "df", "du", "free", "iostat"],
    maxPoints: 15
  }
};

// Enhanced terminal responses with visual interfaces
export const enhancedTerminalCommands = {
  'ls': `Desktop    Documents  Downloads  Music     Pictures  Public    Templates  Videos
bin        etc        home       lib       media     mnt       opt        proc
root       run        sbin       srv       sys       tmp       usr        var`,

  'pwd': '/home/user',

  'whoami': 'user',

  'sudo apt update': `Hit:1 http://archive.ubuntu.com/ubuntu jammy InRelease
Get:2 http://archive.ubuntu.com/ubuntu jammy-updates InRelease [119 kB]
Get:3 http://archive.ubuntu.com/ubuntu jammy-backports InRelease [108 kB]
Get:4 http://security.ubuntu.com/ubuntu jammy-security InRelease [110 kB]
Fetched 337 kB in 2s (168 kB/s)
Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
All packages are up to date.`,

  'sudo apt install apache2': `Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
The following additional packages will be installed:
  apache2-bin apache2-data apache2-utils libapr1 libaprutil1
Suggested packages:
  apache2-doc apache2-suexec-pristine | apache2-suexec-custom
The following NEW packages will be installed:
  apache2 apache2-bin apache2-data apache2-utils libapr1 libaprutil1
0 upgraded, 6 newly installed, 0 to remove and 0 not upgraded.
Need to get 1,463 kB of archives.
After this operation, 5,981 kB of additional disk space will be used.
Do you want to continue? [Y/n] Y
Get:1 http://archive.ubuntu.com/ubuntu jammy/main amd64 libapr1 amd64 1.7.0-8build1 [108 kB]
...
Setting up apache2 (2.4.52-1ubuntu4.2) ...
Enabling module mpm_event.
Enabling module authz_core.
Enabling module authz_host.
Enabling module authn_core.
Enabling module auth_basic.
Enabling module access_compat.
Enabling module authn_file.
Enabling module authz_user.
Enabling module alias.
Enabling module dir.
Enabling module autoindex.
Enabling module env.
Enabling module mime.
Enabling module negotiation.
Enabling module setenvif.
Enabling module filter.
Enabling module deflate.
Enabling module status.
Enabling module reqtimeout.
Enabling conf charset.
Enabling conf localized-error-pages.
Enabling conf other-vhosts-access-log.
Enabling conf security.
Enabling conf serve-cgi-bin.
Enabling site 000-default.
Created symlink /etc/systemd/system/multi-user.target.wants/apache2.service → /lib/systemd/system/apache2.service.
Processing triggers for man-db (2.10.2-1) ...
Processing triggers for libc-bin (2.35-0ubuntu3.1) ...`,

  'systemctl status apache2': `● apache2.service - The Apache HTTP Server
     Loaded: loaded (/lib/systemd/system/apache2.service; enabled; vendor preset: enabled)
     Active: active (running) since Mon 2024-01-15 10:30:45 UTC; 2min 15s ago
       Docs: https://httpd.apache.org/docs/2.4/
   Main PID: 1234 (apache2)
      Tasks: 55 (limit: 4915)
     Memory: 12.5M
        CPU: 156ms
     CGroup: /system.slice/apache2.service
             ├─1234 /usr/sbin/apache2 -k start
             ├─1235 /usr/sbin/apache2 -k start
             └─1236 /usr/sbin/apache2 -k start

Jan 15 10:30:45 ubuntu systemd[1]: Starting The Apache HTTP Server...
Jan 15 10:30:45 ubuntu apachectl[1233]: AH00558: apache2: Could not reliably determine the server's fully qualified domain name, using 127.0.1.1. Set the 'ServerName' directive in /etc/apache2/apache2.conf to suppress this message
Jan 15 10:30:45 ubuntu systemd[1]: Started The Apache HTTP Server.`,

  'ip addr': `1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
    inet6 ::1/128 scope host 
       valid_lft forever preferred_lft forever
2: enp0s3: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP group default qlen 1000
    link/ether 08:00:27:12:34:56 brd ff:ff:ff:ff:ff:ff
    inet 192.168.1.100/24 brd 192.168.1.255 scope global dynamic enp0s3
       valid_lft 86394sec preferred_lft 86394sec
    inet6 fe80::a00:27ff:fe12:3456/64 scope link 
       valid_lft forever preferred_lft forever`,

  'ping google.com': `PING google.com (142.250.191.14) 56(84) bytes of data.
64 bytes from lga25s62-in-f14.1e100.net (142.250.191.14): icmp_seq=1 time=12.3 ms
64 bytes from lga25s62-in-f14.1e100.net (142.250.191.14): icmp_seq=2 time=11.8 ms
64 bytes from lga25s62-in-f14.1e100.net (142.250.191.14): icmp_seq=3 time=12.1 ms
^C
--- google.com ping statistics ---
3 packets transmitted, 3 received, 0% packet loss, time 2003ms
rtt min/avg/max/mdev = 11.847/12.067/12.334/0.201 ms`,

  'df -h': `Filesystem      Size  Used Avail Use% Mounted on
/dev/sda1        20G  8.5G   10G  46% /
/dev/sda15      105M  6.1M   99M   6% /boot/efi
tmpfs           2.0G     0  2.0G   0% /dev/shm
tmpfs           394M  1.2M  393M   1% /run
tmpfs           5.0M  4.0K  5.0M   1% /run/lock
tmpfs           394M     0  394M   0% /run/user/1000`,

  'top': `top - 10:35:22 up  1:23,  2 users,  load average: 0.15, 0.25, 0.18
Tasks: 234 total,   1 running, 233 sleeping,   0 stopped,   0 zombie
%Cpu(s):  2.3 us,  1.2 sy,  0.0 ni, 96.2 id,  0.3 wa,  0.0 hi,  0.0 si,  0.0 st
MiB Mem :   3934.6 total,   2156.8 free,    892.4 used,    885.4 buff/cache
MiB Swap:   2048.0 total,   2048.0 free,      0.0 used.   2798.6 avail Mem 

    PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND
   1234 www-data  20   0  123456  12345   1234 S   2.3   1.2   0:12.34 apache2
   1235 www-data  20   0  123456  11234   1234 S   1.8   1.1   0:08.45 apache2
   1236 www-data  20   0  123456  10123   1234 S   1.2   1.0   0:06.78 apache2
      1 root      20   0  167772   9876   6543 S   0.0   0.2   0:02.15 systemd
      2 root      20   0       0      0      0 S   0.0   0.0   0:00.01 kthreadd`,

  'free -h': `               total        used        free      shared  buff/cache   available
Mem:           3.8Gi       871Mi       2.1Gi        12Mi       885Mi       2.7Gi
Swap:          2.0Gi          0B       2.0Gi`,

  'netstat -tlnp | grep :80': `tcp6       0      0 :::80                   :::*                    LISTEN      1234/apache2`,

  'netstat -tlnp | grep :443': `tcp6       0      0 :::443                  :::*                    LISTEN      1234/apache2`,

  'ps aux | grep apache2': `root        1234  0.0  0.3 123456  12345 ?        Ss   10:30   0:00 /usr/sbin/apache2 -k start
www-data    1235  0.0  0.2 123456  11234 ?        S    10:30   0:00 /usr/sbin/apache2 -k start
www-data    1236  0.0  0.2 123456  10123 ?        S    10:30   0:00 /usr/sbin/apache2 -k start
user        2345  0.0  0.0   6432   736 pts/0    S+   10:35   0:00 grep --color=auto apache2`,

  'curl localhost': `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>Apache2 Ubuntu Default Page: It works</title>
  </head>
  <body>
    <div class="main_page">
      <div class="page_header floating_element">
        <img src="/icons/ubuntu-logo.png" alt="Ubuntu Logo" class="floating_element"/>
        <span class="floating_element">
          Apache2 Ubuntu Default Page
        </span>
      </div>
      <div class="content_section floating_element">
        <div class="section_header">
          <div id="about"></div>
          It works!
        </div>
      </div>
    </div>
  </body>
</html>`,

  // Additional Essential Commands
  'ls -l': `total 48
drwxr-xr-x 2 user user 4096 Jan 15 10:30 Desktop
drwxr-xr-x 2 user user 4096 Jan 15 10:30 Documents
drwxr-xr-x 2 user user 4096 Jan 15 10:30 Downloads`,
  'ls -a': `. .. .bashrc .profile Desktop Documents Downloads Music Pictures`,
  'clear': '\u001b[2J\u001b[H',
  'history': `    1  ls
    2  pwd
    3  sudo apt update
    4  sudo apt install apache2
    5  systemctl status apache2`,
  'groups': 'user adm cdrom sudo dip plugdev lpadmin sambashare',
  'sudo usermod -aG www-data user': '',
  'chmod 755 /var/www/html': '',
  'sudo chown -R www-data:www-data /var/www/html': '',
  'sudo ufw status': 'Status: inactive',
  'sudo ufw enable': 'Firewall is active and enabled on system startup',
  'sudo ufw allow 80': 'Rules updated',
  'sudo ufw allow 443': 'Rules updated',
  'lscpu | grep Virtualization': 'Virtualization:                  VT-x',
  'egrep -c "(vmx|svm)" /proc/cpuinfo': '6',
  'sudo a2enmod ssl': 'Enabling module ssl.\nTo activate: systemctl reload apache2',
  'sudo a2ensite default-ssl': 'Enabling site default-ssl.\nTo activate: systemctl reload apache2',
  'apache2ctl configtest': 'Syntax OK',
  'sudo systemctl enable apache2': 'Created symlink /etc/systemd/system/multi-user.target.wants/apache2.service',
  'sudo systemctl start apache2': '',
  'sudo systemctl restart apache2': '',
  'sudo apt install samba': 'Reading package lists... Done\nInstalling samba...',
  'testparm': 'Load smb config files from /etc/samba/smb.conf\nLoaded services file OK.',
  'sudo smbpasswd -a user': 'New SMB password:\nAdded user user.',
  'sudo systemctl restart smbd': '',
  'sudo systemctl status smbd': 'smbd.service - Samba SMB Daemon\n     Active: active (running)',
  'uname -a': 'Linux ubuntu 5.15.0-56-generic #62-Ubuntu SMP x86_64 GNU/Linux',
  'hostname': 'ubuntu-server',
  'uptime': ' 10:35:22 up  1:23,  2 users,  load average: 0.15, 0.25, 0.18',
  'date': 'Mon Jan 15 10:35:22 UTC 2024',
  'which apache2': '/usr/sbin/apache2',
  'whereis apache2': 'apache2: /usr/sbin/apache2 /etc/apache2 /usr/share/apache2',
  'env | grep PATH': 'PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin',
  'echo $HOME': '/home/user',
  'cat /etc/hostname': 'ubuntu-server',
  'lscpu': `Architecture:                    x86_64
CPU(s):                          6
Vendor ID:                       GenuineIntel
Model name:                      Intel(R) Core(TM) i5-8400 CPU @ 2.80GHz
Virtualization:                  VT-x`,
  'du -sh /var/log': '245M\t/var/log',
  'find /var/www/html -type f -exec chmod 664 {} \\;': '',
  'sudo find /var/www/html -type d -exec chmod 775 {} \\;': '',
  'netstat -i': 'Kernel Interface table\nIface      MTU    RX-OK RX-ERR\nenp0s3    1500     1234      0',
  'ss -tuln': 'Netid  State   Local Address:Port\ntcp    LISTEN  *:80\ntcp    LISTEN  *:443\ntcp    LISTEN  *:22',
  'sudo tail /var/log/apache2/access.log': '192.168.1.50 - - [15/Jan/2024:10:30:45] "GET / HTTP/1.1" 200 10918',
  'sudo tail /var/log/syslog': 'Jan 15 10:30:45 ubuntu systemd[1]: Started The Apache HTTP Server.',
  'ps aux': `USER         PID %CPU %MEM COMMAND
root           1  0.0  0.2 /sbin/init
user        1234  0.0  0.1 -bash
www-data    5678  0.1  0.3 /usr/sbin/apache2`,
  'kill 1234': '',
  'mkdir test': '',
  'rmdir test': '',
  'touch test.txt': '',
  'cp test.txt backup.txt': '',
  'mv test.txt renamed.txt': '',
  'rm test.txt': '',
  'cat /etc/os-release': `NAME="Ubuntu"\nVERSION="22.04.1 LTS (Jammy Jellyfish)"\nID=ubuntu`,
  'nano /etc/hosts': 'GNU nano 6.2                       /etc/hosts\n127.0.0.1\tlocalhost\n127.0.1.1\tubuntu-server',
  'exit': 'logout',

  'help': `🐧 Ubuntu Terminal Commands:

📁 File & Directory:
  ls, ls -l, ls -a, cd, pwd, mkdir, rmdir, touch, cp, mv, rm, cat, nano, find, grep

⚙️ System Management:
  sudo, uname, hostname, uptime, ps, top, kill, free, df, du, which, whereis

📦 Package Management:
  sudo apt update, sudo apt upgrade, sudo apt install <package>, sudo apt remove <package>

🔧 Service Management:
  sudo systemctl start/stop/restart/enable/disable <service>
  systemctl status <service>

🌐 Network Commands:
  ip addr, ping, netstat, ss, curl, wget

👤 User & Permissions:
  groups, usermod, chmod, chown, chgrp

🔒 Security & Firewall:
  sudo ufw status/enable/allow

🌐 Web Server (Apache):
  sudo a2enmod, sudo a2ensite, apache2ctl configtest

📊 Monitoring:
  top, ps aux, df -h, free -h, du -sh, tail /var/log/*

🛠️ Utilities:
  clear, history, date, env, echo $VAR, exit

Type any command to execute it!`
};