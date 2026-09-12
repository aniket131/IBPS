const QUESTIONS = [
  {
    "id": 1,
    "section": "Quantitative Aptitude",
    "question": "What is 35% of 640?",
    "options": [
      "214",
      "224",
      "234",
      "244",
      "254"
    ],
    "answer": 1
  },
  {
    "id": 2,
    "section": "Quantitative Aptitude",
    "question": "Simplify: 48 ÷ 6 × 7 + 15 = ?",
    "options": [
      "61",
      "66",
      "71",
      "76",
      "81"
    ],
    "answer": 2
  },
  {
    "id": 3,
    "section": "Quantitative Aptitude",
    "question": "The ratio of the salaries of A and B is 3:5. If their total salary is ₹64,000, what is B's salary?",
    "options": [
      "₹24,000",
      "₹30,000",
      "₹32,000",
      "₹40,000",
      "₹48,000"
    ],
    "answer": 3
  },
  {
    "id": 4,
    "section": "Quantitative Aptitude",
    "question": "An article costing ₹800 is sold at a profit of 15%. What is the selling price?",
    "options": [
      "₹880",
      "₹900",
      "₹920",
      "₹940",
      "₹960"
    ],
    "answer": 2
  },
  {
    "id": 5,
    "section": "Quantitative Aptitude",
    "question": "Find the simple interest on ₹5,000 at 8% per annum for 2 years.",
    "options": [
      "₹600",
      "₹700",
      "₹800",
      "₹900",
      "₹1,000"
    ],
    "answer": 2
  },
  {
    "id": 6,
    "section": "Quantitative Aptitude",
    "question": "Find the compound interest on ₹10,000 at 10% per annum for 2 years.",
    "options": [
      "₹1,900",
      "₹2,000",
      "₹2,100",
      "₹2,200",
      "₹2,400"
    ],
    "answer": 2
  },
  {
    "id": 7,
    "section": "Quantitative Aptitude",
    "question": "A can complete a job in 12 days and B in 18 days. How long will they take together?",
    "options": [
      "6 days",
      "7 days",
      "7.2 days",
      "8 days",
      "9 days"
    ],
    "answer": 2
  },
  {
    "id": 8,
    "section": "Quantitative Aptitude",
    "question": "Convert 54 km/hour into metres/second.",
    "options": [
      "12 m/s",
      "13 m/s",
      "14 m/s",
      "15 m/s",
      "16 m/s"
    ],
    "answer": 3
  },
  {
    "id": 9,
    "section": "Quantitative Aptitude",
    "question": "Find the average of 18, 22, 25, 30 and 35.",
    "options": [
      "24",
      "25",
      "26",
      "27",
      "28"
    ],
    "answer": 2
  },
  {
    "id": 10,
    "section": "Quantitative Aptitude",
    "question": "A 180-metre-long train is moving at 72 km/hour. How many seconds will it take to cross a pole?",
    "options": [
      "6",
      "7",
      "8",
      "9",
      "10"
    ],
    "answer": 3
  },
  {
    "id": 11,
    "section": "Quantitative Aptitude",
    "question": "Data: Accounts opened — A:1200, B:1500, C:1800, D:2100, E:2400. What is the total number of accounts opened by Branch A and Branch C?",
    "options": [
      "2,800",
      "3,000",
      "3,200",
      "3,400",
      "3,600"
    ],
    "answer": 1
  },
  {
    "id": 12,
    "section": "Quantitative Aptitude",
    "question": "Data: Accounts opened — A:1200, B:1500, C:1800, D:2100, E:2400. Accounts opened by Branch B are what percentage of Branch E?",
    "options": [
      "52.5%",
      "57.5%",
      "60%",
      "62.5%",
      "65%"
    ],
    "answer": 3
  },
  {
    "id": 13,
    "section": "Quantitative Aptitude",
    "question": "Data: Accounts opened — A:1200, B:1500, C:1800, D:2100, E:2400. What is the difference between accounts opened by Branch D and Branch A?",
    "options": [
      "700",
      "800",
      "900",
      "1,000",
      "1,100"
    ],
    "answer": 2
  },
  {
    "id": 14,
    "section": "Quantitative Aptitude",
    "question": "Data: Accounts opened — A:1200, B:1500, C:1800, D:2100, E:2400. What is the average number of accounts opened across all five branches?",
    "options": [
      "1,600",
      "1,700",
      "1,800",
      "1,900",
      "2,000"
    ],
    "answer": 2
  },
  {
    "id": 15,
    "section": "Quantitative Aptitude",
    "question": "Data: Accounts opened — A:1200, B:1500, C:1800, D:2100, E:2400. Branch E opened what percentage more accounts than Branch A?",
    "options": [
      "50%",
      "75%",
      "80%",
      "90%",
      "100%"
    ],
    "answer": 4
  },
  {
    "id": 16,
    "section": "Reasoning Ability",
    "question": "Find the next number: 3, 8, 15, 24, 35, ?",
    "options": [
      "44",
      "46",
      "48",
      "50",
      "52"
    ],
    "answer": 2
  },
  {
    "id": 17,
    "section": "Reasoning Ability",
    "question": "Find the next term: AZ, BY, CX, DW, ?",
    "options": [
      "EU",
      "EV",
      "FU",
      "FV",
      "EW"
    ],
    "answer": 1
  },
  {
    "id": 18,
    "section": "Reasoning Ability",
    "question": "If each letter is replaced by the next letter in the alphabet, BANK will be coded as:",
    "options": [
      "CBOL",
      "CBNL",
      "CBOM",
      "DBOL",
      "CAOL"
    ],
    "answer": 0
  },
  {
    "id": 19,
    "section": "Reasoning Ability",
    "question": "Given P > Q ≥ R > S, which statement is definitely true?",
    "options": [
      "S > P",
      "R > P",
      "P > S",
      "Q < S",
      "S = Q"
    ],
    "answer": 2
  },
  {
    "id": 20,
    "section": "Reasoning Ability",
    "question": "Statements: All pens are books. Some books are papers. Conclusions: I. Some pens are papers. II. Some books are papers.",
    "options": [
      "Only I follows",
      "Only II follows",
      "Both follow",
      "Neither follows",
      "Either I or II follows"
    ],
    "answer": 1
  },
  {
    "id": 21,
    "section": "Reasoning Ability",
    "question": "Aman says about a girl, 'She is the daughter of my mother's only son.' Aman is male. How is the girl related to Aman?",
    "options": [
      "Sister",
      "Niece",
      "Daughter",
      "Cousin",
      "Mother"
    ],
    "answer": 2
  },
  {
    "id": 22,
    "section": "Reasoning Ability",
    "question": "Raj walks 10 metres north, turns right and walks 6 metres, then turns right and walks 10 metres. Where is he from his starting point?",
    "options": [
      "6 m west",
      "10 m east",
      "6 m east",
      "10 m south",
      "16 m east"
    ],
    "answer": 2
  },
  {
    "id": 23,
    "section": "Reasoning Ability",
    "question": "In a class of 45 students, Rohit is 18th from the top. What is his rank from the bottom?",
    "options": [
      "26th",
      "27th",
      "28th",
      "29th",
      "30th"
    ],
    "answer": 2
  },
  {
    "id": 24,
    "section": "Reasoning Ability",
    "question": "Find the odd one out.",
    "options": [
      "Square",
      "Rectangle",
      "Triangle",
      "Parallelogram",
      "Rhombus"
    ],
    "answer": 2
  },
  {
    "id": 25,
    "section": "Reasoning Ability",
    "question": "Five people sit in one row facing north. D is at the extreme left. E sits immediately to the right of D. A sits immediately to the right of E. B sits immediately to the right of A. C sits at the extreme right. Who sits in the middle?",
    "options": [
      "A",
      "B",
      "C",
      "D",
      "E"
    ],
    "answer": 0
  },
  {
    "id": 26,
    "section": "Reasoning Ability",
    "question": "Which is the fourth letter from the left in the word BANKER?",
    "options": [
      "A",
      "N",
      "K",
      "E",
      "R"
    ],
    "answer": 2
  },
  {
    "id": 27,
    "section": "Reasoning Ability",
    "question": "If '+' means multiplication and '−' means division, what is 12 + 3 − 2 ?",
    "options": [
      "12",
      "16",
      "18",
      "24",
      "36"
    ],
    "answer": 2
  },
  {
    "id": 28,
    "section": "Reasoning Ability",
    "question": "If CAT = 24 using alphabetical values of letters, what is DOG?",
    "options": [
      "24",
      "25",
      "26",
      "27",
      "28"
    ],
    "answer": 2
  },
  {
    "id": 29,
    "section": "Reasoning Ability",
    "question": "What is the smaller angle between the hands of a clock at 3:30?",
    "options": [
      "60°",
      "70°",
      "75°",
      "80°",
      "90°"
    ],
    "answer": 2
  },
  {
    "id": 30,
    "section": "Reasoning Ability",
    "question": "Complete the analogy: 8 : 64 :: 12 : ?",
    "options": [
      "96",
      "120",
      "124",
      "132",
      "144"
    ],
    "answer": 4
  },
  {
    "id": 31,
    "section": "English Language",
    "question": "Identify the error: 'Each of the players have submitted their forms.'",
    "options": [
      "Each of",
      "the players",
      "have submitted",
      "their forms",
      "No error"
    ],
    "answer": 2
  },
  {
    "id": 32,
    "section": "English Language",
    "question": "Fill in the blank: The manager insisted ___ reviewing the report before approval.",
    "options": [
      "at",
      "for",
      "on",
      "with",
      "by"
    ],
    "answer": 2
  },
  {
    "id": 33,
    "section": "English Language",
    "question": "Choose the synonym of 'Prudent'.",
    "options": [
      "Careless",
      "Cautious",
      "Angry",
      "Weak",
      "Expensive"
    ],
    "answer": 1
  },
  {
    "id": 34,
    "section": "English Language",
    "question": "Choose the antonym of 'Scarce'.",
    "options": [
      "Rare",
      "Limited",
      "Insufficient",
      "Abundant",
      "Small"
    ],
    "answer": 3
  },
  {
    "id": 35,
    "section": "English Language",
    "question": "Choose the grammatically correct sentence.",
    "options": [
      "He is working here since 2022.",
      "He has been working here since 2022.",
      "He have been working here since 2022.",
      "He was working here since 2022.",
      "He working here since 2022."
    ],
    "answer": 1
  },
  {
    "id": 36,
    "section": "English Language",
    "question": "Select the correctly spelt word.",
    "options": [
      "Accomodation",
      "Acommodation",
      "Accommodation",
      "Accommadation",
      "Accomodasion"
    ],
    "answer": 2
  },
  {
    "id": 37,
    "section": "English Language",
    "question": "Fill in the blank: Neither the manager nor the employees ___ willing to accept the proposal.",
    "options": [
      "is",
      "was",
      "has",
      "were",
      "be"
    ],
    "answer": 3
  },
  {
    "id": 38,
    "section": "English Language",
    "question": "Select the correct passive voice: 'The committee approved the proposal.'",
    "options": [
      "The proposal approves the committee.",
      "The proposal was approved by the committee.",
      "The proposal has approve the committee.",
      "The committee was approved by the proposal.",
      "The proposal is approving."
    ],
    "answer": 1
  },
  {
    "id": 39,
    "section": "English Language",
    "question": "What does the phrase 'at the eleventh hour' mean?",
    "options": [
      "Very early",
      "Exactly at 11 PM",
      "At the last possible moment",
      "After a long delay",
      "Every eleven hours"
    ],
    "answer": 2
  },
  {
    "id": 40,
    "section": "English Language",
    "question": "Arrange these sentences in the most logical order: P. Digital banking has expanded rapidly in India. Q. Consequently, customers can perform many transactions without visiting branches. R. However, increased digital usage also creates security challenges. S. Therefore, banks continue to invest heavily in cybersecurity.",
    "options": [
      "PQRS",
      "PRQS",
      "QPRS",
      "RSPQ",
      "SQPR"
    ],
    "answer": 0
  },
  {
    "id": 41,
    "section": "General / Banking Awareness",
    "question": "What is the RBI policy repo rate used in this mock test (September 2026 reference)?",
    "options": [
      "4.50%",
      "4.75%",
      "5.00%",
      "5.25%",
      "5.50%"
    ],
    "answer": 3
  },
  {
    "id": 42,
    "section": "General / Banking Awareness",
    "question": "Who is the Governor of the Reserve Bank of India in 2026?",
    "options": [
      "Shaktikanta Das",
      "Sanjay Malhotra",
      "Urjit Patel",
      "Raghuram Rajan",
      "T. Rabi Sankar"
    ],
    "answer": 1
  },
  {
    "id": 43,
    "section": "General / Banking Awareness",
    "question": "What is the maximum deposit insurance cover provided by DICGC per depositor per bank?",
    "options": [
      "₹1 lakh",
      "₹2 lakh",
      "₹3 lakh",
      "₹5 lakh",
      "₹10 lakh"
    ],
    "answer": 3
  },
  {
    "id": 44,
    "section": "General / Banking Awareness",
    "question": "UPI was developed by which organisation?",
    "options": [
      "RBI",
      "SEBI",
      "NPCI",
      "NABARD",
      "IRDAI"
    ],
    "answer": 2
  },
  {
    "id": 45,
    "section": "General / Banking Awareness",
    "question": "Who presented the Union Budget 2026–27?",
    "options": [
      "Amit Shah",
      "Piyush Goyal",
      "Nirmala Sitharaman",
      "Rajnath Singh",
      "Narendra Modi"
    ],
    "answer": 2
  },
  {
    "id": 46,
    "section": "General / Banking Awareness",
    "question": "Who is the President of India in 2026?",
    "options": [
      "Pratibha Patil",
      "Ram Nath Kovind",
      "Droupadi Murmu",
      "Jagdeep Dhankhar",
      "Narendra Modi"
    ],
    "answer": 2
  },
  {
    "id": 47,
    "section": "General / Banking Awareness",
    "question": "What is the Cash Reserve Ratio (CRR) used in this mock test (September 2026 reference)?",
    "options": [
      "2%",
      "2.5%",
      "3%",
      "4%",
      "4.5%"
    ],
    "answer": 2
  },
  {
    "id": 48,
    "section": "General / Banking Awareness",
    "question": "What is the Statutory Liquidity Ratio (SLR) used in this mock test (September 2026 reference)?",
    "options": [
      "15%",
      "16%",
      "17%",
      "18%",
      "20%"
    ],
    "answer": 3
  },
  {
    "id": 49,
    "section": "General / Banking Awareness",
    "question": "NEFT stands for:",
    "options": [
      "National Electronic Fund Transfer",
      "National Exchange Fund Transaction",
      "New Electronic Financial Transfer",
      "National Electronic Finance Trade",
      "Network Electronic Fund Transfer"
    ],
    "answer": 0
  },
  {
    "id": 50,
    "section": "General / Banking Awareness",
    "question": "IFSC stands for:",
    "options": [
      "Indian Financial Security Code",
      "Indian Financial System Code",
      "International Financial System Code",
      "Indian Fund Settlement Code",
      "Internal Financial Service Code"
    ],
    "answer": 1
  }
];
