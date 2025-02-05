const formulaireLogin = document.querySelector(".login")

formulaireLogin.addEventListener("submit", async function (event) {
    // Désactivation du comportement par défaut du navigateur
    event.preventDefault();

    const identifiant = {
        "email": event.target.querySelector("[name=inputEmail]").value,
        "password": event.target.querySelector("[name=inputPassword]").value,
    };

    // Création de la charge utile au format JSON
    const chargeUtile = JSON.stringify(identifiant);

    const response = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: chargeUtile
    });

    const data = await response.json()
    const token = data.token
    // console.log(token)

    if (token != null) {
        window.location.href = "./index.html"
        console.log("connexion réussie")
        window.sessionStorage.setItem("token", data.token)
    } else {
        alert("Erreur dans l’identifiant ou le mot de passe")
    }
});


