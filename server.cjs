require("dotenv").config();
const utils = require("./server-utility.cjs");
const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
const port = 5000;
const BASENAME = "/Gnome-Bazaar";

app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: "*",
  })
);
app.use((req, res, next) => {
  // console.log(`[${new Date().toLocaleString()}]`);
  // console.log(`${req.method} ${req.url}\n`);
  next();
});

// #region Assets Manager //

app.get(`/image-repo/:img`, async (req, res) => {
  const { img } = req.params;

  res.sendFile(path.join(__dirname, "public", "assets", img));
});

// #endregion Assets Manager //

// #region API Endpoints //

app.get(`${BASENAME}/api/products`, (req, res) => {
  const { take, skip, category, productName } = req.query;
  console.log(take, skip, category, productName);

  //add paging + filter data...

  const products = [];
  for (let i = 0; i < take; i++) {
    const product = {
      id: i.toString(),
      description: utils.randomString(40),
      img: utils.randomImage(),
      name: "מוצר" + " " + i,
      price: utils.randomBetween(250, 600),
      category: utils.randomCategory(),
      quantity: utils.randomBetween(0, 10),
    };
    products.push(product);
  }

  return res.status(200).json(products);
});

app.post(`${BASENAME}/api/products`, (req, res) => {
  const product = req.body;
  product.id = utils.randomString(15);
  res.status(201).json(product);
});

