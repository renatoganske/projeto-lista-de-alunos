import Modal from 'react-modal';
import { UserData } from '../../types';
import {
    Container,
    ImageUser,
    InfoUserContaier
} from './styles';
import { X } from 'phosphor-react';

interface UserInfoModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    selectedUser: UserData | undefined;
}

export function ModalInfo({ isOpen, onRequestClose, selectedUser }: UserInfoModalProps) {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={() => { }}
            overlayClassName="react-modal-overlay"
            className="react-modal-content"
            ariaHideApp={false}
            contentLabel="Informações do usuário selecionado"
        >
            <button type="button" onClick={onRequestClose} className="react-modal-close">
                <X size={24} color="#A8A8B3" weight="bold" />
            </button>
            <Container>
                <ImageUser>
                    <img src={selectedUser?.picture.medium} />
                </ImageUser>
                <InfoUserContaier>
                    <p><strong>Nome:</strong> {`${selectedUser?.name.first} ${selectedUser?.name.last}`}</p>
                    <p><strong>E-mail:</strong> {selectedUser?.email}</p>
                    <p><strong>Celular:</strong> {selectedUser?.cell}</p>
                    <p><strong>Idade:</strong> {selectedUser?.dob.age}</p>
                </InfoUserContaier>
            </Container>

        </Modal>
    );
}