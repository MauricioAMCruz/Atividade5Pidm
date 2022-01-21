import React, { useState, useEffect, useReducer } from 'react'
import { View, Text, ScrollView, Button, ActivityIndicator, StyleSheet } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import firebase from '../../firebase/firebase_config'


const EditarAlunos = (props) => {
    const initialState = { id: '', nome: '', sobrenome: '', curso: '', ira: '' }
    const [aluno, setAluno] = useState(initialState)

    useEffect(
        () => {
            getAlunoById(props.route.params.alunoId)
        }
        ,
        []
    )

    const handleChangeText = (value,prop)=> {
        setAluno({...aluno, [prop]:value})
    }

    const getAlunoById = async (id) => {
        const dbRef = firebase.db.collection('alunos').doc(id)
        const doc = await dbRef.get()
        const aluno = doc.data()
        setAluno({ ...aluno, id: doc.id })
    }

    const deleteAluno = async () => {
        const dbRef = firebase.db.collection('alunos').doc(props.route.params.alunoId)
        await dbRef.delete()
        props.navigation.navigate('ListadeAlunos')
    }

    const updateAluno = async () => {
        const alunoRef = firebase.db.collection('alunos').doc(aluno.id)
        await alunoRef.set({
            nome: aluno.nome,
            sobrenome: aluno.sobrenome,
            curso: aluno.curso,
            ira: aluno.ira
        })
        setAluno(initialState)
        props.navigation.navigate('ListadeAlunos')
    } 

    return (
        <ScrollView style={styles.container}>
            <View>
                <TextInput
                    placeholder='Nome'
                    style={styles.inputGroup}
                    value={aluno.nome}
                    onChangeText={(value)=>handleChangeText(value,'nome')}
                />
            </View>
            <View>
                <TextInput
                    placeholder='Sobrenome'
                    style={styles.inputGroup}
                    value={aluno.sobrenome}
                    onChangeText={(value)=>handleChangeText(value,'sobrenome')}
                />
            </View>
            <View>
                <TextInput
                    placeholder='Curso'
                    style={styles.inputGroup}
                    value={aluno.curso}
                    onChangeText={(value)=>handleChangeText(value,'curso')}
                />
            </View>
            <View>
                <TextInput
                    placeholder='Ira'
                    style={styles.inputGroup}
                    value={aluno.ira}
                    onChangeText={(value)=>handleChangeText(value,'ira')}
                />
            </View>
            <View >
                <Button
                    title='Apagar Aluno'
                    color='#E37399'
                    onPress={()=>deleteAluno()}
                />
            </View>
            <View style={styles.btn}>
                <Button
                    title='Atualizar'
                    onPress={()=>updateAluno()}
                />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 35
    },
    loader: {

    },
    inputGroup: {
        flex: 1,
        padding: 0,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc'
    },
    btn: {
        marginTop: 8
    }
})

export default EditarAlunos