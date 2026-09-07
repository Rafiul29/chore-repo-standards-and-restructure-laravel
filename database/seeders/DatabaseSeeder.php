<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        $categories = [
            [
                'name_en' => 'Organic',
                'name_bn' => 'অর্গানিক',
                'slug' => 'organic',
                'icon' => 'Leaf',
                'color_bg' => '#EAF5EA',
                'color_fg' => '#1F6B3B',
            ],
            [
                'name_en' => 'Honey',
                'name_bn' => 'মধু',
                'slug' => 'honey',
                'icon' => 'Droplet',
                'color_bg' => '#FCEFD8',
                'color_fg' => '#B9740A',
            ],
            [
                'name_en' => 'Dates',
                'name_bn' => 'খেজুর',
                'slug' => 'dates',
                'icon' => 'Cherry',
                'color_bg' => '#F6E7DE',
                'color_fg' => '#8A4B2A',
            ],
            [
                'name_en' => 'Spices',
                'name_bn' => 'মসলা',
                'slug' => 'spices',
                'icon' => 'Flame',
                'color_bg' => '#FBE7E3',
                'color_fg' => '#C0472A',
            ],
            [
                'name_en' => 'Nuts & Seeds',
                'name_bn' => 'বাদাম ও বীজ',
                'slug' => 'nuts-seeds',
                'icon' => 'Sprout',
                'color_bg' => '#F1EAD9',
                'color_fg' => '#8A6A2A',
            ],
            [
                'name_en' => 'Beverage',
                'name_bn' => 'পানীয়',
                'slug' => 'beverage',
                'icon' => 'Coffee',
                'color_bg' => '#EFE3D6',
                'color_fg' => '#6B4226',
            ],
            [
                'name_en' => 'Rice',
                'name_bn' => 'চাল',
                'slug' => 'rice',
                'icon' => 'Wheat',
                'color_bg' => '#F8F1DF',
                'color_fg' => '#9C7C1F',
            ],
            [
                'name_en' => 'Flours & Lentils',
                'name_bn' => 'আটা ও ডাল',
                'slug' => 'flours-lentils',
                'icon' => 'Package',
                'color_bg' => '#EDE8F5',
                'color_fg' => '#5B4A96',
            ],
        ];

        foreach ($categories as $index => $data) {
            Category::factory()->create(array_merge($data, ['sort_order' => $index]));
        }

        $productNames = [
            ['en' => 'Sundarbans Wild Honey', 'bn' => 'সুন্দরবনের বন্য মধু', 'cat' => 'honey'],
            ['en' => 'African Organic Honey', 'bn' => 'আফ্রিকান অর্গানিক মধু', 'cat' => 'honey'],
            ['en' => 'Black Seed Honey', 'bn' => 'কালোজিরা মধু', 'cat' => 'honey'],
            ['en' => 'Ajwa Dates Premium', 'bn' => 'আজওয়া খেজুর প্রিমিয়াম', 'cat' => 'dates'],
            ['en' => 'Medjool Dates Jumbo', 'bn' => 'মেজুুল খেজুর জাম্বো', 'cat' => 'dates'],
            ['en' => 'Organic Turmeric Powder', 'bn' => 'অর্গানিক হলুদ গুঁড়া', 'cat' => 'spices'],
            ['en' => 'Cumin Seeds Whole', 'bn' => 'সাদা জিরা', 'cat' => 'spices'],
            ['en' => 'Red Chili Powder', 'bn' => 'লাল মরিচ গুঁড়া', 'cat' => 'spices'],
            ['en' => 'Almonds California', 'bn' => 'ক্যালিফোর্নিয়া বাদাম', 'cat' => 'nuts-seeds'],
            ['en' => 'Cashew Nuts Premium', 'bn' => 'কাজু বাদাম প্রিমিয়াম', 'cat' => 'nuts-seeds'],
            ['en' => 'Chia Seeds Organic', 'bn' => 'অর্গানিক চিয়া বীজ', 'cat' => 'nuts-seeds'],
            ['en' => 'Miniket Rice Premium', 'bn' => 'মিনিকেট চাল প্রিমিয়াম', 'cat' => 'rice'],
            ['en' => 'Nazirshail Rice', 'bn' => 'নাজিরশাইল চাল', 'cat' => 'rice'],
            ['en' => 'Mustard Oil Cold Pressed', 'bn' => 'ঠান্ডা পদ্ধতির সরিষার তেল', 'cat' => 'organic'],
            ['en' => 'Ghee Pure Cow', 'bn' => 'খাঁটি গরুর ঘি', 'cat' => 'organic'],
            ['en' => 'Masoor Dal Premium', 'bn' => 'মসুর ডাল প্রিমিয়াম', 'cat' => 'flours-lentils'],
            ['en' => 'Chickpea Flour', 'bn' => 'বুটের ডালের আটা', 'cat' => 'flours-lentils'],
            ['en' => 'Green Tea Organic', 'bn' => 'অর্গানিক গ্রিন টি', 'cat' => 'beverage'],
            ['en' => 'Arabian Coffee', 'bn' => 'আরবিয়ান কফি', 'cat' => 'beverage'],
        ];

        foreach ($productNames as $index => $product) {
            $category = Category::where('slug', $product['cat'])->first();

            if ($category) {
                Product::factory()->create([
                    'category_id' => $category->id,
                    'name_en' => $product['en'],
                    'name_bn' => $product['bn'],
                    'slug' => $product['cat'] . '-' . ($index + 1),
                    'price' => fake()->numberBetween(2000, 45000),
                    'stock' => fake()->numberBetween(10, 500),
                    'is_featured' => $index < 6,
                    'badges' => fake()->boolean(60) ? ['organic'] : null,
                ]);
            }
        }
    }
}
