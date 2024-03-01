/* rolagem do btn de menu */
if (document.querySelector(".btn-mn-mbl")) {
    const btnMenu = document.querySelector(".btn-mn-mbl");

    window.addEventListener("scroll", () => {
        if (window.innerWidth < 920) {
            if (window.scrollY > 95) {
                if (btnMenu.style.position !== "fixed") {
                    btnMenu.style.position = "fixed";
                    btnMenu.style.right = "12px";
                    btnMenu.style.top = "30px";
                    btnMenu.style.zIndex = "1000";
                }
            } else {
                if (btnMenu.style.position !== "relative") {
                    btnMenu.style.position = "relative";
                    btnMenu.style.right = "unset";
                    btnMenu.style.top = "unset";
                    btnMenu.style.zIndex = "1000";
                }
            }
        } if(window.innerWidth < 720) {
            btnMenu.style.position = "fixed";
            btnMenu.style.right = "12px";
            btnMenu.style.top = "30px";
            btnMenu.style.zIndex = "1000";
        }
    });
}

/* rolagem do btn de menu */

/* links dos portais logo abaixo do banner da index */
if (document.querySelector(".links-portal-home .carousel")) {
    new Splide(".links-portal-home .carousel", {
        perPage: 1,
        perMove: 1,
        autoHeight: true,
        autoWidth: true,
        // type: "loop",
        pagination: false,
        arrows: true,
        grid: false,
        breakpoints: {
            720: {
                grid: {
                    cols: 2,
                    rows: 3,
                },
            },
            680: {
                grid: {
                    cols: 2,
                    rows: 2,
                },
                pagination: true,
                arrows:false,
            },
        },
    }).mount(window.splide.Extensions);
}
/* links dos portais logo abaixo do banner da index */

/* BANNER HOME */
function changeBanner(c) {
    for (let i = 0; i < c.length; i++) {
        if (window.innerWidth < 720) {
            if (c[i].dataset.mobileBanner != "") {
                /*verifica se há um banner mobile, caso sim, troca a img, caso não ele mantem o banner grande*/
                c[i].style.backgroundImage =
                    "url(" + c[i].dataset.bannerMobile + ")";
            }
        } else {
            if (c[i].dataset.desktopBanner != "") {
                /*volta para o banner grande caso o banner mude a resolução da tela*/
                c[i].style.backgroundImage =
                    "url(" + c[i].dataset.bannerDesktop + ")";
            }
        }
    }
}

if (document.querySelector("#banner")) {
    //carousel  com splide para o banner
    new Splide("#banner", {
        perPage: 1,
        perMove: 1,
        autoHeight: true,
        autoWidth: true,
        pagination: true,
        autoplay: true,
        interval: 10000,
        arrows: false,
    }).mount();

    /* banner responsivo */
    const carousels = document.querySelectorAll("#banner .splide__slide");
    changeBanner(carousels);

    window.addEventListener("resize", changeBanner.bind(null, carousels));
    /* banner responsivo */
}
/* BANNER HOME */

/* portal-flag */
if (document.querySelector(".portal-flag")) {
    const portalFlag = document.querySelector(".portal-flag");
    window.addEventListener("scroll", () => {
        if (window.outerWidth < 920) {
            if (window.scrollY > 95) {
                if (portalFlag.style.position !== "fixed") {
                    portalFlag.style.position = "fixed";
                }
            } else {
                if (portalFlag.style.position !== "relative") {
                    portalFlag.style.position = "relative";
                }
            }
        }
    });
}
/* portal-flag */

/* btn de rolagem */
if (document.querySelector(".btn-scroll")) {
    document.querySelector(".btn-scroll").addEventListener("click", (e) => {
        e.preventDefault();
        document.querySelector("#miolo").scrollIntoView({ behavior: "smooth" });
    });
}
/* btn de rolagem */

