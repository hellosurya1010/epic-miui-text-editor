import { Button } from '@mui/material';
import { useRichTextEditorContext } from 'mui-tiptap';
import { characterMark, paragraphMark } from '../../../../utils/specialCharacter';
import { ParaStyleClass } from '../../Extensions/ExtendedExtensions/CustomHeading';

export const HeadingPanel = () => {
    const editor = useRichTextEditorContext();
    const nodeAttributes = editor?.getAttributes('heading') ?? {};
    const curentHeadingClassName = nodeAttributes.class ?? '';
    const curentHeadingLevel = nodeAttributes.level;
    return (
        <div style={{ padding: '10px', display: 'flex', flexDirection: 'column', gap: '10px', overflowY: 'auto', height: '100%', scrollbarGutter: 'stable' }}>
            {/* {editor?.storage.heading.paraStyleClassNames.filter((paraStyle: ParaStyleClass, index) => paraStyle.styleType == 'Character').map((paraStyle: ParaStyleClass, index) => ( */}
            {editor?.storage.heading.paraStyleClassNames.map((paraStyle: ParaStyleClass, index) => (
                <Button
                    key={index}
                    size='small'
                    variant={`${curentHeadingClassName.includes(paraStyle.className) ? 'contained' : 'outlined'}`}
                    color='inherit'
                    onClick={() => {
                        paraStyle.styleType == 'Paragraph' ?
                            editor?.commands.setHeadingStyle({ className: paraStyle.className }) :
                            editor.commands.setCharacterStyle({ className: paraStyle.className });
                    }}
                    style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '5px'}}
                >
                    <div style={{ position: 'relative', top: 0 }}>{paraStyle.styleType == "Paragraph" ? paragraphMark : characterMark}</div>
                    <div style={{ fontSize: '15px', padding: 0, margin: '0 0 0 0 !important' }} className={`${false && paraStyle.className}`}>{paraStyle.className}</div>
                </Button>
            ))}
        </div>
    )
}
