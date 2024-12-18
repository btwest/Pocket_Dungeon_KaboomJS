import { startPos } from "./main.js";
const MOVE_SPEED = 180;
const TILE_SIZE = 48;

export function setupPlayer() {
  console.log("SETTING UP PLAYER");
  let playerPosX = startPos.col * TILE_SIZE + TILE_SIZE / 2;
  let playerPosY = startPos.row * TILE_SIZE + TILE_SIZE / 2;

  const player = add([
    sprite("link-idle-right"),
    anchor("center"),
    "player",
    area({ shape: new Rect(vec2(0, 0), 40, 40) }), // Reduced hitbox size (not finalized)
    body(),
    pos(playerPosX, playerPosY),
    {
      dir: vec2(1, 0),
      flipTime: 0,
      item1: "sword",
      isAttacking: false,
      isPushing: false,
      isMoving: false,
    },
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
