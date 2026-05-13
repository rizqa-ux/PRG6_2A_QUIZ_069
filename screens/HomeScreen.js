import React, { useEffect, useState } from 'react';
import {
  View, Text, FlatList, TouchableOpacity,
  StyleSheet, ActivityIndicator
} from 'react-native';

const API_URL = 'http://localhost:8080/api/buildings';

export default function HomeScreen({ navigation }) {
  const [buildings, setBuildings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('HOME'); 

  const fetchData = () => {
    setLoading(true);
    fetch(`${API_URL}/read-all`)
      .then(res => res.json())
      .then(data => {
        setBuildings(data);
        setLoading(false);
      })
      .catch(err => {
        alert('Error: ' + err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', fetchData);
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>

      {/* Tab Bar */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'HOME' && styles.activeTab]}
          onPress={() => setActiveTab('HOME')}
        >
          <Text style={[styles.tabText, activeTab === 'HOME' && styles.activeTabText]}>HOME</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'RENT' && styles.activeTab]}
          onPress={() => setActiveTab('RENT')}
        >
          <Text style={[styles.tabText, activeTab === 'RENT' && styles.activeTabText]}>RENT</Text>
        </TouchableOpacity>

        {/* Tombol Add Data hanya muncul di tab HOME */}
        {activeTab === 'HOME' && (
          <TouchableOpacity
            style={styles.addBtn}
            onPress={() => navigation.navigate('Detail', { building: null })}
          >
            <Text style={styles.addBtnText}>+ Add Data</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* List */}
      {loading ? (
        <ActivityIndicator size="large" color="#4a90d9" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={buildings}
          keyExtractor={item => item.idBuilding.toString()}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={styles.item}
              onPress={() => navigation.navigate('Detail', { building: item })}
            >
              <Text style={styles.itemNumber}>{index + 1}</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.itemName}>{item.buildingName}</Text>
                <Text style={styles.itemSub}>
                  {item.buildingType === '1' ? 'Apartment' : 'House'} | Rp {item.price?.toLocaleString()}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}

      {/* Bottom Nav - hanya muncul kalau tab RENT aktif */}
      {activeTab === 'RENT' && (
        <View style={styles.bottomNav}>
          <TouchableOpacity
            style={styles.navBtn}
            onPress={() => navigation.navigate('Apart')}
          >
            <Text style={styles.navText}>Apart</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navBtn}
            onPress={() => navigation.navigate('House')}
          >
            <Text style={styles.navText}>House</Text>
          </TouchableOpacity>
        </View>
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container:     { flex: 1, backgroundColor: '#fff' },
  tabBar:        { flexDirection: 'row', backgroundColor: '#4a90d9', padding: 10, alignItems: 'center', gap: 6 },
  tab:           { padding: 8, borderRadius: 4 },
  activeTab:     { backgroundColor: '#fff' },
  activeTabText: { color: '#4a90d9', fontWeight: 'bold' },
  tabText:       { color: '#fff', fontWeight: 'bold' },
  addBtn:        { marginLeft: 'auto', backgroundColor: '#357abd', padding: 8, borderRadius: 4 },
  addBtnText:    { color: '#fff', fontSize: 12 },
  item:          { flexDirection: 'row', padding: 14, borderBottomWidth: 1, borderColor: '#eee', alignItems: 'center' },
  itemNumber:    { width: 30, fontWeight: 'bold', color: '#555', fontSize: 16 },
  itemName:      { fontWeight: 'bold', fontSize: 15 },
  itemSub:       { color: '#888', fontSize: 12, marginTop: 2 },
  bottomNav:     { flexDirection: 'row', justifyContent: 'center', padding: 10, borderTopWidth: 1, borderColor: '#ddd', gap: 10 },
  navBtn:        { paddingVertical: 8, paddingHorizontal: 30, backgroundColor: '#4a90d9', borderRadius: 5 },
  navText:       { color: '#fff', fontWeight: 'bold' },
});