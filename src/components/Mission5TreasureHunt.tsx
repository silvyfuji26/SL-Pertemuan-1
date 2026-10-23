import React, { useState } from 'react';
import { Key, Sparkles, CheckCircle2, XCircle, ArrowRight, RefreshCw, HelpCircle, Trophy } from 'lucide-react';
import { TreasureCard } from '../types/math';
import { sound } from '../utils/audio';

interface Mission5Props {
  unlockedKeys: number[];
  onUnlockKey: (keyId: number) => void;
  onComplete: () => void;
  onAddPoints: (amount: number, reason: string) => void;
  onNextMission: () => void;
}

const TREASURE_CARDS: TreasureCard[] = [
  {
    id: 1,
    title: 'Kunci Samudera 1: Rahasia Lambang Bilangan',
    question: 'Tuliskan lambang bilangan dari "delapan ribu tiga puluh enam"!',
    hint: 'Ingat ratusannya adalah 0. Format: 8.036 atau 8036.',
    answerType: 'text',
    correctAnswer: '8.036',
    explanation: '8 di ribuan (8.000), 0 di ratusan (0), 3 di puluhan (30), dan 6 di satuan (6). Lambang bilangannya adalah 8.036!',
  },
  {
    id: 2,
    title: 'Kunci Samudera 2: Mengungkap Nilai Angka',
    question: 'Berapa nilai angka 7 pada bilangan 4.725?',
    hint: 'Angka 7 berada di posisi ratusan (setelah ribuan 4). Nilainya 7 × 100 = ...',
    answerType: 'number',
    correctAnswer: '700',
    explanation: 'Pada 4.725, angka 7 menempati posisi ratusan, sehingga nilainya adalah 700!',
  },
  {
    id: 3,
    title: 'Kunci Samudera 3: Navigasi Mengurutkan Bilangan',
    question: 'Urutkan bilangan berikut dari yang paling terkecil: 6.320, 6.203, dan 6.302!',
    hint: 'Bandingkan angka ratusannya: 200 lebih kecil dari 300. Pada ratusan 300, bandingkan puluhannya: 0 puluhan lebih kecil dari 2 puluhan.',
    answerType: 'choice',
    options: [
      '6.203, 6.302, 6.320',
      '6.320, 6.302, 6.203',
      '6.203, 6.320, 6.302',
    ],
    correctAnswer: '6.203, 6.302, 6.320',
    explanation: 'Urutan dari terkecil: 6.203 (ratusan 2) < 6.302 (puluhan 0) < 6.320 (puluhan 2)!',
  },
  {
    id: 4,
    title: 'Kunci Samudera 4: Penjumlahan Samudera',
    question: 'Hitunglah hasil dari 2.450 + 1.325 = ?',
    hint: 'Jumlahkan per nilai tempat: 2.000+1.000=3.000; 400+300=700; 50+20=70; 0+5=5.',
    answerType: 'number',
    correctAnswer: '3.775',
    explanation: '2.450 + 1.325 = 3.775. Tanpa teknik menyimpan, sangat rapi dan cepat!',
  },
  {
    id: 5,
    title: 'Kunci Samudera 5: Pengurangan Samudera',
    question: 'Hitunglah hasil dari 4.000 − 1.675 = ?',
    hint: 'Bisa gunakan trik: 3.999 − 1.675 = 2.324, lalu tambahkan 1 menjadi 2.325!',
    answerType: 'number',
    correctAnswer: '2.325',
    explanation: '4.000 − 1.675 = 2.325. Trik jenius: 3.999 − 1.675 = 2.324, lalu tambah 1 = 2.325!',
  },
  {
    id: 6,
    title: 'Kunci Samudera 6: Petualangan Kotak Pensil',
    question: 'Ada 6 kotak, masing-masing berisi 12 pensil. Semua pensil dibagikan sama rata kepada 8 anak. Berapa pensil yang diterima setiap anak?',
    hint: 'Langkah 1: Hitung total semua pensil (6 × 12 = ?). Langkah 2: Bagi total pensil dengan 8 anak.',
    answerType: 'number',
    correctAnswer: '9',
    explanation: 'Total pensil = 6 × 12 = 72 pensil. Lalu dibagikan ke 8 anak: 72 ÷ 8 = 9 pensil per anak!',
  },
];

