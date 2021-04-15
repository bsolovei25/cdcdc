import {
    IAstueOnpzFactoryAnalysis,
    IAstueOnpzFactoryAnalysisBar,
    IAstueOnpzFactoryAnalysisBarResponse,
    IAstueOnpzFactoryAnalysisBarResponseDiagram,
    IAstueOnpzFactoryAnalysisBarResponseSection,
    IAstueOnpzFactoryAnalysisBarType,
    IAstueOnpzFactoryAnalysisDiagram,
    IAstueOnpzFactoryAnalysisGroup,
} from '../../../../dashboard/models/ASTUE-ONPZ/astue-onpz-factory-analysis.model';
import { group } from '@angular/animations';

export function astueOnpzFactoryAnalysisBarMapper(
    response: IAstueOnpzFactoryAnalysisBarResponse
): IAstueOnpzFactoryAnalysisDiagram {
    const [min, max] = minMaxFinder(response.sections);
    const result: IAstueOnpzFactoryAnalysisDiagram = {
        groups: [],
        legend: [],
        minmax: [],
    };
    const trueMinValue = min - (max - min) * 0.1;
    result.minmax = [trueMinValue, max];
    console.warn(response, 'from');
    response.sections.forEach((x) => {
        const values = [];
        values.push(x.mainDiagram.value);
        result.groups.push({
            order: null,
            title: null,
            diagrams: [
                {
                    title: x.mainDiagram.title,
                    value: x.mainDiagram.value,
                    type: IAstueOnpzFactoryAnalysisBarType.Summary,
                    lowLevel: trueMinValue,
                    topLevel: x.mainDiagram.value,
                    order: null,
                    content: null,
                },
            ],
        });
        x.groups
            .filter((fGroup) => !!fGroup.diagrams)
            .forEach((group) => {
                result.groups.push({
                    title: group.title,
                    order: null,
                    diagrams: group.diagrams
                        .filter((d) => !!d.value || d.value === 0)
                        .map((d, i) => {
                            const prevValue = values[values.length - 1];
                            const curValue = values[values.length - 1] + d.value;
                            values.push(curValue);
                            return {
                                title: d.title,
                                value: d.value,
                                type:
                                    d.value > 0
                                        ? IAstueOnpzFactoryAnalysisBarType.Normal
                                        : IAstueOnpzFactoryAnalysisBarType.Deviation,
                                lowLevel: d.value > 0 ? prevValue : curValue,
                                topLevel: d.value > 0 ? curValue : prevValue,
                                content: contentMapper(d?.content, d.value > 0 ? prevValue : curValue, d.value),
                            };
                        }),
                });
            });
    });
    return result;
}

export function minMaxFinder(sections: IAstueOnpzFactoryAnalysisBarResponseSection[]): [min: number, max: number] {
    let values: number[] = [];
    sections.forEach((s) => {
        values.push(s.mainDiagram.value);
        s?.groups
            .filter((x) => !!x.diagrams)
            .flatMap((f) => f.diagrams)
            .forEach((g, i) => {
                values.push(values[values.length - 1] + g.value);
            });
    });
    values = values.sort((a, b) => a - b);
    return [values[0], values[values.length - 1]];
}

function contentMapper(
    content: IAstueOnpzFactoryAnalysisBarResponseDiagram[],
    startValue: number,
    commonValue: number
): IAstueOnpzFactoryAnalysisBar[] {
    if (!content?.length) {
        return [];
    }

    const multiply = commonValue > 0 ? -1 : 1;
    const sumValue: number = content.map((x) => Math.abs(x.value)).reduce((a, b) => a + b);
    const values = content.map((x) => (Math.abs(x.value) / sumValue) * commonValue);
    content.forEach((x, i) => (x.order = values[i]));
    content = content.sort((a, b) => multiply * b.order - multiply * a.order);

    let curValue = startValue;
    return content.map((c, i) => {
        const prevValue = curValue;
        curValue += -multiply * c.order;
        return {
            title: c.title,
            value: c.value,
            order: values[i],
            type: c.value > 0 ? IAstueOnpzFactoryAnalysisBarType.Normal : IAstueOnpzFactoryAnalysisBarType.Deviation,
            lowLevel: prevValue,
            topLevel: curValue,
        };
    });
}
