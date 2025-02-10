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
  nsSlicers: [
    "wtt`  ~ttx",
    "l       *r",
    "l   ko   r",
    "l   !    r",
    "l        r",
    "l   ko   r",
    "l*       r",
    "ybba  qbbz",
  ],
  nsSkeletors: [
    "wtt`  ~ttx",
    "l  !     r",
    "l   kmmmor",
    "l      ! r",
    "l        r",
    "lkmmmo   r",
    "l        r",
    "ybba  qbbz",
  ],
  nsSlicers: [
    "wtt`  ~ttx",
    "lkmo  kmor",
    "l       *r",
    "l        r",
    "l        r",
    "l*       r",
    "lkmo  kmor",
    "ybba  qbbz",
  ],
  nsSlicers: [
    "wtt`  ~ttx",
    "lkmo  kmor",
    "l*      *r",
    "l        r",
    "l        r",
    "l   **   r",
    "lkmo  kmor",
    "ybba  qbbz",
  ],
  ns2SlicersOffset: [
    "wtt`  ~ttx",
    "l        r",
    "lkmmmo  *r",
    "l        r",
    "l        r",
    "l*  kmmmor",
    "l        r",
    "ybba  qbbz",
  ],
  nsSlicerandSkeletorOffset1: [
    "wtt`  ~ttx",
    "l        r",
    "lkmmmo!  r",
    "l        r",
    "l        r",
    "l*    kmor",
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
  seOneSlicer: [
    "wttttttttx",
    "lkmmmmmmor",
    "l        ~",
    "l         ",
    "l         ",
    "l*       q",
    "lkmo  kmor",
    "ybba  qbbz",
  ],
  seOneSlicerandSkeletorOffset: [
    "wttttttttx",
    "l        r",
    "lkmmmmmmo~",
    "l !       ",
    "l         ",
    "l   kmmmoq",
    "l       *r",
    "ybba  qbbz",
  ],
  seTwoSkeletors: [
    "wttttttttx",
    "lkmmmmmmor",
    "l        ~",
    "l         ",
    "l !    !  ",
    "l        q",
    "lkmo  kmor",
    "ybba  qbbz",
  ],
};
export const ewRooms = {
  ew1: [
    "wttttttttx",
    "l*       r",
    "` kmmmmo ~",
    "       !  ",
    "  !       ",
    "a kmmmmo q",
    "l       *r",
    "ybbbbbbbbz",
  ],
  ewDodgeSli: [
    "wttttttttx",
    "lkmo  kmor",
    "`       *~",
    "  kmmo    ",
    "      ko  ",
    "a*       q",
    "lkmmmmmmor",
    "ybbbbbbbbz",
  ],
  ewSkeletorNarrow: [
    "wttttttttx",
    "lkmmmmmmor",
    "`        ~",
    "          ",
    "   !      ",
    "a        q",
    "lkmmmmmmor",
    "ybbbbbbbbz",
  ],
  ew4: [
    "wttttttttx",
    "lmmmmmmmmr",
    "`p      p~",
    "  p    p  ",
    "   k  o   ",
    "a       *q",
    "l*       r",
    "ybbbbbbbbz",
  ],
};

export const swRooms = {
  sw1Ske1Sli: [
    "wttttttttx",
    "l        r",
    "`kmmmo   r",
    "         r",
    "  !      r",
    "akmmmo  *r",
    "l        r",
    "ybba  qbbz",
  ],
  sw2Sli: [
    "wttttttttx",
    "lkmmmmmmor",
    "`        r",
    "         r",
    "         r",
    "a*      *r",
    "lkmo  kmor",
    "ybba  qbbz",
  ],
};

export const enRooms = {
  en1: [
    "wtt`  ~ttx",
    "l       *r",
    "l   kmmmo~",
    "l     !   ",
    "l         ",
    "l        q",
    "lkmmmmmmor",
    "ybbbbbbbbz",
  ],
  en2: [
    "wtt`  ~ttx",
    "lkmo  kmor",
    "l        ~",
    "l      !  ",
    "l      !  ",
    "l        q",
    "lkmo  kmor",
    "ybbbbbbbbz",
  ],
  en3: [
    "wtt`  ~ttx",
    "lko    kor",
    "l*      *~",
    "l         ",
    "l         ",
    "lkmmmmmmoq",
    "l        r",
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

const testRoom = {
  test: [
    "wtt`  ~ttx",
    "lko    kor",
    "l*      *~",
    "l         ",
    "l         ",
    "lkmmmmmmoq",
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
  //if (room.type === "Entrance") return fetchRandomChamber(ewRooms);
  //if (room.type === "Entrance") return testRoom.test;

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
    case "en":
      return fetchRandomChamber(enRooms);
    case "nw":
      return rooms.nwExit;
    case "es": // Previously "se"
      return fetchRandomChamber(esRooms);
    case "sw": // Change to "ws"
      return fetchRandomChamber(swRooms);
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
