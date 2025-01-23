const fs = require("fs");
const csv = require("fast-csv");

const DATASET_PATH = "data/nypd-dataset.csv";

init();

function init() {
  loadData()
    .then((result) => {
      console.log("Dataset loaded successfully:", result);
    })
    .catch((error) => {
      console.error("Error loading dataset:", error);
    });
}

// Load the data using fast-csv
function loadData() {
  return new Promise((resolve, reject) => {
    const data = [];
    fs.createReadStream(DATASET_PATH)
      .pipe(csv.parse({ headers: true }))
      .on("data", (row) => {
        data.push(row);
      })
      .on("end", () => {
        resolve(data);
      })
      .on("error", (error) => {
        reject(error);
      });
  });
}
