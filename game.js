// initialize kaboom context
kaboom({
  width: 480,
  height: 432,
  global: true,
  fullscreen: true,
  scale: 1,
  debug: true,
  background: [0, 0, 0],
  showHitboxes: true,
});

// Constants for movement speeds
const MOVE_SPEED = 180;
const SLICER_SPEED = 120;
const SKELETOR_SPEED = 60;

// Load Player Sprites
loadSprite("link-left", "assets/link_left.png");
loadSprite("link-right", "assets/link_right.png");
loadSprite("link-down", "assets/link_down_1.png");
loadSprite("link-up", "assets/link_up.png");
loadSprite("link-idle-right", "assets/link_idle_right.png");
loadSprite("link-idle-left", "assets/link_idle_left.png");

loadSpriteAtlas("assets/link_walk.png", {
  "player-side": {
    x: 0,
    y: 0,
    width: 96,
    height: 48,
    sliceX: 2,
    sliceY: 1,
    anims: { walk: { from: 0, to: 1, speed: 6 } },
  },
});

// Define animations
loadSprite("player-side", "assets/link_idle_left.png", {
  sliceX: 1,
  anims: {
    walk: {
      frames: ["link-left", "link-idle-left"],
      speed: 5,
    },
    idle: {
      frames: ["link-idle-left"],
      speed: 1,
    },
  },
});

// Load Environment Sprites
// Load Walls
loadSprite("left-wall", "assets/left_wall.png");
loadSprite("right-wall", "assets/right_wall.png");
loadSprite("top-wall", "assets/top_wall.png");
loadSprite("bottom-wall", "assets/bottom_wall.png");
loadSprite("bottom-left-wall", "assets/bottom_left_wall.png");
loadSprite("bottom-right-wall", "assets/bottom_right_wall.png");
loadSprite("top-left-wall", "assets/top_left_wall.png");
loadSprite("top-right-wall", "assets/top_right_wall.jpg");
// Load Environment Misc
loadSprite("top-door", "assets/top_door.png");
loadSprite("left-door", "assets/left_door.png");
loadSprite("fire-pot", "assets/fire_pot.png");
loadSprite("lanterns", "assets/lanterns.png");
loadSprite("stairs", "assets/stairs.png");
loadSprite("floor", "assets/floor_border_offwhite.png");

// Load Enemy Sprites
loadSprite("skeletor", "assets/skeletor.png");
loadSprite("slicer", "assets/slicer.png");

// Load Effects
loadSprite("kaboom", "assets/kaboom.png");

