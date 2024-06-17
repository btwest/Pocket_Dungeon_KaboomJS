export function handleCollisions(player, scoreLabel, maps, level) {
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
  onCollideUpdate("player", "next-level", () => {
    go("game", { level: (level + 1) % maps.length, score: scoreLabel.value });
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
