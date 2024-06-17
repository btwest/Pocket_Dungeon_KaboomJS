export function loadAssets() {
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

  loadSpriteAtlas("assets/link_walk_down.png", {
    "link-walk-down": {
      x: 0,
      y: 0,
      width: 96,
      height: 48,
      sliceX: 2,
      sliceY: 1,
      anims: { walkdown: { from: 0, to: 1, speed: 6 } },
    },
  });

  loadSpriteAtlas("assets/link_walk_up.png", {
    "link-walk-up": {
      x: 0,
      y: 0,
      width: 96,
      height: 48,
      sliceX: 2,
      sliceY: 1,
      anims: { walkup: { from: 0, to: 1, speed: 6 } },
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
}
