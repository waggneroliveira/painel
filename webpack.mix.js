const mix = require("laravel-mix");

mix.scripts(
    "resources/Admin/assets/js/vendor.min.js",
    "public/Admin/assets/js/vendor.min.js"
)
    .scripts(
        "resources/Admin/assets/js/app.min.js",
        "public/Admin/assets/js/app.min.js"
    )
    .scripts(
        "resources/Admin/assets/js/custom.js",
        "public/Admin/assets/js/custom.js"
    )
    // plugins
    .scripts(
        "node_modules/parsleyjs/dist/parsley.min.js",
        "public/Admin/assets/libs/parsley.min.js"
    )
    .scripts(
        "node_modules/@fancyapps/ui/dist/fancybox.umd.js",
        "public/Admin/assets/libs/fancybox.js"
    )
    .scripts(
        "node_modules/selectize/dist/js/selectize.min.js",
        "public/Admin/assets/libs/selectize.min.js"
    )
    .scripts(
        "node_modules/mohithg-switchery/dist/switchery.min.js",
        "public/Admin/assets/libs/switchery.min.js"
    )
    .scripts(
        "node_modules/multiselect/js/jquery.multi-select.js",
        "public/Admin/assets/libs/jquery.multi-select.js"
    )
    .scripts(
        "node_modules/select2/dist/js/select2.min.js",
        "public/Admin/assets/libs/select2.min.js"
    )
    .scripts(
        "node_modules/jquery-mockjax/dist/jquery.mockjax.min.js",
        "public/Admin/assets/libs/jquery.mockjax.min.js"
    )
    .scripts(
        "node_modules/devbridge-autocomplete/dist/jquery.autocomplete.min.js",
        "public/Admin/assets/libs/jquery.autocomplete.min.js"
    )
    .scripts(
        "node_modules/bootstrap-touchspin/dist/jquery.bootstrap-touchspin.min.js",
        "public/Admin/assets/libs/jquery.bootstrap-touchspin.min.js"
    )
    .scripts(
        "node_modules/bootstrap-maxlength/dist/bootstrap-maxlength.min.js",
        "public/Admin/assets/libs/bootstrap-maxlength.min.js"
    )
    .scripts(
        "node_modules/bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js",
        "public/Admin/assets/libs/bootstrap-datepicker.min.js"
    )
    .scripts(
        "node_modules/clockpicker/dist/bootstrap-clockpicker.min.js",
        "public/Admin/assets/libs/bootstrap-clockpicker.min.js"
    )
    .scripts(
        "node_modules/spectrum-colorpicker2/dist/spectrum.min.js",
        "public/Admin/assets/libs/spectrum.min.js"
    )
    .scripts(
        "node_modules/flatpickr/dist/flatpickr.min.js",
        "public/Admin/assets/libs/flatpickr.min.js"
    )
    .scripts(
        "node_modules/jquery-mask-plugin/dist/jquery.mask.min.js",
        "public/Admin/assets/libs/jquery.mask.min.js"
    )
    .scripts(
        "node_modules/autonumeric/dist/autoNumeric.min.js",
        "public/Admin/assets/libs/autoNumeric.min.js"
    )
    .scripts(
        "node_modules/dropzone/dist/min/dropzone.min.js",
        "public/Admin/assets/libs/dropzone.min.js"
    )
    .scripts(
        "node_modules/dropify/dist/js/dropify.min.js",
        "public/Admin/assets/libs/dropify.min.js"
    )
    .scripts(
        "resources/Admin/assets/js/libs/ckeditor.js",
        "public/Admin/assets/libs/ckeditor.js"
    )
    .scripts(
        "node_modules/bootstrap-table/dist/bootstrap-table.min.js",
        "public/Admin/assets/libs/bootstrap-table.min.js"
    )
    .scripts(
        "node_modules/jquery-tabledit/jquery.tabledit.min.js",
        "public/Admin/assets/libs/jquery.tabledit.min.js"
    )
    .scripts(
        "node_modules/sweetalert2/dist/sweetalert2.all.min.js",
        "public/Admin/assets/libs/sweetalert2.all.min.js"
    )
    .scripts(
        "node_modules/jquery-toast-plugin/dist/jquery.toast.min.js",
        "public/Admin/assets/libs/jquery.toast.min.js"
    )
    .scripts(
        "resources/Admin/assets/js/libs/jquery.sortable.min.js",
        "public/Admin/assets/libs/jquery.sortable.min.js"
    )
    .scripts(
        "node_modules/tippy.js/dist/tippy.all.min.js",
        "public/Admin/assets/libs/tippy.all.min.js"
    )
    .scripts(
        "node_modules/cropper/dist/cropper.min.js",
        "public/Admin/assets/libs/cropper.min.js"
    )
    // Pages
    .scripts(
        "resources/Admin/assets/js/pages/form-validation.init.js",
        "public/Admin/assets/js/pages/form-validation.init.js"
    )
    .scripts(
        "resources/Admin/assets/js/pages/form-advanced.init.js",
        "public/Admin/assets/js/pages/form-advanced.init.js"
    )
    .scripts(
        "resources/Admin/assets/js/pages/form-pickers.init.js",
        "public/Admin/assets/js/pages/form-pickers.init.js"
    )
    .scripts(
        "resources/Admin/assets/js/pages/form-masks.init.js",
        "public/Admin/assets/js/pages/form-masks.init.js"
    )
    .scripts(
        "resources/Admin/assets/js/pages/form-fileuploads.init.js",
        "public/Admin/assets/js/pages/form-fileuploads.init.js"
    )
    .scripts(
        "resources/Admin/assets/js/pages/ckeditor.init.js",
        "public/Admin/assets/js/pages/ckeditor.init.js"
    )
    .scripts(
        "resources/Admin/assets/js/pages/bootstrap-tables.init.js",
        "public/Admin/assets/js/pages/bootstrap-tables.init.js"
    )
    .scripts(
        "resources/Admin/assets/js/pages/tabledit.init.js",
        "public/Admin/assets/js/pages/tabledit.init.js"
    )
    .scripts(
        "resources/Admin/assets/js/pages/toastr.init.js",
        "public/Admin/assets/js/pages/toastr.init.js"
    )
    .scripts(
        "resources/Admin/assets/js/pages/materialdesign.init.js",
        "public/Admin/assets/js/pages/materialdesign.init.js"
    )
    .scripts(
        "resources/Admin/assets/js/pages/form-imagecrop.init.js",
        "public/Admin/assets/js/pages/form-imagecrop.init.js"
    )

    //CSS
    .styles(
        "resources/Admin/assets/css/config/bootstrap.min.css",
        "public/Admin/assets/css/config/bootstrap.min.css"
    )
    .styles(
        "resources/Admin/assets/css/config/app.min.css",
        "public/Admin/assets/css/config/app.min.css"
    )
    .styles(
        "resources/Admin/assets/css/config/bootstrap-dark.min.css",
        "public/Admin/assets/css/config/bootstrap-dark.min.css"
    )
    .styles(
        "resources/Admin/assets/css/config/app-dark.min.css",
        "public/Admin/assets/css/config/app-dark.min.css"
    )
    .styles(
        "resources/Admin/assets/css/icons.min.css",
        "public/Admin/assets/css/icons.min.css"
    )
    .styles(
        "resources/Admin/assets/css/custom.css",
        "public/Admin/assets/css/custom.css"
    )
    //Plugins
    .styles(
        "node_modules/mohithg-switchery/dist/switchery.min.css",
        "public/Admin/assets/libs/switchery.min.css"
    )
    .styles(
        "node_modules/@fancyapps/ui/dist/fancybox.css",
        "public/Admin/assets/libs/fancybox.css"
    )
    .styles(
        "node_modules/multiselect/css/multi-select.css",
        "public/Admin/assets/libs/multi-select.css"
    )
    .styles(
        "node_modules/select2/dist/css/select2.min.css",
        "public/Admin/assets/libs/select2.min.css"
    )
    .styles(
        "node_modules/selectize/dist/css/selectize.bootstrap3.css",
        "public/Admin/assets/libs/selectize.bootstrap3.css"
    )
    .styles(
        "node_modules/bootstrap-touchspin/dist/jquery.bootstrap-touchspin.min.css",
        "public/Admin/assets/libs/jquery.bootstrap-touchspin.min.css"
    )
    .styles(
        "node_modules/spectrum-colorpicker2/dist/spectrum.min.css",
        "public/Admin/assets/libs/spectrum.min.css"
    )
    .styles(
        "node_modules/flatpickr/dist/flatpickr.min.css",
        "public/Admin/assets/libs/flatpickr.min.css"
    )
    .styles(
        "node_modules/clockpicker/dist/bootstrap-clockpicker.min.css",
        "public/Admin/assets/libs/bootstrap-clockpicker.min.css"
    )
    .styles(
        "node_modules/bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css",
        "public/Admin/assets/libs/bootstrap-datepicker.min.css"
    )
    .styles(
        "node_modules/dropzone/dist/min/dropzone.min.css",
        "public/Admin/assets/libs/dropzone.min.css"
    )
    .styles(
        "node_modules/quill/dist/quill.core.css",
        "public/Admin/assets/libs/quill.core.css"
    )
    .styles(
        "node_modules/quill/dist/quill.snow.css",
        "public/Admin/assets/libs/quill.snow.css"
    )
    .styles(
        "node_modules/dropify/dist/css/dropify.min.css",
        "public/Admin/assets/libs/dropify.min.css"
    )
    .styles(
        "node_modules/bootstrap-table/dist/bootstrap-table.min.css",
        "public/Admin/assets/libs/bootstrap-table.min.css"
    )
    .styles(
        "node_modules/sweetalert2/dist/sweetalert2.min.css",
        "public/Admin/assets/libs/sweetalert2.min.css"
    )
    .styles(
        "node_modules/jquery-toast-plugin/dist/jquery.toast.min.css",
        "public/Admin/assets/libs/jquery.toast.min.css"
    )
    .styles(
        "node_modules/cropper/dist/cropper.min.css",
        "public/Admin/assets/libs/cropper.min.css"
    )

    //Portais

    // .styles(
    //     "resources/Client/assets/css/reset.css",
    //     "public/Client/assets/css/reset.css"
    // )
    // .styles(
    //     "resources/Client/assets/css/default.css",
    //     "public/Client/assets/css/default.css"
    // )
    // .styles(
    //     "resources/Client/assets/css/splide.min.css",
    //     "public/Client/assets/css/splide.min.css"
    // )
    // .styles(
    //     "resources/Client/assets/css/colapsinho.css",
    //     "public/Client/assets/css/colapsinho.css"
    // )
    // .styles(
    //     "resources/Client/assets/css/sandwich.menu.css",
    //     "public/Client/assets/css/sandwich.menu.css"
    // )
    // .styles(
    //     "resources/Client/assets/css/main.css",
    //     "public/Client/assets/css/main.css"
    // )
    // .styles(
    //     "resources/Client/assets/css/responsive.css",
    //     "public/Client/assets/css/responsive.css"
    // )
    .styles(
        "resources/Client/assets/sass/app.css",
        "public/Client/assets/css/app.css"
    )
    .scripts(
        "resources/Client/assets/js/splide.min.js",
        "public/Client/assets/js/splide.min.js"
    )
    .scripts(
        "resources/Client/assets/js/splide.min.js.map",
        "public/Client/assets/js/splide.min.js.map"
    )
    .scripts(
        "resources/Client/assets/js/splide-extension-grid.min.js",
        "public/Client/assets/js/splide-extension-grid.min.js"
    )
    .scripts(
        "resources/Client/assets/js/fslightbox.js",
        "public/Client/assets/js/fslightbox.js"
    )
    .scripts(
        "resources/Client/assets/js/inputmask.min.js",
        "public/Client/assets/js/inputmask.min.js"
    )
    .scripts(
        "resources/Client/assets/js/colapsinho.js",
        "public/Client/assets/js/colapsinho.js"
    )
    .scripts(
        "resources/Client/assets/js/sandwich.menu.js",
        "public/Client/assets/js/sandwich.menu.js"
    )
    .scripts(
        "resources/Client/assets/js/scroll-banner.js",
        "public/Client/assets/js/scroll-banner.js"
    )
    .scripts(
        "resources/Client/assets/js/main.js",
        "public/Client/assets/js/main.js"
    )

    //BROWSERSYNC
    // .browserSync("http://127.0.0.1:8000")

    //CONFIG
    .autoload({
        jquery: ["$", "window.jQuery", "jQuery"],
    })

    .copyDirectory(
        "resources/Client/assets/images",
        "public/Client/assets/images"
    )
    // .copyDirectory(
    //     "resources/Client/assets/archives",
    //     "public/Client/assets/archives"
    // )
    .copyDirectory(
        "resources/Client/assets/fontello",
        "public/Client/assets/fontello"
    )
    .copyDirectory("resources/Admin/assets/fonts", "public/Admin/assets/fonts")
    .copyDirectory(
        "resources/Admin/assets/images",
        "public/Admin/assets/images"
    )
    .copyDirectory(
        "node_modules/@ckeditor/ckeditor5-build-classic/build/translations",
        "public/Admin/assets/libs/translations"
    )
    .copyDirectory(
        "node_modules/parsleyjs/dist/i18n",
        "public/Admin/assets/libs/i18n"
    )
    .version();
