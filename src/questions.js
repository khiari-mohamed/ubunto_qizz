export const questions = [
  // OS Basics - Very Simple
  {
    id: 1,
    question: "What is an Operating System?",
    options: [
      "A computer game",
      "Software that manages computer hardware and software",
      "A web browser",
      "A mobile app"
    ],
    correct: 1
  },
  {
    id: 2,
    question: "Which of these is an Operating System?",
    options: ["Microsoft Word", "Google Chrome", "Windows", "Photoshop"],
    correct: 2
  },
  {
    id: 3,
    question: "What is Ubuntu?",
    options: [
      "A programming language",
      "An operating system based on Linux",
      "A web browser",
      "A mobile phone"
    ],
    correct: 1
  },
  {
    id: 4,
    question: "Ubuntu is:",
    options: ["Paid software", "Free and open source", "Only for phones", "Made by Microsoft"],
    correct: 1
  },
  {
    id: 5,
    question: "What does 'open source' mean?",
    options: [
      "The software is expensive",
      "The source code is freely available",
      "Only experts can use it",
      "It requires internet connection"
    ],
    correct: 1
  },
  
  // VirtualBox/VMware Basics
  {
    id: 6,
    question: "What is VirtualBox?",
    options: [
      "A storage device",
      "Software to create virtual machines",
      "An antivirus program",
      "A web browser"
    ],
    correct: 1
  },
  {
    id: 7,
    question: "What is a Virtual Machine (VM)?",
    options: [
      "A physical computer",
      "A simulated computer running inside your real computer",
      "A gaming console",
      "A mobile app"
    ],
    correct: 1
  },
  {
    id: 8,
    question: "Why use a Virtual Machine to install Ubuntu?",
    options: [
      "To make the computer faster",
      "To test Ubuntu without changing your main system",
      "To play games",
      "To browse the internet"
    ],
    correct: 1
  },
  {
    id: 9,
    question: "What do you need to install Ubuntu in VirtualBox?",
    options: [
      "An Ubuntu ISO file",
      "A Windows CD",
      "An Android app",
      "A USB cable"
    ],
    correct: 0
  },
  {
    id: 10,
    question: "What is an ISO file?",
    options: [
      "A music file",
      "A disk image file containing the operating system",
      "A video file",
      "A text document"
    ],
    correct: 1
  },
  
  // Installation Process
  {
    id: 11,
    question: "When creating a VM in VirtualBox, you should select:",
    options: ["Windows XP", "Ubuntu (64-bit)", "Android", "DOS"],
    correct: 1
  },
  {
    id: 12,
    question: "How much RAM should you allocate to Ubuntu VM?",
    options: ["At least 2 GB", "100 MB", "All available RAM", "500 MB"],
    correct: 0
  },
  {
    id: 13,
    question: "What happens if you give too much RAM to the VM?",
    options: [
      "VM runs faster",
      "Your main system becomes slow",
      "Nothing changes",
      "Computer shuts down"
    ],
    correct: 1
  },
  {
    id: 14,
    question: "During Ubuntu installation, what is the root partition '/'?",
    options: [
      "User files folder",
      "The main system partition",
      "Temporary files",
      "Games folder"
    ],
    correct: 1
  },
  {
    id: 15,
    question: "What is swap space in Ubuntu?",
    options: [
      "Extra storage for photos",
      "Virtual memory when RAM is full",
      "Internet cache",
      "System backup"
    ],
    correct: 1
  },
  
  // Ubuntu Basics
  {
    id: 16,
    question: "What is GNOME in Ubuntu?",
    options: [
      "A game",
      "The desktop environment (graphical interface)",
      "An antivirus",
      "A web browser"
    ],
    correct: 1
  },
  {
    id: 17,
    question: "How do you open the terminal in Ubuntu?",
    options: [
      "Ctrl + Alt + T",
      "Ctrl + C",
      "Alt + F4",
      "Ctrl + Z"
    ],
    correct: 0
  },
  {
    id: 18,
    question: "What is the terminal?",
    options: [
      "A game",
      "A text-based interface to give commands",
      "A web browser",
      "A music player"
    ],
    correct: 1
  },
  {
    id: 19,
    question: "The 'ls' command in Ubuntu is used to:",
    options: [
      "Delete files",
      "List files and folders",
      "Create folders",
      "Shut down computer"
    ],
    correct: 1
  },
  {
    id: 20,
    question: "What does 'sudo' mean in Ubuntu commands?",
    options: [
      "Save file",
      "Run command as administrator",
      "Delete everything",
      "Open browser"
    ],
    correct: 1
  },
  
  // Practical Installation Steps
  {
    id: 21,
    question: "First step to install Ubuntu in VirtualBox:",
    options: [
      "Create user account",
      "Download Ubuntu ISO and create new VM",
      "Install software",
      "Connect to internet"
    ],
    correct: 1
  },
  {
    id: 22,
    question: "During Ubuntu installation, you should:",
    options: [
      "Skip all steps",
      "Choose language and create user account",
      "Only click Next",
      "Turn off computer"
    ],
    correct: 1
  },
  {
    id: 23,
    question: "After installing Ubuntu, what appears on screen?",
    options: [
      "Black screen only",
      "Desktop with icons and taskbar",
      "Error messages",
      "Windows desktop"
    ],
    correct: 1
  },
  {
    id: 24,
    question: "To share files between your main computer and Ubuntu VM:",
    options: [
      "Use shared folders",
      "Use email",
      "Impossible to do",
      "Restart computer"
    ],
    correct: 0
  },
  {
    id: 25,
    question: "Ubuntu is based on which Linux distribution?",
    options: ["Red Hat", "Debian", "Fedora", "Arch"],
    correct: 1
  },
  
  // BIOS and Virtualization
  {
    id: 26,
    question: "How do you access BIOS on most computers?",
    options: [
      "Press F10 or ESC key during startup",
      "Click Start menu",
      "Open Control Panel",
      "Right-click desktop"
    ],
    correct: 0
  },
  {
    id: 27,
    question: "What must be enabled in BIOS to run VirtualBox properly?",
    options: [
      "Fast Boot",
      "Virtualization Technology (VT-x/AMD-V)",
      "Secure Boot",
      "Legacy Mode"
    ],
    correct: 1
  },
  {
    id: 28,
    question: "Why is virtualization technology important for VirtualBox?",
    options: [
      "To make computer boot faster",
      "To allow hardware-assisted virtual machines to run efficiently",
      "To improve internet speed",
      "To save battery life"
    ],
    correct: 1
  }
];