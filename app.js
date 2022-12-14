// Problematic:
// 009000070700609000006002908092060030000205000080090560601800400000107003040000200;
// 008060100605201908000407000007000200300020004090040080000906000010070030050000020;
// 000934000000080000081020950000609000209000605007000400000010000062000830004508700;
// 004000700000514000050203080700392008000000000805000302500000009308000407000786000;
// 008163500000000000300895006702000908950000042600000005030010050075000480000504000; **Naked Triples??
// 004308700006070400300000008063090870010000090000060000600000005001506200200107003; **??
// 000805000605403801030000060009000400020030070000908000001050300090000010008090200;
// 461000009000019000270000100804200030000000000020005608002000065000450000100000982;
// 005800001000100465200090000062000090509000806040000570000040009354007000900003600;
// 003000900000817000600090008400060001050103090106040503097000140000080000024000860;
// 080060070004020500090000040970000034030000050605807109001080400000304000000602000;
// 030009600006000000950003000008045032603000504490310800000700069000000400007100020;
// 203000506060000070000020000000040000080905040096000720008703200005060800100504007;
// 000103000600000007009504200000050000010906070207000906780030019023709650000000000;
// 080900700000370180047006050009000008000020000700000600070200510015083000003004020;
// 060209070007000100800000002042000360000452000000030000000107000003000800024000610;
// 060050010008000400000408000703000604002904700040030020805060307400105002200000005; ???
// 080500070500000103092080600000804001006000300100306000009030720703000005010002030; good test for naked doubles, then triples
// 089500000200901030000000209010000002705000304300000070408000000060208001000003920; good test for doubles
// 004105700008792100701000503075000260603000805000608000000000000007020600150000087;
// 408005000900000600300090840000000004501208709700000000032010005005000008000400301; good test for naked triples
// 040760000000000608070001000002308005400000009100604300000200090903000000000085020; ""
// 100090004004000300002000900200000005050837020001000700000603000028504670040982010; ""
// 007000082600200000024910000000000627400102003782000000000095470000008005940000200;
// 020000760000200103000816000874003900000000000009100857000345000903002000065000020;
// 601050004030940260000000000000503607500020008307406000000000000089065070100030502;
// 000005740509000000804700350100503800000060000007408001023006507000000904095100000; this is a hard puzzle that we can solve!!
// 009403800040000020050807010300070008000902000500030009200000004005000100060000030;
// 009403800040000020050807010300070008000902000500030009200000004005000100060000030; naked triples
// 000705000807000305000010000090000020700000003026000490030102070500060002100304009; good test for naked quad
// 206800017380000040005000309000605002000080000500901000702000900010000023860009405;
// 000000020700002630000903047012007000090000050000800370460509000071300004080000000; naked quad row 3
// 090000050000708000002060800000000000061805730308000201004000300000914000010030080;
// 060301050400000002030020010500000008003000400200000009010070090300000006090205070; 4 star from today's paper
// 903000008000002000008400607030201900000000000007304010206003100000700000800000705; 5 star from today's paper (clearly overrated difficulty)
// 500030000080051070000206004073000000060749080000000740100607000050390010000010006; good test for naked triples;

let testString =
  "500030000080051070000206004073000000060749080000000740100607000050390010000010006";
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

function flattenToStringVisual(arr) {
  let flattened = [];
  for (let i = 0; i < 9; i++) {
    flattened.push(arr[i].map((x) => (typeof x == "number" ? x : 0)));
  }
  for (let i = 0; i < 9; i++) {
    flattened[i] = flattened[i].join(" ");
  }

  flattened = flattened.join("\n");
  return flattened;
}

