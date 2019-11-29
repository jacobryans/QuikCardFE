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
    }

    sendCard = async (e, currentCard, recipient) => {
        console.log(currentCard, recipient)
        const msg = {
            "from":{
                "email":"from_email@example.com"
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
          axios.post('https://quikcard.herokuapp.com/email', JSON.stringify(msg));
          await this.setState({isModalOpen: false})
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

    render() {
        let cards = this.props.cards.cards
        return (
            <Container>
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