export class KpeEngUnitsComparator {
    private store: { [key: string]: 'units' | 'percent' } = {};

    constructor() {}

    setEngUnits(key: string, value: 'units' | 'percent'): void {
        this.store[key] = value;
    }

    isEngUnitsPercent(key: string): boolean {
        if (this.store[key]) {
            return this.store[key] === 'percent';
        } else {
            return false;
        }
    }
}
