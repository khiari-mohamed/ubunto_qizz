import React, { useState, useEffect } from 'react';
import { questions } from './questions';
import './App.css';
import { FaRocket, FaBrain, FaChartLine, FaBolt, FaTerminal, FaCog, FaUbuntu, FaDownload, FaArrowLeft, FaPlay } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';

function App() {
  const [userName, setUserName] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [showDetailed, setShowDetailed] = useState(false);
  const [showLanding, setShowLanding] = useState(true);

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
      const detailedResults = {
        name: userName,
        date: new Date().toLocaleString(),
        score: calculateScore(),
        total: questions.length,
        percentage: Math.round((calculateScore() / questions.length) * 100),
        answers: questions.map((q, index) => ({
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
  }, [showResults, userName, answers]);

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
    if (currentQuestion < questions.length - 1) {
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
    questions.forEach(q => {
      if (answers[q.id] === q.correct) {
        correct++;
      }
    });
    return correct;
  };

  const getScoreMessage = (score) => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 90) return "🔥 Excellent! You're ready for the exam!";
    if (percentage >= 75) return "💪 Great job! Just review a few topics.";
    if (percentage >= 60) return "👍 Good work! Keep studying.";
    return "📚 Keep practicing! You'll get there.";
  };

  const resetQuiz = () => {
    setAnswers({});
    setCurrentQuestion(0);
    setShowResults(false);
    setQuizStarted(false);
    setUserName('');
    localStorage.removeItem('quizAnswers');
  };

  // Add this function to view all stored results (for you to help her)
  const viewAllResults = () => {
    const allResults = localStorage.getItem('allQuizResults');
    if (allResults) {
      console.log('All Quiz Results:', JSON.parse(allResults));
      alert('Check browser console (F12) to see all stored results!');
    } else {
      alert('No results stored yet!');
    }
  };

  if (showLanding) {
    return (
      <div className="landing-screen">
        <div className="landing-hero">
          <div className="hero-content">
            <div className="hero-badge"><FaRocket /> Master Ubuntu & Linux</div>
            <h1 className="hero-title">
              Ace Your <span className="gradient-text">Ubuntu OS</span> Exam
            </h1>
            <p className="hero-subtitle">
              28 expertly crafted questions covering everything from basic concepts to advanced system administration. Get ready to dominate your exam!
            </p>
            
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon"><FaBrain /></div>
                <h3>Smart Learning</h3>
                <p>Progressive difficulty from beginner to expert level</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon"><FaChartLine /></div>
                <h3>Detailed Analytics</h3>
                <p>Track your progress and identify weak areas</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon"><FaBolt /></div>
                <h3>Instant Results</h3>
                <p>Get immediate feedback and explanations</p>
              </div>
            </div>
            
            <div className="cta-section">
              <button onClick={() => setShowLanding(false)} className="cta-button">
                <span>Start Your Journey</span>
                <div className="button-glow"></div>
              </button>
              <p className="cta-note"><HiSparkles /> No signup required • Takes 15-20 minutes</p>
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

  if (!quizStarted) {
    return (
      <div className="welcome-screen">
        <div className="welcome-card">
          <h1><FaUbuntu /> Ubuntu OS Quiz</h1>
          <p>Ready to test your Ubuntu knowledge? Let's get started!</p>
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

  if (showResults) {
    const score = calculateScore();
    const detailedResults = {
      name: userName,
      date: new Date().toLocaleString(),
      score: score,
      total: questions.length,
      percentage: Math.round((score / questions.length) * 100),
      answers: questions.map((q, index) => ({
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
            <span className="total">/ {questions.length}</span>
          </div>
          <p className="score-message">{getScoreMessage(score)}</p>
          
          <p className="flirty-message">
            💖 I'm so proud of you, baby. You've come this far — you're gonna kill it in the real exam. Love you. 💫
          </p>
          
          <div className="results-details">
            <h4>Quick Review:</h4>
            <div className="answers-review">
              {questions.map((q, index) => (
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

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="quiz-screen">
      <div className="quiz-header">
        <h2>Hello {userName}! 👋</h2>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>
        <span className="progress-text">
          Question {currentQuestion + 1} of {questions.length}
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
        
        {currentQuestion === questions.length - 1 ? (
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