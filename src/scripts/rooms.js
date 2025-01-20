// Symbol representations for various room exit configurations
export const rooms = {
  allExit: [
    "wtt`  ~ttx",
    "l        r",
    "`        ~",
    "          ",
    "          ",
    "a        q",
    "l        r",
    "ybba  qbbz",
  ],
  noExit: [
    "wttttttttx",
    "l        r",
    "l        r",
    "l        r",
    "l        r",
    "l        r",
    "l        r",
    "ybbbbbbbbz",
  ],
  nExit: [
    "wtt`  ~ttx",
    "l        r",
    "l        r",
    "l        r",
    "l        r",
    "l        r",
    "l        r",
    "ybbbbbbbbz",
  ],
  sExit: [
    "wttttttttx",
    "l        r",
    "l        r",
    "l        r",
    "l        r",
    "l        r",
    "l        r",
    "ybba  qbbz",
  ],
  eExit: [
    "wttttttttx",
    "l        r",
    "l        ~",
    "l         ",
    "l         ",
    "l        q",
    "l        r",
    "ybbbbbbbbz",
  ],
  wExit: [
    "wttttttttx",
    "l        r",
    "`        r",
    "         r",
    "         r",
    "a        r",
    "l        r",
    "ybbbbbbbbz",
  ],
  nsExit: [
    "wtt`  ~ttx",
    "l        r",
    "l        r",
    "l        r",
    "l        r",
    "l        r",
    "l        r",
    "ybba  qbbz",
  ],
  neExit: [
    "wtt`  ~ttx",
    "l        r",
    "l        ~",
    "l         ",
    "l         ",
    "l        q",
    "l        r",
    "ybbbbbbbbz",
  ],
  nwExit: [
    "wtt`  ~ttx",
    "l        r",
    "`        r",
    "         r",
    "         r",
    "a        r",
    "l        r",
    "ybbbbbbbbz",
  ],
  swExit: [
    "wttttttttx",
    "l        r",
    "`        r",
    "         r",
    "         r",
    "a        r",
    "l        r",
    "ybba  qbbz",
  ],
  seExit: [
    "wttttttttx",
    "l        r",
    "l        ~",
    "l         ",
    "l         ",
    "l        q",
    "l        r",
    "ybba  qbbz",
  ],
  ewExit: [
    "wttttttttx",
    "l        r",
    "`        ~",
    "          ",
    "          ",
    "a        q",
    "l        r",
    "ybbbbbbbbz",
  ],
  nswExit: [
    "wtt`  ~ttx",
    "l        r",
    "l        r",
    "l        r",
    "l        r",
    "l        r",
    "l        r",
    "ybba  qbbz",
  ],
  nesExit: [
    "wtt`  ~ttx",
    "l        r",
    "l        ~",
    "l         ",
    "l         ",
    "l        q",
    "l        r",
    "ybba  qbbz",
  ],
  neswExit: [
    "wttttttttx",
    "l        r",
    "l        ~",
    "l         ",
    "l         ",
    "l        q",
    "l        r",
    "ybba  qbbz",
  ],
  empty: [
    "          ",
    "          ",
    "          ",
    "          ",
    "          ",
    "          ",
    "          ",
    "          ",
  ],
};

export const nsRooms = {
  nsSlicer: [
    "wtt`  ~ttx",
    "l        r",
    "l       *r",
    "l        r",
    "l        r",
    "l        r",
    "l*       r",
    "ybba  qbbz",
  ],
  nsSkeletor: [
    "wtt`  ~ttx",
    "l        r",
    "l        r",
    "l  !     r",
    "l        r",
    "l        r",
    "l        r",
    "ybba  qbbz",
  ],
};

