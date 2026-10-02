<div style="margin-bottom: 1rem;">
    <label for="code">Kode Kegiatan</label><br>
    <input type="text" id="code" name="code" value="{{ old('code', $activity->code ?? '') }}">
    @error('code') <p style="color: red;">{{ $message }}</p> @enderror
</div>

<div style="margin-bottom: 1rem;">
    <label for="title">Judul</label><br>
    <input type="text" id="title" name="title" value="{{ old('title', $activity->title ?? '') }}">
    @error('title') <p style="color: red;">{{ $message }}</p> @enderror
</div>

<div style="margin-bottom: 1rem;">
    <label for="description">Deskripsi</label><br>
    <textarea id="description" name="description">{{ old('description', $activity->description ?? '') }}</textarea>
    @error('description') <p style="color: red;">{{ $message }}</p> @enderror
</div>

<div style="margin-bottom: 1rem;">
    <label for="activity_date">Tanggal</label><br>
    <input type="date" id="activity_date" name="activity_date" value="{{ old('activity_date', isset($activity) ? $activity->activity_date->format('Y-m-d') : '') }}">
    @error('activity_date') <p style="color: red;">{{ $message }}</p> @enderror
</div>

<div style="margin-bottom: 1rem;">
    <label for="category_id">Kategori</label><br>
    <select name="category_id" id="category_id">
        <option value="">-- Pilih Kategori --</option>
        @foreach($categories as $category)
            <option value="{{ $category->id }}" @selected(old('category_id', $activity->category_id ?? '') == $category->id)>
                {{ $category->name }}
            </option>
        @endforeach
    </select>
    @error('category_id') <p style="color: red;">{{ $message }}</p> @enderror
</div>

<div style="margin-bottom: 1rem;">
    <label for="status">Status</label><br>
    <select name="status" id="status">
        @foreach (['Planned', 'Ongoing', 'Done'] as $status)
            <option value="{{ $status }}" @selected(old('status', $activity->status ?? 'Planned') === $status)>
                {{ $status }}
            </option>
        @endforeach
    </select>
    @error('status') <p style="color: red;">{{ $message }}</p> @enderror
</div>