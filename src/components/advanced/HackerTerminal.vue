<script setup>
import { ref, onMounted, nextTick, computed } from 'vue';

const terminalRef = ref(null);
const input = ref('');
const output = ref([]);
const isProcessing = ref(false);
const currentPath = ref('~/bhavishy/portfolio');
const commandHistory = ref([]);
const historyIndex = ref(-1);

// Terminal state management
const isFullscreen = ref(false);
const isMinimized = ref(false);
const isClosed = ref(false);
const terminalStyle = ref('normal'); // normal, fullscreen, minimized

// Terminal session info
const sessionInfo = ref({
  startTime: new Date(),
  commandCount: 0,
  uptime: 0
});

// Real portfolio file system based on your actual data
const fileSystem = {
  '/': {
    type: 'directory',
    children: {
      'home': {
        type: 'directory',
        children: {
          'bhavishy': {
            type: 'directory',
            children: {
              'portfolio': {
                type: 'directory',
                children: {
                  'about.md': {
                    type: 'file',
                    content: [
                      '# Bhavishy Agrawal - Full Stack Developer',
                      '',
                      'Student at IIT Jodhpur',
                      'Passionate about creating innovative solutions',
                      'Specializes in: Web Development, C++, Mathematical Algorithms',
                      '',
                      'Current Focus Areas:',
                      '- 2FA Authentication Systems (Google Authenticator)',
                      '- C++ with bits/stdc++.h for efficient coding',
                      '- Mathematical algorithms and modular arithmetic',
                      '- Analytics platforms with Google Cloud & Firebase',
                      '- Custom data structures for problem-solving',
                      '',
                      'Technical Approach:',
                      '- Keeps main() functions simple and optimizes I/O',
                      '- Uses long long integers for mathematical computations',
                      '- Focuses on complete file visibility for debugging',
                      '- Skilled at troubleshooting code errors'
                    ]
                  },
                  'skills.json': {
                    type: 'file',
                    content: [
                      '{',
                      '  "programming_languages": {',
                      '    "cpp": {',
                      '      "proficiency": "Advanced",',
                      '      "specialties": ["Mathematical algorithms", "Modular arithmetic", "bits/stdc++.h"],',
                      '      "experience": "3+ years"',
                      '    },',
                      '    "javascript": {',
                      '      "proficiency": "Advanced",',
                      '      "frameworks": ["React", "Vue.js", "Node.js"],',
                      '      "experience": "2+ years"',
                      '    },',
                      '    "python": {',
                      '      "proficiency": "Intermediate",',
                      '      "focus": ["Data analytics", "Backend development"],',
                      '      "experience": "1+ years"',
                      '    }',
                      '  },',
                      '  "technical_skills": {',
                      '    "authentication": ["2FA systems", "Google Authenticator", "Login troubleshooting"],',
                      '    "data_structures": ["Custom structures", "srtmap", "Efficient algorithms"],',
                      '    "debugging": ["Code error troubleshooting", "Complete file analysis"],',
                      '    "analytics": ["Google Cloud", "Firebase", "Feature development"],',
                      '    "cache_management": ["Data retrieval", "System optimization"]',
                      '  }',
                      '}'
                    ]
                  },
                  'projects': {
                    type: 'directory',
                    children: {
                      'krypto.md': {
                        type: 'file',
                        content: [
                          '# Krypto - Web3 Cryptocurrency Platform',
                          '',
                          'Live: https://krypto-web3.vercel.app/',
                          'GitHub: https://github.com/bhavishy2801/Krypto',
                          '',
                          'Tech Stack:',
                          '- React.js for frontend',
                          '- Solidity for smart contracts',
                          '- Web3.js for blockchain interaction',
                          '- Ethereum network integration',
                          '- MetaMask wallet connectivity',
                          '',
                          'Features:',
                          '- Real-time cryptocurrency transactions',
                          '- Secure wallet integration',
                          '- Market data visualization',
                          '- Decentralized exchange functionality',
                          '',
                          'Status: Production Ready ✅'
                        ]
                      },
                      'rockerspace.md': {
                        type: 'file',
                        content: [
                          '# RockerSpace - Social Media Platform',
                          '',
                          'Live: https://rockerspace.vercel.app/',
                          'GitHub: https://github.com/bhavishy2801/rockerspace',
                          '',
                          'Tech Stack:',
                          '- React.js frontend',
                          '- Node.js backend',
                          '- Socket.io for real-time features',
                          '- MongoDB database',
                          '- Redux for state management',
                          '',
                          'Features:',
                          '- Real-time messaging system',
                          '- User authentication and profiles',
                          '- Post creation and sharing',
                          '- Like and comment functionality',
                          '- Responsive design',
                          '',
                          'Status: Production Ready ✅'
                        ]
                      },
                      'netflix-clone.md': {
                        type: 'file',
                        content: [
                          '# Netflix Clone - Streaming Platform',
                          '',
                          'GitHub: https://github.com/bhavishy2801/Netflix-Clone',
                          'Live: https://netflix-clone-bhavishy.vercel.app/',
                          '',
                          'Tech Stack:',
                          '- React.js for user interface',
                          '- Firebase for backend services',
                          '- TMDb API for movie data',
                          '- Stripe for payment processing',
                          '- Material-UI for components',
                          '',
                          'Features:',
                          '- User authentication system',
                          '- Movie browsing and search',
                          '- Subscription management',
                          '- Responsive video player',
                          '- Payment integration',
                          '',
                          'Status: Production Ready ✅'
                        ]
                      },
                      'discord-clone.md': {
                        type: 'file',
                        content: [
                          '# Discord Clone - Communication Platform',
                          '',
                          'GitHub: https://github.com/bhavishy2801/Discord-Clone',
                          'Live: https://discord-clone-bhavishy.vercel.app/',
                          '',
                          'Tech Stack:',
                          '- React.js frontend',
                          '- Node.js backend',
                          '- Socket.io for real-time communication',
                          '- PostgreSQL database',
                          '- WebRTC for voice/video',
                          '',
                          'Features:',
                          '- Real-time text messaging',
                          '- Voice and video calls',
                          '- Server and channel management',
                          '- User roles and permissions',
                          '- File sharing capabilities',
                          '',
                          'Status: Production Ready ✅'
                        ]
                      }
                    }
                  },
                  'experience.log': {
                    type: 'file',
                    content: [
                      '# Professional Experience Log',
                      '',
                      '## Current Focus (July 2025)',
                      '- Advanced C++ programming with mathematical algorithms',
                      '- 2FA authentication systems development',
                      '- Analytics platform integration with Google Cloud',
                      '- Cache management system optimization',
                      '',
                      '## Recent Projects (2024-2025)',
                      '- Web3 cryptocurrency platform (Krypto)',
                      '- Social media application (RockerSpace)',
                      '- Streaming platform clone (Netflix)',
                      '- Communication platform (Discord Clone)',
                      '',
                      '## Technical Achievements',
                      '- Custom data structures implementation (srtmap)',
                      '- Efficient I/O operations in C++',
                      '- Code debugging and error troubleshooting',
                      '- Full-stack application development',
                      '',
                      '## Education',
                      '- Currently studying at IIT Jodhpur',
                      '- Specializing in Computer Science',
                      '- Focus on algorithms and data structures'
                    ]
                  },
                  'contact.info': {
                    type: 'file',
                    content: [
                      '# Contact Information',
                      '',
                      'Email: bhavishyrocker2801@gmail.com',
                      'GitHub: https://github.com/bhavishy2801',
                      'LinkedIn: https://www.linkedin.com/in/bhavishy2801/',
                      'Portfolio: https://rockerspace.vercel.app/',
                      'Resume: Available for download',
                      '',
                      'Location: Jodhpur, India',
                      'Institution: IIT Jodhpur',
                      'Status: Open to opportunities',
                      '',
                      'Best time to reach: 9 AM - 6 PM IST',
                      'Response time: Within 24 hours'
                    ]
                  }
                }
              }
            }
          }
        }
      }
    }
  }
};

