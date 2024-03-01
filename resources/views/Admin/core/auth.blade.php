<!DOCTYPE html>
<html lang="{{config('app.locale')}}"  style="background-color: #3b7bb0;">
    <head>
        <meta charset="utf-8" />
        <title>{{env('APP_NAME')}} - Painel Gerenciador</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta content="Sistema de gerenciamento do site {{env('APP_NAME')}}" name="description" />
        <meta content="Coderthemes" name="author" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <!-- App favicon -->
        <link rel="shortcut icon" href="{{asset('Admin/assets/images/whi.png')}}">

		<!-- App css -->
		<link href="{{asset('Admin/assets/css/config/bootstrap.min.css')}}" rel="stylesheet" type="text/css" id="bs-default-stylesheet" />
		<link href="{{asset('Admin/assets/css/config/app.min.css')}}" rel="stylesheet" type="text/css" id="app-default-stylesheet" />

		<link href="{{asset('Admin/assets/libs/bootstrap-datepicker.min.css')}}" rel="stylesheet" type="text/css" id="bs-dark-stylesheet" />
		<link href="{{asset('Admin/assets/css/config/app-dark.min.css')}}" rel="stylesheet" type="text/css" id="app-dark-stylesheet" />
		<link href="{{asset('Admin/assets/css/config/default/bootstrap-dark.min.css')}}" rel="stylesheet" type="text/css" id="bs-dark-stylesheet" />

		<!-- icons -->
		<link href="{{asset('Admin/assets/css/icons.min.css')}}" rel="stylesheet" type="text/css" />
        
        <!-- Custom -->
        <link href="{{url(mix('Admin/assets/css/custom.css'))}}" rel="stylesheet" type="text/css" />
    </head>

    <body class="loading auth-fluid-pages pb-0">

        <!-- ============================================================== -->
        <!-- Start Page Content here -->
        <!-- ============================================================== -->
        @yield('content')
        <!-- ============================================================== -->
        <!-- End Page content -->
        <!-- ============================================================== -->

    <!-- Vendor js -->
    <script src="{{asset('Admin/assets/js/vendor.min.js')}}"></script>

    <!-- App js -->
    <script src="{{asset('Admin/assets/js/app.min.js')}}"></script>

    </body>
</html>
