document
  .getElementById("loginForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const response = await fetch("http://127.0.0.1:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    if (response.ok) {
      const result = await response.json();
      const token = result.token;
      localStorage.setItem("token", token);
      // Redirection vers la page de profil après la connexion réussie
      location.href = "login.html";
    } else {
      // Gestion des erreurs de connexion
      console.error("Erreur de connexion:", response.statusText);
      // Afficher un message d'erreur à l'utilisateur
    }
  });
