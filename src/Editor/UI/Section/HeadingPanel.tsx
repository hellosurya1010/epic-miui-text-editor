import { Button } from '@mui/material';
import { useRichTextEditorContext } from 'mui-tiptap';

export const HeadingPanel = () => {
    const editor = useRichTextEditorContext();
    const nodeAttributes = editor?.getAttributes('heading') ?? {};
    const curentHeadingClassName = nodeAttributes.class ?? '';
    const curentHeadingLevel = nodeAttributes.level;
    return (
        <div style={{ padding: '10px', display: 'flex', flexDirection: 'column', gap: '10px', overflowY: 'auto',  height: '100%', scrollbarGutter: 'stable' }}>
            {[1, 2, 3, 4, 5, 6].map((level, index) => (
                <Button
                    key={index}
                    variant={`${curentHeadingLevel == level ? 'contained' : 'outlined'}`}
                    color='inherit'
                    onClick={() => {
                        editor?.commands.setHeading({ level: level });
                    }}
                ><div style={{ fontSize: '15px', padding: 0, margin: '0 0 0 0 !important' }}>Heading {level}</div></Button>
            ))}
            {['FancyBorder', 'HandwrittenText', 'GothicText', 'Monospace', "Barlow", "GlowingText", "OutlineText"].map((className, index) => (
                <Button
                    key={index}
                    variant={`${curentHeadingClassName.includes(className) ? 'contained' : 'outlined'}`}
                    color='inherit'
                    onClick={() => {
                        editor?.commands.setHeadingStyle({ className });
                    }}
                ><div style={{ fontSize: '15px', padding: 0, margin: '0 0 0 0 !important' }} className={`${className}`}>{className}</div></Button>
            ))}
        </div>
    )
}
