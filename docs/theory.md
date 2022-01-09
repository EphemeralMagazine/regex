# Theory

## Finite Automata

> Finite Automata(FA) is the simplest machine to recognize patterns. The finite automata or finite state machine is an abstract machine that has five elements or tuples. It has a set of states and rules for moving from one state to another but it depends upon the applied input symbol. Basically, it is an abstract model of a digital computer. The following figure shows some essential features of general automation.

above is taken from [geeksforgeeks](https://www.geeksforgeeks.org/introduction-of-finite-automata/). Do refer to this link for more details upon the topic of Finite Automata.

However, I still do feel obligated to explain this with simpler words. It is, to say, an abstract machine (theoretical computer used for defining a model of computation which allows a detailed and precise analysis of how the computer works) that has a set of states and rules for moving from one state to another but it depends upon the applied input symbol. Basically, it is an abstract model of a digital computer.

## To Compile Regex into Finite Automata

The set of strings recognised by a finite automaton is called language. The language of a finite automaton is the set of strings that can be accepted by the automaton. For instance, the set of strings recognised by A is called the language of A, or, often denoted as L(A).

If a language can be recognised by a finite automaton, it means i could be expressed as a regex. This is called _Kleene’s Theorem_.

## To Parse a Regex

To parse a regex, the first thing to do is to pre-process the given string by adding an _explicit concatenation operator_. Below is an implementation written in JavaScript:

```javascript
function insertExplicitConcatOperator(exp) {
  let output = ""

  for (let i = 0; i < exp.length; i++) {
    const token = exp[i]
    output += token
    if (token === "(" || token === "|") {
      continue
    }
    if (i < exp.length - 1) {
      const lookahead = exp[i + 1]

      if (
        lookahead === "*" ||
        lookahead === "?" ||
        lookahead === "+" ||
        lookahead === "|" ||
        lookahead === ")"
      ) {
        continue
      }
      output += "."
    }
  }
  return output
}
```

To convert from infix to postfix, we use the following algorithm:

```javascript
function toPostfix(exp) {
  let output = ""
  const operatorStack = []

  for (const token of exp) {
    if (
      token === "." ||
      token === "|" ||
      token === "*" ||
      token === "?" ||
      token === "+"
    ) {
      while (
        operatorStack.length &&
        peek(operatorStack) !== "(" &&
        operatorPrecedence[peek(operatorStack)] >= operatorPrecedence[token]
      ) {
        output += operatorStack.pop()
      }

      operatorStack.push(token)
    } else if (token === "(" || token === ")") {
      if (token === "(") {
        operatorStack.push(token)
      } else {
        while (peek(operatorStack) !== "(") {
          output += operatorStack.pop()
        }
        operatorStack.pop()
      }
    } else {
      output += token
    }
  }

  while (operatorStack.length) {
    output += operatorStack.pop()
  }

  return output
}
```