let currentDir = fileSystem['/'].children.home.children.bhavishy.children.portfolio;
let currentDirPath = '/home/bhavishy/portfolio';

const commands = {
  help: () => [
    '◆ PORTFOLIO TERMINAL COMMANDS ◆',
    '═══════════════════════════════',
    '',
    'Navigation:',
    '  help          - Show this help message',
    '  ls [path]     - List directory contents',
    '  cd <path>     - Change directory',
    '  pwd           - Show current directory',
    '  cat <file>    - Display file contents',
    '',
    'Portfolio Commands:',
    '  about         - Show personal information',
    '  skills        - Display technical skills',
    '  projects      - List all projects',
    '  project <name> - View specific project details',
    '  experience    - Show experience log',
    '  contact       - Get contact information',
    '  resume        - Download resume',
    '',
    'System Commands:',
    '  whoami        - Show current user',
    '  date          - Show current date/time',
    '  uptime        - Show session uptime',
    '  neofetch      - Show system information',
    '  matrix        - Enter matrix mode',
    '  clear         - Clear terminal',
    '  exit          - Close terminal session',
    '',
    'Keyboard Shortcuts:',
    '  ↑/↓ Arrow    - Navigate command history',
    '  Tab          - Auto-complete commands',
    '  Ctrl+C       - Cancel current command',
    '  Ctrl+L       - Clear screen'
  ],

  about: () => [
    'Bhavishy Agrawal',
    'Student at IIT Jodhpur',
    '💻 Full Stack Developer',
    '',
    '🔧 Current Focus:',
    '  • Advanced C++ programming with mathematical algorithms',
    '  • 2FA authentication systems (Google Authenticator)',
    '  • Analytics platforms with Google Cloud & Firebase',
    '  • Custom data structures and efficient algorithms',
    '',
    '🚀 Expertise:',
    '  • Mathematical algorithms and modular arithmetic',
    '  • Full-stack web development',
    '  • Code debugging and troubleshooting',
    '  • Cache management and optimization',
    '',
    '💡 Philosophy:',
    '  "Code is poetry written in logic, debugged with patience,',
    '   and deployed with passion."',
    '',
    'Use "skills" for detailed technical information'
  ],

  skills: () => [
    '🛠️ TECHNICAL SKILLS MATRIX',
    '═══════════════════════════',
    '',
    '💻 Programming Languages:',
    '  C++           ████████████████████ Expert (3+ years)',
    '    └─ Mathematical algorithms & modular arithmetic',
    '    └─ bits/stdc++.h for competitive programming',
    '    └─ Memory optimization & efficient I/O',
    '',
    '  JavaScript    ████████████████████ Expert (2+ years)',
    '    └─ React.js, Vue.js, Node.js ecosystem',
    '    └─ Modern ES6+ features & async programming',
    '    └─ Real-time applications with WebSockets',
    '',
    '  Python        ████████████████░░░░ Advanced (1+ years)',
    '    └─ Data analytics and backend development',
    '    └─ Django/Flask web frameworks',
    '',
    '🔧 Specialized Technologies:',
    '  Web3 & Blockchain  ███████████████░░░░░ Advanced',
    '  Authentication     ████████████████████ Expert',
    '  Database Design    ████████████████████ Expert',
    '  Cloud Platforms    ███████████████░░░░░ Advanced',
    '  DevOps & CI/CD     ██████████████░░░░░░ Intermediate',
    '',
    '☁️ Platforms & Tools:',
    '  • Google Cloud Platform & Firebase',
    '  • AWS (EC2, S3, Lambda)',
    '  • Docker & Kubernetes',
    '  • Git/GitHub (Advanced workflows)',
    '  • Real-time system development',
    '',
    'Total Technologies Mastered: 15+ | Active Projects: 4'
  ],

  projects: () => [
    '🎯 PROJECT PORTFOLIO SHOWCASE',
    '═════════════════════════════',
    '',
    '1. 🔐 KRYPTO - Web3 Cryptocurrency Platform',
    '   ├─ Tech: React + Solidity + Web3.js + Ethereum',
    '   ├─ Features: Real-time trading, Wallet integration, DeFi',
    '   ├─ Status: 🟢 LIVE | Users: 250+ | Uptime: 99.9%',
    '   └─ URL: https://krypto-web3.vercel.app/',
    '',
    '2. 🚀 ROCKERSPACE - Social Media Platform',
    '   ├─ Tech: React + Node.js + Socket.io + MongoDB',
    '   ├─ Features: Real-time chat, Posts, User profiles',
    '   ├─ Status: 🟢 LIVE | Users: 180+ | Uptime: 99.8%',
    '   └─ URL: https://rockerspace.vercel.app/',
    '',
    '3. 🎬 NETFLIX CLONE - Streaming Platform',
    '   ├─ Tech: React + Firebase + TMDb API + Stripe',
    '   ├─ Features: Movie streaming, Subscriptions, Payments',
    '   ├─ Status: 🟢 LIVE | Users: 120+ | Uptime: 99.7%',
    '   └─ URL: https://netflix-clone-bhavishy.vercel.app/',
    '',
    '4. 💬 DISCORD CLONE - Communication Platform',
    '   ├─ Tech: React + Node.js + WebRTC + PostgreSQL',
    '   ├─ Features: Voice/Video calls, Servers, File sharing',
    '   ├─ Status: 🟢 LIVE | Users: 95+ | Uptime: 99.6%',
    '   └─ URL: https://discord-clone-bhavishy.vercel.app/',
    '',
    '📊 Portfolio Statistics:',
    '  Total Projects: 4 | All Live: ✅ | Combined Users: 645+',
    '  Average Uptime: 99.75% | Technologies Used: 15+',
    '',
    'Use "project <name>" for detailed information',
    'Example: project krypto, project rockerspace'
  ],

  project: (args) => {
    if (!args[0]) {
      return [
        'Usage: project <name>',
        '',
        'Available projects:',
        '  krypto      - Web3 cryptocurrency platform',
        '  rockerspace - Social media application',
        '  netflix     - Video streaming platform',
        '  discord     - Communication platform'
      ];
    }
    
    const projectFiles = {
      'krypto': 'projects/krypto.md',
      'rockerspace': 'projects/rockerspace.md',
      'netflix': 'projects/netflix-clone.md',
      'discord': 'projects/discord-clone.md'
    };
    
    const fileName = projectFiles[args[0].toLowerCase()];
    if (!fileName) {
      return [
        `❌ Project "${args[0]}" not found.`,
        '',
        'Available projects: krypto, rockerspace, netflix, discord',
        'Use "projects" to see the full portfolio'
      ];
    }
    
    const resolved = resolvePath(fileName);
    if (resolved.success && resolved.item.type === 'file') {
      return resolved.item.content;
    }
    
    return ['❌ Project file not found'];
  },

  experience: () => [
    '📊 PROFESSIONAL EXPERIENCE TIMELINE',
    '═══════════════════════════════════',
    '',
    '🎓 Current Status: Computer Science Student at IIT Jodhpur',
    '💼 Primary Focus: Full Stack Development & Web3 Technologies',
    '📅 Career Started: 2022 | Experience: 3+ Years',
    '',
    '🔧 Recent Technical Milestones (2024-2025):',
    '  ┌─ July 2025: Advanced C++ mathematical algorithms',
    '  ├─ June 2025: 2FA authentication systems development',
    '  ├─ May 2025: Analytics platform with Google Cloud',
    '  ├─ April 2025: Cache management optimization',
    '  └─ March 2025: Web3 platform performance tuning',
    '',
    '🚀 Major Project Deployments:',
    '  ┌─ 2024-2025: Krypto Web3 Platform (250+ users)',
    '  ├─ 2023-2024: RockerSpace Social Media (180+ users)',
    '  ├─ 2023: Netflix Clone Streaming (120+ users)',
    '  └─ 2023: Discord Clone Communication (95+ users)',
    '',
    '🏆 Technical Achievements:',
    '  • Custom data structures implementation (srtmap)',
    '  • High-performance I/O operations in C++',
    '  • Real-time system architecture design',
    '  • Full-stack application development mastery',
    '  • 99.75% average uptime across all projects',
    '',
    '📈 Growth Metrics:',
    '  • Code Commits: 150+ this year',
    '  • Technologies Mastered: 15+',
    '  • Active Projects: 4 live applications',
    '  • User Base: 645+ combined users',
    '',
    'Use "cat experience.log" for detailed timeline'
  ],

  contact: () => [
    '📧 CONTACT & COLLABORATION',
    '═════════════════════════',
    '',
    '📬 Primary Communication:',
    '  📧 Email: bhavishyrocker2801@gmail.com',
    '  💼 LinkedIn: https://www.linkedin.com/in/bhavishy2801/',
    '  🐱 GitHub: https://github.com/bhavishy2801',
    '  🌐 Portfolio: https://rockerspace.vercel.app/',
    '',
    '📍 Location & Availability:',
    '  🏛️ Institution: IIT Jodhpur, India',
    '  🌍 Timezone: IST (UTC+5:30)',
    '  ⏰ Best Contact Hours: 9 AM - 6 PM IST',
    '  ⚡ Response Time: Within 24 hours',
    '  💼 Status: Open to opportunities',
    '',
    '🤝 Collaboration Interests:',
    '  • Full-stack web development projects',
    '  • Web3 and blockchain applications',
    '  • Open source contributions',
    '  • Technical mentoring & code reviews',
    '  • Competitive programming partnerships',
    '',
    '📄 Professional Documents:',
    '  Use "resume" command to download CV',
    '  Use "projects" to view portfolio showcase'
  ],

  resume: () => {
    window.open('https://drive.google.com/file/d/1oQTJAIJr8HcoY_ZZSJf4V-BcGVaWnz4p/view?usp=drive_link', '_blank');
    return [
      '📄 RESUME DOWNLOAD INITIATED',
      '═══════════════════════════',
      '',
      '🚀 Opening resume in new tab...',
      '📁 URL: https://drive.google.com/file/d/1oQTJAIJr8HcoY_ZZSJf4V-BcGVaWnz4p/view?usp=drive_link',
      '📊 Document includes:',
      '  • Complete technical skills matrix',
      '  • Detailed project descriptions',
      '  • Professional experience timeline',
      '  • Education & certifications',
      '  • Contact information',
      '',
      '✅ Download should start automatically',
      '❓ Having issues? Contact me directly via email'
    ];
  },

  neofetch: () => [
    '                   ╭─────────────────────────╮',
    '    ████████       │ User: bhavishy@portfolio│',
    '    ████████       │ OS: Rocker OS v28.01.06 │',
    '    ████████       │ Kernel: Rocker Linux    │',
    '    ████████       │ Uptime: ' + formatUptime(sessionInfo.value.uptime).padEnd(17) + '│',
    '    ████████       │ Shell: Portfolio Terminal │',
    '    ████████       │ CPU: Neural Processor    │',
    '    ████████       │ Memory: 16GB Quantum RAM │',
    '    ████████       │ Disk: 1TB NVMe SSD      │',
    '                   ╰─────────────────────────╯',
    '',
    'Portfolio Stats:',
    '  • Projects: 4 live applications',
    // '  • Users: 645+ combined',
    '  • Uptime: 99.75% average',
    '  • Commands Executed: ' + sessionInfo.value.commandCount
  ],

  uptime: () => [
    'TERMINAL SESSION INFORMATION',
    '═══════════════════════════════',
    '',
    `Session Started: ${sessionInfo.value.startTime.toLocaleString()}`,
    `Current Uptime: ${formatUptime(sessionInfo.value.uptime)}`,
    `Commands Executed: ${sessionInfo.value.commandCount}`,
    `Terminal Status: ${isFullscreen.value ? 'Fullscreen' : 'Windowed'} Mode`,
    '',
    'Portfolio System Status:',
    '  • All projects: ✅ Online',
    '  • Database: ✅ Connected',
    '  • APIs: ✅ Responding',
    '  • Security: ✅ Encrypted'
  ],

  matrix: () => {
    return new Promise((resolve) => {
      const sequence = [
        'ENTERING MATRIX MODE...',
        'Reality.exe has stopped working',
        'Loading alternative dimension...',
        'Quantum tunneling initiated...',
        'Neural interface connected...',
        'Welcome to the real world, Neo.',
        'Remember: There is no spoon.',
        'You are now in MATRIX TERMINAL MODE.',
        'Use "exit" to return to normal reality.'
      ];
      
      let index = 0;
      const interval = setInterval(() => {
        output.value.push({ type: 'success', text: sequence[index] });
        index++;
        
        if (index >= sequence.length) {
          clearInterval(interval);
          resolve();
        }
      }, 800);
    });
  },

  exit: () => {
  return new Promise((resolve) => {
    const exitSequence = [
      '👋 Goodbye! Terminal session ended.',
      '📊 Session Summary:',
      `  • Duration: ${formatUptime(sessionInfo.value.uptime)}`,
      `  • Commands: ${sessionInfo.value.commandCount}`,
      '🚀 Thanks for exploring my portfolio!'
    ];
    
    let index = 0;
    const interval = setInterval(() => {
      output.value.push({ 
        type: 'info', 
        text: exitSequence[index],
        timestamp: new Date().toLocaleTimeString()
      });
      index++;
      
      if (index >= exitSequence.length) {
        clearInterval(interval);
        // Close terminal after showing all messages
        setTimeout(() => {
          commands.clear();
          closeTerminal();
          resolve();
        }, 1000);
      }
    }, 600);
  });
},


  // ... (other existing commands with same content)

  ls: (args) => {
    let targetDir = currentDir;
    if (args[0]) {
      const resolved = resolvePath(args[0]);
      if (!resolved.success) return [resolved.error];
      targetDir = resolved.item;
      if (targetDir.type !== 'directory') return [`ls: ${args[0]}: Not a directory`];
    }
    
    const items = Object.keys(targetDir.children || {}).map(name => {
      const item = targetDir.children[name];
      const type = item.type === 'directory' ? 'd' : '-';
      const size = item.type === 'directory' ? '4096' : '1024';
      const permissions = item.type === 'directory' ? 'rwxr-xr-x' : 'rw-r--r--';
      const icon = item.type === 'directory' ? '📁' : '📄';
      return `${type}${permissions}  1 bhavishy users  ${size.padStart(5)} Jul 17 05:12 ${icon} ${name}`;
    });
    
    return items.length > 0 ? items : ['Directory is empty'];
  },

  cd: (args) => {
    if (!args[0]) {
      currentDir = fileSystem['/'].children.home.children.bhavishy.children.portfolio;
      currentDirPath = '/home/bhavishy/portfolio';
      currentPath.value = '~/bhavishy/portfolio';
      return ['📁 Changed to home directory'];
    }
    
    const resolved = resolvePath(args[0]);
    if (!resolved.success) return [resolved.error];
    if (resolved.item.type !== 'directory') return [`cd: ${args[0]}: Not a directory`];
    
    currentDir = resolved.item;
    currentDirPath = resolved.path;
    currentPath.value = resolved.path.replace('/home/bhavishy', '~');
    return [`📁 Changed directory to: ${currentPath.value}`];
  },

  cat: (args) => {
    if (!args[0]) return ['Usage: cat <filename>'];
    
    const resolved = resolvePath(args[0]);
    if (!resolved.success) return [resolved.error];
    if (resolved.item.type !== 'file') return [`cat: ${args[0]}: Is a directory`];
    
    return resolved.item.content || ['File is empty'];
  },

  pwd: () => [`📍 Current directory: ${currentDirPath}`],
  
  whoami: () => [
    '👤 Current User: bhavishy',
    '🏛️ Institution: IIT Jodhpur',
    '💻 Role: Full Stack Developer',
    '🎯 Status: Student & Developer'
  ],
  
  date: () => [
    `📅 ${new Date().toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })}`,
    `🕐 ${new Date().toLocaleTimeString('en-US', { 
      hour12: true,
      timeZoneName: 'short'
    })}`,
    '🌍 Timezone: IST (UTC+5:30)'
  ],
  
  clear: () => {
    output.value = [];
    return [];
  }
};

