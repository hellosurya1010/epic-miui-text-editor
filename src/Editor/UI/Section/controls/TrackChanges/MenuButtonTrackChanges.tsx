/// <reference types="@tiptap/extension-underline" />
import { useEdtiorContext } from "../../../../Context/EditorContext";
import MenuButton, { type MenuButtonProps } from "../MenuButton";

import DoneIcon from '@mui/icons-material/Done';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import RemoveDoneIcon from '@mui/icons-material/RemoveDone';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from "react";


export type MenuButtonTrackChangesProps = Partial<MenuButtonProps>;

export function MenuButtonTrackChangesToggler(props: MenuButtonTrackChangesProps) {
  const {editor} = useEdtiorContext();
  type Status = {
    isTracking: boolean,
    isToggling: boolean,
  }
  const [status, setStatus] = useState<Status>({isTracking: false, isToggling: false});

  return (
    <MenuButton
      tooltipLabel={`${status.isTracking ? "Disable" : "Enable"} track changes`}
      IconComponent={(props) => <TrackChangesIcon color={`${status.isTracking ? "error" : "success"}`} {...props} />}
      disabled={status.isToggling}
      selected={status.isToggling}
      onClick={() => {
        setStatus((pre: Status) => ({...pre, isToggling: true}));
        editor?.chain().focus().toggleTrackChangeStatus().run();
        setStatus((pre: Status) => ({...pre, isToggling: false, isTracking: !pre.isTracking}));
      }}
      {...props}
    />
  );
}

export function MenuButtonAcceptChanges(props: MenuButtonTrackChangesProps) {
  const {editor} = useEdtiorContext();
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
  const {editor} = useEdtiorContext();
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
  const {editor} = useEdtiorContext();
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
  const {editor} = useEdtiorContext();
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
