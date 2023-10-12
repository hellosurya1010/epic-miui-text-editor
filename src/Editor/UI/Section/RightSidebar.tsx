import { useRichTextEditorContext } from 'mui-tiptap';
import { HeadingPanel } from './HeadingPanel';
import { CommentsPanel } from './CommentsPanel';


export const RightSidebar = () => {

  return (
    <div style={{ height: 'calc(90vh - 20px)', marginTop: '20px' }}>
      {/* <HeadingPanel /> */}
      <CommentsPanel />
    </div>
  )
}