export const esRooms = {
  es2Skeletors: [
    "wttttttttx",
    "l        r",
    "l       !~",
    "l         ",
    "l       ! ",
    "l        q",
    "l        r",
    "ybba  qbbz",
  ],
  esMix: [
    "wttttttttx",
    "l        r",
    "l        ~",
    "l       ! ",
    "l         ",
    "l  *     q",
    "l        r",
    "ybba  qbbz",
  ],
};
export const ewRooms = {
  ew2Skeletors: [
    "wttttttttx",
    "l        r",
    "`        ~",
    "        ! ",
    "  !       ",
    "a        q",
    "l        r",
    "ybbbbbbbbz",
  ],
  ewMixed: [
    "wttttttttx",
    "l        r",
    "`  *     ~",
    "          ",
    "          ",
    "a        q",
    "l *      r",
    "ybbbbbbbbz",
  ],
};

export const bossRooms = {
  nExit: [
    "wtt`  ~ttx",
    "l        r",
    "l        r",
    "l        r",
    "l        r",
    "l   {    r",
    "l        r",
    "ybbbbbbbbz",
  ],
  sExit: [
    "wttttttttx",
    "l        r",
    "l   {    r",
    "l        r",
    "l        r",
    "l        r",
    "l        r",
    "ybba  qbbz",
  ],
  eExit: [
    "wttttttttx",
    "l        r",
    "l        ~",
    "l         ",
    "l {       ",
    "l        q",
    "l        r",
    "ybbbbbbbbz",
  ],
  wExit: [
    "wttttttttx",
    "l        r",
    "`        r",
    "         r",
    "       { r",
    "a        r",
    "l        r",
    "ybbbbbbbbz",
  ],
};

// Randomly select either ew2Skeletors or ewMixed
const fetchRandomChamber = (rooms) => {
  const roomKeys = Object.keys(rooms); // ['ew2Skeletors', 'ewMixed']
  const randomKey = roomKeys[Math.floor(Math.random() * roomKeys.length)];
  return rooms[randomKey];
};

// Function to map room exits to the corresponding symbol matrix
export function mapChamberToLayout(room) {
  if (!room) return rooms.empty; // Null room: shouldnt be needed since dungeonGrid is intialized with empty rooms
  // Handle special room types
  //if (room.type === "entrance") return rooms.allExit;
  //if (room.type === "boss") return rooms.allExit;

  // Sort the exits array and join to form the exitKey
  const exitKey = room.exits.sort().join("");

  // Match the exits to a corresponding symbol matrix
  switch (exitKey) {
    case "n":
      if (room.type == "Boss") {
        return bossRooms.nExit;
      }
      return rooms.nExit; //Debug: changed to AlLExit
    case "s":
      if (room.type == "Boss") {
        return bossRooms.sExit;
      }
      return rooms.sExit;
    case "e":
      if (room.type == "Boss") {
        return bossRooms.eExit;
      }
      return rooms.eExit;
    case "w":
      if (room.type == "Boss") {
        return bossRooms.wExit;
      }
      return rooms.wExit;
    case "ns":
      return fetchRandomChamber(nsRooms);
    case "ne":
      return rooms.neExit;
    case "nw":
      return rooms.nwExit;
    case "es": // Previously "se"
      return fetchRandomChamber(esRooms);
    case "sw": // Change to "ws"
      return rooms.swExit;
    case "ew":
      return fetchRandomChamber(ewRooms);
    case "nsw":
      return rooms.nswExit;
    case "ens":
      return rooms.nesExit; // Change to match sorted "ens"
    case "ensw":
      return rooms.neswExit; // Change to match sorted "ensw"
    default:
      return rooms.allExit; // Default to empty room if no match
  }
}

export function assignChamberLayout(dungeonGrid) {
  for (let row of dungeonGrid) {
    for (let chamber of row) {
      if (chamber != null) {
        chamber.layout = mapChamberToLayout(chamber);
      }
    }
  }
}

export function compileDungeonMap(dungeonGrid) {
  let dungeonMap = [];

  for (let row of dungeonGrid) {
    for (let i = 0; i < 8; i++) {
      let dungeonRow = [];
      for (let chamber of row) {
        let chamberMap = chamber == null ? rooms.empty : chamber.layout;
        let chamberRow = chamberMap[i];
        dungeonRow.push(...chamberRow);
      }
      dungeonMap.push(dungeonRow.join(""));
    }
  }
  return dungeonMap;
}
