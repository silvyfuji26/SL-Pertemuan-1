export interface Mission {
  id: number;
  title: string;
  subtitle: string;
  durationMinutes: number;
  iconName: string;
  isCompleted: boolean;
}

export interface MysteryNumberState {
  thousands: number;
  hundreds: number;
  tens: number;
  ones: number;
  answer: number;
}

export interface HackPracticeState {
  answered: boolean;
  isCorrect: boolean | null;
  userAnswer: string;
  showHint: boolean;
}

export interface TreasureCard {
  id: number;
  title: string;
  question: string;
  clue?: string;
  hint: string;
  answerType: 'text' | 'number' | 'order' | 'choice';
  correctAnswer: string;
  options?: string[];
  explanation: string;
}

export interface FinalQuizQuestion {
  id: number;
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  topic: string;
}

export interface TutorObservation {
  membacaBilangan: boolean;
  nilaiTempat: boolean;
  perbandinganBilangan: boolean;
  penjumlahan: boolean;
  pengurangan: boolean;
  perkalian: boolean;
  pembagian: boolean;
  notes: string;
}
