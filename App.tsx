import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Provider as PaperProvider, Appbar, FAB, Snackbar, Button } from 'react-native-paper';
import * as FileSystem from 'expo-file-system';
import FileList from './src/components/FileList';
import CreateFileModal from './src/components/CreateFileModal';
import CreateFolderModal from './src/components/CreateFolderModal';

const App: React.FC = () => {
  const [files, setFiles] = useState<string[]>([]);
  const [dialogVisible, setDialogVisible] = useState<boolean>(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [folderName, setFolderName] = useState<string>('');

  useEffect(() => {
    loadFiles();
  }, []);

  const loadFiles = async () => {
    try {
      const files = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory || '');
      setFiles(files);
    } catch (error) {
      handleFileError('Error loading files', error);
    }
  };

  const handleFileError = (message: string, error: Error) => {
    console.error(message, error);
    setSnackbarMessage(`${message}: ${error.message}`);
    setSnackbarVisible(true);
  };

  const createFile = async (fileName: string) => {
    const newFileName = `${fileName}.txt`;
    try {
      await FileSystem.writeAsStringAsync(`${FileSystem.documentDirectory}${newFileName}`, 'Sample content');
      setSnackbarMessage(`Created file: ${newFileName}`);
      setSnackbarVisible(true);
      loadFiles();
    } catch (error) {
      handleFileError('Error creating file', error);
    }
  };

  const createFolder = () => {
    setModalVisible(true);
  };

  const handleCreateFolder = async (folderName: string) => {
    try {
      const folderPath = `${FileSystem.documentDirectory}${folderName}`;
      const folderExists = await FileSystem.getInfoAsync(folderPath);
      
      if (folderExists.exists && folderExists.isDirectory) {
        setSnackbarMessage(`Folder '${folderName}' already exists.`);
        setSnackbarVisible(true);
        setModalVisible(false);
        return;
      }
      
      await FileSystem.makeDirectoryAsync(folderPath);
      setSnackbarMessage(`Created folder: ${folderName}`);
      setSnackbarVisible(true);
      setModalVisible(false);
      loadFiles();
    } catch (error){
      handleFileError('Error creating folder', error);
    }
  };

  const deleteFile = async (fileName: string) => {
    try {
      await FileSystem.deleteAsync(`${FileSystem.documentDirectory}${fileName}`);
      loadFiles();
      setSnackbarMessage(`Deleted file: ${fileName}`);
      setSnackbarVisible(true);
    } catch (error) {
      handleFileError('Error deleting file', error);
    }
  };

  const cancelCreateFolder = () => {
    setModalVisible(false);
    setFolderName('');
  };

  return (
    <PaperProvider>
      <Appbar.Header>
        <Appbar.Content title="File Manager" />
      </Appbar.Header>
      <View style={styles.container}>
        <FileList files={files} onDeleteFile={deleteFile} />
        <FAB style={styles.fab} icon="plus" onPress={() => setDialogVisible(true)} />
        <CreateFileModal 
          visible={dialogVisible} 
          onDismiss={() => setDialogVisible(false)} 
          onCreateFile={createFile} 
        />
        <Button style={styles.folderButton} icon="folder-plus" mode="contained" onPress={createFolder}>
          Create Folder
        </Button>
        <CreateFolderModal
          visible={modalVisible}
          onCreateFolder={handleCreateFolder}
          onCancel={cancelCreateFolder}
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
  },
  folderButton: {
    position: 'absolute',
    left: 20,
    bottom: 20,
  },
});

export default App;
