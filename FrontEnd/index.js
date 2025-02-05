const response = await fetch("http://localhost:5678/api/works");
const data = await response.json();

function genererArticles(data) {
    document.querySelector(".gallery").innerHTML = "";

    for (let i = 0; i < data.length; i++) {
        const figureElement = document.createElement("figure")
        const imgElement = document.createElement("img")
        const figcaptionElement = document.createElement("figcaption")

        // figureElement.innerHTML = data[i]
        imgElement.src = data[i].imageUrl
        figcaptionElement.innerText = data[i].title

        figureElement.appendChild(imgElement)
        figureElement.appendChild(figcaptionElement)
        document.querySelector(".gallery").appendChild(figureElement)
    }
}

genererArticles(data);

/***** filtres *****/

const filterByAll = document.querySelector(".all")
filterByAll.addEventListener("click", function () {
    const piecesFiltrees = data.filter(function (article) {
        return article.categoryId > 0;
    });
    document.querySelector(".gallery").innerHTML = "";
    genererArticles(piecesFiltrees);
});

const filterByObjects = document.querySelector(".objects")
filterByObjects.addEventListener("click", function () {
    const piecesFiltrees = data.filter(function (article) {
        return article.categoryId === 1;
    });
    document.querySelector(".gallery").innerHTML = "";
    genererArticles(piecesFiltrees);
});

const filterByApp = document.querySelector(".appartements")
filterByApp.addEventListener("click", function () {
    const piecesFiltrees = data.filter(function (article) {
        return article.categoryId === 2;
    });
    document.querySelector(".gallery").innerHTML = "";
    genererArticles(piecesFiltrees);
});

const filterByBar = document.querySelector(".bar")
filterByBar.addEventListener("click", function () {
    const piecesFiltrees = data.filter(function (article) {
        return article.categoryId === 3;
    });
    document.querySelector(".gallery").innerHTML = "";
    genererArticles(piecesFiltrees);
    // console.log(piecesFiltrees)
});

const btnLogin = document.getElementById("btnLogin")
const btnLogout = document.getElementById("btnLogout")
const token = window.sessionStorage.getItem("token")
const btnFiltre = document.querySelector(".menu")
const edition = document.querySelector(".edition")
const btnProjetEdition = document.getElementById("mybtn")


if (token) {
    btnLogin.style.display = "none";
    btnFiltre.style.display = "none"
    edition.style.display = "block"

    btnLogout.addEventListener("click", function (event) {
        event.preventDefault();
        window.sessionStorage.removeItem("token")
        window.location.reload()

    });

} else {
    btnLogout.style.display = "none"
    btnProjetEdition.style.display = "none"
}


/****** modal *****/
const openModal = document.getElementById("mybtn")
const modal = document.getElementById("mymodal")
const closeModal = document.querySelector(".close")

openModal.onclick = function () {
    modal.style.display = "block";
}

closeModal.onclick = function () {
    modal.style.display = "none"
}

window.onclick = function (event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
};

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" || event.key === "Esc") {
        modal.style.display = "none"
    }
})

async function supprimerImage(imageId, figureElement) {
    const token = window.sessionStorage.getItem("token"); // Récupère le token d'authentification

    if (!token) {
        alert("Vous devez être connecté pour supprimer une image.");
        return;
    }

    const confirmation = confirm("Voulez-vous vraiment supprimer cette image ?");
    if (!confirmation) return;

    try {
        const response = await fetch(`http://localhost:5678/api/works/${imageId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        if (response.ok) {
            figureElement.remove(); // Supprime l'image du DOM
            alert("Image supprimée avec succès !");
        } else {
            alert("Erreur lors de la suppression de l'image.");
        }
    } catch (error) {
        console.error("Erreur :", error);
        alert("Une erreur est survenue.");
    }
}


/******* images modale ******/
function genererImgModal(data) {
    const modalContainer = document.querySelector(".modal-img");
    modalContainer.innerHTML = "";

    for (let i = 0; i < data.length; i++) {
        const figure = document.createElement("figure")
        figure.style.position = "relative";

        const img = document.createElement("img")
        img.src = data[i].imageUrl

        const deleteIcon = document.createElement("i")
        deleteIcon.classList.add("fa-solid", "fa-trash-can", "delete-icon");
        deleteIcon.dataset.id = data[i].id;

        // Ajoute un événement pour supprimer l'image
        deleteIcon.addEventListener("click", function () {
            supprimerImage(data[i].id, figure);
        });

        figure.appendChild(img)
        figure.appendChild(deleteIcon)
        modalContainer.appendChild(figure);
    }
}
genererImgModal(data)

const btnAddPhoto = document.getElementById("addPhoto")

// btnAddPhoto.addEventListener("submit", await function (event) {
//     event.preventDefault();

//     const photo = {
//         "image": event.target.querySelector("")
//         "title":
//         "category":
//     }
//     const response = await fetch("http://localhost:5678/api/users/login")
// })


