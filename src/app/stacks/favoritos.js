// src/app/tabs/favoritos.js

import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';

export default function Favoritos() {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const loadFavorites = async () => {
            try {
                const existingFavorites = await AsyncStorage.getItem('favorites');
                const storedFavorites = existingFavorites ? JSON.parse(existingFavorites) : [];
                setFavorites(storedFavorites);
            } catch (error) {
                console.error('Error loading favorites:', error);
            }
        };

        loadFavorites();
    }, []);

    const removeFromFavorites = async (id) => {
        Alert.alert(
            'Remover dos Favoritos',
            'Tem certeza de que deseja remover este pet dos favoritos?',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
                {
                    text: 'Remover',
                    onPress: async () => {
                        try {
                            const existingFavorites = await AsyncStorage.getItem('favorites');
                            let favorites = existingFavorites ? JSON.parse(existingFavorites) : [];
                            favorites = favorites.filter(pet => pet.id !== id);
                            await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
                            setFavorites(favorites);
                        } catch (error) {
                            console.error('Error removing favorite:', error);
                            Alert.alert('Erro', 'Não foi possível remover o pet dos favoritos.');
                        }
                    },
                },
            ],
            { cancelable: true }
        );
    };

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.detailsContainer}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.details}>Espécie: {item.species}</Text>
                <Text style={styles.details}>Raça: {item.breed}</Text>
                <Text style={styles.details}>Idade: {item.age}</Text>
                <Text style={styles.description}>Descrição: {item.description}</Text>
                <TouchableOpacity
                    style={styles.favoriteButton}
                    onPress={() => removeFromFavorites(item.id)}
                >
                    <MaterialIcons name="favorite" size={24} color="#593C9D" />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            {favorites.length > 0 ? (
                <FlatList
                    data={favorites}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                />
            ) : (
                <Text style={styles.noFavoritesText}>Nenhum pet favorito encontrado.</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
        padding: 10,
    },
    card: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        marginVertical: 10,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        position: 'relative',
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginBottom: 15,
    },
    detailsContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#593C9D',
        marginBottom: 10,
    },
    details: {
        fontSize: 16,
        marginVertical: 2,
        color: '#333',
    },
    description: {
        fontSize: 14,
        marginTop: 10,
        color: '#666',
        textAlign: 'center',
    },
    noFavoritesText: {
        fontSize: 18,
        color: '#593C9D',
        textAlign: 'center',
        marginTop: 350,
    },
    favoriteButton: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        backgroundColor: '#fff',
        borderRadius: 50,
        padding: 10,
        elevation: 5,
    },
});
