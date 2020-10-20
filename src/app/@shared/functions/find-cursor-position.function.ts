import { ProductionTrendType } from '../../dashboard/models/LCO/production-trends.model';

export function findCursorPosition(
    posX: number,
    curveType: ProductionTrendType,
    svg: any,
    padding: { [key: string]: number }
): SVGPoint {
    let line: SVGGeometryElement = null;
    [[line]] = svg.select(`.graph-line-${curveType}`)._groups;

    if (!line) {
        return null;
    }

    let begin: number = 0;
    let end: number = line.getTotalLength();
    let target: number = null;
    let pos: SVGPoint = null;

    const beginCoords = line.getPointAtLength(begin);
    const endCoords = line.getPointAtLength(end);

    if (posX + padding.left > endCoords.x || posX + padding.left < beginCoords.x) {
        return null;
    } else {
        while (true) {
            target = Math.floor((begin + end) / 2);
            pos = line.getPointAtLength(target);
            if ((target === end || target === begin) && pos.x !== posX + padding.left) {
                break;
            }
            if (pos.x > posX + padding.left) {
                end = target;
            } else if (pos.x < posX + padding.left) {
                begin = target;
            } else {
                break;
            }
        }
    }

    return pos;
}