/* CONTROLADOR DOS LINKS DE PORTAL DA INDEX */
if (document.querySelectorAll(".box-link-portal")) {
    /* pega todos os boxes do carousel portal */
    const boxLinkPortal = document.querySelectorAll(".box-link-portal");

    /* altera o estado dos elementos a serem mostrados durante o hover de forma geral */
    const showHover = (box, nav) => {
        if (
            window.outerWidth < 720 &&
            document.querySelector(".box-link-portal.active")
        ) {
            document
                .querySelector(".box-link-portal.active")
                .classList.remove("active");
        }
        box.classList.add("active");
        if (window.innerWidth > 720) {
            nav.style.opacity = 1;
            nav.parentElement.style.zIndex = 10;
            nav.style.zIndex = 2;
            nav.style.right = 0;
        }
    };

    const hideHover = (box, nav) => {
        box.classList.remove("active");
        nav.parentElement.style.zIndex = -3;
        nav.style.zIndex = -3;
        nav.style.opacity = 0;
        nav.style.right = "100%";
    };
    /* fim - altera o estado dos elementos a serem mostrados durante o hover de forma geral */

    /* adicionas os eventos de a cada box encontrado anteriormente e sua respectiva barra de navegação */
    for (const box of boxLinkPortal) {
        const navPortal = document.querySelector(
            `.hover-content-nav#${box.dataset.idNav}`
        );

        box.addEventListener(
            "mouseenter",
            showHover.bind(null, box, navPortal)
        );
        box.addEventListener(
            "mouseleave",
            hideHover.bind(null, box, navPortal)
        );
        navPortal.addEventListener(
            "mouseenter",
            showHover.bind(null, box, navPortal)
        );
        navPortal.addEventListener(
            "mouseleave",
            hideHover.bind(null, box, navPortal)
        );
    }
}
/* CONTROLADOR DOS LINKS DE PORTAL DA INDEX */

/* slider tall */
if (document.querySelector(".slider-tall-banner")) {
    new Splide(".slider-tall-banner", {
        perPage: 1,
        perMove: 1,
        autoHeight: true,
        autoWidth: true,
        pagination: false,
        arrows: true,
        gap: 1,
        breakpoints: {
            720: {
                focus: "center",
                pagination: true,
                arrows: false,
            },
        },
    }).mount();
}
/* slider tall */

/* sliders news-module */
if (document.querySelector(".slider-head-lines")) {
    new Splide(".slider-head-lines", {
        perPage: 2,
        perMove: 2,
        gap: 2,
        height: 532,
        pagination: false,
        arrows: true,
        direction: "ttb",
        breakpoints: {
            800: {
                height: 422,
            },
            620: {
                height: 280,
                perPage: 1,
                perMove: 1,
            },
        },
    }).mount();
}

if (document.querySelector(".news-videos-nav")) {
    const ttlDisplay = document.querySelector("#news-module-video-title");
    const descDisplay = document.querySelector(
        "#news-module-video-description"
    );

    const newsVideosNav = new Splide(".news-videos-nav", {
        direction: "ttb",
        perPage: 1,
        perMove: 1,
        height: "80%",
        autoHeight: true,
        gap: 10,
        isNavigation: true,
        pagination: false,
        arrows: false,
        focus: "center",
        type: "loop",
        breakpoints: {
            1180: {
                direction: "ltr",
                perPage: 1,
                perMove: 1,
                height: 48,
                gap: 0,
                autoHeight: true,
                autoWidth: true,
            },
        },
    });

    /* slider.on('active', () => {}) executa quando um slide ganha .is-active
    https://splidejs.com/v3/guides/events/#active
    */
    newsVideosNav.on("active", (a) => {
        ttlDisplay.classList.add("fade");
        descDisplay.classList.add("fade");
        setTimeout(() => {
            ttlDisplay.innerHTML = a.slide.dataset.videoTitle;
            ttlDisplay.classList.remove("fade");
            descDisplay.innerHTML = a.slide.dataset.videoDescription;
            descDisplay.classList.remove("fade");
        }, 600);
    });

    const newsVideos = new Splide(".news-videos", {
        direction: "ttb",
        perPage: 1,
        perMove: 1,
        height: 440,
        pagination: false,
        arrows: false,
        breakpoints: {
            1180: {
                direction: "ltr",
            },
            720: {
                height: 355,
            },
        },
    });

    newsVideos.sync(newsVideosNav);
    newsVideos.mount();
    newsVideosNav.mount();
}
/* sliders news-module */

