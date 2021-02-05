import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'evj-email-editor',
    templateUrl: './email-editor.component.html',
    styleUrls: ['./email-editor.component.scss'],
})
export class EmailEditorComponent {
    // region: two way binding area
    public emailValue: string;
    @Output() emailChange: EventEmitter<string> = new EventEmitter<string>();
    @Input()
    get email(): string {
        return this.emailValue;
    }
    set email(val: string) {
        this.emailValue = val;
        this.emailChange.emit(this.emailValue);
    }
    // end region: two way binding area

    public config: any = {
        skin: 'moono-dark',
        allowedContent: false,
        forcePasteAsPlainText: true,
        font_names: 'Arial;Times New Roman;Verdana',
        toolbarGroups: [
            { name: 'document', groups: ['mode', 'document', 'doctools'] },
            { name: 'clipboard', groups: ['clipboard', 'undo'] },
            { name: 'editing', groups: ['find', 'selection', 'spellchecker', 'editing'] },
            { name: 'forms', groups: ['forms'] },
            '/',
            { name: 'basicstyles', groups: ['basicstyles', 'cleanup'] },
            { name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align', 'bidi', 'paragraph'] },
            { name: 'links', groups: ['links'] },
            { name: 'insert', groups: ['insert'] },
            '/',
            { name: 'styles', groups: ['styles'] },
            { name: 'colors', groups: ['colors'] },
            { name: 'tools', groups: ['tools'] },
            { name: 'others', groups: ['others'] },
            { name: 'about', groups: ['about'] },
        ],
        removeButtons:
            'Source,Save,NewPage,Preview,Print,Templates,Cut,Copy,Paste,PasteText,PasteFromWord,Undo,Redo,Find,Replace,SelectAll,Scayt,Form,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,Strike,Subscript,Superscript,CopyFormatting,RemoveFormat,Outdent,Indent,CreateDiv,Blockquote,BidiLtr,BidiRtl,Language,Unlink,Anchor,Image,Flash,Table,HorizontalRule,Smiley,SpecialChar,PageBreak,Iframe,Maximize,ShowBlocks,About',
    };
}
