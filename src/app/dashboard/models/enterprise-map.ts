export interface IEnterpriseMap {
    build: {
        id: number;
        name: string;
        options: {
            nonCritical: number;
            diagnostics: number;
            prognosis: number;
        };
    }[];
    weather: {
        temperature: number;
        wind: number;
        direction: number;
        pressure: number;
    };
}
