import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

    root: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
        backgroundColor: 'black'
    },
    button: {
        width: '50%',
        backgroundColor: 'gray'
    },
    redButton: {
        width: '50%',
        backgroundColor: '#8B0000',
    },
    blueButton: {
        width: '50%',
        backgroundColor: '#00008B'
    },
    inputs: {
        width: '90%',
        backgroundColor: ''
    },
    header: {
        flexDirection: 'row',
        gap: 15,
        alignItems: 'center',
    },
    iconEnd: {
        alignItems: 'flex-end',
        flex: 1,
    },
    modal: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        marginHorizontal: 20,
        borderRadius: 10,
        backgroundColor: 'black',
        gap: 10,
    },
    buttonModal: {
        width: '50%',
        backgroundColor: 'gray',
        marginLeft: 80
    },
});

export default styles