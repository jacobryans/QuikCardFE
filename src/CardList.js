import React from 'react';
import styled from 'styled-components';
import {
    Flex,
    Stack,
    Box,
    Heading,
    Text,
    Image,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl,
    FormLabel,
    Input
} from '@chakra-ui/core';
import { ToastContainer, toast } from 'react-toastify';
import Card from './Card';
import axios from 'axios';
import Logo from './QuikCardLogo.png';


const Container = styled.div`
    width: 60vw;
    margin: 5vh auto;
    min-height: 100vh;
`;

class CardList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            toast: '',
            toastType: ''
        }
    }

    sendCard = async (e, currentCard, recipient) => {
        console.log(currentCard, recipient)
        const msg = {
            "from":{
                "email":recipient
             },
            "personalizations": [
                {
                    "to": [
                        {"email": recipient}
                    ],
                    "dynamic_template_data":{
                        "username": this.props.me.name,
                        "cardType": currentCard.cardType,
                        "cardNumber": currentCard.cardNumber,
                        "expDate": currentCard.expDate,
                        "security": currentCard.security,
                        "balance": currentCard.balance,
                        "notes": currentCard.notes
                    }
                }
            ],
            "template_id":"d-622b2556bda745e0afb4437667771510"
          };
          axios.post('https://quikcard.herokuapp.com/email', JSON.stringify(msg))
          .then(async() => {
            await this.setState({isModalOpen: false})
            await this.setState({toast: 'You successfully added your card!', toastType: 'success'})
            await setTimeout(() => this.setState({toast: '', toastType: ''}), 5000)
          })
          let prevBlacklist = this.props.cards.blacklist
          let cardIdx = this.props.cards.cards.indexOf(currentCard)
          let prevCards = this.props.cards.cards
          prevCards.splice(cardIdx, 1)
          await this.props.saveCards({
            count: this.props.cards.count-1,
            cards: prevCards,
            blacklist: [...prevBlacklist, currentCard.cardNumber]
          })
    }

    makeToast = (desc, type) => {
        return toast(desc, {type: type, closeOnClick: true});
    }

    render() {
        let cards = this.props.cards.cards
        return (
            <Container>
                {this.state.toast && this.state.toastType ? (() => {
                    this.makeToast(this.state.toast, this.state.toastType)
                    return <ToastContainer />
                })()
                : null}
                <Flex wrap='wrap' align='space-between'>
                    {cards ? cards.map(card => {
                        return <Card sendCard={this.sendCard} card={card} />
                    })
                    :
                    null
                    }
                </Flex>
                {cards !== undefined ?
                    cards.length === 0 ?
                    <Flex justify='center'>
                        <Stack spacing={10}>
                            <Heading style={{textAlign: 'center'}}>You have no cards!</Heading>
                            <Heading size='md'>Click on 'Navigation', and then 'Add New Card' to add a new card.</Heading>
                        </Stack>
                    </Flex>
                : null : null}
            </Container>
        );
    }
}


export default CardList;