/* .sec-search-slider */
if (document.querySelector(".slider-search-sec")) {
    new Splide(".slider-search-sec", {
        arrows: false,
        perPage: 1,
        perMove: 1,
        autoWidth: true,
        grid: {
            rows: 2,
            cols: 2,
        },
        breakpoints: {
            720: {
                grid: {
                    rows: 2,
                    cols: 1,
                },
            },
        },
    }).mount(window.splide.Extensions);
}
/* .sec-search-slider */

/* .sec-testimony */
if (document.querySelector(".slider-testimony")) {
    new Splide(".slider-testimony", {
        arrows: true,
        pagination: false,
        perPage: 1,
        perMove: 1,
    }).mount();
}
/* .sec-testimony */

/* .slider-status-subportal */
if (document.querySelector(".slider-status-subportal")) {
    new Splide(".slider-status-subportal", {
        autoHeight: true,
        autoWidth: true,
        perPage: 1,
        perMove: 1,
        pagination: false,
        arrows: false,
        gap: 6,
    }).mount();
}
/* .slider-status-subportal */

/* .slider-feed-index */
if (document.querySelector(".slider-feed-index")) {
    const slidersFeed = document.querySelectorAll(".slider-feed-index");

    for (const sliderFeed of slidersFeed) {
        new Splide(sliderFeed, {
            perPage: 3,
            perMove: 3,
            arrows: false,
            pagination: true,
            gap: 10,
            breakpoints: {
                900: {
                    perPage: 2,
                    perMove: 2,
                },
                600: {
                    perPage: 1,
                    perMove: 1,
                },
            },
        }).mount();
    }
}
/* .slider-feed-index */

/* .gallery-content */
if (document.querySelector(".gallery-content")) {
    const galleries = document.querySelectorAll(".gallery-content");
    for (const gallery of galleries) {
        new Splide(gallery, {
            perPage: 1,
            perMove: 1,
            pagination: false,
            arrows: false,
            autoHeight: true,
            autoWidth: true,
            autoplay: true,
            interval: 4000,
            cover: true,
            // type: "loop",
            breakpoints: {
                720: {
                    focus: "center",
                },
            },
        }).mount();
    }
}
/* .gallery-content */

/* .sec-content bg-detail */
/* Manipulando a propriedade top dos items que decora o fundo das seções */
if (document.querySelector(".sec-content:not(.index)")) {
    /*pegando as sections content existentes na tela */
    const sectionsContent = document.querySelectorAll(".sec-content");
    for (const secContent of sectionsContent) {
        /* add a span usada para gerar o efeito de fundo */
        secContent.insertAdjacentHTML(
            "afterbegin",
            "<span class='bg-detail'></span>"
        );
        /* pega a .box-header apara ajustar a altura do detalhe de fundo */
        const boxHeader = secContent.querySelector(".box-header");
        /* pega o detalhe de fundo */
        const bgDetail = secContent.querySelector(".bg-detail");
        /* alterando o atributo de top do .bg-detail para alinhar com o final da .box-header */
        bgDetail.style.top =
            boxHeader.getBoundingClientRect().height + 60 + "px";

        window.addEventListener("resize", () => {
            bgDetail.style.top =
                boxHeader.getBoundingClientRect().height + 60 + "px";
        });
    }
}
/* .sec-content bg-detail */

/* .slider-tabs */
if (document.querySelector(".slider-tabs")) {
    new Splide(".slider-tabs", {
        autoWidth: true,
        autoHeight: true,
        perPage: 1,
        perMove: 1,
        pagination: false,
        arrows: false,
        drag: "free",
    }).mount();
}
/* .slider-tabs */

/* .nav-tabs */
if (document.querySelector(".nav-tabs")) {
    const navLinks = document.querySelectorAll(".nav-link");
    const navTab = document.querySelector(".nav-tabs");
    const tabPanes = document.querySelector(".tab-content");

    if (!document.querySelector(".nav-tabs.active")) {
        const loadActive = document.querySelector(".nav-link");

        tabPanes
            .querySelector(loadActive.dataset.target)
            .classList.add("active");

        loadActive.classList.add("active");
        loadActive.ariaSelected = "true";

        tabPanes.querySelector(loadActive.dataset.target).classList.add("show");
    }

    for (const navLink of navLinks) {
        navLink.addEventListener("click", () => {
            if (!navLink.classList.contains("active")) {
                lactive = navTab.querySelector(".nav-link.active");
                lactive.classList.remove("active");
                lactive.ariaSelected = "false";

                // console.log(lactive.dataset.target);

                tabPanes
                    .querySelector(lactive.dataset.target)
                    .classList.remove("active", "show");

                tabPanes
                    .querySelector(navLink.dataset.target)
                    .classList.add("active");

                setTimeout(() => {
                    navLink.classList.add("active");
                    navLink.ariaSelected = "true";
                }, 300);

                setTimeout(() => {
                    tabPanes
                        .querySelector(navLink.dataset.target)
                        .classList.add("show");
                }, 500);
            }
        });
    }
}
/* .nav-tabs */

