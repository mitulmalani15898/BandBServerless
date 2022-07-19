const cors = require("cors")();

exports.helloWorld = (req, res) => {
  cors(req, res, () => {
    /**
     * https://learnersbucket.com/examples/algorithms/caesar-cipher-in-javascript/
     */
    const generateCeasarText = (plainText, key) => {
      let cipherText = "";
      for (let i = 0; i < plainText.length; i++) {
        cipherText += String.fromCharCode(
          ((plainText.charCodeAt(i) + key - 65) % 26) + 65
        );
      }
      return cipherText;
    };

    const reqBody = req.body;
    const cipherText = generateCeasarText(reqBody.plainText, reqBody.ceasarKey);

    if (cipherText === reqBody.cipherText) {
      res.status(200).send("User is authenticated successfully.");
    } else {
      res
        .status(401)
        .send(
          "Authentication failed, please try again and provide correct cipher text."
        );
    }
  });
};
