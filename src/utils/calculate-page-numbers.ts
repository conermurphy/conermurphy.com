interface Props {
  totalPages: number
  currentPage: number
}

export const calculatePageNumbers = ({ totalPages, currentPage }: Props) => {
  const range = 3
  const maxVisiblePageNumbers = 7

  // NOTE: If under the max page number, render them all
  if (totalPages <= maxVisiblePageNumbers) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  const result: (string | number)[] = []
  const middleStart = 2
  const middleEnd = totalPages - 1

  result.push(1)

  if (currentPage <= middleStart || currentPage >= middleEnd) {
    // NOTE: Runs when user is in first/last page number set
    for (let i = 2; i < totalPages; i++) {
      if (i <= middleStart + 1 || i >= middleEnd - 1) {
        result.push(i)
        continue
      }

      if (result.at(-1) === '...') continue
      result.push('...')
    }
  } else {
    // NOTE: Runs when user is in middle page number set
    const rangeNumbers = Array.from({ length: range }).map((_, i) => {
      return i + currentPage - Math.floor(range / 2)
    })

    if (range + 2 > totalPages) {
      result.push(...rangeNumbers)
    } else {
      result.push('...', ...rangeNumbers, '...')
    }
  }

  result.push(totalPages)

  return result
}
