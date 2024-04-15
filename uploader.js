let admin = require("firebase-admin");
let serviceAccount = require("./service_key.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
});

const firestore = admin.firestore();
const path = require("path");
const fs = require("fs");
const directoryPath = path.join(__dirname, "files");
const { v4: uuidv4 } = require("uuid");

fs.readdir(directoryPath, (err, files) => {
  if (err) {
    return console.log("Unable to scan directory: " + err);
  }

  files.forEach((file) => {
    if (!file.endsWith(".json") || file === ".DS_Store") {
      return;
    }

    let lastDotIndex = file.lastIndexOf(".");
    let menu = require("./files/" + file);

    if (!Array.isArray(menu)) {
      console.error(
        "Expected an array in file:",
        file,
        "but got:",
        typeof menu
      );
      return;
    }

    menu.forEach((obj) => {
      const id = uuidv4();
      if (typeof id !== "string" || id.trim() === "") {
        console.error("Invalid id in object:", obj);
        return;
      }

      firestore
        .collection(file.substring(0, lastDotIndex))
        .doc(id)
        .set(obj)
        .then(() => {
          console.log(`${id} written`);
        })
        .catch((error) => {
          console.error("Error adding document:", error);
        });
    });
  });
});
