import React, { useState } from "react";
import { View, Modal, StyleSheet, TextInput } from "react-native";
import { Button } from "react-native-paper";


interface Props {
  visible: boolean;


  onCreateFolder: (folderName: string) => void;
  onCancel: () => void;
}

const CreateFolderModal: React.FC<Props> = ({
  visible,
  onCreateFolder,
  onCancel,
}) => {
  const [folderName, setFolderName] = useState<string>("");

  const handleCreateFolder = async () => {
    if (folderName.trim() === "") {
     
      return;
    }

    onCreateFolder(folderName);
  };

  const cancelCreateFolder = () => {
    setFolderName(""); 
    onCancel();
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
          <TextInput
            style={styles.input}
            placeholder="Enter folder name"
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
