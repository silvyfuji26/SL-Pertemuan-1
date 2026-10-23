import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, XCircle, Sparkles, RefreshCw, HelpCircle, Trophy } from 'lucide-react';
import { sound } from '../utils/audio';

interface Mission1WarmUpProps {
  onComplete: () => void;
  onAddPoints: (amount: number, reason: string) => void;
  onNextMission: () => void;
}

interface Question {
  id: number;
  prompt: string;
  type: 'choice' | 'number';
  options?: string[];
  correctAnswer: string;
  explanation: string;
  hint: string;
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    prompt: 'Mana yang lebih besar, 4.567 atau 4.576?',
    type: 'choice',
    options: ['4.567', '4.576', 'Sama Besar'],
    correctAnswer: '4.576',
    explanation: 'Kedua bilangan punya ribuan (4) dan ratusan (5) yang sama. Kita lihat puluhannya: 7 puluhan (70) lebih besar daripada 6 puluhan (60). Jadi, 4.576 > 4.567!',
    hint: 'Bandingkan dari angka paling kiri (ribuan) ke kanan sampai menemukan angka yang berbeda!',
  },
  {
    id: 2,
    prompt: 'Berapa hasil dari 25 + 25?',
    type: 'number',
    correctAnswer: '50',
    explanation: '25 + 25 = 50. Trik cepat: bayangkan uang 25 rupiah ditambah 25 rupiah menjadi 50 rupiah!',
    hint: '20 + 20 = 40, lalu tambahkan 5 + 5 = 10. 40 + 10 = ...',
  },
  {
    id: 3,
    prompt: 'Berapa hasil dari 5 × 8?',
    type: 'number',
    correctAnswer: '40',
    explanation: '5 × 8 = 40. Trik cepat: Menghitung loncat 5 sebanyak 8 kali (5, 10, 15, 20, 25, 30, 35, 40) atau separuh dari 10 × 8 = 80 ÷ 2 = 40!',
    hint: 'Ingat perkalian 5 selalu berakhir dengan angka 0 atau 5.',
  },
  {
    id: 4,
    prompt: 'Jika ada 20 permen dibagikan sama rata kepada 4 teman, berapa permen yang diterima setiap teman?',
    type: 'number',
    correctAnswer: '5',
    explanation: '20 ÷ 4 = 5 permen. Karena 4 teman × 5 permen = 20 permen!',
    hint: 'Berapa angka yang jika dikalikan 4 hasilnya 20?',
  },
];

