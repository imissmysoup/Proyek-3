@extends('layouts.app')

@section('content')
    <h1>Detail Kegiatan</h1>

    <div style="margin-bottom: 1.5rem;">
        <p><strong>Kode:</strong> {{ $activity->code ?? 'Tanpa Kode' }}</p>
        <p><strong>Judul:</strong> {{ $activity->title }}</p>
        <p><strong>Kategori:</strong> {{ $activity->category->name ?? 'Kategori Dihapus/Tidak Valid' }}</p>
        <p><strong>Tanggal:</strong> {{ $activity->activity_date->format('d M Y') }}</p>
        <p><strong>Status:</strong> {{ $activity->status }}</p>
        <p><strong>Deskripsi:</strong><br> {{ $activity->description ?? 'Tidak ada deskripsi.' }}</p>
    </div>

    <a href="{{ route('activities.edit', $activity) }}">Edit</a>
    
    <form action="{{ route('activities.destroy', $activity) }}" method="POST" style="display:inline;">
        @csrf
        @method('DELETE')
        <button type="submit" onclick="return confirm('Yakin ingin menghapus?')">Hapus</button>
    </form>
    <br><br>
    
    <a href="{{ route('activities.index') }}">Kembali ke Daftar</a>
@endsection