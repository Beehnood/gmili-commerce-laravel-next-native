<?php

namespace Database\Factories;

use App\Models\Product;
use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class ProductFactory extends Factory
{
    protected $model = Product::class;

    public function definition(): array
    {
        $name = $this->faker->unique()->words(3, true);

        return [
            'category_id' => Category::inRandomOrder()->first()->id,

            'name' => ucfirst($name),
            'slug' => Str::slug($name),

            'sku' => strtoupper(Str::random(8)),

            'description' => $this->faker->sentence(),

            'price' => $this->faker->randomFloat(2, 50, 500),
            'compare_at_price' => $this->faker->optional()->randomFloat(2, 60, 600),

            'is_active' => true,
            'in_stock' => true,
            'has_variants' => false,
        ];
    }
}