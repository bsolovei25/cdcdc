import {
    IAstueOnpzFactoryAnalysis,
    IAstueOnpzFactoryAnalysisBar,
    IAstueOnpzFactoryAnalysisBarResponse,
    IAstueOnpzFactoryAnalysisBarResponseDiagram,
    IAstueOnpzFactoryAnalysisBarResponseSection,
    IAstueOnpzFactoryAnalysisBarType,
    IAstueOnpzFactoryAnalysisDiagram,
    IAstueOnpzFactoryAnalysisGroup
} from '../../../../dashboard/models/ASTUE-ONPZ/astue-onpz-factory-analysis.model';
import { group } from '@angular/animations';

export function astueOnpzFactoryAnalysisBarMapper(
    response: IAstueOnpzFactoryAnalysisBarResponse
): IAstueOnpzFactoryAnalysisDiagram {
    const [min, max] = minMaxFinder(response.sections);
    const result = {
        groups: [],
        legend: [],
        minmax: [],
    };
    const trueMinValue = min - (max - min) * 0.1;
    result.minmax = [trueMinValue, max];
    response.sections.forEach(x => {
        const values = [];
        values.push(x.mainDiagram.value);
        result.groups.push({
            title: x.mainDiagram.title,
            bars: [{
                value: x.mainDiagram.value,
                type: IAstueOnpzFactoryAnalysisBarType.Summary,
                lowLevel: trueMinValue,
                topLevel: x.mainDiagram.value,
            }],
        });
        x.groups.filter(fGroup => !!fGroup.diagrams).forEach((group) => {
            result.groups.push({
                title: group.title,
                bars: group.diagrams.filter(d => !!d.value || d.value === 0).map((d, i) => {
                    const prevValue = values[values.length - 1];
                    const curValue = values[values.length - 1] + d.value;
                    values.push(curValue);
                    return {
                        title: d.title,
                        value: d.value,
                        type: d.value > 0 ? IAstueOnpzFactoryAnalysisBarType.Normal : IAstueOnpzFactoryAnalysisBarType.Deviation,
                        lowLevel: d.value > 0 ? prevValue : curValue,
                        topLevel: d.value > 0 ? curValue : prevValue,
                    };
                })
            });
        });
    });
    return result;
}

export function minMaxFinder(sections: IAstueOnpzFactoryAnalysisBarResponseSection[]): [min: number, max: number] {
    let values: number[] = [];
    sections.forEach(s => {
        values.push(s.mainDiagram.value);
        s?.groups.filter(x => !!x.diagrams).flatMap(f => f.diagrams).forEach((g, i) => {
            values.push(values[values.length - 1] + g.value);
        });
    });
    values = values.sort((a, b) => a - b);
    return [values[0], values[values.length - 1]];
}
