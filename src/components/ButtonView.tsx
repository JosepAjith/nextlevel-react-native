import React from "react";
import { Button, Image, Text, View,} from "react-native-ui-lib";
import AppStyles from "../constants/AppStyles";
import { TouchableOpacity } from "react-native";

interface Props {
    onPress: any;
    title: string;
    black?: any;
    white?: any;
}

const ButtonView = ({onPress, title,black,white}: Props) => {
    return(
        <TouchableOpacity style={[AppStyles.button,black&&{backgroundColor:'black'}, white&&{backgroundColor:'white'}]} onPress={onPress}>
        <Text style={[AppStyles.buttonLabel,white&&{color:'black'}]}>{title}</Text>
      </TouchableOpacity>
    )
}

export default ButtonView;