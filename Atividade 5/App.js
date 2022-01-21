import React from 'react'
import { StyleSheet, View } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import rotas from '.components/crud/rotas'

const App = ()=>
<SafeAreaProvider>
  <rotas/>
</SafeAreaProvider>

export default App