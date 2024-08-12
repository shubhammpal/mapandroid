// Converted to TypeScript from https://github.com/modularscale/modularscale-js
// Values
export const minorSecond: number = 16 / 15
export const majorSecond: number = 1.125
export const minorThird: number = 1.2
export const majorThird: number = 1.25
export const perfectFourth: number = 4 / 3
export const augFourth: number = 1.414
export const perfectFifth: number = 1.5
export const minorSixth: number = 1.6
export const goldenSection: number = 1.61803398875
export const majorSixth: number = 5 / 3
export const minorSeventh: number = 16 / 9
export const majorSeventh: number = 1.875
export const octave: number = 2
export const majorTenth: number = 2.5
export const majorEleventh: number = 8 / 3
export const majorTwelfth: number = 3
export const doubleOctave: number = 4

// Function settings
type ModularScaleConfig = {
  base: number | number[]
  ratio: number
}

let modularscale: ModularScaleConfig = {
  base: 16,
  ratio: 1.5,
}

// Function
function msFunction(v: number, settings: ModularScaleConfig) {
  // Parse settings
  // Write initial settings if undefined
  if (settings === undefined) {
    settings = modularscale
  }
  // Initiate values
  let base = settings.base
  let ratio = settings.ratio
  // Fill in the blanks with default values
  if (ratio === undefined) {
    ratio = modularscale.ratio
  }
  if (base === undefined) {
    base = modularscale.base
  }

  // Fast calc if not multi stranded
  if (!Array.isArray(base) || base.length === 1) {
    // Javascript lets you multiple a number by a single number array
    // so we cast base as any so typescript won't complain.
    return Math.pow(ratio, v) * (base as any)
  }

  // Normalize bases
  // Find the upper bounds for base values
  let baseHigh = Math.pow(ratio, 1) * base[0]
  for (let i = 1; i < base.length; i++) {
    // shift up if value too low
    while (base[i] / 1 < base[0] / 1) {
      base[i] = Math.pow(ratio, 1) * base[i]
    }
    // Shift down if too high
    while (base[i] / 1 >= baseHigh / 1) {
      base[i] = Math.pow(ratio, -1) * base[i]
    }
  }
  
  base.sort()

  
  let rBase = Math.round(
    (v / base.length - Math.floor(v / base.length)) * base.length,
  )

  
  return Math.pow(ratio, Math.floor(v / base.length)) * base[rBase]
}

export default msFunction
