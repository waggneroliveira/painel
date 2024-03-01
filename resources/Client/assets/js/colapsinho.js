/*
 * ++ v1.0.1 (em desenvolvimento)
 * ====== Aplicação criada por Iago Benvindo
 */
const colapsinho = document.querySelectorAll(".colapsinho__head");

const colapsTree = (e) => {
    /* Fecha uma arvore de colapsinhos quando */
    e.classList.remove("is-open");
    if (e.querySelector(".is-open")) {
        colapsTree(e.querySelector(".is-open"));
    }
};

for (const colaps of colapsinho) {
    colaps.addEventListener("click", () => {
        const antecessor = colaps.parentElement;
        if (antecessor.classList.contains("is-open")) {
            antecessor.classList.remove("is-open");

            /* FECHA OS colapsinhos INTERNOS QUANDO FECHA O MAIOR */
            if (antecessor.querySelector(".is-open")) {
                colapsTree(antecessor.querySelector(".is-open"));
            }
        } else {
            /* FECHA OUTROS colapsinhos NO MESMO NIVEL DO QUE QUEREMOS ABRIR */
            if (antecessor.parentElement.querySelector(".is-open")) {
                colapsTree(antecessor.parentElement.querySelector(".is-open"));
            }

            antecessor.classList.add("is-open");
        }
    });
}
