import axios from "axios";
import { useRichTextEditorContext } from "mui-tiptap";
import * as laravel from '../../../../../../utils/laravel';
import * as React from 'react';


const extractClassNames = (styles: string): string[] => {
    const regex = /\.([\w-]+)\s*{/g;
    const classNames: string[] = [];
    let match: RegExpExecArray | null;

    while ((match = regex.exec(styles)) !== null) {
        classNames.push(match[1]);
    }
    return classNames;
}

export function DocFileUploadButton() {
    const editor = useRichTextEditorContext();
    // const [style, setStyle] = React.useState('');
    console.log(editor?.storage.heading.cssStyles);
    return (
        <>
            <input
                type="file"
                onChange={(e) => {
                    const { files } = e.target;
                    if (files?.length) {
                        editor?.commands.setTrackChangeStatus(false);
                        editor?.commands.setContent(`<h1>Converting...</h1>`);
                        console.log(files[0]);
                        axios.postForm(`${laravel.url}/editor/docx-to-html`, { file: files[0] })
                            .then(res => {
                                editor?.commands.setContent(res.data.data.html);
                                // setStyle(res.data.data.style);
                                editor?.commands.setCssStyle({ styles: res.data.data.style });
                                editor?.commands.setParaStyleClassNames({ classNames: extractClassNames(res.data.data.style) });
                                console.log(res);
                            }).catch(err => {
                                console.log(err);
                            })
                    }
                }}
            />
        </>
    );
}
