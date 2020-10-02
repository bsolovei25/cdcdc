import * as d3 from 'd3';

export function dateFormatLocale(): (date: Date) => string {
    const locale = d3.timeFormatLocale({
        dateTime: '%A, %e %B %Y г. %X',
        date: '%d.%m.%Y',
        time: '%H:%M:%S',
        periods: ['', ''],
        days: [
            'воскресенье',
            'понедельник',
            'вторник',
            'среда',
            'четверг',
            'пятница',
            'суббота',
        ],
        shortDays: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
        months: [
            'Январь',
            'Февраль',
            'Март',
            'Апрель',
            'Май',
            'Июнь',
            'Июль',
            'Август',
            'Сентябрь',
            'Октябрь',
            'Ноябрь',
            'Декабрь',
        ],
        shortMonths: [
            'Янв',
            'Фев',
            'Мар',
            'Апр',
            'Май',
            'Июн',
            'Июл',
            'Авг',
            'Сен',
            'Окт',
            'Ноя',
            'Дек',
        ],
    });

    const formatMillisecond = locale.format('.%L');
    const formatSecond = locale.format(':%S');
    const formatMinute = locale.format('%H:%M');
    const formatHour = locale.format('%H %p');
    const formatDay = locale.format('%d %b');
    const formatWeek = locale.format('%b %d ');
    const formatMonth = locale.format('%B');
    const formatYear = locale.format('%Y');

    return (date) =>
        (d3.timeSecond(date) < date
            ? formatMillisecond
            : d3.timeMinute(date) < date
                ? formatSecond
                : d3.timeHour(date) < date
                    ? formatMinute
                    : d3.timeDay(date) < date
                        ? formatHour
                        : d3.timeMonth(date) < date
                            ? d3.timeWeek(date) < date
                                ? formatDay
                                : formatWeek
                            : d3.timeYear(date) < date
                                ? formatMonth
                                : formatYear)(date);
}
