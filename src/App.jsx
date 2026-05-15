import { useMemo, useState } from 'react';
import { dailyQuestion, flashcards, mathTopics, quizCategories, studyGuides, tutoringLinks } from './data/content';

const brand = {
  name: 'Barrett Pharmacy Technician Certification Academy LLC',
  shortName: 'Barrett Pharmacy Technician Success Hub'
};

const content = {
  dailyQuestion,
  quizzes: quizCategories,
  mathTopics,
  flashcards,
  guides: studyGuides,
  tutoring: tutoringLinks
};

const nav = [
  'Dashboard',
  'Daily Study Question',
  'Practice Quiz Center',
  'Pharmacy Math Help Center',
  'Top 200 Drugs Flashcards',
  'Study Guides Library',
  'Tutor Support',
  'Progress Tracker'
];

const pageDescriptions = {
  Dashboard: 'Your daily overview for certification prep progress and next steps.',
  'Daily Study Question': 'Complete one focused question each day to build consistency.',
  'Practice Quiz Center': 'Train by category and get immediate feedback to strengthen retention.',
  'Pharmacy Math Help Center': 'Beginner-friendly pharmacy math walkthroughs and self-check practice.',
  'Top 200 Drugs Flashcards': 'Flip, review, and track high-yield medications by category.',
  'Study Guides Library': 'Open structured in-app guides for key PTCE study topics.',
  'Tutor Support': 'Connect with Barrett Academy support for focused study help.',
  'Progress Tracker': 'Monitor weekly study progress and momentum.'
};

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [active, setActive] = useState('Dashboard');
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);

  const progress = useMemo(() => ({
    weeklyGoal: 5,
    completedToday: 2,
    studyStreak: 4,
    examReadiness: 78,
    quizAverage: 84,
    flashcardsReviewed: 28,
    completedQuestions: 36,
    mathPractice: 14,
    guidesOpened: 6
  }), []);

  if (!loggedIn) {
    return (
      <main className="auth-shell">
        <section className="auth-card">
          <h1>{brand.shortName}</h1>
          <p className="muted">{brand.name}</p>
          <p>Welcome back. Sign in to continue your certification prep.</p>
          <input className="input" placeholder="Email" type="email" />
          <input className="input" placeholder="Password" type="password" />
          <button className="btn btn-primary" onClick={() => setLoggedIn(true)}>Login</button>
        </section>
      </main>
    );
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <div>
          <h1>{brand.shortName}</h1>
          <p>{brand.name}</p>
        </div>
        <button className="btn" onClick={() => setLoggedIn(false)}>Log out</button>
      </header>

      <section className="layout">
        <nav className="sidebar">
          {nav.map((item) => (
            <button
              key={item}
              className={`nav-btn ${active === item ? 'active' : ''}`}
              onClick={() => setActive(item)}
            >
              {item}
            </button>
          ))}
        </nav>

        <section className="content">
          <PageHeader title={active} description={pageDescriptions[active]} />
          {active === 'Dashboard' && <Dashboard progress={progress} setActive={setActive} />}
          {active === 'Daily Study Question' && (
            <DailyQuestion
              selectedAnswer={selectedAnswer}
              setSelectedAnswer={setSelectedAnswer}
              showAnswer={showAnswer}
              setShowAnswer={setShowAnswer}
            />
          )}
          {active === 'Practice Quiz Center' && <QuizCenter />}
          {active === 'Pharmacy Math Help Center' && <MathCenter />}
          {active === 'Top 200 Drugs Flashcards' && <Flashcards />}
          {active === 'Study Guides Library' && <Guides />}
          {active === 'Tutor Support' && <TutorSupport />}
          {active === 'Progress Tracker' && <ProgressTracker progress={progress} />}
        </section>
      </section>
    </main>
  );
}

function PageHeader({ title, description }) {
  return (
    <section className="page-header">
      <h2>{title}</h2>
      <p className="muted">{description}</p>
    </section>
  );
}

function Card({ title, children }) {
  return <article className="card"><h3>{title}</h3>{children}</article>;
}

function StatTile({ label, value }) {
  return <div className="mini"><p className="muted">{label}</p><h3>{value}</h3></div>;
}

