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
  head: ["Name", "Age", "PClass", "Gender"],
});

fs.createReadStream("Titanic.csv")
	.pipe(csv())
	.on("data", (data) => {
  const arrayData = [];
  if (data[3] >= 0 && data[3] <= 14) {
    if (data[5] === "1") {
      arrayData.push(data[1]);
      arrayData.push(data[3]);
      arrayData.push(data[2]);
      arrayData.push(data[4]);
      obj[index] = arrayData;
      index = index + 1;
      table.push(
					arrayData
				);
				// console.log(data[1], data[3], data[2], data[4]);
    } else {
				// return "NOT SURVIVED";
    }
  } else {
			// return "NOT MATCH";
  }
	})
	.on("end", () => {
  console.log(table.toString());
	});
