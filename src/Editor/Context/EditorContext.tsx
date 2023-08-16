import { ReactNode, createContext, useContext, useState } from "react";
import { Editor } from "@tiptap/core";

type EditorType = Editor | null;

export type EditorContextType = {
    editor: null | EditorType,
    setEditor: React.Dispatch<React.SetStateAction<EditorType>>,
}


const EditorContext = createContext<EditorContextType | undefined>(undefined);

export const useEdtiorContext = (): EditorContextType => {
    const context = useContext(EditorContext);
    if (!context) {
        throw new Error('useCountContext must be used within a CountProvider');
    }
    return context;
};

export function EditorProvider({ children }: { children: ReactNode }) {
    const [editor, setEditor] = useState<EditorType>(null);
    const value: EditorContextType = { editor, setEditor };
    return (<EditorContext.Provider value={value}>
        {children}
    </EditorContext.Provider>)
}