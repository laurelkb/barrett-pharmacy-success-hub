// Barrett Pharmacy Technician Success Hub
// SIMPLE ADMIN CONTENT FILE

export const dailyQuestion = {
  question: 'A prescription calls for 250 mg of a medication. The stock bottle contains 125 mg per tablet. How many tablets are needed per dose?',
  options: ['1 tablet', '2 tablets', '3 tablets', '4 tablets'],
  answer: '2 tablets',
  tip: 'Divide the prescribed dose by stock strength: 250 ÷ 125 = 2.'
};

export const quizCategories = [
  {
    category: 'Pharmacy Math',
    questions: [
      { text: 'Convert 0.75 g to mg.', choices: ['75 mg', '750 mg', '7,500 mg', '0.075 mg'], correctAnswer: '750 mg', explanation: '1 gram equals 1000 mg, so 0.75 × 1000 = 750 mg.' }
    ]
  }
];

export const mathTopics = [
  { section: 'Basic Conversions', explanation: 'Pharmacy technicians convert between units all day.', method: '1 g = 1000 mg and 1 L = 1000 mL.', exampleProblem: 'Convert 1.5 g to mg.', steps: ['Start with 1.5 g.', 'Use 1 g = 1000 mg.', 'Multiply 1.5 × 1000.', 'Answer: 1500 mg.'], practiceProblem: 'Convert 0.25 L to mL.', practiceAnswer: '250 mL' },
  { section: 'Days Supply', explanation: 'Days supply tells how long the medication lasts.', method: 'Days supply = Quantity dispensed ÷ Quantity used per day.', exampleProblem: 'Take 1 tablet BID. Quantity 60.', steps: ['BID = 2/day.', '60 ÷ 2 = 30.', 'Answer: 30 days.'], practiceProblem: 'Take 2 tablets daily. Quantity 90.', practiceAnswer: '45 days' }
];

// Add more flashcards by copying an object and editing fields.
export const flashcards = [
  { category: 'Cardiovascular', brandName: 'Lipitor', genericName: 'Atorvastatin', drugClass: 'Statin', commonUse: 'Lowers LDL cholesterol.', memoryTip: 'Many cholesterol drugs are statins.' },
  { category: 'Diabetes', brandName: 'Glucophage', genericName: 'Metformin', drugClass: 'Biguanide', commonUse: 'Type 2 diabetes.', memoryTip: 'Metformin is a common first-line option.' }
];

// Add more guides by copying an object and editing content.
export const studyGuides = [
  { id: 'ptce-roadmap', title: 'PTCE Study Roadmap', description: 'A step-by-step weekly study path.', studyTime: '25 min', content: ['Week 1-2: law basics', 'Week 3-4: pharmacy math'] },
  { id: 'math-cheat-sheet', title: 'Pharmacy Math Cheat Sheet', description: 'Quick formulas and reminders.', studyTime: '20 min', content: ['1 g = 1000 mg', 'Days supply formula'] }
];

// Replace placeholder links with your real booking/help/website URLs.
export const tutoringLinks = [
  { label: 'Book Tutoring', link: 'https://example.com/book-tutoring' },
  { label: 'Request Study Help', link: 'https://example.com/study-help' },
  { label: 'Visit Academy Website', link: 'https://example.com/academy' }
];
