import { useRichTextEditorContext } from 'mui-tiptap';
import { HeadingPanel } from './HeadingPanel';


export const RightSidebar = () => {

  return (
    <div style={{height: 'calc(90vh - 20px)', marginTop: '20px'}}>
      <HeadingPanel />
    </div>
  )
}