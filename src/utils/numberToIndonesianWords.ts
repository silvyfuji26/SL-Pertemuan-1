export function numberToIndonesianWords(n: number): string {
  if (isNaN(n)) return '';
  if (n === 0) return 'nol';

  const satuan = ['', 'satu', 'dua', 'tiga', 'empat', 'lima', 'enam', 'tujuh', 'delapan', 'sembilan', 'sepuluh', 'sebelas'];

  function terbilangRatusan(val: number): string {
    if (val < 12) return satuan[val];
    if (val < 20) return satuan[val - 10] + ' belas';
    if (val < 100) {
      const puluhan = Math.floor(val / 10);
      const sisa = val % 10;
      return satuan[puluhan] + ' puluh' + (sisa > 0 ? ' ' + satuan[sisa] : '');
    }
    if (val < 200) {
      const sisa = val - 100;
      return 'seratus' + (sisa > 0 ? ' ' + terbilangRatusan(sisa) : '');
    }
    if (val < 1000) {
      const ratus = Math.floor(val / 100);
      const sisa = val % 100;
      return satuan[ratus] + ' ratus' + (sisa > 0 ? ' ' + terbilangRatusan(sisa) : '');
    }
    return '';
  }

  if (n < 1000) {
    return terbilangRatusan(n).trim();
  }

  if (n < 2000) {
    const sisa = n - 1000;
    return ('seribu ' + (sisa > 0 ? terbilangRatusan(sisa) : '')).trim();
  }

  if (n < 1000000) {
    const ribuan = Math.floor(n / 1000);
    const sisa = n % 1000;
    const ribuText = terbilangRatusan(ribuan) + ' ribu';
    const sisaText = sisa > 0 ? ' ' + terbilangRatusan(sisa) : '';
    return (ribuText + sisaText).trim();
  }

  return n.toLocaleString('id-ID');
}

export function formatIDRNumber(n: number): string {
  return n.toLocaleString('id-ID');
}
