export function mapGeneration() {
  return [
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
      "wt%ttt^ttx",
      "l        r",
      "l   !    r",
      "$   {    r",
      "l   *    r",
      "l        r",
      "l    f   r",
      "ybbbbbb%bz",
    ],
  ];
}

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
}
