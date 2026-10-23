import React, { useState } from 'react';
import { Trophy, CheckCircle2, XCircle, RefreshCw, Award, ClipboardCheck, ArrowRight, HelpCircle } from 'lucide-react';
import { FinalQuizQuestion, TutorObservation } from '../types/math';
import { sound } from '../utils/audio';

interface Mission6Props {
  onComplete: () => void;
  onAddPoints: (amount: number, reason: string) => void;
  onOpenCertificate: () => void;
  tutorObservation: TutorObservation;
  onUpdateObservation: (obs: TutorObservation) => void;
}

const FINAL_QUESTIONS: FinalQuizQuestion[] = [
  {
    id: 1,
    question: 'Tuliskan lambang bilangan dari "sembilan ribu lima puluh dua"!',
    options: ['9.502', '9.052', '9.520', '9.025'],
    correctAnswer: '9.052',
    explanation: 'Ribuan 9, ratusan 0 (karena tidak ada kata ratus), puluhan 5, satuan 2. Ditulis: 9.052.',
    topic: 'Membaca & Menulis Bilangan',
  },
  {
    id: 2,
    question: 'Berapa nilai angka 6 pada bilangan 6.284?',
    options: ['60', '600', '6.000', '60.000'],
    correctAnswer: '6.000',
    explanation: 'Angka 6 berada di posisi paling kiri (ribuan), jadi nilainya adalah 6.000.',
    topic: 'Nilai Tempat',
  },
  {
    id: 3,
    question: 'Urutkan bilangan 3.210, 3.120, 3.201 dari yang terkecil ke terbesar!',
    options: [
      '3.120, 3.201, 3.210',
      '3.210, 3.201, 3.120',
      '3.120, 3.210, 3.201',
      '3.201, 3.120, 3.210',
    ],
    correctAnswer: '3.120, 3.201, 3.210',
    explanation: '3.120 memiliki ratusan 1 (paling kecil). Di antara 3.201 dan 3.210, puluhannya 0 lebih kecil dari 1.',
    topic: 'Mengurutkan Bilangan',
  },
  {
    id: 4,
    question: 'Hitunglah hasil dari 2.456 + 1.321 = ?',
    options: ['3.777', '3.877', '3.767', '3.787'],
    correctAnswer: '3.777',
    explanation: '2.456 + 1.321 = 3.777 (2000+1000=3000, 400+300=700, 50+20=70, 6+1=7).',
    topic: 'Penjumlahan',
  },
  {
    id: 5,
    question: 'Hitunglah hasil dari 72 ÷ 8 = ?',
    options: ['7', '8', '9', '12'],
    correctAnswer: '9',
    explanation: '72 ÷ 8 = 9, karena 8 × 9 = 72.',
    topic: 'Pembagian',
  },
];