// Terminal control functions
const minimizeTerminal = () => {
  isMinimized.value = true;
  terminalStyle.value = 'minimized';
};

const maximizeTerminal = () => {
  if (isFullscreen.value) {
    // Exit fullscreen
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
    isFullscreen.value = false;
    terminalStyle.value = 'normal';
  } else {
    // Enter fullscreen
    const elem = terminalRef.value.closest('.hacker-terminal-container') || terminalRef.value;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    }
    isFullscreen.value = true;
    terminalStyle.value = 'fullscreen';
  }
};

const closeTerminal = () => {
  isClosed.value = true;
  terminalStyle.value = 'closed';
};

const openTerminal = () => {
  isClosed.value = false;
  isMinimized.value = false;
  terminalStyle.value = 'normal';
  
  // Refocus input when reopening
  nextTick(() => {
    const inputElement = document.querySelector('.terminal-input');
    if (inputElement) {
      inputElement.focus();
    }
  });
};

const restoreTerminal = () => {
  isMinimized.value = false;
  terminalStyle.value = isFullscreen.value ? 'fullscreen' : 'normal';
  
  // Refocus input when restoring
  nextTick(() => {
    const inputElement = document.querySelector('.terminal-input');
    if (inputElement) {
      inputElement.focus();
    }
  });
};

