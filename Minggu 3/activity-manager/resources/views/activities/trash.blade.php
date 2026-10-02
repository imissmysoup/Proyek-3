@extends('layouts.app')

@section('content')
    <h1>Tempat Sampah (Data Terhapus)</h1>
    
    <div style="margin-bottom: 1.5rem;">
        <a href="{{ route('activities.index') }}">Kembali ke Daftar Utama</a>
    </div>

    @forelse ($activities as $activity)
        <article style="margin-bottom: 1.5rem; padding: 1rem; border: 1px solid #ffcccc; background-color: #fff5f5;">
            <h2>[{{ $activity->code ?? 'Tanpa Kode' }}] {{ $activity->title }}</h2>
            <p><strong>Dihapus Pada:</strong> {{ $activity->deleted_at->format('d M Y H:i') }}</p>
            
            <form action="{{ route('activities.restore', $activity->id) }}" method="POST" style="display:inline;">
                @csrf
                <button type="submit" onclick="return confirm('Kembalikan data ini ke daftar aktif?')">Restore (Pulihkan)</button>
            </form>
        </article>
    @empty
        <p>Tidak ada data di tempat sampah.</p>
    @endforelse
@endsection