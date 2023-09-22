@extends('Admin.core.admin')
@section('content')
    <div class="forbidden account-pages mt-5 mb-5">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-8 col-lg-6 col-xl-5">
                    <div class="card bg-pattern">
    
                        <div class="card-body p-4">
                            
                            <div class="auth-logo">
                                <a href="{{route('admin.dashboard')}}" class="logo logo-dark text-center">
                                    <span class="logo-lg">
                                        <img src="{{asset('Admin/assets/images/whi.svg')}}" alt="WHI - Web de alta inspiração" height="22">
                                    </span>
                                </a>
            
                                <a href="{{route('admin.dashboard')}}" class="logo logo-light text-center">
                                    <span class="logo-lg">
                                        <img src="{{asset('Admin/assets/images/whi.svg')}}" alt="WHI - Web de alta inspiração" height="22">
                                    </span>
                                </a>
                            </div>
    
                            <div class="text-center mt-4">
                                <h1 class="text-error">503</h1>
                                <h3 class="mt-3 mb-2">FORBIDDEN</h3>
                                <p class="text-muted mb-3">O usuário não tem permissão para acessar essa página. Entre em contato com o administrador do painel. <a href="" class="text-dark"><b>Support</b></a></p>
    
                                <a href="{{route('admin.dashboard')}}" class="btn btn-success waves-effect waves-light">Voltar para o dashboard</a>
                            </div>
    
                        </div> <!-- end card-body -->
                    </div>
                    <!-- end card -->
    
                </div> <!-- end col -->
            </div>
            <!-- end row -->
        </div>
        <!-- end container -->
    </div>
    <!-- end page -->

    @include('Admin.components.links.resourcesIndex')
@endsection
