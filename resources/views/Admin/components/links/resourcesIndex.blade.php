@push('indexCss')
    <!-- Plugins css -->
    <link href="{{url(mix('Admin/assets/libs/bootstrap-table.min.css'))}}" rel="stylesheet" type="text/css" />
    <link href="{{url(mix('Admin/assets/libs/sweetalert2.min.css'))}}" rel="stylesheet" type="text/css" />
    <link href="{{url(mix('Admin/assets/libs/dropzone.min.css'))}}" rel="stylesheet" type="text/css" />
    <link href="{{url(mix('Admin/assets/libs/dropify.min.css'))}}" rel="stylesheet" type="text/css" />
@endpush

@push('indexJs')
    <!-- Plugin js-->
    <script src="{{url(mix('Admin/assets/libs/bootstrap-table.min.js'))}}"></script>
    <script src="{{url(mix('Admin/assets/libs/jquery.tabledit.min.js'))}}"></script>
    <script src="{{url(mix('Admin/assets/libs/sweetalert2.all.min.js'))}}"></script>
    <script src="{{url(mix('Admin/assets/libs/dropzone.min.js'))}}"></script>
    <script src="{{url(mix('Admin/assets/libs/dropify.min.js'))}}"></script>

    <!-- Pages init js-->
    <script src="{{url(mix('Admin/assets/js/pages/bootstrap-tables.init.js'))}}"></script>
    <script src="{{url(mix('Admin/assets/js/pages/form-fileuploads.init.js'))}}"></script>
    <script src="{{url(mix('Admin/assets/js/pages/form-imagecrop.init.js'))}}"></script>
@endpush
