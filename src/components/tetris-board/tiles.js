export const tiles = [
  {
    // The default square
    rotations: [
      [{x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}]
    ]
  },
  {
    // The cube tile (block 2x2)
    rotations: [
      [{x: 0, y: 0}, {x: 1, y: 0}, {x: 0, y: 1}, {x: 1, y: 1}]
    ]
  },
  {
    // The I tile
    rotations: [
      [{x: 0, y: -1}, {x: 0, y: 0}, {x: 0, y: 1}, {x: 0, y: 2}],
      [{x: -1, y: 0}, {x: 0, y: 0}, {x: 1, y: 0}, {x: 2, y: 0}]
    ]
  },
  {
    // The T tile
    rotations: [
      [{x: 0, y: 0}, {x: -1, y: 0}, {x: 1, y: 0}, {x: 0, y: -1}],
      [{x: 0, y: 0}, {x: 1, y: 0}, {x: 0, y: 1}, {x: 0, y: -1}],
      [{x: 0, y: 0}, {x: -1, y: 0}, {x: 1, y: 0}, {x: 0, y: 1}],
      [{x: 0, y: 0}, {x: -1, y: 0}, {x: 0, y: 1}, {x: 0, y: -1}]
    ]
  },
  {
    // The inverse L tile
    rotations: [
      [{x: 0, y: 0}, {x: -1, y: 0}, {x: 1, y: 0}, {x: -1, y: -1}],
      [{x: 0, y: 0}, {x: 0, y: 1}, {x: 0, y: -1}, {x: 1, y: -1}],
      [{x: 0, y: 0}, {x: 1, y: 0}, {x: -1, y: 0}, {x: 1, y: 1}],
      [{x: 0, y: 0}, {x: 0, y: 1}, {x: 0, y: -1}, {x: -1, y: 1}]
    ]
  },
  {
    // The L tile
    rotations: [
      [{x: 0, y: 0}, {x: 1, y: 0}, {x: -1, y: 0}, {x: 1, y: -1}],
      [{x: 0, y: 0}, {x: 0, y: 1}, {x: 0, y: -1}, {x: 1, y: 1}],
      [{x: 0, y: 0}, {x: 1, y: 0}, {x: -1, y: 0}, {x: -1, y: 1}],
      [{x: 0, y: 0}, {x: 0, y: 1}, {x: 0, y: -1}, {x: -1, y: -1}]
    ]
  },
  {
    // The Z tile
    rotations: [
      [{x: 0, y: 0}, {x: 1, y: 0}, {x: 0, y: -1}, {x: -1, y: -1}],
      [{x: 0, y: 0}, {x: 1, y: 0}, {x: 0, y: 1}, {x: 1, y: -1}]
    ]
  },
  {
    // The inverse Z tile
    rotations: [
      [{x: 0, y: 0}, {x: -1, y: 0}, {x: 0, y: -1}, {x: 1, y: -1}],
      [{x: 0, y: 0}, {x: 0, y: -1}, {x: 1, y: 0}, {x: 1, y: 1}]
    ]
  }
]