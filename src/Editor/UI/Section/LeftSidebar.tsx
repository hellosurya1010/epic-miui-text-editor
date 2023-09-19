import { useRichTextEditorContext } from 'mui-tiptap';
import TOCTabs from './controls/TOC/TOCTabs';



export const LeftSidebar = () => {
  const editor = useRichTextEditorContext();

  return (
    <div style={{ padding: '10px', height: '90vh' }}>
      <TOCTabs />
    </div>
  )
}