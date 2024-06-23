const MOVE_SPEED = 180;

export function setupPlayer() {
  const player = add([
    sprite("link-idle-right"),
    "player",
    area({ shape: new Rect(vec2(5, 5), 40, 40) }), // Reduced hitbox size (not finalized)
    body(),
    anchor("center"),
    pos(53, 190),
    { dir: vec2(1, 0) },
    { currentSprite: "link-idle-right" },
    { flipTime: 0 },
    { item1: "sword" },
    { attacking: false },
  ]);
  player.flipX = false;
  return player;
}

export function updatePlayer(player, movementVector, attacking) {
  if (!attacking) {
    if (movementVector.len() > 0) {
      let normalizedVector = movementVector.unit();
      player.move(normalizedVector.scale(MOVE_SPEED));
    } else {
      player.move(vec2(0, 0)); // Stop the player if no direction is pressed
    }
  }
}
