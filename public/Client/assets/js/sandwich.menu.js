/*
 * ++ v1.1.0 (em desenvolvimento)
 * ====== Aplicação criada por Iago Benvindo
 */
// // /* menu responsivo */
const contIcon = document.querySelector(".btn-mn-mbl .icon");

let spans = "";

for (let i = 0; i < 9; i++) {
    spans += "<span></span>";
}

contIcon.innerHTML = spans;

const closeMenu = () => {
    document.querySelector(".sidebar-bg").style.display = "none";
    document.getElementById("menu-mobile").classList.remove("aberto");
    document.body.style.overflowY = "visible";

    const swColapsinhos = document.querySelectorAll(".colapsinho.is-open");

    for (const colapsinho of swColapsinhos) {
        colapsTree(colapsinho);
    }
};

document.querySelector(".btn-mn-mbl").addEventListener("click", () => {
    document.querySelector(".sidebar-bg").style.display = "block";
    document.getElementById("menu-mobile").classList.add("aberto");
    document.body.style.overflowY = "hidden";
});

window.addEventListener("resize", closeMenu);
document.querySelector(".sidebar-bg").addEventListener("click", closeMenu);
document.getElementById("a-mb-close").addEventListener("click", closeMenu);

for (const link of document.querySelectorAll(".engloba-sidebar li a")) {
    link.addEventListener("click", closeMenu);
}
// // /* fim menu responsivo */
