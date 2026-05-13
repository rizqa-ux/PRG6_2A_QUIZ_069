import React, { useState } from 'react';
import {
  View, Text, TextInput, Pressable,
  StyleSheet, Alert, ScrollView
} from 'react-native';

const API_URL = 'http://localhost:8080/api/buildings';

export default function DetailScreen({ route, navigation }) {
  const existing = route.params?.building;

  const [buildingName, setBuildingName] = useState(existing?.buildingName || '');
  const [buildingType, setBuildingType] = useState(existing?.buildingType || '');
  const [location,     setLocation]     = useState(existing?.location     || '');
  const [buildingArea, setBuildingArea] = useState(existing?.buildingArea?.toString() || '');

  const handleCreate = () => {
    if (!buildingName || !buildingType || !location || !buildingArea) {
      alert('Semua field harus diisi!');
      return;
    }
    if (buildingType !== '1' && buildingType !== '2') {
      alert('Building Type harus 1 (Apartment) atau 2 (House)!');
      return;
    }

    const payload = {
      buildingName,
      buildingType,
      location,
      buildingArea: parseInt(buildingArea),
    };

    fetch(`${API_URL}/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then(res => res.json())
      .then(() => {
        alert('Data berhasil ditambahkan!');
        navigation.goBack(); 
      })
      .catch(err => alert('Error: ' + err.message));
  };

  const handleDelete = () => {
    if (!existing?.idBuilding) {
      alert('Tidak ada data untuk dihapus.');
      return;
    }

    if (window.confirm('Yakin ingin menghapus data ini?')) {
      fetch(`${API_URL}/delete/${existing.idBuilding}`, { method: 'DELETE' })
        .then(() => {
          alert('Data berhasil dihapus!');
          navigation.goBack();
        })
        .catch(err => alert('Error: ' + err.message));
    }
  };

  return (
    <ScrollView style={styles.container}>

      <Text style={styles.label}>Building Name</Text>
      <TextInput
        style={styles.input}
        value={buildingName}
        onChangeText={setBuildingName}
        placeholder="Masukkan nama gedung"
      />

      <Text style={styles.label}>Building Type</Text>
      <TextInput
        style={styles.input}
        value={buildingType}
        onChangeText={setBuildingType}
        placeholder="1 = Apartment, 2 = House"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Location</Text>
      <TextInput
        style={styles.input}
        value={location}
        onChangeText={setLocation}
        placeholder="Nama Kota"
      />

      <Text style={styles.label}>Building Area</Text>
      <TextInput
        style={styles.input}
        value={buildingArea}
        onChangeText={setBuildingArea}
        placeholder="Luas dalam satuan"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Price</Text>
      <TextInput
        style={[styles.input, styles.disabledInput]}
        value={
          buildingArea && buildingType === '1'
            ? `Rp ${(parseInt(buildingArea) * 150000).toLocaleString()}`
            : buildingArea && buildingType === '2'
            ? `Rp ${(parseInt(buildingArea) * 180000).toLocaleString()}`
            : 'Otomatis dihitung'
        }
        editable={false}
      />

      <View style={styles.buttonRow}>
        {/* Ganti TouchableOpacity ke Pressable */}
        <Pressable
          style={({ pressed }) => [styles.addBtn, pressed && { opacity: 0.7 }]}
          onPress={handleCreate}
        >
          <Text style={styles.btnText}>+ Add Data</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [styles.deleteBtn, pressed && { opacity: 0.7 }]}
          onPress={handleDelete}
        >
          <Text style={styles.btnText}>Delete</Text>
        </Pressable>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:     { flex: 1, padding: 16, backgroundColor: '#fff' },
  label:         { fontWeight: 'bold', marginTop: 14, marginBottom: 4, fontSize: 14 },
  input:         { borderWidth: 1, borderColor: '#ccc', borderRadius: 4, padding: 10, fontSize: 14 },
  disabledInput: { backgroundColor: '#f0f0f0', color: '#888' },
  buttonRow:     { flexDirection: 'row', justifyContent: 'space-between', marginTop: 30, marginBottom: 40 },
  addBtn:        { flex: 1, marginRight: 8, backgroundColor: '#4a90d9', padding: 14, borderRadius: 6, alignItems: 'center' },
  deleteBtn:     { flex: 1, marginLeft: 8, backgroundColor: '#e74c3c', padding: 14, borderRadius: 6, alignItems: 'center' },
  btnText:       { color: '#fff', fontWeight: 'bold', fontSize: 14 },
});