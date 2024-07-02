import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const CustomButton = ({ title, handlePress, containerStyle, textStyles, isLoading }) => {
    return (
        <TouchableOpacity
            onPress={handlePress}
            activeOpacity={0.7}
            className={`bg-secondary-200 rounded-xl min-h-[62px] justify-center items-center ${containerStyle} ${isLoading ? 'opacity-50' : ''}`} disabled={isLoading}>
            <Text className={`text-md font-psemibold text-primary ${textStyles}`}>{title}</Text>
        </TouchableOpacity>
    )
}

export default CustomButton