export const episodes = [
  { id: 1, number: 140, title: '"Owambe" Pressure', slug: 'owambe-pressure', description: 'When every weekend is a party and your pocket is crying. We break down the economics of Lagos social life.', showNotes: 'In this episode, Dami and Isaac tackle the unspoken financial pressure of Lagos social life. From endless owambe invitations to aso-ebi demands, they explore why young Nigerians feel compelled to show up — and show out — even when their wallets can\'t handle it.', duration: '42:15', date: '2026-03-25', tags: ['Culture', 'Money'], status: 'published' },
  { id: 2, number: 139, title: 'The Japa Dilemma', slug: 'the-japa-dilemma', description: 'To leave or to stay? A deep dive into the great Nigerian migration debate.', showNotes: 'The great japa debate. Dami and Isaac break down the push and pull factors driving young Nigerians abroad, and what it means for those who choose to stay.', duration: '38:47', date: '2026-03-18', tags: ['Migration', 'Identity'], status: 'published' },
  { id: 3, number: 138, title: 'Mummy Said No', slug: 'mummy-said-no', description: 'Nigerian parents and the art of saying no to everything. Featuring your wildest stories.', showNotes: 'Why do Nigerian parents say no to literally everything first? We unpack the psychology, share listener stories, and debate whether it builds character or causes chaos.', duration: '55:03', date: '2026-03-11', tags: ['Family', 'Comedy'], status: 'published' },
  { id: 4, number: 137, title: 'Lagos vs Abuja', slug: 'lagos-vs-abuja', description: 'Which city really runs Nigeria? We settle the debate once and for all.', showNotes: 'The eternal rivalry. Cost of living, nightlife, career opportunities, traffic, vibes — we compare everything and let listeners vote.', duration: '41:22', date: '2026-03-04', tags: ['Debate', 'Culture'], status: 'published' },
  { id: 5, number: 136, title: 'Salary Conversations', slug: 'salary-conversations', description: 'Why are Nigerians so secretive about what they earn? Let\'s unpack it.', showNotes: 'Money talks, but Nigerians don\'t. We explore why salary transparency is taboo, how it affects negotiations, and whether Gen Z is changing the game.', duration: '44:10', date: '2026-02-25', tags: ['Money', 'Work'], status: 'published' },
  { id: 6, number: 135, title: 'Church or Mosque Politics', slug: 'church-mosque-politics', description: 'Religious family drama and the pressure of spiritual expectations.', showNotes: 'When your family\'s faith becomes your burden. We discuss the intersection of religion, family pressure, and personal belief in Nigerian homes.', duration: '49:38', date: '2026-02-18', tags: ['Family', 'Culture'], status: 'published' },
  { id: 7, number: 134, title: 'Side Hustle Season', slug: 'side-hustle-season', description: 'From selling on Instagram to crypto — every young Nigerian has a side thing.', showNotes: 'We break down the most popular side hustles, what actually works, and why the 9-5 alone doesn\'t cut it anymore.', duration: '43:55', date: '2026-02-11', tags: ['Money', 'Work'], status: 'published' },
  { id: 8, number: 133, title: 'Toxic Friendships', slug: 'toxic-friendships', description: 'How to spot them, how to leave them, and why we stay too long.', showNotes: 'Friendships that drain you. We talk about the signs, the guilt of cutting people off, and how to build a healthier circle.', duration: '47:20', date: '2026-02-04', tags: ['Relationships'], status: 'published' },
  { id: 9, number: 132, title: 'NEPA vs Generator', slug: 'nepa-vs-generator', description: 'The never-ending battle for electricity in Nigeria. We need to talk about it.', showNotes: 'Fuel costs, inverters, solar panels, or just vibing in darkness. The real cost of power in Nigeria and why nothing has changed.', duration: '39:12', date: '2026-01-28', tags: ['Culture', 'Hot Takes'], status: 'published' },
  { id: 10, number: 131, title: 'Dating in Lagos', slug: 'dating-in-lagos', description: 'Situationships, talking stages, and why nobody wants to commit.', showNotes: 'The Lagos dating scene is wild. We break down the talking stage epidemic, split-bill debates, and what modern Nigerian dating actually looks like.', duration: '52:30', date: '2026-01-21', tags: ['Relationships', 'Culture'], status: 'published' },
  { id: 11, number: 130, title: 'Nollywood Renaissance', slug: 'nollywood-renaissance', description: 'Nigerian cinema is having a moment. Are we finally world-class?', showNotes: 'From low-budget Asaba films to global Netflix hits. We trace the evolution and debate where Nollywood goes from here.', duration: '45:18', date: '2026-01-14', tags: ['Culture', 'Hot Takes'], status: 'published' },
  { id: 12, number: 129, title: 'The Entitlement Episode', slug: 'the-entitlement-episode', description: 'Family members who feel entitled to your success. How do you handle it?', showNotes: 'You made it, and now everyone wants a piece. We discuss the cultural expectation of sharing wealth and where to draw the line.', duration: '50:05', date: '2026-01-07', tags: ['Family', 'Money'], status: 'published' },
];

