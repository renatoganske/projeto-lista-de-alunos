import { useEffect, useState } from 'react';
import axios from 'axios';
import { Header } from '../../components/Header';
import {
    Container,
    Content,
    FilterForm,
    TableContent
} from './styles';
import { UserData } from '../../types';

export function Home() {
    const [dataFetching, setDataFetching] = useState<UserData[]>([]);

    useEffect(() => {
        axios.get('https://randomuser.me/api/', {
            params: {
                results: 10
            }
        })
            .then(response => {
                console.log(response);
                setDataFetching(response.data.results);
            })
            .catch(error => {
                console.log(error)
            })
    }, []);
    return (
        <Container>
            <Header />
            <Content>
                <h1>Lista dos alunos do curso</h1>
                <FilterForm>
                    <div>
                        <label htmlFor="nome">Pesquisar</label>
                        <input type="text" id="aluno" placeholder='Nome do Aluno' />
                    </div>
                    <div>
                        <label htmlFor="nacionalidade">Nacionalidade</label>
                        <select name="" id="nacionalidade">
                            <option value="">Todas</option>
                        </select>

                    </div>
                </FilterForm>
                <TableContent>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Sexo</th>
                            <th>Nacionalidade</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            dataFetching.map((e, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{`${e.name.first} ${e.name.last}`}</td>
                                        <td>{e.gender}</td>
                                        <td>{e.nat}</td>
                                        <td>
                                            <button>Visualizar</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </TableContent>
            </Content>
        </Container>
    )
}