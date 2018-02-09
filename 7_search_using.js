const fs = require("fs");
const csv = require("fast-csv");
// const Table = require("cli-table");


// const table = new Table({
// 	chars : {
// 		top: "═", "top-mid": "╤", "top-left": "╔", "top-right": "╗", bottom: "═",
// 		"bottom-mid": "╧", "bottom-left": "╚", "bottom-right": "╝",
// 		left: "║", "left-mid": "╟", mid: "─", "mid-mid": "┼",
// 		right: "║", "right-mid": "╢", middle: "│" },
// 	head: ["Name", "PClass", "Survived"],
// });

// table.push(resArray);
// console.log(table.toString());

fs.createReadStream("Titanic.csv")
	.pipe(csv())
	.on("data", (data) => {
		console.log(data[3]);
	})
	.on("end", () => {

	});