export const Mission5TreasureHunt: React.FC<Mission5Props> = ({
  unlockedKeys,
  onUnlockKey,
  onComplete,
  onAddPoints,
  onNextMission,
}) => {
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [userInputs, setUserInputs] = useState<Record<number, string>>({});
  const [feedbackState, setFeedbackState] = useState<Record<number, {
    isAnswered: boolean;
    isCorrect: boolean | null;
    showHint: boolean;
  }>>({});

  const currentCard = TREASURE_CARDS[activeCardIndex];
  const allKeysCollected = unlockedKeys.length >= 6;

  const handleCheckAnswer = (card: TreasureCard) => {
    const rawInput = userInputs[card.id] || '';
    const cleanInput = rawInput.trim().replace(/\s+/g, '').replace(/\./g, '');
    const cleanCorrect = card.correctAnswer.replace(/\s+/g, '').replace(/\./g, '');

    const isMatch = cleanInput.toLowerCase() === cleanCorrect.toLowerCase();

    setFeedbackState((prev) => ({
      ...prev,
      [card.id]: {
        isAnswered: true,
        isCorrect: isMatch,
        showHint: prev[card.id]?.showHint || false,
      },
    }));

    if (isMatch) {
      sound.playCorrect();
      if (!unlockedKeys.includes(card.id)) {
        onUnlockKey(card.id);
        onAddPoints(25, `Kunci Harta ${card.id}`);
      }
      if (unlockedKeys.length + 1 >= 6) {
        sound.playChestOpen();
        onComplete();
      }
    } else {
      sound.playBubble();
    }
  };

  const handleRetry = (cardId: number) => {
    setFeedbackState((prev) => ({
      ...prev,
      [cardId]: {
        isAnswered: false,
        isCorrect: null,
        showHint: true,
      },
    }));
    setUserInputs((prev) => ({ ...prev, [cardId]: '' }));
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-900 bg-amber-100 px-3 py-1 rounded-full mb-2">
          <span>Misi 5 · Perburuan Kunci Harta Karun (13 Menit)</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-display font-black text-slate-900">
          🗝️ Treasure Hunt Challenge
        </h2>
        <p className="text-slate-600 text-sm mt-1 max-w-xl mx-auto">
          Pecahkan 6 misi rahasia untuk membuka 6 kunci emas samudera. Kumpulkan semuanya untuk membuka peti harta karun Sharky!
        </p>
      </div>

      {/* Keys Inventory Bar */}
      <div className="bg-gradient-to-r from-blue-900 via-sky-900 to-cyan-900 text-white rounded-3xl p-5 shadow-lg border border-cyan-400/20">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-400 text-amber-950 flex items-center justify-center font-black text-2xl shadow-md">
              🗝️
            </div>
            <div>
              <span className="text-[11px] font-bold text-cyan-200 uppercase tracking-wider block">
                Koleksi Kunci Emas
              </span>
              <div className="font-display font-extrabold text-xl text-white">
                {unlockedKeys.length} / 6 Kunci Terkumpul
              </div>
            </div>
          </div>

          {/* 6 Key Slots */}
          <div className="flex items-center gap-2 sm:gap-3">
            {[1, 2, 3, 4, 5, 6].map((keyNum) => {
              const isUnlocked = unlockedKeys.includes(keyNum);
              return (
                <button
                  key={keyNum}
                  onClick={() => {
                    sound.playBubble();
                    setActiveCardIndex(keyNum - 1);
                  }}
                  className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center transition-all ${
                    isUnlocked
                      ? 'bg-amber-400 text-blue-950 ring-2 ring-amber-200 shadow-md scale-105'
                      : activeCardIndex === keyNum - 1
                      ? 'bg-white/20 text-white border-2 border-cyan-300'
                      : 'bg-white/10 text-white/40 border border-white/10 hover:bg-white/15'
                  }`}
                  title={`Kartu Misi Kunci ${keyNum}`}
                >
                  <Key className={`w-5 h-5 ${isUnlocked ? 'fill-current' : ''}`} />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Mission Card Deck */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sky-100 shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-sky-100 text-blue-900 font-bold text-xs rounded-lg font-display">
              Kartu {currentCard.id} dari 6
            </span>
            <h3 className="font-display font-bold text-lg text-slate-900">
              {currentCard.title}
            </h3>
          </div>
          {unlockedKeys.includes(currentCard.id) && (
            <span className="text-xs font-bold text-amber-600 bg-amber-50 px-3 py-1 rounded-full flex items-center gap-1 border border-amber-200">
              🗝️ Kunci Diperoleh!
            </span>
          )}
        </div>

        {/* Question Prompt */}
        <div className="bg-sky-50/70 p-5 rounded-2xl border border-sky-200/80">
          <h4 className="font-display font-bold text-xl text-slate-900 leading-snug">
            {currentCard.question}
          </h4>
        </div>

        {/* Answer Form or Choice Buttons */}
        {!feedbackState[currentCard.id]?.isAnswered ? (
          <div className="space-y-4">
            {currentCard.answerType === 'choice' && currentCard.options ? (
              <div className="grid grid-cols-1 gap-2.5">
                {currentCard.options.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => {
                      setUserInputs((prev) => ({ ...prev, [currentCard.id]: opt }));
                      handleCheckAnswer({
                        ...currentCard,
                        options: currentCard.options,
                      });
                    }}
                    className="p-4 text-left rounded-2xl border-2 border-sky-100 hover:border-cyan-500 hover:bg-cyan-50/50 font-display font-bold text-base text-slate-800 transition-all active:scale-98 shadow-xs"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if ((userInputs[currentCard.id] || '').trim()) {
                    handleCheckAnswer(currentCard);
                  }
                }}
                className="flex flex-col sm:flex-row items-center gap-3 max-w-md"
              >
                <input
                  type="text"
                  value={userInputs[currentCard.id] || ''}
                  onChange={(e) =>
                    setUserInputs((prev) => ({
                      ...prev,
                      [currentCard.id]: e.target.value,
                    }))
                  }
                  placeholder="Ketik jawabanmu..."
                  className="w-full px-5 py-3.5 rounded-2xl border-2 border-slate-200 focus:border-cyan-500 font-display font-bold text-xl text-center sm:text-left"
                  autoFocus
                />
                <button
                  type="submit"
                  disabled={!(userInputs[currentCard.id] || '').trim()}
                  className="w-full sm:w-auto px-6 py-3.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold rounded-2xl shadow-md shrink-0 active:scale-95"
                >
                  Buka Kunci
                </button>
              </form>
            )}

            {/* Hint Box */}
            <div className="pt-2">
              {!feedbackState[currentCard.id]?.showHint ? (
                <button
                  type="button"
                  onClick={() =>
                    setFeedbackState((prev) => ({
                      ...prev,
                      [currentCard.id]: {
                        ...prev[currentCard.id],
                        showHint: true,
                        isAnswered: prev[currentCard.id]?.isAnswered || false,
                        isCorrect: prev[currentCard.id]?.isCorrect || null,
                      },
                    }))
                  }
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-cyan-700"
                >
                  <HelpCircle className="w-3.5 h-3.5" /> Butuh Petunjuk Kunci Ini?
                </button>
              ) : (
                <div className="bg-amber-50 border border-amber-200 text-amber-900 text-xs p-3 rounded-xl">
                  💡 <strong>Petunjuk:</strong> {currentCard.hint}
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Feedback view */
          <div className="space-y-4 animate-in fade-in">
            {feedbackState[currentCard.id]?.isCorrect ? (
              <div className="bg-emerald-50 border border-emerald-200 p-5 rounded-2xl text-emerald-900 space-y-2">
                <div className="font-display font-extrabold text-lg flex items-center gap-2">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                  Kunci Emas Berhasil Diraih! (+25 Shark Points 🪙)
                </div>
                <p className="text-xs text-emerald-800 leading-relaxed">
                  💡 <strong>Penjelasan:</strong> {currentCard.explanation}
                </p>
              </div>
            ) : (
              <div className="bg-rose-50 border border-rose-200 p-5 rounded-2xl text-rose-900 space-y-2">
                <div className="font-display font-extrabold text-base flex items-center gap-2">
                  <XCircle className="w-5 h-5 text-rose-600" />
                  Kunci Masih Terkunci! Coba periksa kembali hitunganmu.
                </div>
                <p className="text-xs text-slate-700 bg-white/70 p-3 rounded-xl border border-rose-100">
                  💡 <strong>Petunjuk:</strong> {currentCard.hint}
                </p>
                <button
                  onClick={() => handleRetry(currentCard.id)}
                  className="px-4 py-2 bg-white border border-rose-200 text-rose-800 font-bold text-xs rounded-xl flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Coba Lagi
                </button>
              </div>
            )}

            {/* Quick Navigation to other cards */}
            <div className="flex items-center justify-between pt-2">
              <button
                disabled={activeCardIndex === 0}
                onClick={() => {
                  sound.playBubble();
                  setActiveCardIndex((prev) => prev - 1);
                }}
                className="px-4 py-2 border border-slate-200 text-slate-700 rounded-xl text-xs font-bold disabled:opacity-40"
              >
                ← Kunci Sebelumnya
              </button>

              <button
                disabled={activeCardIndex === TREASURE_CARDS.length - 1}
                onClick={() => {
                  sound.playBubble();
                  setActiveCardIndex((prev) => prev + 1);
                }}
                className="px-4 py-2 bg-cyan-600 text-white rounded-xl text-xs font-bold disabled:opacity-40 hover:bg-cyan-700"
              >
                Kunci Selanjutnya →
              </button>
            </div>
          </div>
        )}
      </div>

      {/* GRAND TREASURE CHEST UNLOCKED SECTION */}
      {allKeysCollected && (
        <div className="bg-gradient-to-br from-amber-500 via-yellow-400 to-amber-600 p-1 rounded-3xl shadow-2xl animate-in zoom-in-95 duration-500">
          <div className="bg-gradient-to-b from-blue-950 to-slate-900 rounded-[22px] p-6 sm:p-10 text-center text-white relative overflow-hidden">
            <div className="max-w-md mx-auto space-y-4">
              <div className="relative rounded-2xl overflow-hidden border-2 border-amber-300 shadow-2xl aspect-[16/9] mx-auto">
                <img
                  src="/src/assets/images/treasure_chest_underwater_1792734664634.jpg"
                  alt="Peti Harta Karun Bawah Laut Terbuka"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 font-bold text-xs border border-amber-400/40">
                <Trophy className="w-4 h-4 text-amber-400" />
                <span>PETI HARTA KARUN BERHASIL TERBUKA!</span>
              </div>

              <h3 className="font-display font-black text-2xl sm:text-3xl text-amber-300">
                Selamat, Petualang Samudera!
              </h3>

              <p className="text-sm text-sky-100">
                Keenam kunci emas telah menyatu. Harta karun kebijaksanaan matematika kelas 4 kini menjadi milikmu!
              </p>

              <button
                onClick={() => {
                  sound.playBubble();
                  onNextMission();
                }}
                className="px-8 py-3.5 bg-amber-400 hover:bg-amber-300 text-blue-950 font-display font-black text-base rounded-2xl shadow-lg active:scale-95 transition-all inline-flex items-center gap-2"
              >
                <span>Hadapi Final Boss & Evaluasi Akhir</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