// Define the main game scene
scene("game", ({ level, score }) => {
  const maps = [
    [
      "wt%ttt^ttx",
      "l        r",
      "l        r",
      "l        r",
      "$        r",
      "l        r",
      "l        r",
      "ybbbbbb%bz",
    ],
    [
      "wt%ttt^ttx",
      "l        r",
      "l      * r",
      "l        r",
      "$    f   r",
      "l        r",
      "l   *    r",
      "ybbbbbb%bz",
    ],
    [
      "wttttttttx",
      "l        r",
      "%   {    %",
      "l        r",
      "l        r",
      "l      ! r",
      "%        %",
      "ybbbbbbbbz",
    ], // AI Generated Level
    [
      "wttttttttx",
      "l   *    r",
      "l        r",
      "$   f    %",
      "l        r",
      "l      ! r",
      "l        r",
      "ybbbbbb%bz",
    ],
  ];

  // Configuration for the level tiles
  const levelCfg = {
    tileWidth: 48,
    tileHeight: 48,
    tiles: {
      t: () => [sprite("top-wall"), area(), body({ isStatic: true }), "wall"],
      b: () => [
        sprite("bottom-wall"),
        area(),
        body({ isStatic: true }),
        "wall",
      ],
      l: () => [sprite("left-wall"), area(), body({ isStatic: true }), "wall"],
      r: () => [sprite("right-wall"), area(), body({ isStatic: true }), "wall"],
      w: () => [
        sprite("top-left-wall"),
        area(),
        body({ isStatic: true }),
        "wall",
      ],
      x: () => [
        sprite("top-right-wall"),
        area(),
        body({ isStatic: true }),
        "wall",
      ],
      y: () => [
        sprite("bottom-left-wall"),
        area(),
        body({ isStatic: true }),
        "wall",
      ],
      z: () => [
        sprite("bottom-right-wall"),
        area(),
        body({ isStatic: true }),
        "wall",
      ],
      "%": () => [sprite("lanterns"), area(), body({ isStatic: true }), "wall"],
      "^": () => [
        sprite("top-door"),
        area(),
        body({ isStatic: true }),
        "next-level",
      ],
      $: () => [sprite("left-door")],
      f: () => [sprite("fire-pot"), area(), body({ isStatic: true })],
      "{": () => [
        sprite("stairs"),
        area(),
        body({ isStatic: true }),
        "next-level",
      ],
      "*": () => [
        sprite("slicer"),
        "slicer",
        "dangerous",
        area(),
        body(),
        { dir: -1 },
      ],
      "!": () => [
        sprite("skeletor"),
        "dangerous",
        "skeletor",
        area(),
        body(),
        { dir: -1, timer: 0 },
      ],
    },
  };

  // Add background and UI layers
  const bg = add([fixed(), z(0)]);
  const ui = add([fixed(), z(2)]);

  // add the level to the scene
  addLevel(maps[level], levelCfg);

  // add the floor sprite
  bg.add([sprite("floor"), z(0)]);

  // add the score label
  const scoreLabel = ui.add([text("0"), pos(400, 450), { value: score }]);

  // Render Player Character
  const player = add([
    sprite("link-idle-right"),
    "player",
    area({ shape: new Rect(vec2(5, 5), 40, 40) }), //Reduced hitbox size (not finalized)
    body(),
    pos(5, 190),
    { dir: vec2(1, 0) },
    { currentSprite: "link-idle-right" },
  ]);
  player.flipX = false;

  let tick = 0;
  onUpdate(() => {
    tick++;
    if (
      (isKeyDown("down") ||
        isKeyDown("up") ||
        isGamepadButtonDown("dpad-down") ||
        isGamepadButtonDown("dpad-up")) &&
      tick % 20 === 0
    ) {
      player.flipX = !player.flipX;
    }
  });

  function setSprite(player, spriteName) {
    if (player.currentSprite !== spriteName) {
      player.use(sprite(spriteName));
      player.currentSprite = spriteName;
    }
  }

  // Define keyboard player movement controls
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
    setSprite(player, "link-up"), player.move(0, -MOVE_SPEED);
    player.dir = vec2(0, -1);
  });

  onKeyDown("down", () => {
    setSprite(player, "link-down"), player.move(0, MOVE_SPEED);
    player.dir = vec2(0, 1);
  });

  // Define Gamepad player movement controls

  let movementVector = vec2(0, 0);

  onGamepadButtonDown("dpad-left", () => {
    player.flipX = false;
    if (player.curAnim() !== "walk") {
      setSprite(player, "player-side");
      player.play("walk");
    }
    movementVector.x = -1;
  });

  onGamepadButtonDown("dpad-right", () => {
    player.flipX = true;
    if (player.curAnim() !== "walk") {
      setSprite(player, "player-side");
      player.play("walk");
    }
    movementVector.x = 1;
  });

  onGamepadButtonDown("dpad-up", () => {
    setSprite(player, "link-up");
    movementVector.y = -1;
  });

  onGamepadButtonDown("dpad-down", () => {
    setSprite(player, "link-down");
    movementVector.y = 1;
  });

  onGamepadButtonRelease("dpad-left", () => {
    if (movementVector.x === -1) movementVector.x = 0; // Only reset if this key was held
  });

  onGamepadButtonRelease("dpad-right", () => {
    if (movementVector.x === 1) movementVector.x = 0; // Only reset if this key was held
  });

  onGamepadButtonRelease("dpad-up", () => {
    if (movementVector.y === -1) movementVector.y = 0; // Only reset if this key was held
  });

  onGamepadButtonRelease("dpad-down", () => {
    if (movementVector.y === 1) movementVector.y = 0; // Only reset if this key was held
  });

  // Update movement continuously in the game loop
  onUpdate(() => {
    if (movementVector.len() > 0) {
      let normalizedVector = movementVector.unit();
      debug.log(normalizedVector);
      player.move(normalizedVector.scale(MOVE_SPEED));
    } else {
      player.move(vec2(0, 0)); // Stop the player if no direction is pressed
    }
  });

  // Handle gamepad Connection
  onGamepadConnect((gamepad) => {
    debug.log(`Gamepad connected: ${gamepad.index}`);
  });

  onGamepadDisconnect((gamepad) => {
    debug.log(`Gamepad disconnected: ${gamepad.index}`);
  });

  // Function to spawn an explosion effect
  function spawnKaboom(p) {
    const obj = add([
      sprite("kaboom"),
      pos(p),
      "kaboom",
      area(),
      body({ isStatic: true }),
    ]);
    wait(1, () => {
      destroy(obj);
    });
  }

  // Define action for hte space key (spawn explosion)
  onKeyPress("space", () => {
    spawnKaboom(player.pos.add(player.dir.scale(48)));
  });

  // Update slicer enemies' movement
  onUpdate("slicer", (s) => {
    s.move(s.dir * SLICER_SPEED, 0);
  });

  // Update skeletor enemies' movement
  onUpdate("skeletor", (s) => {
    s.move(0, s.dir * SKELETOR_SPEED);
    s.timer -= dt();
    if (s.timer <= 0) {
      s.dir = -s.dir;
      s.timer = rand(5);
    }
  });
  // Handle collision between dangerous entites and walls
  onCollideUpdate("dangerous", "wall", (s) => {
    s.dir = -s.dir;
  });

  // Handle collision between the player and danger entities (game over)
  onCollideUpdate("player", "dangerous", () => {
    debug.log("you lose");
    //game over
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
});

// Define the lose scene
scene("lose", ({ score }) => {
  add([text(score, 32), anchor("center"), pos(width() / 2, height() / 2)]);
});

// Start the game with initial level and score
go("game", { level: 0, score: 0 });
