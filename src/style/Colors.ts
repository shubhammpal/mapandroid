export const graySteps = 8
// latest grey color to change all screens background and top bar
export function grayStep(step: number, alpha: number = 1.0): string {
  if (step > graySteps) {
    console.warn(
      `function getGray called with step greater than configured steps. Using ${graySteps} instead.`,
    )
    step = graySteps
  } else if (step < 0) {
    console.warn(
      'function getGray called with step less than zero. Using 0 instead.',
    )
    step = 0
  }
  return `hsla(0, 0%, ${(1 / graySteps) * 100 * (graySteps - step)}%, ${alpha})`
  // return latestGrey
}

export const black = '#111111'
// export const black = '#1B1B1C'
export const black21 = '#212121'
export const offblack43 = '#434344'
export const offblack = '#292929'
export const greyBCBC = '#BCBCBC'
export const lightBlack = '#383838'
export const semiDark = '#1B1E28'
export const offEDED = '#EDEDED'

export const white = '#FFFFFF'
export const whiteOFF = '#FAFAFA'
export const offwhite = '#F8F7FC'
export const black3232D = '#32322D'
export const greyB0B0 = '#B0B0B0'
export const greyD9 = '#D9D9D9'
export const grey999 = '#999999'
export const whiteFBFB = '#FBFBFB'
export const dark = '#303746'
export const greyBFBF = '#BFBFBF'




export const white2D = '#2D2D2D'
export const red = '#DA291C'
export const black3030 = '#303030'
export const grey6262 = '#626262'
export const whiteF7F7 = '#F7F7F7'
export const success = '#242C32'
export const black313 = '#31343E'
export const black141= '#141416'
export const greyDC= '#DCDCDC'
export const grey86= '#868782'
export const whiteEB= '#EBEBEB'
export const grey54= '#545454'
export const orangelight= '#D4675A'
export const greyAD= '#ADADAD'
export const redish = '#FD3B31'
export const lightyellow = '#F7B353'
export const greyBBBB = '#BBBBBB'
export const greyC4C4 = '#C4C4C4'
export const darkyellow = '#FDB928'
export const black222 = '#222222'
export const darkOrange = '#F15B44';
export const black1717 = '#171717';
export const lightBlue = '#AEDBFF';
export const black1B1D = '#1B1D23';

export const mediumgray = '#7E7E7E'
export const purple = '#924DCA'
export const grey90 = '#908F8F'
export const black131 = '#131313'
export const grey92 = '#929292'
export const green = '#54BB79'
export const grey737 = '#737B8E'
export const grey98 = '#989898'
export const black2F = '#2F2F2F'
export const greyCD = '#CDCDCD'
export const semigrey = '#373738'
export const semiAAA = '#AAAAAA'
export const blue = '#1E9BFC'
export const blueoff = '#7AA2CE'
export const fadeRrrorRed = '#A60014'

export const black3232 = '#323232'
