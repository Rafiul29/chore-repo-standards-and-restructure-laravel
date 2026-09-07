<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    public function index(Request $request): Response
    {
        $categorySlug = $request->query('category');

        $products = Product::query()
            ->with('category')
            ->when($categorySlug, function ($query, $slug) {
                $query->whereHas('category', function ($q) use ($slug) {
                    $q->where('slug', $slug);
                });
            })
            ->where('is_active', true)
            ->orderByDesc('is_featured')
            ->orderBy('name_en')
            ->paginate(12)
            ->withQueryString();

        $productsArray = $products->toArray();
        $productsPayload = [
            'data' => $productsArray['data'],
            'meta' => Arr::except($productsArray, ['data']),
        ];

        $categories = Category::where('is_active', true)
            ->orderBy('sort_order')
            ->get(['id', 'name_en', 'name_bn', 'slug', 'icon', 'color_bg', 'color_fg']);

        return Inertia::render('products/index', [
            'products' => $productsPayload,
            'categories' => $categories,
            'filters' => [
                'category' => $categorySlug,
            ],
        ]);
    }

    public function show(string $slug): Response
    {
        $product = Product::with('category')
            ->where('slug', $slug)
            ->where('is_active', true)
            ->firstOrFail();

        $related = Product::with('category')
            ->where('category_id', $product->category_id)
            ->where('id', '!=', $product->id)
            ->where('is_active', true)
            ->inRandomOrder()
            ->limit(4)
            ->get();

        return Inertia::render('products/show', [
            'product' => $product,
            'related' => $related,
        ]);
    }
}
