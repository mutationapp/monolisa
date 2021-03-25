// https://github.com/stryker-mutator/monolisa-testing-elements/blob/4c835a8e456cfc4502388744c22b3276e8eef197/packages/monolisa-testing-elements/src/lib/codeHelpers.ts
import { mutantType, fileType } from 'monolisa.model'
export interface Position {
  line: number
  column: number
}

function minify(s: string) {
  return s
    ? s
        .replace(/\>[\r\n ]+\</g, '><') // Removes new lines and irrelevant spaces which might affect layout, and are better gone
        .replace(/(<.*?>)|\s+/g, (_, $1) => ($1 ? $1 : ' '))
        .trim()
    : ''
}

export function escapeHtml(unsafe: string) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

export const COLUMN_START_INDEX = 1
export const LINE_START_INDEX = 1
export const NEW_LINE = '\n'
export const CARRIAGE_RETURN = '\r'
export function lines(content: string) {
  return content
    .split(NEW_LINE)
    .map(line =>
      line.endsWith(CARRIAGE_RETURN) ? line.substr(0, line.length - 1) : line,
    )
}

function walkString(
  source: string,
  fn: (char: string, position: Position) => string,
): string {
  let column = COLUMN_START_INDEX
  let line = LINE_START_INDEX
  const builder: string[] = []

  for (const currentChar of source) {
    if (column === COLUMN_START_INDEX && currentChar === CARRIAGE_RETURN) {
      continue
    }
    if (currentChar === NEW_LINE) {
      line++
      column = COLUMN_START_INDEX
      builder.push(NEW_LINE)
      continue
    }
    builder.push(fn(currentChar, { line, column: column++ }))
  }
  return builder.join('')
}

function gte(a: Position, b: Position) {
  return a.line > b.line || (a.line === b.line && a.column >= b.column)
}

function eq(a: Position, b: Position) {
  return a.line === b.line && a.column === b.column
}

export function renderCode(model: fileType, source: string): string {
  const startedMutants: mutantType[] = []
  const walker = (char: string, pos: Position): string => {
    if (!model.mutants) {
      return ''
    }
    const currentMutants = model.mutants?.filter(m => eq(m.location.start, pos))
    const mutantsEnding = startedMutants.filter(m => gte(pos, m.location.end))

    // Remove the mutants that ended from the list of mutants that started
    mutantsEnding.forEach(mutant =>
      startedMutants.splice(startedMutants.indexOf(mutant), 1),
    )

    // Add new mutants to started mutants
    startedMutants.push(...currentMutants)

    const builder: string[] = []
    if (currentMutants.length || mutantsEnding.length) {
      // builder.push('</span>')

      // End mutants
      mutantsEnding.forEach(() => builder.push('</span></span>'))

      // Start mutants
      currentMutants.forEach(mutant =>
        builder.push(
          minify(
            `<span class="mutant-wrapper ${mutant.status.toLowerCase()}" mutant-id="${
              mutant.id
            }">
              <span 
                  class="mutant-select ${mutant.status.toLowerCase()}"
                  mutant-id="${mutant.id}"
                  mutant-name="${mutant.mutatorName}"
                  mutant-status="${mutant.status}"
                  mutant-replacement="${mutant.replacement}"
                  title="${mutant.mutatorName}-${mutant.status}">${
              mutant.id
            }</span><span class="mutant-code">`,
          ),
        ),
      )

      // Start new color span
      // builder.push(`<span class="mutant-code-wrapper">`)
    }

    // Append the code character
    builder.push(escapeHtml(char))
    return builder.join('')
  }

  return `${walkString(source, walker)}`
  // return `<span>${walkString(source, walker)}</span>`
}
