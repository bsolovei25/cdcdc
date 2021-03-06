import html2canvas from 'html2canvas';

export class ScreenshotMaker {
    constructor() {}

    async takeScreenshot(element: HTMLElement, isPrepareSvg: boolean = true): Promise<File> {
        if (isPrepareSvg) {
            this.prepareSvg(element);
        }
        const canvas = await html2canvas(element, { foreignObjectRendering: false });
        const dataUrl = canvas.toDataURL();
        return this.dataURLtoFile(dataUrl);
    }

    private prepareSvg = (element: HTMLElement): void => {
        const svgElements = element.querySelectorAll('svg');
        svgElements.forEach((item) => {
            item.setAttribute('width', item?.getBoundingClientRect().width?.toString());
            item.setAttribute('height', item?.getBoundingClientRect().height?.toString());
            item.style.width = null;
            item.style.height = null;
        });
    };

    private dataURLtoFile = (dataUrl: string, filename: string = 'default.png'): File => {
        const arr = dataUrl.split(',');
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);

        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }

        return new File([u8arr], filename, { type: mime });
    };
}
