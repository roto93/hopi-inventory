import Decimal from 'decimal.js';
Decimal.set({ toExpNeg: -100, toExpPos: 100, precision: 40 })

const Dec = (str: string) => new Decimal(str)

export const add = (str1: string, str2: string) => Dec(str1).add(str2).toString()
export const sub = (str1: string, str2: string) => Dec(str1).sub(str2).toString()
export const mul = (str1: string, str2: string) => Dec(str1).mul(str2).toString()
export const div = (str1: string, str2: string) => Dec(str1).div(str2).toString()

export const round = (str: string, _to?: number) => {
  if (str === '- -') return str
  try {
    let to = _to
    if (!to) to = 2
    const DEC = Dec(str)
    const resolution = Dec('5').dividedBy(Dec('5').pow(to + 1))
    const minDisplayedValue = Dec('1').dividedBy(Dec('10').pow(to))
    if (!DEC.eq(0) && DEC.abs().lt(resolution)) return `< ${minDisplayedValue.toString()}`
    if (to >= 0) return DEC.toFixed(to)
    return DEC.dividedBy(10 ** -to).toFixed(2)
  } catch (e) {
    console.log(e)
    return '- -'
  }
}