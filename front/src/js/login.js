import axios from "axios";
const Login = () => {
    const btn = document.querySelector("#sub");

    btn.addEventListener("click", async (e) => {
        e.preventDefault();
        const mail = document.querySelector("#email");
        const pass = document.querySelector("#password");

        const user = {
            Email: mail.value,
            Password: pass.value,
        };

        const userJson = JSON.stringify(user);

        const option = {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
            body: userJson,
            withCredentials: true,
            credentials: "include", //Permet de définir de quel domaine on reçoit les cookies
            mode: "cors",
        };

        const res = await axios("http://localhost:8000/login", option);

        if (res.ok) {
            window.location.href = "/home";
        } else {
            alert("Utilisateur inconnu");
        }
    });
};
export default Login;
