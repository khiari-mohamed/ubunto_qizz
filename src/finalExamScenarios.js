export const finalExamScenarios = [
  {
    id: 1,
    title: "Virtual Machine Setup",
    question: "You need to install Ubuntu on a VirtualBox VM for the office. Before creating the VM, what BIOS setting must you enable on the host computer? Explain why this setting is necessary.",
    scenario: "The office manager wants to run Ubuntu alongside Windows for development work.",
    tools: ["System Info"],
    expectedKeywords: ["virtualization", "VT-x", "AMD-V", "hardware", "BIOS", "UEFI"],
    points: 10
  },
  {
    id: 2,
    title: "Network Configuration",
    question: "The Ubuntu VM needs to be accessible from other computers in the office network. Which VirtualBox network adapter mode should you configure, and what IP configuration would you use?",
    scenario: "Other team members need to access services running on the Ubuntu VM.",
    tools: ["Network Config", "Terminal"],
    expectedKeywords: ["bridged", "adapter", "DHCP", "static IP", "192.168"],
    points: 15
  },
  {
    id: 3,
    title: "Web Server Installation",
    question: "Install and configure Apache web server on Ubuntu. What commands would you use, and how would you verify it's running correctly?",
    scenario: "The office needs a local web server for internal applications.",
    tools: ["Terminal", "System Info"],
    expectedKeywords: ["sudo apt install apache2", "systemctl", "status", "start", "enable"],
    points: 15
  },
  {
    id: 4,
    title: "HTTPS Security Setup",
    question: "Configure HTTPS for the web server. What port does HTTPS use, and what type of certificate would you need for a production environment?",
    scenario: "Security policy requires all web traffic to be encrypted.",
    tools: ["Settings", "Terminal"],
    expectedKeywords: ["443", "SSL", "TLS", "certificate", "Let's Encrypt", "CA"],
    points: 15
  },
  {
    id: 5,
    title: "File Sharing Protocol",
    question: "Set up file sharing between the Ubuntu server and Windows clients in the office. Which protocol should you use and why?",
    scenario: "Employees need to access shared files from both Ubuntu and Windows machines.",
    tools: ["Network Config", "Terminal"],
    expectedKeywords: ["SMB", "CIFS", "Samba", "cross-platform", "Windows"],
    points: 15
  },
  {
    id: 6,
    title: "User Permission Management",
    question: "A new employee needs access to modify web files in /var/www/html. What's the safest way to grant this permission without compromising security?",
    scenario: "New developer needs to update website files but shouldn't have full admin access.",
    tools: ["Terminal", "Settings"],
    expectedKeywords: ["www-data", "group", "chmod", "chown", "usermod", "sudo"],
    points: 15
  },
  {
    id: 7,
    title: "System Monitoring & Troubleshooting",
    question: "The system is running slowly. What commands would you use to identify resource-heavy processes and check disk space?",
    scenario: "Users complain the server is responding slowly to requests.",
    tools: ["Terminal", "System Info"],
    expectedKeywords: ["top", "htop", "ps", "df", "du", "free", "iostat"],
    points: 15
  }
];