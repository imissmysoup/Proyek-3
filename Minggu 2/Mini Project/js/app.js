'use strict';

const btnTema = document.getElementById('toggle-tema');
btnTema.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark-mode');
    btnTema.setAttribute('aria-pressed', String(isDark));
    btnTema.textContent = isDark ? 'Terang' : 'Gelap';
});

const btnMenu = document.getElementById('menu-toggle');
const navMenu = document.getElementById('main-nav');
btnMenu.addEventListener('click', () => {
    const isHidden = navMenu.classList.toggle('hidden');
    btnMenu.setAttribute('aria-expanded', String(!isHidden));
});

const dataKegiatan = [
    { id: 1, nama: 'Latihan Vokal Grup', kategori: 'latihan', deskripsi: 'Latihan rutin pemanasan dan ambitus.' },
    { id: 2, nama: 'Konser Akhir Tahun', kategori: 'konser', deskripsi: 'Penampilan puncak seluruh anggota PSM.' },
    { id: 3, nama: 'Kompetisi Paduan Suara', kategori: 'lomba', deskripsi: 'Persiapan delegasi lomba.' },
    { id: 4, nama: 'Latihan Koreografi', kategori: 'latihan', deskripsi: 'Latihan gerak panggung untuk konser.' }
];

const daftarKegiatan = document.getElementById('daftar-kegiatan');
const filterKegiatan = document.getElementById('filter-kegiatan');
const statusKegiatan = document.getElementById('status-kegiatan');

function buatKartuKegiatan(item) {
    const article = document.createElement('article');
    article.classList.add('card');
    
    const judul = document.createElement('h3');
    judul.textContent = item.nama;
    
    const deskripsi = document.createElement('p');
    deskripsi.textContent = item.deskripsi;
    
    article.append(judul, deskripsi);
    return article;
}

function renderKegiatan(data) {
    daftarKegiatan.replaceChildren(); // Mencegah duplikasi
    
    if (data.length === 0) {
        statusKegiatan.textContent = 'Tidak ada kegiatan untuk kategori ini.';
        return;
    }
    
    statusKegiatan.textContent = '';
    for (const item of data) {
        daftarKegiatan.append(buatKartuKegiatan(item));
    }
}

filterKegiatan.addEventListener('change', (event) => {
    const nilaiFilter = event.target.value;
    if (nilaiFilter === 'semua') {
        renderKegiatan(dataKegiatan);
    } else {
        const tersaring = dataKegiatan.filter(k => k.kategori === nilaiFilter);
        renderKegiatan(tersaring);
    }
});

renderKegiatan(dataKegiatan);

const faqButtons = document.querySelectorAll('.faq-btn');
faqButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Tutup semua FAQ lain (Hanya satu terbuka pada satu waktu)
        faqButtons.forEach(otherBtn => {
            if (otherBtn !== btn) {
                otherBtn.setAttribute('aria-expanded', 'false');
                otherBtn.nextElementSibling.classList.add('hidden');
            }
        });
        
        const content = btn.nextElementSibling;
        const isExpanded = btn.getAttribute('aria-expanded') === 'true';
        
        btn.setAttribute('aria-expanded', String(!isExpanded));
        content.classList.toggle('hidden');
    });
});

const formDaftar = document.getElementById('form-daftar');
const inputNama = document.getElementById('nama');
const inputEmail = document.getElementById('email');
const errorNama = document.getElementById('error-nama');
const errorEmail = document.getElementById('error-email');
const pesanSukses = document.getElementById('pesan-sukses');

formDaftar.addEventListener('submit', (event) => {
    event.preventDefault(); // Mencegah reload
    
    const nama = inputNama.value.trim();
    const email = inputEmail.value.trim();
    let isValid = true;
    
    if (nama.length < 3) {
        errorNama.textContent = 'Nama minimal 3 karakter.';
        inputNama.setAttribute('aria-invalid', 'true');
        isValid = false;
    } else {
        errorNama.textContent = '';
        inputNama.setAttribute('aria-invalid', 'false');
    }
    
    // Validasi Email
    if (!email.includes('@') || !email.includes('.')) {
        errorEmail.textContent = 'Masukkan alamat email yang valid.';
        inputEmail.setAttribute('aria-invalid', 'true');
        isValid = false;
    } else {
        errorEmail.textContent = '';
        inputEmail.setAttribute('aria-invalid', 'false');
    }
    
    if (isValid) {
        pesanSukses.classList.remove('hidden');
        formDaftar.reset();
        
        setTimeout(() => {
            pesanSukses.classList.add('hidden');
        }, 3000);
    } else {
        pesanSukses.classList.add('hidden');
    }
});

const btnTop = document.getElementById('back-to-top');
btnTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});