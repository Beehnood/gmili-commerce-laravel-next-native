<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        Category::query()->delete();
        // catégories principales
        $categories = Category::factory(5)->create();

        // sous-catégories
        foreach ($categories as $category) {
            Category::factory(3)->create([
                'parent_id' => $category->id
            ]);
        }
    }
}