app.post(`${BASENAME}/api/publish-product`, async (req, res) => {
  const product = req.body;
  try {
    // Step 1: Convert Data URL to Buffer
    // const imageBuffer = dataURLToBuffer(imageDataUrl);

    // Step 2: Upload the image to Facebook
    const imageFormData = new FormData();
    imageFormData.append('access_token', PAGE_ACCESS_TOKEN);
    // imageFormData.append('source', imageBuffer, { filename: 'image.jpg' }); // Upload buffer as image file
    imageFormData.append('published', false); // Set to false to prevent auto-publishing the image

    // const imageResponse = await axios.post(
    //   `https://graph.facebook.com/${FB_PAGE_ID}/photos`,
    //   imageFormData,
    //   { headers: imageFormData.getHeaders() }
    // );

    // const photoId = imageResponse.data.id; // Get the image ID

    // Step 3: Post the message with the uploaded image
    const postMessage = `${title}\n\n${description}`; // Combine title and description in the message
    const postResponse = await axios.post(
      `https://graph.facebook.com/${FB_PAGE_ID}/feed`,
      {
        message: postMessage,
        // attached_media: [{ media_fbid: photoId }],
        access_token: PAGE_ACCESS_TOKEN
      }
    );

    res.status(200).json({ success: true, data: postResponse.data });
  } catch (error) {
    console.error('Error posting with image:', error.response ? error.response.data : error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.put(`${BASENAME}/api/products`, (req, res) => {
  const product = req.body;
  res.status(201).json(product);
});

app.delete(`${BASENAME}/api/products`, (req, res) => {
  const { id } = req.query;
  console.log(id);

  res.status(200).end();
});

app.get(`${BASENAME}/api/supplier-products`, (req, res) => {
  const isSupplier = true; //apply validation...
  if (!isSupplier) {
    res.status(401).end(); //unauthorized
  }

  const products = [];
  for (let i = 0; i < 30; i++) {
    const product = {
      id: i.toString(),
      description: utils.randomString(40),
      img: utils.randomImage(),
      name: "מוצר" + " " + i,
      price: utils.randomBetween(250, 600),
      category: utils.randomCategory(),
      quantity: utils.randomBetween(0, 10),
    };
    products.push(product);
  }
  return res.status(200).json(products);
});

app.get(`${BASENAME}/api/supplier-category-sales-info`, (req, res) => {
  const isSupplier = true; //apply validation...
  if (!isSupplier) {
    res.status(401).end(); //unauthorized
  }

  const data = utils.categories.map((category) => ({
    label: category,
    value: utils.randomBetween(0, 40),
  }));
  return res.status(200).json(data);
});

app.get(`${BASENAME}/api/supplier-sales-info`, (req, res) => {
  const isSupplier = true; //apply validation...
  if (!isSupplier) {
    res.status(401).end(); //unauthorized
  }

  const data = [
    { date: new Date(2024, 3, 1), close: 1000 },
    { date: new Date(2024, 4, 1), close: 500 },
    { date: new Date(2024, 5, 1), close: 170 },
    { date: new Date(2024, 6, 1), close: 170 },
    { date: new Date(2024, 7, 1), close: 170 },
  ];

  res.status(200).json(data);
});

app.get(`${BASENAME}/api/user-profile`, (req, res) => {
  //user profile by uuid from cookie/jwt
  const user = {
    id: "uuid",
    userName: "admin",
    pwd: "",
    fullName: "shir hirsh",
    mail: "shirhirsh510@gmail.com",
    phone: "0503403413",
    credits: 830,
    role: undefined,
  };

  return res.status(200).json(user);
});

app.get(`${BASENAME}/api/user-expenses`, (req, res) => {
  //user profile by uuid from cookie/jwt

  const data = [
    {
      title: "שיר 1",
      total: 100,
      value: 23,
    },
    {
      title: "שיר 2",
      total: 100,
      value: 78,
    },
    {
      title: "שיר 3",
      total: 100,
      value: 92,
    },
  ];

  return res.status(200).json(data);
});

app.get(`${BASENAME}/api/user-categories`, (req, res) => {
  //user profile by uuid from cookie/jwt

  const data = [
    {
      title: "שיר 1",
      total: 100,
      value: 23,
    },
    {
      title: "שיר 2",
      total: 100,
      value: 78,
    },
    {
      title: "שיר 3",
      total: 100,
      value: 92,
    },
  ];

  return res.status(200).json(data);
});

app.get(`${BASENAME}/api/cart-products`, (req, res) => {
  // cart products by uuid from cookie/jwt
  const products = [];
  for (let i = 0; i < 15; i++) {
    const product = {
      id: i.toString(),
      description: utils.randomString(40),
      img: utils.randomImage(),
      name: "מוצר" + " " + i,
      price: utils.randomBetween(250, 600),
      category: utils.randomCategory(),
      quantity: utils.randomBetween(0, 10),
    };
    const cartProduct = {
      product: product,
      quantity: 1,
    };
    products.push(cartProduct);
  }

  return res.status(200).json(products);
});
app.get(`${BASENAME}/api/user-purchases`, (req, res) => {
  // user purchase history by uuid from cookie/jwt
  const purchases = [];
  for (let i = 0; i < 15; i++) {
    const products = [];
    for (let i = 0; i < 15; i++) {
      const product = {
        id: i.toString(),
        description: utils.randomString(40),
        img: utils.randomImage(),
        name: "מוצר" + " " + i,
        price: utils.randomBetween(250, 600),
        category: utils.randomCategory(),
        quantity: utils.randomBetween(0, 10),
      };
      const cartProduct = {
        product: product,
        quantity: 1,
      };
      products.push(cartProduct);
    }
    const purchase = {
      products: products,
      uuid: utils.randomString(40),
      date: utils.randomDate(),
    };
    purchases.push(purchase);
  }
  return res.status(200).json(purchases);
});

app.post(`${BASENAME}/api/update-user-profile`, (req, res) => {
  const user = req.body;
  const isValid = true; //apply validation...
  if (!isValid) {
    res.status(400).end();
  }
  const isVerifiedUser = true; //apply validation...
  if (!isVerifiedUser) {
    res.status(401).end(); //unauthorized
  }

  return res.status(200).end();
});

app.get(`${BASENAME}/api/update-user-role`, (req, res) => {
  const user = req.body;
  const isValid = true; //apply validation...
  if (!isValid) {
    res.status(400).end();
  }
  const isAdmin = true; //apply validation...
  if (!isAdmin) {
    res.status(401).end(); //unauthorized
  }

  return res.status(200).end();
});

app.get(`${BASENAME}/api/send-user-credits`, (req, res) => {
  const amount = req.body;
  const isValid = true; //apply validation...
  if (!isValid) {
    res.status(400).end();
  }
  const isAdmin = true; //apply validation...
  if (!isAdmin) {
    res.status(401).end(); //unauthorized
  }

  return res.status(200).end();
});

app.get(`${BASENAME}/api/users`, (req, res) => {
  const isAdmin = true; //apply validation...
  if (!isAdmin) {
    res.status(401).end(); //unauthorized
  }

  const users = [];
  for (let i = 0; i < 30; i++) {
    const user = {
      id: i.toString(),
      credits: utils.randomBetween(100, 300),
      fullName: utils.randomString(8),
      mail: `user${i}@gmail.com`,
      phone: `054883${utils.randomBetween(100, 300)}`,
      pwd: "",
      role: utils.randomRole(),
      userName: utils.randomString(5) + i,
    };
    users.push(user);
  }

  return res.status(200).json(users);
});

app.get(`${BASENAME}/api/admin-sales-info`, (req, res) => {
  const isAdmin = true; //apply validation...
  if (!isAdmin) {
    res.status(401).end(); //unauthorized
  }

  const data = [
    { date: new Date(2024, 3, 1), close: 1000 },
    { date: new Date(2024, 4, 1), close: 500 },
    { date: new Date(2024, 5, 1), close: 170 },
    { date: new Date(2024, 6, 1), close: 170 },
    { date: new Date(2024, 7, 1), close: 170 },
  ];

  res.status(200).json(data);
});

app.post(`${BASENAME}/api/register`, (req, res) => {
  const user = req.body;
  res.status(201);

  const isUserValid = true; //add validations...
  if (!isUserValid) {
    res.status(400);
  }

  res.end();
});

app.post(`${BASENAME}/api/token`, (req, res) => {
  const { user, pwd } = req.body;
  console.log(user, pwd);
  if (user !== "admin" || pwd !== "Aa123456!") {
    res.status(401).end();
    return;
  }

  const now = new Date();
  res.json({
    name: "Elad D Gozman",
    expiry: new Date(now.getTime() + 2 * 60 * 60 * 1000),
    token: " d",
    isAdmin: true,
    isSupplier: true,
  });
});

// #endregion API Endpoints //

// #region STATIC Assets Endpoints //
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

// #endregion STATIC Assets Endpoints //