//----------------------------------

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

  function rowCandidates(row) {
    let rowCands = [];
    for (let i = 0; i < 9; i++) {
      if (typeof row[i] == "object" && row[i].length > 1) rowCands.push(row[i]);
    }
    return rowCands.flat();
  }

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

  function oneFullNakedPass(arr) {
    let rFilter = filterByRow(arr);
    let cFilter = filterByColumn(rFilter);
    let bFilter = filterByBox(cFilter);
    return (candidateArray = filterSolutions(bFilter));
  }

  function iterateUntilStable(arr) {
    while (!testBoardEquality(arr, oneFullNakedPass(arr))) {
      arr = oneFullNakedPass(arr);
    }
    return arr;
  }

  function findHiddenSinglesRow(arr, row) {
    for (let i = 0; i < 9; i++) {
      let cands = rowCandidates(arr[row]);
      let hiddens = [];
      for (let ele of cands) {
        if (cands.indexOf(ele) == cands.lastIndexOf(ele)) {
          hiddens.push(ele);
        }
      }
      return hiddens;
    }
  }

  function filterHiddenSinglesByRow(arr) {
    for (let i = 0; i < 9; i++) {
      let hiddens = findHiddenSinglesRow(arr, i);
      // console.log(arr[i], hiddens);
      for (let ele of hiddens) {
        arr[i] = arr[i].map((x) =>
          typeof x == "number" ? x : x.includes(ele) ? ele : x
        );
        // console.log(arr[i]);
      }
    }
    return (candidateArray = arr);
  }

  function filterHiddenSinglesByColumn(arr) {
    arr = flipRowColumn(filterHiddenSinglesByRow(flipRowColumn(arr)));
    return (candidateArray = arr);
  }

  function filterHiddenSinglesByBox(arr) {
    arr = boxesToRows(filterHiddenSinglesByRow(rowsToBoxes(arr)));
    return (candidateArray = arr);
  }

  function oneFullHiddenPass(arr) {
    let rFilter = filterHiddenSinglesByRow(arr);
    rFilter = iterateUntilStable(rFilter);
    let cFilter = filterHiddenSinglesByColumn(rFilter);
    cFilter = iterateUntilStable(cFilter);
    let bFilter = filterHiddenSinglesByBox(cFilter);
    bFilter = iterateUntilStable(bFilter);
    return (candidateArray = filterSolutions(bFilter));
  }

  function iterateHiddenUntilStable(arr) {
    while (!testBoardEquality(arr, oneFullHiddenPass(arr))) {
      arr = oneFullHiddenPass(arr);
    }
    iterateUntilStable(arr);
    return arr;
  }

  function findAndFilterNakedDoublesRow(arr, row) {
    let doubles = arr[row].filter((x) => x.length == 2);
    let sortedDubs = doubles
      .sort((a, b) => a[1] - b[1])
      .sort((a, b) => a[0] - b[0]);
    let nakedPairs = [];
    for (let i = 0; i < sortedDubs.length - 1; i++) {
      if (testFlatArrayEquality(sortedDubs[i], sortedDubs[i + 1])) {
        nakedPairs.push(sortedDubs[i]);
        nakedPairs = nakedPairs.flat();
        console.log(`row ${row} naked pair numbers:`, nakedPairs);
      }
    }
    for (let i = 0; i < 9; i++) {
      arr[row] = arr[row].map((x) =>
        typeof x == "number"
          ? x
          : x.filter((e) => !nakedPairs.includes(e)).length > 0
          ? x.filter((e) => !nakedPairs.includes(e))
          : x
      );
    }
  }

  function filterNakedDoublesByRows(arr) {
    for (let i = 0; i < 9; i++) {
      findAndFilterNakedDoublesRow(arr, i);
    }
    return (candidateArray = filterSolutions(arr));
  }

  function filterNakedDoublesByColumns(arr) {
    arr = flipRowColumn(arr);
    arr = filterNakedDoublesByRows(arr);
    arr = flipRowColumn(arr);
    return (candidateArray = filterSolutions(arr));
  }

  function filterNakedDoublesByBoxes(arr) {
    arr = boxesToRows(arr);
    arr = filterNakedDoublesByRows(arr);
    arr = rowsToBoxes(arr);
    return (candidateArray = filterSolutions(arr));
  }

  function oneFullNakedDoublePass(arr) {
    let rFilter = filterNakedDoublesByRows(arr);
    rFilter = iterateUntilStable(rFilter);
    let cFilter = filterNakedDoublesByColumns(rFilter);
    cFilter = iterateUntilStable(cFilter);
    let bFilter = filterNakedDoublesByBoxes(cFilter);
    bFilter = iterateUntilStable(bFilter);
    return (candidateArray = filterSolutions(bFilter));
  }

  iterateUntilStable(candidateArray);
  iterateHiddenUntilStable(candidateArray);
  oneFullNakedDoublePass(candidateArray);
  iterateHiddenUntilStable(candidateArray);

  console.log("rows:", candidateArray);
  console.log("columns:", flipRowColumn(candidateArray));
  console.log("boxes:", rowsToBoxes(candidateArray));

  console.log(flattenToStringVisual(input));
  console.log(flattenToStringVisual(candidateArray));
  return candidateArray;
}

// Hooray!! Our basic filters for repetition in rows, columns, and boxes are working!!!
// Now we need to build in solving techniques, from simple to complex!!
// We will begin with the NAKED DOUBLES technique. Ooh-la-laa...

let start = Date.now();
sudoku(input);
let timeTaken = Date.now() - start;
console.log("Total time taken : " + timeTaken + " milliseconds");
