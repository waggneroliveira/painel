
<div class="row col-12">
    <div class="col-12 col-lg-12">
        <div class="card card-body">
            <div class="row">
                <input type="hidden" name="guard_name" value="web">
                <div class="mb-3 col-lg-12">
                    {!! Form::label(null, 'Nome', ['class'=>'form-label']) !!}
                    {!! Form::text('name', null, ['class'=>'form-control', 'id'=>'validationCustom01', 'required'=>'required']) !!}
                </div>
            </div>
        </div> <!-- end card-body-->
    </div> <!-- end card-->
    <div class="col-12 col-lg-12">
        <div class="card card-body">
            <ul class="list-group w-50 h-25" style="column-count: 2">
                @php
                    $last_index = '';
                @endphp
                @foreach($permissions as $permission)
                {{-- {{dd($permissions)}} --}}
                    <li class="list-group-item">
                        @if($last_index!==$permission->index())
                            {{ucfirst($permission->index())}}:
                        @endif
                        <ul>
                            <li class="">
                                <label>
                                    {{ucfirst($permission->name())}}
                                    <input name="permissions[]"
                                           type="checkbox"
                                           @if(isset($role) && $role->hasPermissionTo($permission->name)) checked @endif
                                           value="{{$permission->name}}">
                                </label>
                            </li>
                        </ul>
                    </li>
                    @php
                        $last_index = $permission->index();
                    @endphp
                @endforeach
            </ul>
        </div>
    </div>
</div>
<!-- end row -->
