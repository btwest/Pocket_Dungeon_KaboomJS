export function updateAnimations(player, vector) {
  function setSprite(player, spriteName) {
    if (player.currentSprite !== spriteName) {
      player.use(sprite(spriteName));
      player.currentSprite = spriteName;
    }
  }
  const x = vector.x;
  const y = vector.y;

  switch (true) {
    case x === 0 && y === -1:
      // Moving up
      setSprite(player, "link-walk-up");
      if (player.curAnim() !== "walkup") {
        player.play("walkup");
      }

      break;
    case x === 0 && y === 1:
      // Moving down
      setSprite(player, "link-walk-down");
      if (player.curAnim() !== "walkdown") {
        player.play("walkdown");
      }

      break;
    case x === -1 && y === 0:
      // Moving left
      player.flipX = false;
      setSprite(player, "player-side");
      if (player.curAnim() !== "walk") {
        player.play("walk");
      }
      break;
    case x === 1 && y === 0:
      // Moving right
      player.flipX = true;
      setSprite(player, "player-side");
      if (player.curAnim() !== "walk") {
        player.play("walk");
      }
      break;
    case x === -1 && y === -1:
      // Moving Up-Left
      if (player.curAnim() === "walk") {
        player.flipX = false;
        setSprite(player, "player-side");
      } else if (player.curAnim() === "walkup") {
        setSprite(player, "link-walk-up");
      } else {
        setSprite(player, "link-walk-up");
        if (player.curAnim() !== "walkup") {
          player.play("walkup");
        }
      }
      break;

    case x === 1 && y === -1:
      // Moving Up-Right
      if (player.curAnim() === "walk") {
        player.flipX = true;
        setSprite(player, "player-side");
      } else {
        setSprite(player, "link-walk-up");
        if (player.curAnim() !== "walkup") {
          player.play("walkup");
        }
      }
      break;
    case x === -1 && y === 1:
      // Moving Down-Left
      if (player.curAnim() === "walk") {
        player.flipX = false;
        setSprite(player, "player-side");
      } else {
        setSprite(player, "link-walk-down");
        if (player.curAnim() !== "walkdown") {
          player.play("walkdown");
        }
      }
      break;
    case x === 1 && y === 1:
      // Moving Down-Right
      if (player.curAnim() === "walk") {
        player.flipX = true;
        setSprite(player, "player-side");
      } else {
        setSprite(player, "link-walk-down");
        if (player.curAnim() !== "walkdown") {
          player.play("walkdown");
        }
      }
      break;
    default:
      // No movement
      player.stop();
      break;
  }
}
