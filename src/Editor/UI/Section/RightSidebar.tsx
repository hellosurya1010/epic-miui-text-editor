import React, { CSSProperties } from 'react'
import { Grid } from "@mui/material";
import { useRichTextEditorContext } from 'mui-tiptap';
import { HeadingAttributresForTOC } from '../../Extensions/Extensions/TableOfContents/TableOfContents';


export const RightSidebar = () => {
  const editor = useRichTextEditorContext();
  const headings: HeadingAttributresForTOC[] = editor?.storage.tableOfContents.headings ?? [];

  const headingStyles = () => {
    return [1, 2, 3, 4, 5, 6].reduce((acc, level) => {
      const descLevel = Math.abs(6 - level) + 1;
      const style: CSSProperties = {
        fontWeight: 300 + (100 * descLevel),
        display: 'block',
        fontSize: `${10 + descLevel}px`,
        color: '#000',
        paddingLeft: `${(level - 1) * 10}px`,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
      }
      acc[level] = style;
      return acc;
    }, {});
  }

  const HeadingAnchor = ({ heading }: { heading: HeadingAttributresForTOC }) => {
    const { node, id } = heading;
    const { attrs: { level } } = node;
    const styles = headingStyles();
    return <a href={`/#${id}`} className='toc-active' style={styles[level]}>{heading.node.textContent}</a>
  }




  return (
    <div style={{ padding: '10px' }}>
      <h4 style={{ textAlign: 'center', margin: '14px 0' }}>Table of contents</h4>
      <Grid xs={12}>
        {headings.reduce((acc, heading, index) => {
          acc.elements.push(<HeadingAnchor key={index} heading={heading} />);
          return acc;
        }, { elements: [] }).elements}
      </Grid>
    </div>
  )
}