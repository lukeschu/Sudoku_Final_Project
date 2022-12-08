function validSolution(board) {
  console.log(
    board[0].slice(0, 3),
    "|",
    board[0].slice(3, 6),
    "|",
    board[0].slice(6, 9)
  );
  console.log(
    board[1].slice(0, 3),
    "|",
    board[1].slice(3, 6),
    "|",
    board[1].slice(6, 9)
  );
  console.log(
    board[2].slice(0, 3),
    "|",
    board[2].slice(3, 6),
    "|",
    board[2].slice(6, 9)
  );
  console.log("---------------------------------------");
  console.log(
    board[3].slice(0, 3),
    "|",
    board[3].slice(3, 6),
    "|",
    board[3].slice(6, 9)
  );
  console.log(
    board[4].slice(0, 3),
    "|",
    board[4].slice(3, 6),
    "|",
    board[4].slice(6, 9)
  );
  console.log(
    board[5].slice(0, 3),
    "|",
    board[5].slice(3, 6),
    "|",
    board[5].slice(6, 9)
  );
  console.log("---------------------------------------");
  console.log(
    board[6].slice(0, 3),
    "|",
    board[6].slice(3, 6),
    "|",
    board[6].slice(6, 9)
  );
  console.log(
    board[7].slice(0, 3),
    "|",
    board[7].slice(3, 6),
    "|",
    board[7].slice(6, 9)
  );
  console.log(
    board[8].slice(0, 3),
    "|",
    board[8].slice(3, 6),
    "|",
    board[8].slice(6, 9)
  );

  let validArr = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  function testArrayIsValid(arr) {
    let sorted = [...arr].sort();
    for (let i = 0; i < 9; i++) {
      if (sorted[i] != validArr[i]) return false;
    }
    return true;
  }

  function columnArr(arr, n) {
    let col = [];
    for (let i = 0; i < 9; i++) {
      col.push(arr[i][n]);
    }
    return col;
  }

  function boxArr(arr, n) {
    let box = [];
    let rowStart = 3 * Math.floor(n / 3);
    let colStart = 3 * (n % 3);

    for (let i = rowStart; i < rowStart + 3; i++) {
      box.push(board[i].slice(colStart, colStart + 3));
    }

    box = box.flat();
    return box;
  }

  function testRows(arr) {
    for (let i = 0; i < 9; i++) {
      if (!testArrayIsValid(arr[i])) return false;
    }
    //     console.log("rows look good!")
    return true;
  }

  function testColumns(arr) {
    for (let i = 0; i < 9; i++) {
      if (!testArrayIsValid(columnArr(arr, i))) return false;
    }
    //     console.log("columns look good!")
    return true;
  }

  function testBoxes(arr) {
    for (let i = 0; i < 9; i++) {
      if (!testArrayIsValid(boxArr(arr, i))) return false;
    }
    //     console.log("boxes look good!")
    return true;
  }

  testRows(board);
  testColumns(board);
  testBoxes(board);

  return testRows(board) && testColumns(board) && testBoxes(board)
    ? true
    : false;
}
