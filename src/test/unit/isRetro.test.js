const { isRetro } = require('../../utils/isRetro')

describe('Utils: isRetro', () => {

    test('Should return true if it is the day before the 20th anniversary', () => {
        const release = new Date('2006-02-25')
        const reference = new Date('2026-02-25')
        expect(isRetro(release, reference)).toBe(true)
    })

    test('Should return false if it is the day before the 20th anniversary', () => {
        const release = new Date('2006-02-26')
        const reference = new Date('2026-02-25')
        expect(isRetro(release, reference)).toBe(false)
    })

    test('Should return true for dates older than 20 years', () => {
        const release = new Date('1995-12-31')
        const reference = new Date('2026-02-25')
        expect(isRetro(release, reference)).toBe(true)
    })

    test('Should return false for recent releases', () => {
        const release = new Date('2021-01-01')
        const reference = new Date('2026-02-25')
        expect(isRetro(release, reference)).toBe(false)
    })

    test('Should handle month differences correctly', () => {
        const release = new Date('2006-05-10')
        const reference = new Date('2026-02-10')
        expect(isRetro(release, reference)).toBe(false)
    })

    test('Should use the current date if no referenceDate is provided', () => {
        const twentyOneYearsAgo = new Date()
        twentyOneYearsAgo.setFullYear(twentyOneYearsAgo.getFullYear() - 21)
        expect(isRetro(twentyOneYearsAgo)).toBe(true)
    })
})