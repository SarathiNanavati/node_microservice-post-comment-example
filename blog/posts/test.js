const obj1 = {
  a: {
    b: {
      c: {
        d: { e: { f: { g: { h: { i: { j: { k: { l: { m: "n" } } } } } } } } },
      },
    },
  },
};

function customSort(obj, rObj) {
  //   console.log(obj, typeof obj, rObj);

  if (typeof obj !== "object") return { [obj]: rObj };

  const [[k, v]] = Object.entries(obj);
  //   console.log(k, v);

  return customSort(v, rObj ? { [k]: rObj } : k);
}

const r = customSort(obj1);
console.log("Input", JSON.stringify(obj1));
console.log("Output", JSON.stringify(r));

console.log(
  "----------------------------------------------------------------------------------"
);

const obj2 = [
  {
    testId: 6,
    id: "0001",
    type: "donut",
    name: "Cake",
    ppu: 0.57,
    batters: {
      batter1: { id: "1001", type: "Regular" },
      batter2: { id: "1002", type: "Chocolate" },
      batter3: { id: "1003", type: "Blueberry" },
      batter4: { id: "1004", type: "Devil's Food" },
    },
    toppings: {
      topping1: { id: "5001", type: "None" },
      topping2: { id: "5002", type: "Glazed" },
      topping3: { id: "5009", type: "Sugar" },
      topping4: { id: "5007", type: "Powdered Sugar" },
      topping5: { id: "5006", type: "Chocolate with Sprinkles" },
      topping6: { id: "5003", type: "Chocolate" },
      topping7: { id: "5004", type: "Maple" },
    },
  },
  {
    testId: 5,
    id: "0002",
    type: "donut",
    name: "Raised",
    ppu: 0.51,
    batters: {
      batter1: { id: "1001", type: "Pastery" },
    },
    toppings: {
      topping1: { id: "5001", type: "None" },
      topping2: { id: "5002", type: "Glazed" },
      topping3: { id: 5005, type: "Sugar" },
      topping4: { id: "5003", type: "Chocolate" },
      topping5: { id: "5004", type: "Maple" },
    },
  },
  {
    testId: 4,
    id: "0003",
    type: "donut",
    name: "Old Fashioned",
    ppu: 0.59,
    batters: {
      batter1: { id: "1001", type: "None" },
      batter2: { id: "1002", type: "Chocolate" },
    },
    toppings: {
      topping1: { id: "5001", type: "None" },
      topping2: { id: "5002", type: "Glazed" },
      topping3: { id: 5003, type: "Chocolate" },
      topping4: { id: "5004", type: "Maple" },
    },
  },
  { testId: 2 },
  { testId: 3 },
  { testId: 1 },
];

Array.prototype.mySortFn = function (callback) {
  let arr = [...this];

  function mergeSort(arr) {
    if (arr.length === 1) {
      return arr;
    }
    const middle = Math.floor(arr.length / 2);
    const left = arr.slice(0, middle);
    const right = arr.slice(middle);

    return merge(mergeSort([...left]), mergeSort([...right]));
  }

  function merge(left, right) {
    console.log(
      left.map((o) => o["testId"]),
      right.map((o) => o["testId"])
    );

    let result = [];
    let leftIndex = 0,
      rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
      console.log(callback(left[leftIndex], right[rightIndex]));
      if (callback(left[leftIndex], right[rightIndex]) >= -1) {
        result.push(right[rightIndex]);
        rightIndex++;
      } else {
        result.push(left[leftIndex]);
        leftIndex++;
      }
    }

    if (leftIndex < left.length) {
      result = result.concat(left.slice(leftIndex));
    }

    if (rightIndex < right.length) {
      result = result.concat(right.slice(rightIndex));
    }

    console.log(
      "R",
      result.map((o) => o["testId"])
    );
    return result;
  }

  return mergeSort(arr);
};

function customSort2(obj, keyToSort, order = "ASC") {
  function getValueFromObj(obj, keyString) {
    // console.log("getValueFromObj", obj, keyString);
    const keyArr = keyString.split(".");

    let tempObj = { ...obj };
    for (let i = 0; i < keyArr.length; i++) {
      tempObj = tempObj[keyArr[i]] ? tempObj[keyArr[i]] : "";
    }
    return tempObj;
  }

  //   return obj.sort(function (a, b) {
  //     let valA = getValueFromObj(a, keyToSort);
  //     let valB = getValueFromObj(b, keyToSort);
  //     console.log("valA:", valA, "valB:", valB);

  //     if (typeof valA === "number" && typeof valB === "number") {
  //       return order === "DESC" ? valB - valA : valA - valB;
  //     }

  //     if (typeof valA === "string" && typeof valB === "string") {
  //       return order === "DESC"
  //         ? valB.localeCompare(valA)
  //         : valA.localeCompare(valB);
  //     }

  //     return order === "DESC"
  //       ? (valB + "").localeCompare(valA + "")
  //       : (valA + "").localeCompare(valB + "");
  //   });

  return obj.mySortFn(function (a, b) {
    let valA = getValueFromObj(a, keyToSort);
    let valB = getValueFromObj(b, keyToSort);
    console.log("valA:", valA, "valB:", valB);

    if (typeof valA === "number" && typeof valB === "number") {
      return order === "DESC" ? valB - valA : valA - valB;
    }

    if (typeof valA === "string" && typeof valB === "string") {
      return order === "DESC"
        ? valB.localeCompare(valA)
        : valA.localeCompare(valB);
    }

    return order === "DESC"
      ? (valB + "").localeCompare(valA + "")
      : (valA + "").localeCompare(valB + "");
  });
}

// let r2 = customSort2([...obj2], "toppings.topping6.type", "ASC");
// r2 = customSort2([...obj2], "ppu");
// r2 = customSort2([...obj2], "toppings.topping3.id");
r2 = customSort2([...obj2], "testId");

// console.log("Input================>", JSON.stringify(obj2, null, 2));
console.log("Output===============>", JSON.stringify(r2, null, 2));
console.log(
  "----------------------------------------------------------------------------------"
);
