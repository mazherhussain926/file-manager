import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import {
  Provider as PaperProvider,
  Appbar,
  FAB,
  Snackbar,
  Button,
} from "react-native-paper";
import * as FileSystem from "expo-file-system";
import FileList from "./src/components/FileList";
import CreateFileModal from "./src/components/CreateFileModal";
import CreateFolderModal from "./src/components/CreateFolderModal";

const App: React.FC = () => {
  const [files, setFiles] = useState<string[]>([]);
  const [fileModalVisible, setFileModalVisible] = useState<boolean>(false);
  const [snackbarVisible, setSnackbarVisible] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [FolderModalVisible, setFolderModalVisible] = useState<boolean>(false);
  useEffect(() => {
    loadFiles();
  }, []);
  const loadFiles = async () => {
    try {
      const files = await FileSystem.readDirectoryAsync(
        FileSystem.documentDirectory || ""
      );
      setFiles(files);
    } catch (error) {
      console.log("Error loading files", error);
    }
  };

  const handleFileError = (message: string, error: Error) => {
    console.log(message, error);
    setSnackbarMessage(`${message}:${error.message}`);
    setSnackbarVisible(true);
  };

  const handleCreateFile = async (fileName: string) => {
    const newFileName = `${fileName}.txt`;
    try {
      await FileSystem.writeAsStringAsync(
        `${FileSystem.documentDirectory}${newFileName}`,
        "Sample content"
      );
      setSnackbarMessage(`Created file: ${newFileName}`);
      setSnackbarVisible(true);
      loadFiles();
    } catch (error: any) {
      handleFileError("Error creating file", error);
    }
  };

  const handleCreateFolder = async (folderName: string) => {
    const folderPath = `${FileSystem.documentDirectory}${folderName}`;
    const folderExists = await FileSystem.getInfoAsync(folderPath);
    try {
      if (folderExists.exists && folderExists.isDirectory) {
        setSnackbarMessage(`Folder '${folderName}' already exists.`);
        setSnackbarVisible(true);
        setFolderModalVisible(false);
        return;
      }

      await FileSystem.makeDirectoryAsync(folderPath);
      setSnackbarMessage(`Created folder: ${folderName}`);
      setSnackbarVisible(true);
      setFolderModalVisible(false);
      loadFiles();
    } catch (error: any) {
      handleFileError("Error creating folder", error);
    }
  };

  const deleteFile = async (fileName: string) => {
    try {
      await FileSystem.deleteAsync(
        `${FileSystem.documentDirectory}${fileName}`
      );
      loadFiles();
      setSnackbarMessage(`Deleted file: ${fileName}`);
      setSnackbarVisible(true);
    } catch (error: any) {
      handleFileError("Error deleting file", error);
    }
  };


  return (
    <PaperProvider>
      <Appbar.Header>
        <Appbar.Content title="File Manager" />
      </Appbar.Header>
      <View style={styles.container}>
        <FileList files={files} onDeleteFile={deleteFile} />
        <FAB
          style={styles.fab}
          icon="plus"
          onPress={() => setFileModalVisible(true)}
        />
        <CreateFileModal
          visible={fileModalVisible}
          onDismiss={() => setFileModalVisible(false)}
          onCreateFile={handleCreateFile}
        />
        <Button
          style={styles.folderButton}
          mode="contained"
          onPress={() => setFolderModalVisible(true)}
        >
          Create Folder
        </Button>
        <CreateFolderModal
          visible={FolderModalVisible}
          onCreateFolder={handleCreateFolder}
          onDismiss={() => setFolderModalVisible(false)}
        />
        <Snackbar
          visible={snackbarVisible}
          onDismiss={() => setSnackbarVisible(false)}
          duration={Snackbar.DURATION_SHORT}
        >
          {snackbarMessage}
        </Snackbar>
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 20,
  },
  folderButton: {
    position: "absolute",
    left: 20,
    bottom: 20,
  },
});

export default App;
