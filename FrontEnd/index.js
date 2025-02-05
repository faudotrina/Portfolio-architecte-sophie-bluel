const response = await fetch("http://localhost:5678/api/works");
const data = await response.json();

function genererArticles(data) {
    for (let i = 0; i < data.length; i++) {
        const figureElement = document.createElement("figure")
        const imgElement = document.createElement("img")
        const figcaptionElement = document.createElement("figcaption")

        figureElement.innerhtml = data[i]
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


if (token) {
    btnLogin.style.display = "none";
    btnFiltre.style.display = "none"

    btnLogout.addEventListener("click", function (event) {
        event.preventDefault();
        window.sessionStorage.removeItem("token")
        window.location.reload()
    });

} else {
    btnLogout.style.display = "none"
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


/******* images modale ******/
function genererImgModal (data) {
    for (let i = 0; i < data.length; i++) {
        const figure = document.createElement("figure")    
        const img = document.createElement("img")
        
        img.src = data[i].imageUrl
        
        figure.appendChild(img)   
        document.querySelector(".modal-img").appendChild(figure)
    }
}
genererImgModal(data)


