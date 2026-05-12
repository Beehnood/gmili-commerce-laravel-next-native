<?php

namespace Database\Factories;

use App\Models\Product;
use App\Models\ProductVariant;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class ProductVariantFactory extends Factory
{
    protected $model = ProductVariant::class;

    public function definition(): array
    {
        $colors = ['Gold', 'Silver', 'Black', 'Rose Gold'];
        $sizes = ['50', '52', '54', '56', '58'];

        $color = $this->faker->randomElement($colors);
        $size = $this->faker->randomElement($sizes);

        return [
            'product_id' => Product::inRandomOrder()->first()->id,

            'sku' => strtoupper(Str::random(10)),

            'name' => $color . ' Size ' . $size,

            'size' => $size,
            'color' => $color,

            'material' => 'Stainless Steel',

            'finish' => $this->faker->randomElement([
                'Glossy',
                'Matte',
                'Brushed'
            ]),

            'price' => $this->faker->randomFloat(2, 100, 500),

            'is_active' => true,
            'in_stock' => true,
        ];
    }
}