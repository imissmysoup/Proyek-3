@extends('layouts.app')

@section('content')
    <h1>Daftar Kegiatan</h1>
    
    <div style="margin-bottom: 1.5rem;">
        <a href="{{ route('activities.create') }}">Tambah Kegiatan Baru</a>
    </div>

    <form action="{{ route('activities.index') }}" method="GET" style="margin-bottom: 2rem; padding: 1rem; border: 1px solid #ccc;">
        <strong>Cari & Filter:</strong><br><br>
        
        <input type="text" name="search" placeholder="Cari kode atau judul..." value="{{ request('search') }}">
        
        <select name="category_id">
            <option value="">-- Semua Kategori --</option>
            @foreach($categories as $category)
                <option value="{{ $category->id }}" @selected(request('category_id') == $category->id)>
                    {{ $category->name }}
                </option>
            @endforeach
        </select>

        <select name="status">
            <option value="">-- Semua Status --</option>
            <!-- Catatan: Nanti kita akan sesuaikan status ini dengan aturan Draft/Published/Completed -->
            <option value="Planned" @selected(request('status') == 'Planned')>Planned</option>
            <option value="Ongoing" @selected(request('status') == 'Ongoing')>Ongoing</option>
            <option value="Done" @selected(request('status') == 'Done')>Done</option>
        </select>

        <select name="sort">
            <option value="terbaru" @selected(request('sort') == 'terbaru')>Tanggal Terbaru</option>
            <option value="terlama" @selected(request('sort') == 'terlama')>Tanggal Terlama</option>
        </select>

        <button type="submit">Terapkan</button>
        <a href="{{ route('activities.index') }}">Reset</a>
    </form>

    @forelse ($activities as $activity)
        <article style="margin-bottom: 1.5rem; padding: 1rem; border: 1px solid #ddd;">
            <h2>
                <a href="{{ route('activities.show', $activity) }}">
                    [{{ $activity->code ?? 'Tanpa Kode' }}] {{ $activity->title }}
                </a>
            </h2>
            <p><strong>Kategori:</strong> {{ $activity->category->name ?? 'Tidak Ada' }}</p>
            <p><strong>Tanggal:</strong> {{ $activity->activity_date->format('d M Y') }}</p>
            <p><strong>Status:</strong> {{ $activity->status }}</p>
        </article>
    @empty
        <p>Belum ada kegiatan yang sesuai.</p>
    @endforelse

    <div style="margin-top: 2rem;">
        {{ $activities->links() }}
    </div>
@endsection