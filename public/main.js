const submit = document.getElementById("submit");

submit.addEventListener("click", function (event) {
    const username = document.getElementById("username").value;

    event.preventDefault();

    fetch("http://localhost:9000/api/v1/followers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username }),
    })
        .then((response) => response.json())
        .then((data) => {
            const followers = document.getElementById("result-followers")
            const ol = document.createElement('ol');
            data.forEach(item => {
                const li = document.createElement('li');
                li.textContent = item;
                ol.appendChild(li);
            });
            followers.appendChild(ol);
        })
        .catch((error) => {
            console.log(error);
        });

    fetch("http://localhost:9000/api/v1/following", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username }),
    })
        .then((response) => response.json())
        .then((data) => {
            const following = document.getElementById("result-following")
            const ol = document.createElement('ol');
            data.forEach(item => {
                const li = document.createElement('li');
                li.textContent = item;
                ol.appendChild(li);
            });
            following.appendChild(ol);
        })
        .catch((error) => {
            console.log(error);
        });
});
