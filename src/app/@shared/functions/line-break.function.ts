export function lineBreakTankName(str: string): [string, string] {
    const symbols: string[] = ['-', ' ', '/', ',', '.'];
    const middleIndex: number = Math.round(str.length / 2) - 1;

    let leftIndex: number = -1;
    let rightIndex: number = str.length;

    symbols.forEach((symbol) => {
        const left = str.lastIndexOf(symbol, middleIndex);
        const right = str.indexOf(symbol, middleIndex);

        leftIndex = leftIndex < left ? left : leftIndex;
        rightIndex = right !== -1 && rightIndex > right ? right : rightIndex;
    });

    const leftDiff = Math.abs(leftIndex - middleIndex);
    const rightDiff = Math.abs(rightIndex - middleIndex);

    const index: number = leftDiff < rightDiff ? leftIndex : rightIndex;

    return [str.slice(0, index + 1), str.slice(index + 1)];
}
