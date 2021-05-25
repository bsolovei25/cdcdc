import { ICmidMultichartModel } from "@widgets/CMID/cmid-overall-operational-indicator/models/cmid-overall-operational-indicator.model";

export const cmidMultichartData: ICmidMultichartModel[] = [
    {
        id: 1,
        label: 'Безопасность',
        color: 'var(--data-c5-color)',
        graph: [
            {
                value: 97,
                timeStamp: "2021-05-01T01:51:00"
            },
            {
                value: 95,
                timeStamp: "2021-05-08T02:51:00"
            },
            {
                value: 92,
                timeStamp: "2021-05-12T03:51:00"
            },
            {
                value: 95,
                timeStamp: "2021-05-15T04:51:00"
            },
            {
                value: 98,
                timeStamp: "2021-05-17T05:51:00"
            },
            {
                value: 90,
                timeStamp: "2021-05-31T06:51:00"
            },
        ],
        visible: true
    },
    {
        id: 2,
        label: 'Надёжность',
        color: 'var(--data-c10-color)',
        graph: [
            {
                value: 91,
                timeStamp: "2021-05-01T01:51:00"
            },
            {
                value: 92,
                timeStamp: "2021-05-06T02:51:00"
            },
            {
                value: 98,
                timeStamp: "2021-05-13T03:51:00"
            },
            {
                value: 95,
                timeStamp: "2021-05-22T04:51:00"
            },
            {
                value: 91,
                timeStamp: "2021-05-25T05:51:00"
            },
            {
                value: 93,
                timeStamp: "2021-05-29T06:51:00"
            },
        ],
        visible: true
    },
    {
        id: 3,
        label: 'Экология',
        color: 'var(--data-c9-color)',
        graph: [
            {
                value: 100,
                timeStamp: "2021-05-01T01:51:00"
            },
            {
                value: 96,
                timeStamp: "2021-05-06T02:51:00"
            },
            {
                value: 94,
                timeStamp: "2021-05-13T03:51:00"
            },
            {
                value: 92,
                timeStamp: "2021-05-22T04:51:00"
            },
            {
                value: 90,
                timeStamp: "2021-05-25T05:51:00"
            },
            {
                value: 95,
                timeStamp: "2021-05-29T06:51:00"
            },
        ],
        visible: true
    }
];