function Dashboard({ progress, setActive }) {
  const quickLinks = [
    { label: 'Daily Question', page: 'Daily Study Question' },
    { label: 'Practice Quizzes', page: 'Practice Quiz Center' },
    { label: 'Pharmacy Math', page: 'Pharmacy Math Help Center' },
    { label: 'Flashcards', page: 'Top 200 Drugs Flashcards' },
    { label: 'Study Guides', page: 'Study Guides Library' },
    { label: 'Book Tutoring', page: 'Tutor Support' }
  ];

  return (
    <div className="stack">
      <Card title="Welcome">
        <p>Welcome to your premium study workspace. Stay consistent, track your progress, and move confidently toward certification.</p>
      </Card>

      <div className="grid two">
        <Card title="Study Streak">
          <p className="metric">{progress.studyStreak} days</p>
          <p className="muted">Keep your streak alive by completing at least one study activity today.</p>
        </Card>
        <Card title="Exam Readiness Score">
          <p className="metric">{progress.examReadiness}%</p>
          <p className="muted">Placeholder score based on recent quiz and study activity trends.</p>
        </Card>
      </div>

      <Card title="Quick Actions">
        <div className="grid">
          {quickLinks.map((link) => (
            <button key={link.label} className="btn quick-btn" onClick={() => setActive(link.page)}>{link.label}</button>
          ))}
        </div>
      </Card>

      <div className="grid two">
        <Card title="Recommended Next Step">
          <p>Complete today’s Daily Study Question, then take the Beginner Federal Law quiz to reinforce exam fundamentals.</p>
          <button className="btn btn-primary" onClick={() => setActive('Daily Study Question')}>Start Recommended Step</button>
        </Card>
        <Card title="Today’s Focus">
          <p><strong>Topic:</strong> Medication Safety & High-Alert Medications</p>
          <p className="muted">Spend 20 minutes: 1 quiz set + 5 flashcards + 2 math conversion drills.</p>
        </Card>
      </div>

      <Card title="Progress Summary">
        <div className="grid two">
          <StatTile label="Completed Questions" value={progress.completedQuestions} />
          <StatTile label="Math Practice" value={progress.mathPractice} />
          <StatTile label="Flashcards Reviewed" value={progress.flashcardsReviewed} />
          <StatTile label="Study Guides Opened" value={progress.guidesOpened} />
        </div>
      </Card>
    </div>
  );
}

function DailyQuestion({ selectedAnswer, setSelectedAnswer, showAnswer, setShowAnswer }) {
  const q = content.dailyQuestion;
  return <Card title="Daily Study Question"><p>{q.question}</p>{q.options.map((opt) => <label key={opt} className="option"><input name="daily" type="radio" checked={selectedAnswer === opt} onChange={() => setSelectedAnswer(opt)} />{opt}</label>)}<button className="btn btn-primary" onClick={() => setShowAnswer(true)}>Check Answer</button>{showAnswer && <p className="result">{selectedAnswer === q.answer ? 'Correct!' : `Not quite. Correct answer: ${q.answer}`} {q.tip}</p>}</Card>;
}

