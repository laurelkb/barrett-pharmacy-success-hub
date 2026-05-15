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
    { title: 'Federal Law Essentials', questions: 15, difficulty: 'Beginner' },
    { title: 'Medication Safety & Error Prevention', questions: 20, difficulty: 'Intermediate' },
    { title: 'Sterile Compounding Basics', questions: 10, difficulty: 'Intermediate' }
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
    quizAverage: 84,
    flashcardsReviewed: 28
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
          {active === 'Dashboard' && <Dashboard progress={progress} />}
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

function Dashboard({ progress }) {
  return <div className="grid two"><Card title="Today at a glance"><p>Daily question complete: <strong>No</strong></p><p>Quizzes ready: <strong>{content.quizzes.length}</strong></p><p>Flashcards due: <strong>12</strong></p></Card><Card title="Current performance"><p>Quiz average: <strong>{progress.quizAverage}%</strong></p><p>Flashcards reviewed: <strong>{progress.flashcardsReviewed}</strong></p><p>Study streak: <strong>4 days</strong></p></Card></div>;
}

function DailyQuestion({ selectedAnswer, setSelectedAnswer, showAnswer, setShowAnswer }) {
  const q = content.dailyQuestion;
  return <Card title="Daily Study Question"><p>{q.question}</p>{q.options.map((opt) => <label key={opt} className="option"><input name="daily" type="radio" checked={selectedAnswer === opt} onChange={() => setSelectedAnswer(opt)} />{opt}</label>)}<button className="btn btn-primary" onClick={() => setShowAnswer(true)}>Check Answer</button>{showAnswer && <p className="result">{selectedAnswer === q.answer ? 'Correct!' : `Not quite. Correct answer: ${q.answer}`} {q.tip}</p>}</Card>;
}

function QuizCenter() { return <Card title="Practice Quiz Center"><div className="grid">{content.quizzes.map((quiz) => <div className="mini" key={quiz.title}><h3>{quiz.title}</h3><p>{quiz.questions} questions</p><p>{quiz.difficulty}</p><button className="btn">Start Quiz</button></div>)}</div></Card>; }
function MathCenter() { return <Card title="Pharmacy Math Help Center"><div className="grid">{content.mathProblems.map((p) => <div className="mini" key={p.prompt}><h3>{p.type}</h3><p>{p.prompt}</p><p className="muted">Answer: {p.answer}</p></div>)}</div></Card>; }
function Flashcards() { return <Card title="Top 200 Drugs Flashcards"><div className="grid">{content.flashcards.map((f) => <div className="mini" key={f.drug}><h3>{f.drug}</h3><p><strong>Class:</strong> {f.class}</p><p><strong>Use:</strong> {f.use}</p></div>)}</div></Card>; }
function Guides() { return <Card title="Study Guides Library"><div className="list">{content.guides.map((g) => <div key={g.title} className="row"><div><h3>{g.title}</h3><p>{g.level} • {g.format}</p></div><button className="btn">Open</button></div>)}</div></Card>; }
function TutorSupport() { return <Card title="Tutor Support"><p>Book support with Barrett Pharmacy Technician Certification Academy.</p><div className="list">{content.tutoring.map((t) => <a key={t.label} className="btn btn-primary" href={t.link}>{t.label}</a>)}</div></Card>; }
function ProgressTracker({ progress }) { return <Card title="Progress Tracker"><p>Weekly goal: {progress.weeklyGoal} study tasks</p><progress max={progress.weeklyGoal} value={progress.completedToday} /><p>{progress.completedToday} completed this week</p></Card>; }

