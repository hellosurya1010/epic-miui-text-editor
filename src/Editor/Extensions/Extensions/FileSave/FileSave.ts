import { Editor, Extension, Node } from "@tiptap/core";
import axios from 'axios';
import * as laravel from '../../../../../utils/laravel';
import { initialCssStyles } from '../../ExtendedExtensions/CustomHeading';


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        fileSave: {
            saveFile: () => ReturnType,
            docFileUpload: ({ file }: { file: File }) => ReturnType,
            downloadAsDocx: () => ReturnType,
            setLineProgress: ({ isLoading, loadingFor = "" }: { isLoading: boolean, loadingFor?: string }) => ReturnType,
        }
    }
}

export const initialLineProgress = {
    isLoading: false,
    loadingFor: '',
};

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
            setLineProgress: (props) => () => {
                this.storage.lineProgress = props;
                return true;
            }
        }
    },
    addStorage() {
        return {
            lineProgress: initialLineProgress,
            currentFileName: '',
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

    editor.commands.setTrackChangeStatus(false);
    editor.commands.setLineProgress({ isLoading: true, loadingFor: 'DocxFileToHtmlConversion' });
    editor.commands.setContent(`<h3>Processing...</h3>`);
    editor.commands.setCssStyle({ styles: initialCssStyles });
    axios.postForm(`${laravel.url}/editor/docx-to-html`, { file })
        .then(res => {
            const {css, html} = getCssString(res.data.data.html);
            editor.commands.setCssStyle({ styles: css });
            editor.commands.setParaStyleClassNames({ classNames: css });
            editor.commands.setContent(html);
            editor.commands.setLineProgress(initialLineProgress);
        }).catch(err => {
            editor.commands.setLineProgress(initialLineProgress);
            console.error(err);
        }).finally(() => {
            editor.commands.setLineProgress(initialLineProgress);
        })
    return true;
}

const HtmlDoc = (editor: Editor) => {
    return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
    <meta http-equiv="Content-Type" content="application/xhtml+xml; charset=utf-8" />
    <title></title>
    <style type=\"text/css\"> ${editor.storage.heading.cssStyles}</style>
    </head>
    <body style="pagewidth:612pt;pageheight:792pt;">
    ${editor.getHTML()}
    </body>
    </html>`;
}
// <style type="text/css">${editor.storage.heading.cssStyles}</>

const downloadAsDocx = (editor: Editor) => {
    editor.commands.setLineProgress({ isLoading: true, loadingFor: 'DocxFileDownloading' });
    axios.post(`${laravel.url}/editor/html-to-docx`, { html: HtmlDoc(editor), })
        .then(res => {
            window.open(`${laravel.url}/file-download/${res.data.data.docxFilePath.replaceAll('/', '+')}`, "_blank");
        }).catch(err => {
            console.error(err);
        }).finally(() => {
            editor.commands.setLineProgress(initialLineProgress);
        });
    return true;
}


const fileSave = (editor: Editor) => {
    const lineProgress: typeof initialLineProgress = editor?.storage.fileSave.lineProgress;
    if (lineProgress.isLoading && lineProgress.loadingFor == "FileSaveing") return true;
    editor.commands.setLineProgress({ isLoading: true, loadingFor: 'FileSaveing' });
    axios.post(`${laravel.url}/update-document-content/123456`, { content: HtmlDoc(editor) })
        .then(res => {

        }).catch(err => {
            console.error(err);
        }).finally(() => {
            editor.commands.setLineProgress(initialLineProgress);
        });
    return true;
}

export const getCssString = (htmlString: string): { html: string, css: string } => {
    var stylePattern = /<style\s+(?:[^>]*?\s+)?type\s*=\s*["']?\s*text\/css\s*["']?\s*(?:[^>]*?\s+)?>([\s\S]*?)<\/style>/i;
    // var stylePattern = /<style[^>]*>([\s\S]*?)<\/style>/i;
    var matches = htmlString.match(stylePattern);
    let html = htmlString;
    let css = "";

    if (matches && matches.length > 1) {
        css = matches[1].trim();
        html = htmlString.replace(stylePattern, '');
    }
    return { html, css };
}

