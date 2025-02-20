const response = await fetch("http://localhost:5678/api/works");
const data = await response.json();
// console.log(data)

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

/***** affichage boutton login logout *****/
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


/****** modal suppression Image *****/
const modal = document.getElementById("mymodal")
const openModal = document.getElementById("mybtn")
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

/****** modal ajouter Image *****/
const addPhotoModal = document.getElementById("addPhotoModal");
const openAddPhotoBtn = document.getElementById("openAddPhoto");
const closeAddPhotoModal = document.getElementById("closeAddPhotoModal");
const deletePhotoModal = document.getElementById("mymodal"); // La première modale
const backToDeleteModal = document.getElementById("backToDeleteModal")

// Ouvrir la modale d'ajout et fermer la modale de suppression
openAddPhotoBtn.onclick = function () {
    addPhotoModal.style.display = "flex";
    deletePhotoModal.style.display = "none"; // Ferme la première modale
};

// Fermer la modale d'ajout de photo
closeAddPhotoModal.onclick = function () {
    addPhotoModal.style.display = "none";
};

backToDeleteModal.onclick = function () {
    deletePhotoModal.style.display = "flex";
    addPhotoModal.style.display = "none";
}

// Fermer les modales au clic en dehors
window.onclick = function (event) {
    if (event.target === addPhotoModal) {
        addPhotoModal.style.display = "none";
    }
    if (event.target === deletePhotoModal) {
        deletePhotoModal.style.display = "none";
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
genererImgModal(data);

/****** Afficher les catégories prensents dans la bdd *****/
async function genererCategories() {
    const response = await fetch("http://localhost:5678/api/categories");
    const data = await response.json();

    const btnDropdown = document.querySelector(".btnDropdown");

    btnDropdown.innerHTML = "";

    for (let i = 0; i < data.length; i++) {
        const category = data[i];
        const categoryItem = document.createElement("option");
        categoryItem.innerText = category.name;
        categoryItem.value = category.id;
        btnDropdown.appendChild(categoryItem);
    }
    btnDropdown.addEventListener("change", function () {
        const selectedCategoryId = btnDropdown.value;
        console.log("Catégorie sélectionnée : ", selectedCategoryId);
    });
}
genererCategories()

/****** Ajouter photo *****/
const fileLabel = document.getElementById("file-Label")
const fileUpload = document.getElementById("file-upload")
const imagePreviewContainer = document.getElementById("imagePreviewContainer")
const imagePreview = document.getElementById("imagePreview")
const iconeMontagne = document.getElementById("iconeMontagne")
const infoSize = document.getElementById("infoSize")
const btnValide = document.getElementById("btnValide")

fileUpload.addEventListener("change", function () {
    let files = fileUpload.files //liste les fichiers

    if (files.length > 0) {
        let file = files[0]
        let imageUrl = URL.createObjectURL(file)

        imagePreview.src = imageUrl;
        imagePreviewContainer.style.display = "flex"

        fileLabel.style.display = "none"
        fileUpload.style.display = "none"
        iconeMontagne.style.display = "none"
        infoSize.style.display = "none";
        btnValide.style.backgroundColor = "#1D6154"
    }
})

/****** Fonctions reset de chaque champs *****/
function resetImageUpload() {
    URL.revokeObjectURL(imagePreview.src);

    // Réinitialiser la prévisualisation
    imagePreview.src = "";
    imagePreviewContainer.style.display = "none";

    // Réafficher les éléments cachés
    fileLabel.style.display = "flex";
    iconeMontagne.style.display = "block";
    infoSize.style.display = "block";

    btnValide.style.backgroundColor = "";
}

backToDeleteModal.addEventListener("click", resetImageUpload);
closeAddPhotoModal.addEventListener("click", resetImageUpload);

function resetTitle() {
    const photoTitle = document.getElementById("photoTitleRequired")
    photoTitle.value = ""
}

backToDeleteModal.addEventListener("click", resetTitle);
closeAddPhotoModal.addEventListener("click", resetTitle);


/****** Boutton valider *****/

const photoUploadForm = document.getElementById("photoUploadForm");

photoUploadForm.onsubmit = async function (event) {
    event.preventDefault();

    const token = window.sessionStorage.getItem("token");
    if (!token) {
        alert("Vous devez être connecté pour ajouter une image.");
        return;
    }

    const fileInput = document.getElementById("file-upload");
    const file = fileInput.files[0];
    
    if (!file) {
        alert("Veuillez sélectionner un fichier.");      
        photoUploadForm.reset();
        return;
    }

    const allowedTypes = ["image/jpeg", "image/png"];
    if (!allowedTypes.includes(file.type)) {
        alert("Seuls les fichiers JPG et PNG sont autorisés.");
        photoUploadForm.reset();
        return;
    }

    const maxSize = 4 * 1024 * 1024; // 4 Mo en octets
    if (file.size > maxSize) {
        alert("Le fichier doit être inférieur à 4 Mo.");
        photoUploadForm.reset();
        return;
    }

    const confirmation = confirm("Voulez-vous vraiment ajouter cette image ?");
    if (!confirmation) return;

    const formData = new FormData(photoUploadForm);

    formData.append("title", document.getElementById("photoTitleRequired").value);
    formData.append("categoryId", Number(document.querySelector("[name=category]").value));
    formData.append("image", document.getElementById("file-upload").files[0]);


    try {
        let response = await fetch("http://localhost:5678/api/works", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
            body: formData
        });

        if (!response.ok) {
            let errorResponse = await response.json();
            console.error("Erreur serveur :", errorResponse);
            alert(`Erreur serveur : ${errorResponse.message || "Problème inconnu"}`);
            return;
        }

        alert("Image ajoutée avec succès !");
    } catch (error) {
        console.error("Erreur :", error);
        alert("Une erreur est survenue.");
    }
};
