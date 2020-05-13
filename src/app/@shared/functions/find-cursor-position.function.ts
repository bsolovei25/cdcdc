import { ProductionTrendType } from '../../dashboard/models/production-trends.model';

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

    return pos;
}
