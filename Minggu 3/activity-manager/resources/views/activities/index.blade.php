@extends('layouts.app')

@section('content')
    <h1>Daftar Kegiatan</h1>
    
    <div style="margin: 1rem 0;">
        <a href="{{ route('activities.create') }}">Tambah Kegiatan</a>
        <br><br>
        <strong>Filter:</strong>
        <a href="{{ route('activities.index') }}">Semua</a> | 
        <a href="{{ route('activities.index', ['status' => 'Planned']) }}">Planned</a> | 
        <a href="{{ route('activities.index', ['status' => 'Ongoing']) }}">Ongoing</a> | 
        <a href="{{ route('activities.index', ['status' => 'Done']) }}">Done</a>
    </div>

    @forelse ($activities as $activity)
        <article style="margin-bottom: 1.5rem; padding: 1rem; border: 1px solid #ddd;">
            <h2>
                <a href="{{ route('activities.show', $activity) }}">
                    [{{ $activity->code ?? 'Tanpa Kode' }}] {{ $activity->title }}
                </a>
            </h2>
            <p><strong>Kategori:</strong> {{ $activity->category->name ?? 'Kategori Dihapus/Tidak Valid' }}</p>
            <p><strong>Tanggal:</strong> {{ $activity->activity_date->format('d M Y') }}</p>
            <p><strong>Status:</strong> {{ $activity->status }}</p>
        </article>
    @empty
        <p>Belum ada kegiatan.</p>
    @endforelse
@endsection