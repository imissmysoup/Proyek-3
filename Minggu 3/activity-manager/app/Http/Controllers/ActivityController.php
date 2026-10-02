<?php
namespace App\Http\Controllers;

use App\Models\Activity;
use App\Models\Category;
use Illuminate\View\View;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use App\Http\Requests\StoreActivityRequest;
use App\Http\Requests\UpdateActivityRequest;
use App\Services\ActivityService;
use DomainException;

class ActivityController extends Controller
{
    public function index(Request $request): View
    {
        $query = Activity::query()->with('category');

        if ($request->filled('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('title', 'like', '%' . $request->search . '%')
                  ->orWhere('code', 'like', '%' . $request->search . '%');
            });
        }

        if ($request->filled('category_id')) {
            $query->where('category_id', $request->category_id);
        }

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('sort')) {
            $direction = $request->sort === 'terlama' ? 'asc' : 'desc';
            $query->orderBy('activity_date', $direction);
        } else {
            $query->latest('activity_date'); // Default: terbaru
        }

        $activities = $query->paginate(10)->withQueryString();
        $categories = Category::all(); // Untuk opsi dropdown filter

        return view('activities.index', compact('activities', 'categories'));
    }

    public function create(): View
    {
        $categories = Category::all();
        return view('activities.create', compact('categories'));
    }

    public function store(StoreActivityRequest $request, ActivityService $service): RedirectResponse
    {
        $activity = $service->create($request->validated());
        return to_route('activities.show', $activity)
            ->with('success', 'Kegiatan berhasil dibuat.');
    }

    public function show(Activity $activity): View
    {
        return view('activities.show', compact('activity'));
    }

    public function edit(Activity $activity): View
    {
        $categories = Category::all();
        return view('activities.edit', compact('activity', 'categories'));
    }

    public function update(UpdateActivityRequest $request, Activity $activity, ActivityService $service): RedirectResponse
    {
        try {
            $service->update($activity, $request->validated());
        } catch (DomainException $exception) {
            return back()
                ->withErrors(['status' => $exception->getMessage()])
                ->withInput();
        }
        
        return to_route('activities.show', $activity)
            ->with('success', 'Kegiatan berhasil diperbarui.');
    }

    public function destroy(Activity $activity): RedirectResponse
    {
        $activity->delete();
        return to_route('activities.index')
            ->with('success', 'Kegiatan dihapus.');
    }

    public function trash(): View
    {
        $activities = Activity::onlyTrashed()->with('category')->get();
        return view('activities.trash', compact('activities'));
    }

    public function restore($id): RedirectResponse
    {
        $activity = Activity::onlyTrashed()->findOrFail($id);
        $activity->restore();

        return redirect()->route('activities.index')->with('success', 'Kegiatan berhasil dipulihkan.');
    }
}