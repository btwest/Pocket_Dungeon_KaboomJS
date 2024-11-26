export function updateAnimations(
  player,
  vector,
  isAttacking,
  isPushing,
  isMoving
) {
  console.log(player.curAnim());
  //console.log(player.curAnim());

  function setSprite(player, spriteName) {
    if (player.currentSprite !== spriteName) {
      player.use(sprite(spriteName));
      player.currentSprite = spriteName;
    }
  }
  function vec2Equals(v1, v2) {
    return v1.x === v2.x && v1.y === v2.y;
  }
  const x = vector.x;
  const y = vector.y;
  //console.log("x: " + x + " y: " + y);
  //Determine isPushing if player is moving and there is wall infront of player isPushing = true
  if (isPushing) {
    // Handle push animations
    switch (true) {
      case vec2Equals(player.dir, vec2(0, -1)):
        setSprite(player, "link-push");
        if (player.curAnim() !== "pushup") {
          player.play("pushup");
        }
        break;
      case vec2Equals(player.dir, vec2(0, 1)):
        setSprite(player, "link-push");
        if (player.curAnim() !== "pushdown") {
          player.play("pushdown");
        }
        break;
      case vec2Equals(player.dir, vec2(-1, 0)):
        player.flipX = false;
        setSprite(player, "link-push");
        if (player.curAnim() !== "pushside") {
          player.play("pushside");
        }
        break;
      case vec2Equals(player.dir, vec2(1, 0)):
        player.flipX = true;
        setSprite(player, "link-push");
        if (player.curAnim() !== "pushside") {
          player.play("pushside");
        }
        break;
    }
    return; // Exit early, as pushing takes priority
  }
  if (isAttacking) {
    //Handle slash animations depending on vector
    switch (true) {
      case vec2Equals(player.dir, vec2(0, -1)):
        // Player slash up
        setSprite(player, "link-slash-up");
        if (player.curAnim() !== "upslash") {
          player.play("upslash");
        }
        break;
      case vec2Equals(player.dir, vec2(0, 1)):
        // Player slash down
        setSprite(player, "link-slash-down");
        if (player.curAnim() !== "downslash") {
          player.play("downslash");
        }
        break;
      case vec2Equals(player.dir, vec2(-1, 0)):
        // Player slash left
        player.flipX = false;
        setSprite(player, "link-slash-side");
        if (player.curAnim() !== "sideslash") {
          player.play("sideslash");
        }
        break;
      case vec2Equals(player.dir, vec2(1, 0)):
        // Player slash right
        player.flipX = true;
        setSprite(player, "link-slash-side");
        if (player.curAnim() !== "sideslash") {
          player.play("sideslash");
        }
        break;
    }
  } else {
    // WALKING
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
          // Player was walking sideways, keep the side animation
          //console.log(player.sprite);
          //console.log(player.curAnim());
          player.flipX = false;
          setSprite(player, "player-side");
          if (player.curAnim() !== "walk") {
            player.play("walk");
          }
        } else if (player.curAnim() === "walkup") {
          // Player was walking up, continue with up animation
          //console.log(player.sprite);
          //console.log(player.curAnim());
          setSprite(player, "link-walk-up");
          if (player.curAnim() !== "walkup") {
            player.play("walkup");
          }
        } else {
          // Default to walkup if not walking previously
          //console.log(player.sprite);
          //console.log(player.curAnim());
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
        //Show Idle sprite
        switch (true) {
          case vec2Equals(player.dir, vec2(0, -1)):
            // Player Not moving, facing up
            setSprite(player, "link-up");
            player.play("idle");
            break;
          case vec2Equals(player.dir, vec2(0, 1)):
            // Player Not moving, facing up

            setSprite(player, "link-down");
            player.play("idle");
            break;
          case vec2Equals(player.dir, vec2(-1, 0)):
            // Player Not moving, facing up
            player.flipX = false;
            setSprite(player, "link-idle-left");
            player.play("idle");
            break;
          case vec2Equals(player.dir, vec2(1, 0)):
            // Player Not moving, facing right
            setSprite(player, "link-idle-right");
            player.play("idle");
            break;
        }
        break;
    }
  }
}
