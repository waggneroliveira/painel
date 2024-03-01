{{--
    DOC
    https://laravelcollective.com/docs/6.x/html

--}}

{{-- Input Default --}}
<div class="mb-3">
    {!! Form::label('validationCustom01', 'First name', ['class'=>'form-label']) !!}
    {!! Form::text('title', null, ['class'=>'form-control', 'id'=>'validationCustom01', 'placeholder'=>'First name', 'required'=>'required']) !!}
</div>

{{-- Date Picker --}}
<div class="mb-3">
    {!! Form::label(null, 'Autoclose', ['class'=>'form-label']) !!}
    {!! Form::text('date', null, [
            'class'=>'form-control',
            'required'=>'required',
            'data-provide'=>'datepicker',
            'data-date-autoclose'=>'true',
        ])!!}
</div>
<div class="mb-3">
    {!! Form::label(null, 'Month View', ['class'=>'form-label']) !!}
    {!! Form::text('date', null, [
            'class'=>'form-control',
            'required'=>'required',
            'data-provide'=>'datepicker',
            'data-date-format'=>'MM yyyy',
            'data-date-min-view-mode'=>'1'
        ])!!}
</div>
<div class="mb-3">
    {!! Form::label(null, 'Year View', ['class'=>'form-label']) !!}
    {!! Form::text('date', null, [
            'class'=>'form-control',
            'required'=>'required',
            'data-provide'=>'datepicker',
            'data-date-min-view-mode'=>'2'
        ])!!}
</div>

{{-- Color Picker --}}
<div class="mb-3">
    {!! Form::label('colorpicker-default', 'Simple input field', ['class'=>'form-label']) !!}
    {!! Form::text('date', '#4a81d4', [
            'class'=>'form-control',
            'id'=>'colorpicker-default',
            'required'=>'required',
        ])!!}
</div>

{{-- Clock Piker --}}
<div class="mb-3">
    {!! Form::label(null, 'Auto close', ['class'=>'form-label']) !!}
    <div class="input-group clockpicker" data-placement="top" data-align="top" data-autoclose="true">
        {!! Form::text('clock', '13:14', ['class'=>'form-control']) !!}
        <span class="input-group-text"><i class="mdi mdi-clock-outline"></i></span>
    </div>
</div>

{{-- Inputs Mask --}}
<div class="mb-3">
    {!! Form::label(null, 'Date', ['class'=>'form-label']) !!}
    {!! Form::text('date', null, [
        'class'=>'form-control',
        'data-toggle'=>'input-mask',
        'required'=>'required',
        'data-mask-format'=>'00/00/0000',
    ]) !!}
</div>
<div class="mb-3">
    {!! Form::label(null, 'Hour', ['class'=>'form-label']) !!}
    {!! Form::text('hour', null, [
        'class'=>'form-control',
        'data-toggle'=>'input-mask',
        'required'=>'required',
        'data-mask-format'=>'00:00:00',
    ]) !!}
</div>
<div class="mb-3">
    {!! Form::label(null, 'Date & Hour', ['class'=>'form-label']) !!}
    {!! Form::text('data_hour', null, [
        'class'=>'form-control',
        'data-toggle'=>'input-mask',
        'required'=>'required',
        'data-mask-format'=>'00/00/0000 00:00:00',
    ]) !!}
</div>
<div class="mb-3">
    {!! Form::label(null, 'ZIP Code', ['class'=>'form-label']) !!}
    {!! Form::text('data_hour', null, [
        'class'=>'form-control',
        'data-toggle'=>'input-mask',
        'required'=>'required',
        'data-mask-format'=>'00000-000',
    ]) !!}
</div>
<div class="mb-3">
    {!! Form::label(null, 'Money', ['class'=>'form-label']) !!}
    {!! Form::text('money', null, [
        'class'=>'form-control',
        'data-toggle'=>'input-mask',
        'required'=>'required',
        'data-mask-format'=>'#.##0,00',
        'data-reverse'=>'true',
    ]) !!}