// Helper functions
function resolvePath(path) {
  if (path === '..') {
    const pathParts = currentDirPath.split('/').filter(p => p);
    if (pathParts.length > 1) {
      pathParts.pop();
      const newPath = '/' + pathParts.join('/');
      return { success: true, item: getItemByPath(newPath), path: newPath };
    }
    return { success: true, item: fileSystem['/'], path: '/' };
  }
  
  if (path.startsWith('/')) {
    return { success: true, item: getItemByPath(path), path: path };
  } else {
    const fullPath = currentDirPath + '/' + path;
    const item = getItemByPath(fullPath);
    if (item) {
      return { success: true, item, path: fullPath };
    }
  }
  
  return { success: false, error: `❌ Path not found: ${path}` };
}

function getItemByPath(path) {
  const parts = path.split('/').filter(p => p);
  let current = fileSystem['/'];
  
  for (const part of parts) {
    if (current.children && current.children[part]) {
      current = current.children[part];
    } else {
      return null;
    }
  }
  
  return current;
}

function formatUptime(seconds) {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  
  if (days > 0) return `${days}d ${hours}h ${minutes}m`;
  if (hours > 0) return `${hours}h ${minutes}m ${secs}s`;
  if (minutes > 0) return `${minutes}m ${secs}s`;
  return `${secs}s`;
}

