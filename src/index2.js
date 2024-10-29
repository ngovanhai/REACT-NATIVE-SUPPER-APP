import React, { useRef } from 'react'
import { Image, NativeModules, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button } from './components'
import Video, { VideoRef } from 'react-native-video';

export default function index() {
    const videoRef = useRef(null);
    return (
        <SafeAreaView><View style={{ height: "100%", overflow: 'hidden' }}><View style={{ flex: 1, margin: 10, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontWeight: 'bold' }}>Ví dụ về Video</Text>
            <Image source={require("./logohrm.png")} style={{ width: 100, height: 100 }} />
            {/* <Video
                // Can be a URL or a local file.
                source={{ uri: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4" }}
                // Store reference  
                ref={videoRef}
                style={{ width: 200, height: 200 }}
            /> */}
        </View>
            <View style={{ margin: 10 }}>
                <Button title={"Thoát"} onPress={() => {
                    NativeModules.ConnectNativeModule.closeApp("APP");
                }}></Button></View></View></SafeAreaView>
    )
}
