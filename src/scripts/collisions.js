import { generateMap } from "./openAI.js";
import { parseMapData } from "./mapParser.js";
// Import the local dungeon generation function
import { generateDungeon } from "./generateDungeon.js";
import { k, exitPos, startPos, updateStart } from "./main.js";
import { updatePlayer } from "./player.js";

export function handleCollisions(player, scoreLabel, maps, level) {
  let mapGenerationInProgress = false; // Flag to track map generation

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

  // Cleanup the reversal flag when collision ends
  onCollideEnd("slicer", "dangerous", (slicer, other) => {
    slicer._isReversing = false; // Reset the reversal flag when no longer colliding
  });

  // Handle player walking into wall or object (Push)
  onCollideUpdate("player", "wall", (player, wall) => {
    console.log("player dir: " + player.dir);
    console.log("wall: " + wall.pos);
    console.log("player pos: " + player.pos);

    console.log("Player Bounds:", {
      left: player.pos.x - 20,
      right: player.pos.x + 20,
      top: player.pos.y - 20,
      bottom: player.pos.y + 20,
    });
    console.log("Wall Bounds:", {
      left: wall.pos.x,
      right: wall.pos.x + 48,
      top: wall.pos.y,
      bottom: wall.pos.y + 48,
    });

    // Check if the player is moving towards the wall based on their direction
    const movingTowardsWall =
      player.isMoving && // Ensure the player is moving
      ((player.dir.x > 0 && player.pos.x + 20 <= wall.pos.x) || // Right (moving right)
        (player.dir.x < 0 && player.pos.x - 20 >= wall.pos.x) || // Left (moving left)
        (player.dir.y > 0 && player.pos.y + 20 <= wall.pos.y) || // Down (moving down)
        (player.dir.y < 0 && player.pos.y - 20 >= wall.pos.y)); // Up (moving up)

    console.log(movingTowardsWall);

    if (movingTowardsWall) {
      player.isPushing = true;
    } else {
      player.isPushing = false;
    }
  });

  // Handle collision between the player and danger entities (game over)
  onCollideUpdate("player", "dangerous", () => {
    debug.log("you lose");
    // Game over
    go("lose", { score: scoreLabel.value });
  });

  /*
  // OPEN AI VERSION (DONT DELTE):
  Handle collision between player and next-level objects (advance level)
  onCollideUpdate("player", "next-level", async () => {
    if (mapGenerationInProgress) return; // Prevent multiple API calls

    mapGenerationInProgress = true; // Set flag to true to indicate map generation is in progress

    console.log("Collided with next-level object, generating new map...");

    const openAIMap = await generateMap();
    console.log("Generated OpenAI map data:", openAIMap);

    maps.push(parseMapData(openAIMap));
    console.log(maps);

    // Go to the next level
    go("game", { level: maps.length - 1, score: scoreLabel.value, maps });

    mapGenerationInProgress = false; // Reset flag after map generation is complete
  });*/

  // Alternative function to handle collision between player and next-level objects (advances level)
  onCollideUpdate("player", "next-level", async () => {
    if (mapGenerationInProgress) return; // Prevent multiple map generations

    mapGenerationInProgress = true; // Set flag to indicate map generation is in progress

    console.log("Collided with next-level object, generating new map...");

    try {
      // Generate a new dungeon using the local function (returns an array)
      const newDungeonMap = generateDungeon(exitPos); // Expected to return an array of strings
      console.log("Generated local dungeon map:", newDungeonMap);

      // Directly use the generated map without parsing
      maps.push(newDungeonMap);
      console.log("All maps:", maps);

      // Advance to the next level
      //

      go("game", { level: maps.length - 1, score: scoreLabel.value, maps });
    } catch (error) {
      console.error("Error generating the new dungeon map:", error);
    } finally {
      mapGenerationInProgress = false; // Reset flag after map generation is complete
    }
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
    console.log("DIRECTION:" + direction);

    // Apply a small push force
    //await enemy.move(direction, 20);

    console.log("Enemy Health: " + enemy.hp());

    if (enemy.hp() <= 0) {
      console.log("destroying enemy");
      destroy(enemy);
      scoreLabel.value++;
      scoreLabel.text = scoreLabel.value;
    }
  });
}