</div>
<div class="mb-3">
    {!! Form::label(null, 'Phone', ['class'=>'form-label']) !!}
    {!! Form::text('phone', null, [
        'class'=>'form-control',
        'data-toggle'=>'input-mask',
        'required'=>'required',
        'data-mask-format'=>'(00) 0000-0000',
    ]) !!}
</div>
<div class="mb-3">
    {!! Form::label(null, 'Celphone', ['class'=>'form-label']) !!}
    {!! Form::text('celphone', null, [
        'class'=>'form-control',
        'data-toggle'=>'input-mask',
        'required'=>'required',
        'data-mask-format'=>'(00) 00000-0000',
    ]) !!}
</div>
<div class="mb-3">
    {!! Form::label(null, 'CPF', ['class'=>'form-label']) !!}
    {!! Form::text('cpf', null, [
        'class'=>'form-control',
        'data-toggle'=>'input-mask',
        'required'=>'required',
        'data-mask-format'=>'000.000.000-00',
        'data-reverse'=>'true',
    ]) !!}
</div>
<div class="mb-3">
    {!! Form::label(null, 'CNPJ', ['class'=>'form-label']) !!}
    {!! Form::text('cnpj', null, [
        'class'=>'form-control',
        'data-toggle'=>'input-mask',
        'required'=>'required',
        'data-mask-format'=>'00.000.000/0000-00',
        'data-reverse'=>'true',
    ]) !!}
</div>

{{-- Select --}}
<div class="mb-3">
    {!! Form::label('heard', 'Select', ['class'=>'form-label']) !!}
    {!! Form::select('options', ['1' => 'Option 1', '2' => 'Option 2', '3' => 'Option 2'], null, [
        'class'=>'form-select',
        'id'=>'heard',
        'required'=>'required',
        'placeholder' => 'Pick a size...'
    ]) !!}
</div>

{{-- Validate type --}}
<div class="mb-3">
    {!! Form::label(null, 'Equal To', ['class'=>'form-label']) !!}
    {!! Form::password('password', [
            'class'=>'form-control',
            'id'=>'pass2',
            'required'=>'required',
            'placeholder'=>'Senha',
        ])!!}
    {!! Form::password('password_confirmation', [
            'class'=>'form-control mt-3',
            'required'=>'required',
            'data-parsley-equalto'=>"#pass2",
            'placeholder'=>'Confirmar senha',
        ])!!}
</div>
<div class="mb-3">
    {!! Form::label(null, 'E-mail', ['class'=>'form-label']) !!}
    {!! Form::email('email', null, [
        'class'=>'form-control',
        'required'=>'required',
        'parsley-type'=>'email',
    ]) !!}
</div>
<div class="mb-3">
    {!! Form::label(null, 'URL', ['class'=>'form-label']) !!}
    {!! Form::url('url', null, [
        'class'=>'form-control',
        'required'=>'required',
        'parsley-type'=>'url',
    ]) !!}
</div>

{{-- Max, Min, Regular Exp Value --}}
<div class="mb-3">
    {!! Form::label(null, 'Min Length', ['class'=>'form-label']) !!}
    {!! Form::text('min_length', null, [
        'class'=>'form-control',
        'required'=>'required',
        'data-parsley-minlength'=>'6',
    ]) !!}
</div>
<div class="mb-3">
    {!! Form::label(null, 'Max Length', ['class'=>'form-label']) !!}
    {!! Form::text('max_length', null, [
        'class'=>'form-control',
        'required'=>'required',
        'data-parsley-maxlength'=>'6',
    ]) !!}
</div>
<div class="mb-3">
    {!! Form::label(null, 'Range Length', ['class'=>'form-label']) !!}
    {!! Form::text('range_length', null, [
        'class'=>'form-control',
        'required'=>'required',
        'data-parsley-length'=>'[5,10]',
    ]) !!}
