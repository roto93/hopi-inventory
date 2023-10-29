import { add, sub, mul, div, round } from './math';

describe('math', () => {

  describe('addition', () => {
    it('can add integer', () => {
      let result = add('1', '2')
      expect(result).toBe('3')
    });

    it('can add decimal', () => {
      let result = add('1.1', '2.2')
      expect(result).toBe('3.3')
    });

    it('can add nagetive integer', () => {
      let result = add('-1', '-2')
      expect(result).toBe('-3')
    });

    it('can add nagetive decimal', () => {
      let result = add('-1.1', '-2.2')
      expect(result).toBe('-3.3')
    });
  })

  describe('subtraction', () => {
    it('can sub integer', () => {
      let result = sub('1', '2')
      expect(result).toBe('-1')
    });

    it('can sub decimal', () => {
      let result = sub('1.1', '2.2')
      expect(result).toBe('-1.1')
    });

    it('can sub nagetive integer', () => {
      let result = sub('-1', '-2')
      expect(result).toBe('1')
    });

    it('can sub nagetive decimal', () => {
      let result = sub('-1.1', '-2.2')
      expect(result).toBe('1.1')
    });
  })

  describe('multiplication', () => {
    it('can multiply integer', () => {
      let result = mul('1', '2')
      expect(result).toBe('2')
    });

    it('can multiply decimal', () => {
      let result = mul('1.1', '2.2')
      expect(result).toBe('2.42')
    });

    it('can multiply nagetive integer', () => {
      let result = mul('-1', '-2')
      expect(result).toBe('2')
    });

    it('can multiply nagetive decimal', () => {
      let result = mul('-1.1', '-2.2')
      expect(result).toBe('2.42')
    });
  })

  describe('division', () => {
    it('can divide integer', () => {
      let result = div('1', '2')
      expect(result).toBe('0.5')
    });

    it('can divide decimal', () => {
      let result = div('1.1', '2.2')
      expect(result).toBe('0.5')
    });

    it('can divide nagetive integer', () => {
      let result = div('-1', '-2')
      expect(result).toBe('0.5')
    });

    it('can divide nagetive decimal', () => {
      let result = div('-1.1', '-2.2')
      expect(result).toBe('0.5')
    });

    it('can handle infinite decimals', () => {
      let result = div('1', '3')
      expect(result).toBe('0.' + '3'.repeat(40))
      result = mul(result, '3')
      expect(result).toBe('0.' + '9'.repeat(40))
    })
  })

  describe.only('rounding', () => {
    it('can round to two decimals by default', () => {
      let result = round('1.004')
      expect(result).toBe('1.00')
      result = round('1.005')
      expect(result).toBe('1.01')
    })
    it('can round to specific decimals', () => {
      const num = '1.55555'
      let result = round(num, 1)
      expect(result).toBe('1.6')
      result = round(num, 5)
      expect(result).toBe('1.55555')
    })
  })

});
