import axios from 'axios';
import { Editor } from "@tiptap/core";
import { Node } from "@tiptap/core";
import { store } from "../../../../../store/app";
import { saveFailure, saveSuccess, startSaving } from "../../../../../store/fileSaveSlice";
import * as laravel from '../../../../../utils/laravel';
import { Extension } from '@tiptap/core';
import { initialCssStyles } from '../../ExtendedExtensions/CustomHeading';


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        fileSave: {
            saveFile: () => ReturnType,
            docFileUpload: ({ file }: { file: File }) => ReturnType,
            downloadAsDocx: () => ReturnType,
        }
    }
}

export const FileSave = Extension.create({
    name: 'fileSave',
    addCommands() {
        return {
            saveFile: () => ({ editor }: { editor: Editor }) => {
                return fileSave(editor);
            },
            docFileUpload: ({ file }) => ({ editor }) => {
                return docFileUpload(file, editor);
            },
            downloadAsDocx: () => ({ editor }) => {
                return downloadAsDocx(editor);
            },
        }
    },
    addKeyboardShortcuts() {
        return {
            'Mod-s': () => fileSave(this.editor),
            'Mod-S': () => fileSave(this.editor),
        }
    },
})



const docFileUpload = (file: File, editor: Editor) => {
    editor?.commands.setTrackChangeStatus(false);
    editor?.commands.setContent(`<h1>Converting...</h1>`);
    editor?.commands.setCssStyle({ styles: initialCssStyles });
    axios.postForm(`${laravel.url}/editor/docx-to-html`, { file })
        .then(res => {
            editor?.commands.setContent(res.data.data.html);
            editor?.commands.setCssStyle({ styles: res.data.data.style });
            editor?.commands.setParaStyleClassNames({ classNames: res.data.data.style });
        }).catch(err => {
            console.error(err);
        })
    return true;
}

const HtmlDoc = (content: string) => `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="application/xhtml+xml; charset=utf-8" />
    <title></title>
    <link href="converted_styles.css" type="text/css" rel="stylesheet" />
</head>
<body>
${content}
</body>
</html>`;

const downloadAsDocx = (editor: Editor) => {
    axios.post(`${laravel.url}/editor/html-to-docx`, { html: HtmlDoc(editor.getHTML()), css: editor.storage.heading.cssStyles })
        .then(res => {
            window.open(`${laravel.url}/file-download/${res.data.data.docxFilePath.replaceAll('/', '+')}`, "_blank");
        }).catch(err => {
            console.error(err);
        });
    return true;
}


const fileSave = (editor: Editor) => {
    const { fileSave } = store.getState();
    if (fileSave.isSaving) return true;
    store.dispatch(startSaving());
    axios.post(`${laravel.url}/update-document-content/123456`, { content: editor.getHTML() })
        .then(res => {
            store.dispatch(saveSuccess());
        }).catch(err => {
            store.dispatch(saveFailure("error"));
        });
    return true;
}