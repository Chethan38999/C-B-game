document.getElementById("registrationForm").addEventListener("submit", async function (event) {
    event.preventDefault();
  
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
  
    const data = {
      username: username,
      email: email,
      password: password
    };
  
    try {
      const response = await fetch("https://your-api-url.com/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
  
      if (response.ok) {
        alert("Registration successful! Please log in.");
        window.location.href = "../Login/Login.html";
      } else {
        const errorData = await response.json();
        alert(`${errorData.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  });
  