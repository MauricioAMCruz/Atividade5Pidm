import React, { useState, useEffect } from 'react'
import { View, Text, Button } from 'react-native'
import { ListItem, Avatar } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler'

import firebase from '../../firebase/firebase_config'

const ListadeAlunos = (props) => {

    const [alunos, setUsers] = useState([])

    useEffect(
        ()=>{
            firebase.db.collection('alunos').onSnapshot(
                (queryOnSnapshot)=>{
                    const alunos = []
                    queryOnSnapshot.docs.forEach(
                        (doc)=>{
                            const {nome, sobrenome, curso, ira} = doc.data()
                            alunos.push({id:doc.id, nome, sobrenome, curso, ira})
                        }
                    )
                    setUsers(alunos)
                }
            )
        }
        ,
        []
    )

    return (
        <ScrollView>
            <Button
                onPress={
                    ()=>props.navigation.navigate('AdicionarAluno')
                }
                title='Criar Aluno'
            />
            {
                alunos.map(
                    (aluno) => {
                        return (
                            <ListItem
                                key={user.id}
                                bottomDivider
                                onPress={
                                    ()=>{
                                        props.navigation.navigate('EditarAlunos',{userId:user.id})
                                    }
                                }
                            >
                                <ListItem.Chevron/>
                                <Avatar
                                    source={{
                                        uri: 'https://lh3.googleusercontent.com/fife/AAWUweV4mZ4uK1qoNx2QsZw7c-L82n27o4GNmJ4nHx7CNirp3ScgzPw_GZXXNRnopq9FRCU0CjhmargZAWlE96wydr4aDlCCk9MwF2o-ODH1_00GV8hGM7pHV-sJTalz6EFnKYzqZ1NkB8XLpdGEkg8MTiNmvDC2aHND9ALXxNXV2UesXYVBeyeHUKawyhvhepiEruccQlOS8Sd80P6JctGFmvNCagMC4XHvfzy_YFHEZCjkoSB_9tgy_DuIEWJzl9V9eDwLrgrHdT8jVPvaUOruBb5EpKbxPjWhHyUF784PPfN5ckUmuVDC8uz4x-BJF6MfOUHZyi1vCKIRE5LVQjpAi_eSi6h-yjQPRueRu11c-uog0suFMcr-K6K-r6-06UG1KG4naUt-F5ycLPuTotprTjgufLXSJBJJrde8zEcVzroBF4h5blKudUnY6M3jOTcD-fLUI2NPbB6Bn8jQkbKZpb8nOXWVZA4mT_sM5T1xKRJdgBcWd2gI4-UEzBBEzMbifoIR6D_PKD-JDr--Y9cX1zi8KxxEyi95v6kE2a6s5VLt3QdDmNnWg6A8FdR_wQ-4emgpuO2RR4QliDg-lSBeMBByDp6mxgJimUXX5i762mgzm05se_yOD2FvU__ZSwAk4q40twhsQceZBgyLM6B834jOPty8L2254GKyea-fHSid9VpnBNGa1DiZe2BFGaRfe6PL4NWwJTDnlJnhUgoESjB2BjOaNnn3QZtzRdP56rnXuuo=s192-c'
                                    }}
                                    rounded
                                />
                                <ListItem.Content>
                                    <ListItem.Title>{aluno.nome}</ListItem.Title>
                                    <ListItem.Subtitle>{aluno.sobrenome}-{aluno.curso}-{aluno.ira}</ListItem.Subtitle>
                                </ListItem.Content>
                            </ListItem>
                        )
                    }
                )
            }
        </ScrollView>
    )
}

export default ListadeAlunos