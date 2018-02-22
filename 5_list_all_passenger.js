const fs = require("fs");
const csv = require("fast-csv");
const Table = require("cli-table");

const obj = {};
let index = 0;
const table = new Table({
  chars: {
    top: "═", "top-mid": "╤", "top-left": "╔", "top-right": "╗", bottom: "═",
    "bottom-mid": "╧", "bottom-left": "╚", "bottom-right": "╝",
    left: "║", "left-mid": "╟", mid: "─", "mid-mid": "┼",
    right: "║", "right-mid": "╢", middle: "│" },
  head: ["Name", "PClass", "Survived"],
});

fs.createReadStream("Titanic.csv")
	.pipe(csv())
	.on("data", (data) => {
  const arrayData = [];
  if (data[1].includes("Miss") || data[1].includes("Mrs")) {
    arrayData.push(data[1]);
    arrayData.push(data[2]);
    if (data[5] === "1") {
      arrayData.push("Yes");
    } else {
      arrayData.push("No");
    }
    obj[index] = arrayData;
    index = index + 1;
    table.push(
				arrayData
			);
  } else {
			// return "NULL";
  }
	})
	.on("end", () => {
  console.log(table.toString());
	});
