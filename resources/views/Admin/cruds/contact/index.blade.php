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
                                    <li class="breadcrumb-item active">Formulário de Contato</li>
                                </ol>
                            </div>
                            <h4 class="page-title">Formulário de Contato</h4>
                        </div>
                    </div>
                </div>
                <!-- end row -->

                <div class="row">
                    <div class="col-sm-12">
                        <div class="card">
                            <div class="card-body">
                                <div class="row mb-3">
                                    @can('formulario de contato.remover')
                                        <div style="width: 16%;margin-top: 25px;">
                                            <button id="btSubmitDelete" data-route="{{route('admin.dashboard.contact.destroySelected')}}" type="button" class="btn btn-danger" style="display: none;">Deletar selecionados</button>
                                        </div>
                                    @endcan
                                    <div class="row justify-content-end flex-column-reverse pe-0" style="width: 84%;gap:0 15px;align-items: flex-end;">
                                        @if (route('admin.dashboard.contact.search') == url()->current())                                            
                                            <a href="{{route('admin.dashboard.contact.index')}}" class="btn btn-primary" style="width: 110px;height: 38px;margin-top: 0px;">Limpar Filtro</a>
                                        @endif
                                        <form action="{{route('admin.dashboard.contact.search')}}" method="POST" class="row justify-content-end col-12">
                                            @csrf
                                            <h5 class="page-title" style="padding-left: 0px">Filtrar por:</h5>
                                            <div class="data-search ps-0">
                                                <input type="date" name="date_search">
                                            </div>
                                            <select name="status" class="form-select" style="height: 38px;width: 16%;" aria-label="Default select example">
                                                <option selected>Status</option>
                                                <option value="1">Pendente</option>
                                                <option value="2">Em Contato</option>
                                                <option value="3">Orçamento</option>
                                                <option value="4">Agendamento</option>
                                            </select>
                                            <div class="input-group mb-3" style="width: 30%;">
                                                <input name="email" type="text" class="form-control" placeholder="E-mail" aria-label="E-mail" aria-describedby="button-addon2">                                 
                                            </div>
                                            <div class="input-group mb-3 p-0" style="width: 34%;">
                                                <input name="search" type="text" class="form-control" placeholder="Nome" aria-label="Nome" aria-describedby="button-addon2">
                                                <button class="btn btn-outline-secondary" type="submit" id="button-addon2">Button</button>
                                            </div>
                                        </form>
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
                                            <th>Enviado em</th>
                                            <th class="col-3">Ações</th>
                                        </tr>
                                    </thead>

                                    <tbody data-route="{{route('admin.dashboard.contact.sorting')}}">
                                        @foreach ($contacts as $key => $contact)
                                            <tr data-code="{{$contact->id}}">
                                                <td><span class="btnDrag mdi mdi-drag-horizontal font-22"></span></td>
                                                <td class="bs-checkbox">
                                                    <label><input data-index="{{$key}}" name="btnSelectItem" class="btnSelectItem" type="checkbox" value="{{$contact->id}}"></label>
                                                </td>
                                                <td>{{$contact->nome}}</td>
                                                <td>{{$contact->email}}</td>
                                                <td>
                                                    @switch($contact->status)
                                                        @case(1) <span class="badge bg-danger">Pendente</span> @break
                                                        @case(2) <span class="badge bg-warning">Em Contato</span> @break
                                                        @case(3) <span class="badge bg-primary">Orçamento</span> @break
                                                        @case(4) <span class="badge bg-success">Agendamento</span> @break
                                                    @endswitch
                                                </td>
                                                <td>{{date('d/m/Y', strtotime($contact->data_registro))}}</td>
                                                <td class="col-3">
                                                    <div class="row justify-content-between flex-row col-4">
                                                        @can('formulario de contato.editar')
                                                            <div class="col-1">
                                                                <a href="{{route('admin.dashboard.contact.edit',['contact' => $contact->id])}}" class="btn-icon mdi mdi-square-edit-outline"></a>
                                                            </div>
                                                        @endcan
                                                        @can('formulario de contato.visualizar')
                                                            <div class="col-1">
                                                                <a class="btn-icon mdi mdi-eye" data-bs-toggle="modal" data-bs-target="#modal-contact-{{$contact->id}}"></a>

                                                                <div id="modal-contact-{{$contact->id}}" class="modal fade" tabindex="-1" contact="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
                                                                    <div class="modal-dialog" style="max-width: 800px;">
                                                                        <div class="modal-content">
                                                                            <div class="modal-header p-3 pt-2 pb-2">
                                                                                <h4 class="page-title">Usuário</h4>
                                                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                            </div>
                                                                            <div class="modal-body p-3 pt-0 pb-3">
                                                                                {!! Form::model($contact, ['route' => ['admin.dashboard.contact.show', $contact->id], 'class'=>'parsley-examples']) !!}
                                                                                    @include('Admin.cruds.contact.form')
                                                                                {!! Form::close() !!}                                                                             
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        @endcan
                                                        @can('formulario de contato.remover')
                                                            <form action="{{route('admin.dashboard.contact.destroy',['contact' => $contact->id])}}" class="col-1" method="POST">
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
                                    {{$contacts->links()}}
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
