import {
    Container,
    Content,
    ImageLogo
} from './styles';
import logoSvg from '../../assets/icons/logo.svg';

export function Header() {
    return (
        <Container>
            <Content>
                <ImageLogo src={logoSvg} alt="StackX"/>
                <button>
                    <img src='https://github.com/renatoganske.png' />

                </button>
            </Content>
        </Container>

    );
}