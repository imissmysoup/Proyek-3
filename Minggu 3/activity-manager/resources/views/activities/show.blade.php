@extends('layouts.app')

@section('content')
    <h1>{{ $activity->title }}</h1>
    <p>Tanggal: {{ $activity->activity_date->format('d M Y') }}</p>
    <p>Kategori: {{ $activity->category }}</p>
    <p>Status: {{ $activity->status }}</p>
    <p>Deskripsi: {{ $activity->description ?? 'Tidak ada deskripsi' }}</p>
    
    <a href="{{ route('activities.edit', $activity) }}">Edit</a>

    <form action="{{ route('activities.destroy', $activity) }}" method="POST" style="display:inline;">
        @csrf
        @method('DELETE')
        <button type="submit" onclick="return confirm('Yakin ingin menghapus?')">Hapus</button>
    </form>
    <br><br>
@endsection