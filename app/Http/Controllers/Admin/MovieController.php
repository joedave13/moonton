<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Movie\StoreRequest;
use App\Http\Requests\Admin\Movie\UpdateRequest;
use App\Models\Movie;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Support\Str;

class MovieController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $movies = Movie::withTrashed()
            ->orderBy('deleted_at')
            ->get();

        return Inertia::render('Admin/Movie/Index', [
            'movies' => $movies
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('Admin/Movie/Create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreRequest $request)
    {
        $data = $request->validated();

        $data['thumbnail'] = Storage::disk('public')->put('movies', $request->file('thumbnail'));
        $data['slug'] = Str::slug($data['title']);

        $movie = Movie::query()->create($data);

        return redirect()->route('admin.dashboard.movie.index')->with([
            'message' => 'Movie created successfully!',
            'type' => 'success'
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Movie  $movie
     * @return \Illuminate\Http\Response
     */
    public function show(Movie $movie)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Movie  $movie
     * @return \Illuminate\Http\Response
     */
    public function edit(Movie $movie)
    {
        return Inertia::render('Admin/Movie/Edit', [
            'movie' => $movie
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Movie  $movie
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateRequest $request, Movie $movie)
    {
        $data = $request->validated();

        if ($request->hasFile('thumbnail')) {
            Storage::disk('public')->delete($movie->thumbnail);

            $data['thumbnail'] = Storage::disk('public')->put('movies', $request->file('thumbnail'));
        }

        $data['slug'] = Str::slug($data['title']);

        $movie->update($data);

        return redirect()->route('admin.dashboard.movie.index')->with([
            'message' => 'Movie updated successfully!',
            'type' => 'success'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Movie  $movie
     * @return \Illuminate\Http\Response
     */
    public function destroy(Movie $movie)
    {
        $movie->delete();

        return redirect()->route('admin.dashboard.movie.index')->with([
            'message' => 'Movie deleted successfully!',
            'type' => 'success'
        ]);
    }

    public function restore($movie)
    {
        Movie::withTrashed()->findOrFail($movie)->restore();

        return redirect()->route('admin.dashboard.movie.index')->with([
            'message' => 'Movie restored successfully!',
            'type' => 'success'
        ]);
    }
}
