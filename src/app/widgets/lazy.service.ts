import {
    Injectable,
    Injector,
    Compiler,
    ComponentFactoryResolver,
    ViewContainerRef,
    NgModuleRef,
    StaticProvider,
} from '@angular/core';
import { WIDGETS_LAZY } from '../dashboard/components/widgets-grid/widget-map';

interface IInjectParameters {
    [key: string]: any;
}

@Injectable({
    providedIn: 'root',
})
export class LazyService {
    constructor(
        private injector: Injector,
        private compiler: Compiler,
        private cfr: ComponentFactoryResolver
    ) {}

    public async loadWidget(
        widgetType: string,
        container: ViewContainerRef,
        injectParams: IInjectParameters
    ): Promise<void> {
        try {
            const module = (await WIDGETS_LAZY[widgetType].import())[
                this.defineModuleName(widgetType)
            ];

            const moduleFactory = await this.compiler.compileModuleAsync(module);

            const injector: Injector = Injector.create({
                providers: this.injectionProvidersConstructor(injectParams),
                parent: this.injector,
            });

            const moduleRef: NgModuleRef<any> = moduleFactory.create(injector);
            const component = moduleRef.instance.enterComponent;
            const componentFactory = this.cfr.resolveComponentFactory(component);

            const { instance } = container.createComponent(
                componentFactory,
                null,
                moduleRef.injector
            );
        } catch {}
    }

    private injectionProvidersConstructor(params: IInjectParameters): StaticProvider[] {
        const providers: StaticProvider[] = [];
        Object.keys(params).forEach((key) => {
            providers.push({
                provide: key,
                useValue: params[key],
            });
        });
        return providers;
    }

    private defineModuleName(widgetType: string): string {
        const array = widgetType.split('').filter((item, index, arr) => {
            if (item === '-') {
                arr[index + 1] = arr[index + 1].toUpperCase();
                return;
            }
            return item;
        });
        array[0] = array[0].toUpperCase();
        return `${array.join('')}Module`;
    }
}
