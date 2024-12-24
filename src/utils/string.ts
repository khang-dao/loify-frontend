import { Playlist } from '@/types'

export const containsLoify = (str: string) => str.toLowerCase().includes('loify')
export const addSpacesBetweenChars = (str: string) => str.split('').join(' ')
const nonAlphaNum = (str: string) => /^[^\w\s]/.test(str)

// Custom sort: 'loify' items at the start & emoji items at the end
export const customSort = (arr: Playlist[]): Playlist[] => {
  return arr.sort((a, b) => {
    const aName = a.name ?? ''
    const bName = b.name ?? ''

    const aIsLoify = aName.includes('loify')
    const bIsLoify = bName.includes('loify')
    const aIsEmoji = nonAlphaNum(aName)
    const bIsEmoji = nonAlphaNum(bName)

    // Prioritize "loify" elements first, in the order they appear
    if (aIsLoify && !bIsLoify) return -1
    if (bIsLoify && !aIsLoify) return 1

    // Handle the emoji sorting logic
    if (aIsEmoji && !bIsEmoji) return 1
    if (bIsEmoji && !aIsEmoji) return -1

    // Regular alphabetical sorting
    return aName.localeCompare(bName)
  })
}
