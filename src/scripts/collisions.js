import { generateMap } from "./openAI.js";
import { parseMapData } from "./mapParser.js";
// Import the local dungeon generation function
import { generateDungeon } from "./generateDungeon.js";
import { exitPos, startPos, updateStart } from "./main.js";
import { updatePlayer } from "./player.js";

export function handleCollisions(player, scoreLabel, maps, level) {
  let mapGenerationInProgress = false; // Flag to track map generation
  // Handle collision between dangerous entities and walls
  onCollideUpdate("dangerous", "wall", (s) => {
    s.dir = -s.dir;
  });

  // Handle collision between the player and danger entities (game over)
  onCollideUpdate("player", "dangerous", () => {
    debug.log("you lose");
    // Game over
    go("lose", { score: scoreLabel.value });
  });
  /*
  // Handle collision between player and next-level objects (advance level)
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
  onCollideUpdate("kaboom", "dangerous", (k, s) => {
    wait(1, () => {
      destroy(k);
    });
    destroy(s);
    scoreLabel.value++;
    scoreLabel.text = scoreLabel.value;
  });
}
