if(document.getElementById('basic-editor')){
    var basicEditor = document.querySelectorAll('#basic-editor')
    basicEditor.forEach(function(elem){
        ClassicEditor
            .create(elem, {
                toolbar: {
                    items: [
                        'bold', 'italic', 'underline', 'link', '|',
                        'undo', 'redo'
                    ]
                },
                language: 'pt-br',
                table: {
                    contentToolbar: [
                        'tableColumn',
                        'tableRow',
                        'mergeTableCells'
                    ]
                },
                licenseKey: '',
            })
            .then(editor => {
                console.log(editor);
            })
            .catch(error => {
                console.error(error);
            });
    })
}

if(document.getElementById('complete-editor')){
    var completeEditor = document.querySelectorAll('#complete-editor')
    completeEditor.forEach(function(elem){
        ClassicEditor
            .create(elem, {
                toolbar: {
                    items: [
                        'bold', 'italic', 'underline', 'alignment', 'fontBackgroundColor', 'fontColor', 'link', '|',
                        'bulletedList', 'numberedList', 'outdent', 'indent', '|',
                        'code', 'codeBlock', '|',
                        'blockQuote', 'insertTable', 'mediaEmbed', 'undo', 'redo'
                    ]
                },
                language: 'pt-br',
                table: {
                    contentToolbar: [
                        'tableColumn',
                        'tableRow',
                        'mergeTableCells'
                    ]
                },
                licenseKey: '',
            })
            .then(editor => {
                console.log(editor);
            })
            .catch(error => {
                console.error(error);
            });
    })
}
