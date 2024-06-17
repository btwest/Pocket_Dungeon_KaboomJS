import { handleAction } from "./actions.js";

export function setupKeyboardControls(player) {
  onKeyDown("left", () => {
    player.flipX = false;
    if (player.curAnim() !== "walk") {
      setSprite(player, "player-side");
      player.play("walk");
    }
    player.move(-MOVE_SPEED, 0);
    player.dir = vec2(-1, 0);
  });

  onKeyDown("right", () => {
    player.flipX = true;
    if (player.curAnim() !== "walk") {
      setSprite(player, "player-side");
      player.play("walk");
    }
    player.move(MOVE_SPEED, 0);
    player.dir = vec2(1, 0);
  });

  onKeyDown("up", () => {
    setSprite(player, "link-up");
    player.move(0, -MOVE_SPEED);
    player.dir = vec2(0, -1);
  });

  onKeyDown("down", () => {
    setSprite(player, "link-down");
    player.move(0, MOVE_SPEED);
    player.dir = vec2(0, 1);
  });
}

export function setupGamepadControls(player, movementVector) {
  /*
  // Log all gamepad button presses and releases to identify D-pad mappings
  onGamepadButtonDown((btn) => {
    console.log(`Button ${btn} pressed`);
  });

  onGamepadButtonRelease((btn) => {
    console.log(`Button ${btn} released`);
  });*/
  // Handle gamepad Connection
  onGamepadConnect((gamepad) => {
    console.log(`Gamepad connected: ${gamepad.index}`);
  });

  onGamepadDisconnect((gamepad) => {
    console.log(`Gamepad disconnected: ${gamepad.index}`);
  });

  onGamepadButtonDown("dpad-left", () => {
    movementVector.x = -1;
    player.dir = vec2(-1, 0);
  });

  onGamepadButtonDown("dpad-right", () => {
    movementVector.x = 1;
    player.dir = vec2(1, 0);
  });

  onGamepadButtonDown("dpad-up", () => {
    movementVector.y = -1;
    player.dir = vec2(0, -1);
  });

  onGamepadButtonDown("dpad-down", () => {
    movementVector.y = 1;
    player.dir = vec2(0, 1);
  });

  onGamepadButtonRelease("dpad-left", () => {
    if (movementVector.x === -1) movementVector.x = 0;
  });

  onGamepadButtonRelease("dpad-right", () => {
    if (movementVector.x === 1) movementVector.x = 0;
  });

  onGamepadButtonRelease("dpad-up", () => {
    if (movementVector.y === -1) movementVector.y = 0;
  });

  onGamepadButtonRelease("dpad-down", () => {
    if (movementVector.y === 1) movementVector.y = 0;
  });

  onGamepadButtonPress("east", () => {
    handleAction(player, player.item1);
  });
}

function setSprite(player, spriteName) {
  if (player.currentSprite !== spriteName) {
    player.use(sprite(spriteName));
    player.currentSprite = spriteName;
  }
}
