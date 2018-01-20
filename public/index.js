document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm') || document.getElementById('registerForm');
  const action = form.getAttribute('action');
  form.onsubmit = function() {
    fetch("/login", {
      method: "POST",
      body: new FormData(this)
    })
    .then(response => response.json())
    .then(response => {
      if (response.error)
        throw response.error;

      console.log(response);
      return response.token;
    })
    .then(token => {
      alert("Auth success, fetching private information...");

      return fetch("/private", {
        headers: { "Authorization": token }
      });
    })
    .then(response => response.json())
    .then(response => {
      console.log(response)
      alert("Private info:" + response.email);
    })
    .catch(function(err) {
      alert("Error: " + err.message);
    });

    return false;
  }
})
