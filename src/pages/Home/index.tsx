import { useEffect, useState } from 'react';
import axios from 'axios';
import ReactLoading from 'react-loading';
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
    const [dataFetchingBackup, setDataFetchingBackup] = useState<UserData[]>([]);
    const [isFetching, setIsFetching] = useState(true);
    const [erro, serError] = useState(null);
    const [search, setSearch] = useState('');
    const [searchCountry, setSearchCountry] = useState('');

    useEffect(() => {
        axios.get('https://randomuser.me/api/', {
            params: {
                results: 10
            }
        })
            .then(response => {
                setDataFetching(response.data.results);
                setDataFetchingBackup(response.data.results);
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => {
                setIsFetching(false);
            })
    }, []);

    useEffect(() => {
        if (search.length !== 0) {
            const filter = dataFetching.filter(f =>
                f.name.first.toUpperCase().indexOf(search.toLocaleUpperCase()) >= 0 ||
                f.name.last.toUpperCase().indexOf(search.toLocaleUpperCase()) >= 0
            );
            setDataFetching(filter);
        } else {
            setDataFetching(dataFetchingBackup);
        }
    }, [search]);

    useEffect(() => {
        if (searchCountry !== '') {
            const filterCountry = dataFetching.filter(f => f.location.country.toUpperCase().indexOf(searchCountry.toUpperCase()));
            setDataFetching(filterCountry);

        } else {
            setDataFetching(dataFetchingBackup);
        }
    }, [searchCountry]);

    return (
        <Container>
            <Header />
            <Content>
                <h1>Lista dos alunos do curso</h1>
                {
                    isFetching ? (
                        <ReactLoading type="spin" color="#FFF" />
                    ) : (
                        <>
                            <FilterForm>
                                <div>
                                    <label htmlFor="nome">Pesquisar</label>
                                    <input
                                        type="text"
                                        id="aluno"
                                        placeholder='Nome do Aluno'
                                        onChange={(e) => setSearch(e.target.value)} />
                                </div>
                                <div>
                                    <label htmlFor="nacionalidade">Nacionalidade</label>
                                    <select
                                        name=""
                                        id="nacionalidade"
                                        onChange={(e) => setSearchCountry(e.target.value)}
                                        value={searchCountry}
                                    >
                                        <option value="">Todas</option>
                                        {
                                            dataFetching.map((e, index) => {
                                                return (
                                                    <option key={index} value={e.location.country}>
                                                        {e.location.country}
                                                    </option>
                                                )
                                            })
                                        }
                                    </select>

                                </div>
                            </FilterForm >
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
                        </>
                    )
                }
            </Content >
        </Container >
    )
}