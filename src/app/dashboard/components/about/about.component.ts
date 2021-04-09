import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';

export interface IAboutApp {
    headerName: string;
    title: string;
    mainText: string;
    featuresTitle: string;
    modules: IAboutModules[];
}
export interface IAboutModules {
    id: number;
    icon?: string;
    name: string;
    status?: string;
    description?: string;
}

@Component({
    selector: 'evj-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {

    public version: string = environment.version;
    public date: Date = new Date(environment.date);

    public readonly about: IAboutApp = {
        headerName: 'О программе',
        title: 'Цифровая индустриальная экосистема',
        mainText:
            'Комплексный конструктор виджетов, охватывающий все ключевые аспекты управления' +
            ' современным предприятием и включает компоненты цифровизации производства с использованием ' +
            'промышленного интернета вещей, машинного обучения и искусственного интеллекта, ' +
            'реализуя концепцию Industry 4.0.',
        featuresTitle: 'Особенности',
        modules: [
            {
                id: 0,
                name: 'Конструктор бизнес процессов',
                icon: 'business',
                description:
                    'Конструктор бизнес-процессов позволяет смоделировать бизнес-процессы верхнего уровня, а также декомпозировать их на подпроцессы. Для визуализации бизнес-процессов применяется нотация BPMN 2.0, являющаяся  мировым стандартом.\n',
            },
            {
                id: 1,
                name: 'Конструктор интерфейсов',
                icon: 'interface',
                description:
                    'Конструктор интерфейсов представляет собой платформу для разработки пользовательских интерфейсов с богатыми функциональными возможностями для построения современных виджетов и бизнес-приложений.\n',
            },
            {
                id: 2,
                name: 'Конструктор отчётов',
                icon: 'report',
                description:
                    'Конструктор отчетов предназначен для создания, корректировки и вывода на печать отчетов по табличным данным, а также для ведения в системе ЦИЭС единого перечня отчетов для каждой таблицы данных.\n' +
                    'Конструктор интерфейсов',
            },
            {
                id: 3,
                name: 'Конструктор дашбордов',
                icon: 'dashboard',
                description:
                    'Конструктор дашбордов предназначен для графической визуализации информации и создания дашбордов. Он позволяет создавать и изменять собственные интерактивные отчеты и информационные панели.\n',
            },
            {
                id: 4,
                name: 'Конструктор интеграций',
                icon: 'integration',
                description:
                    'Конструктор интеграций предназначен для настройки и использования механизмов автоматической синхронизации данных. Состоит из модуля экспорта и модуля импорта.\n',
            },
            {
                id: 5,
                name: 'Конструктор динамической топологии',
                icon: 'topology',
                description:
                    'Конструктор динамической топологии объектов автоматизирует визуализацию произвольной технологической топологии и производит анализ происходящих в ней изменений.\n',
            },
            {
                id: 6,
                name: 'Конструктор форм',
                status: 'В разработке',
                icon: 'form',
                description:
                    'Для конструирования форм планируется применение классов из готовых наборов, которые обеспечивают выполнение преднастроенной бизнес-логики, обеспечивают корректность ввода, единообразие ввода данных во всех диалогах, проверки и помощь при вводе данных.\n',
            },
            {
                id: 7,
                name: 'Конструктор базы данных',
                status: 'В разработке',
                icon: 'base',
                description:
                    'В экосистеме ЦИЭС планируется реализация средств модификации информационной базы, средств пополнения справочников, системы и модификации информационных баз непосредственно пользователем, у которого есть на это права.\n',
            },
            {
                id: 8,
                name: 'Конструктор объектной модели',
                status: 'В разработке',
                icon: 'model',
                description:
                    'Конструктор объектной модели позволит не только архитекторам баз данных вносить изменения, но и бизнес-пользователям, которые смогут с его помощью создавать собственные модели, объединяющие разнородные типы данных.',
            },
        ],
    };

    public readonly settingLogo: string = 'assets/icons/about/setting.svg';
    public readonly wallLogo: string = 'assets/icons/about/wall.svg';
    public readonly close: string = 'assets/icons/about/close.svg';

    constructor(public dialogRef: MatDialogRef<AboutComponent>) {}

    ngOnInit(): void {}

    public onClose(): void {
        this.dialogRef.close();
    }
}
