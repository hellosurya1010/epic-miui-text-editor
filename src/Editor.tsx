import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import {
  AppBar,
  Box,
  CssBaseline,
  IconButton,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
  useMediaQuery,
  type PaletteMode,
} from "@mui/material";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import EditorView from "./Editor/Editor";
import { ProgressbarProvider } from "./Editor/Context/ProgressbarContext";
import { store } from "../store/app";
import * as laravel from '../utils/laravel';
import axios from "axios";



export default function Editor() {
  const systemSettingsPrefersDarkMode = useMediaQuery(
    "(prefers-color-scheme: light)"
  );

  const [paletteMode, setPaletteMode] = useState<PaletteMode>("light");
  // const [paletteMode, setPaletteMode] = useState<PaletteMode>(
  //   systemSettingsPrefersDarkMode ? "dark" : "light"
  // );
  const togglePaletteMode = useCallback(
    () =>
      setPaletteMode((prevMode) => (prevMode === "light" ? "dark" : "light")),
    []
  );

  const [doc, setDoc] = useState({ set: false, content: '' });

  useEffect(() => {
    try {
      const { fileSave } = store.getState();
      axios.get(`${laravel.url}/get-document-content/123456`)
        .then(res => {
          setDoc(pre => ({ ...pre, content: res.data.data.wordDocument, set: true }));
        }).catch(err => {
        })
    } catch (error) {
      console.error(error);
    }
  }, []);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: paletteMode,
          secondary: {
            main: "#42B81A",
          },
        },
        typography: {
          button: {
            textTransform: 'none',
          },
        },
      }),
    [paletteMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {doc.set && <EditorView content={doc.content} />}
    </ThemeProvider>
  );
}