export const Mission1WarmUp: React.FC<Mission1WarmUpProps> = ({
  onComplete,
  onAddPoints,
  onNextMission,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [inputAnswer, setInputAnswer] = useState<string>('');
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  const currentQ = QUESTIONS[currentIndex];
  const isLastQuestion = currentIndex === QUESTIONS.length - 1;

  const handleCheckAnswer = (answer: string) => {
    const cleanAnswer = answer.trim().toLowerCase();
    const cleanCorrect = currentQ.correctAnswer.trim().toLowerCase();
    const correct = cleanAnswer === cleanCorrect;

    setIsAnswered(true);
    setIsCorrect(correct);

    if (correct) {
      sound.playCorrect();
      onAddPoints(15, `Warm-Up Soal ${currentIndex + 1}`);
      setCorrectCount((prev) => prev + 1);
    } else {
      sound.playBubble();
    }
  };

  const handleNext = () => {
    sound.playBubble();
    if (isLastQuestion) {
      onComplete();
    } else {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption('');
      setInputAnswer('');
      setIsAnswered(false);
      setIsCorrect(null);
      setShowHint(false);
    }
  };

  const handleRetry = () => {
    setIsAnswered(false);
    setIsCorrect(null);
    setInputAnswer('');
    setSelectedOption('');
    setShowHint(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header Info */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 text-xs font-bold text-cyan-700 bg-cyan-100/80 px-3 py-1 rounded-full mb-2">
          <span>Misi 1 · Pemanasan Cepat (5 Menit)</span>
        </div>
        <h2 className="text-3xl font-display font-black text-slate-900">
          🦈 Sharky Warm-Up Challenge
        </h2>
        <p className="text-slate-600 text-sm mt-1 max-w-lg mx-auto">
          Aktifkan radarmu! Jawab 4 pertanyaan kilat ini untuk membangkitkan insting matematika bawah lautmu.
        </p>
      </div>

      {/* Progress Dots */}
      <div className="flex items-center justify-center gap-3 mb-6">
        {QUESTIONS.map((q, idx) => (
          <div
            key={q.id}
            className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-xs transition-all ${
              idx === currentIndex
                ? 'bg-blue-600 text-white ring-4 ring-blue-100 scale-110 shadow-sm'
                : idx < currentIndex
                ? 'bg-emerald-500 text-white'
                : 'bg-slate-200 text-slate-500'
            }`}
          >
            {idx < currentIndex ? '✓' : idx + 1}
          </div>
        ))}
      </div>

      {/* Main Question Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sky-100 shadow-xl relative overflow-hidden">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-4 pb-3 border-b border-slate-100">
          <span>Pertanyaan {currentIndex + 1} dari {QUESTIONS.length}</span>
          <span className="text-amber-600 font-bold flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> +15 Shark Points
          </span>
        </div>

        <h3 className="font-display font-extrabold text-xl sm:text-2xl text-slate-900 mb-6 leading-snug">
          {currentQ.prompt}
        </h3>

        {/* Input / Choice Area */}
        {!isAnswered ? (
          <div className="space-y-4">
            {currentQ.type === 'choice' && currentQ.options ? (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {currentQ.options.map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setSelectedOption(option);
                      handleCheckAnswer(option);
                    }}
                    className="p-4 rounded-2xl border-2 border-sky-100 hover:border-cyan-500 hover:bg-cyan-50/50 font-display font-bold text-lg text-slate-800 transition-all text-center active:scale-95 shadow-xs"
                  >
                    {option}
                  </button>
                ))}
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (inputAnswer.trim()) {
                    handleCheckAnswer(inputAnswer);
                  }
                }}
                className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto"
              >
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={inputAnswer}
                  onChange={(e) => setInputAnswer(e.target.value)}
                  placeholder="Ketik jawaban angkamu..."
                  className="w-full text-center sm:text-left px-5 py-3.5 rounded-2xl border-2 border-slate-200 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 outline-hidden font-display font-bold text-xl text-slate-800"
                  autoFocus
                />
                <button
                  type="submit"
                  disabled={!inputAnswer.trim()}
                  className="w-full sm:w-auto px-6 py-3.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 active:scale-95 text-white font-bold rounded-2xl transition-all shadow-md shrink-0"
                >
                  Jawab
                </button>
              </form>
            )}

            {/* Hint Toggle */}
            <div className="pt-2 text-center">
              {!showHint ? (
                <button
                  type="button"
                  onClick={() => setShowHint(true)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-cyan-700 transition-colors"
                >
                  <HelpCircle className="w-3.5 h-3.5" /> Butuh Petunjuk Hiu?
                </button>
              ) : (
                <div className="inline-block bg-amber-50 border border-amber-200 text-amber-900 text-xs px-4 py-2 rounded-xl text-left">
                  💡 <strong>Petunjuk:</strong> {currentQ.hint}
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Answer Result & Explanation */
          <div className="space-y-5 animate-in fade-in duration-300">
            {isCorrect ? (
              <div className="bg-emerald-50 border border-emerald-200 p-5 rounded-2xl text-left flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-display font-bold text-emerald-900 text-base">
                    Luar Biasa! Jawabanmu Benar (+15 Poin 🪙)
                  </h4>
                  <p className="text-emerald-800 text-sm mt-1">
                    {currentQ.explanation}
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-rose-50 border border-rose-200 p-5 rounded-2xl text-left flex items-start gap-3">
                <XCircle className="w-6 h-6 text-rose-600 shrink-0 mt-0.5" />
                <div className="w-full">
                  <h4 className="font-display font-bold text-rose-900 text-base">
                    Ups, Sedikit Lagi! Jangan Menyerah.
                  </h4>
                  <p className="text-rose-800 text-sm mt-1">
                    Jawaban yang tepat adalah <strong className="font-bold underline">{currentQ.correctAnswer}</strong>.
                  </p>
                  <p className="text-slate-600 text-xs mt-2 bg-white/70 p-2.5 rounded-xl border border-rose-100">
                    💡 <strong>Penjelasan:</strong> {currentQ.explanation}
                  </p>
                </div>
              </div>
            )}

            {/* Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3">
              {!isCorrect && (
                <button
                  onClick={handleRetry}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Coba Lagi
                </button>
              )}

              <button
                onClick={handleNext}
                className="ml-auto px-6 py-3 rounded-2xl bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-sm flex items-center gap-2 shadow-md transition-all active:scale-95"
              >
                <span>{isLastQuestion ? 'Selesai & Lanjut ke Misi 2' : 'Soal Selanjutnya'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Completion Banner */}
      {isAnswered && isLastQuestion && (
        <div className="mt-8 bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-6 rounded-3xl shadow-lg text-center space-y-3">
          <Trophy className="w-10 h-10 mx-auto text-amber-300" />
          <h3 className="font-display font-black text-2xl">
            Sharky Warm-Up Berhasil Dituntaskan!
          </h3>
          <p className="text-cyan-100 text-sm max-w-md mx-auto">
            Kamu menjawab {correctCount} dari {QUESTIONS.length} soal dengan tepat. Sekarang saatnya membongkar rahasia angka di markas detektif!
          </p>
          <button
            onClick={onNextMission}
            className="mt-2 px-6 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-blue-950 font-extrabold text-sm shadow-md inline-flex items-center gap-2"
          >
            <span>Masuk ke Misi 2: Number Detective</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
