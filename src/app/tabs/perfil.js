import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, FlatList, Alert, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { AntDesign, Feather, Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const searchData = [
    { id: '1', title: 'Home', route: './home' },
    { id: '2', title: 'Calendário', route: './calendario' },
    { id: '3', title: 'Adote', route: './adote' },
    { id: '4', title: 'Perfil', route: './perfil' },
    { id: '5', title: 'Favoritos', route: '../stacks/favoritos' },
    { id: '5', title: 'Configurações', route: '' },
    { id: '6', title: 'Meus Pets', route: '' },
    { id: '7', title: 'Informações pessoais', route: '' },
];

export default function Perfil() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [userName, setUserName] = useState('Nome do Usuário');
    const [profileImage, setProfileImage] = useState(null);

    const handleSearch = (query) => {
        setSearchQuery(query);
        setFilteredData(
            searchData.filter((item) =>
                item.title.toLowerCase().includes(query.toLowerCase())
            )
        );
    };

    const handleSearchPress = (route) => {
        router.push(route);
    };

    const handleFavoritesPress = () => {
        router.push('../stacks/favoritos');
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setProfileImage(result.assets[0].uri);
        }
    };

    const handleEditProfile = () => {
        Alert.prompt(
            'Editar Nome',
            'Digite o novo nome do usuário:',
            [
                { text: 'Cancelar', style: 'cancel' },
                { text: 'OK', onPress: (text) => setUserName(text) },
            ],
            'plain-text',
            userName
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <TextInput
                    style={styles.searchBar}
                    placeholder="Pesquisar..."
                    value={searchQuery}
                    onChangeText={handleSearch}
                />
                <TouchableOpacity style={styles.favoritesButton} onPress={handleFavoritesPress}>
                    <AntDesign name="hearto" size={30} color="#fff" style={{ marginTop: 35 }} />
                </TouchableOpacity>
            </View>
            {searchQuery.length > 0 && (
                <FlatList
                    data={filteredData}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => handleSearchPress(item.route)}>
                            <Text style={styles.searchResult}>{item.title}</Text>
                        </TouchableOpacity>
                    )}
                />
            )}
            <Text style={styles.title}>Perfil</Text>
            <View style={styles.profileContainer}>
                <TouchableOpacity onPress={pickImage}>
                    <Image source={profileImage ? { uri: profileImage } : require('../imgs/default-profile.jpg')} style={styles.profileImage} />
                </TouchableOpacity>
                <View style={styles.profileDetails}>
                    <Text style={styles.userName}>{userName}</Text>
                    <TouchableOpacity onPress={handleEditProfile}>
                        <Feather name="edit" size={24} color="#000" />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.settingsContainer}>
                <TouchableOpacity style={styles.settingItem} onPress={() => router.push('./informacoes-pessoais')}>
                    <Ionicons name="person-outline" size={24} color="#000" />
                    <Text style={styles.settingText}>Informações Pessoais</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.settingItem} onPress={() => router.push('./meus-pets')}>
                    <Ionicons name="paw-outline" size={24} color="#000" />
                    <Text style={styles.settingText}>Meus Pets</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.settingItem} onPress={() => router.push('../stacks/login')}>
                    <Ionicons name="exit-outline" size={24} color="#000" />
                    <Text style={styles.settingText}>Sair</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    topContainer: {
        width: '100%',
        height: 100,
        backgroundColor: '#593C9D',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 20,
    },
    searchBar: {
        flex: 1,
        height: 40,
        backgroundColor: '#fff',
        borderRadius: 20,
        paddingHorizontal: 15,
        marginRight: 15,
        marginTop: 30,
    },
    favoritesButton: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginVertical: 20,
        marginLeft: 20,
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    profileDetails: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 20,
    },
    userName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginRight: 10,
    },
    settingsContainer: {
        marginTop: 10,
        paddingHorizontal: 20,
    },
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    settingText: {
        fontSize: 18,
        marginLeft: 10,
    },
    searchResult: {
        padding: 10,
        backgroundColor: '#f9f9f9',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
});
