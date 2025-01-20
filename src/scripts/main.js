import "process/browser.js";
import { loadAssets } from "./assetLoader.js";
import { setupPlayer, updatePlayer } from "./player.js";
import {
  setupKeyboardControls,
  setupGamepadControls,
} from "./inputControls.js";
import { updateAnimations } from "./playerAnimations.js";
import { levelConfiguration, mapGeneration } from "./levelConfig.js";
import { handleCollisions } from "./collisions.js";
import { generateMap } from "./openAI.js";
import { parseMapData } from "./mapParser.js";
import { makeDungeonGrid, testDungeonGeneration } from "./generateDungeon.js";
import { assignChamberLayout, compileDungeonMap } from "./rooms.js";
import kaplay from "kaplay";

// initialize kaboom context
export const k = kaplay({
  width: 480,
  height: 432,
  global: true,
  fullscreen: true,
  scale: 1,
  debug: true,
  background: [0, 0, 0],
  showHitboxes: true,
});

// Constants for movement speeds

const SLICER_SPEED = 120;
const SKELETOR_SPEED = 60;
const ROOM_WIDTH = 480;
const ROOM_HEIGHT = 384;

// Initial room index (top-left corner)
let roomX = 0;
let roomY = 0;

export function updateStartingRoom(entrance) {
  //roomX = entrance.x;
  //roomY = entrance.y;
  console.log(roomX);
}

// Load Assets
loadAssets();

export let exitPos = { x: 0, y: 0 };
export let startPos = { x: 0, y: 0 }; //initialized

export function updateExit(newExit) {
  exitPos = newExit;
}

export function updateStart(newStart) {
  console.log("StartPos Updated To: " + newStart);
  startPos = newStart;
}

// Define the main game scene
scene("game", async ({ level, score, maps = [] }) => {
  let isTransitioning = false;

  // Generate a new dungeon
  let dungeonGrid = makeDungeonGrid();
  assignChamberLayout(dungeonGrid);

  // Compile the dungeon map
  const newDungeonMap = compileDungeonMap(dungeonGrid);
  maps.push(newDungeonMap);

  // Configuration for the level tiles
  const levelCfg = levelConfiguration();

  // Add background and UI layers
  const bg = add([z(0)]); // Background layer
  const ui = add([fixed(), z(10)]); // UI layer

  // add the level to the scene
  addLevel(maps[level], levelCfg);

  // Add the floor image
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const cell = dungeonGrid[i][j];

      const xPos = j * 480;
      const yPos = i * 384;

      if (!cell || !Array.isArray(cell.exits) || cell.exits == []) {
        continue;
      } else {
        const sortedExits = cell.exits.sort().join("");

        bg.add([sprite(`floor-${sortedExits}`), z(0), pos(xPos, yPos)]);
      }
    }
  }

  ui.add([sprite("hudbg"), pos(0, 384), z(10)]);

  // add the score label
  const scoreLabel = ui.add([text("0"), pos(400, 450), { value: score }]);

  // Render Player Character

  const player = setupPlayer();
  camPos(player.pos);

  let movementVector = vec2(0, 0);

  setupKeyboardControls(player, movementVector);
  setupGamepadControls(player, movementVector);

  // Smooth camera transition using Kaplay's `tween`
  function transitionCamera(targetPos) {
    isTransitioning = true;

    // Tween the camera position
    tween(
      camPos(),
      targetPos,
      0.5, // Duration in seconds
      (value) => camPos(value),
      easings.easeOutQuad // Easing function
    ).then(() => {
      isTransitioning = false;
    });
  }

  function getCameraPosition(playerPos) {
    // Room dimensions in tiles
    const roomWidthTiles = 10; // 10 tiles wide
    const roomHeightTiles = 8; // 8 tiles tall

    // Tile size in pixels
    const tileSize = 48; // 48x48 pixels per tile

    // Calculate room dimensions in pixels
    const roomWidthPixels = roomWidthTiles * tileSize;
    const roomHeightPixels = roomHeightTiles * tileSize;

    // Determine the chamber the player is in
    const chamberCol = Math.floor(playerPos.x / roomWidthPixels);
    const chamberRow = Math.floor(playerPos.y / roomHeightPixels);

    // Calculate the camera's position to center on this chamber
    const camX = chamberCol * roomWidthPixels + roomWidthPixels / 2;
    const camY = chamberRow * roomHeightPixels + roomHeightPixels / 2;

    // Return the camera position as a vec2
    return vec2(camX, camY);
  }

  // Game loop
  onUpdate(() => {
    camPos(getCameraPosition(player.pos));
    /*
    if (!isTransitioning) {
      // Check if the player moves out of room boundaries
      if (player.pos.x > ROOM_WIDTH * (roomX + 1)) {
        roomX++;
      } else if (player.pos.x < ROOM_WIDTH * roomX) {
        roomX--;
      } else if (player.pos.y > ROOM_HEIGHT * (roomY + 1)) {
        roomY++;
      } else if (player.pos.y < ROOM_HEIGHT * roomY) {
        roomY--;
      }

      // Trigger camera transition to the new room
      const targetPos = vec2(
        ROOM_WIDTH / 2 + ROOM_WIDTH * roomX,
        ROOM_HEIGHT / 2 + ROOM_HEIGHT * roomY + 24
      );
      transitionCamera(targetPos);
    }*/

    // Update player movement and animations
    updatePlayer(player, movementVector, player.isAttacking, player.isPushing);
    updateAnimations(
      player,
      movementVector,
      player.isAttacking,
      player.isPushing,
      player.isMoving
    );
  });

  // Freeze player during camera transition
  onUpdate(() => {
    if (isTransitioning) {
      player.move(0, 0);
    }
  });

  // Handle collisions
  handleCollisions(player, scoreLabel, maps, level);

  // Update slicer enemy movement
  onUpdate("slicer", (s) => {
    s.move(s.dir * SLICER_SPEED, 0);
  });

  // Update skeletor enemy movement
  onUpdate("skeletor", (s) => {
    s.move(0, s.dir * SKELETOR_SPEED);
    s.timer -= dt();
    if (s.timer <= 0) {
      s.dir = -s.dir;
      s.timer = rand(5);
    }
  });
});

// Define the lose scene
scene("lose", ({ score }) => {
  add([text(score, 32), anchor("center"), pos(width() / 2, height() / 2)]);
});

// Start the game
go("game", { level: 0, score: 0 });
