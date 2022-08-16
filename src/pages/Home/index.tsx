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
import { ModalInfo } from '../../components/ModalInfo';

export function Home() {
    const [dataFetching, setDataFetching] = useState<UserData[]>([]);
    const [dataFetchingBackup, setDataFetchingBackup] = useState<UserData[]>([]);
    const [isFetching, setIsFetching] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState('');
    const [isModalInfoOpen, setIsModalInfoOpen] = useState(false);
    const [dataUser, setDataUser] = useState<UserData>();
    const [searchCountry, setSearchCountry] = useState('');

    function handleOpenModalInfo(selectedUser: UserData) {
        setDataUser(selectedUser);
        setIsModalInfoOpen(true);
    }

    function handleCloseModalInfo() {
        setIsModalInfoOpen(false);
    }

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
                setError(error);
            })
            .finally(() => {
                setIsFetching(false);
            })
    }, []);

    //     useEffect(() => {
    //        if (search.length > 0) {
    //            const filter = dataFetching.filter(a =>
    //                a.name.first.toLowerCase().indexOf(search.toLowerCase()) >= 0 ||
    //                a.name.last.toLowerCase().indexOf(search.toLowerCase()) >= 0 
    //            )
    //            setDataFetching(filter)
    //        } else {
    //         setDataFetching(dataFetchingBackup)
    //        }
    //    },[search])

    //     useEffect(() => {
    //        if (search.length > 0) {
    //            const filter = dataFetching.filter(a =>
    //                a.name.first.toLowerCase().indexOf(search.toLowerCase()) >= 0 ||
    //                a.name.last.toLowerCase().indexOf(search.toLowerCase()) >= 0 
    //            )
    //            setDataFetching(filter)
    //        } else {
    //         setDataFetching(dataFetchingBackup)
    //        }
    //    },[search])


    const filteredName = search.length > 0
        ? dataFetching.filter(a => (a.name.first.toUpperCase() || a.name.last.toUpperCase()).includes(search.toUpperCase()))
        : [];

    const filteredCountry = searchCountry.length > 0
        ? dataFetching.filter(a => a.location.country.toUpperCase().includes(searchCountry.toUpperCase()))
        : [];

    const actuallyFilter = search.length > 0 ? filteredName : filteredCountry;

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
                                        searchCountry.length > 0 || search.length > 0 ? (
                                            actuallyFilter.map((e, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{`${e.name.first} ${e.name.last}`}</td>
                                                        <td>{e.gender}</td>
                                                        <td>{e.location.country}</td>
                                                        <td>
                                                            <button onClick={() => handleOpenModalInfo(e)}>Visualizar</button>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        ) : (
                                            dataFetching.map((e, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{`${e.name.first} ${e.name.last}`}</td>
                                                        <td>{e.gender}</td>
                                                        <td>{e.location.country}</td>
                                                        <td>
                                                            <button onClick={() => handleOpenModalInfo(e)}>Visualizar</button>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        )
                                    }
                                    {
                                        /*
                                        {dataFetching.map((item, index) => (
                                        <tr key={index}>
                                            <td>{ `${item.name.first} ${item.name.last}`}</td>
                                            <td>{ item.gender}</td>
                                            <td>{item.nat}</td>
                                        <td><button onClick={()=> handleOpenModalInfo(item)}>visualizar</button></td>
                                    </tr> 
                                        ))}
                                        */
                                    }


                                </tbody>
                            </TableContent>
                        </>
                    )}
            </Content>
            <ModalInfo
                isOpen={isModalInfoOpen}
                onRequestClose={handleCloseModalInfo}
                selectedUser={dataUser}

            />
        </Container>
    );
}