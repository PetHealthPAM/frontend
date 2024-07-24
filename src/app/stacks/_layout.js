import { Stack } from 'expo-router';

export default function StackLayout() {
    return (
        <Stack>
            <Stack.Screen name="inicial" options={{ headerShadowVisible: false, headerShown: false}} />
            <Stack.Screen name="login" options={{ headerShadowVisible: false, headerShown: false }} />
            <Stack.Screen name="cadastro" options={{ headerShadowVisible: false, headerShown: false }} />
            <Stack.Screen name="favoritos" options={{ headerShadowVisible: false, headerShown: false }} />
            <Stack.Screen name="AdicionarPet" options={{ headerShadowVisible: false, headerShown: false }} />
            <Stack.Screen name="EscolherRacaPet" options={{ headerShadowVisible: false, headerShown: false }} />
            <Stack.Screen name="inserir" options={{ headerShadowVisible: false, headerShown: false }} />
            <Stack.Screen name="PetCadastrado" options={{ headerShadowVisible: false, headerShown: false }} />
        </Stack>
    );
}
