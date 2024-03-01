<!-- Right Sidebar -->
<div class="right-bar">
    <div data-simplebar class="h-100">

        <!-- Nav tabs -->
        <ul class="nav nav-tabs nav-bordered nav-justified" role="tablist">
            <li class="nav-item">
                <a class="nav-link py-2 active" data-bs-toggle="tab" href="#settings-tab" role="tab">
                    <i class="mdi mdi-cog-outline d-block font-22 my-1"></i>
                </a>
            </li>
        </ul>

        <!-- Tab panes -->
        <div class="tab-content pt-0">
            <div class="tab-pane active" id="settings-tab" role="tabpanel">
                <h6 class="fw-medium px-3 m-0 py-2 font-13 text-uppercase bg-light">
                    <span class="d-block py-1">Configurações de tema</span>
                </h6>

                <div id="settingTheme" class="p-3">
                    <form action="{{route('admin.settingTheme')}}" method="post">
                        <h6 class="fw-medium font-14 mb-2 pb-1">Tema</h6>
                        <div class="form-check form-switch mb-1">
                            <input type="checkbox" class="form-check-input" name="color-scheme-mode" {{$settingTheme->color_scheme_mode=='light'?'checked':''}} value="light" id="light-mode-check" />
                            <label class="form-check-label" for="light-mode-check">Light</label>
                        </div>

                        <div class="form-check form-switch mb-1">
                            <input type="checkbox" class="form-check-input" name="color-scheme-mode" {{$settingTheme->color_scheme_mode=='dark'?'checked':''}} value="dark" id="dark-mode-check" />
                            <label class="form-check-label" for="dark-mode-check">Dark</label>
                        </div>

                        <!-- Left Sidebar-->
                        <h6 class="fw-medium font-14 mt-4 mb-2 pb-1">Cor do Menu</h6>

                        <div class="form-check form-switch mb-1">
                            <input type="checkbox" class="form-check-input" name="leftsidebar-color" {{$settingTheme->leftsidebar_color=='light'?'checked':''}} value="light" id="light-check" />
                            <label class="form-check-label" for="light-check">Light</label>
                        </div>

                        <div class="form-check form-switch mb-1">
                            <input type="checkbox" class="form-check-input" name="leftsidebar-color" {{$settingTheme->leftsidebar_color=='dark'?'checked':''}} value="dark" id="dark-check"/>
                            <label class="form-check-label" for="dark-check">Dark</label>
                        </div>

                        <!-- size -->
                        <h6 class="fw-medium font-14 mt-4 mb-2 pb-1">Tamanho do Menu</h6>

                        <div class="form-check form-switch mb-1">
                            <input type="checkbox" class="form-check-input" name="leftsidebar-size" {{$settingTheme->leftsidebar_size=='default'?'checked':''}} value="default"
                                id="default-size-check" checked />
                            <label class="form-check-label" for="default-size-check">Padrão</label>
                        </div>

                        <div class="form-check form-switch mb-1">
                            <input type="checkbox" class="form-check-input" name="leftsidebar-size" {{$settingTheme->leftsidebar_size=='condensed'?'checked':''}} value="condensed"
                                id="condensed-check" />
                            <label class="form-check-label" for="condensed-check">Pequeno</label>
                        </div>

                        <div class="form-check form-switch mb-1">
                            <input type="checkbox" class="form-check-input" name="leftsidebar-size" {{$settingTheme->leftsidebar_size=='compact'?'checked':''}} value="compact"
                                id="compact-check" />
                            <label class="form-check-label" for="compact-check">Compacto</label>
                        </div>

                        <!-- Topbar -->
                        <h6 class="fw-medium font-14 mt-4 mb-2 pb-1">Barra superior</h6>

                        <div class="form-check form-switch mb-1">
                            <input type="checkbox" class="form-check-input" name="topbar-color" {{$settingTheme->topbar_color=='dark'?'checked':''}} value="dark" id="darktopbar-check"
                                checked />
                            <label class="form-check-label" for="darktopbar-check">Dark</label>
                        </div>

                        <div class="form-check form-switch mb-1">
                            <input type="checkbox" class="form-check-input" name="topbar-color" {{$settingTheme->topbar_color=='light'?'checked':''}} value="light" id="lighttopbar-check" />
                            <label class="form-check-label" for="lighttopbar-check">Light</label>
                        </div>
                    </form>
                </div>

            </div>
        </div>

    </div> <!-- end slimscroll-menu-->
</div>
<!-- /Right-bar -->
