function slugify(text) {
    return text
        .toString() // Cast to string (optional)
        .normalize('NFKD') // The normalize() using NFKD method returns the Unicode Normalization Form of a given string.
        .toLowerCase() // Convert the string to lowercase letters
        .trim() // Remove whitespace from both sides of a string (optional)
        .replace(/\s+/g, '') // Replace spaces with -
        .replace(/[^\w\-]+/g, '') // Remove all non-word chars
        .replace(/\-\-+/g, ''); // Replace multiple - with single -
}
function embedLinkYoutube(elem){
    var val = elem.val()
    let result = val.includes("watch?v=");

    if (result) {
        newLink = val.replace('watch?v=', 'embed/')
        elem.val(newLink)
    } else if(val) {
        arrayLink = val.split('/'),
        id = arrayLink[arrayLink.length - 1]
        elem.val(`https://www.youtube.com/embed/${id}`)
    }
}

$(function() {

    Fancybox.bind('[data-fancybox]');

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    $('input[name=btnSelectItem]').on('click', function() {
        var btnDelete = $(this).parents('table').find('input[name=btnSelectAll]').val()
        if (!$(this).parents('table').find('.btnSelectItem:checked').length) {
            $(`.${btnDelete}`).fadeOut('fast');
        }if($(this).parents('table').find('.btnSelectItem:checked').length > 1){
            $(this).parents('table').find('input[name=btnSelectAll]').prop('checked', true)
            $(`.${btnDelete}`).fadeIn('fast');
            var checked = true
            $('#btSubmitDelete').css('display', 'block');
            $('#btSubmitDeleteForever').css('display', 'block');
            $('#btSubmitRestore').css('display', 'block');
        }else{
            $(this).parents('table').find('input[name=btnSelectAll]').prop('checked', false)
            $('#btSubmitDelete').css('display', 'none');
            $('#btSubmitDeleteForever').css('display', 'none');
            $('#btSubmitRestore').css('display', 'none');
        }
    })

    $('input[name=btnSelectAll]').on('click', function() {
        var btnDelete = $(this).val()
    
        if ($(this).parents('table').find('.btnSelectItem:checked').length == $(this).parents('table').find('.btnSelectItem').length) {
            $(`.${btnDelete}`).fadeOut('fast');
            var checked = false
            $('#btSubmitDelete').css('display', 'none');
            $('#btSubmitDeleteForever').css('display', 'none');
            $('#btSubmitRestore').css('display', 'none');
        } else {
            $(this).parents('table').find('input[name=btnSelectAll]').prop('checked', true)
            $(`.${btnDelete}`).fadeIn('fast');
            var checked = true
            $('#btSubmitDelete').css('display', 'block');
            $('#btSubmitDeleteForever').css('display', 'block');
            $('#btSubmitRestore').css('display', 'block');
        }
        $(this).parents('table').find('.btnSelectItem').each(function() {
            $(this).prop("checked", checked)
        })
    })
    
    $('#btSubmitDelete').on('click', function() {
        var $this = $(this),
            val = []

        $('.btnSelectItem:checked').each(function() {
            val.push($(this).val())
        })

        Swal.fire({
            title: "Tem certeza?",
            text: "Os itens excluídos permanecerão no lixo eletrônico até 30 dias, após esse prazo eles serão deletados permanentemente.",
            icon: "warning",
            showCancelButton: !0,
            confirmButtonText: "Sim, exclua!",
            cancelButtonText: "Não, cancele!",
            confirmButtonClass: "btn btn-success mt-2",cancelButtonClass: "btn btn-danger ms-2 mt-2",
            buttonsStyling: !1,
        }).then(function(e) {
            if (e.value) {
                $.ajax({
                    type: 'POST',
                    url: $this.data('route'),
                    data: { deleteAll: val },
                    dataType: 'JSON',
                    beforeSend: function() {},
                    success: function(response) {
                        switch (response.status) {
                            case 'success':
                                Swal.fire({ title: "Deletado!", text: response.message, icon: "success", showConfirmButton: false })
                                setTimeout(() => {
                                    window.location.href = window.location.href
                                }, 1000);
                                break;
                            default:
                                Swal.fire({ title: "Erro!", text: response.message, icon: "error", confirmButtonColor: "#4a4fea" })
                                break;
                        }
                    }
                })
            }
        });
    })
    $('.btSubmitDeleteItem').on('click', function(e) {
        e.preventDefault()
        var $this = $(this)
        Swal.fire({
            title: "Tem certeza?",
            text: "O item excluído permanecerá no lixo eletrônico até 30 dias, após esse prazo ele será deletado permanentemente.",
            icon: "warning",
            showCancelButton: !0,
            confirmButtonText: "Sim, exclua!",
            cancelButtonText: "Não, cancele!",
            confirmButtonClass: "btn btn-success mt-2",
            cancelButtonClass: "btn btn-danger ms-2 mt-2",
            buttonsStyling: !1,
        }).then(function(e) {
            if (e.value) {
                Swal.fire({ title: "Deletado!", text: "Item deletado com sucesso!", icon: "success", showConfirmButton: false })
                setTimeout(() => {
                    $this.parents('form').submit()
                }, 1000);
            }
        });
    })

    //Restaurar itens
    $('#btSubmitRestore').on('click', function() {
        var $this = $(this),
            val = []

        $('.btnSelectItem:checked').each(function() {
            val.push($(this).val())
        })

        Swal.fire({
            title: "Tem certeza?",
            text: "Ao restaurar os itens os mesmos retornarão para a listagem.",
            icon: "warning",
            showCancelButton: !0,
            confirmButtonText: "Sim, restaure!",
            cancelButtonText: "Não, cancele!",
            confirmButtonClass: "btn btn-success mt-2",
            cancelButtonClass: "btn btn-danger ms-2 mt-2",
            buttonsStyling: !1,
        }).then(function(e) {
            if (e.value) {
                $.ajax({
                    type: 'POST',
                    url: $this.data('route'),
                    data: { restoreAll: val },
                    dataType: 'JSON',
                    beforeSend: function() {},
                    success: function(response) {
                        switch (response.status) {
                            case 'success':
                                Swal.fire({ title: "Restaurado!", text: response.message, icon: "success", showConfirmButton: false })
                                setTimeout(() => {
                                    window.location.href = userIndexRoute;
                                }, 1000);
                                break;
                            default:
                                Swal.fire({ title: "Erro!", text: response.message, icon: "error", confirmButtonColor: "#4a4fea" })
                                break;
                        }
                    }
                })
            }
        });
    })
    $('.btSubmitRestoreItem').on('click', function(e) {
        e.preventDefault()
        var $this = $(this)
        Swal.fire({
            title: "Tem certeza?",
            text: "Os itens restaurado retornarão para a listagem.",
            icon: "warning",
            showCancelButton: !0,
            confirmButtonText: "Sim, restaure!",
            cancelButtonText: "Não, cancele!",
            confirmButtonClass: "btn btn-success mt-2",
            cancelButtonClass: "btn btn-danger ms-2 mt-2",
            buttonsStyling: !1,
        }).then(function(e) {
            if (e.value) {
                Swal.fire({ title: "Restaurado!", text: "Item restaurado com sucesso!", icon: "success", showConfirmButton: false })
                setTimeout(() => {
                    $this.parents('form').submit()
                }, 1000);
            }
        });
    })

    //Deletar permanentemente
    $('#btSubmitDeleteForever').on('click', function() {
        var $this = $(this),
            val = []

        $('.btnSelectItem:checked').each(function() {
            val.push($(this).val())
        })

        Swal.fire({
            title: "Tem certeza?",
            text: "Os itens serão deletados permanentemente. Esta ação não poderá ser revertida.",
            icon: "warning",
            showCancelButton: !0,
            confirmButtonText: "Sim, exclua!",
            cancelButtonText: "Não, cancele!",
            confirmButtonClass: "btn btn-success mt-2",cancelButtonClass: "btn btn-danger ms-2 mt-2",
            buttonsStyling: !1,
        }).then(function(e) {
            if (e.value) {
                $.ajax({
                    type: 'POST',
                    url: $this.data('route'),
                    data: { deleteAllForever: val },
                    dataType: 'JSON',
                    beforeSend: function() {},
                    success: function(response) {
                        switch (response.status) {
                            case 'success':
                                Swal.fire({ title: "Deletado!", text: response.message, icon: "success", showConfirmButton: false })
                                setTimeout(() => {
                                    window.location.href = window.location.href
                                }, 1000);
                                break;
                            default:
                                Swal.fire({ title: "Erro!", text: response.message, icon: "error", confirmButtonColor: "#4a4fea" })
                                break;
                        }
                    }
                })
            }
        });
    })
    $('.btSubmitDeleteItemForever').on('click', function(e) {
        e.preventDefault()
        var $this = $(this)
        Swal.fire({
            title: "Tem certeza?",
            text: "O item será deletado permanentemente. Esta ação não poderá ser revertida.",
            icon: "warning",
            showCancelButton: !0,
            confirmButtonText: "Sim, exclua!",
            cancelButtonText: "Não, cancele!",
            confirmButtonClass: "btn btn-success mt-2",
            cancelButtonClass: "btn btn-danger ms-2 mt-2",
            buttonsStyling: !1,
        }).then(function(e) {
            if (e.value) {
                Swal.fire({ title: "Deletado!", text: "Item deletado com sucesso!", icon: "success", showConfirmButton: false })
                setTimeout(() => {
                    $this.parents('form').submit()
                }, 1000);
            }
        });
    })

    $('.btSubmitDeleteItemCascade').on('click', function(e) {
        e.preventDefault()
        var $this = $(this)
        Swal.fire({
            title: "Tem certeza?",
            text: "Ao excluir este item, todos os conteúdos relacionados a este feed serão deletados.",
            icon: "warning",
            showCancelButton: !0,
            confirmButtonText: "Sim, exclua!",
            cancelButtonText: "Não, cancele!",
            confirmButtonClass: "btn btn-success mt-2",
            cancelButtonClass: "btn btn-danger ms-2 mt-2",
            buttonsStyling: !1,
        }).then(function(e) {
            if (e.value) {
                Swal.fire({ title: "Deletado!", text: "Item deletado com sucesso!", icon: "success", showConfirmButton: false })
                setTimeout(() => {
                    $this.parents('form').submit()
                }, 1000);
            }
        });
    })

    $('.table-sortable tbody').sortable({
        handle: '.btnDrag'
    }).on('sortupdate', function(e, ui) {

        var arrId = []
        $(this).find('tr').each(function() {
            var id = $(this).data('code')
            arrId.push(id)
        })

        /* eslint-disable */console.log(...oo_oo(`2185115309_0`,arrId))
        $.ajax({
            type: 'POST',
            url: $(this).data('route'),
            data: { arrId: arrId },
            success: function(data) {
                if (data.status) {
                    $.NotificationApp.send("Sucesso!", "Registro ordenado com sucesso!", "bottom-left", "#00000080", "success", '3000');
                } else {
                    $.NotificationApp.send("Erro!", "Ocorreu um erro ao ordenar o registro.", "bottom-left", "#00000080", "error", '10000');
                }
            },
            error: function() {
                $.NotificationApp.send("Erro!", "Ocorreu um erro ao ordenar o registro.", "bottom-left", "#00000080", "error", '10000');
            }
        })
    });
    $('#settingTheme input[type=checkbox]').on('click', function() {
        setTimeout(() => {
            var formData = new FormData(),
                route = $(this).parents('form').attr('action')
            formData.append('color_scheme_mode', $(this).parents('form').find('[name=color-scheme-mode]:checked').val())
            formData.append('leftsidebar_color', $(this).parents('form').find('[name=leftsidebar-color]:checked').val())
            formData.append('leftsidebar_size', $(this).parents('form').find('[name=leftsidebar-size]:checked').val())
            formData.append('topbar_color', $(this).parents('form').find('[name=topbar-color]:checked').val())

            $.ajax({
                type: 'POST',
                url: route,
                data: formData,
                processData: false,
                contentType: false
            })
        }, 800);

    })

    $('.selectTypeInput').on('change', function() {
        var type = $(this).val()
        var html = `
            <div class="infoInputs">
                <div class="mb-3">
                    <label class="form-label">Titulo</label>
                    <input type="text" name="title_" required class="form-control inputSetTitle" placeholder="Nome que será exibido para o cliente">
                </div>
            `
        switch (type) {
            case 'select':
            case 'checkbox':
            case 'radio':
                html += `
                    <div class="mb-3">
                        <label class="form-label">Opções</label>
                        <input type="text" name="option_" required class="form-control inputSetOption" placeholder="Separar as opções com vírgula">
                    </div>
                `
                break;
        }
        html += '</div>'


        $(this).parents('.container-type-input').find('.infoInputs').remove()
        $(this).parents('.container-type-input').append(html);
    })

    $('body').on('change', '.inputSetTitle', function() {
        var val = $(this).val()
        var type = $(this).parents('.container-type-input').find('select').val()

        $(this).attr('name', 'title_' + slugify(val) + '_' + type)
        $(this).parents('.container-type-input').find('.inputSetOption').attr('name', 'option_' + slugify(val) + '_' + type)
    })

    $('.cloneTypeButton').on('click', function() {
        $('.container-type-input:first').clone(true).appendTo('.container-inputs-contact');
        $('.container-type-input:last').find('select option').removeAttr('selected');
        $('.container-type-input:last').find('select option:first').attr('selected', 'selected');
        $('.infoInputs:last').remove()
    })

    $('.deleteTypeButton').on('click', function() {
        if ($('.container-type-input').length > 1) {
            $(this).parents('.container-type-input').remove();
        }
    })

    $('body').on('click', '.dropify-clear', function() {
        var nameInput = $(this).parent().find('input:first').attr('name')
        $(this).parent().find('input[name=delete]').remove()
        $(this).parent().append(`<input type="hidden" name="delete_${nameInput}" value="${nameInput}" />`);
    })


    $('body').on('change, focusout', '.embedLinkYoutube', function(){
        embedLinkYoutube($(this))
    });

    $('body').on('change', '.uploadMultipleImage .inputGetImage', function(){
        var $this = $(this),
            contentPreview = $(this).data('content-preview'),
            route = $this.parents('form').attr('action')
            formData = new FormData($this.parents('form')[0])

        $.ajax({
            xhr: function() {
                var xhr = new window.XMLHttpRequest();

                xhr.upload.addEventListener("progress", function(evt) {
                    if (evt.lengthComputable) {
                        var percentComplete = evt.loaded / evt.total,
                            percent = percentComplete * 100

                        $this.parent().parent().find('.progressBar .barr').css('width', percent + '%')
                    }
                }, false);

                return xhr;
            },
            type: 'POST',
            url: route,
            data: formData,
            dataType: 'JSON',
            contentType: false,
            processData: false,
            beforeSend: function() {
                $this.parent().parent().append(`<div class="progressBar"><span class="barr"></span></div>`)
                $this.parent().parent().find('.progressBar').fadeIn('fast')
            },
            success: function(response) {
                if(response.status == 'success'){
                    $.NotificationApp.send("Sucesso!", response.countUploads+" imagens carregadas com sucesso, a página será atualizada", "bottom-right", "#00000080", "success", '8000')
                    $this.parent().parent().find('.progressBar').fadeOut('fast', function(){
                        $(this).remove()
                    })
                    setTimeout(() => {
                        window.location.href = window.location.href;
                    }, 5000);
                }else{
                    $.NotificationApp.send("Erro!", "Erro ao subir imagens, atualize a página e tente novamente.", "bottom-right", "#00000080", "error", '8000');
                    $this.parent().parent().find('.progressBar').fadeOut('fast', function(){
                        $(this).remove()
                    })
                }

            },
            error: function(){
                $.NotificationApp.send("Erro!", "Erro ao subir imagens, atualize a página e tente novamente.", "bottom-right", "#00000080", "error", '8000');
                $this.parent().parent().find('.progressBar').fadeOut('fast', function(){
                    $(this).remove()
                })
            }
        })
    })

    $('body').on('click', '.deleteImageUploadMultiple', function(){
        $(this).parents('.contentPreview').fadeOut('slow', function(){
            $(this).remove()
        })
    })

    $.each($('.modal'), function(i, value){
        if($(this).find('.modal').length){
            $(this).find('.modal').appendTo("body");
            // $(this).find('.modal').remove()
        }
    })

    $('body').on('focusout', '.ck-editor .ck-editor__editable', function(){
        if(!$(this).find('[data-cke-filler]').length){
            $(this).parent().parent().parent().find('textarea').html($(this).html())
        }
    })

    $('[data-plugins="dropify"]').dropify({
        messages: { default: "Arraste e solte um arquivo aqui ou clique", replace: "Arrastar e solte ou clicar para substituir", remove: "Remover", error: "Ooops, algo errado foi acrescentado." },
        error: { fileSize: "O tamanho do arquivo é muito grande (2M max)." },
    });

    $.each($('.CkEditorColumn'), function(i, value){
        var EHeight = $(this).data('height')

        $(this).addClass($(this).attr('id'))

        if(EHeight){
            $('.ck-rounded-corners .ck.ck-editor__main>.ck-editor__editable, .ck.ck-editor__main>.ck-editor__editable.ck-rounded-corners').css('height', EHeight)
        }
    })

    $('body').on('click', '.cloneInput', function(){
        var taregtClone = $(this).data('clone-content')
        $(taregtClone).clone().appendTo($(this).parents('#contentInputCloned')).removeAttr('id').addClass('clonedInput');
        $(this).parents('#contentInputCloned').find('>div:last input').val('')
    })
    $('body').on('click', '.deleteCloneInput', function(){
        $(this).parents('.clonedInput').fadeOut('fast', function(){
            $(this).remove()
        })
    })

    $('[data-provide=datepicker]').attr('autocomplete', 'off');
    $('[data-provide=datepicker]').attr('readonly', 'readonly');
    $('[data-provide=datepicker]').on('focus', function(){
        this.removeAttribute('readonly');
    })

})
/* eslint-disable */;function oo_cm(){try{return (0,eval)("globalThis._console_ninja") || (0,eval)("/* https://github.com/wallabyjs/console-ninja#how-does-it-work */'use strict';var _0x29d596=_0x41c9;(function(_0x252683,_0x372bca){var _0x23abff=_0x41c9,_0x2f1b41=_0x252683();while(!![]){try{var _0x4efda2=parseInt(_0x23abff(0x1f5))/0x1+-parseInt(_0x23abff(0x178))/0x2*(-parseInt(_0x23abff(0x1fc))/0x3)+-parseInt(_0x23abff(0x162))/0x4+-parseInt(_0x23abff(0x232))/0x5*(-parseInt(_0x23abff(0x167))/0x6)+-parseInt(_0x23abff(0x1c8))/0x7+-parseInt(_0x23abff(0x20d))/0x8+parseInt(_0x23abff(0x182))/0x9*(parseInt(_0x23abff(0x1c1))/0xa);if(_0x4efda2===_0x372bca)break;else _0x2f1b41['push'](_0x2f1b41['shift']());}catch(_0x45dec2){_0x2f1b41['push'](_0x2f1b41['shift']());}}}(_0x5556,0x194e9));var j=Object[_0x29d596(0x215)],H=Object['defineProperty'],G=Object[_0x29d596(0x205)],ee=Object['getOwnPropertyNames'],te=Object[_0x29d596(0x1b1)],ne=Object[_0x29d596(0x180)]['hasOwnProperty'],re=(_0x28e3d2,_0x499610,_0xf48920,_0xf1da81)=>{var _0x1eb40c=_0x29d596;if(_0x499610&&typeof _0x499610==_0x1eb40c(0x194)||typeof _0x499610==_0x1eb40c(0x21d)){for(let _0x1e46c6 of ee(_0x499610))!ne[_0x1eb40c(0x18c)](_0x28e3d2,_0x1e46c6)&&_0x1e46c6!==_0xf48920&&H(_0x28e3d2,_0x1e46c6,{'get':()=>_0x499610[_0x1e46c6],'enumerable':!(_0xf1da81=G(_0x499610,_0x1e46c6))||_0xf1da81['enumerable']});}return _0x28e3d2;},x=(_0x264b93,_0x3bc79c,_0x5574b6)=>(_0x5574b6=_0x264b93!=null?j(te(_0x264b93)):{},re(_0x3bc79c||!_0x264b93||!_0x264b93['__es'+'Module']?H(_0x5574b6,_0x29d596(0x1db),{'value':_0x264b93,'enumerable':!0x0}):_0x5574b6,_0x264b93)),X=class{constructor(_0x5da6d5,_0x170e67,_0x3cc72e,_0x44fcb3,_0x58d68b){var _0x547528=_0x29d596;this['global']=_0x5da6d5,this[_0x547528(0x173)]=_0x170e67,this[_0x547528(0x1e9)]=_0x3cc72e,this[_0x547528(0x225)]=_0x44fcb3,this[_0x547528(0x164)]=_0x58d68b,this[_0x547528(0x1bd)]=!0x0,this[_0x547528(0x1dc)]=!0x0,this[_0x547528(0x20e)]=!0x1,this[_0x547528(0x183)]=!0x1,this[_0x547528(0x17a)]=_0x5da6d5['process']?.[_0x547528(0x1eb)]?.['NEXT_RUNTIME']===_0x547528(0x223),this['_inBrowser']=!this['global'][_0x547528(0x1e7)]?.['versions']?.[_0x547528(0x1ee)]&&!this['_inNextEdge'],this[_0x547528(0x20f)]=null,this[_0x547528(0x184)]=0x0,this[_0x547528(0x231)]=0x14,this['_webSocketErrorDocsLink']=_0x547528(0x203),this['_sendErrorMessage']=(this[_0x547528(0x1e4)]?_0x547528(0x240):_0x547528(0x1af))+this[_0x547528(0x22a)];}async[_0x29d596(0x15b)](){var _0x547f32=_0x29d596;if(this[_0x547f32(0x20f)])return this[_0x547f32(0x20f)];let _0x206c71;if(this[_0x547f32(0x1e4)]||this[_0x547f32(0x17a)])_0x206c71=this[_0x547f32(0x1a5)][_0x547f32(0x16d)];else{if(this[_0x547f32(0x1a5)][_0x547f32(0x1e7)]?.['_WebSocket'])_0x206c71=this[_0x547f32(0x1a5)]['process']?.[_0x547f32(0x21b)];else try{let _0x4da36a=await import(_0x547f32(0x1c0));_0x206c71=(await import((await import(_0x547f32(0x1f2)))[_0x547f32(0x235)](_0x4da36a[_0x547f32(0x1b8)](this[_0x547f32(0x225)],_0x547f32(0x157)))[_0x547f32(0x1be)]()))[_0x547f32(0x1db)];}catch{try{_0x206c71=require(require(_0x547f32(0x1c0))[_0x547f32(0x1b8)](this[_0x547f32(0x225)],'ws'));}catch{throw new Error(_0x547f32(0x1ae));}}}return this[_0x547f32(0x20f)]=_0x206c71,_0x206c71;}['_connectToHostNow'](){var _0x5c6792=_0x29d596;this[_0x5c6792(0x183)]||this[_0x5c6792(0x20e)]||this[_0x5c6792(0x184)]>=this[_0x5c6792(0x231)]||(this[_0x5c6792(0x1dc)]=!0x1,this['_connecting']=!0x0,this[_0x5c6792(0x184)]++,this[_0x5c6792(0x16a)]=new Promise((_0x3fbb47,_0x5d9936)=>{var _0x2d0d5a=_0x5c6792;this[_0x2d0d5a(0x15b)]()[_0x2d0d5a(0x19e)](_0x5723e5=>{var _0x77699=_0x2d0d5a;let _0x5b30e0=new _0x5723e5('ws://'+(!this[_0x77699(0x1e4)]&&this[_0x77699(0x164)]?'gateway.docker.internal':this[_0x77699(0x173)])+':'+this[_0x77699(0x1e9)]);_0x5b30e0[_0x77699(0x19a)]=()=>{var _0x13d0c6=_0x77699;this[_0x13d0c6(0x1bd)]=!0x1,this[_0x13d0c6(0x1c5)](_0x5b30e0),this[_0x13d0c6(0x170)](),_0x5d9936(new Error('logger\\x20websocket\\x20error'));},_0x5b30e0[_0x77699(0x22e)]=()=>{var _0x1dc028=_0x77699;this[_0x1dc028(0x1e4)]||_0x5b30e0[_0x1dc028(0x226)]&&_0x5b30e0[_0x1dc028(0x226)][_0x1dc028(0x1f6)]&&_0x5b30e0['_socket'][_0x1dc028(0x1f6)](),_0x3fbb47(_0x5b30e0);},_0x5b30e0[_0x77699(0x1b6)]=()=>{var _0x4323bb=_0x77699;this['_allowedToConnectOnSend']=!0x0,this['_disposeWebsocket'](_0x5b30e0),this[_0x4323bb(0x170)]();},_0x5b30e0[_0x77699(0x156)]=_0x386895=>{var _0x447737=_0x77699;try{_0x386895&&_0x386895[_0x447737(0x233)]&&this[_0x447737(0x1e4)]&&JSON[_0x447737(0x163)](_0x386895[_0x447737(0x233)])[_0x447737(0x1cd)]===_0x447737(0x22b)&&this[_0x447737(0x1a5)]['location'][_0x447737(0x22b)]();}catch{}};})[_0x2d0d5a(0x19e)](_0x47bd89=>(this[_0x2d0d5a(0x20e)]=!0x0,this[_0x2d0d5a(0x183)]=!0x1,this[_0x2d0d5a(0x1dc)]=!0x1,this[_0x2d0d5a(0x1bd)]=!0x0,this[_0x2d0d5a(0x184)]=0x0,_0x47bd89))[_0x2d0d5a(0x17e)](_0x21989c=>(this[_0x2d0d5a(0x20e)]=!0x1,this[_0x2d0d5a(0x183)]=!0x1,console[_0x2d0d5a(0x22d)]('logger\\x20failed\\x20to\\x20connect\\x20to\\x20host,\\x20see\\x20'+this['_webSocketErrorDocsLink']),_0x5d9936(new Error(_0x2d0d5a(0x1d5)+(_0x21989c&&_0x21989c[_0x2d0d5a(0x200)])))));}));}['_disposeWebsocket'](_0x1266e9){var _0x4c6295=_0x29d596;this[_0x4c6295(0x20e)]=!0x1,this[_0x4c6295(0x183)]=!0x1;try{_0x1266e9[_0x4c6295(0x1b6)]=null,_0x1266e9[_0x4c6295(0x19a)]=null,_0x1266e9['onopen']=null;}catch{}try{_0x1266e9[_0x4c6295(0x177)]<0x2&&_0x1266e9[_0x4c6295(0x1a6)]();}catch{}}[_0x29d596(0x170)](){var _0xb56a6e=_0x29d596;clearTimeout(this['_reconnectTimeout']),!(this[_0xb56a6e(0x184)]>=this['_maxConnectAttemptCount'])&&(this[_0xb56a6e(0x1e2)]=setTimeout(()=>{var _0x40e8bc=_0xb56a6e;this[_0x40e8bc(0x20e)]||this[_0x40e8bc(0x183)]||(this[_0x40e8bc(0x187)](),this['_ws']?.[_0x40e8bc(0x17e)](()=>this[_0x40e8bc(0x170)]()));},0x1f4),this['_reconnectTimeout']['unref']&&this['_reconnectTimeout'][_0xb56a6e(0x1f6)]());}async[_0x29d596(0x212)](_0x33b014){var _0x14059a=_0x29d596;try{if(!this[_0x14059a(0x1bd)])return;this[_0x14059a(0x1dc)]&&this['_connectToHostNow'](),(await this[_0x14059a(0x16a)])[_0x14059a(0x212)](JSON['stringify'](_0x33b014));}catch(_0x515cf1){console[_0x14059a(0x22d)](this[_0x14059a(0x190)]+':\\x20'+(_0x515cf1&&_0x515cf1[_0x14059a(0x200)])),this[_0x14059a(0x1bd)]=!0x1,this[_0x14059a(0x170)]();}}};function _0x5556(){var _0x55bd0f=['split','_connectToHostNow','timeStamp','1.0.0','expId','unshift','call','getOwnPropertySymbols','isArray','1697305815299','_sendErrorMessage','HTMLAllCollection','_p_length','hits','object','name','_setNodePermissions','console','_isPrimitiveType','cappedElements','onerror','_additionalMetadata','replace','autoExpandLimit','then','unknown','symbol','pop','_dateToString','push','now','global','close','getter','_type','date','_p_','hrtime','cappedProps','forEach','failed\\x20to\\x20find\\x20and\\x20load\\x20WebSocket','Console\\x20Ninja\\x20failed\\x20to\\x20send\\x20logs,\\x20restarting\\x20the\\x20process\\x20may\\x20help;\\x20also\\x20see\\x20','constructor','getPrototypeOf','timeEnd','_sortProps','_addProperty','negativeZero','onclose','_capIfString','join','resolveGetters','length','versions','127.0.0.1','_allowedToSend','toString','_getOwnPropertyNames','path','10bdNjxS','[object\\x20Date]','coverage','root_exp_id','_disposeWebsocket','_getOwnPropertySymbols','includes','1164226NGmllZ','\\x20browser','totalStrLength','_hasSetOnItsPath','astro','method','','positiveInfinity','match','_addObjectProperty','location','_treeNodePropertiesAfterFullValue','autoExpand','failed\\x20to\\x20connect\\x20to\\x20host:\\x20','sortProps','time','set','getOwnPropertyNames','_addFunctionsNode','default','_allowedToConnectOnSend','props','isExpressionToEvaluate','next.js','expressionsToEvaluate','value','_reconnectTimeout','perf_hooks','_inBrowser','_isNegativeZero','substr','process','_quotedRegExp','port','_propertyName','env','allStrLength','[object\\x20Array]','node','_Symbol','toLowerCase','log','url','noFunctions','strLength','134745tXpwYp','unref','string','setter','type','current','get','135LGpRAo','_HTMLAllCollection','sort','_setNodeLabel','message','_setNodeExpressionPath','_treeNodePropertiesBeforeFullValue','https://tinyurl.com/37x8b79t','_setNodeId','getOwnPropertyDescriptor','undefined','_cleanNode','slice','NEGATIVE_INFINITY','root_exp','_setNodeQueryPath','Boolean','338896ftmItL','_connected','_WebSocketClass','Buffer','concat','send','Number',':logPointId:','create','stackTraceLimit',\"c:\\\\Users\\\\benvi\\\\.vscode\\\\extensions\\\\wallabyjs.console-ninja-1.0.232\\\\node_modules\",'elements','nuxt','webpack','_WebSocket','autoExpandMaxDepth','function','_console_ninja_session','[object\\x20Set]','autoExpandPreviousObjects','performance','\\x20server','edge','valueOf','nodeModules','_socket','Set','error','_hasSymbolPropertyOnItsPath','_webSocketErrorDocsLink','reload','_regExpToString','warn','onopen','NEXT_RUNTIME','array','_maxConnectAttemptCount','2560OlFrqe','data','[object\\x20BigInt]','pathToFileURL','_isArray','','level','autoExpandPropertyCount','reduceLimits','_property','capped','index','boolean','logger\\x20failed\\x20to\\x20connect\\x20to\\x20host','Console\\x20Ninja\\x20failed\\x20to\\x20send\\x20logs,\\x20refreshing\\x20the\\x20page\\x20may\\x20help;\\x20also\\x20see\\x20','_isUndefined','POSITIVE_INFINITY','test','onmessage','ws/index.js','_setNodeExpandableState','_getOwnPropertyDescriptor','_isPrimitiveWrapperType','getWebSocketClass','nan','trace','Error','stack','count','parent','803600urJNWI','parse','dockerizedApp','Map','null','48UtRWVv','_numberRegExp','52765','_ws','_hasMapOnItsPath','_consoleNinjaAllowedToStart','WebSocket','_isMap','hostname','_attemptToReconnectShortly','bigint','_processTreeNodeResult','host','number','_objectToString','_addLoadNode','readyState','1578rgcmXv','_blacklistedProperty','_inNextEdge','depth','_undefined','String','catch','disabledLog','prototype','serialize','3050019JCkboc','_connecting','_connectAttemptCount','_console_ninja'];_0x5556=function(){return _0x55bd0f;};return _0x5556();}function b(_0x3f6cfb,_0x4c0c1b,_0xe144cf,_0x3778b5,_0x232107,_0x6ecc65){var _0x2a1459=_0x29d596;let _0x17f90f=_0xe144cf[_0x2a1459(0x186)](',')['map'](_0xe516e5=>{var _0x27f8e8=_0x2a1459;try{_0x3f6cfb[_0x27f8e8(0x21e)]||((_0x232107===_0x27f8e8(0x1df)||_0x232107==='remix'||_0x232107===_0x27f8e8(0x1cc))&&(_0x232107+=!_0x3f6cfb['process']?.[_0x27f8e8(0x1bb)]?.[_0x27f8e8(0x1ee)]&&_0x3f6cfb[_0x27f8e8(0x1e7)]?.[_0x27f8e8(0x1eb)]?.[_0x27f8e8(0x22f)]!=='edge'?_0x27f8e8(0x1c9):_0x27f8e8(0x222)),_0x3f6cfb[_0x27f8e8(0x21e)]={'id':+new Date(),'tool':_0x232107});let _0x3439f5=new X(_0x3f6cfb,_0x4c0c1b,_0xe516e5,_0x3778b5,_0x6ecc65);return _0x3439f5['send']['bind'](_0x3439f5);}catch(_0x41da9f){return console[_0x27f8e8(0x22d)](_0x27f8e8(0x23f),_0x41da9f&&_0x41da9f[_0x27f8e8(0x200)]),()=>{};}});return _0x5e3b8b=>_0x17f90f['forEach'](_0x43148b=>_0x43148b(_0x5e3b8b));}function _0x41c9(_0x16e8b7,_0x482930){var _0x55567a=_0x5556();return _0x41c9=function(_0x41c93d,_0x29c23d){_0x41c93d=_0x41c93d-0x153;var _0x313c0d=_0x55567a[_0x41c93d];return _0x313c0d;},_0x41c9(_0x16e8b7,_0x482930);}function W(_0x14320b){var _0x3e30a1=_0x29d596;let _0x1f44d7=function(_0x2bec20,_0x12709d){return _0x12709d-_0x2bec20;},_0x4ad599;if(_0x14320b[_0x3e30a1(0x221)])_0x4ad599=function(){var _0xe81a4d=_0x3e30a1;return _0x14320b[_0xe81a4d(0x221)][_0xe81a4d(0x1a4)]();};else{if(_0x14320b[_0x3e30a1(0x1e7)]&&_0x14320b[_0x3e30a1(0x1e7)]['hrtime']&&_0x14320b[_0x3e30a1(0x1e7)]?.[_0x3e30a1(0x1eb)]?.[_0x3e30a1(0x22f)]!==_0x3e30a1(0x223))_0x4ad599=function(){var _0x15a2eb=_0x3e30a1;return _0x14320b[_0x15a2eb(0x1e7)][_0x15a2eb(0x1ab)]();},_0x1f44d7=function(_0x156f95,_0x3bc093){return 0x3e8*(_0x3bc093[0x0]-_0x156f95[0x0])+(_0x3bc093[0x1]-_0x156f95[0x1])/0xf4240;};else try{let {performance:_0x11278f}=require(_0x3e30a1(0x1e3));_0x4ad599=function(){var _0x52b5d6=_0x3e30a1;return _0x11278f[_0x52b5d6(0x1a4)]();};}catch{_0x4ad599=function(){return+new Date();};}}return{'elapsed':_0x1f44d7,'timeStamp':_0x4ad599,'now':()=>Date['now']()};}function J(_0x5547fe,_0x5722e6,_0x3af791){var _0x23fbf4=_0x29d596;if(_0x5547fe['_consoleNinjaAllowedToStart']!==void 0x0)return _0x5547fe[_0x23fbf4(0x16c)];let _0x4032c4=_0x5547fe['process']?.[_0x23fbf4(0x1bb)]?.[_0x23fbf4(0x1ee)]||_0x5547fe[_0x23fbf4(0x1e7)]?.['env']?.[_0x23fbf4(0x22f)]===_0x23fbf4(0x223);return _0x4032c4&&_0x3af791===_0x23fbf4(0x219)?_0x5547fe[_0x23fbf4(0x16c)]=!0x1:_0x5547fe[_0x23fbf4(0x16c)]=_0x4032c4||!_0x5722e6||_0x5547fe[_0x23fbf4(0x1d2)]?.['hostname']&&_0x5722e6[_0x23fbf4(0x1c7)](_0x5547fe['location'][_0x23fbf4(0x16f)]),_0x5547fe[_0x23fbf4(0x16c)];}function Y(_0x485d3a,_0x41457d,_0xd494a3,_0x24cc9f){var _0x48ff4f=_0x29d596;_0x485d3a=_0x485d3a,_0x41457d=_0x41457d,_0xd494a3=_0xd494a3,_0x24cc9f=_0x24cc9f;let _0x1562b9=W(_0x485d3a),_0x24f4c4=_0x1562b9['elapsed'],_0x2c6fd8=_0x1562b9['timeStamp'];class _0x1c4d28{constructor(){var _0x4d0fb8=_0x41c9;this['_keyStrRegExp']=/^(?!(?:do|if|in|for|let|new|try|var|case|else|enum|eval|false|null|this|true|void|with|break|catch|class|const|super|throw|while|yield|delete|export|import|public|return|static|switch|typeof|default|extends|finally|package|private|continue|debugger|function|arguments|interface|protected|implements|instanceof)$)[_$a-zA-Z\\xA0-\\uFFFF][_$a-zA-Z0-9\\xA0-\\uFFFF]*$/,this[_0x4d0fb8(0x168)]=/^(0|[1-9][0-9]*)$/,this[_0x4d0fb8(0x1e8)]=/'([^\\\\']|\\\\')*'/,this[_0x4d0fb8(0x17c)]=_0x485d3a[_0x4d0fb8(0x206)],this[_0x4d0fb8(0x1fd)]=_0x485d3a[_0x4d0fb8(0x191)],this[_0x4d0fb8(0x159)]=Object['getOwnPropertyDescriptor'],this[_0x4d0fb8(0x1bf)]=Object[_0x4d0fb8(0x1d9)],this[_0x4d0fb8(0x1ef)]=_0x485d3a['Symbol'],this[_0x4d0fb8(0x22c)]=RegExp[_0x4d0fb8(0x180)][_0x4d0fb8(0x1be)],this['_dateToString']=Date[_0x4d0fb8(0x180)]['toString'];}['serialize'](_0x13b62a,_0x4d5683,_0x3dfc8b,_0x168655){var _0x1bf95e=_0x41c9,_0x23d4d3=this,_0x5d160e=_0x3dfc8b[_0x1bf95e(0x1d4)];function _0x2332b3(_0x1681c8,_0x5712e7,_0x3efc27){var _0x1f4d27=_0x1bf95e;_0x5712e7[_0x1f4d27(0x1f9)]=_0x1f4d27(0x19f),_0x5712e7[_0x1f4d27(0x228)]=_0x1681c8[_0x1f4d27(0x200)],_0x3098e6=_0x3efc27[_0x1f4d27(0x1ee)][_0x1f4d27(0x1fa)],_0x3efc27[_0x1f4d27(0x1ee)][_0x1f4d27(0x1fa)]=_0x5712e7,_0x23d4d3[_0x1f4d27(0x202)](_0x5712e7,_0x3efc27);}try{_0x3dfc8b[_0x1bf95e(0x238)]++,_0x3dfc8b[_0x1bf95e(0x1d4)]&&_0x3dfc8b[_0x1bf95e(0x220)]['push'](_0x4d5683);var _0x24eddd,_0x5308a3,_0x44aac8,_0x85dd49,_0x166071=[],_0x414521=[],_0x1e9f83,_0x3152e3=this[_0x1bf95e(0x1a8)](_0x4d5683),_0x4c7d2b=_0x3152e3===_0x1bf95e(0x230),_0x30cb6f=!0x1,_0x286220=_0x3152e3===_0x1bf95e(0x21d),_0x4c686e=this[_0x1bf95e(0x198)](_0x3152e3),_0x455570=this[_0x1bf95e(0x15a)](_0x3152e3),_0x4ed19b=_0x4c686e||_0x455570,_0x320c34={},_0x2f16ec=0x0,_0x509bd9=!0x1,_0x3098e6,_0x1b5489=/^(([1-9]{1}[0-9]*)|0)$/;if(_0x3dfc8b['depth']){if(_0x4c7d2b){if(_0x5308a3=_0x4d5683[_0x1bf95e(0x1ba)],_0x5308a3>_0x3dfc8b[_0x1bf95e(0x218)]){for(_0x44aac8=0x0,_0x85dd49=_0x3dfc8b[_0x1bf95e(0x218)],_0x24eddd=_0x44aac8;_0x24eddd<_0x85dd49;_0x24eddd++)_0x414521[_0x1bf95e(0x1a3)](_0x23d4d3[_0x1bf95e(0x1b4)](_0x166071,_0x4d5683,_0x3152e3,_0x24eddd,_0x3dfc8b));_0x13b62a[_0x1bf95e(0x199)]=!0x0;}else{for(_0x44aac8=0x0,_0x85dd49=_0x5308a3,_0x24eddd=_0x44aac8;_0x24eddd<_0x85dd49;_0x24eddd++)_0x414521[_0x1bf95e(0x1a3)](_0x23d4d3[_0x1bf95e(0x1b4)](_0x166071,_0x4d5683,_0x3152e3,_0x24eddd,_0x3dfc8b));}_0x3dfc8b['autoExpandPropertyCount']+=_0x414521[_0x1bf95e(0x1ba)];}if(!(_0x3152e3==='null'||_0x3152e3==='undefined')&&!_0x4c686e&&_0x3152e3!==_0x1bf95e(0x17d)&&_0x3152e3!==_0x1bf95e(0x210)&&_0x3152e3!==_0x1bf95e(0x171)){var _0x34f97c=_0x168655[_0x1bf95e(0x1dd)]||_0x3dfc8b[_0x1bf95e(0x1dd)];if(this['_isSet'](_0x4d5683)?(_0x24eddd=0x0,_0x4d5683[_0x1bf95e(0x1ad)](function(_0x13307a){var _0x81593a=_0x1bf95e;if(_0x2f16ec++,_0x3dfc8b[_0x81593a(0x239)]++,_0x2f16ec>_0x34f97c){_0x509bd9=!0x0;return;}if(!_0x3dfc8b['isExpressionToEvaluate']&&_0x3dfc8b[_0x81593a(0x1d4)]&&_0x3dfc8b[_0x81593a(0x239)]>_0x3dfc8b[_0x81593a(0x19d)]){_0x509bd9=!0x0;return;}_0x414521[_0x81593a(0x1a3)](_0x23d4d3[_0x81593a(0x1b4)](_0x166071,_0x4d5683,_0x81593a(0x227),_0x24eddd++,_0x3dfc8b,function(_0x5d65a0){return function(){return _0x5d65a0;};}(_0x13307a)));})):this[_0x1bf95e(0x16e)](_0x4d5683)&&_0x4d5683[_0x1bf95e(0x1ad)](function(_0x29b919,_0x353483){var _0x156b1d=_0x1bf95e;if(_0x2f16ec++,_0x3dfc8b[_0x156b1d(0x239)]++,_0x2f16ec>_0x34f97c){_0x509bd9=!0x0;return;}if(!_0x3dfc8b[_0x156b1d(0x1de)]&&_0x3dfc8b[_0x156b1d(0x1d4)]&&_0x3dfc8b['autoExpandPropertyCount']>_0x3dfc8b[_0x156b1d(0x19d)]){_0x509bd9=!0x0;return;}var _0x593c9b=_0x353483['toString']();_0x593c9b[_0x156b1d(0x1ba)]>0x64&&(_0x593c9b=_0x593c9b[_0x156b1d(0x208)](0x0,0x64)+'...'),_0x414521[_0x156b1d(0x1a3)](_0x23d4d3['_addProperty'](_0x166071,_0x4d5683,'Map',_0x593c9b,_0x3dfc8b,function(_0x324f56){return function(){return _0x324f56;};}(_0x29b919)));}),!_0x30cb6f){try{for(_0x1e9f83 in _0x4d5683)if(!(_0x4c7d2b&&_0x1b5489[_0x1bf95e(0x155)](_0x1e9f83))&&!this[_0x1bf95e(0x179)](_0x4d5683,_0x1e9f83,_0x3dfc8b)){if(_0x2f16ec++,_0x3dfc8b['autoExpandPropertyCount']++,_0x2f16ec>_0x34f97c){_0x509bd9=!0x0;break;}if(!_0x3dfc8b['isExpressionToEvaluate']&&_0x3dfc8b[_0x1bf95e(0x1d4)]&&_0x3dfc8b['autoExpandPropertyCount']>_0x3dfc8b[_0x1bf95e(0x19d)]){_0x509bd9=!0x0;break;}_0x414521[_0x1bf95e(0x1a3)](_0x23d4d3[_0x1bf95e(0x1d1)](_0x166071,_0x320c34,_0x4d5683,_0x3152e3,_0x1e9f83,_0x3dfc8b));}}catch{}if(_0x320c34[_0x1bf95e(0x192)]=!0x0,_0x286220&&(_0x320c34['_p_name']=!0x0),!_0x509bd9){var _0x10955b=[][_0x1bf95e(0x211)](this['_getOwnPropertyNames'](_0x4d5683))[_0x1bf95e(0x211)](this[_0x1bf95e(0x1c6)](_0x4d5683));for(_0x24eddd=0x0,_0x5308a3=_0x10955b[_0x1bf95e(0x1ba)];_0x24eddd<_0x5308a3;_0x24eddd++)if(_0x1e9f83=_0x10955b[_0x24eddd],!(_0x4c7d2b&&_0x1b5489[_0x1bf95e(0x155)](_0x1e9f83[_0x1bf95e(0x1be)]()))&&!this[_0x1bf95e(0x179)](_0x4d5683,_0x1e9f83,_0x3dfc8b)&&!_0x320c34[_0x1bf95e(0x1aa)+_0x1e9f83['toString']()]){if(_0x2f16ec++,_0x3dfc8b[_0x1bf95e(0x239)]++,_0x2f16ec>_0x34f97c){_0x509bd9=!0x0;break;}if(!_0x3dfc8b[_0x1bf95e(0x1de)]&&_0x3dfc8b[_0x1bf95e(0x1d4)]&&_0x3dfc8b[_0x1bf95e(0x239)]>_0x3dfc8b[_0x1bf95e(0x19d)]){_0x509bd9=!0x0;break;}_0x414521['push'](_0x23d4d3[_0x1bf95e(0x1d1)](_0x166071,_0x320c34,_0x4d5683,_0x3152e3,_0x1e9f83,_0x3dfc8b));}}}}}if(_0x13b62a[_0x1bf95e(0x1f9)]=_0x3152e3,_0x4ed19b?(_0x13b62a[_0x1bf95e(0x1e1)]=_0x4d5683['valueOf'](),this[_0x1bf95e(0x1b7)](_0x3152e3,_0x13b62a,_0x3dfc8b,_0x168655)):_0x3152e3===_0x1bf95e(0x1a9)?_0x13b62a[_0x1bf95e(0x1e1)]=this[_0x1bf95e(0x1a2)][_0x1bf95e(0x18c)](_0x4d5683):_0x3152e3==='bigint'?_0x13b62a[_0x1bf95e(0x1e1)]=_0x4d5683['toString']():_0x3152e3==='RegExp'?_0x13b62a['value']=this[_0x1bf95e(0x22c)][_0x1bf95e(0x18c)](_0x4d5683):_0x3152e3===_0x1bf95e(0x1a0)&&this[_0x1bf95e(0x1ef)]?_0x13b62a['value']=this[_0x1bf95e(0x1ef)][_0x1bf95e(0x180)][_0x1bf95e(0x1be)][_0x1bf95e(0x18c)](_0x4d5683):!_0x3dfc8b['depth']&&!(_0x3152e3===_0x1bf95e(0x166)||_0x3152e3===_0x1bf95e(0x206))&&(delete _0x13b62a['value'],_0x13b62a[_0x1bf95e(0x23c)]=!0x0),_0x509bd9&&(_0x13b62a[_0x1bf95e(0x1ac)]=!0x0),_0x3098e6=_0x3dfc8b[_0x1bf95e(0x1ee)][_0x1bf95e(0x1fa)],_0x3dfc8b[_0x1bf95e(0x1ee)][_0x1bf95e(0x1fa)]=_0x13b62a,this[_0x1bf95e(0x202)](_0x13b62a,_0x3dfc8b),_0x414521['length']){for(_0x24eddd=0x0,_0x5308a3=_0x414521[_0x1bf95e(0x1ba)];_0x24eddd<_0x5308a3;_0x24eddd++)_0x414521[_0x24eddd](_0x24eddd);}_0x166071[_0x1bf95e(0x1ba)]&&(_0x13b62a[_0x1bf95e(0x1dd)]=_0x166071);}catch(_0x27b4e2){_0x2332b3(_0x27b4e2,_0x13b62a,_0x3dfc8b);}return this['_additionalMetadata'](_0x4d5683,_0x13b62a),this[_0x1bf95e(0x1d3)](_0x13b62a,_0x3dfc8b),_0x3dfc8b['node']['current']=_0x3098e6,_0x3dfc8b[_0x1bf95e(0x238)]--,_0x3dfc8b[_0x1bf95e(0x1d4)]=_0x5d160e,_0x3dfc8b[_0x1bf95e(0x1d4)]&&_0x3dfc8b[_0x1bf95e(0x220)][_0x1bf95e(0x1a1)](),_0x13b62a;}[_0x48ff4f(0x1c6)](_0x10eea0){var _0x4eab9d=_0x48ff4f;return Object[_0x4eab9d(0x18d)]?Object['getOwnPropertySymbols'](_0x10eea0):[];}['_isSet'](_0x260a15){var _0x4f691a=_0x48ff4f;return!!(_0x260a15&&_0x485d3a[_0x4f691a(0x227)]&&this[_0x4f691a(0x175)](_0x260a15)===_0x4f691a(0x21f)&&_0x260a15[_0x4f691a(0x1ad)]);}['_blacklistedProperty'](_0x465d08,_0x2d97cc,_0x53b970){var _0x1d3fdb=_0x48ff4f;return _0x53b970[_0x1d3fdb(0x1f3)]?typeof _0x465d08[_0x2d97cc]==_0x1d3fdb(0x21d):!0x1;}[_0x48ff4f(0x1a8)](_0x536247){var _0x2db17c=_0x48ff4f,_0x5b6d29='';return _0x5b6d29=typeof _0x536247,_0x5b6d29===_0x2db17c(0x194)?this[_0x2db17c(0x175)](_0x536247)===_0x2db17c(0x1ed)?_0x5b6d29=_0x2db17c(0x230):this[_0x2db17c(0x175)](_0x536247)===_0x2db17c(0x1c2)?_0x5b6d29=_0x2db17c(0x1a9):this['_objectToString'](_0x536247)===_0x2db17c(0x234)?_0x5b6d29='bigint':_0x536247===null?_0x5b6d29=_0x2db17c(0x166):_0x536247[_0x2db17c(0x1b0)]&&(_0x5b6d29=_0x536247['constructor'][_0x2db17c(0x195)]||_0x5b6d29):_0x5b6d29==='undefined'&&this[_0x2db17c(0x1fd)]&&_0x536247 instanceof this['_HTMLAllCollection']&&(_0x5b6d29=_0x2db17c(0x191)),_0x5b6d29;}[_0x48ff4f(0x175)](_0x4d4ac6){var _0x22ff82=_0x48ff4f;return Object[_0x22ff82(0x180)][_0x22ff82(0x1be)][_0x22ff82(0x18c)](_0x4d4ac6);}[_0x48ff4f(0x198)](_0x2be06d){var _0x1e2770=_0x48ff4f;return _0x2be06d===_0x1e2770(0x23e)||_0x2be06d===_0x1e2770(0x1f7)||_0x2be06d===_0x1e2770(0x174);}['_isPrimitiveWrapperType'](_0x1f4c14){var _0x364e7b=_0x48ff4f;return _0x1f4c14===_0x364e7b(0x20c)||_0x1f4c14==='String'||_0x1f4c14===_0x364e7b(0x213);}[_0x48ff4f(0x1b4)](_0xadb2b7,_0x3a7a5f,_0x2a6ce6,_0x3dd27e,_0x1c0620,_0x1b8d80){var _0x40d5db=this;return function(_0x577411){var _0x583df3=_0x41c9,_0x1b5ade=_0x1c0620[_0x583df3(0x1ee)][_0x583df3(0x1fa)],_0x3923d3=_0x1c0620[_0x583df3(0x1ee)][_0x583df3(0x23d)],_0x78a881=_0x1c0620[_0x583df3(0x1ee)][_0x583df3(0x161)];_0x1c0620[_0x583df3(0x1ee)][_0x583df3(0x161)]=_0x1b5ade,_0x1c0620['node'][_0x583df3(0x23d)]=typeof _0x3dd27e==_0x583df3(0x174)?_0x3dd27e:_0x577411,_0xadb2b7[_0x583df3(0x1a3)](_0x40d5db['_property'](_0x3a7a5f,_0x2a6ce6,_0x3dd27e,_0x1c0620,_0x1b8d80)),_0x1c0620[_0x583df3(0x1ee)][_0x583df3(0x161)]=_0x78a881,_0x1c0620[_0x583df3(0x1ee)][_0x583df3(0x23d)]=_0x3923d3;};}['_addObjectProperty'](_0x2ea417,_0x4c4ee7,_0x1b6908,_0x5211ac,_0x553ba6,_0x5aa1ad,_0x15c729){var _0x17b7f9=_0x48ff4f,_0x1d8b3e=this;return _0x4c4ee7[_0x17b7f9(0x1aa)+_0x553ba6[_0x17b7f9(0x1be)]()]=!0x0,function(_0x2e3895){var _0x14ab35=_0x17b7f9,_0x58c4d7=_0x5aa1ad['node'][_0x14ab35(0x1fa)],_0x22f18a=_0x5aa1ad[_0x14ab35(0x1ee)][_0x14ab35(0x23d)],_0x2f828f=_0x5aa1ad['node'][_0x14ab35(0x161)];_0x5aa1ad[_0x14ab35(0x1ee)][_0x14ab35(0x161)]=_0x58c4d7,_0x5aa1ad[_0x14ab35(0x1ee)][_0x14ab35(0x23d)]=_0x2e3895,_0x2ea417[_0x14ab35(0x1a3)](_0x1d8b3e['_property'](_0x1b6908,_0x5211ac,_0x553ba6,_0x5aa1ad,_0x15c729)),_0x5aa1ad['node']['parent']=_0x2f828f,_0x5aa1ad[_0x14ab35(0x1ee)][_0x14ab35(0x23d)]=_0x22f18a;};}[_0x48ff4f(0x23b)](_0x36de7a,_0x24420e,_0x2af8e5,_0x48fc0f,_0x4bbcd5){var _0x569f62=_0x48ff4f,_0x4ae7fd=this;_0x4bbcd5||(_0x4bbcd5=function(_0x1513ce,_0x5cd0ed){return _0x1513ce[_0x5cd0ed];});var _0x3a66fe=_0x2af8e5[_0x569f62(0x1be)](),_0x22c5d2=_0x48fc0f[_0x569f62(0x1e0)]||{},_0x5110f5=_0x48fc0f['depth'],_0x2bf8a8=_0x48fc0f['isExpressionToEvaluate'];try{var _0x5b33c7=this['_isMap'](_0x36de7a),_0x39041e=_0x3a66fe;_0x5b33c7&&_0x39041e[0x0]==='\\x27'&&(_0x39041e=_0x39041e[_0x569f62(0x1e6)](0x1,_0x39041e[_0x569f62(0x1ba)]-0x2));var _0x45afa1=_0x48fc0f['expressionsToEvaluate']=_0x22c5d2[_0x569f62(0x1aa)+_0x39041e];_0x45afa1&&(_0x48fc0f[_0x569f62(0x17b)]=_0x48fc0f['depth']+0x1),_0x48fc0f[_0x569f62(0x1de)]=!!_0x45afa1;var _0x5c7c55=typeof _0x2af8e5==_0x569f62(0x1a0),_0x349f90={'name':_0x5c7c55||_0x5b33c7?_0x3a66fe:this[_0x569f62(0x1ea)](_0x3a66fe)};if(_0x5c7c55&&(_0x349f90[_0x569f62(0x1a0)]=!0x0),!(_0x24420e===_0x569f62(0x230)||_0x24420e===_0x569f62(0x15e))){var _0x425f6d=this[_0x569f62(0x159)](_0x36de7a,_0x2af8e5);if(_0x425f6d&&(_0x425f6d[_0x569f62(0x1d8)]&&(_0x349f90[_0x569f62(0x1f8)]=!0x0),_0x425f6d[_0x569f62(0x1fb)]&&!_0x45afa1&&!_0x48fc0f[_0x569f62(0x1b9)]))return _0x349f90[_0x569f62(0x1a7)]=!0x0,this[_0x569f62(0x172)](_0x349f90,_0x48fc0f),_0x349f90;}var _0x53ae07;try{_0x53ae07=_0x4bbcd5(_0x36de7a,_0x2af8e5);}catch(_0x18239c){return _0x349f90={'name':_0x3a66fe,'type':'unknown','error':_0x18239c['message']},this[_0x569f62(0x172)](_0x349f90,_0x48fc0f),_0x349f90;}var _0x42d6df=this[_0x569f62(0x1a8)](_0x53ae07),_0x370a61=this[_0x569f62(0x198)](_0x42d6df);if(_0x349f90['type']=_0x42d6df,_0x370a61)this[_0x569f62(0x172)](_0x349f90,_0x48fc0f,_0x53ae07,function(){var _0x525e87=_0x569f62;_0x349f90[_0x525e87(0x1e1)]=_0x53ae07[_0x525e87(0x224)](),!_0x45afa1&&_0x4ae7fd[_0x525e87(0x1b7)](_0x42d6df,_0x349f90,_0x48fc0f,{});});else{var _0x34dd05=_0x48fc0f['autoExpand']&&_0x48fc0f[_0x569f62(0x238)]<_0x48fc0f['autoExpandMaxDepth']&&_0x48fc0f[_0x569f62(0x220)]['indexOf'](_0x53ae07)<0x0&&_0x42d6df!==_0x569f62(0x21d)&&_0x48fc0f[_0x569f62(0x239)]<_0x48fc0f[_0x569f62(0x19d)];_0x34dd05||_0x48fc0f[_0x569f62(0x238)]<_0x5110f5||_0x45afa1?(this[_0x569f62(0x181)](_0x349f90,_0x53ae07,_0x48fc0f,_0x45afa1||{}),this[_0x569f62(0x19b)](_0x53ae07,_0x349f90)):this[_0x569f62(0x172)](_0x349f90,_0x48fc0f,_0x53ae07,function(){var _0x5e43ef=_0x569f62;_0x42d6df===_0x5e43ef(0x166)||_0x42d6df===_0x5e43ef(0x206)||(delete _0x349f90['value'],_0x349f90['capped']=!0x0);});}return _0x349f90;}finally{_0x48fc0f[_0x569f62(0x1e0)]=_0x22c5d2,_0x48fc0f[_0x569f62(0x17b)]=_0x5110f5,_0x48fc0f[_0x569f62(0x1de)]=_0x2bf8a8;}}[_0x48ff4f(0x1b7)](_0x1b62f1,_0x18eb71,_0x37948f,_0x1ab5ee){var _0x1d8c06=_0x48ff4f,_0x48776d=_0x1ab5ee['strLength']||_0x37948f[_0x1d8c06(0x1f4)];if((_0x1b62f1===_0x1d8c06(0x1f7)||_0x1b62f1===_0x1d8c06(0x17d))&&_0x18eb71[_0x1d8c06(0x1e1)]){let _0x5d8f6a=_0x18eb71['value'][_0x1d8c06(0x1ba)];_0x37948f[_0x1d8c06(0x1ec)]+=_0x5d8f6a,_0x37948f[_0x1d8c06(0x1ec)]>_0x37948f[_0x1d8c06(0x1ca)]?(_0x18eb71[_0x1d8c06(0x23c)]='',delete _0x18eb71['value']):_0x5d8f6a>_0x48776d&&(_0x18eb71[_0x1d8c06(0x23c)]=_0x18eb71['value']['substr'](0x0,_0x48776d),delete _0x18eb71[_0x1d8c06(0x1e1)]);}}[_0x48ff4f(0x16e)](_0x5e4ac3){var _0x98b109=_0x48ff4f;return!!(_0x5e4ac3&&_0x485d3a[_0x98b109(0x165)]&&this['_objectToString'](_0x5e4ac3)==='[object\\x20Map]'&&_0x5e4ac3[_0x98b109(0x1ad)]);}['_propertyName'](_0x5e0b82){var _0x27fcf5=_0x48ff4f;if(_0x5e0b82[_0x27fcf5(0x1d0)](/^\\d+$/))return _0x5e0b82;var _0x12f5b4;try{_0x12f5b4=JSON['stringify'](''+_0x5e0b82);}catch{_0x12f5b4='\\x22'+this[_0x27fcf5(0x175)](_0x5e0b82)+'\\x22';}return _0x12f5b4[_0x27fcf5(0x1d0)](/^\"([a-zA-Z_][a-zA-Z_0-9]*)\"$/)?_0x12f5b4=_0x12f5b4[_0x27fcf5(0x1e6)](0x1,_0x12f5b4[_0x27fcf5(0x1ba)]-0x2):_0x12f5b4=_0x12f5b4[_0x27fcf5(0x19c)](/'/g,'\\x5c\\x27')[_0x27fcf5(0x19c)](/\\\\\"/g,'\\x22')[_0x27fcf5(0x19c)](/(^\"|\"$)/g,'\\x27'),_0x12f5b4;}[_0x48ff4f(0x172)](_0x24d617,_0x421388,_0x10dac3,_0x361040){var _0x418a7c=_0x48ff4f;this[_0x418a7c(0x202)](_0x24d617,_0x421388),_0x361040&&_0x361040(),this[_0x418a7c(0x19b)](_0x10dac3,_0x24d617),this['_treeNodePropertiesAfterFullValue'](_0x24d617,_0x421388);}['_treeNodePropertiesBeforeFullValue'](_0x2e200f,_0x4ccb5c){var _0x56f8e9=_0x48ff4f;this[_0x56f8e9(0x204)](_0x2e200f,_0x4ccb5c),this[_0x56f8e9(0x20b)](_0x2e200f,_0x4ccb5c),this[_0x56f8e9(0x201)](_0x2e200f,_0x4ccb5c),this[_0x56f8e9(0x196)](_0x2e200f,_0x4ccb5c);}['_setNodeId'](_0x509052,_0x1462a2){}['_setNodeQueryPath'](_0x3e506b,_0x11862b){}[_0x48ff4f(0x1ff)](_0x597c28,_0x19faa4){}[_0x48ff4f(0x153)](_0x4d1ee1){var _0x455dac=_0x48ff4f;return _0x4d1ee1===this[_0x455dac(0x17c)];}['_treeNodePropertiesAfterFullValue'](_0x2e5f4e,_0x5f0bc6){var _0x385bb0=_0x48ff4f;this[_0x385bb0(0x1ff)](_0x2e5f4e,_0x5f0bc6),this[_0x385bb0(0x158)](_0x2e5f4e),_0x5f0bc6[_0x385bb0(0x1d6)]&&this[_0x385bb0(0x1b3)](_0x2e5f4e),this[_0x385bb0(0x1da)](_0x2e5f4e,_0x5f0bc6),this[_0x385bb0(0x176)](_0x2e5f4e,_0x5f0bc6),this[_0x385bb0(0x207)](_0x2e5f4e);}[_0x48ff4f(0x19b)](_0x2f76d7,_0x2329b6){var _0x4675ac=_0x48ff4f;let _0x5f4f2d;try{_0x485d3a['console']&&(_0x5f4f2d=_0x485d3a['console'][_0x4675ac(0x228)],_0x485d3a[_0x4675ac(0x197)][_0x4675ac(0x228)]=function(){}),_0x2f76d7&&typeof _0x2f76d7[_0x4675ac(0x1ba)]=='number'&&(_0x2329b6[_0x4675ac(0x1ba)]=_0x2f76d7[_0x4675ac(0x1ba)]);}catch{}finally{_0x5f4f2d&&(_0x485d3a[_0x4675ac(0x197)][_0x4675ac(0x228)]=_0x5f4f2d);}if(_0x2329b6[_0x4675ac(0x1f9)]===_0x4675ac(0x174)||_0x2329b6[_0x4675ac(0x1f9)]===_0x4675ac(0x213)){if(isNaN(_0x2329b6[_0x4675ac(0x1e1)]))_0x2329b6[_0x4675ac(0x15c)]=!0x0,delete _0x2329b6[_0x4675ac(0x1e1)];else switch(_0x2329b6[_0x4675ac(0x1e1)]){case Number[_0x4675ac(0x154)]:_0x2329b6[_0x4675ac(0x1cf)]=!0x0,delete _0x2329b6[_0x4675ac(0x1e1)];break;case Number[_0x4675ac(0x209)]:_0x2329b6['negativeInfinity']=!0x0,delete _0x2329b6[_0x4675ac(0x1e1)];break;case 0x0:this[_0x4675ac(0x1e5)](_0x2329b6[_0x4675ac(0x1e1)])&&(_0x2329b6[_0x4675ac(0x1b5)]=!0x0);break;}}else _0x2329b6[_0x4675ac(0x1f9)]===_0x4675ac(0x21d)&&typeof _0x2f76d7[_0x4675ac(0x195)]==_0x4675ac(0x1f7)&&_0x2f76d7[_0x4675ac(0x195)]&&_0x2329b6[_0x4675ac(0x195)]&&_0x2f76d7[_0x4675ac(0x195)]!==_0x2329b6[_0x4675ac(0x195)]&&(_0x2329b6['funcName']=_0x2f76d7[_0x4675ac(0x195)]);}['_isNegativeZero'](_0x348223){var _0x4a2386=_0x48ff4f;return 0x1/_0x348223===Number[_0x4a2386(0x209)];}['_sortProps'](_0x107eaa){var _0x4b37cc=_0x48ff4f;!_0x107eaa[_0x4b37cc(0x1dd)]||!_0x107eaa[_0x4b37cc(0x1dd)][_0x4b37cc(0x1ba)]||_0x107eaa[_0x4b37cc(0x1f9)]===_0x4b37cc(0x230)||_0x107eaa[_0x4b37cc(0x1f9)]===_0x4b37cc(0x165)||_0x107eaa[_0x4b37cc(0x1f9)]===_0x4b37cc(0x227)||_0x107eaa['props'][_0x4b37cc(0x1fe)](function(_0x1d8663,_0x45ed23){var _0x51a4f6=_0x4b37cc,_0x38f259=_0x1d8663[_0x51a4f6(0x195)][_0x51a4f6(0x1f0)](),_0x53ab4f=_0x45ed23[_0x51a4f6(0x195)]['toLowerCase']();return _0x38f259<_0x53ab4f?-0x1:_0x38f259>_0x53ab4f?0x1:0x0;});}['_addFunctionsNode'](_0x15e1ed,_0x5c0328){var _0x5b00e9=_0x48ff4f;if(!(_0x5c0328[_0x5b00e9(0x1f3)]||!_0x15e1ed[_0x5b00e9(0x1dd)]||!_0x15e1ed[_0x5b00e9(0x1dd)][_0x5b00e9(0x1ba)])){for(var _0x4006a5=[],_0x190517=[],_0x5daa13=0x0,_0x5c728b=_0x15e1ed[_0x5b00e9(0x1dd)]['length'];_0x5daa13<_0x5c728b;_0x5daa13++){var _0x176aa0=_0x15e1ed[_0x5b00e9(0x1dd)][_0x5daa13];_0x176aa0[_0x5b00e9(0x1f9)]===_0x5b00e9(0x21d)?_0x4006a5[_0x5b00e9(0x1a3)](_0x176aa0):_0x190517[_0x5b00e9(0x1a3)](_0x176aa0);}if(!(!_0x190517[_0x5b00e9(0x1ba)]||_0x4006a5[_0x5b00e9(0x1ba)]<=0x1)){_0x15e1ed[_0x5b00e9(0x1dd)]=_0x190517;var _0x4a09da={'functionsNode':!0x0,'props':_0x4006a5};this[_0x5b00e9(0x204)](_0x4a09da,_0x5c0328),this[_0x5b00e9(0x1ff)](_0x4a09da,_0x5c0328),this[_0x5b00e9(0x158)](_0x4a09da),this[_0x5b00e9(0x196)](_0x4a09da,_0x5c0328),_0x4a09da['id']+='\\x20f',_0x15e1ed[_0x5b00e9(0x1dd)][_0x5b00e9(0x18b)](_0x4a09da);}}}[_0x48ff4f(0x176)](_0x27d312,_0x145371){}[_0x48ff4f(0x158)](_0x48476c){}[_0x48ff4f(0x236)](_0x15ae6e){var _0x55920d=_0x48ff4f;return Array[_0x55920d(0x18e)](_0x15ae6e)||typeof _0x15ae6e==_0x55920d(0x194)&&this[_0x55920d(0x175)](_0x15ae6e)==='[object\\x20Array]';}[_0x48ff4f(0x196)](_0x9e8dd8,_0x21bf31){}[_0x48ff4f(0x207)](_0x4d86dc){var _0x1d3523=_0x48ff4f;delete _0x4d86dc[_0x1d3523(0x229)],delete _0x4d86dc[_0x1d3523(0x1cb)],delete _0x4d86dc[_0x1d3523(0x16b)];}[_0x48ff4f(0x201)](_0x5011ed,_0x37b543){}}let _0x15ccfe=new _0x1c4d28(),_0x508dcc={'props':0x64,'elements':0x64,'strLength':0x400*0x32,'totalStrLength':0x400*0x32,'autoExpandLimit':0x1388,'autoExpandMaxDepth':0xa},_0x12ad0e={'props':0x5,'elements':0x5,'strLength':0x100,'totalStrLength':0x100*0x3,'autoExpandLimit':0x1e,'autoExpandMaxDepth':0x2};function _0x760607(_0x21857d,_0x1aae83,_0x26a540,_0x377585,_0x5643b8,_0x3116e5){var _0x70f620=_0x48ff4f;let _0x1b6617,_0x402b88;try{_0x402b88=_0x2c6fd8(),_0x1b6617=_0xd494a3[_0x1aae83],!_0x1b6617||_0x402b88-_0x1b6617['ts']>0x1f4&&_0x1b6617[_0x70f620(0x160)]&&_0x1b6617[_0x70f620(0x1d7)]/_0x1b6617['count']<0x64?(_0xd494a3[_0x1aae83]=_0x1b6617={'count':0x0,'time':0x0,'ts':_0x402b88},_0xd494a3[_0x70f620(0x193)]={}):_0x402b88-_0xd494a3[_0x70f620(0x193)]['ts']>0x32&&_0xd494a3['hits'][_0x70f620(0x160)]&&_0xd494a3[_0x70f620(0x193)]['time']/_0xd494a3['hits'][_0x70f620(0x160)]<0x64&&(_0xd494a3[_0x70f620(0x193)]={});let _0x2adcf4=[],_0x3b0aa3=_0x1b6617[_0x70f620(0x23a)]||_0xd494a3[_0x70f620(0x193)][_0x70f620(0x23a)]?_0x12ad0e:_0x508dcc,_0x497498=_0x1b30c7=>{var _0x2b7bb5=_0x70f620;let _0x360cdc={};return _0x360cdc[_0x2b7bb5(0x1dd)]=_0x1b30c7[_0x2b7bb5(0x1dd)],_0x360cdc[_0x2b7bb5(0x218)]=_0x1b30c7[_0x2b7bb5(0x218)],_0x360cdc[_0x2b7bb5(0x1f4)]=_0x1b30c7[_0x2b7bb5(0x1f4)],_0x360cdc['totalStrLength']=_0x1b30c7['totalStrLength'],_0x360cdc[_0x2b7bb5(0x19d)]=_0x1b30c7[_0x2b7bb5(0x19d)],_0x360cdc[_0x2b7bb5(0x21c)]=_0x1b30c7['autoExpandMaxDepth'],_0x360cdc[_0x2b7bb5(0x1d6)]=!0x1,_0x360cdc[_0x2b7bb5(0x1f3)]=!_0x41457d,_0x360cdc[_0x2b7bb5(0x17b)]=0x1,_0x360cdc['level']=0x0,_0x360cdc[_0x2b7bb5(0x18a)]=_0x2b7bb5(0x1c4),_0x360cdc['rootExpression']=_0x2b7bb5(0x20a),_0x360cdc[_0x2b7bb5(0x1d4)]=!0x0,_0x360cdc['autoExpandPreviousObjects']=[],_0x360cdc[_0x2b7bb5(0x239)]=0x0,_0x360cdc[_0x2b7bb5(0x1b9)]=!0x0,_0x360cdc[_0x2b7bb5(0x1ec)]=0x0,_0x360cdc[_0x2b7bb5(0x1ee)]={'current':void 0x0,'parent':void 0x0,'index':0x0},_0x360cdc;};for(var _0x10b521=0x0;_0x10b521<_0x5643b8[_0x70f620(0x1ba)];_0x10b521++)_0x2adcf4[_0x70f620(0x1a3)](_0x15ccfe[_0x70f620(0x181)]({'timeNode':_0x21857d===_0x70f620(0x1d7)||void 0x0},_0x5643b8[_0x10b521],_0x497498(_0x3b0aa3),{}));if(_0x21857d===_0x70f620(0x15d)){let _0x35bfd9=Error[_0x70f620(0x216)];try{Error[_0x70f620(0x216)]=0x1/0x0,_0x2adcf4[_0x70f620(0x1a3)](_0x15ccfe[_0x70f620(0x181)]({'stackNode':!0x0},new Error()[_0x70f620(0x15f)],_0x497498(_0x3b0aa3),{'strLength':0x1/0x0}));}finally{Error[_0x70f620(0x216)]=_0x35bfd9;}}return{'method':_0x70f620(0x1f1),'version':_0x24cc9f,'args':[{'ts':_0x26a540,'session':_0x377585,'args':_0x2adcf4,'id':_0x1aae83,'context':_0x3116e5}]};}catch(_0x4ce412){return{'method':_0x70f620(0x1f1),'version':_0x24cc9f,'args':[{'ts':_0x26a540,'session':_0x377585,'args':[{'type':'unknown','error':_0x4ce412&&_0x4ce412[_0x70f620(0x200)]}],'id':_0x1aae83,'context':_0x3116e5}]};}finally{try{if(_0x1b6617&&_0x402b88){let _0x26f621=_0x2c6fd8();_0x1b6617[_0x70f620(0x160)]++,_0x1b6617[_0x70f620(0x1d7)]+=_0x24f4c4(_0x402b88,_0x26f621),_0x1b6617['ts']=_0x26f621,_0xd494a3['hits'][_0x70f620(0x160)]++,_0xd494a3['hits'][_0x70f620(0x1d7)]+=_0x24f4c4(_0x402b88,_0x26f621),_0xd494a3[_0x70f620(0x193)]['ts']=_0x26f621,(_0x1b6617['count']>0x32||_0x1b6617['time']>0x64)&&(_0x1b6617['reduceLimits']=!0x0),(_0xd494a3[_0x70f620(0x193)]['count']>0x3e8||_0xd494a3[_0x70f620(0x193)][_0x70f620(0x1d7)]>0x12c)&&(_0xd494a3[_0x70f620(0x193)][_0x70f620(0x23a)]=!0x0);}}catch{}}}return _0x760607;}((_0x31d1f9,_0x3eaab5,_0x444712,_0x272bc9,_0x70920a,_0x3c5415,_0x283e17,_0x2d54aa,_0x2d84f5,_0x1dbabb)=>{var _0x2c4389=_0x29d596;if(_0x31d1f9['_console_ninja'])return _0x31d1f9[_0x2c4389(0x185)];if(!J(_0x31d1f9,_0x2d54aa,_0x70920a))return _0x31d1f9['_console_ninja']={'consoleLog':()=>{},'consoleTrace':()=>{},'consoleTime':()=>{},'consoleTimeEnd':()=>{},'autoLog':()=>{},'autoLogMany':()=>{},'autoTraceMany':()=>{},'coverage':()=>{},'autoTrace':()=>{},'autoTime':()=>{},'autoTimeEnd':()=>{}},_0x31d1f9[_0x2c4389(0x185)];let _0x51c622=W(_0x31d1f9),_0x167754=_0x51c622['elapsed'],_0x2cf357=_0x51c622[_0x2c4389(0x188)],_0xcb3a8d=_0x51c622[_0x2c4389(0x1a4)],_0x1539b2={'hits':{},'ts':{}},_0x39f2f9=Y(_0x31d1f9,_0x2d84f5,_0x1539b2,_0x3c5415),_0x120124=_0x55aeaf=>{_0x1539b2['ts'][_0x55aeaf]=_0x2cf357();},_0x16e23c=(_0x367f7d,_0x269e20)=>{var _0x2332bf=_0x2c4389;let _0x168bdf=_0x1539b2['ts'][_0x269e20];if(delete _0x1539b2['ts'][_0x269e20],_0x168bdf){let _0x1c909c=_0x167754(_0x168bdf,_0x2cf357());_0x59609f(_0x39f2f9(_0x2332bf(0x1d7),_0x367f7d,_0xcb3a8d(),_0x1de824,[_0x1c909c],_0x269e20));}},_0x402151=_0x35adf8=>_0x2c5388=>{try{_0x120124(_0x2c5388),_0x35adf8(_0x2c5388);}finally{_0x31d1f9['console']['time']=_0x35adf8;}},_0xdf3735=_0x3573b3=>_0x314af2=>{var _0x237122=_0x2c4389;try{let [_0x31a706,_0x3cbd8b]=_0x314af2['split'](_0x237122(0x214));_0x16e23c(_0x3cbd8b,_0x31a706),_0x3573b3(_0x31a706);}finally{_0x31d1f9[_0x237122(0x197)][_0x237122(0x1b2)]=_0x3573b3;}};_0x31d1f9['_console_ninja']={'consoleLog':(_0x4237b8,_0x25f747)=>{var _0x2c08a9=_0x2c4389;_0x31d1f9[_0x2c08a9(0x197)][_0x2c08a9(0x1f1)][_0x2c08a9(0x195)]!==_0x2c08a9(0x17f)&&_0x59609f(_0x39f2f9(_0x2c08a9(0x1f1),_0x4237b8,_0xcb3a8d(),_0x1de824,_0x25f747));},'consoleTrace':(_0x274fcb,_0x497323)=>{var _0x98cc6e=_0x2c4389;_0x31d1f9[_0x98cc6e(0x197)]['log'][_0x98cc6e(0x195)]!=='disabledTrace'&&_0x59609f(_0x39f2f9(_0x98cc6e(0x15d),_0x274fcb,_0xcb3a8d(),_0x1de824,_0x497323));},'consoleTime':()=>{var _0xcd819f=_0x2c4389;_0x31d1f9[_0xcd819f(0x197)][_0xcd819f(0x1d7)]=_0x402151(_0x31d1f9[_0xcd819f(0x197)][_0xcd819f(0x1d7)]);},'consoleTimeEnd':()=>{var _0x3aa5d7=_0x2c4389;_0x31d1f9[_0x3aa5d7(0x197)]['timeEnd']=_0xdf3735(_0x31d1f9[_0x3aa5d7(0x197)][_0x3aa5d7(0x1b2)]);},'autoLog':(_0x32cf54,_0x375594)=>{var _0x200bc7=_0x2c4389;_0x59609f(_0x39f2f9(_0x200bc7(0x1f1),_0x375594,_0xcb3a8d(),_0x1de824,[_0x32cf54]));},'autoLogMany':(_0x411532,_0x3ab08f)=>{_0x59609f(_0x39f2f9('log',_0x411532,_0xcb3a8d(),_0x1de824,_0x3ab08f));},'autoTrace':(_0x5660b4,_0x2fb72d)=>{var _0x480f5b=_0x2c4389;_0x59609f(_0x39f2f9(_0x480f5b(0x15d),_0x2fb72d,_0xcb3a8d(),_0x1de824,[_0x5660b4]));},'autoTraceMany':(_0xdae23d,_0x186ac9)=>{var _0x558d42=_0x2c4389;_0x59609f(_0x39f2f9(_0x558d42(0x15d),_0xdae23d,_0xcb3a8d(),_0x1de824,_0x186ac9));},'autoTime':(_0x3e7e8e,_0x12e99a,_0x5a356b)=>{_0x120124(_0x5a356b);},'autoTimeEnd':(_0xd5e270,_0xbbc465,_0xabdad3)=>{_0x16e23c(_0xbbc465,_0xabdad3);},'coverage':_0x35e45c=>{var _0x363ed1=_0x2c4389;_0x59609f({'method':_0x363ed1(0x1c3),'version':_0x3c5415,'args':[{'id':_0x35e45c}]});}};let _0x59609f=b(_0x31d1f9,_0x3eaab5,_0x444712,_0x272bc9,_0x70920a,_0x1dbabb),_0x1de824=_0x31d1f9[_0x2c4389(0x21e)];return _0x31d1f9[_0x2c4389(0x185)];})(globalThis,_0x29d596(0x1bc),_0x29d596(0x169),_0x29d596(0x217),_0x29d596(0x21a),_0x29d596(0x189),_0x29d596(0x18f),[\"localhost\",\"127.0.0.1\",\"example.cypress.io\",\"DESKTOP-GDLJ9TC\",\"192.168.1.4\",\"127.0.2.2\",\"127.0.2.3\"],_0x29d596(0x237),_0x29d596(0x1ce));");}catch(e){}};function oo_oo(i,...v){try{oo_cm().consoleLog(i, v);}catch(e){} return v};function oo_tr(i,...v){try{oo_cm().consoleTrace(i, v);}catch(e){} return v};function oo_ts(){try{oo_cm().consoleTime();}catch(e){}};function oo_te(){try{oo_cm().consoleTimeEnd();}catch(e){}};/*eslint unicorn/no-abusive-eslint-disable:,eslint-comments/disable-enable-pair:,eslint-comments/no-unlimited-disable:,eslint-comments/no-aggregating-enable:,eslint-comments/no-duplicate-disable:,eslint-comments/no-unused-disable:,eslint-comments/no-unused-enable:,*/