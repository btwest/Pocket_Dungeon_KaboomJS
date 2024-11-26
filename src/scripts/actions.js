// Function to spawn an explosion effect
function spawnKaboom(p) {
  const obj = add([
    sprite("kaboom"),
    pos(p),
    anchor("center"),
    "kaboom",
    "attack",
    area({ shape: new Rect(vec2(0, 0), 40, 40) }), // Reduced hitbox size (not finalized)
    body({ isStatic: true }),
  ]);
  wait(0.2, () => {
    destroy(obj);
  });
}
// Function to spawn an explosion effect
function spawnSlash(p) {
  const obj = add([
    pos(p),
    anchor("center"),
    "kaboom",
    "attack",
    area({ shape: new Rect(vec2(0, 0), 40, 40) }), // Reduced hitbox size (not finalized)
    //body({ isStatic: true }), don't think hitbox needs body
  ]);
  wait(0.2, () => {
    destroy(obj);
  });
}
/*
function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
} */

export async function handleAction(player, action) {
  switch (action) {
    case "fireblast":
      console.log("spawning kaboom");
      spawnKaboom(player.pos.add(player.dir.scale(48)));
      break;
    case "sword":
      player.isAttacking = true;
      spawnSlash(player.pos.add(player.dir.scale(48)));
      await new Promise((resolve) => setTimeout(resolve, 200));
      player.isAttacking = false;
      break;
  }
}
