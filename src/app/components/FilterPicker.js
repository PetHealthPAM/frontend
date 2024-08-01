import React, { useState } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function FilterPicker({ data, selectedValue, onValueChange }) {
    const [search, setSearch] = useState('');

    const filteredData = data.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchInput}
                placeholder="Buscar..."
                value={search}
                onChangeText={setSearch}
            />
            <Picker
                selectedValue={selectedValue}
                style={styles.picker}
                onValueChange={onValueChange}
            >
                <Picker.Item label="Selecione" value="" />
                {filteredData.map(item => (
                    <Picker.Item key={item.id} label={item.name} value={item.id} />
                ))}
            </Picker>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 15,
    },
    searchInput: {
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    picker: {
        height: 50,
        width: '100%',
    },
});
