import React, { Component } from 'react';
import { UserSession } from 'blockstack'
import { appConfig } from './constants'
import { Heading, Stack, Button, Box, Modal, ModalBody, ModalContent, ModalOverlay, ModalHeader, ModalCloseButton, ModalFooter } from '@chakra-ui/core';
import styled from 'styled-components';

const Container = styled.div`
  width: 60vw;
  display: flex;
  margin: 2vh auto;
  justify-content: center;
  text-align: center;
`;

export default class Signin extends Component {

  constructor() {
    super()
    this.userSession = new UserSession({ appConfig })
    this.state = {
      isModalOpen: false
    }
  }

  signIn(e) {
    e.preventDefault()
    this.userSession.redirectToSignIn()
  }

  render() {
    return (
      <Container>
        <Modal size='xl' isOpen={this.state.isModalOpen} onClose={async() => this.setState({isModalOpen: false})}>
          <ModalOverlay />
          <ModalContent>
          <ModalHeader>Terms Of Service</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
              There are a few things to note before you use QuikCard. <br/> <br/>
              - QuikCard does not confirm if funds are on cards, or if cards are valid. <br/>
              - QuikCard uses transactional emails that are auto-deleted to send gift cards. <br/>
              - If you send a card, tell the recipient to check their spam inbox if they cannot find it. <br/>
              - When viewing your cards, clicking the info button will display sensitive card info on your screen, keep this in mind. <br/>
              - QuikCard shouldn't be used to distribute/sell gift cards. <br/>
              - Once you send a card, you cannot add it back to your account. <br/>
              - All of your card data is secured within BlockStack's Gaia storage, and not stored by QuikCard. <br/>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost"  onClick={async() => this.setState({isModalOpen: false})}>Close</Button>
          </ModalFooter>
          </ModalContent>
        </Modal>
        <Stack spacing={20}>
          <Heading>Welcome to QuikCard!</Heading>
          <Box p={10} shadow="md" borderWidth="1px" bg="#05386B" color="#EDF5E1" rounded="md">
            <Heading style={{marginBottom: '5vh'}} size="lg">Please Read the TOS before continuing</Heading>
            <p className="lead">
              <Button
                bg="#379683"
                _hover={{ color: "#379683", backgroundColor: "beige" }}
                id="signin-button"
                onClick={async() => await this.setState({isModalOpen: true})}
              >
                TOS
              </Button>
            </p>
          </Box>
          <Box p={5} shadow="md" borderWidth="1px" bg="#05386B" color="#EDF5E1" rounded="md">
            <Heading style={{marginBottom: '5vh'}} size="lg">Authenticate</Heading>
            <p className="lead">
              <Button
                bg="#379683"
                _hover={{ color: "#379683", backgroundColor: "beige" }}
                id="signin-button"
                onClick={ this.signIn.bind(this) }
              >
                Sign In with Blockstack
              </Button>
            </p>
          </Box>
        </Stack>
      </Container>
    );
  }
}
