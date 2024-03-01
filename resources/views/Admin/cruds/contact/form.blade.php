
<div class="row col-12">
    <div class="col-12 col-lg-12">
        <div class="card card-body">
            <div class="row">
                <div class="mb-3 col-lg-6">
                    {!! Form::label(null, 'Nome', ['class'=>'form-label']) !!}
                    {!! Form::text('nome', null, ['class'=>'form-control', 'id'=>'validationCustom01']) !!}
                </div>
                <div class="mb-3 col-lg-6">
                    {!! Form::label(null, 'E-mail', ['class'=>'form-label']) !!}
                    {!! Form::text('email', null, ['class'=>'form-control', 'id'=>'validationCustom02', 'required'=>'required']) !!}
                </div> 
                <div class="mb-3">
                    {!! Form::label('heard', 'Status do email', ['class'=>'form-label']) !!}
                    {!! Form::select('status', ['1' => 'Pendente', '2' => 'Contato', '3' => 'Orçamento', '4' => 'Agendamento'], null, [
                        'class'=>'form-select',
                        'id'=>'heard',
                        'required'=>'required',
                        'placeholder' => 'Selecione o status'
                    ]) !!}
                </div>   
            </div>
        </div> <!-- end card-body-->
    </div> <!-- end card-->
</div>

<!-- end row -->
