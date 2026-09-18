'use strict';

// DOM Selectors
const toggleTemaBtn = document.getElementById('toggle-tema');
const toggleDetailBtn = document.getElementById('toggle-detail');
const detailBio = document.getElementById('detail-bio');
const statusMessage = document.getElementById('status-message');
const btnCobaLagi = document.getElementById('btn-coba-lagi');
const profilContainer = document.getElementById('profil-container');

// Selectors Data Profil
const fotoProfil = document.getElementById('foto-profil');
const namaProfil = document.getElementById('nama-profil');
const identitasProfil = document.getElementById('identitas-profil');
const teksBio = document.getElementById('teks-bio');

// Selectors Keterampilan
const daftarKeterampilan = document.getElementById('daftar-keterampilan');
const formKeterampilan = document.getElementById('form-keterampilan');
const inputSkill = document.getElementById('input-skill');
const errorSkill = document.getElementById('error-skill');
const btnSubmitSkill = document.getElementById('btn-submit-skill');
const statusKosong = document.getElementById('status-keterampilan-kosong');

// 1. Fitur Ganti Tema (Dark Mode)
toggleTemaBtn.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark-mode');
    toggleTemaBtn.setAttribute('aria-pressed', String(isDark));
});

// 2. Fitur Toggle Detail Profil
toggleDetailBtn.addEventListener('click', () => {
    const isHidden = detailBio.classList.toggle('hidden');
    toggleDetailBtn.setAttribute('aria-expanded', String(!isHidden));
    toggleDetailBtn.textContent = isHidden ? 'Lihat Bio Detail' : 'Sembunyikan Bio';
});

// 3. State UI & Pengambilan Data Asinkron
function setStatus(state, pesan) {
    statusMessage.dataset.state = state;
    statusMessage.textContent = pesan;
    
    if (state === 'error' || state === 'empty') {
        profilContainer.classList.add('hidden');
        if (state === 'error') btnCobaLagi.classList.remove('hidden');
    } else if (state === 'success') {
        statusMessage.classList.add('hidden');
        btnCobaLagi.classList.add('hidden');
        profilContainer.classList.remove('hidden');
    } else {
        statusMessage.classList.remove('hidden');
        btnCobaLagi.classList.add('hidden');
    }
}

async function muatProfil() {
    setStatus('loading', 'Memuat data profil...');
    btnCobaLagi.disabled = true; // Anti-spam klik

    try {
        const response = await fetch('data/profile.json');
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        
        const data = await response.json();
        
        if (!data || Object.keys(data).length === 0) {
            setStatus('empty', 'Data profil kosong.');
            return;
        }

        renderProfil(data);
        setStatus('success', '');
        
    } catch (error) {
        console.error(error);
        setStatus('error', `Gagal memuat: ${error.message}`);
    } finally {
        btnCobaLagi.disabled = false;
    }
}

// 4. Render Data Profil ke DOM
function renderProfil(data) {
    fotoProfil.src = data.foto;
    fotoProfil.alt = `Foto ${data.nama}`;
    namaProfil.textContent = data.nama;
    identitasProfil.textContent = data.identitas;
    teksBio.textContent = data.bio;

    daftarKeterampilan.innerHTML = '';
    if (data.keterampilan && data.keterampilan.length > 0) {
        data.keterampilan.forEach(skill => tambahElemenSkill(skill));
        cekStatusListKosong();
    }
}

function tambahElemenSkill(namaSkill) {
    const li = document.createElement('li');
    li.textContent = namaSkill;
    
    const btnHapus = document.createElement('button');
    btnHapus.textContent = 'X';
    btnHapus.classList.add('btn-hapus');
    btnHapus.setAttribute('aria-label', `Hapus keterampilan ${namaSkill}`);
    
    li.appendChild(btnHapus);
    daftarKeterampilan.appendChild(li);
}

// 5. Form Tambah Keterampilan & Validasi
formKeterampilan.addEventListener('submit', (event) => {
    event.preventDefault();
    const skillBaru = inputSkill.value.trim();

    if (skillBaru.length === 0) {
        inputSkill.setAttribute('aria-invalid', 'true');
        errorSkill.textContent = 'Keterampilan tidak boleh kosong!';
        return;
    }

    inputSkill.setAttribute('aria-invalid', 'false');
    errorSkill.textContent = '';
    btnSubmitSkill.disabled = true; // Anti-spam submit

    // Simulasi penambahan data instan
    tambahElemenSkill(skillBaru);
    cekStatusListKosong();
    
    formKeterampilan.reset();
    setTimeout(() => { btnSubmitSkill.disabled = false; }, 300);
});

// 6. Fitur Hapus (Event Delegation) & Cek List Kosong
daftarKeterampilan.addEventListener('click', (event) => {
    if (event.target.classList.contains('btn-hapus')) {
        event.target.closest('li').remove();
        cekStatusListKosong();
    }
});

function cekStatusListKosong() {
    if (daftarKeterampilan.children.length === 0) {
        statusKosong.classList.remove('hidden');
    } else {
        statusKosong.classList.add('hidden');
    }
}

// Inisialisasi awal
btnCobaLagi.addEventListener('click', muatProfil);
document.addEventListener('DOMContentLoaded', muatProfil);