/* controle dos modais de exames/especialidades */
if (document.querySelector("[data-modal]")) {
    /* cria o backdrop e coloa no body */
    const backdropModal = document.createElement("div");
    backdropModal.classList.add("backdrop-modal");
    document.body.append(backdropModal);

    /* pega todos os itens como data-modal e add os efeitos de click */
    const linksModal = document.querySelectorAll("[data-modal]");

    for (const linkModal of linksModal) {
        linkModal.addEventListener("click", (event) => {
            event.preventDefault();
            backdropModal.classList.add("active");
            document.body.style.overflowY = "hidden";

            document
                .querySelector(linkModal.dataset.modal)
                .classList.add("active");
        });
    }

    /* fecha o modal e backdrop */
    const closeModal = () => {
        backdropModal.classList.remove("active");
        document.body.style.overflowY = "visible";
        document
            .querySelector(".modal-speciality.active")
            .classList.remove("active");
    };

    backdropModal.addEventListener("click", closeModal);

    for (const btnCloseModal of document.querySelectorAll(".close-modal")) {
        btnCloseModal.addEventListener("click", closeModal);
    }
}
/* controle dos modais de exames/especialidades */

/* .slider-topics */
if (document.querySelector(".slider-topics")) {
    new Splide(".slider-topics", {
        autoHeight: true,
        pagination: true,
        arrows: false,
        perPage: 3,
        perMove: 3,
        gap: 30,
        breakpoints: {
            720: {
                perPage: 2,
                perMove: 2,
            },
            560: {
                perPage: 1,
                perMove: 1,
                focus: "center",
                autoWidth: true,
                trimSpace: false,
            },
        },
    }).mount();
}
/* .slider-topics */

/* .protective-partner__slider */
if (document.querySelector(".protective-partner__slider")) {
    new Splide(".protective-partner__slider", {
        perPage: 4,
        perMove: 4,
        arrows: false,
        pagination: true,
        gap: 20,
        breakpoints: {
            500: {
                perPage: 2,
                perMove: 2,
            },
        },
    }).mount();
}
/* .protective-partner__slider */

/* Mascaras usando inputmask.js */
/* ref: https://github.com/RobinHerbots/Inputmask */
if (document.querySelector(".cpf")) {
    document
        .querySelectorAll(".cpf")
        .forEach((item) => Inputmask({ mask: "999 999 999-99" }).mask(item));
}

if (document.querySelector(".cnpj")) {
    document
        .querySelectorAll(".cnpj")
        .forEach((item) =>
            Inputmask({ mask: "99 999 999/9999-99" }).mask(item)
        );
}

if (document.querySelector(".cep")) {
    document
        .querySelectorAll(".cep")
        .forEach((item) => Inputmask({ mask: "99 999-999" }).mask(item));
}

if (document.querySelector(".agency")) {
    document
        .querySelectorAll(".agency")
        .forEach((item) => Inputmask({ mask: "99999" }).mask(item));
}
if (document.querySelector(".digit")) {
    document
        .querySelectorAll(".digit")
        .forEach((item) => Inputmask({ mask: "9" }).mask(item));
}
if (document.querySelector(".current_account")) {
    document
        .querySelectorAll(".current_account")
        .forEach((item) => Inputmask({ mask: "999999999999" }).mask(item));
}
if (document.querySelector(".best_payment")) {
    document
        .querySelectorAll(".best_payment")
        .forEach((item) => Inputmask({ mask: "99" }).mask(item));
}

if (document.querySelector(".tel")) {
    document
        .querySelectorAll(".tel")
        .forEach((item) => Inputmask({ mask: "(99) 9999 99999" }).mask(item));
}

