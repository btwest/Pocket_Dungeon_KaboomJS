import { updateStart, updateStartingRoom } from "./main.js";

// Room creation function
function makeChamber(position) {
  return {
    row: position.row,
    col: position.col,
    exits: [], // Exits will be determined later
    type: "Empty", // Default room type
    layout: [
      "          ",
      "          ",
      "          ",
      "          ",
      "          ",
      "          ",
      "          ",
      "          ",
    ],
  };
}

function updatePlayerStart(entrance) {
  // Room dimensions in tiles
  const roomWidthTiles = 10; // 10 tiles wide
  const roomHeightTiles = 8; // 8 tiles tall

  // Tile size in pixels
  const tileSize = 48; // 48x48 pixels per tile

  // Calculate the center tile of the entrance room
  const centerTileX = Math.floor(roomWidthTiles / 2); // Center column (5th tile in a 0-indexed array)
  const centerTileY = Math.floor(roomHeightTiles / 2); // Center row (4th tile in a 0-indexed array)

  // Convert the tile position to world pixel coordinates
  const startX =
    entrance.col * roomWidthTiles * tileSize + centerTileX * tileSize;
  const startY =
    entrance.row * roomHeightTiles * tileSize + centerTileY * tileSize;

  // Set the player's starting position
  updateStart({ row: startX, col: startY });

  console.log(`Player start position set to: (${startX}, ${startY})`);
}

// Function to map room exits to arrow symbols
function mapRoomToArrows(room) {
  const exits = room.exits || [];
  let roomRepresentation = "";

  // Add corresponding arrows for each exit direction
  if (exits.includes("w")) roomRepresentation += "←";
  if (exits.includes("n")) roomRepresentation += "↑";
  if (exits.includes("s")) roomRepresentation += "↓";
  if (exits.includes("e")) roomRepresentation += "→";

  // Return the room's arrow representation (if no exits, return a space)
  return roomRepresentation || " ";
}
// Function to map room types to their symbols (Entrance = E, Boss = B, or exits as arrows)
function mapRoomToSymbol(room) {
  if (!room) return "X"; // Null room
  if (room.type === "Entrance") return "E"; // Entrance
  if (room.type === "Boss") return "B"; // Boss chamber
  return mapRoomToArrows(room); // Use arrow symbols for rooms with exits
}
// Function to print the dungeon layout
function printDungeon(grid) {
  console.log("Dungeon Layout:");
  grid.forEach((row) => {
    console.log(
      row
        .map((room) => mapRoomToSymbol(room).padEnd(3)) // Format for consistent width
        .join("") // Join all rooms into a single string per row
    );
  });
}

function makePath(grid, entrance, boss) {
  let currentRow = entrance.row;
  let currentCol = entrance.col;
  let targetRow = boss.row;
  let targetCol = boss.col;

  // While current position is not the same as the target position, create rooms
  while (currentRow !== targetRow || currentCol !== targetCol) {
    // Create a room at the current position if it's empty
    if (!grid[currentRow][currentCol]) {
      grid[currentRow][currentCol] = makeChamber({
        row: currentRow,
        col: currentCol,
        type: "Normal",
      });
    }

    // Determine the direction of movement and add exits to the current room
    if (currentRow !== targetRow) {
      if (currentRow < targetRow) {
        // Moving down, add a 's' (south) exit to the current room
        grid[currentRow][currentCol].exits.push("s");
        // Add a 'n' (north) exit to the room below
        if (!grid[currentRow + 1][currentCol]) {
          grid[currentRow + 1][currentCol] = makeChamber({
            row: currentRow + 1,
            col: currentCol,
            type: "Normal",
          });
        }
        grid[currentRow + 1][currentCol].exits.push("n");
        currentRow += 1;
      } else {
        // Moving up, add a 'n' (north) exit to the current room
        grid[currentRow][currentCol].exits.push("n");
        // Add a 's' (south) exit to the room above
        if (!grid[currentRow - 1][currentCol]) {
          grid[currentRow - 1][currentCol] = makeChamber({
            row: currentRow - 1,
            col: currentCol,
            type: "Normal",
          });
        }
        grid[currentRow - 1][currentCol].exits.push("s");
        currentRow -= 1;
      }
    } else if (currentCol !== targetCol) {
      if (currentCol < targetCol) {
        // Moving right, add a 'e' (east) exit to the current room
        grid[currentRow][currentCol].exits.push("e");
        // Add a 'w' (west) exit to the room on the right
        if (!grid[currentRow][currentCol + 1]) {
          grid[currentRow][currentCol + 1] = makeChamber({
            row: currentRow,
            col: currentCol + 1,
            type: "Normal",
          });
        }
        grid[currentRow][currentCol + 1].exits.push("w");
        currentCol += 1;
      } else {
        // Moving left, add a 'w' (west) exit to the current room
        grid[currentRow][currentCol].exits.push("w");
        // Add a 'e' (east) exit to the room on the left
        if (!grid[currentRow][currentCol - 1]) {
          grid[currentRow][currentCol - 1] = makeChamber({
            row: currentRow,
            col: currentCol - 1,
            type: "Normal",
          });
        }
        grid[currentRow][currentCol - 1].exits.push("e");
        currentCol -= 1;
      }
    }

    // Ensure we don't go out of bounds of the 8x8 grid
    currentRow = Math.max(0, Math.min(grid.length - 1, currentRow));
    currentCol = Math.max(0, Math.min(grid[0].length - 1, currentCol));
  }
}

// Function to place entrance and boss rooms (simplified version)
function placeEntranceAndBoss(grid) {
  // Place entrance in the bottom row at a random column
  //const entrance = { row: 7, col: 3 }; //hard-code entrance

  const entrance = {
    row: Math.floor(Math.random() * 8), // Random row between 0 and 7
    col: Math.floor(Math.random() * 8), // Random column between 0 and 7
  };

  const boss = {
    row: Math.floor(Math.random() * 8), // Random row between 0 and 7
    col: Math.floor(Math.random() * 8), // Random column between 0 and 7
  };

  grid[entrance.row][entrance.col] = makeChamber(entrance);
  grid[entrance.row][entrance.col].type = "Entrance"; // Mark as entrance

  updatePlayerStart(entrance);
  updateStartingRoom(entrance);

  grid[boss.row][boss.col] = makeChamber(boss);
  grid[boss.row][boss.col].type = "Boss"; // Mark as boss

  return { entrance, boss };
}

// Function to generate the dungeon grid
export function makeDungeonGrid() {
  const gridSize = 8; // 8x8 grid
  // Initialize the grid with null
  const dungeonGrid = Array.from({ length: gridSize }, () =>
    Array(gridSize).fill(null)
  );

  // Generate and place entrance and boss rooms
  const { entrance, boss } = placeEntranceAndBoss(dungeonGrid);

  // Create connecting rooms between the entrance and the boss
  makePath(dungeonGrid, entrance, boss);
  printDungeon(dungeonGrid);

  return dungeonGrid;
}
