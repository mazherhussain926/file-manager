import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

interface FileItemProps {
  fileName: string;
  onDelete: () => void;
}

const FileItem: React.FC<FileItemProps> = ({ fileName, onDelete }) => {
  return (
    <View style={styles.fileItem}>
      <Text style={styles.fileName}>{fileName}</Text>
      <Button mode="contained" onPress={onDelete}>Delete</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  fileItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  fileName: {
    fontSize: 18,
  },
});

export default FileItem;
