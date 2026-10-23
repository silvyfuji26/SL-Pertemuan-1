import React, { useState } from 'react';
import { Sparkles, CheckSquare, Eye, EyeOff, Award, ArrowRight, HelpCircle, CheckCircle2 } from 'lucide-react';
import { sound } from '../utils/audio';

interface Mission3Props {
  onComplete: () => void;
  onAddPoints: (amount: number, reason: string) => void;
  onNextMission: () => void;
}

interface BattleRound {
  id: number;
  title: string;
  instruction: string;
  cardsUsed: string[];
  expectedAnswer: string;
  rationale: string;
  tutorTip: string;
}

const BATTLE_ROUNDS: BattleRound[] = [
  {
    id: 1,
    title: 'Ronde 1 — Susun Bilangan Terbesar',
    instruction: 'Berikan siswa 4 kartu angka konkret: 2, 4, 6, dan 8. Minta siswa menyusun kartu menjadi bilangan terbesar yang mungkin dibentuk!',
    cardsUsed: ['2', '4', '6', '8'],
    expectedAnswer: '8.642 (delapan ribu enam ratus empat puluh dua)',
    rationale: 'Agar bernilai paling besar, digit terbesar (8) diletakkan pada nilai tempat tertinggi (ribuan), disusul 6 pada ratusan, 4 pada puluhan, dan 2 pada satuan.',
    tutorTip: 'Tanyakan ke siswa: "Mengapa angka 8 ditaruh paling depan di ribuan, bukan angka 2?" Ini melatih nalar nilai tempat!',
  },
  {
    id: 2,
    title: 'Ronde 2 — Susun Bilangan Terkecil',
    instruction: 'Gunakan kembali kartu 2, 4, 6, dan 8. Sekarang tantang siswa menyusunnya menjadi bilangan terkecil!',
    cardsUsed: ['2', '4', '6', '8'],
    expectedAnswer: '2.468 (dua ribu empat ratus enam puluh delapan)',
    rationale: 'Sebaliknya, letakkan digit terkecil (2) pada ribuan, lalu 4 pada ratusan, 6 pada puluhan, dan digit terbesar (8) di satuan.',
    tutorTip: 'Ajak siswa menyadari pola: terbesar adalah urutan menurun (8-6-4-2), terkecil adalah urutan naik (2-4-6-8).',
  },
  {
    id: 3,
    title: 'Ronde 3 — Duel Perbandingan',
    instruction: 'Susun 2 bilangan menggunakan kartu di atas meja: 7.809 dan 7.890. Minta siswa membandingkan mana yang lebih besar dengan tanda > atau <.',
    cardsUsed: ['7', '8', '0', '9'],
    expectedAnswer: '7.809 < 7.890 (atau 7.890 > 7.809)',
    rationale: 'Ribuan sama (7), ratusan sama (8). Pada puluhan: 0 puluhan lebih kecil dari 9 puluhan (0 < 90).',
    tutorTip: 'Tutup digit lainnya dengan kertas, ajak siswa fokus hanya pada digit pertama yang berbeda (yaitu puluhan).',
  },
  {
    id: 4,
    title: 'Ronde 4 — Tebak Nilai Tempat Digit',
    instruction: 'Pada susunan kartu 8.642, tunjuk angka 6. Minta siswa menyebutkan nama nilai tempat dan berapa nilai sebenarnya angka tersebut!',
    cardsUsed: ['6'],
    expectedAnswer: 'Nilai tempat: Ratusan. Nilai angka: 600.',
    rationale: 'Angka 6 berada di posisi ratusan, sehingga nilainya 6 × 100 = 600.',
    tutorTip: 'Berikan bonus poin ekstra jika siswa dapat menjelaskan dengan lantang dan percaya diri!',
  },
];

