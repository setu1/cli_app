const fs = require("fs");
const Table = require("cli-table");

let string;
let counter1 = 0;
let counter2 = 0;
let counter3 = 0;
let counterSurvived1 = 0;
let counterSurvived2 = 0;
let counterSurvived3 = 0;
let counterNonSurvived1= 0;
let counterNonSurvived2= 0;
let counterNonSurvived3 = 0;
let arrayData1;
let arrayData2;
let arrayData3

fs.readFile("Titanic.csv", "utf8", (err, data) => {
  if (err) return console.error(err);
  string = data.toString().split("\n").map(function(data){
    return data.match(/(".*?"(?=,)|[^",]+)/g);
  });

  // if (string > 0)string -= 1;
  //  return console.log(string);

  string.pop();

  function result(key, Name, Pclass, Age, Sex, Survived, SexCode) {
    return {
      key: key.slice(1, key.length - 1),
      name: Name.slice(1, Name.length - 1),
      Pclass: Pclass.slice(1, Pclass.length - 1),
      Age: Age,
      Sex: Sex.slice(1, Sex.length - 1),
      Survived: Survived,
      SexCode: SexCode
    }
  }
  
  let array = [];
  for (var index = 0; index < string.length; index++) {
    array.push(result(string[index][0], string[index][1], string[index][2], string[index][3], string[index][4], string[index][5], string[index][6]));
  }
  

 // console.log(array[1]);

  
  array.forEach(function(record){
    if (Object.values(record)[2] === "1st") {
      counter1++;
	  if (Object.values(record)[5] === "1") {
		counterSurvived1++;
	  } else {
		counterNonSurvived1++;
      }
	  
    } else if (Object.values(record)[2] === "2nd") {
      counter2++;
	  if (Object.values(record)[5] === "1") {
		counterSurvived2++;
	  } else {
		counterNonSurvived2++;
      }
    } else {
      counter3++;
	  if (Object.values(record)[5] === "1") {
		counterSurvived3++;
	  } else {
		counterNonSurvived3++;
      }
    }
  });

  
  
// let Total = 0;


//  fs.createReadStream("Titanic.csv")
//   // .pipe(csv())
//   .on("data", (data) => {

  //   console.log(data);
  // if (data[2] === "1st") {
  //   counter1 += 1;
  //   if (data[5] === "1") {
  //     counterSurvived1 += 1;
  //   } else {
  //     counterNotSurvived1 += 1;
  //   }
  // } else if (data[2] === "2nd") {
  //   counter2 += 1;
  //   if (data[5] === "1") {
  //     counterSurvived2 += 1;
  //   } else {
  //     counterNotSurvived2 += 1;
  //   }
  // } else {
  //   counter3 += 1;
  //   if (data[5] === "1") {
  //     counterSurvived3 += 1;
  //   } else {
  //     counterNotSurvived3 += 1;
  //   }
  // }
 //  })
 // .on("end", () => {
  // Total = counter1 + counter2 + counter3;
  arrayData1 = ["1st", counter1, counterSurvived1, counterNonSurvived1 ]; 
  arrayData2 = ["2nd", counter2, counterSurvived2, counterNonSurvived2];
  arrayData3 = ["3rd", counter3, counterSurvived3, counterNonSurvived3];
  const table = new Table({
    chars: {
      top: "═", "top-mid": "╤", "top-left": "╔", "top-right": "╗", bottom: "═",
      "bottom-mid": "╧", "bottom-left": "╚", "bottom-right": "╝",
      left: "║", "left-mid": "╟", mid: "─", "mid-mid": "┼",
      right: "║", "right-mid": "╢", middle: "│" },
    head: ["PClass", "TotalCount", "survived", "Non-Survived", "percentage"],
   });
  table.push(
     arrayData1, arrayData2, arrayData3
   );
  console.log(table.toString());
 });