export const Mission6FinalBoss: React.FC<Mission6Props> = ({
  onComplete,
  onAddPoints,
  onOpenCertificate,
  tutorObservation,
  onUpdateObservation,
}) => {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'quiz' | 'tutor-eval'>('quiz');

  const handleSelectAnswer = (qId: number, ans: string) => {
    if (submitted) return;
    sound.playBubble();
    setAnswers((prev) => ({ ...prev, [qId]: ans }));
  };

  const handleSubmitQuiz = () => {
    let currentScore = 0;
    FINAL_QUESTIONS.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) {
        currentScore += 1;
      }
    });

    setScore(currentScore);
    setSubmitted(true);

    if (currentScore === 5) {
      sound.playCorrect();
      onAddPoints(50, 'Nilai Sempurna Evaluasi Akhir!');
    } else {
      sound.playBubble();
      onAddPoints(currentScore * 10, 'Evaluasi Akhir');
    }

    onComplete();
  };

  const handleResetQuiz = () => {
    sound.playBubble();
    setAnswers({});
    setSubmitted(false);
    setScore(0);
  };

  const isAllAnswered = FINAL_QUESTIONS.every((q) => answers[q.id]);

  const toggleObservationSkill = (key: keyof Omit<TutorObservation, 'notes'>) => {
    onUpdateObservation({
      ...tutorObservation,
      [key]: !tutorObservation[key],
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-900 bg-blue-100 px-3 py-1 rounded-full mb-2">
          <span>Misi 6 · Evaluasi Akhir (7 Menit)</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-display font-black text-slate-900">
          👑 Final Boss: Ujian Kehormatan Samudera
        </h2>
        <p className="text-slate-600 text-sm mt-1 max-w-xl mx-auto">
          Buktikan seluruh keahlian yang telah kamu pelajari hari ini! Jawab 5 soal komprehensif untuk menyandang gelar Sharky Math Explorer.
        </p>
      </div>

      {/* Mode Tabs: Kuis Siswa vs Catatan Observasi Tutor */}
      <div className="flex items-center justify-center p-1 bg-slate-100 rounded-2xl max-w-sm mx-auto">
        <button
          onClick={() => setActiveTab('quiz')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
            activeTab === 'quiz' ? 'bg-white text-blue-950 shadow-xs' : 'text-slate-600'
          }`}
        >
          Kuis Siswa (5 Soal)
        </button>
        <button
          onClick={() => setActiveTab('tutor-eval')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'tutor-eval' ? 'bg-white text-blue-950 shadow-xs' : 'text-slate-600'
          }`}
        >
          <ClipboardCheck className="w-3.5 h-3.5 text-cyan-600" />
          <span>Catatan Observasi Tutor</span>
        </button>
      </div>

      {activeTab === 'quiz' ? (
        <div className="space-y-6">
          {/* Question List */}
          {FINAL_QUESTIONS.map((q, idx) => {
            const isUserAnswer = answers[q.id];
            const isCorrect = submitted && isUserAnswer === q.correctAnswer;
            const isWrong = submitted && isUserAnswer !== q.correctAnswer;

            return (
              <div
                key={q.id}
                className={`bg-white rounded-3xl p-6 border-2 transition-all shadow-md ${
                  submitted
                    ? isCorrect
                      ? 'border-emerald-300 bg-emerald-50/20'
                      : 'border-rose-300 bg-rose-50/20'
                    : 'border-sky-100'
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-sky-100 text-blue-900 font-extrabold text-xs flex items-center justify-center font-display">
                      0{idx + 1}
                    </span>
                    <span className="text-xs font-bold text-cyan-700 uppercase tracking-wider">
                      {q.topic}
                    </span>
                  </div>

                  {submitted && (
                    <div>
                      {isCorrect ? (
                        <span className="flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Benar
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-xs font-bold text-rose-700 bg-rose-100 px-2.5 py-1 rounded-full">
                          <XCircle className="w-4 h-4 text-rose-600" /> Perlu Review
                        </span>
                      )}
                    </div>
                  )}
                </div>

                <h3 className="font-display font-bold text-lg text-slate-900 mb-4">
                  {q.question}
                </h3>

                {/* Options Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {q.options?.map((opt) => {
                    const isSelected = isUserAnswer === opt;
                    const isThisTheCorrectAnswer = opt === q.correctAnswer;

                    let btnClass = 'border-slate-200 hover:border-cyan-400 hover:bg-cyan-50/40 text-slate-800';

                    if (submitted) {
                      if (isThisTheCorrectAnswer) {
                        btnClass = 'bg-emerald-100 border-emerald-400 text-emerald-950 font-bold';
                      } else if (isSelected && !isThisTheCorrectAnswer) {
                        btnClass = 'bg-rose-100 border-rose-400 text-rose-950';
                      } else {
                        btnClass = 'opacity-50 border-slate-200 text-slate-500';
                      }
                    } else if (isSelected) {
                      btnClass = 'bg-cyan-600 text-white border-cyan-600 shadow-md';
                    }

                    return (
                      <button
                        key={opt}
                        disabled={submitted}
                        onClick={() => handleSelectAnswer(q.id, opt)}
                        className={`p-3.5 rounded-2xl border-2 text-left text-sm font-semibold transition-all active:scale-98 ${btnClass}`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation after submission */}
                {submitted && (
                  <div className="mt-4 pt-3 border-t border-slate-200/60 text-xs text-slate-700">
                    💡 <strong>Penjelasan:</strong> {q.explanation}
                  </div>
                )}
              </div>
            );
          })}

          {/* Submit or Result Box */}
          {!submitted ? (
            <div className="text-center pt-2">
              <button
                onClick={handleSubmitQuiz}
                disabled={!isAllAnswered}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 disabled:opacity-50 text-white font-display font-black text-base rounded-2xl shadow-lg active:scale-95 transition-all"
              >
                {isAllAnswered ? 'Periksa Jawaban Sekarang!' : `Jawab Semua Soal (${Object.keys(answers).length}/5)`}
              </button>
            </div>
          ) : (
            /* SCORE RESULTS CARD */
            <div className="bg-gradient-to-br from-blue-900 to-sky-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl text-center space-y-4">
              <Trophy className="w-14 h-14 mx-auto text-amber-300 animate-bounce" />
              <div className="text-xs font-bold text-cyan-200 uppercase tracking-widest">
                Hasil Evaluasi Akhir
              </div>
              <div className="font-display font-black text-5xl text-amber-300">
                {score} / 5
              </div>

              {/* Cheerful Custom Feedback Message */}
              <div className="text-base sm:text-lg font-bold text-sky-100 max-w-md mx-auto">
                {score === 5 && '🌟 LUAR BIASA! Kamu Master Hiu Matematika Samudera! Semua konsep dikuasai dengan sempurna!'}
                {score >= 3 && score < 5 && '👏 HEBAT SEKALI! Kamu adalah Penjelajah Tangguh. Cek kembali soal yang perlu direview agar makin tajam!'}
                {score < 3 && '💪 TETAP SEMANGAT! "Keep Swimming, Keep Learning!" Jadikan kesalahan sebagai petunjuk menuju kehebatan!'}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
                <button
                  onClick={handleResetQuiz}
                  className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs flex items-center gap-1.5 border border-white/20"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Ulangi Kuis
                </button>

                <button
                  onClick={onOpenCertificate}
                  className="px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-blue-950 font-display font-black text-sm shadow-md flex items-center gap-2 active:scale-95"
                >
                  <Award className="w-4 h-4" />
                  <span>Buka Sertifikat Explorer of the Day!</span>
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* TUTOR OBSERVATIONAL RUBRIC VIEW */
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sky-100 shadow-xl space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="font-display font-black text-xl text-slate-900">
              Rubrik Observasi Pemahaman Siswa
            </h3>
            <p className="text-xs text-slate-500">
              Centang kemampuan yang telah dikuasai siswa selama 60 menit pembelajaran.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { key: 'membacaBilangan', label: '1. Membaca & Menulis Bilangan Cacah s.d 10.000' },
              { key: 'nilaiTempat', label: '2. Memahami Nilai Tempat (Satuan, Puluhan, Ratusan, Ribuan)' },
              { key: 'perbandinganBilangan', label: '3. Membandingkan & Mengurutkan Bilangan' },
              { key: 'penjumlahan', label: '4. Penjumlahan Cepat (Make a Friendly Number)' },
              { key: 'pengurangan', label: '5. Pengurangan Cepat (Count Up)' },
              { key: 'perkalian', label: '6. Perkalian Pecah Satuan/Puluhan (Break Apart)' },
              { key: 'pembagian', label: '7. Pembagian Hubungan Perkalian (Multiplication Pair)' },
            ].map((item) => {
              const k = item.key as keyof Omit<TutorObservation, 'notes'>;
              const isChecked = tutorObservation[k];

              return (
                <button
                  key={item.key}
                  onClick={() => toggleObservationSkill(k)}
                  className={`p-4 rounded-2xl border text-left transition-all flex items-start gap-3 ${
                    isChecked
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-950 shadow-xs'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    readOnly
                    className="mt-1 w-4 h-4 text-emerald-600 rounded"
                  />
                  <div className="text-xs font-semibold leading-relaxed">
                    {item.label}
                  </div>
                </button>
              );
            })}
          </div>

          <div>
            <label className="text-xs font-bold text-slate-600 block mb-1">
              Catatan Kualitatif Tutor:
            </label>
            <textarea
              rows={3}
              value={tutorObservation.notes}
              onChange={(e) =>
                onUpdateObservation({
                  ...tutorObservation,
                  notes: e.target.value,
                })
              }
              placeholder="Catatan perkembangan siswa, gaya belajar, atau aspek yang perlu diperkuat pada pertemuan berikutnya..."
              className="w-full p-3 rounded-xl border border-slate-200 text-xs text-slate-800 focus:border-cyan-500 focus:outline-hidden"
            />
          </div>
        </div>
      )}
    </div>
  );
};
