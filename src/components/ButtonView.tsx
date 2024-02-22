import React from "react";
import { Button, Image, Text, View,} from "react-native-ui-lib";
import AppStyles from "../constants/AppStyles";
import { TouchableOpacity } from "react-native";

interface Props {
    onPress: any;
    title: string;
}

const ButtonView = ({onPress, title}: Props) => {
    return(
        <TouchableOpacity style={[AppStyles.button]} onPress={onPress}>
        <Text style={AppStyles.buttonLabel}>{title}</Text>
      </TouchableOpacity>
    )
}

export default ButtonView;