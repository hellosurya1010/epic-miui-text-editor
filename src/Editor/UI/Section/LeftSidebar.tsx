import React, { CSSProperties } from 'react'
import { Grid } from "@mui/material";
import { useRichTextEditorContext } from 'mui-tiptap';
import { AttributresForTOCElement } from '../../Extensions/Extensions/TableOfContents/TableOfContents';
import TOCTabs from './controls/TOC/TOCTabs';


export const LeftSidebar = () => {
  const editor = useRichTextEditorContext();
  const elements: AttributresForTOCElement[] = editor?.storage.tableOfContents[editor.storage.tableOfContents.currentlyTrackingElement] ?? [];






  return (
    <div style={{ padding: '10px', height: '90vh' }}>
      <TOCTabs />
      {/* <Grid xs={12}>
        {elements.reduce((acc, heading, index) => {
          acc.elements.push(<HeadingAnchor key={index} heading={heading} />);
          return acc;
        }, { elements: [] }).elements}
      </Grid> */}
    </div>
  )
}