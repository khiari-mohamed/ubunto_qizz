import React, { useState, useEffect } from 'react';
import { questions } from './questions';
import { osQuestions } from './osQuestions';
import { protocolQuestions } from './protocolQuestions';
import { finalExamQuestions } from './finalExamQuestions';
import { finalExamScenarios } from './finalExamScenarios';
import { finalExamAnswers, enhancedTerminalCommands } from './finalExamAnswers';
import './App.css';
import { FaRocket, FaBrain, FaChartLine, FaBolt, FaTerminal, FaCog, FaUbuntu, FaDownload, FaArrowLeft, FaPlay, FaTimes, FaNetworkWired, FaGraduationCap, FaServer, FaCode, FaCheck } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';

function App() {
  const [userName, setUserName] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [showDetailed, setShowDetailed] = useState(false);
  const [showLanding, setShowLanding] = useState(true);
  const [showQuizSelection, setShowQuizSelection] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [examStep, setExamStep] = useState(0);
  const [examAnswers, setExamAnswers] = useState({});
  const [showTerminal, setShowTerminal] = useState(false);
  const [showSystemInfo, setShowSystemInfo] = useState(false);
  const [showNetworkConfig, setShowNetworkConfig] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [terminalCommands, setTerminalCommands] = useState([]);
  const [terminalOutput, setTerminalOutput] = useState([]);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [currentPath, setCurrentPath] = useState('/home/user');
  const [fileSystem] = useState({
    '/': {
      type: 'dir',
      contents: ['home', 'var', 'etc', 'usr', 'bin', 'sbin', 'tmp', 'root', 'opt', 'lib', 'proc', 'sys', 'dev', 'mnt', 'media']
    },
    '/home': {
      type: 'dir',
      contents: ['user']
    },
    '/home/user': {
      type: 'dir',
      contents: ['Desktop', 'Documents', 'Downloads', 'Music', 'Pictures', 'Public', 'Templates', 'Videos', '.bashrc', '.profile']
    },
    '/var': {
      type: 'dir',
      contents: ['www', 'log', 'lib', 'cache', 'tmp']
    },
    '/var/www': {
      type: 'dir',
      contents: ['html']
    },
    '/var/www/html': {
      type: 'dir',
      contents: ['index.html']
    },
    '/var/log': {
      type: 'dir',
      contents: ['apache2', 'syslog', 'auth.log']
    },
    '/etc': {
      type: 'dir',
      contents: ['apache2', 'hosts', 'hostname', 'passwd', 'group', 'samba']
    },
    '/etc/apache2': {
      type: 'dir',
      contents: ['apache2.conf', 'sites-available', 'sites-enabled']
    },
    '/usr': {
      type: 'dir',
      contents: ['bin', 'sbin', 'lib', 'share']
    },
    '/bin': {
      type: 'dir',
      contents: ['ls', 'cd', 'pwd', 'cat', 'grep', 'find', 'chmod', 'chown']
    }
  });

  useEffect(() => {
    const savedAnswers = localStorage.getItem('quizAnswers');
    if (savedAnswers) {
      setAnswers(JSON.parse(savedAnswers));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('quizAnswers', JSON.stringify(answers));
  }, [answers]);

  // Store results when quiz is completed
  useEffect(() => {
    if (showResults && userName) {
      const currentQuestions = selectedQuiz === 'os' ? osQuestions : selectedQuiz === 'protocols' ? protocolQuestions : questions;
      const detailedResults = {
        name: userName,
        date: new Date().toLocaleString(),
        score: calculateScore(),
        total: currentQuestions.length,
        percentage: Math.round((calculateScore() / currentQuestions.length) * 100),
        quizType: selectedQuiz === 'os' ? 'Operating Systems' : selectedQuiz === 'protocols' ? 'Network Protocols' : 'Ubuntu & Linux',
        answers: currentQuestions.map((q, index) => ({
          questionId: q.id,
          question: q.question,
          options: q.options,
          userAnswer: answers[q.id],
          correctAnswer: q.correct,
          isCorrect: answers[q.id] === q.correct,
          userAnswerText: q.options[answers[q.id]] || 'Not answered',
          correctAnswerText: q.options[q.correct]
        }))
      };
      
      const allResults = JSON.parse(localStorage.getItem('allQuizResults') || '[]');
      allResults.push(detailedResults);
      localStorage.setItem('allQuizResults', JSON.stringify(allResults));
    }
  }, [showResults, userName, answers, selectedQuiz]);

  const handleStartQuiz = () => {
    if (userName.trim()) {
      setQuizStarted(true);
    }
  };

  const handleAnswerSelect = (questionId, answerIndex) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const handleNext = () => {
    const currentQuestions = selectedQuiz === 'os' ? osQuestions : selectedQuiz === 'protocols' ? protocolQuestions : selectedQuiz === 'final' ? finalExamQuestions : questions;
    if (currentQuestion < currentQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  const calculateScore = () => {
    let correct = 0;
    const currentQuestions = selectedQuiz === 'os' ? osQuestions : selectedQuiz === 'protocols' ? protocolQuestions : selectedQuiz === 'final' ? finalExamQuestions : questions;
    currentQuestions.forEach(q => {
      if (answers[q.id] === q.correct) {
        correct++;
      }
    });
    return correct;
  };

  const calculateFinalExamScore = () => {
    let totalScore = 0;
    finalExamScenarios.forEach(q => {
      const userAnswer = examAnswers[q.id] || '';
      if (userAnswer.trim()) {
        // Simple keyword matching for scoring
        const keywords = q.expectedKeywords;
        const answerLower = userAnswer.toLowerCase();
        const matchedKeywords = keywords.filter(keyword => 
          answerLower.includes(keyword.toLowerCase())
        );
        const scorePercentage = Math.min(matchedKeywords.length / keywords.length, 1);
        totalScore += Math.round(q.points * scorePercentage);
      }
    });
    return totalScore;
  };

  const getScoreMessage = (score) => {
    let percentage;
    if (selectedQuiz === 'final') {
      const totalPoints = finalExamScenarios.reduce((sum, q) => sum + q.points, 0);
      percentage = (score / totalPoints) * 100;
    } else {
      const currentQuestions = selectedQuiz === 'os' ? osQuestions : selectedQuiz === 'protocols' ? protocolQuestions : questions;
      percentage = (score / currentQuestions.length) * 100;
    }
    if (percentage >= 90) return "🔥 Excellent! You're ready for the exam!";
    if (percentage >= 75) return "💪 Great job! Just review a few topics.";
    if (percentage >= 60) return "👍 Good work! Keep studying.";
    return "📚 Keep practicing! You'll get there.";
  };

  const resetQuiz = () => {
    setAnswers({});
    setExamAnswers({});
    setCurrentQuestion(0);
    setExamStep(0);
    setShowResults(false);
    setQuizStarted(false);
    setUserName('');
    setSelectedQuiz(null);
    setShowLanding(true);
    setCurrentAnswer('');
    localStorage.removeItem('quizAnswers');
  };

  const getPrompt = () => {
    const pathDisplay = currentPath === '/home/user' ? '~' : currentPath;
    return `user@ubuntu:${pathDisplay}$ `;
  };

  const resolvePath = (path) => {
    if (path.startsWith('/')) {
      return path;
    }
    if (path === '~') {
      return '/home/user';
    }
    if (path === '..') {
      const parts = currentPath.split('/').filter(p => p);
      parts.pop();
      return '/' + parts.join('/');
    }
    if (path === '.') {
      return currentPath;
    }
    return currentPath === '/' ? `/${path}` : `${currentPath}/${path}`;
  };

  const AnimatedCounter = ({ end, duration = 2000, suffix = '' }) => {
    const [count, setCount] = useState(0);
    
    useEffect(() => {
      const timer = setTimeout(() => {
        let start = 0;
        const increment = end / (duration / 50);
        const counter = setInterval(() => {
          start += increment;
          if (start >= end) {
            setCount(end);
            clearInterval(counter);
          } else {
            setCount(Math.floor(start));
          }
        }, 50);
        return () => clearInterval(counter);
      }, 1500);
      
      return () => clearTimeout(timer);
    }, [end, duration]);
    
    return <span>{count}{suffix}</span>;
  };

  const executeCommand = (command) => {
    const trimmedCommand = command.trim();
    const parts = trimmedCommand.split(/\s+/);
    const cmd = parts[0];
    const args = parts.slice(1);

    switch (cmd) {
      case 'cd':
        if (args.length === 0 || args[0] === '~') {
          setCurrentPath('/home/user');
          return '';
        }
        const targetPath = resolvePath(args[0]);
        if (fileSystem[targetPath] && fileSystem[targetPath].type === 'dir') {
          setCurrentPath(targetPath);
          return '';
        }
        return `bash: cd: ${args[0]}: No such file or directory`;

      case 'ls':
        let path = currentPath;
        if (args.length > 0 && !args[0].startsWith('-')) {
          path = resolvePath(args[0]);
        }
        if (!fileSystem[path]) {
          return `ls: cannot access '${args[0]}': No such file or directory`;
        }
        const showHidden = args.includes('-a');
        const longFormat = args.includes('-l');
        let contents = fileSystem[path].contents || [];
        
        if (showHidden) {
          contents = ['.', '..', ...contents];
        }
        
        if (longFormat) {
          return contents.map(item => {
            const isDir = fileSystem[path === '/' ? `/${item}` : `${path}/${item}`]?.type === 'dir';
            const perms = isDir ? 'drwxr-xr-x' : '-rw-r--r--';
            const size = isDir ? '4096' : '1024';
            return `${perms} 2 user user ${size} Jan 15 10:30 ${item}`;
          }).join('\n');
        }
        
        return contents.join('  ');

      case 'pwd':
        return currentPath;

      case 'mkdir':
        if (args.length === 0) {
          return 'mkdir: missing operand';
        }
        return `mkdir: created directory '${args[0]}'`;

      case 'touch':
        if (args.length === 0) {
          return 'touch: missing file operand';
        }
        return '';

      case 'cat':
        if (args.length === 0) {
          return 'cat: missing file operand';
        }
        if (args[0] === '/etc/os-release') {
          return enhancedTerminalCommands['cat /etc/os-release'];
        }
        if (args[0] === '/etc/hostname') {
          return 'ubuntu-server';
        }
        return `cat: ${args[0]}: No such file or directory`;

      case 'sudo':
        const sudoCmd = args.join(' ');
        if (sudoCmd.startsWith('apt')) {
          return enhancedTerminalCommands[`sudo ${sudoCmd}`] || enhancedTerminalCommands[sudoCmd] || 'Package operation completed';
        }
        if (sudoCmd.startsWith('systemctl')) {
          return enhancedTerminalCommands[`sudo ${sudoCmd}`] || '';
        }
        if (sudoCmd.includes('usermod') || sudoCmd.includes('chmod') || sudoCmd.includes('chown')) {
          return '';
        }
        return enhancedTerminalCommands[`sudo ${sudoCmd}`] || 'Operation completed';

      case 'systemctl':
        return enhancedTerminalCommands[trimmedCommand] || `systemctl: ${args[1] || 'service'}: not found`;

      case 'clear':
        setTerminalOutput([]);
        return '';

      default:
        return enhancedTerminalCommands[trimmedCommand] || `${cmd}: command not found`;
    }
  };

  if (showLanding) {
    return (
      <div className="landing-screen">
        <div className="landing-hero">
          <div className="hero-content">
            
            <h1 className="hero-title">
              Master <span className="gradient-text">Linux, Networks & IT</span> Skills
            </h1>
            <p className="hero-subtitle">
              Comprehensive exam preparation platform with 100+ questions, interactive simulations, and real-world scenarios. From Ubuntu basics to advanced system administration.
            </p>
            
            <div className="stats-row">
              <div className="stat-item">
                <div className="stat-number"><AnimatedCounter end={100} suffix="+" /></div>
                <div className="stat-label">Questions</div>
              </div>
              <div className="stat-item">
                <div className="stat-number"><AnimatedCounter end={4} /></div>
                <div className="stat-label">Quiz Types</div>
              </div>
              <div className="stat-item">
                <div className="stat-number"><AnimatedCounter end={98} suffix="%" /></div>
                <div className="stat-label">Success Rate</div>
              </div>
            </div>
            
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon"><FaUbuntu /></div>
                <h3>Ubuntu & Linux</h3>
                <p>VirtualBox setup, terminal commands, and system administration</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon"><FaCog /></div>
                <h3>Operating Systems</h3>
                <p>Memory management, processes, and OS fundamentals</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon"><FaNetworkWired /></div>
                <h3>Network Protocols</h3>
                <p>HTTP, FTP, SMTP, and network configuration</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon"><FaGraduationCap /></div>
                <h3>Final Exam Simulator</h3>
                <p>Real-world scenarios with interactive terminal and tools</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon"><FaBrain /></div>
                <h3>Smart Learning</h3>
                <p>Adaptive difficulty and personalized feedback</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon"><FaChartLine /></div>
                <h3>Detailed Analytics</h3>
                <p>Track progress and identify improvement areas</p>
              </div>
            </div>
            
            <div className="cta-section">
              <button 
                onClick={() => {
                  setShowLanding(false);
                  setShowQuizSelection(true);
                }} 
                className="cta-button"
              >
                <FaRocket /> Start Your Journey
              </button>
              <p className="cta-note"><HiSparkles /> No signup required • Interactive learning • Instant results</p>
            </div>
          </div>
          
          <div className="hero-visual">
            <div className="floating-elements">
              <div className="float-item ubuntu-logo"><FaUbuntu /></div>
              <div className="float-item terminal"><FaTerminal /></div>
              <div className="float-item code"><FaCog /></div>
              <div className="float-item rocket"><FaRocket /></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showQuizSelection) {
    console.log('Rendering quiz selection modal');
    return (
      <div className="quiz-selection-overlay">
        <div className="quiz-selection-modal">
          <div className="modal-header">
            <h2>Choose Your Quiz</h2>
            <button onClick={() => setShowQuizSelection(false)} className="close-btn">
              <FaTimes />
            </button>
          </div>
          
          <div className="quiz-options">
            <div className="quiz-option" onClick={() => {
              setSelectedQuiz('ubuntu');
              setShowQuizSelection(false);
              setShowLanding(false);
            }}>
              <div className="quiz-icon"><FaUbuntu /></div>
              <h3>Ubuntu & Linux Quiz</h3>
              <p>28 questions about Ubuntu, VirtualBox, and Linux basics</p>
              <div className="quiz-stats">
                <span>🎯 28 Questions</span>
                <span>⏱️ 20 minutes</span>
              </div>
            </div>
            
            <div className="quiz-option" onClick={() => {
              setSelectedQuiz('os');
              setShowQuizSelection(false);
              setShowLanding(false);
            }}>
              <div className="quiz-icon"><FaCog /></div>
              <h3>Operating Systems Quiz</h3>
              <p>25 questions about OS fundamentals, memory, and processes</p>
              <div className="quiz-stats">
                <span>🎯 25 Questions</span>
                <span>⏱️ 18 minutes</span>
              </div>
            </div>
            
            <div className="quiz-option" onClick={() => {
              setSelectedQuiz('protocols');
              setShowQuizSelection(false);
              setShowLanding(false);
            }}>
              <div className="quiz-icon"><FaNetworkWired /></div>
              <h3>Network Protocols Quiz</h3>
              <p>25 questions about HTTP, FTP, SMTP, and network protocols</p>
              <div className="quiz-stats">
                <span>🎯 25 Questions</span>
                <span>⏱️ 18 minutes</span>
              </div>
            </div>
            
            <div className="quiz-option final-exam" onClick={() => {
              setSelectedQuiz('final');
              setShowQuizSelection(false);
              setShowLanding(false);
            }}>
              <div className="quiz-icon"><FaGraduationCap /></div>
              <h3>Final Exam Simulator</h3>
              <p>Interactive problem-solving combining all subjects with tools</p>
              <div className="quiz-stats">
                <span>🎯 Practical Problems</span>
                <span>⏱️ 30 minutes</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (selectedQuiz === 'final' && !quizStarted) {
    return (
      <div className="final-exam-screen">
        <div className="exam-container">
          <div className="exam-header">
            <h1><FaGraduationCap /> Final Exam Simulator</h1>
            <p>Solve real-world IT problems using your combined knowledge</p>
          </div>
          
          <div className="exam-scenario">
            <div className="scenario-card">
              <h2>🏢 Scenario: New Office Setup</h2>
              <p>You're an IT administrator setting up a new office. You need to:</p>
              <ul>
                <li>Install Ubuntu on a virtual machine</li>
                <li>Configure network protocols for file sharing</li>
                <li>Set up a web server with HTTPS</li>
                <li>Manage user permissions and system security</li>
              </ul>
            </div>
          </div>
          
          <div className="exam-tools">
            <h3>Available Tools:</h3>
            <div className="tools-grid">
              <div className="tool-card" onClick={() => setShowTerminal(true)}>
                <FaTerminal />
                <span>Terminal</span>
              </div>
              <div className="tool-card" onClick={() => setShowSystemInfo(true)}>
                <FaServer />
                <span>System Info</span>
              </div>
              <div className="tool-card" onClick={() => setShowNetworkConfig(true)}>
                <FaNetworkWired />
                <span>Network Config</span>
              </div>
              <div className="tool-card" onClick={() => setShowSettings(true)}>
                <FaCog />
                <span>Settings</span>
              </div>
            </div>
          </div>
          
          <div className="exam-actions">
            <input
              type="text"
              placeholder="Enter your name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="name-input"
            />
            <button onClick={() => setQuizStarted(true)} className="start-exam-btn">
              Start Final Exam
            </button>
            <button onClick={() => setShowLanding(true)} className="back-btn">
              <FaArrowLeft /> Back to Home
            </button>
          </div>
        </div>
        
        {showTerminal && (
          <div className="terminal-overlay">
            <div className="terminal-window">
              <div className="terminal-header">
                <span>Terminal - Ubuntu Server</span>
                <button onClick={() => setShowTerminal(false)}><FaTimes /></button>
              </div>
              <div className="terminal-body">
                <div className="terminal-output">
                  {terminalOutput.map((line, index) => (
                    <div key={index} className="terminal-line">
                      {line.type === 'command' ? (
                        <><span className="prompt">{line.prompt || getPrompt()}</span><span>{line.text}</span></>
                      ) : (
                        <div className="output">{line.text}</div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="terminal-input">
                  <span className="prompt">{getPrompt()}</span>
                  <input 
                    type="text" 
                    placeholder="Type a command..."
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        const command = e.target.value;
                        const currentPrompt = getPrompt();
                        const output = executeCommand(command);
                        setTerminalOutput(prev => [
                          ...prev,
                          { type: 'command', text: command, prompt: currentPrompt },
                          ...(output ? [{ type: 'output', text: output }] : [])
                        ]);
                        e.target.value = '';
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        
        {showSystemInfo && (
          <div className="tool-overlay">
            <div className="tool-window">
              <div className="tool-header">
                <span>System Information</span>
                <button onClick={() => setShowSystemInfo(false)}><FaTimes /></button>
              </div>
              <div className="tool-body">
                <div className="info-section">
                  <h4>Hardware</h4>
                  <p>CPU: Intel Core i5-8400 @ 2.80GHz</p>
                  <p>RAM: 8GB DDR4</p>
                  <p>Storage: 500GB SSD</p>
                </div>
                <div className="info-section">
                  <h4>Operating System</h4>
                  <p>OS: Ubuntu 22.04 LTS</p>
                  <p>Kernel: 5.15.0-56-generic</p>
                  <p>Architecture: x86_64</p>
                </div>
                <div className="info-section">
                  <h4>Network</h4>
                  <p>IP Address: 192.168.1.100</p>
                  <p>Gateway: 192.168.1.1</p>
                  <p>DNS: 8.8.8.8, 8.8.4.4</p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {showNetworkConfig && (
          <div className="tool-overlay">
            <div className="tool-window">
              <div className="tool-header">
                <span>Network Configuration</span>
                <button onClick={() => setShowNetworkConfig(false)}><FaTimes /></button>
              </div>
              <div className="tool-body">
                <div className="config-section">
                  <h4>Interface: eth0</h4>
                  <p>Status: UP</p>
                  <p>IP: 192.168.1.100/24</p>
                  <p>MAC: 08:00:27:12:34:56</p>
                </div>
                <div className="config-section">
                  <h4>Routing Table</h4>
                  <p>Default via 192.168.1.1</p>
                  <p>192.168.1.0/24 dev eth0</p>
                </div>
                <div className="config-section">
                  <h4>Active Connections</h4>
                  <p>SSH: 192.168.1.50:22 (ESTABLISHED)</p>
                  <p>HTTP: *:80 (LISTENING)</p>
                  <p>HTTPS: *:443 (LISTENING)</p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {showSettings && (
          <div className="tool-overlay">
            <div className="tool-window">
              <div className="tool-header">
                <span>System Settings</span>
                <button onClick={() => setShowSettings(false)}><FaTimes /></button>
              </div>
              <div className="tool-body">
                <div className="settings-section">
                  <h4>Services Status</h4>
                  <p>Apache2: <span className="status-active">Active</span></p>
                  <p>SSH: <span className="status-active">Active</span></p>
                  <p>UFW Firewall: <span className="status-inactive">Inactive</span></p>
                </div>
                <div className="settings-section">
                  <h4>User Management</h4>
                  <p>Current User: user</p>
                  <p>Groups: user, sudo, www-data</p>
                  <p>Last Login: 2024-01-15 09:30:22</p>
                </div>
                <div className="settings-section">
                  <h4>Security</h4>
                  <p>Password Policy: Enabled</p>
                  <p>Failed Login Attempts: 0</p>
                  <p>SSL Certificate: Valid until 2025-01-15</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (!quizStarted) {
    const quizTitle = selectedQuiz === 'os' ? 'Operating Systems Quiz' : selectedQuiz === 'protocols' ? 'Network Protocols Quiz' : selectedQuiz === 'final' ? 'Final Exam Simulator' : 'Ubuntu & Linux Quiz';
    const quizDescription = selectedQuiz === 'os' 
      ? 'Ready to test your Operating Systems knowledge? Let\'s get started!' 
      : selectedQuiz === 'protocols'
      ? 'Ready to test your Network Protocols knowledge? Let\'s get started!'
      : selectedQuiz === 'final'
      ? 'Ready for the ultimate challenge? Solve real-world problems!'
      : 'Ready to test your Ubuntu knowledge? Let\'s get started!';
    const quizIcon = selectedQuiz === 'os' ? <FaCog /> : selectedQuiz === 'protocols' ? <FaNetworkWired /> : selectedQuiz === 'final' ? <FaGraduationCap /> : <FaUbuntu />;
    
    return (
      <div className="welcome-screen">
        <div className="welcome-card">
          <h1>{quizIcon} {quizTitle}</h1>
          <p>{quizDescription}</p>
          <input
            type="text"
            placeholder="Enter your name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="name-input"
          />
          <button onClick={handleStartQuiz} className="start-btn">
            Start Quiz
          </button>
          <button onClick={() => setShowLanding(true)} className="back-btn">
            <FaArrowLeft /> Back to Home
          </button>
        </div>
      </div>
    );
  }

  // Final Exam Results Page
  if (showResults && selectedQuiz === 'final') {
    const score = calculateFinalExamScore();
    const totalPoints = finalExamScenarios.reduce((sum, q) => sum + q.points, 0);
    const percentage = Math.round((score / totalPoints) * 100);
    
    return (
      <div className="final-exam-results">
        <div className="final-results-card">
          <h2><HiSparkles /> Final Exam Complete!</h2>
          <h3>Hello {userName}!</h3>
          <div className="final-score-display">
            <span className="final-score">{score}</span>
            <span className="final-total">/ {totalPoints} points</span>
          </div>
          <p className="final-score-message">{getScoreMessage(score)}</p>
          
          <p className="flirty-message">
            💖 I'm so proud of you, baby. You've completed the ultimate challenge — you're gonna kill it in the real exam. Love you. 💫
          </p>
          
          <div className="final-exam-review">
            <h4>📋 Final Exam Review with Model Answers:</h4>
            <div className="final-answers-list">
              {finalExamScenarios.map((scenario, index) => (
                <div key={scenario.id} className="final-answer-item">
                  <div className="final-question-header">
                    <span className="final-q-number">Problem {index + 1}</span>
                    <span className="final-points-badge">{scenario.points} points</span>
                  </div>
                  <h5 className="final-question-title">{scenario.title}</h5>
                  <p className="final-question-text">{scenario.question}</p>
                  
                  <div className="final-scenario-context">
                    <strong>Scenario:</strong> {scenario.scenario}
                  </div>
                  
                  <div className="final-user-answer">
                    <strong>Your Answer:</strong>
                    <div className="final-answer-text">{examAnswers[scenario.id] || 'No answer provided'}</div>
                  </div>
                  
                  <div className="final-model-answer">
                    <strong>✅ Model Answer:</strong>
                    <div className="final-model-text">{finalExamAnswers[scenario.id]?.correctAnswer || 'Answer not available'}</div>
                    {finalExamAnswers[scenario.id]?.commands && (
                      <div className="final-commands-section">
                        <strong>💻 Relevant Commands:</strong>
                        <pre className="final-commands-text">{finalExamAnswers[scenario.id].commands.join('\n')}</pre>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="final-action-buttons">
            <button onClick={resetQuiz} className="final-restart-btn">
              Take Final Exam Again
            </button>
            <button onClick={() => setShowLanding(true)} className="final-home-btn">
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (showResults) {
    const score = calculateScore();
    const currentQuestions = selectedQuiz === 'os' ? osQuestions : selectedQuiz === 'protocols' ? protocolQuestions : questions;
    const detailedResults = {
      name: userName,
      date: new Date().toLocaleString(),
      score: score,
      total: currentQuestions.length,
      percentage: Math.round((score / currentQuestions.length) * 100),
      quizType: selectedQuiz === 'os' ? 'Operating Systems' : selectedQuiz === 'protocols' ? 'Network Protocols' : 'Ubuntu & Linux',
      answers: currentQuestions.map((q, index) => ({
        questionId: q.id,
        question: q.question,
        options: q.options,
        userAnswer: answers[q.id],
        correctAnswer: q.correct,
        isCorrect: answers[q.id] === q.correct,
        userAnswerText: q.options[answers[q.id]] || 'Not answered',
        correctAnswerText: q.options[q.correct]
      }))
    };
    
    const downloadResults = () => {
      const dataStr = JSON.stringify(detailedResults, null, 2);
      const dataBlob = new Blob([dataStr], {type: 'application/json'});
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${userName}_quiz_results_${new Date().toISOString().split('T')[0]}.json`;
      link.click();
    };

    return (
      <div className="results-screen">
        <div className="results-card">
          <h2><HiSparkles /> Quiz Complete!</h2>
          <h3>Hello {userName}!</h3>
          <div className="score-display">
            <span className="score">{score}</span>
            <span className="total">/ {currentQuestions.length}</span>
          </div>
          <p className="score-message">{getScoreMessage(score)}</p>
          
          <p className="flirty-message">
            💖 I'm so proud of you, baby. You've come this far — you're gonna kill it in the real exam. Love you. 💫
          </p>
          
          <div className="results-details">
            <h4>Quick Review:</h4>
            <div className="answers-review">
              {currentQuestions.map((q, index) => (
                <div key={q.id} className={`answer-item ${answers[q.id] === q.correct ? 'correct' : 'incorrect'}`}>
                  <span className="question-num">Q{index + 1}</span>
                  <span className="result-icon">
                    {answers[q.id] === q.correct ? '✅' : '❌'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="action-buttons">
            <button onClick={() => setShowDetailed(!showDetailed)} className="detail-btn">
              {showDetailed ? 'Hide' : 'Show'} Detailed Results
            </button>
            <button onClick={downloadResults} className="download-btn">
              <FaDownload /> Download Results
            </button>
            <button onClick={resetQuiz} className="restart-btn">
              Take Quiz Again
            </button>
          </div>

          {showDetailed && (
            <div className="detailed-results">
              <h4><FaChartLine /> Detailed Answer Review:</h4>
              <div className="detailed-list">
                {detailedResults.answers.map((item, index) => (
                  <div key={item.questionId} className={`detailed-item ${item.isCorrect ? 'correct-detail' : 'incorrect-detail'}`}>
                    <div className="question-header">
                      <span className="q-number">Q{index + 1}</span>
                      <span className={`status-badge ${item.isCorrect ? 'correct' : 'incorrect'}`}>
                        {item.isCorrect ? '✅ Correct' : '❌ Wrong'}
                      </span>
                    </div>
                    <p className="question-detail">{item.question}</p>
                    <div className="answer-comparison">
                      <div className="user-answer">
                        <strong>Your answer:</strong> {item.userAnswerText}
                      </div>
                      {!item.isCorrect && (
                        <div className="correct-answer">
                          <strong>Correct answer:</strong> {item.correctAnswerText}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Final Exam Logic
  if (selectedQuiz === 'final' && quizStarted) {
    const currentScenario = finalExamScenarios[examStep];
    const progress = ((examStep + 1) / finalExamScenarios.length) * 100;

    return (
      <div className="final-exam-quiz">
        <div className="exam-header">
          <h2>Hello {userName}! 👋 Final Exam in Progress</h2>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
          <span className="progress-text">
            Problem {examStep + 1} of {finalExamScenarios.length}
          </span>
        </div>

        <div className="scenario-card">
          <div className="scenario-header">
            <h3>{currentScenario.title}</h3>
            <span className="points-badge">{currentScenario.points} points</span>
          </div>
          <div className="scenario-context">
            <p><strong>Scenario:</strong> {currentScenario.scenario}</p>
          </div>
          <div className="scenario-question">
            <h4>Problem:</h4>
            <p>{currentScenario.question}</p>
          </div>
          
          <div className="available-tools">
            <h4>Available Tools:</h4>
            <div className="tools-mini">
              {currentScenario.tools.map(tool => (
                <button key={tool} className="tool-mini" onClick={() => {
                  if (tool === 'Terminal') setShowTerminal(true);
                  if (tool === 'System Info') setShowSystemInfo(true);
                  if (tool === 'Network Config') setShowNetworkConfig(true);
                  if (tool === 'Settings') setShowSettings(true);
                }}>
                  {tool === 'Terminal' && <FaTerminal />}
                  {tool === 'System Info' && <FaServer />}
                  {tool === 'Network Config' && <FaNetworkWired />}
                  {tool === 'Settings' && <FaCog />}
                  {tool}
                </button>
              ))}
            </div>
          </div>

          <div className="answer-section">
            <h4>Your Answer:</h4>
            <textarea
              value={currentAnswer}
              onChange={(e) => setCurrentAnswer(e.target.value)}
              placeholder="Type your detailed answer here..."
              className="answer-textarea"
              rows={6}
            />
          </div>
        </div>

        <div className="navigation">
          <button 
            onClick={() => {
              if (examStep > 0) {
                setExamAnswers(prev => ({ ...prev, [currentScenario.id]: currentAnswer }));
                setExamStep(prev => prev - 1);
                setCurrentAnswer(examAnswers[finalExamScenarios[examStep - 1].id] || '');
              }
            }}
            disabled={examStep === 0}
            className="nav-btn prev-btn"
          >
            ← Previous
          </button>
          
          {examStep === finalExamScenarios.length - 1 ? (
            <button 
              onClick={() => {
                setExamAnswers(prev => ({ ...prev, [currentScenario.id]: currentAnswer }));
                setShowResults(true);
              }}
              className="nav-btn submit-btn"
            >
              Submit Final Exam
            </button>
          ) : (
            <button 
              onClick={() => {
                setExamAnswers(prev => ({ ...prev, [currentScenario.id]: currentAnswer }));
                setExamStep(prev => prev + 1);
                setCurrentAnswer(examAnswers[finalExamScenarios[examStep + 1].id] || '');
              }}
              className="nav-btn next-btn"
            >
              Next →
            </button>
          )}
        </div>

        {/* Tool Overlays */}
        {showTerminal && (
          <div className="terminal-overlay">
            <div className="terminal-window">
              <div className="terminal-header">
                <span>Terminal - Ubuntu Server</span>
                <button onClick={() => setShowTerminal(false)}><FaTimes /></button>
              </div>
              <div className="terminal-body">
                <div className="terminal-output">
                  {terminalOutput.map((line, index) => (
                    <div key={index} className="terminal-line">
                      {line.type === 'command' ? (
                        <><span className="prompt">{line.prompt || getPrompt()}</span><span>{line.text}</span></>
                      ) : (
                        <div className="output">{line.text}</div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="terminal-input">
                  <span className="prompt">{getPrompt()}</span>
                  <input 
                    type="text" 
                    placeholder="Type a command..."
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        const command = e.target.value;
                        const currentPrompt = getPrompt();
                        const output = executeCommand(command);
                        setTerminalOutput(prev => [
                          ...prev,
                          { type: 'command', text: command, prompt: currentPrompt },
                          ...(output ? [{ type: 'output', text: output }] : [])
                        ]);
                        e.target.value = '';
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        
        {showSystemInfo && (
          <div className="tool-overlay">
            <div className="tool-window">
              <div className="tool-header">
                <span>System Information</span>
                <button onClick={() => setShowSystemInfo(false)}><FaTimes /></button>
              </div>
              <div className="tool-body">
                <div className="info-section">
                  <h4>Hardware</h4>
                  <p>CPU: Intel Core i5-8400 @ 2.80GHz</p>
                  <p>RAM: 8GB DDR4</p>
                  <p>Storage: 500GB SSD</p>
                </div>
                <div className="info-section">
                  <h4>Operating System</h4>
                  <p>OS: Ubuntu 22.04 LTS</p>
                  <p>Kernel: 5.15.0-56-generic</p>
                  <p>Architecture: x86_64</p>
                </div>
                <div className="info-section">
                  <h4>Network</h4>
                  <p>IP Address: 192.168.1.100</p>
                  <p>Gateway: 192.168.1.1</p>
                  <p>DNS: 8.8.8.8, 8.8.4.4</p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {showNetworkConfig && (
          <div className="tool-overlay">
            <div className="tool-window">
              <div className="tool-header">
                <span>Network Configuration</span>
                <button onClick={() => setShowNetworkConfig(false)}><FaTimes /></button>
              </div>
              <div className="tool-body">
                <div className="config-section">
                  <h4>Interface: eth0</h4>
                  <p>Status: UP</p>
                  <p>IP: 192.168.1.100/24</p>
                  <p>MAC: 08:00:27:12:34:56</p>
                </div>
                <div className="config-section">
                  <h4>Routing Table</h4>
                  <p>Default via 192.168.1.1</p>
                  <p>192.168.1.0/24 dev eth0</p>
                </div>
                <div className="config-section">
                  <h4>Active Connections</h4>
                  <p>SSH: 192.168.1.50:22 (ESTABLISHED)</p>
                  <p>HTTP: *:80 (LISTENING)</p>
                  <p>HTTPS: *:443 (LISTENING)</p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {showSettings && (
          <div className="tool-overlay">
            <div className="tool-window">
              <div className="tool-header">
                <span>System Settings</span>
                <button onClick={() => setShowSettings(false)}><FaTimes /></button>
              </div>
              <div className="tool-body">
                <div className="settings-section">
                  <h4>Services Status</h4>
                  <p>Apache2: <span className="status-active">Active</span></p>
                  <p>SSH: <span className="status-active">Active</span></p>
                  <p>UFW Firewall: <span className="status-inactive">Inactive</span></p>
                </div>
                <div className="settings-section">
                  <h4>User Management</h4>
                  <p>Current User: user</p>
                  <p>Groups: user, sudo, www-data</p>
                  <p>Last Login: 2024-01-15 09:30:22</p>
                </div>
                <div className="settings-section">
                  <h4>Security</h4>
                  <p>Password Policy: Enabled</p>
                  <p>Failed Login Attempts: 0</p>
                  <p>SSL Certificate: Valid until 2025-01-15</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Regular Quiz Logic
  const currentQuestions = selectedQuiz === 'os' ? osQuestions : selectedQuiz === 'protocols' ? protocolQuestions : questions;
  const currentQ = currentQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / currentQuestions.length) * 100;

  return (
    <div className="quiz-screen">
      <div className="quiz-header">
        <h2>Hello {userName}! 👋</h2>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>
        <span className="progress-text">
          Question {currentQuestion + 1} of {currentQuestions.length}
        </span>
      </div>

      <div className="question-card">
        <h3 className="question-text">{currentQ.question}</h3>
        <div className="options-container">
          {currentQ.options.map((option, index) => (
            <button
              key={index}
              className={`option-btn ${answers[currentQ.id] === index ? 'selected' : ''}`}
              onClick={() => handleAnswerSelect(currentQ.id, index)}
            >
              <span className="option-letter">{String.fromCharCode(65 + index)}</span>
              <span className="option-text">{option}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="navigation">
        <button 
          onClick={handlePrevious} 
          disabled={currentQuestion === 0}
          className="nav-btn prev-btn"
        >
          ← Previous
        </button>
        
        {currentQuestion === currentQuestions.length - 1 ? (
          <button onClick={handleSubmit} className="nav-btn submit-btn">
            Submit Quiz
          </button>
        ) : (
          <button onClick={handleNext} className="nav-btn next-btn">
            Next →
          </button>
        )}
      </div>
    </div>
  );
}

export default App;