export const Mission3CardBattle: React.FC<Mission3Props> = ({
  onComplete,
  onAddPoints,
  onNextMission,
}) => {
  const [completedRounds, setCompletedRounds] = useState<number[]>([]);
  const [showTutorGuide, setShowTutorGuide] = useState<boolean>(true);
  const [revealedAnswers, setRevealedAnswers] = useState<Record<number, boolean>>({});

  const toggleAnswer = (roundId: number) => {
    sound.playBubble();
    setRevealedAnswers((prev) => ({ ...prev, [roundId]: !prev[roundId] }));
  };

  const handleMarkRoundComplete = (roundId: number) => {
    sound.playCorrect();
    if (!completedRounds.includes(roundId)) {
      setCompletedRounds((prev) => [...prev, roundId]);
      onAddPoints(10, `Ronde ${roundId} Selesai`);
    }
  };

  const handleGiveExplanationBonus = (roundId: number) => {
    sound.playCoin();
    onAddPoints(5, `Bonus Penjelasan Keren Ronde ${roundId}`);
  };

  const allFinished = completedRounds.length === BATTLE_ROUNDS.length;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-800 bg-amber-100 px-3 py-1 rounded-full mb-2">
          <span>Misi 3 · Aktivitas Konkret (8 Menit)</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-display font-black text-slate-900">
          🃏 Number Card Battle
        </h2>
        <p className="text-slate-600 text-sm mt-1 max-w-xl mx-auto">
          Tutor menggunakan <strong>kartu angka kertas konkret</strong> di meja belajar. Website ini memandu alur duel, kunci jawaban, dan papan skor Shark Points!
        </p>
      </div>

      {/* Equipment Box */}
      <div className="bg-white rounded-3xl p-6 border border-sky-100 shadow-md">
        <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-800 mb-3 flex items-center gap-2">
          <CheckSquare className="w-4 h-4 text-cyan-600" /> Perlengkapan di Meja Belajar
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3.5 bg-sky-50 rounded-2xl border border-sky-100 flex items-center gap-3">
            <span className="text-2xl">🃏</span>
            <div>
              <div className="font-bold text-slate-900 text-sm">Kartu Angka 0–9</div>
              <div className="text-[11px] text-slate-500">Potongan kertas angka</div>
            </div>
          </div>
          <div className="p-3.5 bg-sky-50 rounded-2xl border border-sky-100 flex items-center gap-3">
            <span className="text-2xl">📝</span>
            <div>
              <div className="font-bold text-slate-900 text-sm">Kertas Coretan</div>
              <div className="text-[11px] text-slate-500">Untuk corat-coret siswa</div>
            </div>
          </div>
          <div className="p-3.5 bg-sky-50 rounded-2xl border border-sky-100 flex items-center gap-3">
            <span className="text-2xl">✏️</span>
            <div>
              <div className="font-bold text-slate-900 text-sm">Pensil & Penghapus</div>
              <div className="text-[11px] text-slate-500">Alat tulis aktif siswa</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tutor Guide Bar Toggle */}
      <div className="flex items-center justify-between bg-amber-50/80 border border-amber-200/80 p-4 rounded-2xl">
        <div className="flex items-center gap-2.5">
          <HelpCircle className="w-5 h-5 text-amber-700" />
          <div>
            <div className="font-bold text-amber-950 text-sm">Pedoman Alur Tutor</div>
            <div className="text-xs text-amber-800">
              Biarkan siswa meraba dan menyusun kartu fisik secara langsung. Beri apresiasi saat siswa dapat menjelaskan alasannya!
            </div>
          </div>
        </div>
        <button
          onClick={() => setShowTutorGuide(!showTutorGuide)}
          className="px-3 py-1.5 bg-white border border-amber-300 text-amber-900 font-bold text-xs rounded-xl hover:bg-amber-100 transition-colors shrink-0"
        >
          {showTutorGuide ? 'Sembunyikan Tips' : 'Lihat Tips Tutor'}
        </button>
      </div>

      {/* 4 Tangible Battle Rounds */}
      <div className="space-y-4">
        {BATTLE_ROUNDS.map((round) => {
          const isDone = completedRounds.includes(round.id);
          const isAnswerRevealed = !!revealedAnswers[round.id];

          return (
            <div
              key={round.id}
              className={`bg-white rounded-3xl p-6 border-2 transition-all ${
                isDone
                  ? 'border-emerald-300 bg-emerald-50/30'
                  : 'border-sky-100 hover:border-cyan-300'
              } shadow-md`}
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="space-y-2 max-w-2xl">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-blue-100 text-blue-900 font-extrabold text-xs flex items-center justify-center font-display">
                      0{round.id}
                    </span>
                    <h4 className="font-display font-bold text-lg text-slate-900">
                      {round.title}
                    </h4>
                    {isDone && (
                      <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Berhasil!
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-slate-700 leading-relaxed font-medium">
                    {round.instruction}
                  </p>

                  {/* Cards display representation */}
                  <div className="flex items-center gap-2 pt-1">
                    <span className="text-xs text-slate-400 font-medium">Kartu yang digunakan:</span>
                    <div className="flex items-center gap-1.5">
                      {round.cardsUsed.map((c, i) => (
                        <span
                          key={i}
                          className="w-7 h-9 rounded-lg bg-white border-2 border-slate-300 text-blue-950 font-display font-black text-sm flex items-center justify-center shadow-xs"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Tutor Tip Box */}
                  {showTutorGuide && (
                    <div className="bg-sky-50 border border-sky-100 p-3 rounded-xl text-xs text-slate-600 mt-2">
                      💡 <strong>Tips Tutor:</strong> {round.tutorTip}
                    </div>
                  )}

                  {/* Answer Key Reveal for Tutor */}
                  {isAnswerRevealed && (
                    <div className="bg-amber-50/90 border border-amber-200 p-3 rounded-xl text-xs space-y-1 mt-2 animate-in fade-in">
                      <div className="text-amber-900 font-bold">
                        Kunci Jawaban: {round.expectedAnswer}
                      </div>
                      <div className="text-amber-800">
                        Alasan: {round.rationale}
                      </div>
                    </div>
                  )}
                </div>

                {/* Tutor Control Actions */}
                <div className="flex flex-col sm:flex-row md:flex-col gap-2 shrink-0 pt-2 md:pt-0">
                  <button
                    onClick={() => toggleAnswer(round.id)}
                    className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5"
                  >
                    {isAnswerRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    <span>{isAnswerRevealed ? 'Tutup Kunci' : 'Kunci Jawaban'}</span>
                  </button>

                  <button
                    onClick={() => handleMarkRoundComplete(round.id)}
                    className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow-xs ${
                      isDone
                        ? 'bg-emerald-600 text-white'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{isDone ? 'Jawaban Benar (+10 🪙)' : 'Nilai Benar (+10 🪙)'}</span>
                  </button>

                  <button
                    onClick={() => handleGiveExplanationBonus(round.id)}
                    className="px-3 py-2 bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold text-xs rounded-xl flex items-center justify-center gap-1 border border-amber-200 active:scale-95"
                    title="Beri bonus jika siswa menjelaskan alasan dengan tepat!"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>Bonus Alasan (+5 🪙)</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Completion & Next */}
      <div className="text-center pt-4">
        {allFinished && (
          <div className="mb-4 inline-block bg-emerald-100 text-emerald-900 font-bold text-sm px-4 py-2 rounded-2xl">
            🎉 Semua ronde kartu fisik selesai dengan gemilang!
          </div>
        )}
        <div>
          <button
            onClick={() => {
              sound.playBubble();
              onComplete();
              onNextMission();
            }}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-display font-extrabold text-base rounded-2xl shadow-lg shadow-blue-500/20 active:scale-95 transition-all inline-flex items-center gap-2"
          >
            <span>Tuntaskan Misi 3 & Masuk Misi 4 (Math Hacks Lab)</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
