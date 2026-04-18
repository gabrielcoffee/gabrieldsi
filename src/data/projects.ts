export interface Project {
  id: string
  name: string
  description: string
  details: string
  image: string
}

export const projects: Project[] = [
  {
    id: 'gabrieldsi',
    name: 'GabrielDSi',
    description: 'Portfolio in DSi style',
    details: 'My portfolio webpage in the Nintendo DSi system style. Built with React, TypeScript, and Framer Motion featuring touch scrolling, background music, webcam integration, and pixel-perfect retro aesthetics.',
    image: '/images/project.png',
  },
  {
    id: 'feels',
    name: 'Feels',
    description: 'Terminal mood tracker',
    details: 'A mood tracker for developers. Runs entirely in your terminal. Track your emotional state over time with a simple CLI interface designed for people who live in the command line.',
    image: '/images/project.png',
  },
  {
    id: 'be-my-translator',
    name: 'Be My Translator',
    description: 'Translation app',
    details: 'A translation application that helps bridge language barriers. Simple, fast, and intuitive interface for translating text between multiple languages.',
    image: '/images/project.png',
  },
  {
    id: 'rent',
    name: 'Rent',
    description: 'C2C rent-everything startup',
    details: 'React Native app for a C2C rent-everything business startup. Includes a mobile frontend, landing page, and web admin dashboard for managing items being rented on the platform.',
    image: '/images/project.png',
  },
  {
    id: 'pio-brasileiro',
    name: 'Pio Brasileiro',
    description: 'School booking app',
    details: 'Meal and room booking web app for Brazilian Pio School in Italy. Streamlines the reservation process for students and staff with an easy-to-use interface.',
    image: '/images/project.png',
  },
  {
    id: 'truster',
    name: 'Truster',
    description: 'Genuine social network',
    details: 'No ads, no brands, just real people. Truster is a social network dedicated to genuine, meaningful connections. A platform focused on authenticity over engagement metrics.',
    image: '/images/project.png',
  },
  {
    id: 'goalminder',
    name: 'Goalminder',
    description: 'Goal reminder app',
    details: 'A goal reminder web app. Set new goals, receive email reminders and track your progress! Stay on top of your objectives with scheduled notifications and visual progress tracking.',
    image: '/images/project.png',
  },
  {
    id: 'old-games',
    name: 'Old Games',
    description: 'Classic game recreations',
    details: 'Recreations of classic arcade games including a Flappy Bird clone with extra twists built in vanilla Java, and a Pong copy made with C# in MonoGame. A tribute to the golden age of gaming.',
    image: '/images/project.png',
  },
]
