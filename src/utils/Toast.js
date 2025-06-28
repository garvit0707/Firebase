import Toast from "react-native-root-toast";

export const SuccessToast =(text)=>{
    return Toast.show(text,{
        duration:Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        opacity:1,
        backgroundColor: "#14A44D",
        textColor: "#fff"
    })
};

export const ErrorToast=(text)=>{
    return Toast.show(text,{
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        backgroundColor: "#DC4C64",
        textColor:"#fff",
        shadow: true,
        opacity:1,
        animation: true,
    })
};

export const  WarningToast =(text)=>{
    return Toast.show(text,{
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        shadow: true,
        opacity:1,
        animation: true,
        backgroundColor:"#FFC300",
        textColor:"#fff"
    })
};