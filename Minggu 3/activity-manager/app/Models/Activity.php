<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Activity extends Model
{
    use SoftDeletes;
    
    protected $fillable = [
        'category_id',
        'code',
        'title',
        'description',
        'activity_date',
        'category',
        'status',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    protected function casts(): array
    {
        return [
            'activity_date' => 'date',
        ];
    }
}