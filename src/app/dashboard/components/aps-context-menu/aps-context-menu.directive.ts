import {
    ComponentFactoryResolver,
    Directive,
    EventEmitter,
    HostListener,
    Input,
    OnInit,
    Output,
    Renderer2,
    ViewContainerRef,
} from '@angular/core';
import { ApsContextMenuComponent } from './aps-context-menu.component';
import { Subject } from 'rxjs';
import { INavItem } from '../aps-dropdown-menu/aps-dropdown-menu.component';

@Directive({
    selector: '[evjContextMenu]',
})
export class ApsContextMenuDirective implements OnInit {
    public eventSubject: Subject<any> = new Subject<any>();

    @Input()
    public items: INavItem[] = [
        {
            name: 'Администрирование',
            value: 0,
        },
        {
            name: 'Рабочий процесс',
            value: 0,
            children: [
                {
                    name: 'Участники процесса',
                    value: 0,
                },
                {
                    name: 'Действия',
                    value: 0,
                    children: [
                        {
                            name: 'Корректировка объемного плана',
                            value: 0,
                        },
                        {
                            name: 'Корректировка исходных данных',
                            value: 0,
                        },
                        {
                            name: 'Корректировка графика поставки нефти',
                            value: 0,
                        },
                        {
                            name: 'Корректировка графика поставки КГС',
                            value: 0,
                        },
                    ],
                },
                {
                    name: 'Матрица ролей',
                    value: 0,
                },
                {
                    name: 'Согласование графика',
                    value: 0,
                },
            ],
        },
        {
            name: 'Данные СИ',
            value: 0,
            children: [
                {
                    name: 'НСИ',
                    value: 0,
                    children: [
                        {
                            name: 'ЕСУ НСИ',
                            value: 0,
                        },
                        {
                            name: 'КСУ НСИ',
                            value: 0,
                        },
                    ],
                },
                {
                    name: 'Мастер данные',
                    value: 0,
                    children: [
                        {
                            name: 'SAP TOPO',
                            value: 0,
                        },
                        {
                            name: 'LIMS',
                            value: 0,
                        },
                        {
                            name: 'PIMS',
                            value: 0,
                        },
                        {
                            name: 'АС КУБ',
                            value: 0,
                        },
                    ],
                },
                {
                    name: 'Плановые данные',
                    value: 0,
                    children: [
                        {
                            name: 'PIMS',
                            value: 0,
                        },
                    ],
                },
                {
                    name: 'Результаты АСКПП',
                    value: 0,
                },
                {
                    name: 'Фактические данные',
                    value: 0,
                    children: [
                        {
                            name: 'АС КУБ',
                            value: 0,
                        },
                    ],
                },
            ],
        },
        {
            name: 'Ручной ввод',
            value: 0,
            children: [
                {
                    name: 'Мастер данные',
                    value: 0,
                    children: [
                        {
                            name: 'АСКПП',
                            value: 0,
                        },
                    ],
                },
                {
                    name: 'Плановые данные',
                    value: 0,
                    children: [
                        {
                            name: 'АСКПП',
                            value: 0,
                        },
                    ],
                },
            ],
        },
        {
            name: 'Алгоритмы',
            value: 0,
            children: [
                {
                    name: 'Алгоритмы СИ',
                    value: 0,
                },
                {
                    name: 'Ручной ввод',
                    value: 0,
                },
            ],
        },
    ];

    @Input()
    public disabledDirective: boolean = null;

    @Output()
    public rightClick: EventEmitter<any> = new EventEmitter<any>();

    @HostListener('contextmenu', ['$event'])
    public onClick($event: any): void {
        this.emitEventToChild($event);
    }

    constructor(
        private cfResolver: ComponentFactoryResolver,
        public vcRef: ViewContainerRef,
        private renderer: Renderer2
    ) {}

    public ngOnInit(): void {
        this.appendComponent();
    }

    public appendComponent(): void {
        const factory = this.cfResolver.resolveComponentFactory(ApsContextMenuComponent);
        const componentRef = this.vcRef.createComponent(factory);
        componentRef.instance.event = this.eventSubject.asObservable();
        componentRef.instance.items = this.items;
        componentRef.instance.disabledDirective = this.disabledDirective;
        this.renderer.appendChild(
            this.vcRef.element.nativeElement,
            componentRef.injector.get(ApsContextMenuComponent).elRef.nativeElement
        );
    }

    public emitEventToChild($event: any): void {
        this.eventSubject.next($event);
    }
}
