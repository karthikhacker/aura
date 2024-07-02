import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import useAppwrite from '../../lib/useAppwrite';
import { getUserPosts, searchPosts, signOut } from '../../lib/appwrite';
import SearchInput from '../../components/SearchInput';
import EmptyState from '../../components/EmptyState';
import VideoCard from '../../components/VideoCard'
import { useGlobalContext } from '../../context/GlobalProvider';
import { icons } from '../../constants';
import InfoBox from '../../components/InfoBox';
import { router } from 'expo-router';

const Profile = () => {
    const { user, setUser, setIsLoggedIn } = useGlobalContext();
    const { data: posts, refetch } = useAppwrite(() => getUserPosts(user.$id));

    const logout = async () => {
        await signOut()
        setUser(null);
        setIsLoggedIn(false);
        router.replace('/sign-in')
    }
    return (
        <SafeAreaView className="bg-primary h-full ">
            <FlatList
                data={posts}
                keyExtractor={(item) => item.$id}
                renderItem={({ item }) => (
                    <VideoCard
                        title={item.title}
                        thumbnail={item.thumbnail}
                        video={item.video}
                        creator={item.creator.username}
                        avatar={item.creator.avatar}
                    />
                )}
                ListHeaderComponent={() => (
                    <View className="w-full  justify-center items-center mt-6 mb-12 px-4 ">
                        <TouchableOpacity className="w-full items-end mb-10" onPress={logout}>
                            <Image
                                source={icons.logout}
                                className="h-6 w-6"
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                        <View className="w-16  h-16   border  border-secondary rounded-lg flex justify-center items-center">
                            <Image
                                source={{ uri: user?.avatar }}
                                className="w-[90%] h-[90%]"
                                resizeMode='cover'
                            />
                        </View>
                        <InfoBox
                            title={user?.username}
                            containerStyles="mt-5"
                            titleStyle="text-lg"
                        />
                        <View className=" mt-5 flex flex-row  ">
                            <InfoBox
                                title={posts.length || 0}
                                subTitle="Posts"
                                titleStyle="text-xl"
                                containerStyles="mr-10"
                            />
                            <InfoBox
                                title="1.2K"
                                subTitle="Followers"
                                titleStyle="text-xl"
                            />
                        </View>
                    </View>
                )}
                ListEmptyComponent={() => (
                    <EmptyState
                        title="No viedo's found !"
                        subTitle="No video's found  this search query"
                    />
                )}
            />
        </SafeAreaView>

    )
}

export default Profile