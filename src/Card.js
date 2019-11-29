import React from 'react';
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
import Logo from './QuikCardLogo.png';

class Card extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            view: 'buttons',
            recipient: '',
            isModalOpen: false
        }
    }

    openModal = async card => {
        await this.setState({isModalOpen: true})
    }

    handleChange = e => {
        return this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        const {card, sendCard} = this.props
        return (
            <Flex 
                justify='space-between' 
                wrap='wrap' 
                style={{
                    height: this.state.view === "buttons" ? '35vh' : '45vh', 
                    padding: '4%', 
                    borderRadius: '10px',
                    background: 'linear-gradient(#8EE4AF, #379683)',
                    width: '100%',
                    marginTop: '4vh',
                    marginBottom: '4vh'
                }}
                >
                <Modal isOpen={this.state.isModalOpen} onClose={async() => this.setState({isModalOpen: false})}>
                    <ModalOverlay />
                    <ModalContent>
                    <ModalHeader>Confirm Action</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        When you click 'Send Card', SendGrid will send a transactional
                        email to the recipient, no data is collected regarding this transaction.
                        You will not be able to re-add this card to your account again.
                        <FormControl style={{marginTop: '2vh'}} isRequired>
                            <FormLabel htmlFor="recipient">Recipient Email</FormLabel>
                            <Input onChange={this.handleChange} value={this.state.recipient} type='email' name='recipient' label='Recipient Email' />
                        </FormControl>
                    </ModalBody>
                    
                    <ModalFooter>
                        <Button variantColor="blue" mr={3} onClick={(e) => sendCard(e, card, this.state.recipient)}>
                            Send Card
                        </Button>
                        <Button variant="ghost"  onClick={async() => this.setState({isModalOpen: false})}>Close</Button>
                    </ModalFooter>
                    </ModalContent>
                </Modal>
                <Stack spacing={10}>
                    <Image
                        size="50px"
                        objectFit="cover"
                        style={{borderRadius: '10px'}}
                        src={Logo}
                        alt="card-logo"
                    />
                    <div>
                        <Heading size='sm' style={{textAlign: 'left'}}>{'Card Name'}</Heading>
                        <Heading size='lg' style={{textAlign: 'center'}}>{card.cardType}</Heading>
                    </div>
                </Stack>
                {this.state.view === 'buttons' ? 
                    <Stack spacing={5}>
                        <Button
                            bg="#05386B"
                            color="white"
                            _hover={{ color: "#379683", backgroundColor: "beige" }}
                            id="signin-button"
                            onClick={async() => {
                                await this.setState({view: 'info'}) 
                            }}
                        > Card Info </Button>
                        <Button
                            bg="#05386B"
                            color="white"
                            _hover={{ color: "#379683", backgroundColor: "beige" }}
                            id="signin-button"
                            onClick={async() => {
                                this.openModal(card)
                            }}
                        > Send Card </Button>
                    </Stack>
                    : 
                    <Stack spacing={3}>
                        <Button
                            bg="#05386B"
                            color="white"
                            _hover={{ color: "#379683", backgroundColor: "beige" }}
                            id="signin-button"
                            size="sm"
                            onClick={async() => await this.setState({view: 'buttons'}) }
                        > Return </Button>
                        <Text color="white">Card Number - {card.cardNumber}</Text>
                        <Text color="white">Expiration Date - {card.expDate}</Text>
                        <Text color="white">CVV/Security - {card.security}</Text>
                        <Text color="white">Details/Notes - {card.notes}</Text>
                    </Stack>
                }
            </Flex>
        )
    }
}

export default Card