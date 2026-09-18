'use strict';
const peserta = [
    { id: 1, nama: 'Alya', prodi: 'Teknik Informatika' },
    { id: 2, nama: 'Bima', prodi: 'Sistem Informasi' },
];
const form = document.querySelector('#form-peserta');
const namaInput = document.querySelector('#nama');
const prodiInput = document.querySelector('#prodi');
const filterInput = document.querySelector('#filter-prodi');
const daftar = document.querySelector('#daftar-peserta');
const status = document.querySelector('#status');
const errorNama = document.querySelector('#error-nama');
const errorProdi = document.querySelector('#error-prodi');
function validasiPeserta(calon) {
    const validNama = calon.nama.trim().length >= 3;
    const validProdi = calon.prodi !== "";
    
    return {
        valid: validNama && validProdi,
        errorNama: validNama ? '' : 'Nama minimal 3 karakter.',
        errorProdi: validProdi ? '' : 'Program studi wajib dipilih.'
    };
}
function buatKartuPeserta(item) {
    const article = document.createElement('article');
    const heading = document.createElement('h2');
    const prodi = document.createElement('p');

    article.classList.add('kartu');
    heading.textContent = item.nama;
    prodi.textContent = item.prodi;

    article.append(heading, prodi);
    return article;
}
function renderPeserta(data) {
    daftar.replaceChildren();
    
    if (data.length === 0) {
        status.textContent = 'Tidak ada peserta.';
        return;
    }
    
    status.textContent = '';
    for (const item of data) {
        daftar.append(buatKartuPeserta(item));
    }
}
form.addEventListener('submit', (event) => {
    event.preventDefault(); // Cegah reload halaman

    const calonPeserta = {
        nama: namaInput.value,
        prodi: prodiInput.value
    };

    const hasilValidasi = validasiPeserta(calonPeserta);

    errorNama.textContent = hasilValidasi.errorNama;
    errorProdi.textContent = hasilValidasi.errorProdi;

    namaInput.setAttribute('aria-invalid', hasilValidasi.errorNama ? 'true' : 'false');
    prodiInput.setAttribute('aria-invalid', hasilValidasi.errorProdi ? 'true' : 'false');

    if (hasilValidasi.valid) {
        peserta.push({
            id: Date.now(),
            nama: calonPeserta.nama.trim(),
            prodi: calonPeserta.prodi
        });
        
        form.reset();
        namaInput.setAttribute('aria-invalid', 'false');
        prodiInput.setAttribute('aria-invalid', 'false');
        
        renderPeserta(peserta);
    }
});
filterInput.addEventListener('change', (event) => {
    const nilaiFilter = event.target.value;
    
    if (nilaiFilter === 'semua') {
        renderPeserta(peserta);
    } else {
        const pesertaTersaring = peserta.filter(p => p.prodi === nilaiFilter);
        renderPeserta(pesertaTersaring);
    }
});
renderPeserta(peserta);
