// Function to spawn an explosion effect
function spawnKaboom(p) {
  const obj = add([
    sprite("kaboom"),
    pos(p),
    "kaboom",
    area(),
    body({ isStatic: true }),
  ]);
  wait(0.5, () => {
    destroy(obj);
  });
}

export function handleAction(player, action) {
  switch (action) {
    case "fireblast":
      spawnKaboom(player.pos.add(player.dir.scale(48)));
  }
}
