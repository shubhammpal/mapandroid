import msFunction from '../utils/modularscale'


const config = {
  base: 16,
  ratio: 1.2,
}

const ms = (n: number): number => {
  return msFunction(n, config)
}

export default ms