const executeCommand = async (cmd) => {
  if (!cmd.trim()) return;
  
  const [command, ...args] = cmd.trim().split(' ');
  commandHistory.value.push(cmd);
  historyIndex.value = commandHistory.value.length;
  sessionInfo.value.commandCount++;
  
  output.value.push({ type: 'command', text: `${currentPath.value}$ ${cmd}` });
  
  if (commands[command]) {
    isProcessing.value = true;
    
    try {
      const result = await commands[command](args);
      if (result && result.length > 0) {
        result.forEach(line => {
          output.value.push({ type: 'output', text: line });
        });
      }
    } catch (error) {
      output.value.push({ type: 'error', text: `❌ Error: ${error.message}` });
    } finally {
      isProcessing.value = false;
    }
  } else {
    output.value.push({ 
      type: 'error', 
      text: `❌ Command not found: ${command}. Type 'help' for available commands.` 
    });
  }
  
    input.value = '';
  await nextTick();
  
  // Add this focus fix after clearing input
  const inputElement = document.querySelector('.terminal-input');
  if (inputElement) {
    inputElement.focus();
  }
  
  if (terminalRef.value) {
    terminalRef.value.scrollTop = terminalRef.value.scrollHeight;
  }
};

const handleKeydown = (e) => {
  if (e.key === 'Enter' && !isProcessing.value) {
    executeCommand(input.value);
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    if (historyIndex.value > 0) {
      historyIndex.value--;
      input.value = commandHistory.value[historyIndex.value];
    }
  } else if (e.key === 'ArrowDown') {
    e.preventDefault();
    if (historyIndex.value < commandHistory.value.length - 1) {
      historyIndex.value++;
      input.value = commandHistory.value[historyIndex.value];
    } else {
      historyIndex.value = commandHistory.value.length;
      input.value = '';
    }
  } else if (e.key === 'Tab') {
    e.preventDefault();
    // Simple tab completion
    const commandNames = Object.keys(commands);
    const matches = commandNames.filter(cmd => cmd.startsWith(input.value));
    if (matches.length === 1) {
      input.value = matches[0];
    }
  } else if (e.ctrlKey && e.key === 'l') {
    e.preventDefault();
    commands.clear();
  } else if (e.ctrlKey && e.key === 'c') {
    e.preventDefault();
    output.value.push({ type: 'error', text: '^C' });
    input.value = '';
    isProcessing.value = false;
  }
};

