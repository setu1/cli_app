const fs = require("fs");
const csv = require("fast-csv");
const Table = require("cli-table");

const arrayData = [];

fs.createReadStream("Titanic.csv")
	.pipe(csv())
	.on("data", (data) => {
  if (data[6] === "1" && data[5] === "0") {
    if (data[3] >= 30 && data[3] <= 40) {
      if (data[2] === "1st") {
        arrayData.push(data[1]);
        arrayData.push(data[3]);
      } else {
					// return "NOT MATCH";
      }
    } else {
				// return "WRONG";
    }
  } else {
			// return "NOT FEMALE PASSENGER";
  }
	})
	.on("end", () => {
  const table = new Table({
    chars: {
      top: "═", "top-mid": "╤", "top-left": "╔", "top-right": "╗", bottom: "═",
      "bottom-mid": "╧", "bottom-left": "╚", "bottom-right": "╝",
      left: "║", "left-mid": "╟", mid: "─", "mid-mid": "┼",
      right: "║", "right-mid": "╢", middle: "│" },
    head: ["Name", "Age"],
  });
  table.push(
			arrayData
		);
  console.log(table.toString());
});
