import React, {useState} from 'react';
import Logo from './QuikCardLogoText.png';
import './styles/style.css';
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    Button,
    Flex,
    Stack
} from "@chakra-ui/core";

function NavBar(props) {
    const [ isOpen, openClose ] = useState(false)
    const btnRef = React.useRef();

    const route = (e, route) => {
        e.preventDefault()
        props.history.push(route)
    }

    return (
        <nav className="navbar navbar-dark navbar-static-top app-nav">
            <a className="navbar-brand" href="https://blockstack.org">
                <img src={Logo} alt="" />
            </a>
            <Button ref={btnRef} bg="#05386B" color="white" onClick={() => openClose(!isOpen)}>
                Navigation
            </Button>
            <Drawer
                isOpen={isOpen}
                placement="right"
                onClose={() => openClose(!isOpen)}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent>
                <Flex justify="space-between" align="center" style={{paddingRight: '20px', marginBottom: '10vh'}}>
                    <DrawerHeader>Navigation</DrawerHeader>
                    <Button style={{width:'15%'}} variant="outline" onClick={() => openClose(!isOpen)}>
                        X
                    </Button>
                </Flex>
                <DrawerBody>
                    <Stack spacing={10}>
                        <Button bg="#05386B" _hover={{ color: "black", backgroundColor: 'white', border: '1px solid black' }} color="white" onClick={(e) => route(e, '/cards')}>
                            My Cards
                        </Button>
                        <Button bg="#05386B" _hover={{ color: "black", backgroundColor: 'white', border: '1px solid black' }} color="white" onClick={(e) => route(e, '/cards/new')}>
                            Add New Card
                        </Button>
                    </Stack>
                </DrawerBody>

                <DrawerFooter>
                    <Button _hover={{border: '1px solid black', color: 'black', backgroundColor: 'white'}} width="100%" bg="#5CDB95" variant="outline" mr={3} onClick={(e) => props.signOut(e)}>
                    Logout
                    </Button>
                </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </nav>
    );
}

export default NavBar;