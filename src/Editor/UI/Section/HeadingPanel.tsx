import { Button } from '@mui/material';
import { useRichTextEditorContext } from 'mui-tiptap';
import { characterMark, paragraphMark } from '../../../../utils/specialCharacter';
import { ParaStyleClass } from '../../Extensions/ExtendedExtensions/CustomHeading';
import { useEffect, useRef, useState } from 'react';

export const HeadingPanel = () => {
    const editor = useRichTextEditorContext();
    // const nodeAttributes = editor?.getAttributes('heading') ?? {};
    const nodeAttributes = editor?.getAttributes('paragraph') ?? {};
    const curentHeadingClassName = nodeAttributes.class ?? '';
    const curentHeadingLevel = nodeAttributes.level;
    const styleListRef = useRef<HTMLDivElement | null>(null);
    const paraStyleClassNames = editor?.storage.heading.paraStyleClassNames ?? [];
    const [scrollOffSets, setScrollOffSets] = useState({});

    useEffect(() => {
        setScrollOffSets((pre) => {
            if (styleListRef.current != null) {
                return [...styleListRef.current.querySelectorAll('button')].reduce((acc, btn) => {
                    acc[btn.id] = btn.offsetTop;
                    return acc;
                }, {});
            }
            return pre;
        })
        console.log(scrollOffSets);
    }, [styleListRef.current]);

    useEffect(() => {
        const timeOutFn = setTimeout(() => {
            if (curentHeadingClassName && styleListRef.current) {
                styleListRef.current.scrollTo({
                    top: scrollOffSets[`style-btn-${curentHeadingClassName}`] - 150,
                });
            }
        }, 100);
        return () => {
            clearTimeout(timeOutFn);
        };
    }, [curentHeadingClassName]);

    return (
        <div ref={styleListRef} style={{ padding: '10px', display: 'flex', flexDirection: 'column', gap: '10px', overflowY: 'auto', height: '100%', scrollbarGutter: 'stable' }}>
            {/* {editor?.storage.heading.paraStyleClassNames.filter((paraStyle: ParaStyleClass, index) => paraStyle.styleType == 'Character').map((paraStyle: ParaStyleClass, index) => ( */}
            {paraStyleClassNames.map((paraStyle: ParaStyleClass, index) => {
                const isActive = curentHeadingClassName.includes(paraStyle.className);
                return (
                    <Button
                        key={index}
                        id={`style-btn-${paraStyle.className}`}
                        size='small'
                        variant={`${isActive ? 'contained' : 'outlined'}`}
                        color='inherit'
                        onClick={() => {
                            paraStyle.styleType == 'Paragraph' ?
                                editor?.commands.setHeadingStyle({ className: paraStyle.className }) :
                                editor?.commands.setCharacterStyle({ className: paraStyle.className });
                        }}
                        style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: '5px' }}
                    >
                        <div style={{ position: 'relative', top: 0 }}>{paraStyle.styleType == "Paragraph" ? paragraphMark : characterMark}</div>
                        <div style={{ fontSize: '15px', padding: 0, margin: '0 0 0 0 !important' }} className={`${false && paraStyle.className}`}>{paraStyle.className}</div>
                    </Button>
                )
            })}
        </div>
    )
}