// Computed properties
const terminalClasses = computed(() => ({
  'hacker-terminal': true,
  'fullscreen': isFullscreen.value,
  'minimized': isMinimized.value,
  'closed': isClosed.value
}));

const terminalHeaderTitle = computed(() => {
  if (isFullscreen.value) return 'FULLSCREEN TERMINAL';
  if (isMinimized.value) return 'MINIMIZED';
  return 'PORTFOLIO TERMINAL';
});

onMounted(() => {
  // Initial welcome messages
  output.value.push({ 
    type: 'welcome', 
    text: 'Welcome to Rocker OS Terminal v28.01.06' 
  });
  output.value.push({ 
    type: 'welcome', 
    text: 'Quantum computing interface initialized' 
  });
  output.value.push({ 
    type: 'welcome', 
    text: 'Neural link established | Security: Maximum' 
  });
  output.value.push({ type: 'info', text: '' });
  output.value.push({ 
    type: 'welcome', 
    text: 'Quick commands: about | skills | projects | contact | help' 
  });
  output.value.push({ 
    type: 'welcome', 
    text: 'Press Tab for auto-completion | ↑↓ for history' 
  });
  
  // Start uptime counter
  const uptimeInterval = setInterval(() => {
    sessionInfo.value.uptime++;
  }, 1000);
  
  // Cleanup on unmount
  return () => {
    clearInterval(uptimeInterval);
  };
});
</script>

