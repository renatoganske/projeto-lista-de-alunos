import { Header } from '../../components/Header';
import { 
    Container,
    Content,
    FilterForm
 } from './styles'

export function Home() {
    return (
        <Container>
            <Header />
            <Content>
                <h1>Lista dos alunos do curso</h1>
                <FilterForm>
                    <div>
                        <label htmlFor="nome">Pesquisar</label>
                        <input type="text" id="aluno" placeholder='Nome do Aluno'/>
                    </div>
                    <div>
                        <label htmlFor="nacionalidade">Nacionalidade</label>
                        <select name="" id="nacionalidade">
                            <option value="">Todas</option>
                        </select>

                    </div>
                </FilterForm>
            </Content>
        </Container>
    )
}