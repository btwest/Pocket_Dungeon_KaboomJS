export function levelConfiguration() {
  return {
    tileWidth: 48,
    tileHeight: 48,
    tiles: {
      t: () => [
        sprite("top-wall"),
        area(),
        body({ isStatic: true }),
        scale(3),
        "wall",
      ],
      b: () => [
        sprite("bottom-wall"),
        area(),
        body({ isStatic: true }),
        scale(3),
        "wall",
        "side-wall",
      ],
      l: () => [
        sprite("left-wall"),
        area(),
        body({ isStatic: true }),
        scale(3),
        "wall",
      ],
      r: () => [
        sprite("right-wall"),
        area(),
        body({ isStatic: true }),
        scale(3),
        "wall",
        "side-wall",
      ],
      w: () => [
        sprite("top-left-wall"),
        area(),
        body({ isStatic: true }),
        scale(3),
        "wall",
      ],
      x: () => [
        sprite("top-right-wall"),
        area(),
        body({ isStatic: true }),
        scale(3),
        "wall",
      ],
      y: () => [
        sprite("bottom-left-wall"),
        area(),
        body({ isStatic: true }),
        scale(3),
        "wall",
      ],
      z: () => [
        sprite("bottom-right-wall"),
        area(),
        body({ isStatic: true }),
        scale(3),
        "wall",
      ],
      "~": () => [
        sprite("top-right-exit"),
        area(),
        body({ isStatic: true }),
        scale(3),
        "wall",
      ],
      "`": () => [
        sprite("top-left-exit"),
        area(),
        body({ isStatic: true }),
        scale(3),
        "wall",
      ],
      q: () => [
        sprite("bottom-right-exit"),
        area(),
        body({ isStatic: true }),
        scale(3),

        "wall",
      ],
      a: () => [
        sprite("bottom-left-exit"),
        area(),
        body({ isStatic: true }),
        scale(3),

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
      f: () => [
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
      p: () => [
        sprite("pitfallSingle"),
        area({
          scale: vec2(0.2, 0.2), // Scale the hitbox to 50% of the original size
          offset: vec2(6, 6), // Center it: (16 - (16 * 0.5)) / 2 = 4
        }),
        scale(3),
        "dangerous",
        "pitfall",
        body({ isStatic: true }),
      ],
      k: () => [
        sprite("pitfallLeft"),
        area({
          scale: vec2(0.2, 0.2), // Scale the hitbox to 50% of the original size
          offset: vec2(6, 6), // Center it: (16 - (16 * 0.5)) / 2 = 4
        }),
        scale(3),
        "dangerous",
        "pitfall",
        body({ isStatic: true }),
      ],
      m: () => [
        sprite("pitfallMiddle"),
        area({
          scale: vec2(0.2, 0.2), // Scale the hitbox to 50% of the original size
          offset: vec2(6, 6), // Center it: (16 - (16 * 0.5)) / 2 = 4
        }),
        scale(3),
        "dangerous",
        "pitfall",
        body({ isStatic: true }),
      ],
      o: () => [
        sprite("pitfallRight"),
        area({
          scale: vec2(0.2, 0.2), // Scale the hitbox to 50% of the original size
          offset: vec2(6, 6), // Center it: (16 - (16 * 0.5)) / 2 = 4
        }),
        scale(3),
        "dangerous",
        "pitfall",
        body({ isStatic: true }),
      ],
      f: () => [sprite("fire-pot"), area(), body({ isStatic: true })],
      "{": () => [
        sprite("stairsDown"),
        area(),
        scale(3),
        body({ isStatic: true }),
        "next-level",
      ],
      "*": () => [
        sprite("slicer"),
        "slicer",
        "dangerous",
        area({ scale: 0.8, offset: vec2(6, 6) }),
        z(2),
        body(),
        { dir: -1 }, //initial movement direction
      ],
      "!": () => [
        sprite("skeletor"),
        "dangerous",
        "skeletor",

        area({ shape: new Rect(vec2(0, 0), 40, 40) }),
        body(),
        health(2),
        { dir: -1, timer: 0 },
        z(2),
      ],
    },
  };
}
