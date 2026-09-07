<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    protected $model = \App\Models\Product::class;

    public function definition(): array
    {
        $price = fake()->numberBetween(5000, 50000); // ৳50.00 - ৳500.00

        return [
            'category_id' => \App\Models\Category::factory(),
            'name_en' => fake()->words(3, true),
            'name_bn' => fake()->words(3, true),
            'slug' => fake()->unique()->slug(),
            'description' => fake()->paragraph(),
            'price' => $price,
            'sale_price' => fake()->boolean(30) ? (int) ($price * 0.85) : null,
            'stock' => fake()->numberBetween(0, 500),
            'image' => null,
            'badges' => fake()->boolean(40) ? ['organic'] : null,
            'is_featured' => fake()->boolean(10),
            'is_active' => true,
        ];
    }
}
