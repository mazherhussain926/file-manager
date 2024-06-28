import React, { useState } from "react";
import { Modal, StyleSheet, View, TextInput, Text } from "react-native";
import { Button } from "react-native-paper";

interface CreateFileModalProps {
  visible: boolean;
  onDismiss: () => void;
  onCreateFile: (fileName: string) => void;
}

const CreateFileModal: React.FC<CreateFileModalProps> = ({
  visible,
  onDismiss,
  onCreateFile,
}) => {
  const [fileName, setFileName] = useState<string>("");

  const handleCreateFile = () => {
    if (fileName.trim() === "") {
      return;
    }
    onCreateFile(fileName);
    setFileName("");
    onDismiss();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={false}
      onRequestClose={onDismiss}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Create New File</Text>
          <TextInput
            placeholder="File Name"
            value={fileName}
            onChangeText={(text) => setFileName(text)}
            style={styles.input}
          />
          <View style={styles.buttonContainer}>
            <Button mode="contained" onPress={handleCreateFile}>
              Create
            </Button>
            <Button mode="outlined" onPress={onDismiss}>
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
    fontWeight: "bold",
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

export default CreateFileModal;
