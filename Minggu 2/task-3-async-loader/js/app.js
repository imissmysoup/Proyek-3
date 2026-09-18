'use strict';
const status = document.querySelector('#status');
const daftar = document.querySelector('#daftar-materi');
const tombolMuat = document.querySelector('#muat');
const tombolCobaLagi = document.querySelector('#coba-lagi');
function aturState(state, pesan) {
    status.dataset.state = state;
    status.textContent = pesan;
    tombolCobaLagi.hidden = state !== 'error';
}
async function ambilMateri() {
    const response = await fetch('data/materi.json');
    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }
    return response.json();
}
function renderMateri(data) {
    daftar.replaceChildren();
    
    for (const item of data) {
        const article = document.createElement('article');
        const heading = document.createElement('h2');
        const durasi = document.createElement('p');
        
        article.classList.add('kartu');
        heading.textContent = item.judul;
        durasi.textContent = `Durasi: ${item.durasi} menit`;
        
        article.append(heading, durasi);
        daftar.append(article);
    }
}
async function muatData() {
    aturState('loading', 'Memuat data...');
    tombolMuat.disabled = true;
    daftar.replaceChildren();
    
    try {
        const data = await ambilMateri();
        
        if (data.length === 0) {
            aturState('empty', 'Tidak ada materi yang tersedia.');
            return;
        }
        
        renderMateri(data);
        aturState('success', 'Materi berhasil dimuat.');
        
    } catch (error) {
        console.error(error);
        aturState('error', `Gagal memuat: ${error.message}`);
    } finally {
        tombolMuat.disabled = true;
    }
}
tombolMuat.addEventListener('click', muatData);
tombolCobaLagi.addEventListener('click', muatData);
