import React, { useState } from 'react';
import { Search, Sparkles, HelpCircle, CheckCircle2, ArrowRight, RefreshCw, Layers, Sliders, ChevronDown } from 'lucide-react';
import { numberToIndonesianWords, formatIDRNumber } from '../utils/numberToIndonesianWords';
import { sound } from '../utils/audio';

interface Mission2Props {
  onComplete: () => void;
  onAddPoints: (amount: number, reason: string) => void;
  onNextMission: () => void;
}

export const Mission2NumberDetective: React.FC<Mission2Props> = ({
  onComplete,
  onAddPoints,
  onNextMission,
}) => {
  // --- SUB-FEATURE 1: BONGKAR RAHASIA ANGKA ---
  const [inputNumber, setInputNumber] = useState<string>('7426');
  const [currentDecomposed, setCurrentDecomposed] = useState<number>(7426);
  const [isChallengeMode, setIsChallengeMode] = useState<boolean>(false);

  // --- SUB-FEATURE 3: AKU ANGKA MISTERIUS ---
  const [mysteryState, setMysteryState] = useState({
    thousands: 6,
    hundreds: 3,
    tens: 0,
    ones: 5,
    expected: '6305',
    revealed: false,
    userGuess: '',
    feedback: null as 'correct' | 'wrong' | null,
  });

  // --- SUB-FEATURE 4: COMPARE THE NUMBERS ---
  const [numA, setNumA] = useState<string>('4567');
  const [numB, setNumB] = useState<string>('4576');
  const [chosenComp, setChosenComp] = useState<'>' | '<' | '=' | null>(null);
  const [compResult, setCompResult] = useState<{
    isCorrect: boolean;
    explanation: string;
  } | null>(null);

  // --- SUB-FEATURE 5: SORTING ---
  const initialCards = [6320, 6203, 6302];
  const [orderedList, setOrderedList] = useState<number[]>(initialCards);
  const [sortChecked, setSortChecked] = useState<boolean | null>(null);

  // Decomposition calculation
  const handleDecompose = (valStr: string) => {
    sound.playBubble();
    const parsed = parseInt(valStr.replace(/\D/g, ''), 10);
    const maxVal = isChallengeMode ? 99999 : 10000;
    if (isNaN(parsed) || parsed < 0) {
      setCurrentDecomposed(0);
      return;
    }
    const clamped = Math.min(parsed, maxVal);
    setCurrentDecomposed(clamped);
  };

  // Extract digits
  const getDigits = (num: number) => {
    const s = num.toString().padStart(isChallengeMode ? 5 : 4, '0');
    if (isChallengeMode && num > 9999) {
      return [
        { name: 'Puluh Ribuan', digit: parseInt(s[0]), value: parseInt(s[0]) * 10000, color: 'bg-purple-500' },
        { name: 'Ribuan', digit: parseInt(s[1]), value: parseInt(s[1]) * 1000, color: 'bg-blue-500' },
        { name: 'Ratusan', digit: parseInt(s[2]), value: parseInt(s[2]) * 100, color: 'bg-cyan-500' },
        { name: 'Puluhan', digit: parseInt(s[3]), value: parseInt(s[3]) * 10, color: 'bg-emerald-500' },
        { name: 'Satuan', digit: parseInt(s[4]), value: parseInt(s[4]), color: 'bg-amber-500' },
      ];
    }
    const fourDigit = num.toString().padStart(4, '0');
    return [
      { name: 'Ribuan', digit: parseInt(fourDigit[0]), value: parseInt(fourDigit[0]) * 1000, color: 'bg-blue-600' },
      { name: 'Ratusan', digit: parseInt(fourDigit[1]), value: parseInt(fourDigit[1]) * 100, color: 'bg-cyan-600' },
      { name: 'Puluhan', digit: parseInt(fourDigit[2]), value: parseInt(fourDigit[2]) * 10, color: 'bg-emerald-600' },
      { name: 'Satuan', digit: parseInt(fourDigit[3]), value: parseInt(fourDigit[3]), color: 'bg-amber-500' },
    ];
  };

  const digits = getDigits(currentDecomposed);
  const spelledWords = numberToIndonesianWords(currentDecomposed);
  const expandedEquation = digits
    .filter((d) => d.digit > 0)
    .map((d) => formatIDRNumber(d.value))
    .join(' + ') || '0';

  // Mystery Number handler
  const handleGuessMystery = () => {
    const cleanGuess = mysteryState.userGuess.trim().replace(/\D/g, '');
    const isWin = cleanGuess === mysteryState.expected;
    if (isWin) {
      sound.playCorrect();
      onAddPoints(20, 'Tebak Angka Misterius');
      setMysteryState((prev) => ({ ...prev, feedback: 'correct', revealed: true }));
    } else {
      sound.playBubble();
      setMysteryState((prev) => ({ ...prev, feedback: 'wrong' }));
    }
  };

  const handleGenerateMystery = () => {
    sound.playBubble();
    const th = Math.floor(Math.random() * 8) + 1; // 1-9
    const hu = Math.floor(Math.random() * 10);
    const te = Math.floor(Math.random() * 10);
    const on = Math.floor(Math.random() * 10);
    const exp = `${th}${hu}${te}${on}`;
    setMysteryState({
      thousands: th,
      hundreds: hu,
      tens: te,
      ones: on,
      expected: exp,
      revealed: false,
      userGuess: '',
      feedback: null,
    });
  };

  // Compare handler
  const handleCheckCompare = (choice: '>' | '<' | '=') => {
    setChosenComp(choice);
    const a = parseInt(numA.replace(/\D/g, ''), 10) || 0;
    const b = parseInt(numB.replace(/\D/g, ''), 10) || 0;

    const actual = a > b ? '>' : a < b ? '<' : '=';
    const isCorrect = choice === actual;

    let explanation = '';
    if (a === b) {
      explanation = `Kedua bilangan bernilai persis sama: ${formatIDRNumber(a)} = ${formatIDRNumber(b)}.`;
    } else {
      // Find differing place value
      const aStr = a.toString().padStart(5, '0');
      const bStr = b.toString().padStart(5, '0');
      let place = 'ribuan';
      for (let i = 0; i < 5; i++) {
        if (aStr[i] !== bStr[i]) {
          const names = ['puluh ribuan', 'ribuan', 'ratusan', 'puluhan', 'satuan'];
          place = names[i];
          explanation = `Trik detektif: Lihat dari angka paling kiri! Pada nilai tempat ${place}, angka ${aStr[i]} ${parseInt(aStr[i]) > parseInt(bStr[i]) ? 'lebih besar' : 'lebih kecil'} dari ${bStr[i]}. Jadi, ${formatIDRNumber(a)} ${actual} ${formatIDRNumber(b)}.`;
          break;
        }
      }
    }

    setCompResult({ isCorrect, explanation });
    if (isCorrect) {
      sound.playCorrect();
      onAddPoints(15, 'Bandingkan Bilangan');
    } else {
      sound.playBubble();
    }
  };

  // Sorting handlers (move left / right)
  const moveCard = (index: number, direction: 'left' | 'right') => {
    sound.playBubble();
    const newList = [...orderedList];
    const targetIdx = direction === 'left' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= newList.length) return;
    const temp = newList[index];
    newList[index] = newList[targetIdx];
    newList[targetIdx] = temp;
    setOrderedList(newList);
    setSortChecked(null);
  };

  const handleCheckSort = () => {
    const isSorted = orderedList.every((val, idx, arr) => idx === 0 || arr[idx - 1] <= val);
    setSortChecked(isSorted);
    if (isSorted) {
      sound.playCorrect();
      onAddPoints(20, 'Mengurutkan Bilangan');
    } else {
      sound.playBubble();
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-10">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 text-xs font-bold text-cyan-800 bg-cyan-100 px-3 py-1 rounded-full mb-2">
          <span>Misi 2 · Penguasaan Konsep (12 Menit)</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-display font-black text-slate-900">
          🕵️ Number Detective HQ
        </h2>
        <p className="text-slate-600 text-sm mt-1 max-w-xl mx-auto">
          Kupas tuntas rahasia nilai tempat bilangan cacah hingga 10.000, bandingkan angka tersembunyi, dan temukan kekuatan angka nol!
        </p>
      </div>

      {/* FEATURE 1: BONGKAR RAHASIA ANGKA */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sky-100 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2 text-cyan-600 text-xs font-bold uppercase tracking-wider">
              <Search className="w-4 h-4" /> Laboratorium Nilai Tempat
            </div>
            <h3 className="font-display font-extrabold text-2xl text-slate-900 mt-1">
              Bongkar Rahasia Angka
            </h3>
          </div>

          {/* Preset Buttons & Challenge Toggle */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-400 font-medium">Contoh Cepat:</span>
            {['7426', '8042', '6305', '9999'].map((p) => (
              <button
                key={p}
                onClick={() => {
                  setInputNumber(p);
                  handleDecompose(p);
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition-all ${
                  inputNumber === p
                    ? 'bg-cyan-600 text-white border-cyan-600 shadow-xs'
                    : 'bg-sky-50 text-sky-800 border-sky-200 hover:bg-sky-100'
                }`}
              >
                {formatIDRNumber(parseInt(p))}
              </button>
            ))}
            <button
              onClick={() => {
                const next = !isChallengeMode;
                setIsChallengeMode(next);
                if (next) {
                  setInputNumber('45820');
                  handleDecompose('45820');
                } else {
                  setInputNumber('7426');
                  handleDecompose('7426');
                }
              }}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                isChallengeMode
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {isChallengeMode ? 'Mode Puluh Ribuan Aktif' : 'Tantangan 99.999'}
            </button>
          </div>
        </div>

        {/* Input Bar */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative w-full">
            <input
              type="text"
              value={inputNumber}
              onChange={(e) => setInputNumber(e.target.value)}
              placeholder={isChallengeMode ? 'Ketik angka 0 - 99.999...' : 'Ketik angka 0 - 10.000...'}
              className="w-full px-5 py-3.5 rounded-2xl border-2 border-slate-200 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 font-display font-extrabold text-2xl text-slate-800 tracking-wider text-center sm:text-left"
            />
          </div>
          <button
            onClick={() => handleDecompose(inputNumber)}
            className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-display font-bold text-base rounded-2xl shadow-md transition-all active:scale-95 shrink-0 flex items-center justify-center gap-2"
          >
            <Search className="w-5 h-5" />
            <span>Bongkar Angka!</span>
          </button>
        </div>

        {/* Breakdown Visual Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3 pt-2">
          {digits.map((item, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-2xl border-2 transition-all text-center relative overflow-hidden ${
                item.digit === 0
                  ? 'bg-amber-50/70 border-amber-200'
                  : 'bg-sky-50/80 border-sky-200'
              }`}
            >
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                {item.name}
              </span>
              <div className="font-display font-black text-4xl text-slate-900 my-1">
                {item.digit}
              </div>
              <div className="text-xs font-semibold text-slate-600 pt-2 border-t border-slate-200/60">
                Nilainya = <strong className="font-bold text-cyan-800">{formatIDRNumber(item.value)}</strong>
              </div>
              {item.digit === 0 && (
                <span className="mt-1 inline-block text-[10px] font-bold text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded">
                  Penjaga Posisi!
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Word and Expanded Form Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
              📖 Cara Membaca Bilangan
            </span>
            <p className="font-display font-bold text-lg text-blue-950 capitalize">
              "{spelledWords}"
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
              📐 Bentuk Panjang (Expanded Form)
            </span>
            <p className="font-display font-extrabold text-lg text-cyan-800 tabular-nums">
              {formatIDRNumber(currentDecomposed)} = {expandedEquation}
            </p>
          </div>
        </div>

        {/* FEATURE 2: TRIK MEMBACA BILANGAN & ANGKA NOL */}
        <div className="bg-sky-50 border border-sky-200 p-5 rounded-2xl flex flex-col md:flex-row gap-4 items-start">
          <div className="w-10 h-10 rounded-xl bg-amber-400 text-amber-950 flex items-center justify-center font-bold text-xl shrink-0 shadow-xs">
            0
          </div>
          <div className="space-y-1.5 text-left text-sm text-slate-700">
            <h4 className="font-display font-extrabold text-slate-900 text-base">
              Trik Detektif: Mengapa Angka Nol Tetap Ditulis?
            </h4>
            <p>
              Perhatikan bilangan <strong>8.042</strong> (dibaca: <em>delapan ribu empat puluh dua</em>).
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Walaupun angka ratusannya adalah 0 dan tidak dibaca (kita tidak bilang "nol ratus"), angka <strong>0 tetap wajib ditulis</strong> sebagai <em>penjaga nilai tempat</em>! Jika angka nol dihapus, bilangannya akan berubah drastis menjadi <strong>842</strong> (hanya ratusan, bukan ribuan lagi).
            </p>
          </div>
        </div>
      </div>

      {/* FEATURE 3: GAME AKU ANGKA MISTERIUS */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sky-100 shadow-xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
              Teka-Teki Detektif
            </span>
            <h3 className="font-display font-extrabold text-2xl text-slate-900">
              Aku Angka Misterius! 🕵️‍♂️
            </h3>
          </div>
          <button
            onClick={handleGenerateMystery}
            className="self-start sm:self-auto px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-100 flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Ganti Teka-Teki Baru
          </button>
        </div>

        <div className="bg-gradient-to-br from-blue-900 to-sky-900 text-white p-5 rounded-2xl space-y-3">
          <p className="text-sm text-sky-200 font-medium">
            Temukan angka misterius berdasarkan petunjuk detektif berikut:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="bg-white/10 rounded-xl p-3 border border-white/10">
              <span className="text-[11px] text-cyan-200 block">Ribuan</span>
              <strong className="font-display text-2xl font-black text-amber-300">
                {mysteryState.thousands}
              </strong>
            </div>
            <div className="bg-white/10 rounded-xl p-3 border border-white/10">
              <span className="text-[11px] text-cyan-200 block">Ratusan</span>
              <strong className="font-display text-2xl font-black text-amber-300">
                {mysteryState.hundreds}
              </strong>
            </div>
            <div className="bg-white/10 rounded-xl p-3 border border-white/10">
              <span className="text-[11px] text-cyan-200 block">Puluhan</span>
              <strong className="font-display text-2xl font-black text-amber-300">
                {mysteryState.tens}
              </strong>
            </div>
            <div className="bg-white/10 rounded-xl p-3 border border-white/10">
              <span className="text-[11px] text-cyan-200 block">Satuan</span>
              <strong className="font-display text-2xl font-black text-amber-300">
                {mysteryState.ones}
              </strong>
            </div>
          </div>
        </div>

        {/* Input guess */}
        <div className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto pt-2">
          <input
            type="text"
            value={mysteryState.userGuess}
            onChange={(e) => setMysteryState((prev) => ({ ...prev, userGuess: e.target.value }))}
            placeholder="Ketik bilangan tebakanmu..."
            className="w-full px-5 py-3 rounded-2xl border-2 border-slate-200 focus:border-cyan-500 font-display font-bold text-xl text-center"
          />
          <button
            onClick={handleGuessMystery}
            disabled={!mysteryState.userGuess.trim()}
            className="w-full sm:w-auto px-6 py-3 bg-amber-400 hover:bg-amber-300 text-blue-950 font-display font-extrabold rounded-2xl shadow-md active:scale-95 transition-all shrink-0"
          >
            Tebak!
          </button>
        </div>

        {mysteryState.feedback === 'correct' && (
          <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl flex items-center gap-3 text-emerald-900 text-sm font-semibold">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>
              Tepat sekali! Bilangannya adalah <strong>{formatIDRNumber(parseInt(mysteryState.expected))}</strong> ({numberToIndonesianWords(parseInt(mysteryState.expected))})! (+20 Shark Points 🪙)
            </span>
          </div>
        )}

        {mysteryState.feedback === 'wrong' && (
          <div className="bg-rose-50 border border-rose-200 p-4 rounded-2xl text-rose-900 text-sm">
            Tebakan belum pas! Gabungkan angka ribuan, ratusan, puluhan, dan satuan berurutan dari kiri ke kanan.
          </div>
        )}
      </div>

      {/* FEATURE 4: COMPARE THE NUMBERS */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sky-100 shadow-xl space-y-6">
        <div>
          <span className="text-xs font-bold text-cyan-700 uppercase tracking-wider">
            Trik Digit Kiri
          </span>
          <h3 className="font-display font-extrabold text-2xl text-slate-900 mt-1">
            Compare The Numbers ({'>'}, {'<'}, {'='})
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Tutor atau siswa dapat mengubah dua bilangan di bawah ini, lalu pilih tanda yang benar!
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-7 gap-3 items-center">
          {/* Input A */}
          <div className="sm:col-span-3">
            <label className="text-[11px] font-bold text-slate-500 uppercase block mb-1">
              Bilangan Pertama
            </label>
            <input
              type="text"
              value={numA}
              onChange={(e) => {
                setNumA(e.target.value);
                setCompResult(null);
              }}
              className="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 font-display font-bold text-2xl text-center text-blue-950 focus:border-cyan-500"
            />
          </div>

          {/* Symbol Buttons */}
          <div className="sm:col-span-1 flex sm:flex-col justify-center items-center gap-2">
            {(['>', '<', '='] as const).map((sym) => (
              <button
                key={sym}
                onClick={() => handleCheckCompare(sym)}
                className={`w-12 h-10 rounded-xl font-display font-black text-xl flex items-center justify-center border-2 transition-all active:scale-95 ${
                  chosenComp === sym
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md scale-105'
                    : 'bg-sky-50 text-slate-700 border-sky-200 hover:border-cyan-500'
                }`}
              >
                {sym}
              </button>
            ))}
          </div>

          {/* Input B */}
          <div className="sm:col-span-3">
            <label className="text-[11px] font-bold text-slate-500 uppercase block mb-1">
              Bilangan Kedua
            </label>
            <input
              type="text"
              value={numB}
              onChange={(e) => {
                setNumB(e.target.value);
                setCompResult(null);
              }}
              className="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 font-display font-bold text-2xl text-center text-blue-950 focus:border-cyan-500"
            />
          </div>
        </div>

        {compResult && (
          <div
            className={`p-4 rounded-2xl border ${
              compResult.isCorrect
                ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                : 'bg-amber-50 border-amber-200 text-amber-900'
            }`}
          >
            <div className="font-bold text-sm mb-1">
              {compResult.isCorrect ? '✅ Hebat! Pilihanmu Tepat!' : '🔍 Cek Kembali Angkanya:'}
            </div>
            <p className="text-xs leading-relaxed">{compResult.explanation}</p>
          </div>
        )}
      </div>

      {/* FEATURE 5: LATIHAN MENGURUTKAN BILANGAN */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sky-100 shadow-xl space-y-5">
        <div>
          <span className="text-xs font-bold text-cyan-700 uppercase tracking-wider">
            Tantangan Urutan
          </span>
          <h3 className="font-display font-extrabold text-2xl text-slate-900 mt-1">
            Urutkan Bilangan dari Terkecil ke Terbesar
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Gunakan tombol panah kiri/kanan pada kartu untuk menukar posisi angka sampai tersusun dari yang paling kecil!
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 py-2">
          {orderedList.map((num, idx) => (
            <div
              key={num}
              className="p-4 bg-sky-50 border-2 border-sky-200 rounded-2xl text-center min-w-[140px] shadow-xs"
            >
              <div className="text-[10px] font-bold text-slate-400 uppercase">Posisi {idx + 1}</div>
              <div className="font-display font-black text-2xl text-blue-950 my-1">
                {formatIDRNumber(num)}
              </div>
              <div className="flex items-center justify-center gap-1.5 mt-2">
                <button
                  onClick={() => moveCard(idx, 'left')}
                  disabled={idx === 0}
                  className="px-2 py-1 bg-white border border-slate-200 rounded text-xs font-bold disabled:opacity-30 hover:bg-slate-100"
                >
                  ←
                </button>
                <button
                  onClick={() => moveCard(idx, 'right')}
                  disabled={idx === orderedList.length - 1}
                  className="px-2 py-1 bg-white border border-slate-200 rounded text-xs font-bold disabled:opacity-30 hover:bg-slate-100"
                >
                  →
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center pt-2">
          <button
            onClick={handleCheckSort}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-md active:scale-95 text-sm"
          >
            Periksa Urutan
          </button>
        </div>

        {sortChecked === true && (
          <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl text-center text-emerald-900 text-sm font-semibold">
            🎉 Sempurna! 6.203 &lt; 6.302 &lt; 6.320. Penjelajah hebat! (+20 Shark Points 🪙)
          </div>
        )}

        {sortChecked === false && (
          <div className="bg-rose-50 border border-rose-200 p-4 rounded-2xl text-center text-rose-900 text-sm">
            Urutan belum tepat. Bandingkan angka ratusannya dulu: 200 lebih kecil dari 300!
          </div>
        )}
      </div>

      {/* Completion & Next Mission Button */}
      <div className="text-center pt-4">
        <button
          onClick={() => {
            sound.playBubble();
            onComplete();
            onNextMission();
          }}
          className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-display font-extrabold text-base rounded-2xl shadow-lg shadow-cyan-500/20 active:scale-95 transition-all inline-flex items-center gap-2"
        >
          <span>Tuntaskan Misi 2 & Masuk Misi 3 (Card Battle)</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
