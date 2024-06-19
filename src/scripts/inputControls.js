import { handleAction } from "./actions.js";

export function setupKeyboardControls(player, movementVector) {
  // Handle keyboard movement
  onKeyDown("left", () => {
    movementVector.x = -1;
    player.dir = vec2(-1, 0);
  });

  onKeyDown("right", () => {
    movementVector.x = 1;
    player.dir = vec2(1, 0);
  });

  onKeyDown("up", () => {
    movementVector.y = -1;
    player.dir = vec2(0, -1);
  });

  onKeyDown("down", () => {
    movementVector.y = 1;
    player.dir = vec2(0, 1);
  });

  // Handle stopping movement when key is released
  onKeyRelease("left", () => {
    if (movementVector.x === -1) movementVector.x = 0;
  });

  onKeyRelease("right", () => {
    if (movementVector.x === 1) movementVector.x = 0;
  });

  onKeyRelease("up", () => {
    if (movementVector.y === -1) movementVector.y = 0;
  });

  onKeyRelease("down", () => {
    if (movementVector.y === 1) movementVector.y = 0;
  });

  // Handle action (assuming "space" key for this example)
  onKeyPress("space", () => {
    handleAction(player, player.item1); // Adjust this as needed for your game
  });
}
export function setupGamepadControls(player, movementVector) {
  // Log all gamepad button presses and releases to identify D-pad mappings
  onGamepadButtonDown((btn) => {
    console.log(`Button ${btn} pressed`);
  });

  onGamepadButtonRelease((btn) => {
    console.log(`Button ${btn} released`);
  });
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
