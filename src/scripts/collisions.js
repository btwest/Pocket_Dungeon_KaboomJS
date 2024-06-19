import { generateMap } from "./openAI.js";
import { parseMapData } from "./mapParser.js";

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
