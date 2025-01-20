export function loadAssets() {
  // Load Player Sprites
  loadSprite("link-left", "assets/link_left.png");
  loadSprite("link-right", "assets/link_right.png");
  loadSprite("link-down", "assets/knight_down.png", {
    sliceX: 1,
    sliceY: 1,
    anims: {
      idle: {
        from: 0,
        to: 0,
      },
    },
  });
  loadSprite("link-up", "assets/knight_up.png", {
    sliceX: 1,
    sliceY: 1,
    anims: {
      idle: {
        from: 0,
        to: 0,
      },
    },
  });
  loadSprite("link-idle-right", "assets/knight_idle_right.png", {
    sliceX: 1,
    sliceY: 1,
    anims: {
      idle: {
        from: 0,
        to: 0,
      },
    },
  });
  loadSprite("link-idle-left", "assets/knight_idle_left.png", {
    sliceX: 1,
    sliceY: 1,
    anims: {
      idle: {
        from: 0,
        to: 0,
      },
    },
  });

  loadSpriteAtlas("assets/knight_walk.png", {
    "player-side": {
      x: 0,
      y: 0,
      width: 96,
      height: 48,
      sliceX: 2,
      sliceY: 1,
      anims: {
        walk: { from: 1, to: 0, speed: 6, loop: true },
      },
    },
  });

  loadSpriteAtlas("assets/knight_walk_down.png", {
    "link-walk-down": {
      x: 0,
      y: 0,
      width: 96,
      height: 48,
      sliceX: 2,
      sliceY: 1,
      anims: { walkdown: { from: 0, to: 1, speed: 6, loop: true } },
    },
  });

  loadSpriteAtlas("assets/knight_walk_up.png", {
    "link-walk-up": {
      x: 0,
      y: 0,
      width: 96,
      height: 48,
      sliceX: 2,
      sliceY: 1,
      anims: { walkup: { from: 1, to: 0, speed: 6, loop: true } },
    },
  });
  /*I
  loadSpriteAtlas("assets/link_slash_side.png", {
    "link-slash-side": {
      x: 0,
      y: 0,
      width: 96,
      height: 48,
      sliceX: 2,
      sliceY: 1,
      anims: { sideslash: { from: 0, to: 1, speed: 6 } },
    },
  });
  
  loadSpriteAtlas("assets/link_slash_up.png", {
    "link-slash-up": {
      x: 0,
      y: 0,
      width: 96,
      height: 48,
      sliceX: 2,
      sliceY: 1,
      anims: { upslash: { from: 0, to: 1, speed: 6 }, anchor: (0, 1) },
      anchor: (0, 0),
    },
  });

  loadSpriteAtlas("assets/link_slash_down.png", {
    "link-slash-down": {
      x: 0,
      y: 0,
      width: 96,
      height: 48,
      sliceX: 2,
      sliceY: 1,
      anims: { downslash: { from: 0, to: 1, speed: 6 } },
    },
  });*/

  loadSpriteAtlas("assets/knight_slash_up_centered.png", {
    "link-slash-up": {
      x: 0,
      y: 0,
      width: 432,
      height: 144,
      sliceX: 3,
      sliceY: 1,
      anims: {
        upslash: {
          from: 0,
          to: 2,
          speed: 15,
          loop: false,
        },
      },
    },
  });

  loadSpriteAtlas("assets/knight_slash_down_centered.png", {
    "link-slash-down": {
      x: 0,
      y: 0,
      width: 432,
      height: 144,
      sliceX: 3,
      sliceY: 1,
      anims: {
        downslash: {
          from: 0,
          to: 2,
          speed: 15,

          loop: false,
        },
      },
      anchor: "topright",
    },
  });

  loadSpriteAtlas("assets/knight_slash_side_centered.png", {
    "link-slash-side": {
      x: 0,
      y: 0,
      width: 432,
      height: 144,
      sliceX: 3,
      sliceY: 1,
      anims: {
        sideslash: {
          from: 0,
          to: 2,
          speed: 15,
          loop: false,
        },
      },
    },
  });

  // Non-Combat Player Animations

  //PUSH
  loadSpriteAtlas("assets/knight_push_atlas.png", {
    "link-push": {
      x: 0,
      y: 0,
      width: 288,
      height: 48,
      sliceX: 6,
      sliceY: 1,
      anims: {
        pushdown: {
          from: 0,
          to: 1,
          speed: 7,
          loop: true,
        },
        pushup: {
          from: 2,
          to: 3,
          speed: 7,
          loop: true,
        },
        pushside: {
          from: 4,
          to: 5,
          speed: 7,
          loop: true,
        },
      },
    },
  });

  // Load Environment Sprites
  // Load Walls
  //loadSprite("left-wall", "assets/left_wall.png");
  //loadSprite("right-wall", "assets/right_wall.png");
  //loadSprite("top-wall", "assets/top_wall.png");
  //loadSprite("bottom-wall", "assets/bottom_wall.png");
  //loadSprite("bottom-left-wall", "assets/bottom_left_wall.png");
  //loadSprite("bottom-right-wall", "assets/bottom_right_wall.png");
  //loadSprite("top-left-wall", "assets/top_left_wall.png");
  //loadSprite("top-right-wall", "assets/top_right_wall.jpg");
  // Load Walls - Gameboy Assets
  loadSpriteAtlas("assets/walls.png", {
    "left-wall": { x: 16, y: 0, width: 16, height: 16 },
    "right-wall": { x: 48, y: 32, width: 16, height: 16 },
    "top-wall": { x: 48, y: 0, width: 16, height: 16 },
    "bottom-wall": { x: 16, y: 32, width: 16, height: 16 },
    "bottom-left-wall": { x: 0, y: 32, width: 16, height: 16 },
    "bottom-right-wall": { x: 48, y: 48, width: 16, height: 16 },
    "top-right-wall": {
      x: 0,
      y: 0,
      width: 16,
      height: 16,
    },
    "top-left-wall": { x: 16, y: 48, width: 16, height: 16 },
    "top-right-exit": { x: 32, y: 0, width: 16, height: 16 },
    "top-left-exit": { x: 16, y: 16, width: 16, height: 16 },
    "bottom-right-exit": { x: 48, y: 16, width: 16, height: 16 },
    "bottom-left-exit": { x: 32, y: 32, width: 16, height: 16 },
  });
  // Load Environment Misc
  loadSprite("top-door", "assets/top_door.png");
  loadSprite("left-door", "assets/left_door.png");
  loadSprite("fire-pot", "assets/fire_pot.png");
  loadSprite("lanterns", "assets/lanterns.png");
  loadSprite("stairs", "assets/stairs.png");
  loadSprite("floor-ensw", "assets/floors/floor_sewers_basic_allExit.png");
  loadSprite("floor-no", "assets/floors/floor_sewers_basic_noExit.png");
  loadSprite("floor-n", "assets/floors/floor_sewers_basic_nExit.png");
  loadSprite("floor-s", "assets/floors/floor_sewers_basic_sExit.png");
  loadSprite("floor-e", "assets/floors/floor_sewers_basic_eExit.png");
  loadSprite("floor-w", "assets/floors/floor_sewers_basic_wExit.png");
  loadSprite("floor-ns", "assets/floors/floor_sewers_basic_nsExit.png");
  loadSprite("floor-ew", "assets/floors/floor_sewers_basic_ewExit.png");
  loadSprite("floor-es", "assets/floors/floor_sewers_basic_esExit.png");
  loadSprite("floor-sw", "assets/floors/floor_sewers_basic_swExit.png");
  loadSprite("floor-en", "assets/floors/floor_sewers_basic_neExit.png");
  loadSprite("floor-nw", "assets/floors/floor_sewers_basic_nwExit.png");
  loadSprite("floor-", "assets/floors/floor_sewers_basic_noExit.png");
  // Pitfall
  loadSpriteAtlas("assets/surground.png", {
    pitfallSingle: {
      x: 0,
      y: 128,
      width: 16,
      height: 16,
    },
    pitfallLeft: {
      x: 16,
      y: 128,
      width: 16,
      height: 16,
    },
    pitfallMiddle: {
      x: 32,
      y: 128,
      width: 16,
      height: 16,
    },
    pitfallRight: {
      x: 48,
      y: 128,
      width: 16,
      height: 16,
    },
  });

  loadSpriteAtlas("assets/gameboydungeon/all_unclassified/props.png", {
    stairsDown: {
      x: 0,
      y: 0,
      width: 16,
      height: 16,
    },
    stairsUp: {
      x: 0,
      y: 16,
      width: 16,
      height: 16,
    },
  });

  //Load UI Eleements
  loadSprite("hudbg", "assets/hudbg.png");

  loadSpriteAtlas("assets/lantern_anim.png", {
    "lantern-animation": {
      x: 0,
      y: 0,
      width: 336,
      height: 48,
      sliceX: 7, // Number of frames horizontally
      sliceY: 1, // Number of frames vertically
      anims: {
        flicker: {
          from: 0,
          to: 6, // Indices of the frames (0-based)
          speed: 3,
          loop: loop,
        },
      },
    },
  });

  // Load Enemy Sprites
  loadSprite("skeletor", "assets/skeletor.png");
  loadSprite("slicer", "assets/slicer.png");

  // Load Effects
  loadSprite("kaboom", "assets/kaboom.png");
}
