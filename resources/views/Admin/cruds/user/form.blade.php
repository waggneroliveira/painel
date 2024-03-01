
<div class="row col-12">
    <div class="col-12 col-lg-6">
        <div class="card card-body">
            <div class="mb-3 col-lg-12">
                {!! Form::label(null, 'Nome', ['class'=>'form-label']) !!}
                {!! Form::text('name', null, ['class'=>'form-control', 'id'=>'validationCustom01']) !!}
            </div>
            <div class="mb-3 col-lg-12">
                {!! Form::label(null, 'Senha', ['class'=>'form-label']) !!}
                {!! Form::password('password', [
                    'class'=>'form-control',
                    'id'=>'pass2',
                    'placeholder'=>'Senha',
                ])!!}
                
            </div>
            <div class="mb-3 col-lg-12">
                {!! Form::label(null, 'E-mail', ['class'=>'form-label']) !!}
                {!! Form::text('email', null, ['class'=>'form-control', 'id'=>'validationCustom02', 'required'=>'required']) !!}
            </div>     
            <div class="mb-3">
                {!! Form::checkbox('active', '1', null, ['class'=>'form-check-input', 'id'=>'active']) !!}
                {!! Form::label('active', 'Usuário Ativo?', ['class'=>'form-check-label']) !!}
            </div>        
        </div> <!-- end card-body-->
    </div> <!-- end card-->
    <div class="col-12 col-lg-6">
        <div class="card card-body">
            <div class="mb-3 col-lg-12">
                {!! Form::label('file', 'Imagem', ['class'=>'form-label']) !!}
                {!! Form::file('path_image', [
                    'data-plugins'=>'dropify',
                    'data-height'=>'250',
                    'data-max-file-size-preview'=>'2M',
                    'accept'=>'image/*',
                    'data-default-file'=> isset($user)?$user->path_image<>''?url('storage/'.$user->path_image):'':'',
                ]) !!}
            </div>
        </div>
    </div>
    <div class="col-12 col-lg-12">
        <div class="card card-body">            
            @if ($currentRole <> '')
                @if ($currentRole->count())
                    <h5 class="page-title">Grupos Pertencentes</h5>

                    <div class="card">
                        <ul class="list-group w-100 h-25" style="column-count: 2">
                            @foreach($currentRole as $role)
                                <li class="list-group-item">
                                    <label>
                                        {{ucfirst($role->name)}}
                                    </label>
                                    @can('usuario.atribuir grupos')                                        
                                        <input  type="checkbox" name="roles[]" checked value="{{$role->name}}">
                                    @endcan
                      
                                </li>
                            @endforeach                
                        </ul>
                    </div>
                @endif
            @endif
            
            @can('usuario.atribuir grupos')               
                @if ($otherRoles <> '')
                    @if ($otherRoles->count())
                        <div class="card">
                            <ul class="list-group w-100 h-25" style="column-count: 2">
                                <div class="mt-2">
                                    <h5 class="page-title">Adicionar ao(s) Grupo(s)</h5>
                                    @foreach($otherRoles as $role)
                                            <li class="list-group-item">
                                                <label>
                                                    {{ucfirst($role->name)}}
                                                </label>                                
                                                <input name="roles[]" type="checkbox" value="{{$role->name}}">                        
                                            </li>
                                    @endforeach
                                </div>
                            </ul>
                        </div>
                    @endif
                @endif   
                @if ($otherRoles == '' && $currentRole == '')                
                    <div class="card">
                        <ul class="list-group w-100 h-25" style="column-count: 2">
                            <div class="mt-2">
                                <h5 class="page-title">Grupos</h5>
                                @foreach($roles as $role)
                                        <li class="list-group-item">
                                            <label>
                                                {{ucfirst($role->name)}}
                                            </label>                                
                                            <input name="roles[]" type="checkbox" value="{{$role->name}}">                        
                                        </li>
                                @endforeach
                            </div>
                        </ul>
                    </div>
                @endif
            @endcan   
        </div>
    </div>
</div>

<!-- end row -->
