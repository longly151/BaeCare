import * as React from "react";
import { Keyboard, KeyboardAvoidingView, Platform, Text, TouchableOpacity, View } from "react-native";
import Helper from "../helpers";
import { LinearGradient } from "expo-linear-gradient";
import { Button, Input } from "react-native-elements";
import { ScrollView, TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useState } from "react";

const TabOneScreen: React.FC = () => {
  /**
   * Handler
   */
  const [text, setText] = useState('');

  Helper.initNotification();
  Helper.requestPermission();
  Helper.getToken();
  
  const token = "ExponentPushToken[EEpm5-AXECawb9Afs5eA3A]";

  const onChangeText = (text: string) => setText(text);

  const onButtonPress = (title: string, subTitle: string) => Helper.sendNotification(token, title, subTitle);

  const onSend = () => Helper.sendNotification(token, '👧 Gấu đã gửi tin nhắn cho bạn', text);

  /**
   * UI
   */
  const renderItem = (
    colors: Array<string>,
    icon: string,
    title: string,
    subTitle: string
  ) => (
    <TouchableOpacity
      onPress={() => onButtonPress(`${icon} ${title}`, subTitle)}
      style={{
        flex: 5,
        borderRadius: 20,
        marginHorizontal: 5,
        justifyContent: "center",
      }}
    >
      <LinearGradient colors={colors} style={{borderRadius: 20}}>
        <View style={{justifyContent: 'center', alignItems: 'center', height: 150}}>
          <Text style={{ fontSize: 50, marginBottom: 10, color: 'white' }}>{icon}</Text>
          <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>{title}</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  const renderInput = () => (
    <KeyboardAvoidingView behavior={"padding"} style={{flex: 1}}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Input
          containerStyle={{ marginTop: 15 }}
          placeholder="Nhắn nhủ lời yêu thương"
          leftIcon={{ type: "font-awesome", name: "heart" }}
          leftIconContainerStyle={{ marginRight: 5 }}
          onChangeText={onChangeText || undefined}
        />
      </TouchableWithoutFeedback>
      <Button
          title="Gửi"
          ViewComponent={LinearGradient}
          linearGradientProps={{
            colors: ["#ec008c", "#fc6767"],
            start: { x: 0, y: 0.5 },
            end: { x: 1, y: 0.5 },
          }}
          buttonStyle={{ borderRadius: 20, height: 50 }}
          onPress={onSend}
        />
      </KeyboardAvoidingView>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{flex: 1}}
    >
    <ScrollView>
      <View style={{ paddingHorizontal: 18, paddingTop: 18, flex: 1}}>
        <View style={{ flexDirection: "row" }}>
          {renderItem(
            ["#d14763", "#ac7278"],
            "🍱",
            "Em đói quá",
            "Qua chở em đi ăn đi em đói quá 😞"
          )}
          {renderItem(
            ["#00F260", "#0575E6"],
            "🍹",
            "Thèm trà sữa",
            "Huhu em thèm Phúc Long Gong Cha 😞"
          )}
        </View>
        <View style={{ flexDirection: "row", marginTop: 10 }}>
          {renderItem(
            ["#d0cd25", "#d3037c"],
            "😢",
            "Nhớ anh quá",
            "Nhớ anh ghê ahuhu 😞"
          )}
          {renderItem(
            ["#c50790", "#6d6bff"],
            "📱",
            "Gọi e nha",
            "Sao qua giờ không gọi, không nhớ e à 😤"
          )}
        </View>
        {renderInput()}
      </View>
    </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default TabOneScreen;
