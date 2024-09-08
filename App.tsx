import {
  Alert,
  Button,
  Image,
  PermissionsAndroid,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import * as Location from "expo-location";
import Img from "./assets/vetor-do-logotipo-de-batman-ilustração-preta-bastão-isolado-no-fundo-branco-139890507.webp";
import Geolocation from "react-native-geolocation-service";
import { useEffect, useState } from "react";

export default function App() {
  const [position, setPosition] = useState<Location.LocationObjectCoords>();
  const [status, setStatus] = useState<any>();
  const [view, setView] = useState<boolean>();
  const [num, setNum] = useState<string>();
  const [cpf, setCpf] = useState<string>();
  const [nome, setNome] = useState<string>();
  

  const location = async () => {
    let { coords } = await Location.getCurrentPositionAsync({});
    setPosition(coords);
  };
  const permission = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    setStatus(status);
  };

  const _ev1 = () => {
    const str = ` nome : ${nome}\ncpf : ${cpf}\nnum : ${num}\nlat : ${position?.latitude}\nlong: ${position?.longitude}\nalt : ${position?.altitude}`
    Alert.alert('',str);
  }
  useEffect(() => {
    const exe = async () => {
      await permission();
    };
  }, []);

  return (
    <View style={styles.container}>
      {view ? (
        <View style={styles.formBox}>
          <View style={styles.form}>
            <View style={styles.label}>
              <Text>Label</Text>
              <TextInput placeholder="seu nome" style={styles.inp} onChangeText={(e) => {
                setNome(e)
              }}></TextInput>
            </View>
            <View style={styles.label}>
              <Text>Label</Text>
              <TextInput placeholder="seu numero" style={styles.inp} onChangeText={(e) => {
                setNum(e)
              }}></TextInput>
            </View>
            <View style={styles.label}>
              <Text>Label</Text>
              <TextInput placeholder="seu cpf" style={styles.inp} onChangeText={(e)=> {
                setCpf(e);
              }}></TextInput>
            </View>
            <Pressable onPress={_ev1} style={styles.btn}>
              <Text>enviar</Text>
            </Pressable>
          </View>
        </View>
      ) : (
        <View style={styles.nowRela}>
          <Image source={Img} style={styles.img}></Image>
          <Button
            onPress={() => {
              location()
              view ? setView(false) : setView(true);
            }}
            title="chamar batsinal"
          ></Button>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    backgroundColor: "#fff",
  },
  formBox: {
    flex: 1,
    padding: 8,
    display: "flex",
    justifyContent: "center",
  },
  form: {
    flex: 0.9,
    padding: 8,
  },
  label: {
    marginTop: 8,
  },
  inp: {
    width: "50%",
    marginTop: 8,
    borderRadius: 8,
    padding: 8,
    backgroundColor: "#f9f9f9",
  },
  nowRela: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    width: 256,
    height: 128,
  },
  area: {
    height: 128,
    borderRadius: 8,
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  btn: {
    marginTop:8,
    padding: 8,
    width: 64,
    display: "flex",
    alignItems: "center",
    backgroundColor: "#e5e5e5",
  },
});
