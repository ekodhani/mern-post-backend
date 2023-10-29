const { verify } = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  const accessToken = req.header("accessToken");
  // cek token terdeteksi ada atau tidak
  if (!accessToken) {
    return res.json({ error: "Token not found! User is not logged in!" });
  }
  try {
    // melakukan verify terhadap token ~> sign: importantsecret
    const validToken = verify(accessToken, "importantsecret");
    // mengakses user yang sudah validToken
    req.user = validToken;

    if (validToken) {
      // token sudah valid
      return next(); // memberikan kemampuan untuk login
    }
  } catch (error) {
    return res.json({ error: error });
  }
};

module.exports = { validateToken };
