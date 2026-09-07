<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int $id
 * @property int $category_id
 * @property string $name_en
 * @property string $name_bn
 * @property string $slug
 * @property string|null $description
 * @property int $price
 * @property int|null $sale_price
 * @property int $stock
 * @property string|null $image
 * @property array|null $badges
 * @property bool $is_featured
 * @property bool $is_active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 *
 * @property-read Category $category
 */
class Product extends Model
{
    /** @use HasFactory<\Database\Factories\ProductFactory> */
    use HasFactory;

    protected $fillable = [
        'category_id',
        'name_en',
        'name_bn',
        'slug',
        'description',
        'price',
        'sale_price',
        'stock',
        'image',
        'badges',
        'is_featured',
        'is_active',
    ];

    protected $appends = [
        'formatted_price',
        'formatted_sale_price',
    ];

    protected function casts(): array
    {
        return [
            'price' => 'integer',
            'sale_price' => 'integer',
            'stock' => 'integer',
            'badges' => 'array',
            'is_featured' => 'boolean',
            'is_active' => 'boolean',
        ];
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function formattedPrice(): string
    {
        return 'Tk ' . number_format($this->price / 100, 2);
    }

    public function formattedSalePrice(): ?string
    {
        return $this->sale_price !== null
            ? 'Tk ' . number_format($this->sale_price / 100, 2)
            : null;
    }
}
