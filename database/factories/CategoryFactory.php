<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Category>
 */
class CategoryFactory extends Factory
{
    protected $model = \App\Models\Category::class;

    public function definition(): array
    {
        return [
            'name_en' => fake()->word(),
            'name_bn' => fake()->word(),
            'slug' => fake()->unique()->slug(),
            'icon' => null,
            'color_bg' => '#EAF5EA',
            'color_fg' => '#1F6B3B',
            'sort_order' => fake()->numberBetween(0, 100),
            'is_active' => true,
        ];
    }
}
