<?php

namespace App\Http\Requests\Admin\Movie;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class StoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return Auth::user()->hasRole('admin');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'title' => ['required', 'string', 'max:255', 'unique:movies,title'],
            'category' => ['required', 'string', 'max:255'],
            'video_url' => ['required', 'url'],
            'thumbnail' => ['required', 'image'],
            'rating' => ['required', 'numeric', 'min:0', 'max:5'],
            'is_feature' => ['nullable', 'boolean'],
        ];
    }
}
