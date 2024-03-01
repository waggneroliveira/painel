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
                    <h4 class="mt-0">Entrar</h4>
                    <p class="text-muted mb-4">Entre com seu endereço de e-mail e senha para acessar a conta</p>

                    <!-- form -->
                    <form action="{{route('admin.user.authenticate')}}" method="POST">
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
                            <input class="form-control" name="email" type="email" id="emailaddress" required="" placeholder="Enter your email">
                        </div>
                        <div class="mb-3">
                            <a href="{{route('password.request')}}" class="text-muted float-end"><small>Esqueceu sua senha?</small></a>
                            <label for="password" class="form-label">Senha</label>
                            <div class="input-group input-group-merge">
                                <input type="password" id="password" name="password" class="form-control" placeholder="Enter your password">
                                <div class="input-group-text" data-password="false">
                                    <span class="password-eye"></span>
                                </div>
                            </div>
                        </div>
                        
                        {{-- <div class="mb-3">
                            <div class="form-check">
                                <input type="checkbox" class="form-check-input" id="checkbox-signin">
                                <label name="remember" class="form-check-label" for="checkbox-signin">Remember me</label>
                            </div>
                        </div> --}}
                        <div class="btn-logar text-center d-grid">
                            <button class="btn btn-primary" type="submit">Logar</button>
                        </div>
                        <!-- social-->
                        <div class="text-center mt-4">
                            <p class="text-muted font-16">entrar com</p>
                            <ul class="social-list list-inline mt-3">
                                <li class="list-inline-item">
                                    <a href="javascript: void(0);" class="social-list-item border-primary text-primary"><i class="mdi mdi-facebook"></i></a>
                                </li>
                                <li class="list-inline-item">
                                    <a href="javascript: void(0);" class="social-list-item border-danger text-danger"><i class="mdi mdi-google"></i></a>
                                </li>
                                <li class="list-inline-item">
                                    <a href="javascript: void(0);" class="social-list-item border-info text-info"><i class="mdi mdi-twitter"></i></a>
                                </li>
                                <li class="list-inline-item">
                                    <a href="javascript: void(0);" class="social-list-item border-secondary text-secondary"><i class="mdi mdi-github"></i></a>
                                </li>
                            </ul>
                        </div>
                    </form>
                    <!-- end form-->

                    <!-- Footer-->
                    {{-- <footer class="footer footer-alt">
                        <p class="text-muted">Não tem uma conta? <a href="auth-register-2.html" class="text-muted ms-1"><b>Increva-se</b></a></p>
                    </footer> --}}

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