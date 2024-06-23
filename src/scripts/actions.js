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

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function handleAction(player, action) {
  switch (action) {
    case "fireblast":
      console.log("spawning kaboom");
      spawnKaboom(player.pos.add(player.dir.scale(48)));
      break;
    case "sword":
      player.attacking = true;
      await wait(200);
      player.attacking = false;
      break;
  }
}
