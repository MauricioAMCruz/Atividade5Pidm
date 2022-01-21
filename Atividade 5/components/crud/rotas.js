import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import AdicionarAluno from './aluno'
import EditarAlunos from './editar'
import ListadeAlunos from './lista'

const MainStack = createStackNavigator()

function Rotas() {
    return(
        <NavigationContainer>
            <MainStack.Navigator initialRouteName='lista'>
                <MainStack.Screen 
                    name='AdicionarAluno'
                    component={AdicionarAluno}
                    options={{title:'Adicionar novo aluno'}}
                />

                <MainStack.Screen 
                    name='EditarAluno'
                    component={EditarAlunos}
                    options={{title:'Editar aluno'}}
                />

                <MainStack.Screen 
                    name='ListadeAlunos'
                    component={ListadeAlunos}
                    options={{title:'Lista de alunos'}}
                />
            </MainStack.Navigator>
        </NavigationContainer>
    )
}

export default Rotas