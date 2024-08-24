const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const port = process.argv[2] || 5000;
const BASENAME = "/Gnome-Bazaar";

app.use(cors({ origin: "http://localhost:3000" }));

app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleString()}]`);
  console.log(`${req.method} ${req.url}\n`);
  next();
});

app.get(`${BASENAME}/api/token`, (req, res) => {
  res.json({
    name: "Elad D Gozman",
    expiry: new Date(),
    token: " d",
    isAdmin: true,
    isSupplier: false,
  });
});





app.get(`${BASENAME}/404`, (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.get(BASENAME, (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.use(express.static(path.join(__dirname, "dist")));

app.get(`${BASENAME}/*`, (req, res, next) => {
  const requestPath = req.path.replace(BASENAME, "");
  const filePath = path.join(__dirname, "dist", requestPath);

  if (req.path === BASENAME || !path.extname(requestPath)) {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
  } else {
    res.sendFile(filePath, (err) => {
      if (err) {
        next();
      }
    });
  }
});

app.use((req, res) => {
  res.redirect(`${BASENAME}/404`);
});

app.listen(port, () => {
  console.log(
    `DEVELOPMENT Server running on http://localhost:${port}${BASENAME}`
  );
});
