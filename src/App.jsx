import { useMemo, useState } from 'react';

const brand = {
  name: 'Barrett Pharmacy Technician Certification Academy LLC',
  shortName: 'Barrett Pharmacy Technician Success Hub'
};

const content = {
  dailyQuestion: {
    question: 'A prescription calls for 250 mg of a medication. The stock bottle contains 125 mg per tablet. How many tablets are needed per dose?',
    options: ['1 tablet', '2 tablets', '3 tablets', '4 tablets'],
    answer: '2 tablets',
    tip: 'Divide the prescribed dose by stock strength: 250 ÷ 125 = 2.'
  },
  quizzes: [
    {
      category: 'Pharmacy Math',
      questions: [
        {
          text: 'Convert 0.75 g to mg.',
          choices: ['75 mg', '750 mg', '7,500 mg', '0.075 mg'],
          correctAnswer: '750 mg',
          explanation: '1 gram equals 1000 mg, so 0.75 × 1000 = 750 mg.',
          studyTip: 'Memorize common conversions (kg-g-mg-mcg) for quick dosage calculations.'
        },
        {
          text: 'If a prescription is 1 tablet BID for 30 tablets, what is the days supply?',
          choices: ['10 days', '15 days', '20 days', '30 days'],
          correctAnswer: '15 days',
          explanation: 'BID means 2 tablets per day. 30 tablets ÷ 2/day = 15 days.'
        }
      ]
    },
    {
      category: 'Top 200 Drugs',
      questions: [
        {
          text: 'What is the primary use of lisinopril?',
          choices: ['Pain relief', 'Hypertension', 'Bacterial infection', 'GERD'],
          correctAnswer: 'Hypertension',
          explanation: 'Lisinopril is an ACE inhibitor commonly used to treat hypertension and heart failure.',
          studyTip: 'Group drugs by suffixes like -pril (ACE inhibitors).'
        },
        {
          text: 'Atorvastatin belongs to which drug class?',
          choices: ['Beta blocker', 'Statin', 'PPI', 'Sulfonylurea'],
          correctAnswer: 'Statin',
          explanation: 'Atorvastatin is an HMG-CoA reductase inhibitor, known as a statin.'
        }
      ]
    },
    {
      category: 'Pharmacy Law',
      questions: [
        {
          text: 'Which schedule drug has the highest abuse potential?',
          choices: ['Schedule II', 'Schedule III', 'Schedule IV', 'Schedule V'],
          correctAnswer: 'Schedule II',
          explanation: 'Among schedules II-V, Schedule II substances have the highest abuse potential.'
        }
      ]
    },
    {
      category: 'Federal Requirements',
      questions: [
        {
          text: 'What does HIPAA primarily protect?',
          choices: ['Inventory audits', 'Patient health information', 'Drug pricing', 'Insurance formularies'],
          correctAnswer: 'Patient health information',
          explanation: 'HIPAA establishes standards to protect sensitive patient health information.'
        }
      ]
    },
    {
      category: 'Medication Safety',
      questions: [
        {
          text: 'What is a high-alert medication?',
          choices: ['A medication on backorder', 'A medication with increased risk of causing significant harm if used in error', 'Any OTC product', 'Any refrigerated product'],
          correctAnswer: 'A medication with increased risk of causing significant harm if used in error',
          explanation: 'High-alert medications require extra safeguards due to their risk profile.'
        }
      ]
    },
    {
      category: 'Sterile Compounding',
      questions: [
        {
          text: 'Which USP chapter is commonly associated with sterile compounding standards?',
          choices: ['USP <795>', 'USP <797>', 'USP <800>', 'USP <71>'],
          correctAnswer: 'USP <797>',
          explanation: 'USP <797> covers sterile compounding practices.',
          studyTip: 'Remember: <795> nonsterile, <797> sterile, <800> hazardous drugs handling.'
        }
      ]
    },
    {
      category: 'Billing and Insurance',
      questions: [
        {
          text: 'What is a prior authorization?',
          choices: ['A pharmacist license renewal', 'Approval required by an insurer before certain medications are covered', 'A patient copay receipt', 'A controlled substance log'],
          correctAnswer: 'Approval required by an insurer before certain medications are covered',
          explanation: 'Prior authorization is used by insurers to verify medical necessity before coverage.'
        }
      ]
    },
    {
      category: 'Pharmacy Inventory',
      questions: [
        {
          text: 'What inventory method helps reduce medication expiration waste?',
          choices: ['LIFO', 'FEFO', 'JIT only', 'Random shelving'],
          correctAnswer: 'FEFO',
          explanation: 'FEFO (First Expired, First Out) helps ensure products with earliest expiration are used first.'
        }
      ]
    }
  ],
  mathProblems: [
    { type: 'Conversions', prompt: 'Convert 2.5 g to mg', answer: '2500 mg' },
    { type: 'Days Supply', prompt: 'Take 1 tablet BID for 30 tablets', answer: '15 days' },
    { type: 'Concentration', prompt: '1:1000 means 1 g in ?', answer: '1000 mL' }
  ],
  flashcards: [
    { drug: 'Atorvastatin', use: 'Lowers cholesterol', class: 'Statin' },
    { drug: 'Lisinopril', use: 'Treats hypertension', class: 'ACE inhibitor' },
    { drug: 'Metformin', use: 'Type 2 diabetes', class: 'Biguanide' }
  ],
  guides: [
    { title: 'PTCB Exam Blueprint Overview', format: 'PDF', level: 'Core' },
    { title: 'Pharmacy Abbreviations Quick Sheet', format: 'PDF', level: 'Fast Review' },
    { title: 'Controlled Substances Schedules I-V', format: 'PDF', level: 'Compliance' }
  ],
  tutoring: [
    { label: 'Book 1:1 Tutoring Session', link: '#' },
    { label: 'Request Group Coaching', link: '#' },
    { label: 'Contact Admissions Team', link: '#' }
  ]
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

function Card({ title, children }) {
  return <article className="card"><h2>{title}</h2>{children}</article>;
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

function MathCenter() { return <Card title="Pharmacy Math Help Center"><div className="grid">{content.mathProblems.map((p) => <div className="mini" key={p.prompt}><h3>{p.type}</h3><p>{p.prompt}</p><p className="muted">Answer: {p.answer}</p></div>)}</div></Card>; }
function Flashcards() { return <Card title="Top 200 Drugs Flashcards"><div className="grid">{content.flashcards.map((f) => <div className="mini" key={f.drug}><h3>{f.drug}</h3><p><strong>Class:</strong> {f.class}</p><p><strong>Use:</strong> {f.use}</p></div>)}</div></Card>; }
function Guides() { return <Card title="Study Guides Library"><div className="list">{content.guides.map((g) => <div key={g.title} className="row"><div><h3>{g.title}</h3><p>{g.level} • {g.format}</p></div><button className="btn">Open</button></div>)}</div></Card>; }
function TutorSupport() { return <Card title="Tutor Support"><p>Book support with Barrett Pharmacy Technician Certification Academy.</p><div className="list">{content.tutoring.map((t) => <a key={t.label} className="btn btn-primary" href={t.link}>{t.label}</a>)}</div></Card>; }
function ProgressTracker({ progress }) { return <Card title="Progress Tracker"><p>Weekly goal: {progress.weeklyGoal} study tasks</p><progress max={progress.weeklyGoal} value={progress.completedToday} /><p>{progress.completedToday} completed this week</p></Card>; }
