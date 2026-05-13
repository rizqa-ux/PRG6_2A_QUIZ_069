import React, { useEffect, useState } from 'react';
import {
  View, Text, FlatList, TouchableOpacity,
  StyleSheet, Alert, ActivityIndicator
} from 'react-native';

const API_URL = 'http://localhost:8080/api/buildings';

export default function ApartScreen({ navigation }) {
  const [buildings, setBuildings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    setLoading(true);
    fetch(`${API_URL}/read-by-type/1`)
      .then(res => res.json())
      .then(data => {
        setBuildings(data);
        setLoading(false);
      })
      .catch(err => {
        Alert.alert('Error', err.message);
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
          style={styles.tab}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.tabText}>HOME</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tab, styles.activeTab]}>
          <Text style={styles.activeTabText}>RENT</Text>
        </TouchableOpacity>
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
                <Text style={styles.itemSub}>{item.location}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}

      {/* Bottom Nav */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={[styles.navBtn, styles.activeNavBtn]}>
          <Text style={styles.navText}>Apart</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navBtn}
          onPress={() => navigation.navigate('House')}
        >
          <Text style={styles.navText}>House</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container:    { flex: 1, backgroundColor: '#fff' },
  tabBar:       { flexDirection: 'row', backgroundColor: '#4a90d9', padding: 10, gap: 8 },
  tab:          { padding: 8, borderRadius: 4 },
  activeTab:    { backgroundColor: '#fff' },
  activeTabText:{ color: '#4a90d9', fontWeight: 'bold' },
  tabText:      { color: '#fff', fontWeight: 'bold' },
  item:         { flexDirection: 'row', padding: 14, borderBottomWidth: 1, borderColor: '#eee', alignItems: 'center' },
  itemNumber:   { width: 30, fontWeight: 'bold', color: '#555', fontSize: 16 },
  itemName:     { fontWeight: 'bold', fontSize: 15 },
  itemSub:      { color: '#888', fontSize: 12, marginTop: 2 },
  bottomNav:    { flexDirection: 'row', justifyContent: 'center', padding: 10, borderTopWidth: 1, borderColor: '#ddd', gap: 10 },
  navBtn:       { paddingVertical: 8, paddingHorizontal: 30, backgroundColor: '#4a90d9', borderRadius: 5 },
  activeNavBtn: { backgroundColor: '#357abd' },
  navText:      { color: '#fff', fontWeight: 'bold' },
});