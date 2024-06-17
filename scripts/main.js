import { loadAssets } from "./assetLoader.js";
import { setupPlayer, updatePlayer } from "./player.js";
import {
  setupKeyboardControls,
  setupGamepadControls,
} from "./inputControls.js";
import { updateAnimations } from "./playerAnimations.js";
import { levelConfiguration, mapGeneration } from "./mapMaker.js";
import { handleCollisions } from "./collisions.js";

// initialize kaboom context
kaboom({
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

// Load Assets
loadAssets();

// Define the main game scene
scene("game", ({ level, score }) => {
  const currentLevel = level;
  const maps = mapGeneration();

  // Configuration for the level tiles
  const levelCfg = levelConfiguration();

  // Add background and UI layers
  const bg = add([fixed(), z(0)]);
  const ui = add([fixed(), z(2)]);

  // add the level to the scene
  addLevel(maps[level], levelCfg);

  // add the floor sprite
  bg.add([sprite("floor"), z(0)]);

  // add the score label
  const scoreLabel = ui.add([text("0"), pos(400, 450), { value: score }]);

  // Render Player Character

  const player = setupPlayer();
  let movementVector = vec2(0, 0);

  setupKeyboardControls(player);
  setupGamepadControls(player, movementVector);

  // Update movement continuously in the game loop
  onUpdate(() => {
    updatePlayer(player, movementVector);
    updateAnimations(player, movementVector);
  });

  // handle Collisions
  handleCollisions(player, scoreLabel, maps, currentLevel);

  // Function to spawn an explosion effect
  function spawnKaboom(p) {
    const obj = add([
      sprite("kaboom"),
      pos(p),
      "kaboom",
      area(),
      body({ isStatic: true }),
    ]);
    wait(1, () => {
      destroy(obj);
    });
  }

  // Define action for the space key (spawn explosion)
  onKeyPress("space", () => {
    spawnKaboom(player.pos.add(player.dir.scale(48)));
  });

  // Update slicer enemies' movement
  onUpdate("slicer", (s) => {
    s.move(s.dir * SLICER_SPEED, 0);
  });

  // Update skeletor enemies' movement
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

// Start the game with initial level and score
go("game", { level: 0, score: 0 });
