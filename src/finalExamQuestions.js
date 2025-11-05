export const finalExamQuestions = [
  {
    id: 1,
    question: "You need to install Ubuntu on a VirtualBox VM for your office. What's the FIRST step you should take?",
    options: [
      "Download the Ubuntu ISO file",
      "Install VirtualBox software", 
      "Enable virtualization in BIOS",
      "Create a new virtual machine"
    ],
    correct: 2,
    scenario: "Office Setup - Step 1"
  },
  {
    id: 2,
    question: "After enabling virtualization, you create a VM with 4GB RAM. The host system has 8GB total. What might happen?",
    options: [
      "VM will run perfectly",
      "Host system might become slow during VM usage",
      "VM won't start at all", 
      "No impact on performance"
    ],
    correct: 1,
    scenario: "Resource Management"
  },
  {
    id: 3,
    question: "During Ubuntu installation, you need to set up partitions. Which partition is ESSENTIAL for the system to boot?",
    options: [
      "/home partition",
      "/ (root) partition", 
      "/tmp partition",
      "swap partition"
    ],
    correct: 1,
    scenario: "System Installation"
  },
  {
    id: 4,
    question: "You want to access your Ubuntu VM from other computers in the office. Which VirtualBox network mode should you use?",
    options: [
      "NAT mode",
      "Bridged Adapter mode",
      "Internal Network", 
      "Host-only Adapter"
    ],
    correct: 1,
    scenario: "Network Configuration"
  },
  {
    id: 5,
    question: "To set up file sharing between the Ubuntu server and Windows clients, which protocol would be most appropriate?",
    options: [
      "HTTP",
      "FTP",
      "SMB/CIFS",
      "SMTP"
    ],
    correct: 2,
    scenario: "File Sharing Setup"
  },
  {
    id: 6,
    question: "You need to install a web server on Ubuntu. Which command would you use?",
    options: [
      "sudo apt install apache2",
      "sudo install webserver",
      "apt get apache",
      "sudo web-install"
    ],
    correct: 0,
    scenario: "Web Server Installation"
  },
  {
    id: 7,
    question: "To secure your web server with HTTPS, you need to configure SSL/TLS. What's the default port for HTTPS?",
    options: [
      "80",
      "443", 
      "8080",
      "22"
    ],
    correct: 1,
    scenario: "Security Configuration"
  },
  {
    id: 8,
    question: "A user needs access to modify files in /var/www/html. What's the safest way to grant this permission?",
    options: [
      "chmod 777 /var/www/html",
      "Add user to www-data group and set appropriate permissions",
      "Give the user root password",
      "Change ownership to the user with chown"
    ],
    correct: 1,
    scenario: "User Permission Management"
  },
  {
    id: 9,
    question: "You notice the Ubuntu system is running slowly. Which command helps you identify resource-heavy processes?",
    options: [
      "ls -la",
      "top",
      "pwd", 
      "cd /"
    ],
    correct: 1,
    scenario: "System Monitoring"
  },
  {
    id: 10,
    question: "To allow remote administration of the Ubuntu server, which service should you enable?",
    options: [
      "FTP",
      "HTTP",
      "SSH",
      "SMTP"
    ],
    correct: 2,
    scenario: "Remote Access Setup"
  },
  {
    id: 11,
    question: "The office needs to send automated email notifications. Which protocol does the mail server use to SEND emails?",
    options: [
      "POP3",
      "IMAP", 
      "SMTP",
      "HTTP"
    ],
    correct: 2,
    scenario: "Email Server Configuration"
  },
  {
    id: 12,
    question: "Users complain they can't access the company website by domain name, but IP address works. What's likely the issue?",
    options: [
      "Web server is down",
      "DNS resolution problem",
      "Network cable unplugged",
      "Firewall blocking all traffic"
    ],
    correct: 1,
    scenario: "Network Troubleshooting"
  },
  {
    id: 13,
    question: "You want to automatically assign IP addresses to office computers. Which service should you configure?",
    options: [
      "DNS",
      "DHCP",
      "FTP", 
      "SSH"
    ],
    correct: 1,
    scenario: "Network Services"
  },
  {
    id: 14,
    question: "To backup important files from the Ubuntu server to another location, which protocol is most suitable?",
    options: [
      "HTTP",
      "SFTP (Secure FTP)",
      "SMTP",
      "DNS"
    ],
    correct: 1,
    scenario: "Data Backup Strategy"
  },
  {
    id: 15,
    question: "The system shows 'disk space full' error. Which directory should you check first for large temporary files?",
    options: [
      "/home",
      "/tmp",
      "/etc",
      "/usr"
    ],
    correct: 1,
    scenario: "System Maintenance"
  }
];