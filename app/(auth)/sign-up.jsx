import { Alert, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { Link, router } from 'expo-router';
import { registerUser } from '../../lib/appwrite';
import { useGlobalContext } from '../../context/GlobalProvider';

const SignUp = () => {
    const { setUser, setIsLoggedIn } = useGlobalContext();

    const [form, setForm] = useState({
        email: '',
        password: '',
        username: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false)

    const submit = async () => {
        if (!form.username || !form.email || !form.password) {
            return Alert.alert('Error', 'Please fill in all the fields');
        }
        setIsSubmitting(true);
        try {
            const result = await registerUser(form?.email, form?.password, form?.username);
            setUser(result);
            setIsLoggedIn(true);
            router.replace('/home');

        } catch (error) {
            console.log(error)
            Alert.alert('Error 13', error.message)
        } finally {
            setIsSubmitting(false)
        }

    }
    return (
        <SafeAreaView className="bg-primary h-full">
            <ScrollView>
                <View className="w-full min-h-[85vh] justify-center px-4 my-6">
                    <Image
                        source={images.logo}
                        className="w-[115px] h-[35px]"
                        resizeMode='contain'
                    />
                    <Text className="text-2xl text-white font-psemibold mt-5 text-semibold">Sign up to Aura</Text>
                    <FormField
                        title='Username'
                        value={form?.username}
                        handleChangeText={(e) => setForm({ ...form, username: e })}
                        otherStyles="mt-7"
                    />
                    <FormField
                        title='Email'
                        value={form?.email}
                        handleChangeText={(e) => setForm({ ...form, email: e })}
                        otherStyles="mt-7"
                    />
                    <FormField
                        title='Password'
                        value={form?.password}
                        handleChangeText={(e) => setForm({ ...form, password: e })}
                        otherStyles="mt-7"
                    />
                    <CustomButton
                        title='Sign Up'
                        handlePress={submit}
                        containerStyle='mt-7'
                        isLoading={isSubmitting}
                    />
                    <View className="flex-row justify-center items-center pt-5 gap-2">
                        <Text className="text-lg text-gray-100 font-pregular">
                            Have an account already ?
                        </Text>
                        <Link href="/sign-in" className='text-lg font-psemibold text-secondary'>Sign in</Link>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default SignUp

