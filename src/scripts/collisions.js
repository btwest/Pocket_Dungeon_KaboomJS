import { generateMap } from "./openAI.js";
import { parseMapData } from "./mapParser.js";
// Import the local dungeon generation function
//import { generateRoom } from "./generateRoom.js";
import { k, exitPos, startPos, updateStart } from "./main.js";
import { updatePlayer } from "./player.js";

export function handleCollisions(player, scoreLabel, maps, level) {
  let mapGenerationInProgress = false; // Flag to track map generation

  onCollideUpdate("player", "next-level", (player, other) => {
    scoreLabel.value++;
    go("game", { level: 0, score: scoreLabel.value });
  });

  // Register collision handling with walls
  onCollideUpdate("slicer", "wall", (slicer, other) => {
    // Reverse direction only once per collision event
    if (!slicer._isReversing) {
      slicer.dir = -slicer.dir; // Reverse direction
      slicer._isReversing = true; // Mark as reversing
    }
  });

  // Cleanup the reversal flag when collision ends
  onCollideEnd("slicer", "wall", (slicer, other) => {
    slicer._isReversing = false; // Reset the reversal flag when no longer colliding
  });

  // Register collision handling with walls
  onCollideUpdate("slicer", "dangerous", (slicer, other) => {
    // Reverse direction only once per collision event
    if (!slicer._isReversing) {
      slicer.dir = -slicer.dir; // Reverse direction
      slicer._isReversing = true; // Mark as reversing
    }
  });

  // Register collision handling with walls
  onCollideUpdate("skeletor", "pitfall", (skeletor, other) => {
    // Reverse direction only once per collision event

    skeletor.dir = -skeletor.dir; // Reverse direction
  });

  // Cleanup the reversal flag when collision ends
  onCollideEnd("slicer", "dangerous", (slicer, other) => {
    slicer._isReversing = false; // Reset the reversal flag when no longer colliding
  });

  let activeWallCollisions = 0; // Track the number of active wall collisions

  // Handle player walking into a wall or object (Push)
  onCollideUpdate("player", "wall", (player, wall) => {
    if (!player.isMoving) {
      player.isPushing = false;
      return;
    }

    const movingTowardsWall =
      player.isMoving &&
      // Moving right (diagonal included)
      ((player.dir.x > 0 &&
        player.pos.x + 20 <= wall.pos.x &&
        player.pos.y + 20 > wall.pos.y &&
        player.pos.y - 20 < wall.pos.y + wall.height) ||
        // Moving left (diagonal included)
        (player.dir.x < 0 &&
          player.pos.x - 20 >= wall.pos.x + wall.width &&
          player.pos.y + 20 > wall.pos.y &&
          player.pos.y - 20 < wall.pos.y + wall.height) ||
        // Moving down (diagonal included)
        (player.dir.y > 0 &&
          player.pos.y + 20 <= wall.pos.y &&
          player.pos.x + 20 > wall.pos.x &&
          player.pos.x - 20 < wall.pos.x + wall.width) ||
        // Moving up (diagonal included)
        (player.dir.y < 0 &&
          player.pos.y - 20 >= wall.pos.y + wall.height &&
          player.pos.x + 20 > wall.pos.x &&
          player.pos.x - 20 < wall.pos.x + wall.width) ||
        // Diagonal towards top-right
        (player.dir.x > 0 &&
          player.dir.y < 0 &&
          player.pos.x + 20 <= wall.pos.x &&
          player.pos.y - 20 >= wall.pos.y + wall.height) ||
        // Diagonal towards bottom-right
        (player.dir.x > 0 &&
          player.dir.y > 0 &&
          player.pos.x + 20 <= wall.pos.x &&
          player.pos.y + 20 <= wall.pos.y) ||
        // Diagonal towards top-left
        (player.dir.x < 0 &&
          player.dir.y < 0 &&
          player.pos.x - 20 >= wall.pos.x + wall.width &&
          player.pos.y - 20 >= wall.pos.y + wall.height) ||
        // Diagonal towards bottom-left
        (player.dir.x < 0 &&
          player.dir.y > 0 &&
          player.pos.x - 20 >= wall.pos.x + wall.width &&
          player.pos.y + 20 <= wall.pos.y));

    if (movingTowardsWall) {
      player.isPushing = true;
    }
  });

  // Detect when a collision with a wall begins
  onCollide("player", "wall", (player, wall) => {
    activeWallCollisions++;
  });

  // Detect when a collision with a wall ends
  onCollideEnd("player", "wall", (player, wall) => {
    // Decrement the active collision count
    activeWallCollisions = Math.max(0, activeWallCollisions - 1);

    // If there are no active wall collisions, stop pushing
    if (activeWallCollisions === 0) {
      player.isPushing = false;
    }
  });

  // Debug log for visibility
  onUpdate(() => {
    //debug.log("Active Collisions: " + activeWallCollisions);
    //debug.log("Is Pushing: " + player.isPushing);
  });

  // Handle collision between the player and danger entities (game over)
  onCollideUpdate("player", "dangerous", () => {
    debug.log("you lose");
    // Game over
    go("lose", { score: scoreLabel.value });
  });

  // Handle collision between explosion and skeletor (destroy skeletor, increase score)
  let canAttack = true;

  onCollideUpdate("attack", "dangerous", async (attack, enemy) => {
    if (!canAttack) return; // Ignore collisions during cooldown

    // Mark as not able to attack and set a cooldown
    canAttack = false;
    wait(0.3, () => {
      // Adjust the cooldown duration as needed
      canAttack = true;
    });

    wait(1, () => {
      destroy(attack);
    });

    enemy.hurt(1);
    //TODO: bounce back

    // Calculate bounce direction
    const direction = vec2(
      enemy.pos.x - attack.pos.x,
      enemy.pos.y - attack.pos.y
    ).unit();

    // Apply a small push force
    //await enemy.move(direction, 20);

    console.log("Enemy Health: " + enemy.hp());

    if (enemy.hp() <= 0) {
      destroy(enemy);
      //scoreLabel.value++;
      scoreLabel.text = scoreLabel.value;
    }
  });
}
