import React from "react";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";

const App = () => {
  return (
    <SafeAreaView style={styles.wrapper}>
  <   View style={styles.container}>
        <Text>Welcome to Reflectify</Text>
      </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  wrapper: {
    flex: 0.5,
    backgroundColor: 'orange', 
    alignItems: 'center',
  },
  container: {

  },
  text: {
    color: 'white', 
    fontSize: 24,
    marginTop: 20,
  },
});

export default App