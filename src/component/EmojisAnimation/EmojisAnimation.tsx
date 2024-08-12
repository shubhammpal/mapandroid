

import React, { useState } from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import Animated, { Easing, useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

const reactions = [
    { id: 1, name: 'love', source: require('../../assets/img/love.gif') },
    { id: 2, name: 'angry', source: require('../../assets/img/angry.gif') },
    { id: 3, name: 'haha', source: require('../../assets/img/haha.gif') },
    { id: 4, name: 'wow', source: require('../../assets/img/wow.gif') },
    { id: 5, name: 'sad', source: require('../../assets/img/sad.gif') },
];

const ReactionButton = ({ source, onPress }) => {
    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: withTiming(scale.value, { duration: 200, easing: Easing.bounce }) }],
    }));

    const handlePressIn = () => {
        scale.value = 1.5;
    };

    const handlePressOut = () => {
        scale.value = 1;
    };

    return (
        <TouchableOpacity
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={onPress}
            style={styles.button}
        >
            <Animated.View style={[styles.reaction, animatedStyle]}>
                <FastImage
                    source={source} style={styles.image}
                    resizeMode={FastImage.resizeMode.cover}
                />

            </Animated.View>
        </TouchableOpacity>
    );
};

const Reactions = ({ onReactionSelect }) => {
    return (
        <View style={styles.container}>
            {reactions.map((reaction) => (
                <ReactionButton key={reaction.id} source={reaction.source} onPress={() => onReactionSelect(reaction.name)} />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
    },
    button: {
        padding: 10,
    },
    reaction: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 50,
        height: 50,
    },
});

export default Reactions;

