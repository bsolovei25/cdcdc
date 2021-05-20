export const WORKSPACE_BAR_INFO = [
    {
        mainColor: 'var(--color-sou-blue)',
        backgroundImgSrc: 'assets/icons/widgets/SOU/sou-workspace/arrow_circle_right.svg',
        mainIconSrc: 'assets/icons/widgets/SOU/sou-workspace/icon-arrow.svg',
        subTitle: 'Источник',
        title: 'Резервуар 503',
        details: {
            productName: 'Нефть сырая',
            productOverflow: '718 см',
            productWeight: '17.892 тн'
            // юзать фичу тс, сделать через split
        },
        highlight: {
            text: 'Процесс слива',
            color: 'var(--color-sou-light-green)'
        },
        isDocumentationButton: true,
        selectors: {
            productionText: 'Производство 1',
            objectText: 'Товарный парк',
            objectDetailsText: 'Резервуар 503',
            product: {
                isActive: false,
                text: 'Нефть сырая'
            }
        }
    },
    {
        mainColor: 'var(--color-sou-green)',
        backgroundImgSrc: 'assets/icons/widgets/SOU/sou-workspace/arrow_circle_left.svg',
        mainIconSrc: 'assets/icons/widgets/SOU/sou-workspace/icon-clock.svg',
        subTitle: 'Приёмник',
        title: 'ЭЛОУ-АВТ-6',
        details: {
            productName: 'ДТ-А-К5 ГОСТ Р52368-2005 ПТФ',
            // юзать фичу тс
        },
        highlight: {
            text: 'Простой',
            color: 'var(--color-sou-yellow)'
        },
        isDocumentationButton: false,
        selectors: {
            productionText: 'Производство 1',
            objectText: 'Товарный парк',
            objectDetailsText: 'ЭЛОУ-АВТ-6',
            product: {
                isActive: true,
                text: 'ДТ-А-К5 ГОСТ Р52368-2005 ПТФ'
            }
        }
    }
];