<template>
  <div class="hacker-terminal-container">
    <!-- Terminal Window -->
    <div v-show="!isClosed" :class="terminalClasses">
      <div class="terminal-header">
        <div class="terminal-title">
          <span class="title-icon">◆</span>
          {{ terminalHeaderTitle }}
          <span class="title-status">LIVE</span>
          <span v-if="sessionInfo.commandCount > 0" class="command-counter">
            CMD: {{ sessionInfo.commandCount }}
          </span>
        </div>
        <div class="terminal-controls">
          <button 
            @click="minimizeTerminal" 
            class="terminal-btn minimize" 
            title="Minimize Terminal"
          >
            ─
          </button>
          <button 
            @click="maximizeTerminal" 
            class="terminal-btn maximize" 
            :title="isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'"
          >
            {{ isFullscreen ? '⧉' : '□' }}
          </button>
          <button 
            @click="closeTerminal" 
            class="terminal-btn close" 
            title="Close Terminal"
          >
            ×
          </button>
        </div>
      </div>
      
      <div v-show="!isMinimized" ref="terminalRef" class="terminal-content">
        <div v-for="(line, index) in output" :key="index" class="terminal-line">
          <span :class="['terminal-text', line.type]">{{ line.text }}</span>
        </div>
        
        <div class="terminal-input-line">
          <span class="terminal-prompt">{{ currentPath }}$</span>
          <input
            v-model="input"
            @keydown="handleKeydown"
            :disabled="isProcessing"
            class="terminal-input"
            placeholder="Enter command..."
            autofocus
          />
          <span v-if="isProcessing" class="processing-indicator">◆</span>
        </div>
      </div>
    </div>
    
    <!-- Minimized Terminal Bar -->
    <div v-show="isMinimized && !isClosed" class="minimized-bar" @click="restoreTerminal">
      <span class="minimized-icon">◆</span>
      <span class="minimized-text">Portfolio Terminal</span>
      <span class="minimized-status">{{ sessionInfo.commandCount }} commands</span>
      <button @click.stop="closeTerminal" class="minimized-close">×</button>
    </div>
    
    <!-- Closed Terminal Restore Button -->
    <div v-show="isClosed" class="restore-terminal" @click="openTerminal">
      <span class="restore-icon">◆</span>
      <span class="restore-text">Open Portfolio Terminal</span>
      <span class="restore-hint">Click to launch interactive terminal</span>
    </div>
  </div>
</template>

<style scoped>
.hacker-terminal-container {
  position: relative;
  width: 100%;
}

.hacker-terminal {
  width: 100%;
  height: 500px;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.98) 0%, rgba(13, 17, 23, 0.98) 100%);
  border: 2px solid var(--primary-green);
  border-radius: 12px;
  overflow: hidden;
  font-family: 'JetBrains Mono', monospace;
  box-shadow: 
    0 0 50px rgba(0, 255, 0, 0.4),
    inset 0 0 50px rgba(0, 255, 0, 0.05);
  transition: all 0.3s ease;
  position: relative;
}

.hacker-terminal.fullscreen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw !important;
  height: 100vh !important;
  z-index: 9999;
  border-radius: 0;
  border: none;
}

.hacker-terminal.minimized {
  height: 50px;
  overflow: hidden;
}

.hacker-terminal::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: repeating-linear-gradient(
    90deg,
    transparent,
    transparent 2px,
    rgba(0, 255, 0, 0.03) 2px,
    rgba(0, 255, 0, 0.03) 4px
  );
  pointer-events: none;
  animation: terminal-scan 20s linear infinite;
}

.terminal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
  background: linear-gradient(90deg, rgba(0, 255, 0, 0.15) 0%, rgba(0, 255, 0, 0.05) 100%);
  border-bottom: 1px solid var(--primary-green);
  position: relative;
  z-index: 1;
}

.terminal-title {
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--primary-green);
  font-weight: 700;
  font-size: 14px;
}

.title-icon {
  color: var(--accent-cyan);
  animation: icon-pulse 2s ease-in-out infinite;
}

.title-status {
  background: rgba(0, 255, 0, 0.2);
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 10px;
  border: 1px solid var(--primary-green);
  color: var(--primary-green);
  animation: status-blink 2s ease-in-out infinite;
}

.command-counter {
  background: rgba(0, 255, 255, 0.1);
  padding: 2px 6px;
  border-radius: 3px;
  font-size: 9px;
  color: var(--accent-cyan);
  border: 1px solid rgba(0, 255, 255, 0.3);
}

.terminal-controls {
  display: flex;
  gap: 8px;
}

.terminal-btn {
  width: 28px;
  height: 28px;
  background: rgba(0, 255, 0, 0.1);
  border: 1px solid var(--primary-green);
  color: var(--primary-green);
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 14px;
}

.terminal-btn:hover {
  background: rgba(0, 255, 0, 0.2);
  box-shadow: 0 0 15px rgba(0, 255, 0, 0.4);
  transform: scale(1.1);
}

.terminal-btn.close:hover {
  background: rgba(255, 0, 64, 0.2);
  border-color: var(--danger-red);
  color: var(--danger-red);
  box-shadow: 0 0 15px rgba(255, 0, 64, 0.4);
}

