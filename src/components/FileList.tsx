import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import FileItem from './FileItem';

interface FileListProps {
  files: string[];
  onDeleteFile: (fileName: string) => void;
}

const FileList: React.FC<FileListProps> = ({ files, onDeleteFile }) => {
  const hiddenFilePatterns = [
    /^tmp_/,
    /\.tmp$/,
    /BridgeReactNativeDevBundle\.js/,
    /ExperienceData/,
    /\.expo-internal/,
    /generatefid\.lock/,
    /^PersistedInstallation.*\.json$/
  ];

  const shouldHideFile = (fileName: string) => {
    for (const pattern of hiddenFilePatterns) {
      if (pattern.test(fileName)) {
        return true;
      }
    }
    return false;
  };

  const filteredFiles = files.filter(fileName => !shouldHideFile(fileName));

  return (
    <FlatList
      data={filteredFiles}
      keyExtractor={(item) => item}
      renderItem={({ item }) => (
        <FileItem fileName={item} onDelete={() => onDeleteFile(item)} />
      )}
      contentContainerStyle={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    paddingBottom: 80,
  },
});

export default FileList;
