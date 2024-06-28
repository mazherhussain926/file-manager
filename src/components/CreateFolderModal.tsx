import React, { useState } from "react";
import { View,Text, Modal, StyleSheet, TextInput } from "react-native";
import { Button } from "react-native-paper";


interface Props {
  visible: boolean;
  onCreateFolder: (folderName: string) => void;
  onDismiss: () => void;
}

const CreateFolderModal: React.FC<Props> = ({
  visible,
  onCreateFolder,
  onDismiss,
}) => {
  const [folderName, setFolderName] = useState<string>("");

  const handleCreateFolder =  () => {
    if (folderName.trim() === "") {
      return;
    }

    onCreateFolder(folderName);
    setFolderName("")
  };

  const cancelCreateFolder = () => {
    setFolderName(""); 
    onDismiss();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={cancelCreateFolder}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>Create New Folder</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Folder Name"
            value={folderName}
            onChangeText={(text) => setFolderName(text)}
          />
          <View style={styles.buttonContainer}>
            <Button mode="contained" onPress={handleCreateFolder}>
              Create
            </Button>
            <Button mode="outlined" onPress={cancelCreateFolder}>
              Cancel
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    width: "100%",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 20,
  },
});

export default CreateFolderModal;
