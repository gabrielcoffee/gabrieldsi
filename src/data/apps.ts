import type { PortfolioApp } from '../types'

export const apps: PortfolioApp[] = [
  { id: 'about',    name: 'About',    description: 'Who is Gabriel?',        color: '#7ec8e3' },
  { id: 'projects', name: 'Projects', description: 'Things I have built.',   color: '#f6c84c' },
  { id: 'music',    name: 'Music',    description: 'Songs I have written.',  color: '#e76f6f' },
  { id: 'camera',   name: 'Camera',   description: 'Say hi with your webcam.', color: '#8fd18f' },
  { id: 'contact',  name: 'Contact',  description: 'Get in touch.',          color: '#c28fe7' },
]

/** Number of empty placeholder slots appended after the real apps. */
export const EMPTY_SLOT_COUNT = 10
