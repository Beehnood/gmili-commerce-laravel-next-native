<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(
            Category::with('children')->whereNull('parent_id')->get()
        );
    }

    // create category
    public function store(Request $request)
    {
        $validated = $request -> validated(
            [
                'parent_id' => 'nullable|existes:categories,id',
                'name' => 'required|string|max:50',
                'is_active' => 'boolean'
            ]
        );

        $category = Category::create([
            'parent_id' => $validated['parent_id'] ?? null,
            'name' => $validated['name'],
            'slug' => Str::slug($validated['name']),
            'is_active' => $validated['is_active'] ?? true,

        ]);

        return response() -> json($category, 201);
    }

    // show category
    public function show(Category $category)
    {
        return response()->json(
            $category->load('children'));
    }

    // update category
    public function update(Request $request, Category $category)
    {
        $validated = $request -> validated(
            [
                'parent_id' => 'nullable|existes:categories,id',
                'name' => 'sometimes|string|max:50',
                'is_active' => 'boolean',
            ]
        );
        if (isset($validated['name'])) {
            $validated['slug'] = Str::slug($validated['name']);
        }

        $category -> update($validated);
        return response() -> json($category);
    }

    // delete category
    public function destroy(Category $category)
    {
        $category -> delete();
        return response() -> json([
            'message' => 'Ctaegory deleted successfully'
        ]);
    }
}
