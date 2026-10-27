export interface Question {
  id: string
  question: string
  steps: string[]
  example: string
}

export const ELI5_HEADER = "Bhuti MA-LABEL is explaining this like you're 5 years old 💡"

export const QUESTIONS: Record<string, Question[]> = {
  mathematics: [
    {
      id: "maths-1",
      question: "Solve for x: x² − 5x + 6 = 0",
      steps: [
        "We want two numbers that multiply to make 6 and add up to make −5.",
        "−2 and −3 work: (−2) × (−3) = 6 and (−2) + (−3) = −5.",
        "So we write it as (x − 2)(x − 3) = 0.",
        "If two things multiply to zero, one of them must be zero. So x = 2 or x = 3.",
      ],
      example:
        "Think of it like splitting R6 airtime between two friends so that together they owe R5 change. Only one pair of amounts makes both rules happy — find that pair and you've solved it!",
    },
    {
      id: "maths-2",
      question: "Find the gradient between (1;2) and (3;8)",
      steps: [
        "Gradient means: how much do you go UP for every step you go ACROSS?",
        "Up: 8 − 2 = 6. Across: 3 − 1 = 2.",
        "Gradient = up ÷ across = 6 ÷ 2 = 3.",
      ],
      example:
        "Walking up Signal Hill: for every 1 step forward you climb 3 steps up. That's a steep gradient of 3 — your legs will feel it!",
    },
  ],
  "physical-sciences": [
    {
      id: "phys-1",
      question: "What is Newton's Second Law?",
      steps: [
        "Force = mass × acceleration (F = ma).",
        "The heavier something is, the more push you need to speed it up.",
        "Push the same thing harder and it speeds up faster.",
      ],
      example:
        "Pushing an empty Shoprite trolley is easy and it zooms off. Fill it with 10 bags of mielie meal and the same push barely moves it. More mass = more force needed.",
    },
    {
      id: "phys-2",
      question: "What happens in an exothermic reaction?",
      steps: [
        "Exo means 'out' and thermic means 'heat'.",
        "The reaction gives OUT heat energy to the surroundings.",
        "The products have less energy than the reactants, so ΔH is negative.",
      ],
      example:
        "Lighting the charcoal for a Sunday braai — the burning coal gives heat out to you and the boerewors. That's exothermic!",
    },
  ],
  "life-sciences": [
    {
      id: "life-1",
      question: "What is the function of DNA?",
      steps: [
        "DNA is the instruction book inside every cell.",
        "It carries genes, which are the recipes for making proteins.",
        "Proteins decide things like your eye colour and how your body works.",
      ],
      example:
        "DNA is like Gogo's secret recipe book. Every family member gets a copy, and that's why the whole family's chakalaka tastes the same!",
    },
    {
      id: "life-2",
      question: "Explain natural selection",
      steps: [
        "Living things in a population are slightly different from each other.",
        "Those with helpful differences survive and have more babies.",
        "Over many generations, the helpful traits become common.",
      ],
      example:
        "In the Kruger, the springbok that run the fastest escape the cheetah. They grow up and have fast babies. Over time, the whole herd gets faster.",
    },
  ],
  "maths-literacy": [
    {
      id: "ml-1",
      question: "Calculate 15% VAT on R200",
      steps: [
        "15% means 15 out of every 100.",
        "15 ÷ 100 × R200 = R30 VAT.",
        "Price including VAT = R200 + R30 = R230.",
      ],
      example:
        "If a pair of takkies costs R200 before VAT, SARS adds R30 for every R200. So at the till you pay R230.",
    },
    {
      id: "ml-2",
      question: "What is the difference between mean and median?",
      steps: [
        "Mean: add all the numbers and divide by how many there are.",
        "Median: put the numbers in order and pick the middle one.",
        "The median isn't fooled by one very big or very small number.",
      ],
      example:
        "Five friends' pocket money: R20, R25, R30, R35 and R500. The mean is R122 (thanks to the rich one!) but the median is R30 — that's more like what most people get.",
    },
  ],
  accounting: [
    {
      id: "acc-1",
      question: "What is the accounting equation?",
      steps: [
        "Assets = Owner's Equity + Liabilities.",
        "Assets are what the business owns.",
        "Equity is what the owner put in, liabilities are what the business owes others.",
      ],
      example:
        "Your spaza shop has R10 000 of stock. You put in R6 000 and borrowed R4 000 from your uncle. R10 000 = R6 000 + R4 000. It always balances!",
    },
    {
      id: "acc-2",
      question: "What is depreciation?",
      steps: [
        "Depreciation is how much value an asset loses over time.",
        "Things like vehicles and equipment wear out as you use them.",
        "We record it as an expense every year.",
      ],
      example:
        "A taxi bought for R500 000 isn't worth the same after 3 years of Joburg potholes. The value it lost each year is its depreciation.",
    },
  ],
  "business-studies": [
    {
      id: "bus-1",
      question: "What is a SWOT analysis?",
      steps: [
        "S = Strengths, W = Weaknesses (inside the business).",
        "O = Opportunities, T = Threats (outside the business).",
        "It helps a business plan where it's going.",
      ],
      example:
        "Your kota shop: Strength — the best chips in the kasi. Weakness — only one fryer. Opportunity — a new school opening nearby. Threat — load shedding!",
    },
    {
      id: "bus-2",
      question: "Explain the purpose of the BBBEE Act",
      steps: [
        "BBBEE stands for Broad-Based Black Economic Empowerment.",
        "It aims to include previously disadvantaged people in the economy.",
        "Businesses get scored on ownership, skills development and more.",
      ],
      example:
        "It's like making sure everyone in class gets a turn on the soccer team — not just the same few players every match.",
    },
  ],
  economics: [
    {
      id: "eco-1",
      question: "What is inflation?",
      steps: [
        "Inflation is when prices go up over time.",
        "Your money buys less than it used to.",
        "The Reserve Bank raises interest rates to try to slow it down.",
      ],
      example:
        "Last year R10 bought you a loaf of bread and a Coke. This year the same R10 only buys the bread. That's inflation eating your money!",
    },
    {
      id: "eco-2",
      question: "Explain the law of demand",
      steps: [
        "When the price goes up, people buy less.",
        "When the price goes down, people buy more.",
        "Everything else must stay the same for this to hold.",
      ],
      example:
        "When KFC has a 2-for-R50 special, the queue goes around the block. When prices go up, the queue gets shorter.",
    },
  ],
  geography: [
    {
      id: "geo-1",
      question: "What causes a berg wind?",
      steps: [
        "High pressure over the interior pushes air towards the coast.",
        "The air sinks down the escarpment and gets squashed.",
        "Squashed (compressed) air heats up, so the coast gets hot and dry.",
      ],
      example:
        "In winter, Durban suddenly has a 30°C day with dry, dusty wind. That's warm air rushing down from the Highveld like a hairdryer pointed at the coast.",
    },
    {
      id: "geo-2",
      question: "What is urbanisation?",
      steps: [
        "Urbanisation is when more and more people move from rural areas to cities.",
        "People move for jobs, schools and services.",
        "It can cause informal settlements and traffic if cities can't keep up.",
      ],
      example:
        "Your cousin leaves the village in Limpopo to find work in Joburg. Multiply that by millions of people — that's urbanisation.",
    },
  ],
  history: [
    {
      id: "his-1",
      question: "Why was the 1976 Soweto Uprising important?",
      steps: [
        "Students protested against being forced to learn in Afrikaans.",
        "Police opened fire — Hector Pieterson became a symbol of the struggle.",
        "It brought world attention to apartheid and inspired more resistance.",
      ],
      example:
        "Imagine being told you must write your matric exams in a language you barely speak. The learners of 1976 said 'no' — and that's why 16 June is Youth Day.",
    },
    {
      id: "his-2",
      question: "What was the purpose of the TRC?",
      steps: [
        "The Truth and Reconciliation Commission was set up in 1996.",
        "Victims and perpetrators told the truth about apartheid crimes.",
        "The goal was healing the nation, with amnesty for full confessions.",
      ],
      example:
        "It's like a family sitting down after a big fight so everyone can say what happened, so you can still sit at the same table for Christmas lunch.",
    },
  ],
  "english-hl": [
    {
      id: "enghl-1",
      question: "What is the difference between a metaphor and a simile?",
      steps: [
        "A simile compares using 'like' or 'as'.",
        "A metaphor says one thing IS another thing.",
        "Both help the reader picture something vividly.",
      ],
      example:
        "Simile: 'He runs like Siya Kolisi charging the line.' Metaphor: 'He is a bulldozer on the field.'",
    },
    {
      id: "enghl-2",
      question: "How do you identify the theme of a poem?",
      steps: [
        "Ask: what big life lesson or idea is the poet talking about?",
        "Look at repeated images, words and the tone.",
        "Write it as a full sentence, not just one word.",
      ],
      example:
        "If a poem keeps mentioning empty chairs and old photos, the theme might be: 'Losing someone leaves a space that never really fills up.'",
    },
  ],
  "english-fal": [
    {
      id: "engfal-1",
      question: "When do you use the passive voice?",
      steps: [
        "Active: the doer comes first. 'Thabo kicked the ball.'",
        "Passive: the thing comes first. 'The ball was kicked by Thabo.'",
        "Use passive when the action is more important than who did it.",
      ],
      example:
        "'The spaza shop was robbed last night.' We care more about the shop than about who did it — so passive voice works best.",
    },
    {
      id: "engfal-2",
      question: "How do I write a good summary?",
      steps: [
        "Read the text and find the main points only.",
        "Write them in your own words, in full sentences.",
        "Stick to the word limit — no examples or your opinion.",
      ],
      example:
        "Summarising a 90-minute Bafana Bafana match: 'Bafana won 2–1 with a late goal.' Not every pass and throw-in!",
    },
  ],
  "afrikaans-fal": [
    {
      id: "afr-1",
      question: "How do you form the past tense in Afrikaans?",
      steps: [
        "Use 'het' + 'ge-' + the verb.",
        "'Ek eet' becomes 'Ek het geëet'.",
        "Some verbs that start with be-, ge-, her-, ont-, ver- don't take ge-.",
      ],
      example: "'Ek speel sokker' (now) becomes 'Ek het gister sokker gespeel' (yesterday). Easy as pap!",
    },
    {
      id: "afr-2",
      question: "What is the 'negative' (ontkenning) rule?",
      steps: [
        "Afrikaans uses a double 'nie' when making a sentence negative.",
        "'Ek gaan skool toe' becomes 'Ek gaan nie skool toe nie'.",
        "The second 'nie' goes at the end of the sentence.",
      ],
      example: "'Ek hou van broccoli' → 'Ek hou nie van broccoli nie.' Two 'nie's — like saying no twice to your mom's veggies!",
    },
  ],
  "isizulu-hl": [
    {
      id: "zul-1",
      question: "What is an isaga (idiom/proverb)?",
      steps: [
        "Isaga is a short saying with a deeper meaning.",
        "You don't read it word-for-word; you look for the lesson.",
        "Elders use them to teach wisdom.",
      ],
      example:
        "'Umuntu ngumuntu ngabantu' — a person is a person through other people. Like how your whole street helps when there's a funeral or a wedding.",
    },
    {
      id: "zul-2",
      question: "How do I analyse a character in a novel?",
      steps: [
        "Look at what the character says and does.",
        "Look at what other characters say about them.",
        "Give a quote or example from the book to prove your point.",
      ],
      example:
        "If a character always shares their lunch, you can say: 'Unomusa' (they are kind) — and point to the scene where they shared their food.",
    },
  ],
  "agricultural-sciences": [
    {
      id: "agr-1",
      question: "Why is crop rotation important?",
      steps: [
        "Different crops use different nutrients from the soil.",
        "Rotating crops lets the soil recover.",
        "It also breaks the life cycle of pests and diseases.",
      ],
      example:
        "If you only plant mielies every year, the soil gets 'tired'. Plant beans next season — they put nitrogen back, like giving the soil a nice plate of pap and vleis.",
    },
    {
      id: "agr-2",
      question: "What is the function of the rumen in cattle?",
      steps: [
        "The rumen is the biggest stomach compartment in a cow.",
        "Microbes in the rumen break down tough grass (cellulose).",
        "The cow chews the cud to break food down even more.",
      ],
      example:
        "The rumen is like a big potjie pot where tough grass slowly 'cooks' with the help of tiny microbes until the cow can use it.",
    },
  ],
  cat: [
    {
      id: "cat-1",
      question: "What does the VLOOKUP function do?",
      steps: [
        "VLOOKUP searches the first column of a table for a value.",
        "When it finds it, it returns a value from another column in the same row.",
        "=VLOOKUP(what, table, column number, FALSE).",
      ],
      example:
        "Like asking the tuck shop lady: 'What's the price of a Simba chips?' She finds 'Simba' on her list and reads across to the price column.",
    },
    {
      id: "cat-2",
      question: "What is the difference between RAM and storage?",
      steps: [
        "RAM is short-term memory — it's cleared when the device turns off.",
        "Storage keeps your files even when the power goes off.",
        "More RAM = more apps running smoothly at once.",
      ],
      example:
        "RAM is your desk during study time; storage is your bookshelf. When load shedding hits, the desk gets cleared — but the books stay on the shelf.",
    },
  ],
  "information-technology": [
    {
      id: "it-1",
      question: "What is the difference between a while loop and a for loop?",
      steps: [
        "A for loop runs a fixed number of times.",
        "A while loop runs as long as a condition is true.",
        "Use while when you don't know how many times it'll repeat.",
      ],
      example:
        "For loop: 'Do 20 push-ups.' While loop: 'Keep doing push-ups while coach is watching.'",
    },
    {
      id: "it-2",
      question: "What is a primary key in a database?",
      steps: [
        "A primary key uniquely identifies every record in a table.",
        "No two records can have the same primary key.",
        "It can't be empty.",
      ],
      example: "Your SA ID number is a primary key — no two South Africans share the same one.",
    },
  ],
  tourism: [
    {
      id: "tou-1",
      question: "What is ecotourism?",
      steps: [
        "Ecotourism is responsible travel to natural areas.",
        "It protects the environment and benefits local communities.",
        "Tourists learn about nature and culture without damaging it.",
      ],
      example:
        "Staying at a community-run lodge near the Kruger where local guides take you on walks and the money stays in the village — that's ecotourism.",
    },
    {
      id: "tou-2",
      question: "How do you calculate time zones?",
      steps: [
        "SA time is GMT+2.",
        "For every time zone east, add an hour; west, subtract an hour.",
        "Remember to check if the date changes!",
      ],
      example: "It's 12:00 in Joburg (GMT+2). London is GMT+0, so it's 10:00 there — they're still eating breakfast.",
    },
  ],
  "consumer-studies": [
    {
      id: "con-1",
      question: "What are the rights in the Consumer Protection Act?",
      steps: [
        "You have the right to safe, good-quality products.",
        "You have the right to fair and honest marketing.",
        "You can return faulty goods within 6 months.",
      ],
      example:
        "If your new kettle stops working after two weeks, the store must repair, replace or refund it. Keep your till slip!",
    },
    {
      id: "con-2",
      question: "Why is fibre important in a diet?",
      steps: [
        "Fibre helps your digestive system work properly.",
        "It keeps you full for longer.",
        "Found in whole grains, beans, fruit and veggies.",
      ],
      example:
        "Brown bread and morogo keep you full until break time. White bread and sweets? You're starving by second period.",
    },
  ],
  egd: [
    {
      id: "egd-1",
      question: "What is first-angle orthographic projection?",
      steps: [
        "You draw an object from different views: front, top and side.",
        "In first angle, the top view goes BELOW the front view.",
        "The left view goes on the RIGHT of the front view.",
      ],
      example:
        "Imagine a shoebox on the table. You look from the front, from above, and from the side — then 'flatten' those views onto your page in the right spots.",
    },
    {
      id: "egd-2",
      question: "What is an isometric drawing?",
      steps: [
        "Isometric drawings show an object in 3D.",
        "Vertical lines stay vertical; other lines are drawn at 30°.",
        "All measurements are drawn true to size.",
      ],
      example:
        "It's like drawing a Rubik's cube so it looks 3D, with the corner pointing at you and the sides sloping at 30°.",
    },
  ],
}
