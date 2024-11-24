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

  // Update player start position
  updateStart({ row: playerStart.row, col: playerStart.col });

  // Place exit doors based on wall types
  const exitDoors = {
    top: "e", // Top exit door
    left: "s", // Left exit door
    right: "g", // Right exit door
    bottom: "d", // Bottom exit door
  };

  // Place entrance doors based on player start position
  const entranceDoors = {
    top: "^", // Top entrance door
    left: "(", // Left entrance door
    right: ")", // Right entrance door
    bottom: "-", // Bottom entrance door
  };

  // Determine the direction of the exit and place the corresponding entrance door
  if (exitPos.row === 0) {
    // Exit is at the top, place entrance on the bottom
    map[rows - 1][exitPos.col] = entranceDoors.bottom; // Place entrance door on bottom wall
  } else if (exitPos.row === rows - 1) {
    // Exit is at the bottom, place entrance on the top
    map[0][exitPos.col] = entranceDoors.top; // Place entrance door on top wall
  } else if (exitPos.col === 0) {
    // Exit is on the left, place entrance on the right
    map[exitPos.row][cols - 1] = entranceDoors.right; // Place entrance door on right wall
  } else if (exitPos.col === cols - 1) {
    // Exit is on the right, place entrance on the left
    map[exitPos.row][0] = entranceDoors.left; // Place entrance door on left wall
  }

  // Randomize the perimeter order for exit placement
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

  // Loop through the perimeter and place exit doors
  for (let i = 0; i < shuffledPerimeter.length; i++) {
    const { row, col } = shuffledPerimeter[i];

    if (
      !["^", "$", "{", "w", "x", "y", "z", "%", "@", "`", "&"].includes(
        map[row][col]
      ) // Ensure no door or lantern is replaced
    ) {
      if (map[row][col] === "t") {
        map[row][col] = exitDoors.top; // Top wall gets top exit door
        updateExit({ row: row, col: col });
      } else if (map[row][col] === "l") {
        map[row][col] = exitDoors.left; // Left wall gets left exit door
        updateExit({ row: row, col: col });
      } else if (map[row][col] === "r") {
        map[row][col] = exitDoors.right; // Right wall gets right exit door
        updateExit({ row: row, col: col });
      } else if (map[row][col] === "b") {
        map[row][col] = exitDoors.bottom; // Bottom wall gets bottom exit door
        updateExit({ row: row, col: col });
      }

      break; // Exit once an exit door has been placed
    }
  }

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

  // Loop through the perimeter and place lanterns
  for (let i = 0; i < shuffledPerimeter.length; i++) {
    if (lanternsPlaced >= maxLanterns) break;

    const { row, col } = shuffledPerimeter[i];

    // Only place a lantern if it's not a door, corner, or already a lantern
    if (
      !["^", "$", "{", "w", "x", "y", "z"].includes(map[row][col]) &&
      !["%", "@", "`", "&"].includes(map[row][col])
    ) {
      // Place lantern based on wall type
      if (map[row][col] === "t") {
        map[row][col] = "%"; // Top lantern
      } else if (map[row][col] === "b") {
        map[row][col] = "@"; // Bottom lantern
      } else if (map[row][col] === "l") {
        map[row][col] = "`"; // Left lantern
      } else if (map[row][col] === "r") {
        map[row][col] = "&"; // Right lantern
      }
      lanternsPlaced++;
    }
  }

  // Convert map to array of strings
  return map.map((row) => row.join(""));
}

console.log(generateDungeon());
