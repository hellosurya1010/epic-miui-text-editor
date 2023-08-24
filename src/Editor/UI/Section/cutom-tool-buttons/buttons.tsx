import { FormatBold } from '@mui/icons-material';
import ButtonWrapper from './ButtonWrapper';
import { useRichTextEditorContext } from 'mui-tiptap';

export const BoldButton = () => {
    const editor = useRichTextEditorContext();
    return (
        <ButtonWrapper
            title="bold"
            IconComponent={FormatBold}
            disabled={false}
            active={'bold'}
            editor={editor}
            onClick={() => editor?.chain().focus().toggleBold().run()}
        />
    )
}