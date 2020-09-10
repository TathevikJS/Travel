import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './src/Navigation/Navigation';


class App extends React.Component {
  state = {
    cardsData: [],
    loading: false,
  }

  fetchData = async () => {
    this.setState({ loading: true })
    try {
      const fetchedData = await fetch('https://final-project-node-js.herokuapp.com/posts')
      const fetchedCards = await fetchedData.json()
      console.log(fetchedCards);
      this.setState({ cardsData: fetchedCards })
      this.setState({ loading: false })
    } catch (error) {
      console.log(error);
    }
  }

  componentDidMount() {
    this.fetchData()
  }

  render() {
    return (
      <NavigationContainer>
        <Navigation
          data={this.state.cardsData}
          loading={this.state.loading} />
      </NavigationContainer>
    )
  }
}

export default App