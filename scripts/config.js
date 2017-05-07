CKEDITOR.editorConfig = function (config) {
    config.toolbarGroups = [
		{ name: 'document', groups: ['mode', 'document', 'doctools'] },
		{ name: 'clipboard', groups: ['clipboard', 'undo'] },
		{ name: 'editing', groups: ['find', 'selection', 'spellchecker', 'editing'] },
		{ name: 'forms', groups: ['forms'] },
		{ name: 'basicstyles', groups: ['basicstyles', 'cleanup'] },
		{ name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align', 'bidi', 'paragraph'] },
		{ name: 'colors', groups: ['colors'] },
		{ name: 'links', groups: ['links'] },
		{ name: 'insert', groups: ['insert'] },
		{ name: 'styles', groups: ['styles'] },
		{ name: 'tools', groups: ['tools'] },
		{ name: 'others', groups: ['others'] },
		{ name: 'about', groups: ['about'] }
    ];

    config.height = '8em';
    config.language = 'pl';
    config.removeButtons = 'Source,NewPage,Preview,Save,Print,About,Maximize,ShowBlocks,Styles,Font,FontSize,Flash,Table,SpecialChar,PageBreak,Iframe,Unlink,Anchor,Language,BidiRtl,BidiLtr,JustifyLeft,JustifyCenter,JustifyRight,JustifyBlock,CreateDiv,Outdent,Indent,BulletedList,NumberedList,CopyFormatting,RemoveFormat,Superscript,Subscript,Strike,Form,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,Scayt,SelectAll,Find,Replace,Undo,Redo,Templates,Cut,Copy,Paste,PasteText,PasteFromWord';
};