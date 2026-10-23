import React, { useState } from 'react';
import { Sparkles, CheckCircle2, XCircle, HelpCircle, RefreshCw, ArrowRight, Zap, Lightbulb } from 'lucide-react';
import { sound } from '../utils/audio';

interface Mission4Props {
  onComplete: () => void;
  onAddPoints: (amount: number, reason: string) => void;
  onNextMission: () => void;
}

type TabType = 'add' | 'subtract' | 'multiply' | 'divide';

export const Mission4MathHacksLab: React.FC<Mission4Props> = ({
  onComplete,
  onAddPoints,
  onNextMission,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('add');

  // Exercise states for each tab
  const [exerciseState, setExerciseState] = useState<Record<TabType, {
    userAnswer: string;
    isAnswered: boolean;
    isCorrect: boolean | null;
    showHint: boolean;
  }>>({
    add: { userAnswer: '', isAnswered: false, isCorrect: null, showHint: false },
    subtract: { userAnswer: '', isAnswered: false, isCorrect: null, showHint: false },
    multiply: { userAnswer: '', isAnswered: false, isCorrect: null, showHint: false },
    divide: { userAnswer: '', isAnswered: false, isCorrect: null, showHint: false },
  });

  const [completedTabs, setCompletedTabs] = useState<TabType[]>([]);

  const handleCheck = (tab: TabType, expectedAnswer: string) => {
    const cur = exerciseState[tab];
    const isCorrect = cur.userAnswer.trim() === expectedAnswer.trim();

    setExerciseState((prev) => ({
      ...prev,
      [tab]: {
        ...prev[tab],
        isAnswered: true,
        isCorrect,
      },
    }));

    if (isCorrect) {
      sound.playCorrect();
      onAddPoints(20, `Math Hack ${tab.toUpperCase()}`);
      if (!completedTabs.includes(tab)) {
        setCompletedTabs((prev) => [...prev, tab]);
      }
    } else {
      sound.playBubble();
    }
  };

  const handleRetry = (tab: TabType) => {
    setExerciseState((prev) => ({
      ...prev,
      [tab]: {
        userAnswer: '',
        isAnswered: false,
        isCorrect: null,
        showHint: true,
      },
    }));
  };

  const allTabsDone = completedTabs.length >= 4;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 text-xs font-bold text-cyan-800 bg-cyan-100 px-3 py-1 rounded-full mb-2">
          <span>Misi 4 · Trik Berhitung Cepat (15 Menit)</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-display font-black text-slate-900">
          ⚡ Math Hacks Lab
        </h2>
        <p className="text-slate-600 text-sm mt-1 max-w-xl mx-auto">
          Trik rahasia berhitung seperti perenang kilat! Pelajari strategi ramah otak untuk 4 operasi hitung dasar.
        </p>
      </div>

      {/* Tabs Bar */}
      <div className="flex items-center justify-center p-1.5 bg-sky-100/70 rounded-2xl max-w-2xl mx-auto gap-1 border border-sky-200/60">
        <button
          onClick={() => {
            sound.playBubble();
            setActiveTab('add');
          }}
          className={`flex-1 py-3 px-3 rounded-xl font-display font-extrabold text-xs sm:text-sm transition-all whitespace-nowrap flex items-center justify-center gap-1.5 ${
            activeTab === 'add'
              ? 'bg-white text-blue-900 shadow-md scale-102'
              : 'text-slate-600 hover:text-blue-900 hover:bg-white/50'
          }`}
        >
          <span>➕ Penjumlahan</span>
          {completedTabs.includes('add') && <span className="text-emerald-500 font-bold">✓</span>}
        </button>

        <button
          onClick={() => {
            sound.playBubble();
            setActiveTab('subtract');
          }}
          className={`flex-1 py-3 px-3 rounded-xl font-display font-extrabold text-xs sm:text-sm transition-all whitespace-nowrap flex items-center justify-center gap-1.5 ${
            activeTab === 'subtract'
              ? 'bg-white text-blue-900 shadow-md scale-102'
              : 'text-slate-600 hover:text-blue-900 hover:bg-white/50'
          }`}
        >
          <span>➖ Pengurangan</span>
          {completedTabs.includes('subtract') && <span className="text-emerald-500 font-bold">✓</span>}
        </button>

        <button
          onClick={() => {
            sound.playBubble();
            setActiveTab('multiply');
          }}
          className={`flex-1 py-3 px-3 rounded-xl font-display font-extrabold text-xs sm:text-sm transition-all whitespace-nowrap flex items-center justify-center gap-1.5 ${
            activeTab === 'multiply'
              ? 'bg-white text-blue-900 shadow-md scale-102'
              : 'text-slate-600 hover:text-blue-900 hover:bg-white/50'
          }`}
        >
          <span>✖️ Perkalian</span>
          {completedTabs.includes('multiply') && <span className="text-emerald-500 font-bold">✓</span>}
        </button>

        <button
          onClick={() => {
            sound.playBubble();
            setActiveTab('divide');
          }}
          className={`flex-1 py-3 px-3 rounded-xl font-display font-extrabold text-xs sm:text-sm transition-all whitespace-nowrap flex items-center justify-center gap-1.5 ${
            activeTab === 'divide'
              ? 'bg-white text-blue-900 shadow-md scale-102'
              : 'text-slate-600 hover:text-blue-900 hover:bg-white/50'
          }`}
        >
          <span>➗ Pembagian</span>
          {completedTabs.includes('divide') && <span className="text-emerald-500 font-bold">✓</span>}
        </button>
      </div>

      {/* TAB CONTENT: PENJUMLAHAN */}
      {activeTab === 'add' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sky-100 shadow-xl space-y-6 animate-in fade-in">
          <div>
            <div className="flex items-center gap-2 text-cyan-700 text-xs font-bold uppercase tracking-wider">
              <Zap className="w-4 h-4 text-amber-500" /> Trik Penjumlahan
            </div>
            <h3 className="font-display font-black text-2xl text-slate-900 mt-1">
              "Make a Friendly Number" (Jadikan Bilangan Ramah / Bulat)
            </h3>
            <p className="text-slate-600 text-sm mt-1">
              Angka yang mendekati ratusan (seperti 398 atau 499) susah dihitung di kepala? Jadikan bilangan bulat dulu, lalu sesuaikan di akhir!
            </p>
          </div>

          {/* Example Box */}
          <div className="bg-sky-50/80 border-2 border-sky-200 p-5 rounded-2xl space-y-3">
            <div className="text-xs font-bold text-sky-900 uppercase tracking-wider">
              Contoh Pembelajaran: 398 + 125
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-center">
              <div className="bg-white p-3 rounded-xl border border-sky-100">
                <span className="text-xs text-slate-500">Langkah 1: Pinjam 2</span>
                <div className="font-display font-bold text-lg text-blue-950 mt-1">
                  398 + <span className="text-cyan-600">2</span> = <strong>400</strong>
                </div>
              </div>
              <div className="bg-white p-3 rounded-xl border border-sky-100">
                <span className="text-xs text-slate-500">Langkah 2: Tambahkan</span>
                <div className="font-display font-bold text-lg text-blue-950 mt-1">
                  400 + 125 = <strong>525</strong>
                </div>
              </div>
              <div className="bg-white p-3 rounded-xl border border-sky-100">
                <span className="text-xs text-slate-500">Langkah 3: Kembalikan 2</span>
                <div className="font-display font-bold text-lg text-amber-700 mt-1">
                  525 − <span className="text-cyan-600">2</span> = <strong>523</strong>
                </div>
              </div>
            </div>
            <p className="text-xs text-sky-800 text-center font-medium">
              💡 Lebih mudah menghitung 400 + 125 lalu dikurangi 2 daripada menjumlahkan bersusun 398 + 125!
            </p>
          </div>

          {/* Interactive Practice */}
          <div className="border-t border-slate-100 pt-6 space-y-4">
            <h4 className="font-display font-bold text-lg text-slate-900">
              Latihan Interaktif: Hitung 499 + 236 = ?
            </h4>

            {!exerciseState.add.isAnswered ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleCheck('add', '735');
                }}
                className="flex flex-col sm:flex-row items-center gap-3 max-w-md"
              >
                <input
                  type="text"
                  value={exerciseState.add.userAnswer}
                  onChange={(e) =>
                    setExerciseState((prev) => ({
                      ...prev,
                      add: { ...prev.add, userAnswer: e.target.value },
                    }))
                  }
                  placeholder="Ketik jawabanmu..."
                  className="w-full px-5 py-3 rounded-2xl border-2 border-slate-200 focus:border-cyan-500 font-display font-bold text-xl text-center sm:text-left"
                />
                <button
                  type="submit"
                  disabled={!exerciseState.add.userAnswer.trim()}
                  className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold rounded-2xl shadow-md shrink-0 active:scale-95"
                >
                  Cek Jawaban
                </button>
              </form>
            ) : (
              <div className="space-y-4">
                {exerciseState.add.isCorrect ? (
                  <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-900 text-sm space-y-1">
                    <div className="font-bold flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      Jawaban Benar: 735! (+20 Shark Points 🪙)
                    </div>
                    <p className="text-xs text-emerald-800">
                      Trik: 499 + 1 = 500. Lalu 500 + 236 = 736. Karena tadi pinjam 1, kurangi lagi: 736 − 1 = <strong>735</strong>! Sangat cepat dan rapi!
                    </p>
                  </div>
                ) : (
                  <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-rose-900 text-sm space-y-2">
                    <div className="font-bold flex items-center gap-2">
                      <XCircle className="w-5 h-5 text-rose-600" />
                      Jawaban Belum Tepat. Coba ingat trik ramah angka!
                    </div>
                    <p className="text-xs text-slate-700 bg-white/70 p-3 rounded-xl border border-rose-100">
                      💡 <strong>Petunjuk:</strong> 499 hanya kurang 1 untuk menjadi 500! Jadi hitung dulu: 500 + 236, setelah itu kurangi 1.
                    </p>
                    <button
                      onClick={() => handleRetry('add')}
                      className="px-4 py-2 bg-white border border-rose-200 text-rose-800 font-bold text-xs rounded-xl flex items-center gap-1.5"
                    >
                      <RefreshCw className="w-3.5 h-3.5" /> Coba Lagi
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB CONTENT: PENGURANGAN */}
      {activeTab === 'subtract' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sky-100 shadow-xl space-y-6 animate-in fade-in">
          <div>
            <div className="flex items-center gap-2 text-cyan-700 text-xs font-bold uppercase tracking-wider">
              <Zap className="w-4 h-4 text-amber-500" /> Trik Pengurangan
            </div>
            <h3 className="font-display font-black text-2xl text-slate-900 mt-1">
              "Count Up" (Menghitung Naik untuk Selisih Kecil)
            </h3>
            <p className="text-slate-600 text-sm mt-1">
              Jika dua bilangan saling berdekatan, jangan kurangkan bersusun panjang! Cukup hitung berapa langkah dari bilangan kecil menuju bilangan besar.
            </p>
          </div>

          {/* Example */}
          <div className="bg-sky-50/80 border-2 border-sky-200 p-5 rounded-2xl space-y-3">
            <div className="text-xs font-bold text-sky-900 uppercase tracking-wider">
              Contoh Pembelajaran: 1.000 − 998
            </div>
            <div className="p-4 bg-white rounded-xl border border-sky-100 text-center space-y-2">
              <p className="text-sm text-slate-700">
                Berapa langkah dari <strong>998</strong> ke <strong>1.000</strong>?
              </p>
              <div className="font-display font-black text-2xl text-blue-950">
                998 → 999 (+1) → 1.000 (+1) = <span className="text-cyan-600">Selisih 2</span>!
              </div>
              <p className="text-xs text-slate-500">
                Jadi, <strong>1.000 − 998 = 2</strong> secara instan dalam 2 detik!
              </p>
            </div>
            <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl text-xs text-amber-900">
              📌 <strong>Catatan Penting:</strong> Trik <em>Count Up</em> ini sangat cocok digunakan jika selisihnya kecil. Untuk bilangan dengan selisih besar, siswa tetap menggunakan pengurangan bersusun dengan teknik meminjam yang benar.
            </div>
          </div>

          {/* Interactive Practice */}
          <div className="border-t border-slate-100 pt-6 space-y-4">
            <h4 className="font-display font-bold text-lg text-slate-900">
              Latihan Interaktif: Hitung 500 − 497 = ?
            </h4>

            {!exerciseState.subtract.isAnswered ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleCheck('subtract', '3');
                }}
                className="flex flex-col sm:flex-row items-center gap-3 max-w-md"
              >
                <input
                  type="text"
                  value={exerciseState.subtract.userAnswer}
                  onChange={(e) =>
                    setExerciseState((prev) => ({
                      ...prev,
                      subtract: { ...prev.subtract, userAnswer: e.target.value },
                    }))
                  }
                  placeholder="Ketik jawabanmu..."
                  className="w-full px-5 py-3 rounded-2xl border-2 border-slate-200 focus:border-cyan-500 font-display font-bold text-xl text-center sm:text-left"
                />
                <button
                  type="submit"
                  disabled={!exerciseState.subtract.userAnswer.trim()}
                  className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold rounded-2xl shadow-md shrink-0 active:scale-95"
                >
                  Cek Jawaban
                </button>
              </form>
            ) : (
              <div className="space-y-4">
                {exerciseState.subtract.isCorrect ? (
                  <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-900 text-sm space-y-1">
                    <div className="font-bold flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      Jawaban Benar: 3! (+20 Shark Points 🪙)
                    </div>
                    <p className="text-xs text-emerald-800">
                      Langkah hitung naik: Dari 497 ke 500 hanya butuh naik 3 angka (498, 499, 500). Jadi 500 − 497 = <strong>3</strong>!
                    </p>
                  </div>
                ) : (
                  <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-rose-900 text-sm space-y-2">
                    <div className="font-bold flex items-center gap-2">
                      <XCircle className="w-5 h-5 text-rose-600" />
                      Jawaban Belum Tepat.
                    </div>
                    <p className="text-xs text-slate-700 bg-white/70 p-3 rounded-xl border border-rose-100">
                      💡 <strong>Petunjuk:</strong> Coba hitung naik dari 497: 498 (1), 499 (2), 500 (...?).
                    </p>
                    <button
                      onClick={() => handleRetry('subtract')}
                      className="px-4 py-2 bg-white border border-rose-200 text-rose-800 font-bold text-xs rounded-xl flex items-center gap-1.5"
                    >
                      <RefreshCw className="w-3.5 h-3.5" /> Coba Lagi
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB CONTENT: PERKALIAN */}
      {activeTab === 'multiply' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sky-100 shadow-xl space-y-6 animate-in fade-in">
          <div>
            <div className="flex items-center gap-2 text-cyan-700 text-xs font-bold uppercase tracking-wider">
              <Zap className="w-4 h-4 text-amber-500" /> Trik Perkalian
            </div>
            <h3 className="font-display font-black text-2xl text-slate-900 mt-1">
              "Break Apart the Number" (Pecah Puluhan dan Satuan)
            </h3>
            <p className="text-slate-600 text-sm mt-1">
              Perkalian dua digit dengan satu digit lebih mudah jika kita pisahkan puluhannya dengan satuannya!
            </p>
          </div>

          {/* Example */}
          <div className="bg-sky-50/80 border-2 border-sky-200 p-5 rounded-2xl space-y-3">
            <div className="text-xs font-bold text-sky-900 uppercase tracking-wider">
              Contoh Pembelajaran: 24 × 3
            </div>
            <div className="p-4 bg-white rounded-xl border border-sky-100 space-y-2 text-left">
              <p className="text-sm text-slate-700">
                Pecah 24 menjadi <strong>20</strong> dan <strong>4</strong>:
              </p>
              <div className="font-display font-bold text-base text-blue-950 space-y-1">
                <div>• (20 × 3) = <span className="text-cyan-700">60</span></div>
                <div>• (4 × 3) = <span className="text-cyan-700">12</span></div>
                <div className="pt-2 border-t border-slate-200 text-amber-700 text-lg">
                  Hasil = 60 + 12 = <strong>72</strong>!
                </div>
              </div>
            </div>

            {/* Bonus Hack */}
            <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl text-xs text-amber-900 flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong>Trik Bonus: Perkalian 5 Kilat!</strong> <br />
                Untuk mengalikan dengan 5, kalikan 10 dulu lalu bagi 2! <br />
                Contoh: <strong>34 × 5 = 34 × 10 ÷ 2 = 340 ÷ 2 = 170</strong>. Super cepat!
              </div>
            </div>
          </div>

          {/* Interactive Practice */}
          <div className="border-t border-slate-100 pt-6 space-y-4">
            <h4 className="font-display font-bold text-lg text-slate-900">
              Latihan Interaktif: Hitung 32 × 3 = ?
            </h4>

            {!exerciseState.multiply.isAnswered ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleCheck('multiply', '96');
                }}
                className="flex flex-col sm:flex-row items-center gap-3 max-w-md"
              >
                <input
                  type="text"
                  value={exerciseState.multiply.userAnswer}
                  onChange={(e) =>
                    setExerciseState((prev) => ({
                      ...prev,
                      multiply: { ...prev.multiply, userAnswer: e.target.value },
                    }))
                  }
                  placeholder="Ketik jawabanmu..."
                  className="w-full px-5 py-3 rounded-2xl border-2 border-slate-200 focus:border-cyan-500 font-display font-bold text-xl text-center sm:text-left"
                />
                <button
                  type="submit"
                  disabled={!exerciseState.multiply.userAnswer.trim()}
                  className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold rounded-2xl shadow-md shrink-0 active:scale-95"
                >
                  Cek Jawaban
                </button>
              </form>
            ) : (
              <div className="space-y-4">
                {exerciseState.multiply.isCorrect ? (
                  <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-900 text-sm space-y-1">
                    <div className="font-bold flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      Jawaban Benar: 96! (+20 Shark Points 🪙)
                    </div>
                    <p className="text-xs text-emerald-800">
                      Langkah: 32 = 30 + 2. <br />
                      (30 × 3) = 90 <br />
                      (2 × 3) = 6 <br />
                      90 + 6 = <strong>96</strong>!
                    </p>
                  </div>
                ) : (
                  <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-rose-900 text-sm space-y-2">
                    <div className="font-bold flex items-center gap-2">
                      <XCircle className="w-5 h-5 text-rose-600" />
                      Jawaban Belum Tepat.
                    </div>
                    <p className="text-xs text-slate-700 bg-white/70 p-3 rounded-xl border border-rose-100">
                      💡 <strong>Petunjuk:</strong> Pecah 32 menjadi 30 dan 2. Kalikan masing-masing dengan 3: (30 × 3 = 90) dan (2 × 3 = 6). Lalu jumlahkan!
                    </p>
                    <button
                      onClick={() => handleRetry('multiply')}
                      className="px-4 py-2 bg-white border border-rose-200 text-rose-800 font-bold text-xs rounded-xl flex items-center gap-1.5"
                    >
                      <RefreshCw className="w-3.5 h-3.5" /> Coba Lagi
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB CONTENT: PEMBAGIAN */}
      {activeTab === 'divide' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sky-100 shadow-xl space-y-6 animate-in fade-in">
          <div>
            <div className="flex items-center gap-2 text-cyan-700 text-xs font-bold uppercase tracking-wider">
              <Zap className="w-4 h-4 text-amber-500" /> Trik Pembagian
            </div>
            <h3 className="font-display font-black text-2xl text-slate-900 mt-1">
              "Find the Multiplication Pair" (Cari Pasangan Perkaliannya)
            </h3>
            <p className="text-slate-600 text-sm mt-1">
              Pembagian adalah kebalikan langsung dari perkalian. Bayangkan tabel perkalian untuk memecahkan pembagian!
            </p>
          </div>

          {/* Example */}
          <div className="bg-sky-50/80 border-2 border-sky-200 p-5 rounded-2xl space-y-3">
            <div className="text-xs font-bold text-sky-900 uppercase tracking-wider">
              Contoh Pembelajaran: 84 ÷ 4
            </div>
            <div className="p-4 bg-white rounded-xl border border-sky-100 space-y-2 text-left">
              <p className="text-sm text-slate-700">
                Pikirkan perkalian: <strong>4 dikali berapa supaya hasilnya 84</strong>?
              </p>
              <div className="font-display font-bold text-base text-blue-950 space-y-1">
                <div>• 4 × 20 = 80 (sudah mendekati!)</div>
                <div>• Masih sisa 4, dan 4 × 1 = 4</div>
                <div className="pt-2 border-t border-slate-200 text-amber-700 text-lg">
                  Jadi, 4 × <strong>21</strong> = 84, sehingga <strong>84 ÷ 4 = 21</strong>!
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Practice */}
          <div className="border-t border-slate-100 pt-6 space-y-4">
            <h4 className="font-display font-bold text-lg text-slate-900">
              Latihan Interaktif: Hitung 96 ÷ 8 = ?
            </h4>

            {!exerciseState.divide.isAnswered ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleCheck('divide', '12');
                }}
                className="flex flex-col sm:flex-row items-center gap-3 max-w-md"
              >
                <input
                  type="text"
                  value={exerciseState.divide.userAnswer}
                  onChange={(e) =>
                    setExerciseState((prev) => ({
                      ...prev,
                      divide: { ...prev.divide, userAnswer: e.target.value },
                    }))
                  }
                  placeholder="Ketik jawabanmu..."
                  className="w-full px-5 py-3 rounded-2xl border-2 border-slate-200 focus:border-cyan-500 font-display font-bold text-xl text-center sm:text-left"
                />
                <button
                  type="submit"
                  disabled={!exerciseState.divide.userAnswer.trim()}
                  className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold rounded-2xl shadow-md shrink-0 active:scale-95"
                >
                  Cek Jawaban
                </button>
              </form>
            ) : (
              <div className="space-y-4">
                {exerciseState.divide.isCorrect ? (
                  <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-900 text-sm space-y-1">
                    <div className="font-bold flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      Jawaban Benar: 12! (+20 Shark Points 🪙)
                    </div>
                    <p className="text-xs text-emerald-800">
                      Pikirkan: 8 × 10 = 80. Sisa 16, dan 8 × 2 = 16. Jadi 10 + 2 = <strong>12</strong>! Sangat logis dan mudah diingat!
                    </p>
                  </div>
                ) : (
                  <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-rose-900 text-sm space-y-2">
                    <div className="font-bold flex items-center gap-2">
                      <XCircle className="w-5 h-5 text-rose-600" />
                      Jawaban Belum Tepat.
                    </div>
                    <p className="text-xs text-slate-700 bg-white/70 p-3 rounded-xl border border-rose-100">
                      💡 <strong>Petunjuk:</strong> 8 × 10 = 80. Dari 80 ke 96 masih kurang 16. 8 dikali berapa hasilnya 16? Gabungkan 10 + ...
                    </p>
                    <button
                      onClick={() => handleRetry('divide')}
                      className="px-4 py-2 bg-white border border-rose-200 text-rose-800 font-bold text-xs rounded-xl flex items-center gap-1.5"
                    >
                      <RefreshCw className="w-3.5 h-3.5" /> Coba Lagi
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Completion & Next */}
      <div className="text-center pt-4">
        {allTabsDone && (
          <div className="mb-4 inline-block bg-emerald-100 text-emerald-900 font-bold text-sm px-4 py-2 rounded-2xl">
            🎉 Keempat Trik Lab Matematika berhasil dikuasai!
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
            <span>Tuntaskan Misi 4 & Masuk Misi 5 (Treasure Hunt)</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
