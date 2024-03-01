<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RequestStoreRoles extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules(): array
    {
        return [
            'name'=>'required',
            'guard_name'=>'required'
        ];
    }

    public function messages(): array
    {
        return [
            "required"=>"O campo :attribute é obrigatorio"
        ];
    }
}
