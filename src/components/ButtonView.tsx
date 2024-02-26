import React from "react";
import { Button, Image, Text, View,} from "react-native-ui-lib";
import AppStyles from "../constants/AppStyles";
import { TouchableOpacity } from "react-native";

interface Props {
    onPress: any;
    title: string;
    black?: any;
}

const ButtonView = ({onPress, title,black}: Props) => {
    return(
        <TouchableOpacity style={[AppStyles.button,black&&{backgroundColor:'black'}]} onPress={onPress}>
        <Text style={AppStyles.buttonLabel}>{title}</Text>
      </TouchableOpacity>
    )
}

export default ButtonView;