function QuizCenter() {
  const [activeCategory, setActiveCategory] = useState('');
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const category = content.quizzes.find((quiz) => quiz.category === activeCategory);
  const currentQuestion = category?.questions?.[questionIndex];

  const startCategory = (categoryName) => {
    setActiveCategory(categoryName);
    setQuestionIndex(0);
    setSelectedChoice('');
    setFeedback(null);
    setScore(0);
    setCompleted(false);
  };

  const submitAnswer = () => {
    if (!currentQuestion || !selectedChoice || feedback) {
      return;
    }

    const isCorrect = selectedChoice === currentQuestion.correctAnswer;
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    setFeedback({
      isCorrect,
      explanation: currentQuestion.explanation,
      studyTip: currentQuestion.studyTip
    });
  };

  const goNext = () => {
    if (!category) {
      return;
    }

    const hasNext = questionIndex < category.questions.length - 1;
    if (hasNext) {
      setQuestionIndex((prev) => prev + 1);
      setSelectedChoice('');
      setFeedback(null);
    } else {
      setCompleted(true);
    }
  };

  const backToCategories = () => {
    setActiveCategory('');
    setQuestionIndex(0);
    setSelectedChoice('');
    setFeedback(null);
    setScore(0);
    setCompleted(false);
  };

  if (!activeCategory) {
    return (
      <Card title="Practice Quiz Center">
        <p>Select a category to begin your quiz practice.</p>
        <div className="grid">
          {content.quizzes.map((quiz) => (
            <button key={quiz.category} className="btn quick-btn" onClick={() => startCategory(quiz.category)}>
              {quiz.category}
            </button>
          ))}
        </div>
      </Card>
    );
  }

  if (completed && category) {
    return (
      <Card title={`${category.category} Quiz Complete`}>
        <p className="metric">{score} / {category.questions.length}</p>
        <p>You completed the quiz. Review explanations and continue building mastery.</p>
        <div className="row-actions">
          <button className="btn" onClick={() => startCategory(category.category)}>Retake Quiz</button>
          <button className="btn btn-primary" onClick={backToCategories}>Choose Another Category</button>
        </div>
      </Card>
    );
  }

  return (
    <Card title={`${activeCategory} Quiz`}>
      <p className="muted">Question {questionIndex + 1} of {category.questions.length}</p>
      <p><strong>Score:</strong> {score}</p>
      <h3>{currentQuestion.text}</h3>
      <div className="list">
        {currentQuestion.choices.map((choice) => (
          <label key={choice} className="option mini option-card">
            <input
              name="quiz-choice"
              type="radio"
              checked={selectedChoice === choice}
              onChange={() => setSelectedChoice(choice)}
              disabled={Boolean(feedback)}
            />
            {choice}
          </label>
        ))}
      </div>

      {!feedback ? (
        <button className="btn btn-primary" onClick={submitAnswer} disabled={!selectedChoice}>Submit Answer</button>
      ) : (
        <div className="feedback">
          <p className={feedback.isCorrect ? 'result' : 'result warn'}>
            {feedback.isCorrect ? 'Correct!' : `Incorrect. Correct answer: ${currentQuestion.correctAnswer}`}
          </p>
          <p>{feedback.explanation}</p>
          {feedback.studyTip && <p className="muted"><strong>Study tip:</strong> {feedback.studyTip}</p>}
          <button className="btn btn-primary" onClick={goNext}>Next Question</button>
        </div>
      )}
    </Card>
  );
}

function MathCenter() { return <Card title="Pharmacy Math Help Center"><p className="muted">Beginner-friendly math walkthroughs for pharmacy technician exam prep.</p><div className="list">{content.mathTopics.map((topic) => <article className="mini" key={topic.section}><h3>{topic.section}</h3><p><strong>What this means:</strong> {topic.explanation}</p><p><strong>Formula / Method:</strong> {topic.method}</p><p><strong>Example:</strong> {topic.exampleProblem}</p><ol className="steps">{topic.steps.map((step) => <li key={step}>{step}</li>)}</ol><p><strong>Practice:</strong> {topic.practiceProblem}</p></article>)}</div></Card>; }

function Flashcards() { return <Card title="Top 200 Drugs Flashcards"><p className="muted">Use sample flashcards below. Add more in src/data/content.js.</p><div className="grid">{content.flashcards.map((c) => <div className="mini" key={`${c.brandName}-${c.genericName}`}><h3>{c.brandName}</h3><p><strong>Generic:</strong> {c.genericName}</p><p><strong>Class:</strong> {c.drugClass}</p><p><strong>Use:</strong> {c.commonUse}</p><p className="muted"><strong>Memory tip:</strong> {c.memoryTip}</p></div>)}</div></Card>; }

function Guides() { return <Card title="Study Guides Library"><div className="grid two">{content.guides.map((guide) => <article key={guide.id} className="mini"><h3>{guide.title}</h3><p>{guide.description}</p><p className="muted"><strong>Estimated study time:</strong> {guide.studyTime}</p><button className="btn btn-primary">Open Guide</button></article>)}</div></Card>; }

function TutorSupport() {
  return (
    <Card title="Tutor Support">
      <section className="support-hero">
        <h3>Your success team is here for you.</h3>
        <p>Barrett Pharmacy Technician Certification Academy LLC offers personalized support to help you study with confidence and consistency.</p>
      </section>
      <div className="mini">
        <p>Book one-on-one help for pharmacy math, PTCE preparation, study planning, and difficult topics you want to review step by step.</p>
      </div>
      <div className="row-actions">
        {content.tutoring.map((link) => (
          <a key={link.label} className="btn btn-primary" href={link.link} target="_blank" rel="noreferrer">{link.label}</a>
        ))}
      </div>
      <p className="muted">Support is educational and coaching-focused. Outcomes vary by learner effort and preparation.</p>
    </Card>
  );
}

function ProgressTracker({ progress }) { return <Card title="Progress Tracker"><p>Weekly goal: {progress.weeklyGoal} study tasks</p><progress max={progress.weeklyGoal} value={progress.completedToday} /><p>{progress.completedToday} completed this week</p></Card>; }
