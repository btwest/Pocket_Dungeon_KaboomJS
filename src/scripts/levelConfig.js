export function levelConfiguration() {
  return {
    tileWidth: 48,
    tileHeight: 48,
    tiles: {
      t: () => [sprite("top-wall"), area(), body({ isStatic: true }), "wall"],
      b: () => [
        sprite("bottom-wall"),
        area(),
        body({ isStatic: true }),
        "wall",
        "side-wall",
      ],
      l: () => [sprite("left-wall"), area(), body({ isStatic: true }), "wall"],
      r: () => [
        sprite("right-wall"),
        area(),
        body({ isStatic: true }),
        "wall",
        "side-wall",
      ],
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
      "%": () => [
        sprite("lantern-animation", { anim: "flicker" }),
        area(),
        body({ isStatic: true }),
        "wall",
        "top-wall",
        "top-lantern",
      ],
      "&": () => [
        sprite("lantern-animation", { anim: "flicker" }),
        area(),
        anchor("botleft"),
        body({ isStatic: true }),
        "wall",
        "right-lantern",
        "side-wall",
        rotate(90),
      ],
      "`": () => [
        sprite("lantern-animation", { anim: "flicker" }),
        area(),
        anchor("topright"),
        body({ isStatic: true }),
        "wall",
        "left-lantern",
        "side-wall",
        rotate(-90),
      ],
      "@": () => [
        sprite("lantern-animation", { anim: "flicker" }),
        area(),
        anchor("botright"),
        body({ isStatic: true }),
        "wall",
        "bottom-lantern",
        "bottom-wall",
        rotate(-180),
      ], //ENTRANCE DOORS
      "^": () => [sprite("top-door"), area(), body({ isStatic: true })],
      "(": () => [sprite("left-door"), area(), body({ isStatic: true })],
      ")": () => [
        sprite("left-door"),
        area(),
        anchor("botright"),
        body({ isStatic: true }),
        rotate(-180),
      ],
      "-": () => [
        sprite("top-door"),
        area(),
        rotate(-180),
        anchor("botright"),
        body({ isStatic: true }),
      ], //EXIT DOORS
      e: () => [
        sprite("top-door"),
        area(),
        "next-level",
        body({ isStatic: true }),
      ],
      s: () => [
        sprite("left-door"),
        area(),
        "next-level",
        body({ isStatic: true }),
      ],
      g: () => [
        sprite("left-door"),
        area(),
        "next-level",
        anchor("botright"),
        body({ isStatic: true }),
        rotate(-180),
      ],
      d: () => [
        sprite("top-door"),
        area(),
        "next-level",
        rotate(-180),
        anchor("botright"),
        body({ isStatic: true }),
      ],
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
        area({ scale: 0.8 }),
        anchor("center"),
        body(),
        health(2),
        { dir: -1 }, //initial movement direction
      ],
      "!": () => [
        sprite("skeletor"),
        "dangerous",
        "skeletor",
        anchor("center"),
        area({ shape: new Rect(vec2(0, 0), 40, 40) }),
        body(),
        health(2),
        { dir: -1, timer: 0 },
      ],
    },
  };
}
