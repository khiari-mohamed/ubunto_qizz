export const protocolQuestions = [
  // HTTP/HTTPS Basics
  {
    id: 1,
    question: "What does HTTP stand for?",
    options: [
      "HyperText Transfer Protocol",
      "High Transfer Text Protocol", 
      "HyperText Transmission Protocol",
      "High Text Transfer Protocol"
    ],
    correct: 0
  },
  {
    id: 2,
    question: "What is the main difference between HTTP and HTTPS?",
    options: [
      "HTTPS is faster than HTTP",
      "HTTPS uses encryption (SSL/TLS) for security",
      "HTTP is newer than HTTPS",
      "HTTPS uses different ports only"
    ],
    correct: 1
  },
  {
    id: 3,
    question: "What is the default port for HTTP?",
    options: ["21", "25", "80", "443"],
    correct: 2
  },
  {
    id: 4,
    question: "What is the default port for HTTPS?",
    options: ["80", "443", "21", "25"],
    correct: 1
  },
  {
    id: 5,
    question: "Which HTTP method is used to retrieve data from a server?",
    options: ["POST", "GET", "PUT", "DELETE"],
    correct: 1
  },
  
  // FTP Protocol
  {
    id: 6,
    question: "What does FTP stand for?",
    options: [
      "File Transfer Protocol",
      "Fast Transfer Protocol",
      "File Transmission Protocol", 
      "Fast Text Protocol"
    ],
    correct: 0
  },
  {
    id: 7,
    question: "What is the default port for FTP?",
    options: ["20", "21", "22", "23"],
    correct: 1
  },
  {
    id: 8,
    question: "What is SFTP?",
    options: [
      "Simple FTP",
      "Secure FTP (SSH File Transfer Protocol)",
      "Super Fast Transfer Protocol",
      "Standard File Transfer Protocol"
    ],
    correct: 1
  },
  {
    id: 9,
    question: "FTP uses which two ports for data transfer?",
    options: [
      "Port 20 for data, Port 21 for control",
      "Port 21 for data, Port 20 for control", 
      "Only Port 21",
      "Port 22 and 23"
    ],
    correct: 0
  },
  {
    id: 10,
    question: "What is the main security issue with standard FTP?",
    options: [
      "It's too slow",
      "Data is transmitted in plain text (unencrypted)",
      "It uses too much bandwidth",
      "It only works on Windows"
    ],
    correct: 1
  },
  
  // Email Protocols
  {
    id: 11,
    question: "What does SMTP stand for?",
    options: [
      "Simple Mail Transfer Protocol",
      "Secure Mail Transfer Protocol",
      "Standard Mail Text Protocol",
      "Simple Message Transfer Protocol"
    ],
    correct: 0
  },
  {
    id: 12,
    question: "What is SMTP primarily used for?",
    options: [
      "Receiving emails",
      "Sending emails",
      "Storing emails",
      "Encrypting emails"
    ],
    correct: 1
  },
  {
    id: 13,
    question: "What does POP3 stand for?",
    options: [
      "Post Office Protocol version 3",
      "Personal Office Protocol version 3",
      "Public Office Protocol version 3",
      "Private Office Protocol version 3"
    ],
    correct: 0
  },
  {
    id: 14,
    question: "What does IMAP stand for?",
    options: [
      "Internet Mail Access Protocol",
      "Internal Mail Access Protocol",
      "International Mail Access Protocol",
      "Instant Mail Access Protocol"
    ],
    correct: 0
  },
  {
    id: 15,
    question: "What is the main difference between POP3 and IMAP?",
    options: [
      "POP3 is faster than IMAP",
      "IMAP keeps emails on server, POP3 downloads them locally",
      "POP3 is more secure than IMAP",
      "IMAP is older than POP3"
    ],
    correct: 1
  },
  
  // Other Network Protocols
  {
    id: 16,
    question: "What does DNS stand for?",
    options: [
      "Domain Name System",
      "Dynamic Name System",
      "Domain Network System",
      "Digital Name System"
    ],
    correct: 0
  },
  {
    id: 17,
    question: "What is the primary function of DNS?",
    options: [
      "Encrypt web traffic",
      "Convert domain names to IP addresses",
      "Transfer files between servers",
      "Send emails"
    ],
    correct: 1
  },
  {
    id: 18,
    question: "What does DHCP stand for?",
    options: [
      "Dynamic Host Configuration Protocol",
      "Domain Host Configuration Protocol",
      "Dynamic Hardware Configuration Protocol",
      "Digital Host Configuration Protocol"
    ],
    correct: 0
  },
  {
    id: 19,
    question: "What is DHCP used for?",
    options: [
      "Encrypting network traffic",
      "Automatically assigning IP addresses to devices",
      "Transferring files",
      "Sending emails"
    ],
    correct: 1
  },
  {
    id: 20,
    question: "What does SSH stand for?",
    options: [
      "Secure Shell",
      "Simple Shell",
      "System Shell",
      "Standard Shell"
    ],
    correct: 0
  },
  
  // Advanced Protocol Concepts
  {
    id: 21,
    question: "What is the default port for SSH?",
    options: ["21", "22", "23", "25"],
    correct: 1
  },
  {
    id: 22,
    question: "What does TCP stand for?",
    options: [
      "Transmission Control Protocol",
      "Transfer Control Protocol",
      "Transport Control Protocol",
      "Terminal Control Protocol"
    ],
    correct: 0
  },
  {
    id: 23,
    question: "What does UDP stand for?",
    options: [
      "Universal Data Protocol",
      "User Datagram Protocol",
      "Unified Data Protocol",
      "Universal Datagram Protocol"
    ],
    correct: 1
  },
  {
    id: 24,
    question: "What is the main difference between TCP and UDP?",
    options: [
      "TCP is faster than UDP",
      "TCP is reliable and connection-oriented, UDP is faster but unreliable",
      "UDP is more secure than TCP",
      "TCP is newer than UDP"
    ],
    correct: 1
  },
  {
    id: 25,
    question: "Which protocol is commonly used for video streaming?",
    options: [
      "TCP because it's reliable",
      "UDP because speed is more important than reliability",
      "FTP for file transfer",
      "SMTP for messaging"
    ],
    correct: 1
  }
];