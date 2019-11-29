import React from 'react';
import {
    Stack,
    Input,
    FormControl,
    FormLabel,
    Button,
    InputLeftAddon,
    Textarea,
    InputGroup,
    Heading,
    Text
} from '@chakra-ui/core';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';

const Container = styled.div`
  width: 70vw;
  display: flex;
  flex-wrap: wrap;
  margin: 5vh auto;
  border-radius: 10px;
  text-align: center;
  background-color: #8EE4AF;
  padding: 5vh 4vw 5vh 4vw;
  justify-content: flex-start;
`;

const StyledForm = styled.form`
    width: 100%;
    padding: 2.5vh 0;
    text-align: left;
`;

export default class AddCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            card: {
                cardType: '',
                cardNumber: '',
                expDate: '',
                balance: '',
                security: '',
                notes: ''
            },
            toast: '',
            toastType: ''
        }
    }

    handleChange = e => {
        return this.setState({ card: {...this.state.card, [e.target.name]: e.target.value }})
    }
    
    handleSubmit = async e => {
        e.preventDefault()
        if(this.props.cards.blacklist.indexOf(this.state.card.cardNumber) !== -1) {
            await this.setState({toast: 'This card has already been sent', toastType: 'warning'})
            return
        }
        let prevCards = this.props.cards
        let newCard = this.state.card
        prevCards = {
            count: prevCards.count+1,
            cards: [
                ...prevCards.cards,
                newCard
            ],
            blacklist: [
                ...prevCards.blacklist
            ]
        }
        await this.props.saveCards(prevCards);
        this.props.history.push('/cards')
    }

    makeToast = (desc, type) => {
        return toast(desc, {type: type, closeOnClick: true});
    }

    render() {
        return (
            <Container>
                {this.state.toast && this.state.toastType ? (() => {
                    this.makeToast(this.state.toast, this.state.toastType)
                    return <ToastContainer />
                })()
                : null}
                <Heading size='lg' style={{width: '100%'}}>Add a new card</Heading>
                <Text style={{width: '100%', paddingTop: '10px'}} fontSize="sm">*Since card data can differ, only Card Type, Number, Expiration Date, and Balance are required.</Text>
                <StyledForm onSubmit={this.handleSubmit}>
                    <Stack spacing={5}>
                        <FormControl isRequired>
                            <FormLabel htmlFor="cardType">Card Type</FormLabel>
                            <Input onChange={this.handleChange} value={this.state.card.cardType} type='text' name='cardType' label='Card Type' />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel htmlFor="cardNumber">Card Number</FormLabel>
                            <Input onChange={this.handleChange} value={this.state.card.cardNumber} type='password' name='cardNumber' label='Card Number' />  
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel htmlFor="expDate">Expiration Date</FormLabel>
                            <Input onChange={this.handleChange} value={this.state.card.expDate} type='text' name='expDate' label='Expiration Date' />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel htmlFor="balance">Balance</FormLabel>
                            <InputGroup>
                                <InputLeftAddon children={'$'} />
                                <Input onChange={this.handleChange} value={this.state.card.balance} type='text' name='balance' label='Balance' />
                            </InputGroup>
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="security">CVV/Security Code</FormLabel>
                            <Input onChange={this.handleChange} value={this.state.card.security} type='password' name='security' label='CVV/Security Code' />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="notes">Other Notes</FormLabel>
                            <Textarea onChange={this.handleChange} value={this.state.card.notes} type='text' name='notes' label='Other Notes' /> 
                        </FormControl>
                        <p className="lead">
                            <Button
                                bg="#379683"
                                _hover={{ color: "#379683", backgroundColor: "beige" }}
                                id="signin-button"
                                onClick={ this.handleSubmit }
                            >
                                Add New Card
                            </Button>
                        </p>
                    </Stack>
                </StyledForm>         
            </Container>
        )
    }
}