export const allTags = ['All', 'Culture', 'Money', 'Family', 'Relationships', 'Migration', 'Comedy', 'Work', 'Hot Takes', 'Debate', 'Identity'];

export const dilemmas = [
  {
    id: 1,
    scenario: 'Your aunty gives you ₦500K to hold for her. Your rent is due and she travels for 3 months. What do you do?',
    options: [
      { label: 'A', text: 'Touch am. Pay rent. Hustle to replace it before she returns.', votes: 1204 },
      { label: 'B', text: "Don't touch it. Sleep on the street if you have to. Integrity first.", votes: 892 },
      { label: 'C', text: 'Call aunty, explain the situation, and ask properly.', votes: 751 },
    ],
    active: true,
    date: '2026-03-25',
  },
  {
    id: 2,
    scenario: 'Your best friend is dating your ex and didn\'t tell you. You find out from someone else. What do you do?',
    options: [
      { label: 'A', text: 'Confront both of them. This is betrayal.', votes: 1830 },
      { label: 'B', text: 'Say nothing. Your ex is your ex for a reason.', votes: 1102 },
      { label: 'C', text: 'Cut the friend off silently. No drama needed.', votes: 480 },
    ],
    active: false,
    date: '2026-03-11',
  },
  {
    id: 3,
    scenario: 'Your boss takes credit for your work in a meeting with the CEO. Everyone saw it happen. What\'s your move?',
    options: [
      { label: 'A', text: 'Call it out right there in the meeting. Respect yourself.', votes: 945 },
      { label: 'B', text: 'Talk to your boss privately after. Give them a chance to fix it.', votes: 1560 },
      { label: 'C', text: 'Start documenting everything. Build your case quietly.', votes: 386 },
    ],
    active: false,
    date: '2026-02-25',
  },
];

export const siteConfig = {
  heroTitle: 'Unapologetically',
  heroTitleAccent: 'Nigerian',
  heroDescription: 'Bold social commentary on pop culture, relationships, Japa struggles, and everyday experiences that define young Nigerians. Real talk. No filter.',
  aboutText: 'Being young in Nigeria comes with its own struggles, wins, and wahala. So Nigerian is a bold social commentary podcast that unpacks pop culture, relationships, Japa struggles, social media, and everyday experiences that define young Nigerians. Hosted by Dami Aros & Isaac, we keep it real, relatable, and unfiltered, sharing hot takes, personal stories, and deep conversations that feel just like gist with your friends.',
  hosts: [
    {
      name: 'Dami Aros',
      bio: 'Storyteller and podcaster who brings humor, honesty, and cultural insight to every conversation. Five years behind the mic turning real stories into unfiltered, relatable moments.',
      role: 'Co-host',
    },
    {
      name: 'Isaac Aigbadumah',
      bio: 'Writer, podcaster, and communications professional passionate about culture, identity, and storytelling. Beyond the podcast, Isaac works in marketing and public relations.',
      role: 'Co-host',
    },
  ],
  stats: {
    totalPlays: 1293139,
    countries: 92,
  },
  socials: {
    instagram: '#',
    twitter: '#',
    youtube: '#',
    tiktok: '#',
  },
  contact: {
    email: 'Sonigerian@eggcorndigital.com',
    phone: '0909 982 5828',
  },
};
