import { insertExplicitConcatOperator, infixToPostfix } from './fix'
import { buildToNFA, isMatchOf } from './nfa'

export const match = (regex: string, exp: string): boolean => {
	const strWithConcat = insertExplicitConcatOperator(regex)
	const strWithPostfix = infixToPostfix(strWithConcat)
	const nfa = buildToNFA(strWithPostfix)

	return isMatchOf(exp, nfa)
}
