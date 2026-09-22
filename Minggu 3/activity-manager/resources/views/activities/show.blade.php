@extends('layouts.app')

@section('content')
    <h1>{{ $activity->title }}</h1>
    <p>Tanggal: {{ $activity->activity_date->format('d M Y') }}</p>
    <p>Kategori: {{ $activity->category }}</p>
    <p>Status: {{ $activity->status }}</p>
    <p>Deskripsi: {{ $activity->description ?? 'Tidak ada deskripsi' }}</p>
    
    <a href="{{ route('activities.index') }}">Kembali ke Daftar</a>
@endsection