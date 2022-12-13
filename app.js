let testString =
  "010020300004005060070000008006900070000100002030048000500006040000800106008000000";

function stringToSudoku(str) {
  let puzzle = [];
  for (let i = 0; i < 9; i++) {
    puzzle.push(
      str
        .slice(9 * i, 9 * i + 9)
        .split("")
        .map(Number)
    );
  }
  // console.log(puzzle);
  return puzzle;
}

let input = stringToSudoku(testString);
console.log(input);

function sudoku(puzzle) {
  let candidateArray = [];

  for (let i = 0; i < 9; i++) {
    candidateArray.push(
      puzzle[i].map((x) => (x === 0 ? [1, 2, 3, 4, 5, 6, 7, 8, 9] : [x]))
    );
  }

  function filterSolutions(arr) {
    for (let i = 0; i < 9; i++) {
      arr[i] = arr[i].map((x) =>
        typeof x == "object" && x.length == 1 ? x[0] : x
      );
    }
    return arr;
  }
  filterSolutions(candidateArray);

  function filterByRow(arr) {
    for (let i = 0; i < 9; i++) {
      arr[i] = arr[i].map((x) =>
        typeof x === "number" ? x : x.filter((e) => !arr[i].includes(e))
      );
    }
    return filterSolutions(arr);
  }

  function columnArr(arr, ind) {
    let col = [];
    for (let i = 0; i < 9; i++) {
      col.push(arr[i][ind]);
    }
    return col;
  }

  function flipRowColumn(arr) {
    let flip = [];
    for (let i = 0; i < 9; i++) {
      flip.push(columnArr(arr, i));
    }
    return flip;
  }

  function filterByColumn(arr) {
    arr = flipRowColumn(arr);
    arr = filterByRow(arr);
    arr = flipRowColumn(arr);
    return (candidateArray = filterSolutions(arr));
  }

  function boxArr(arr, n) {
    let box = [];
    let rowStart = 3 * Math.floor(n / 3);
    let colStart = 3 * (n % 3);
    for (let i = rowStart; i < rowStart + 3; i++) {
      box.push(arr[i].slice(colStart, colStart + 3));
    }
    box = box.flat();
    return box;
  }

  function boxesToRows(arr) {
    let boxRows = [];
    for (let i = 0; i < 9; i++) {
      boxRows.push(boxArr(arr, i));
    }
    return boxRows;
  }

  function rowsToBoxes(arr) {
    let rowBoxes = [[], [], [], [], [], [], [], [], []];
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 3; j++) {
        let rowMap = 3 * Math.floor(i / 3) + j;
        rowBoxes[rowMap].push(arr[i].slice(3 * j, 3 * j + 3));
      }
    }
    for (let i = 0; i < 9; i++) {
      rowBoxes[i] = rowBoxes[i].flat();
    }
    return rowBoxes;
  }

  function filterByBox(arr) {
    arr = boxesToRows(arr);
    arr = filterByRow(arr);
    arr = rowsToBoxes(arr);
    return (candidateArray = filterSolutions(arr));
  }

  function oneFullPass(arr) {
    let rFilter = filterByRow(arr);
    let cFilter = filterByColumn(rFilter);
    let bFilter = filterByBox(cFilter);
    return (candidateArray = filterSolutions(bFilter));
  }

  function testFlatArrayEquality(arr1, arr2) {
    let flat1 = arr1.flat();
    let flat2 = arr2.flat();
    if (flat1.length != flat2.length) return false;
    for (let i = 0; i < flat1.length; i++) {
      if (flat1[i] !== flat2[i]) return false;
    }
    return true;
  }

  function testBoardEquality(arr1, arr2) {
    for (let i = 0; i < 9; i++) {
      if (!testFlatArrayEquality(arr1[i], arr2[i])) return false;
    }
    return true;
  }

  let iterationCount = 0;
  function iterateUntilStable(arr) {
    while (!testBoardEquality(arr, oneFullPass(arr))) {
      iterationCount++;
      arr = oneFullPass(arr);
    }
  }

  iterateUntilStable(candidateArray);
  return candidateArray;
}

// Hooray!! Our basic filters for repetition in rows, columns, and boxes are working!!!
// Now we need to build in solving techniques, from simple to complex!!
// We will begin with the NAKED DOUBLES technique. Ooh-la-laa...

console.log(sudoku(input));