</div>
<div class="mb-3">
    {!! Form::label(null, 'Regular Exp', ['class'=>'form-label']) !!}
    {!! Form::text('hex_color', null, [
        'class'=>'form-control',
        'required'=>'required',
        'data-parsley-pattern'=>'#[A-Fa-f0-9]{6}',
        'placeholder'=>'Hex. Color',
    ]) !!}
</div>
<div class="mb-3">
    {!! Form::label('message', 'Mensagem', ['class'=>'form-label']) !!}
    {!! Form::textarea('description', null, [
        'class'=>'form-control',
        'id'=>'message',
        'required'=>'required',
        'data-parsley-trigger'=>'keyup',
        'data-parsley-minlength'=>'20',
        'data-parsley-maxlength'=>'100',
        'data-parsley-minlength-message'=>'Vamos lá! Você precisa inserir um texto de pelo menos 20 caracteres.',
        'data-parsley-validation-threshold'=>'10',
    ]) !!}
</div>

{{-- Radios, Checkbox --}}
<div class="mb-3 radio">
    {!! Form::radio('radio', '1', null, ['id'=>'genderM', 'required'=>'required']) !!}
    {!! Form::label('genderM', 'Male') !!}
</div>
<div class="mb-3 radio">
    {!! Form::radio('radio', '2', null, ['id'=>'genderF', 'required'=>'required']) !!}
    {!! Form::label('genderF', 'Female',) !!}
</div>
<div class="mb-3 form-check">
    {!! Form::checkbox('checkbox', '1', null, ['class'=>'form-check-input', 'id'=>'invalidCheck', 'required'=>'required']) !!}
    {!! Form::label('invalidCheck', 'Checkbox 1', ['class'=>'form-check-label']) !!}
</div>
<div class="mb-3 form-check">
    {!! Form::checkbox('checkbox', '2', null, ['class'=>'form-check-input', 'id'=>'invalidCheck1', 'required'=>'required']) !!}
    {!! Form::label('invalidCheck1', 'Checkbox 2', ['class'=>'form-check-label']) !!}
</div>

{{-- CK Editor --}}
<div class="mb-3">
    {!! Form::label('basic-editor', 'Basic Editor', ['class'=>'form-label']) !!}
    {!! Form::textarea('description', null, [
        'class'=>'form-control CkEditorColumn',
        'id'=>'basic-editor',
        'data-height' => 200
    ]) !!}
</div>
<div class="mb-3">
    {!! Form::label('complete-editor', 'Complete Editor', ['class'=>'form-label']) !!}
    {!! Form::textarea('description', null, [
        'class'=>'form-control CkEditorColumn',
        'id'=>'complete-editor',
        'data-height' => 200
    ]) !!}
</div>

{{-- Upload File --}}
<div class="mb-3">
    {!! Form::label('file', 'Imagem', ['class'=>'form-label']) !!}
    {!! Form::file('path_archive', [
        'data-plugins'=>'dropify',
        'data-height'=>'300',
        'data-max-file-size-preview'=>'2M',
        'accept'=>'image/*',
        'data-default-file'=> isset($test)?$test->path_image<>''?url('storage/'.$test->path_image):'':'',
    ]) !!}
</div>

{{-- Image Crop --}}
<div class="mb-3">
    <div class="container-image-crop">
        <label class="area-input-image-crop" for="inputImage" title="Upload image file">
            {!! Form::file('path_image', [
                'id'=>'inputImage',
                'class'=>'inputImage',
                'data-mincropwidth'=>'80',
                'data-scale'=>'1/1',
                'accept'=>'.jpg,.jpeg,.png,.gif,.bmp,.tiff',
                'data-default-file'=> isset($test)?$test->path_image<>''?url('storage/'.$test->path_image):'':'',
            ]) !!}
        </label>
    </div><!-- END container image crop -->
</div>
