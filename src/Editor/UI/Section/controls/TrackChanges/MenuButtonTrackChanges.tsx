/// <reference types="@tiptap/extension-underline" />
import { useRichTextEditorContext } from 'mui-tiptap';
import MenuButton, { type MenuButtonProps } from "../MenuButton";

import DoneIcon from '@mui/icons-material/Done';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import RemoveDoneIcon from '@mui/icons-material/RemoveDone';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from "react";
import { EXTENSION_NAME } from '../../../../Extensions/Marks/TrackChanges/TrackChanges';


export type MenuButtonTrackChangesProps = Partial<MenuButtonProps>;

export function MenuButtonTrackChangesToggler(props: MenuButtonTrackChangesProps) {
  const editor = useRichTextEditorContext();
  // type Status = {
  //   isTracking: boolean,
  //   isToggling: boolean,
  // }
  // const [status, setStatus] = useState<Status>({isTracking: false, isToggling: false});

  const enabled =  editor?.extensionManager.extensions.find(item => item.name == EXTENSION_NAME)?.options.enabled

  return (
    <MenuButton
      tooltipLabel={`${enabled ? "Disable" : "Enable"} track changes`}
      IconComponent={(props) => <TrackChangesIcon color={`${enabled ? "error" : "success"}`} {...props} />}
      // disabled={enabled}
      // selected={enabled}
      onClick={() => {
        // setStatus((pre: Status) => ({...pre, isToggling: true}));
        console.log(enabled);
        editor?.chain().focus().toggleTrackChangeStatus().run();
        // setStatus((pre: Status) => ({...pre, isToggling: false, isTracking: !pre.isTracking}));
      }}
      {...props}
    />
  );
}

export function MenuButtonAcceptChanges(props: MenuButtonTrackChangesProps) {
  const editor = useRichTextEditorContext();
  return (
    <MenuButton
      tooltipLabel="Accept change"
      IconComponent={DoneIcon}
      onClick={() => {
        editor?.chain().focus().acceptChange().run()
      }}
      {...props}
    />
  );
}

export function MenuButtonRejectChanges(props: MenuButtonTrackChangesProps) {
  const editor = useRichTextEditorContext();
  return (
    <MenuButton
      tooltipLabel="Reject change"
      IconComponent={CloseIcon}
      onClick={() => {
        editor?.chain().focus().rejectChange().run()
      }}
      {...props}
    />
  );
}

export function MenuButtonAcceptAllChanges(props: MenuButtonTrackChangesProps) {
  const editor = useRichTextEditorContext();
  return (
    <MenuButton
      tooltipLabel="Accept all changes"
      IconComponent={DoneAllIcon}
      onClick={() => {
        editor?.chain().focus().acceptAllChanges().run()
      }}
      {...props}
    />
  );
}

export function MenuButtonRejectAllChanges(props: MenuButtonTrackChangesProps) {
  const editor = useRichTextEditorContext();
  return (
    <MenuButton
      tooltipLabel="Reject all changes"
      IconComponent={RemoveDoneIcon}
      onClick={() => {
        editor?.chain().focus().rejectAllChanges().run()
      }}
      {...props}
    />
  );
}
