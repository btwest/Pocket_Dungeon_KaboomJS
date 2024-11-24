import { updateStart, updateExit } from "./main.js";

export function generateDungeon(exitPos) {
  const rows = 8;
  const cols = 10;

  // Initialize empty map with walls
  const map = Array(rows)
    .fill()
    .map((_, row) =>
      Array(cols)
        .fill(" ")
        .map((_, col) => {
          if (row === 0 && col === 0) return "w"; // Top-left
          if (row === 0 && col === cols - 1) return "x"; // Top-right
          if (row === rows - 1 && col === 0) return "y"; // Bottom-left
          if (row === rows - 1 && col === cols - 1) return "z"; // Bottom-right
          if (row === 0) return "t"; // Top wall
          if (row === rows - 1) return "b"; // Bottom wall
          if (col === 0) return "l"; // Left wall
          if (col === cols - 1) return "r"; // Right wall
          return " ";
        })
    );
  /*
  // Place player start position near the bottom-left
  const playerStart = { row: rows - 2, col: 1 };
  map[playerStart.row][playerStart.col] = " "; */

  // Ensure exitPos is correctly defined
  if (!exitPos) {
    console.log("exitPos is undefined, initializing it.");
    exitPos = { row: 0, col: 6 }; // Default position if undefined
  }

  // Place player start position relative to exitPos
  let playerStart = { row: exitPos.row, col: exitPos.col };

  // Adjust player start position based on the exit's direction
  if (exitPos.row === 0) {
    // Exit is at the top
    playerStart.row = rows - 2; // Player starts at the bottom row
  } else if (exitPos.row === rows - 1) {
    // Exit is at the bottom
    playerStart.row = 1; // Player starts at the top row
  } else if (exitPos.col === 0) {
    // Exit is on the left
    playerStart.col = cols - 2; // Player starts on the right
  } else if (exitPos.col === cols - 1) {
    // Exit is on the right
    playerStart.col = 1; // Player starts on the left
  }

  //map[playerStart.row][playerStart.col] = " "; // Set player start position
  updateStart({ row: playerStart.row, col: playerStart.col });

  // Place a door or stairs at a random location
  const doorOptions = [
    { row: 0, col: Math.floor(cols / 2), char: "^" }, // Top door
    { row: Math.floor(rows / 2), col: 0, char: "$" }, // Left door
    { row: Math.floor(rows / 2), col: cols - 1, char: "$" }, // Right door
    { row: rows - 1, col: Math.floor(cols / 2), char: "{" }, // Bottom stairs
  ];

  // Ensure at least one next-level asset is placed
  const nextLevelOption = Math.random() < 0.5 ? doorOptions[0] : doorOptions[3]; // Either top door or bottom stairs
  map[nextLevelOption.row][nextLevelOption.col] = nextLevelOption.char;

  // Update exitPos to reflect the new exit location
  updateExit({ row: nextLevelOption.row, col: nextLevelOption.col });

  // Place enemies
  const enemyCount = Math.floor(Math.random() * 4) + 1; // 1-4 enemies
  for (let i = 0; i < enemyCount; i++) {
    let r, c;
    do {
      r = Math.floor(Math.random() * rows);
      c = Math.floor(Math.random() * cols);
    } while (
      map[r][c] !== " " ||
      (Math.abs(r - playerStart.row) <= 1 && Math.abs(c - playerStart.col) <= 1)
    );
    map[r][c] = Math.random() < 0.5 ? "*" : "!";
  }

  // Place lanterns
  const maxLanterns = Math.floor(Math.random() * 8) + 1; // Random number of lanterns between 1 and 8
  let lanternsPlaced = 0;
  const perimeter = [
    ...Array(cols)
      .fill(0)
      .map((_, i) => ({ row: 0, col: i })), // Top wall
    ...Array(cols)
      .fill(0)
      .map((_, i) => ({ row: rows - 1, col: i })), // Bottom wall
    ...Array(rows)
      .fill(0)
      .map((_, i) => ({ row: i, col: 0 })), // Left wall
    ...Array(rows)
      .fill(0)
      .map((_, i) => ({ row: i, col: cols - 1 })), // Right wall
  ];

  // Randomize the perimeter order
  const shuffledPerimeter = perimeter.sort(() => Math.random() - 0.5);

  // Loop through the perimeter and place lanterns
  for (let i = 0; i < shuffledPerimeter.length; i++) {
    if (lanternsPlaced >= maxLanterns) break;

    const { row, col } = shuffledPerimeter[i];

    // Only place a lantern if it's not a door, corner, or already a lantern
    if (
      !["^", "$", "{", "w", "x", "y", "z"].includes(map[row][col]) &&
      map[row][col] !== "%"
    ) {
      map[row][col] = "%"; // Place lantern
      lanternsPlaced++;
    }
  }

  // Convert map to array of strings
  return map.map((row) => row.join(""));
}

console.log(generateDungeon());
