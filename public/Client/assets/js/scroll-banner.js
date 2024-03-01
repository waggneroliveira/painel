// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
const keys = { 37: 1, 38: 1, 39: 1, 40: 1 };

function preventDefault(e) {
    e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}

// modern Chrome requires { passive: false } when adding event
let supportsPassive = false;
try {
    window.addEventListener(
        "test",
        null,
        Object.defineProperty({}, "passive", {
            get: function () {
                supportsPassive = true;
            },
        })
    );
} catch (e) {}

let wheelOpt = supportsPassive ? { passive: false } : false;
let wheelEvent =
    "onwheel" in document.createElement("div") ? "wheel" : "mousewheel";

// call this to Disable
function disableScroll() {
    window.addEventListener("DOMMouseScroll", preventDefault, false); // older FF
    window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
    window.addEventListener("touchmove", preventDefault, wheelOpt); // mobile
    window.addEventListener("keydown", preventDefaultForScrollKeys, false);
}

// call this to Enable
function enableScroll() {
    window.removeEventListener("DOMMouseScroll", preventDefault, false);
    window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
    window.removeEventListener("touchmove", preventDefault, wheelOpt);
    window.removeEventListener("keydown", preventDefaultForScrollKeys, false);
}

/* posicionamento do header */
const fixedHeaderHandler = (header) => {
    header.style["position"] = "fixed";
    header.style["top"] = "0";
    header.style["left"] = "0";
    header.style["right"] = "0";
};

const relativeHeaderHandler = (header) => {
    header.style["position"] = "relative";
    header.style["top"] = "unset";
    header.style["left"] = "unset";
    header.style["right"] = "unset";
};

/* controle de velocidade do scroll */
const slowScroll = (position, speedY) => {
    window.scrollTo(0, position + speedY);
};

const scrollBannerHandler = (
    banner,
    miolo,
    heightAjust,
    topAjust,
    header = false
) => {
    if (window.innerWidth >= 720) {
        // habilita a interação apenas em telas maiores que 720px

        // if (header) {
        //     fixedHeaderHandler(header);
        // }

        miolo.style.paddingTop = `${heightAjust}px`;
        miolo.classList.add("rolagemMais");
        banner.style["top"] = `${topAjust}px`;
        // using the event helper
        window.addEventListener("scroll", () => {
            if (
                window.scrollY >= 10 &&
                miolo.classList.contains("rolagemMais")
            ) {
                disableScroll();
                miolo.style["padding-top"] = "0px";
                banner.style["top"] = "-100%";
                miolo.classList.add("animeMiolo");

                // if (header) {
                //     relativeHeaderHandler(header);
                // }
                setTimeout(() => {
                    window.scrollTo(0, 11);
                }, 100);
                setTimeout(() => {
                    miolo.classList.remove("rolagemMais");
                    miolo.classList.add("rolagemMenos");
                    enableScroll();
                }, 1500);
            } else if (
                window.scrollY <= 10 &&
                !miolo.classList.contains("rolagemMais")
            ) {
                if (
                    window.screenY == 0 &&
                    miolo.classList.contains("rolagemMenos")
                ) {
                    // if (header) {
                    //     fixedHeaderHandler(header);
                    // }
                    disableScroll();
                    miolo.classList.remove("rolagemMenos");
                    miolo.classList.remove("animeMiolo");
                    banner.style["top"] = `${topAjust}px`;
                    miolo.style["padding-top"] = `${heightAjust}px`;

                    setTimeout(() => {
                        miolo.classList.add("rolagemMais");
                        enableScroll();
                    }, 100);
                }
            }
        });
    } else {
        banner.style["position"] = "relative";
        miolo.style["padding-top"] = "0";
        miolo.classList.add("animeMiolo");
    }

    window.addEventListener("resize", () => {
        /* refaz o padding qnd o banner está visível */
        if (
            window.innerWidth >= 720 &&
            miolo.classList.contains("rolagemMais")
        ) {
            miolo.style.paddingTop = `${heightAjust}px`;
        }
    });
};
