import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import { UserSession } from 'blockstack'
import { appConfig, ME_FILENAME, CARDS_FILENAME } from './constants'
import AddCard from './AddCard'
import CardList from './CardList'
import NavBar from './NavBar'
import {withRouter} from 'react-router-dom'


class SignedIn extends Component {

  constructor(props) {
    super(props)
    this.userSession = new UserSession({ appConfig })
    this.state = {
      me: {},
      cards: {},
      savingMe: false,
      savingCards: false,
      savingData: false,
    }

    this.loadMe = this.loadMe.bind(this)
    this.saveMe = this.saveMe.bind(this)
    this.saveCards = this.saveCards.bind(this)
    this.signOut = this.signOut.bind(this)
  }

  async componentWillMount() {
    await this.loadMe()
    await this.loadCards()
    if(this.userSession.isUserSignedIn() && this.props.location.pathname === `/`) {
      this.props.history.push('/cards')
    }
  }

  loadMe() {
    const options = { decrypt: false }
    this.userSession.getFile(ME_FILENAME, options)
    .then(async (content) => {
      if(content) {
        const me = JSON.parse(content)
        this.setState({me})
      } else {
        const me = this.userSession.loadUserData().profile
        await this.setState({me})
        await this.saveMe(me)
      }
    })
  }

  loadCards() {
    const options = { decrypt: false }
    this.userSession.getFile(CARDS_FILENAME, options)
    .then(async (content) => {
      if(content) {
        const cards = JSON.parse(content)
        console.log(cards)
        this.setState({cards})
      } else {
        const cards = {
            count: 0,
            cards: [],
            blacklist: []
        }
        await this.setState({cards})
        await this.saveCards(cards)
      }
    })
  }

  saveMe(me) {
    this.setState({me, savingMe: true})
    const options = { encrypt: false }
    this.userSession.putFile(ME_FILENAME, JSON.stringify(me), options)
    .finally(() => {
      this.setState({savingMe: false})
    })
  }

  saveCards(cards) {
    this.setState({cards, savingCards: true})
    const options = { encrypt: false }
    this.userSession.putFile(CARDS_FILENAME, JSON.stringify(cards), options)
    .finally(() => {
      this.setState({savingCards: false})
    })
  }

  signOut(e) {
    e.preventDefault()
    this.userSession.signUserOut()
    window.location = '/'
  }

  render() {
    return (
      <div className="SignedIn">
      <Route
        path='/'
        render={
          routeProps => <NavBar
          type="navigation"
          userSession={this.userSession}
          signOut={this.signOut}
          {...routeProps} />
        }
      />
      <Switch>
              <Route
                path='/cards/new'
                render={
                  routeProps => <AddCard
                  type="addcard"
                  userSession={this.userSession}
                  saveCards={this.saveCards}
                  cards={this.state.cards}
                  signOut={this.signOut}
                  {...routeProps} />
                }
              />
              <Route
                path='/cards'
                render={
                  routeProps => <CardList
                  type="cardlist"
                  userSession={this.userSession}
                  saveCards={this.saveCards}
                  cards={this.state.cards}
                  me={this.state.me}
                  signOut={this.signOut}
                  {...routeProps} />
                }
              />
      </Switch>
      </div>
    );
  }
}

export default withRouter(SignedIn)