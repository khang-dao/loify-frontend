export const containsLoify = (str: string) => str.toLowerCase().includes('loify')
export const addSpacesBetweenChars = (str: string) => str.split('').join(' ')
const nonAlphaNum = (str: string) => /^[^\w\s]/.test(str)

// Utility function to sort by name, putting emoji-starting items at the end
export const customSort = (arr) => {
  return arr.sort((a, b) => {
    const aIsEmoji = nonAlphaNum(a.name)
    const bIsEmoji = nonAlphaNum(b.name)

    if (aIsEmoji && !bIsEmoji) return 1
    if (bIsEmoji && !aIsEmoji) return -1
    return a.name.localeCompare(b.name)
  })
}
