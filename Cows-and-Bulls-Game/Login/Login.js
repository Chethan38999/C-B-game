document.querySelector("form").addEventListener("submit", async function (event) {
    event.preventDefault();
  
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
  
    const data = {
      username: username,
      password: password
    };
  
    try {
      const response = await fetch("https://your-api-url.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
  
      if (response.ok) {
        const userData = await response.json();
        localStorage.setItem("user", JSON.stringify(userData));
  
        window.location.href = "../index.html";
      } else {
        const errorData = await response.json();
        alert(`Login failed: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  });
  