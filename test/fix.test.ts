import { insertExplicitConcatOperator, toPostfix } from '../src/fix'

describe('#infix-to-postfix', () => {
  describe('insertExplicitConcatOperator', () => {
    test('should insert dots between word', () => {
      expect(insertExplicitConcatOperator('a')).toBe('a')
      expect(insertExplicitConcatOperator('ab')).toBe('a·b')
      expect(insertExplicitConcatOperator('abc')).toBe('a·b·c')
    })

    test('should insert dots between * and word', () => {
      expect(insertExplicitConcatOperator('a*b')).toBe('a*·b')
      expect(insertExplicitConcatOperator('a*bc')).toBe('a*·b·c')
      expect(insertExplicitConcatOperator('ab*c')).toBe('a·b*·c')
    })

    test('should insert dots between ? and word', () => {
      expect(insertExplicitConcatOperator('a?b')).toBe('a?·b')
      expect(insertExplicitConcatOperator('a?bc')).toBe('a?·b·c')
      expect(insertExplicitConcatOperator('ab?c')).toBe('a·b?·c')
    })

    test('should insert dots between + and word', () => {
      expect(insertExplicitConcatOperator('a+b')).toBe('a+·b')
      expect(insertExplicitConcatOperator('a+bc')).toBe('a+·b·c')
      expect(insertExplicitConcatOperator('ab+c')).toBe('a·b+·c')
    })

    test('should insert dots between * and (', () => {
      expect(insertExplicitConcatOperator('a*(b*(c))')).toBe('a*·(b*·(c))')
    })

    test('should insert dots between + and (', () => {
      expect(insertExplicitConcatOperator('a+(b*(c))')).toBe('a+·(b*·(c))')
    })

    test('should insert dots between ? and (', () => {
      expect(insertExplicitConcatOperator('a?(b*(c))')).toBe('a?·(b*·(c))')
    })

    test('should insert dots between ) and word', () => {
      expect(insertExplicitConcatOperator('(ce)df')).toBe('(c·e)·d·f')
    })
  })

  describe('toPostfix', () => {
    test('should transfer infix to postfix', () => {
      expect(toPostfix('a')).toBe('a')
      expect(toPostfix('a·b')).toBe('ab·')
      expect(toPostfix('a·b·c')).toBe('ab·c·')

      expect(toPostfix('a*·b')).toBe('a*b·')
      expect(toPostfix('a*·b·c')).toBe('a*b·c·')
      expect(toPostfix('a·b*·c')).toBe('ab*·c·')

      expect(toPostfix('a?·b')).toBe('a?b·')
      expect(toPostfix('a?·b·c')).toBe('a?b·c·')
      expect(toPostfix('a·b?·c')).toBe('ab?·c·')

      expect(toPostfix('a+·b')).toBe('a+b·')
      expect(toPostfix('a+·b·c')).toBe('a+b·c·')
      expect(toPostfix('a·b+·c')).toBe('ab+·c·')

      expect(toPostfix('a*·(b?·(c))')).toBe('a*b?c··')
    })
  })
})