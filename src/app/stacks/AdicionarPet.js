import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { fetchDogBreeds, fetchCatBreeds } from '../utils/api'; // Funções para buscar raças

export default function AddPet() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [petType, setPetType] = useState('');
    const [petName, setPetName] = useState('');
    const [petBreed, setPetBreed] = useState('');
    const [breeds, setBreeds] = useState([]);

    useEffect(() => {
        if (petType === 'cachorro') {
            fetchDogBreeds().then((breeds) => setBreeds(breeds));
        } else if (petType === 'gato') {
            fetchCatBreeds().then((breeds) => setBreeds(breeds));
        }
    }, [petType]);

    const handleNext = () => {
        if (step === 1 && !petType) {
            Alert.alert('Por favor, escolha a espécie do seu pet.');
        } else if (step === 2 && !petName) {
            Alert.alert('Por favor, insira o nome do seu pet.');
        } else if (step === 3 && !petBreed) {
            Alert.alert('Por favor, escolha a raça do seu pet.');
        } else {
            setStep(step + 1);
        }
    };

    const handleBack = () => {
        if (step > 1) {
            setStep(step - 1);
        } else {
            router.back();
        }
    };

    const handleFinish = () => {
        // Simular adição do pet e voltar à tela Home
        Alert.alert('Pet cadastrado com sucesso!');
        router.push('../tabs/home');
    };

    return (
        <View style={styles.container}>
            {step === 1 && (
                <View style={styles.stepContainer}>
                    <Text style={styles.question}>Qual a espécie do seu pet?</Text>
                    <TouchableOpacity
                        style={styles.optionButton}
                        onPress={() => setPetType('gato')}
                        selected={petType === 'gato'}
                    >
                        <Text style={styles.optionText}>Gato</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.optionButton}
                        onPress={() => setPetType('cachorro')}
                        selected={petType === 'cachorro'}
                    >
                        <Text style={styles.optionText}>Cachorro</Text>
                    </TouchableOpacity>
                </View>
            )}
            {step === 2 && (
                <View style={styles.stepContainer}>
                    <Text style={styles.question}>Insira o nome do seu pet</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Nome do Pet"
                        value={petName}
                        onChangeText={setPetName}
                    />
                </View>
            )}
            {step === 3 && (
                <View style={styles.stepContainer}>
                    <Text style={styles.question}>Escolha a raça do seu pet</Text>
                    <FlatList
                        data={breeds}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.breedOption}
                                onPress={() => setPetBreed(item.name)}
                            >
                                <Text style={styles.breedText}>{item.name}</Text>
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item) => item.id}
                    />
                </View>
            )}
            {step === 4 && (
                <View style={styles.stepContainer}>
                    <Text style={styles.successMessage}>Pet cadastrado com sucesso!</Text>
                </View>
            )}
            <View style={styles.navigation}>
                {step < 4 && (
                    <TouchableOpacity style={styles.backButton} onPress={handleBack}>
                        <Text style={styles.buttonText}>Voltar</Text>
                    </TouchableOpacity>
                )}
                {step < 4 && (
                    <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
                        <Text style={styles.buttonText}>Próximo</Text>
                    </TouchableOpacity>
                )}
                {step === 4 && (
                    <TouchableOpacity style={styles.finishButton} onPress={handleFinish}>
                        <Text style={styles.buttonText}>Concluir</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    stepContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    question: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    optionButton: {
        width: '80%',
        padding: 15,
        borderRadius: 10,
        backgroundColor: '#593C9D',
        alignItems: 'center',
        marginVertical: 10,
    },
    optionText: {
        color: '#fff',
        fontSize: 18,
    },
    input: {
        width: '80%',
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginTop: 20,
    },
    breedOption: {
        padding: 15,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
    },
    breedText: {
        fontSize: 18,
    },
    successMessage: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'green',
    },
    navigation: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    backButton: {
        backgroundColor: '#ccc',
        padding: 15,
        borderRadius: 10,
    },
    nextButton: {
        backgroundColor: '#593C9D',
        padding: 15,
        borderRadius: 10,
    },
    finishButton: {
        backgroundColor: 'green',
        padding: 15,
        borderRadius: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
});