.terminal-content {
  height: calc(100% - 50px);
  padding: 20px;
  overflow-y: auto;
  background: rgba(0, 0, 0, 0.9);
  position: relative;
  z-index: 1;
}

.terminal-line {
  margin-bottom: 6px;
  font-size: 13px;
  line-height: 1.6;
  word-wrap: break-word;
  animation: line-appear 0.3s ease-out;
}

.terminal-text.command {
  color: var(--accent-cyan);
  font-weight: 600;
}

.terminal-text.output {
  color: var(--primary-green);
}

.terminal-text.error {
  color: var(--danger-red);
}

.terminal-text.success {
  color: var(--secondary-green);
}

.terminal-text.info {
  color: var(--accent-cyan);
}
.terminal-text.welcome {
  color: var(--warning-yellow);
}

.terminal-input-line {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 12px;
  padding: 8px 0;
  border-top: 1px solid rgba(0, 255, 0, 0.1);
}

.terminal-prompt {
  color: var(--accent-cyan);
  font-size: 13px;
  font-weight: 600;
  white-space: nowrap;
  text-shadow: 0 0 8px var(--accent-cyan);
}

.terminal-input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: var(--primary-green);
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  padding: 4px 8px;
  background: rgba(0, 255, 0, 0.02);
  border-radius: 4px;
  border: 1px solid rgba(0, 255, 0, 0.1);
}

.terminal-input:focus {
  border-color: var(--primary-green);
  box-shadow: 0 0 10px rgba(0, 255, 0, 0.3);
}

.terminal-input::placeholder {
  color: rgba(0, 255, 0, 0.4);
}

.processing-indicator {
  color: var(--warning-yellow);
  animation: terminal-cursor 0.8s infinite;
  font-size: 16px;
}

/* Minimized Terminal Bar */
.minimized-bar {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: linear-gradient(90deg, rgba(0, 0, 0, 0.95) 0%, rgba(0, 20, 0, 0.95) 100%);
  border: 2px solid var(--primary-green);
  border-radius: 25px;
  padding: 8px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  z-index: 1000;
}

.minimized-bar:hover {
  background: rgba(0, 255, 0, 0.1);
  box-shadow: 0 0 20px rgba(0, 255, 0, 0.4);
  transform: translateY(-2px);
}

.minimized-icon {
  color: var(--accent-cyan);
  animation: icon-pulse 2s ease-in-out infinite;
}

.minimized-text {
  color: var(--primary-green);
  font-weight: 600;
  font-size: 12px;
}

.minimized-status {
  color: var(--accent-cyan);
  font-size: 10px;
  background: rgba(0, 255, 255, 0.1);
  padding: 2px 6px;
  border-radius: 3px;
}

.minimized-close {
  background: none;
  border: none;
  color: var(--danger-red);
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  padding: 2px 6px;
  border-radius: 3px;
  transition: all 0.3s ease;
}

.minimized-close:hover {
  background: rgba(255, 0, 64, 0.2);
}

/* Closed Terminal Restore Button */
.restore-terminal {
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.9) 0%, rgba(0, 20, 0, 0.9) 100%);
  border: 2px solid rgba(0, 255, 0, 0.4);
  border-radius: 12px;
  padding: 24px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.restore-terminal::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(0, 255, 0, 0.1), transparent);
  transition: left 0.6s ease;
}

.restore-terminal:hover::before {
  left: 100%;
}

.restore-terminal:hover {
  border-color: var(--primary-green);
  box-shadow: 0 0 30px rgba(0, 255, 0, 0.4);
  transform: translateY(-2px);
}

.restore-icon {
  color: var(--accent-cyan);
  font-size: 24px;
  display: block;
  margin-bottom: 8px;
  animation: icon-pulse 2s ease-in-out infinite;
}

.restore-text {
  color: var(--primary-green);
  font-size: 18px;
  font-weight: 600;
  display: block;
  margin-bottom: 4px;
}

.restore-hint {
  color: var(--accent-cyan);
  font-size: 12px;
  opacity: 0.8;
}

/* Animations */
@keyframes terminal-cursor {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

@keyframes icon-pulse {
  0%, 100% { 
    transform: scale(1);
    text-shadow: 0 0 10px currentColor;
  }
  50% { 
    transform: scale(1.1);
    text-shadow: 0 0 20px currentColor;
  }
}

@keyframes status-blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

@keyframes line-appear {
  from { opacity: 0; transform: translateX(-10px); }
  to { opacity: 1; transform: translateX(0); }
}

@keyframes terminal-scan {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

/* Responsive Design */
@media (max-width: 768px) {
  .hacker-terminal {
    height: 400px;
  }
  
  .terminal-header {
    padding: 8px 12px;
  }
  
  .terminal-title {
    font-size: 12px;
  }
  
  .terminal-btn {
    width: 24px;
    height: 24px;
    font-size: 12px;
  }
  
  .terminal-content {
    padding: 12px;
  }
  
  .minimized-bar {
    bottom: 10px;
    right: 10px;
    padding: 6px 12px;
  }
}

@media (max-width: 480px) {
  .terminal-title .command-counter {
    display: none;
  }
  
  .minimized-text {
    display: none;
  }
}
</style>
