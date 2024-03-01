<!DOCTYPE html>
<html lang="{{config('app.locale')}}">
    <head>
        <meta charset="utf-8" />
        <title>{{env('APP_NAME')}} - Painel Gerenciador</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />

        <meta name="author" content="WHI">
        <meta name="description" content="Sistema de gerenciamento do site {{env('APP_NAME')}}">
        <meta name="copyright" content="© 2023 WHI." />
        <meta name="robots" content="none">
        <meta name="googlebot" content="noarchive">

        <!-- App favicon -->
        <link rel="shortcut icon" href="{{asset('Admin/assets/images/whi.png')}}">

        @stack('createEditCss')
        @stack('indexCss')
        @stack('dashboardCss')

        <link href="{{url(mix('Admin/assets/libs/jquery.toast.min.css'))}}" rel="stylesheet" type="text/css" />
        <link href="{{url(mix('Admin/assets/libs/fancybox.css'))}}" rel="stylesheet" type="text/css" />

		<!-- App css -->
		<link href="{{url(mix('Admin/assets/css/config/bootstrap.min.css'))}}" rel="stylesheet" type="text/css" id="bs-default-stylesheet" disabled/>
		<link href="{{url(mix('Admin/assets/css/config/app.min.css'))}}" rel="stylesheet" type="text/css" id="app-default-stylesheet"  disabled/>

		<link href="{{url(mix('Admin/assets/css/config/bootstrap-dark.min.css'))}}" rel="stylesheet" type="text/css" id="bs-dark-stylesheet" />
		<link href="{{url(mix('Admin/assets/css/config/app-dark.min.css'))}}" rel="stylesheet" type="text/css" id="app-dark-stylesheet" />
		<!-- icons -->
		<link href="{{url(mix('Admin/assets/css/icons.min.css'))}}" rel="stylesheet" type="text/css" />

        <!-- Custom -->
        <link href="{{url(mix('Admin/assets/css/custom.css'))}}" rel="stylesheet" type="text/css" />

        <script>
            $url = "{{url('')}}";
        </script>

    </head>

    <!-- body start -->
    <body class="loading" data-layout='{"mode": "light", "width": "fluid", "menuPosition": "fixed", "sidebar": { "color": "light", "size": "default", "showuser": false}, "topbar": {"color": "dark"}, "showRightSidebarOnPageLoad": true}'>

        <!-- Begin page -->
        <div id="wrapper">

            <!-- Topbar Start -->
            <div class="navbar-custom">
                <div class="container-fluid">
                    <ul class="list-unstyled topnav-menu float-end mb-0 d-flex justify-content-end align-items-center">
                        <div class="contador-sessao">
                            <span class="mdi mdi-alarm"></span>
                            <span id="session-countdown" class="cont-session"></span>
                        </div>

                        <li class="dropdown d-none d-lg-inline-block">
                            <a class="nav-link arrow-none waves-effect waves-light" data-toggle="fullscreen" href="#">
                                <i class="fe-maximize noti-icon"></i>
                            </a>
                        </li>

                        <li class="dropdown d-none d-lg-inline-block topbar-dropdown">
                            <a class="nav-link dropdown-toggle arrow-none waves-effect waves-light" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
                                <i class="fe-grid noti-icon"></i>
                            </a>
                            <div class="dropdown-menu dropdown-lg dropdown-menu-end">

                                <div class="p-lg-1">
                                    <div class="row g-0">
                                        <div class="col">
                                            <a class="dropdown-icon-item" href="#">
                                                <img src="{{asset('Admin/assets/images/brands/dropbox.png')}}" alt="dropbox">
                                                <span>Dropbox</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </li>

                        <li class="dropdown notification-list topbar-dropdown">
                            <a class="nav-link dropdown-toggle nav-user me-0 waves-effect waves-light" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
                                @if (Auth::user()->path_image)
                                    <img src="{{asset('storage/'.Auth::user()->path_image)}}" alt="user-image" class="rounded-circle">
                                    @else
                                    <img src="{{asset('admin/assets/images/users/user.png')}}" alt="user-image" class="rounded-circle">
                                @endif

                                <span class="pro-user-name ms-1">
                                    {{explode(' ', Auth::user()->name)[0] }}
                                    {{-- {{explode(' ', Auth::user()->name)[1] }} --}}
                                </span>
                            </a>
                            <div class="dropdown-menu dropdown-menu-end profile-dropdown ">
                                <!-- item-->
                                <div class="dropdown-header noti-title">
                                    <h6 class="text-overflow m-0">Bem Vindo !</h6>
                                </div>

                                <!-- item-->
                                @can('usuario.editar')
                                    <a href="{{route('admin.dashboard.user.edit',['user' => $user->id])}}" class="dropdown-item notify-item">
                                        <i class="mdi mdi-account"></i>
                                        <span>Perfil</span>
                                    </a>
                                @endcan

                                <div class="dropdown-divider"></div>

                                <!-- item-->
                                <a href="{{route('admin.dashboard.user.logout')}}" class="dropdown-item notify-item">
                                    <i class="fe-log-out"></i>
                                    <span>Sair</span>
                                </a>

                            </div>
                        </li>

                    </ul>

                    <!-- LOGO -->
                    <div class="logo-box" style="background-color: #fff !important">
                        <a href="{{route('admin.dashboard')}}" class="logo logo-dark text-center">
                            <span class="logo-sm">
                                <img src="{{asset('Admin/assets/images/whi.png')}}" alt="WHI - Web de alta inspiração" height="42">
                            </span>
                            <span class="logo-lg">
                                <img src="{{asset('Admin/assets/images/whi.png')}}" alt="WHI - Web de alta inspiração" height="40">
                                <h2>WHI - Web de alta inspiração</h2>
                            </span>
                        </a>

                        <a href="{{route('admin.dashboard')}}" class="logo logo-light text-center">
                            <span class="logo-sm">
                                <img src="{{asset('Admin/assets/images/whi.png')}}" alt="WHI - Web de alta inspiração" height="42">
                            </span>
                            <span class="logo-lg">
                                <img src="{{asset('Admin/assets/images/whi.png')}}" alt="WHI - Web de alta inspiração" height="40">
                                <h2>WHI <span>Web de alta inspiração</span> </h2>
                            </span>
                        </a>
                    </div>

                    <ul class="list-unstyled topnav-menu topnav-menu-left m-0">
                        <li>
                            <button class="button-menu-mobile waves-effect waves-light">
                                <i class="fe-menu"></i>
                            </button>
                        </li>

                        <li>
                            <!-- Mobile menu toggle (Horizontal Layout)-->
                            <a class="navbar-toggle nav-link" data-bs-toggle="collapse" data-bs-target="#topnav-menu-content">
                                <div class="lines">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </a>
                            <!-- End mobile menu toggle-->
                        </li>
                    </ul>
                    <div class="clearfix"></div>
                </div>
            </div>
            <!-- end Topbar -->

            <!-- ========== Left Sidebar Start ========== -->
            <div class="left-side-menu">

                <div class="h-100" data-simplebar>
                    <!--- Sidemenu -->
                    <div id="sidebar-menu">

                            <ul id="side-menu">

                                <li class="menu-title">Navegação</li>

                                <li class="{{ route('admin.dashboard') == url()->current() ? 'current' : 'off-current' }}">
                                    <a nofollow href="{{route('admin.dashboard')}}">
                                        <i class="mdi mdi-view-dashboard-outline"></i>
                                        <span> Dashboard </span>
                                    </a>
                                </li>

                                <li>
                                    <a href="#sidebarDashboard" data-bs-toggle="collapse">
                                        <i class="mdi mdi-page-next-outline"></i>
                                        <span> Páginas </span>
                                        <span class="menu-arrow"></span>
                                    </a>
                                    <div class="collapse" id="sidebarDashboard">
                                        <ul class="nav-second-level">
                                            @can('grupo.visualizar')
                                                <li class="{{ route('admin.dashboard.group.index') == url()->current() ? 'current' : 'off-current' }}">
                                                    <a href="{{route('admin.dashboard.group.index')}}"><i class="mdi mdi-apple-airplay"></i> Grupos</a>
                                                </li>
                                            @endcan
                                            
                                            @can('usuario.visualizar')
                                                <li class="{{ route('admin.dashboard.user.index') == url()->current() ? 'current' : 'off-current' }}">
                                                    <a href="{{route('admin.dashboard.user.index')}}"><i class="mdi mdi-apple-airplay"></i> Usuários</a>
                                                </li>
                                            @endcan

                                            @can('formulario de contato.visualizar')
                                                <li class="{{ route('admin.dashboard.contact.index') == url()->current() ? 'current' : 'off-current' }}">
                                                    <a href="{{route('admin.dashboard.contact.index')}}"><i class="mdi mdi-apple-airplay"></i> Contato</a>
                                                </li>
                                            @endcan
                                        </ul>
                                    </div>
                                </li>

                                <li>
                                    <a nofollow href="#">
                                        <i class="mdi mdi-help"></i>
                                        <span> Ajuda </span>
                                    </a>
                                </li>
                            </ul>
                        

                    </div>
                    <!-- End Sidebar -->

                    <div class="clearfix"></div>

                </div>
                <!-- Sidebar -left -->

            </div>
            <!-- Left Sidebar End -->

            <!-- ============================================================== -->
            <!-- Start Page Content here -->
            <!-- ============================================================== -->
            @yield('content')
            <!-- ============================================================== -->
            <!-- End Page content -->
            <!-- ============================================================== -->

        </div>
        <!-- END wrapper -->
        {{-- @include('Admin.components.models.settingsTheme') --}}


        <!-- Vendor js -->
        <script src="{{url(mix('Admin/assets/js/vendor.min.js'))}}"></script>
        
        <!-- App js -->
        <script src="{{url(mix('Admin/assets/js/app.min.js'))}}"></script>
        <script src="{{url(mix('Admin/assets/libs/fancybox.js'))}}"></script>
        <script src="{{url(mix('Admin/assets/libs/tippy.all.min.js'))}}"></script>
        <script src="{{url(mix('Admin/assets/libs/jquery.sortable.min.js'))}}"></script>
        <script src="{{url(mix('Admin/assets/libs/jquery.toast.min.js'))}}"></script>
        <script src="{{url(mix('Admin/assets/js/pages/toastr.init.js'))}}"></script>

        @stack('createEditJs')
        @stack('indexJs')
        @stack('dashboardJs')

        <script src="{{url(mix('Admin/assets/js/custom.js'))}}"></script>

        <script>
            $(function(){
                $('body').on('change', '[data-checkbox-multiple]', function(){
                    var targetCheckbox = $(this).data('checkbox-multiple')
                    if($(this).is(':checked')){
                        $(`.${targetCheckbox}`).prop('checked', true)
                    }else{
                        $(`.${targetCheckbox}`).prop('checked', false)
                    }
                })

                $('body').on('change', '.checkFeedItem', function(){
                    var parentCheck = $(this).data('check-parent')
                    var targetCheckbox = $(parentCheck).data('checkbox-multiple')
                    if($(this).parents('.contentCheckLinkMenu').find('.checkFeedItem:checked').length){
                        $(parentCheck).prop('checked', true)
                        $(`.${targetCheckbox}`).prop('checked', true)
                    }else{
                        $(parentCheck).prop('checked', false)
                        $(`.${targetCheckbox}`).prop('checked', false)
                    }
                })
            })
        </script>

        {{-- <script>
            $('.embedLinkYoutube').on('change', function(){
                let val = $(this).val() //Pega o valor do input
                let result = val.includes("watch?v="); //Verifique se uma string inclui watch?v=

                if (result) { //Verifique se uma string inclui watch?v= , troca por embed e retorna novo valor com o embed
                    newLink = val.replace('watch?v=', 'embed/')
                    $(this).val(newLink)
                } else if(val) { //Verifica o valor do input, monta um array e retorna novo valor com o embed
                    arrayLink = val.split('/'),
                    id = arrayLink[arrayLink.length - 1]
                    $(this).val(`https://www.youtube.com/embed/${id}`)
                }
            });
        </script> --}}

        <script>
            $(function(){
                $('#title_page').on('change', function(){
                    if($(this).val()==''){
                        $('.checked-input').prop('checked', false).hide()
                    }else{
                        $('.checked-input').prop('checked', true).show()
                    }
                })
            });
        </script>

        @if(Session::has('success'))
            <script>
                $.NotificationApp.send("Sucesso!", "{{Session::get('success')}}", "bottom-right", "#00000080", "success", '8000')
            </script>
        @endif
        @if(Session::has('error'))
            <script>
                $.NotificationApp.send("Erro!", "{{Session::get('error')}}", "bottom-right", "#00000080", "error", '8000');
            </script>
        @endif
        @if(Session::has('info'))
            <script>
                $.NotificationApp.send("Atenção!", "{{Session::get('info')}}", "bottom-right", "#00000080", "info", '8000');
            </script>
        @endif
        @if(count($errors)>0)
            <ul class="list-group">
                @foreach($errors->all() as $error)
                    <script>
                        $.NotificationApp.send("Erro!", "{{$error}}", "bottom-right", "#00000080", "error", '8000');
                    </script>
                @endforeach
            </ul>
        @endif
        @if (Session::has('reopenModal'))
            <script>
                var modal = document.getElementById('{{Session::get("reopenModal")}}')
                var myModal = new bootstrap.Modal(modal, {
                    keyboard: false
                })
                myModal.show(modal)
            </script>
        @endif
        @if (Session::has('actionAfter'))
            <script>
                 Swal.fire({
                    title: "O que deseja fazer agora?",
                    text: "{{Session::get('actionAfter')[0]}}",
                    icon: "info",
                    showCancelButton: !0,
                    confirmButtonText: "Sim, inserir mais informações!",
                    cancelButtonText: "Não, ver listagem de feed!",
                    confirmButtonClass: "btn btn-success mt-2",
                    cancelButtonClass: "btn btn-danger ms-2 mt-2",
                    buttonsStyling: !1,
                }).then(function(e) {
                    if (e.value) {
                        window.location.href="{{Session::get('actionAfter')[1]}}"
                    }
                });
            </script>
        @endif

         <!-- Info Alert Modal -->
         <div id="session-expiration-modal" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog modal-sm">
                <div class="modal-content">
                    <div class="modal-body p-4">
                        <div class="text-center">
                            <i class="dripicons-information h1 text-warning"></i>
                            <h4 class="mt-2">Aviso de Sessão</h4>
                            <p class="mt-3">Por inatividade, essa sessão está prestes a expirar em 3 minutos.</p>
                            <button type="button" class="btn btn-warning my-2" data-bs-dismiss="modal">Continue</button>
                        </div>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->
        
        <script>
            function showSessionExpirationModal() {
                $('#session-expiration-modal').modal('show');
            }
            // Função para atualizar a contagem regressiva
            function updateCountdown() {
                // Obtenha o elemento de exibição da contagem regressiva
                var countdownElement = document.getElementById('session-countdown');
            
                // Obtenha o tempo limite da sessão (em minutos) do Laravel
                var sessionTimeout = {{ config('session.lifetime') }}; // Tempo limite em minutos
            
                // Obtenha o tempo da última atividade registrada na sessão (em segundos)
                var lastActivity = {{ session('last_activity', time()) }};

                // Calcule o tempo restante em segundos
                var currentTime = Math.floor(Date.now() / 1000); // Tempo atual em segundos
                var timeRemaining = (lastActivity + (sessionTimeout * 60)) - currentTime;

                if (timeRemaining <= 0) {
                    // Redirecionar para a página de login quando a sessão expirar
                    window.location.href = "{{ route('admin.dashboard.painel') }}";
                } else {
                    // Converta o tempo restante de segundos para minutos e segundos
                    var minutes = Math.floor(timeRemaining / 60);
                    var seconds = timeRemaining % 60;
            
                    // Atualize a exibição da contagem regressiva
                    countdownElement.textContent = minutes + 'm ' + seconds + 's';
                }
            }
            
            // Chame a função inicialmente para exibir a contagem regressiva
            updateCountdown();            
            // Configure um intervalo para atualizar a contagem regressiva a cada segundo
            setInterval(updateCountdown, 1000);

            function checkSessionExpiration() {
                // Obtenha o tempo limite da sessão (em minutos) do Laravel
                var sessionTimeout = {{ config('session.lifetime') }}; // Tempo limite em minutos

                // Obtenha o tempo da última atividade registrada na sessão (em segundos)
                var lastActivity = {{ session('last_activity', time()) }};

                // Calcule o tempo restante em segundos
                var currentTime = Math.floor(Date.now() / 1000); // Tempo atual em segundos
                var timeRemaining = (lastActivity + (sessionTimeout * 60)) - currentTime;

                // Exiba o modal quando faltar 30 minutos para a sessão expirar
                if (timeRemaining <= (3 * 60)) {
                    showSessionExpirationModal();
                }
            }    
            // Verifique a expiração da sessão a cada minuto
            setInterval(checkSessionExpiration, 60000);      
        </script>
            
        <script>
            $(document).ready(function() {
                checkSessionExpiration();
            })
        </script>
    </body>
</html>