if (document.querySelector(".cel")) {
    document
        .querySelectorAll(".cel")
        .forEach((item) => Inputmask({ mask: "(99) 9 9999-999" }).mask(item));
}

if (document.querySelector(".ano")) {
    document
        .querySelectorAll(".ano")
        .forEach((item) => Inputmask({ mask: "9999" }).mask(item));
}
/* Mascaras usando inputmask.js */

/* A função abaixo permite que um determinado input seja habilitado dependendo do valor de outros, essa função foi criada para atender uma interação entre inputs radio e um input text na página form-good-partner-ajuda.blade.php;
    Ela leva três argumentos que são strings:
        controlInputs é query para selecionar todos os inputs envolvidos no controle da interação;
        inputToEnable é query para selecionar o item (alvo) que deve ser habilitado/desabilitado;
        controlValue é o valor de controle, caso seja igual o alvo é habilitado, caso false ele é desabilidtado;*/
const enableInputByControlValue = (
    controlInputs,
    inputToEnable,
    controlValue
) => {
    const inputDisabled = document.querySelector(inputToEnable);

    document.querySelectorAll(controlInputs).forEach((e) => {
        e.addEventListener("change", () => {
            if (e.value === controlValue) {
                inputDisabled.disabled = false;
            } else {
                inputDisabled.disabled = true;
            }
        });
    });
};

/* controle de habilitação da quantidade de lojas pra página 'cadastro - parceiro do bem' */
if (document.querySelector("input[name='maisUmaLoja']")) {
    enableInputByControlValue(
        "input[name='maisUmaLoja']",
        "input[name='qntLojas']",
        "Sim"
    );
}
/* controle de habilitação da quantidade de lojas pra página 'cadastro - parceiro do bem' */

/* controle de habilitação de outros valores de contribuição pra página 'form-protective-partner-ajuda.blade.php' */
if (document.querySelector("input[name='donationValue']")) {
    enableInputByControlValue(
        "input[name='donationValue']",
        "input[name='otherValue']",
        "Outro"
    );
}
/* controle de abilitação de outros valores de contribuição pra página 'form-protective-partner-ajuda.blade.php' */

if (document.getElementById("newslleter-message")) {
    // console.log('success')
    setTimeout(function () {
        document.querySelector("#newslleter-message").classList.toggle("off");
    }, 3000);
}

/* TIMELINE */
if (document.querySelector(".timeline")) {
    const timelineNav = new Splide(".timeline__nav", {
        perPage: 1,
        perMove: 1,
        autoWidth: true,
        autoHeight: true,
        gap: 12,
        isNavigation: true,
        pagination: false,
        arrows: false,
        focus: "center",
    });

    const timelineMain = new Splide(".timeline__main-slider", {
        perPage: 1,
        perMove: 1,
        autoWidth: true,
        autoHeight: true,
        pagination: false,
        arrows: false,
    });

    timelineMain.sync(timelineNav);
    timelineMain.mount();
    timelineNav.mount();
}
/* TIMELINE */

// if (document.querySelector(".banner-home.scroll-banner")) {
//     const banner = document.querySelector(".scroll-banner");
//     const miolo = document.querySelector("#miolo");
//     const ajust = banner.getBoundingClientRect().height - 110;

//     scrollBannerHandler(banner, miolo, ajust, 0);
// }

// if (document.querySelector(".banner-subportal.scroll-banner")) {
//     const banner = document.querySelector(".scroll-banner");
//     const miolo = document.querySelector("#miolo");
//     const ajust = banner.getBoundingClientRect().height;

//     scrollBannerHandler(banner, miolo, ajust, 155);
// }

/* .sec-search-slider */
if (document.querySelector(".slider-multi-lines-topics-status")) {
    new Splide(".slider-multi-lines-topics-status", {
        arrows: false,
        perPage: 1,
        perMove: 1,
        autoWidth: true,
        pagination: true,
        grid: {
            rows: 2,
            cols: 2,
        },
        breakpoints: {
            720: {
                grid: {
                    rows: 2,
                    cols: 1,
                },
            },
        },
    }).mount(window.splide.Extensions);
}
/* .sec-search-slider */

