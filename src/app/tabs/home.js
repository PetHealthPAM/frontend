import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, FlatList, ScrollView } from 'react-native';
import Swiper from 'react-native-swiper';
import { useRouter, useFocusEffect } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import image1 from '../imgs/slider1.png';
import image2 from '../imgs/slider2.png';
import image3 from '../imgs/slider3.png';

const API_KEY_DOG = 'live_a18kGWDwOwGdBaVo228FKBjEjHpRxTFT1KCN64vg8autI0DK1fRncxBn53TQa7KL';
const API_KEY_CAT = 'live_rlswPycwAxMFCNOEuB0Gp9gIik708ockKXnjesGMXgMHyTxeT0LlIbjet3TPQrcM';

export default function Home() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [pets, setPets] = useState([]);
    const [dogBreeds, setDogBreeds] = useState([]);
    const [catBreeds, setCatBreeds] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: dogs } = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY_DOG}`);
                setDogBreeds(dogs);
            } catch (error) {
                console.error('Failed to fetch dog breeds:', error);
            }
            try {
                const { data: cats } = await axios.get(`https://api.thecatapi.com/v1/breeds?api_key=${API_KEY_CAT}`);
                setCatBreeds(cats);
            } catch (error) {
                console.error('Failed to fetch cat breeds:', error);
            }
        };

        fetchData();
    }, []);

    useFocusEffect(
        useCallback(() => {
            const fetchPets = async () => {
                try {
                    const storedPets = await AsyncStorage.getItem('pets');
                    if (storedPets) {
                        setPets(JSON.parse(storedPets));
                    }
                } catch (error) {
                    console.error('Error fetching pets:', error);
                }
            };

            fetchPets();
        }, [])
    );

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

    const handleAdoptionPress = () => {
        router.push('./adote');
    };

    const handleFavoritesPress = () => {
        router.push('../stacks/favoritos');
    };

    const handleAddPet = () => {
        router.push('../stacks/AdicionarPet');
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.topContainer}>
                <TextInput
                    style={styles.searchBar}
                    placeholder="Pesquisar..."
                    value={searchQuery}
                    onChangeText={handleSearch}
                />
                <TouchableOpacity style={styles.favoritesButton} onPress={handleFavoritesPress}>
                    <AntDesign name="hearto" size={30} color="#fff" />
                </TouchableOpacity>
            </View>

            <View style={styles.swiperContainer}>
                <Swiper style={styles.wrapper} autoplay={true} showsPagination={false}>
                    <View style={styles.slide}>
                        <Image source={image1} style={styles.image} />
                    </View>
                    <View style={styles.slide}>
                        <Image source={image2} style={styles.image} />
                        <TouchableOpacity style={styles.adoptionButton} onPress={handleAdoptionPress}>
                            <Text style={styles.adoptionButtonText}>Adotar</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.slide}>
                        <Image source={image3} style={styles.image} />
                    </View>
                </Swiper>
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

            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Seus Pets</Text>
            </View>
            <View style={styles.petsContainer}>
                <TouchableOpacity style={styles.addButton} onPress={handleAddPet}>
                    <AntDesign name="pluscircleo" size={60} color="#593C9D" />
                </TouchableOpacity>
                <FlatList
                    horizontal
                    data={pets}
                    renderItem={({ item }) => (
                        <View style={styles.petItem}>
                            <Image source={item.image} style={styles.petPhoto} />
                            <Text style={styles.petName}>{item.name}</Text>
                        </View>
                    )}
                    keyExtractor={(item) => item.id}
                    style={styles.petList}
                />
            </View>

            <View style={styles.breedSection}>
                <Text style={styles.breedTitle}>Raças de Cães</Text>
                <FlatList
                    horizontal
                    data={dogBreeds}
                    renderItem={({ item }) => (
                        <View style={styles.breedItem}>
                            <Image
                                source={{ uri: item?.image?.url || 'https://via.placeholder.com/100' }}
                                style={styles.breedPhoto}
                            />
                            <Text style={styles.breedName}>{item?.name || 'Nome da Raça'}</Text>
                        </View>
                    )}
                    keyExtractor={(item) => item.id}
                    style={styles.breedList}
                />
            </View>

            <View style={styles.breedSection2}>
                <Text style={styles.breedTitle}>Raças de Gatos</Text>
                <FlatList
                    horizontal
                    data={catBreeds}
                    renderItem={({ item }) => (
                        <View style={styles.breedItem}>
                            <Image
                                source={{ uri: item?.image?.url || 'https://via.placeholder.com/100' }}
                                style={styles.breedPhoto}
                            />
                            <Text style={styles.breedName}>{item?.name || 'Nome da Raça'}</Text>
                        </View>
                    )}
                    keyExtractor={(item) => item.id}
                    style={styles.breedList}
                />
            </View>
        </ScrollView>
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
        marginTop: 25,
    },
    favoritesButton: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 25,
    },
    swiperContainer: {
        height: 200,
        marginVertical: 10,
    },
    wrapper: {},
    slide: {
        flex: 1,
        backgroundColor: '#fff',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginVertical: 10,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    petsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    addButton: {
        marginVertical: 10,
        marginLeft: 20,
        marginRight: 10,
    },
    petList: {
        paddingLeft: 10,
    },
    petItem: {
        alignItems: 'center',
        marginRight: 10,
    },
    petPhoto: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 5,
    },
    petName: {
        fontSize: 16,
    },
    breedSection: {
        marginVertical: 10,
        backgroundColor: '#593C9D',
        borderRadius: 10,
        padding: 10,
        marginHorizontal: 10,
    },
    breedSection2: {
        marginVertical: 10,
        backgroundColor: '#593C9D',
        borderRadius: 10,
        padding: 10,
        marginHorizontal: 10,
        marginBottom: 90,
    },
    breedTitle: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
        marginLeft: 5,
    },
    breedList: {
        paddingVertical: 10,
    },
    breedItem: {
        marginRight: 10,
        alignItems: 'center',
    },
    breedPhoto: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    breedName: {
        color: '#fff',
        marginTop: 5,
        textAlign: 'center',
    },
    adoptionButton: {
        position: 'absolute',
        bottom: 20,
        left: '50%',
        transform: [{ translateX: -140 }],
        backgroundColor: '#593C9D',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
    },
    adoptionButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
