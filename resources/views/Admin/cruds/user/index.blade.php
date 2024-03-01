@extends('Admin.core.admin')
@section('content')
    <div class="content-page">
        <div class="content">
            <!-- Start Content-->
            <div class="container-fluid">
                <!-- start page title -->
                <div class="row">
                    <div class="col-12">
                        <div class="page-title-box">
                            <div class="page-title-right">
                                <ol class="breadcrumb m-0">
                                    <li class="breadcrumb-item"><a href="{{route('admin.dashboard')}}">Dashboard</a></li>
                                    <li class="breadcrumb-item active">Usuários</li>
                                </ol>
                            </div>
                            <h4 class="page-title">Usuários</h4>
                        </div>
                    </div>
                </div>
                <!-- end row -->

                <div class="row">
                    <div class="col-sm-12">
                        <div class="card">
                            <div class="card-body">
                                <div class="row mb-3 justify-content-end">
                                    @can('usuario.remover')
                                        <div class="col-6">
                                            <button id="btSubmitDelete" data-route="{{route('admin.dashboard.user.destroySelected')}}" type="button" class="btn btn-danger" style="display: none;">Deletar selecionados</button>
                                        </div>
                                    @endcan
                                    <div class="row col-6 d-flex justify-content-end">
                                        <div style="width: 240px">
                                            @can('usuario.restaurar dados')                                                
                                                @if ($userDeleteds_at)                                                
                                                    <a href="{{route('admin.dashboard.user.show')}}" class="btn btn-primary float-end">Restaurar regitro(s) <i class="mdi mdi-delete-restore"></i></a>
                                                @endif
                                            @endcan

                                            {{-- <div id="modal-user" class="modal fade" tabindex="-1" user="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
                                                <div class="modal-dialog" style="max-width: 800px;">
                                                    <div class="modal-content">
                                                        <div class="modal-header p-3 pt-2 pb-2">
                                                            <h4 class="page-title">Registros deletados</h4>
                                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                        </div>

                                                        <div class="modal-body p-3 pt-0 pb-3">
                                                            <table data-toggle="table" data-page-size="5" data-pagination="false" class="table-bordered table-sortable">
                                                                <thead class="table-light">
                                                                    <tr>
                                                                        <th></th>
                                                                        <th>Nome</th>
                                                                        <th>E-mail</th>
                                                                        <th>Deletado em</th>
                                                                        <th>Ações</th>
                                                                    </tr>
                                                                </thead>
                            
                                                                <tbody data-route="{{route('admin.dashboard.user.sorting')}}">
                                                                    @foreach ($userDeleteds_at as $key => $user)
                                                                        <tr data-code="{{$user->id}}">
                                                                            <td><span class="btnDrag mdi mdi-drag-horizontal font-22"></span></td>
                                                                            <td>{{$user->name}}</td>
                                                                            <td>{{$user->email}}</td>
                                                                            <td>{{$user->deleted_at->format('d/m/Y')}}</td>
                                                                            <td>
                                                                                <div class="row">
                                                                                    @can('usuario.editar')
                                                                                        <div class="col-4">
                                                                                            <form action="{{route('admin.dashboard.user.retoreData',['user' => $user->id])}}" class="col-4" method="POST">
                                                                                                @csrf
                                                                                                @method('POST') 
                                                                                                    
                                                                                                <button type="submit" class="btn-icon" title="Restaurar item"><i class="mdi mdi-restore"></i></button>
                                                                                            </form>
                                                                                        </div>
                                                                                    @endcan
                                                                                    @can('usuario.remover')
                                                                                        <form action="{{route('admin.dashboard.user.deleteForced',['user' => $user->id])}}" class="col-4" method="POST">
                                                                                            @csrf
                                                                                            @method('DELETE') 
                                                                                                
                                                                                            <button type="button" class="btn-icon btSubmitDeleteItemForever" title="Deletar permanentemente"><i class="mdi mdi-delete-forever-outline"></i></button>
                                                                                        </form>
                                                                                    @endcan
                                                                                </div>
                                                                            </td>
                                                                        </tr>
                                                                    @endforeach
                                                                </tbody>
                                                            </table>                                                                           
                                                        </div>
                                                    </div>
                                                </div>
                                            </div> --}}
                                        </div>
                                        @can('usuario.criar')
                                            <div style="width: 165px">
                                                <a href="{{route('admin.dashboard.user.create')}}" class="btn btn-success float-end">Adicionar novo <i class="mdi mdi-plus"></i></a>
                                            </div>
                                        @endcan
                                    </div>
                                </div>
                                <table data-toggle="table" data-page-size="5" data-pagination="false" class="table-bordered table-sortable">
                                    <thead class="table-light">
                                        <tr>
                                            <th></th>
                                            <th class="bs-checkbox">
                                                <label><input name="btnSelectAll" type="checkbox"></label>
                                            </th>
                                            <th>Nome</th>
                                            <th>E-mail</th>
                                            <th>Status</th>
                                            <th>Criado em</th>
                                            <th>Ações</th>
                                        </tr>
                                    </thead>

                                    <tbody data-route="{{route('admin.dashboard.user.sorting')}}">
                                        @foreach ($users as $key => $user)
                                            <tr data-code="{{$user->id}}">
                                                <td><span class="btnDrag mdi mdi-drag-horizontal font-22"></span></td>
                                                <td class="bs-checkbox">
                                                    <label><input data-index="{{$key}}" name="btnSelectItem" class="btnSelectItem" type="checkbox" value="{{$user->id}}"></label>
                                                </td>
                                                <td>{{$user->name}}</td>
                                                <td>{{$user->email}}</td>
                                                <td>
                                                    @switch($user->active)
                                                        @case(0) <span class="badge bg-danger">Inativo</span> @break
                                                        @case(1) <span class="badge bg-success">Ativo</span> @break
                                                    @endswitch
                                                </td>
                                                <td>{{$user->created_at->format('d/m/Y H:i')}}</td>
                                                <td>
                                                    <div class="row">
                                                        @can('usuario.editar')
                                                            <div class="col-4">
                                                                <a href="{{route('admin.dashboard.user.edit',['user' => $user->id])}}" class="btn-icon mdi mdi-square-edit-outline"></a>
                                                            </div>
                                                        @endcan
                                                        @can('usuario.visualizar')
                                                            <div class="col-4">
                                                                <a class="btn-icon mdi mdi-eye" data-bs-toggle="modal" data-bs-target="#modal-user-{{$user->id}}"></a>

                                                                <div id="modal-user-{{$user->id}}" class="modal fade" tabindex="-1" user="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
                                                                    <div class="modal-dialog" style="max-width: 800px;">
                                                                        <div class="modal-content">
                                                                            <div class="modal-header p-3 pt-2 pb-2">
                                                                                <h4 class="page-title">Usuário</h4>
                                                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                            </div>
                                                                            <div class="modal-body p-3 pt-0 pb-3">
                                                                                {!! Form::model($user, ['route' => ['admin.dashboard.user.show', $user->id], 'class'=>'parsley-examples']) !!}
                                                                                    @include('Admin.cruds.user.form')
                                                                                {!! Form::close() !!}                                                                             
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        @endcan
                                                        @can('usuario.remover')
                                                            <form action="{{route('admin.dashboard.user.destroy',['user' => $user->id])}}" class="col-4" method="POST">
                                                                @method('DELETE') @csrf
                                                                    
                                                                <button type="button" class="btn-icon btSubmitDeleteItem"><i class="mdi mdi-trash-can"></i></button>
                                                            </form>
                                                        @endcan
                                                    </div>
                                                </td>
                                            </tr>
                                        @endforeach
                                    </tbody>
                                </table>

                                {{-- PAGINATION --}}
                                <div class="mt-3 float-end">
                                    {{$users->links()}}
                                </div>
                            </div>
                        </div> <!-- end card-->
                    </div> <!-- end col-->
                </div>
                <!-- end row -->
            </div> <!-- container -->
        </div> <!-- content -->
    </div>
    @include('Admin.components.links.resourcesIndex')
@endsection
