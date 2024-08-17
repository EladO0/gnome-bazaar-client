const express = require("express");
const path = require("path");

const app = express();
const port = 8080;

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Wildcard route to handle requests for different pages
app.get("*", (req, res) => {
  let filePath = path.join(__dirname, req.url);
  console.log(filePath);

  res.sendFile(filePath, (err) => {
    if (err) {
      res.status(404).send("Page not found");
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
