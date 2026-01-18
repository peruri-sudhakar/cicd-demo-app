document.addEventListener("DOMContentLoaded", () => {

  // Existing button
  const btn = document.getElementById("btn");
  const msg = document.getElementById("msg");

  if (btn) {
    btn.addEventListener("click", () => {
      msg.textContent = "GitHub Actions CI is working ✅";
    });
  }

  // Add User Details feature
  const addUserBtn = document.getElementById("addUserBtn");
  const userFormBox = document.getElementById("userFormBox");
  const submitUser = document.getElementById("submitUser");
  const result = document.getElementById("result");

  if (!addUserBtn || !userFormBox || !submitUser || !result) {
    console.error("User form elements missing in HTML");
    return;
  }

  // Show form when button clicked
  addUserBtn.addEventListener("click", () => {
    userFormBox.style.display = "block";
    result.textContent = "";
  });

  // Submit to backend
  submitUser.addEventListener("click", async () => {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();

    if (!name || !email) {
      result.textContent = "Please enter Name and Email";
      return;
    }

    try {
      const response = await fetch("/api/save_user.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email })
      });

      // ✅ Safe read response (text first)
      const text = await response.text();
      console.log("API Response:", text);

      let data;
      try {
        data = JSON.parse(text);
      } catch (e) {
        result.textContent = "❌ API returned non-JSON output. Check Console (F12).";
        return;
      }

      if (data.status === "success") {
        result.textContent = "✅ User saved successfully!";
        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
      } else {
        result.textContent = "❌ " + data.message;
      }

    } catch (err) {
      console.error(err);
      result.textContent = "❌ API error: " + err;
    }
  });

});
