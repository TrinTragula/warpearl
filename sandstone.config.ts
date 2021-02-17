import type { SandstoneConfig } from 'sandstone/core'

export default {
  name: 'warpearl',
  description: ['Simple warps using ', { text: 'named', color: 'gold' }, ' ender pearls.'],
  formatVersion: 6,
  namespace: 'warpearl',
  packUid: 'ZFjQsASA',
  // saveOptions: { world: 'testpacchi' },
  saveOptions: { path: 'dist' },
} as SandstoneConfig
