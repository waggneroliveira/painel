@extends('Admin.core.auth')
@section('content')
    <div class="login auth-fluid">
        <!--Auth fluid left content -->
        <div class="auth-fluid-form-box">
            <div class="align-items-center d-flex h-100">
                <div class="card-body">

                    <!-- Logo -->
                    <div class="auth-brand text-center text-lg-start">
                        <div class="auth-logo">
                            <a href="{{route('admin.dashboard.painel')}}" class="logo logo-dark text-center">
                                <span class="authl logo-lg">
                                    <img src="{{asset('Admin/assets/images/whi.png')}}" alt="" height="22">
                                    <h2>WHI <span>Web de alta inspiração</span></h2>
                                </span>
                            </a>
        
                            <a href="{{route('admin.dashboard.painel')}}" class="logo logo-light text-center">
                                <span class="authl logo-lg">
                                    <img src="{{asset('Admin/assets/images/whit.png')}}" alt="" height="22">
                                    <h2>WHI - Web de alta inspiração</h2>
                                </span>
                            </a>
                        </div>
                    </div>

                    <!-- title-->
                    <h4 class="mt-0">Recuperar senha</h4>
                        <p class="text-muted mb-4">Digite seu endereço de e-mail e enviaremos um e-mail com instruções para redefinir sua senha.</p>

                    <!-- form -->
                    <form action="{{route('password.email')}}" method="POST">
                        @csrf
                        @if ($errors->any())
                            <div class="alert alert-danger">
                                <ul class="mb-0">
                                    @foreach ($errors->all() as $error)
                                        <li>{{ $error }}</li>
                                    @endforeach
                                </ul>
                            </div>
                        @endif

                        @if(session('success'))
                            <div class="alert alert-success">
                                {{ session('success') }}
                            </div>
                        @endif
                        
                        <div class="mb-3">
                            <label for="emailaddress" class="form-label">E-mail</label>
                            <input class="form-control" name="email" type="email" id="emailaddress" required="" placeholder="Digite seu E-mail">
                        </div>

                        <div class="text-center d-grid">
                            <button class="btn btn-success waves-effect waves-light" type="submit"> Enviar </button>
                        </div>
                    </form>
                    <!-- end form-->

                    <!-- Footer-->
                    <footer class="footer footer-alt">
                        <p class="text-muted">Voltar para <a href="{{route('admin.dashboard.painel')}}" class="text-muted ms-1"><b>Login</b></a></p>
                    </footer>

                </div> <!-- end .card-body -->
            </div> <!-- end .align-items-center.d-flex.h-100-->
        </div>
        <!-- end auth-fluid-form-box-->

        <!-- Auth fluid right content -->
        <div class="auth-fluid-right text-center" style="background-image: url({{asset('Admin/assets/images/bg-login.jpeg')}})">
            <div class="auth-user-testimonial">
                {{-- <h2 class="mb-3 text-white">I love the color!</h2>
                <p class="lead"><i class="mdi mdi-format-quote-open"></i> I've been using your theme from the previous developer for our web app, once I knew new version is out, I immediately bought with no hesitation. Great themes, good documentation with lots of customization available and sample app that really fit our need. <i class="mdi mdi-format-quote-close"></i>
                </p>
                <h5 class="text-white">
                    - Fadlisaad (Ubold Admin User)
                </h5> --}}
            </div> <!-- end auth-user-testimonial-->
        </div>
        <!-- end Auth fluid right content -->
    </div>
    <!-- end auth-fluid-->
@endsection