import * as React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
} from 'react-native';
import { CharHeader } from '../components/CharHeader';
import SkillBar from '../components/SkillBar';
import Api from '../utils/api';

export interface CharacterObject {
    name: string,
    image: string,
    strength: number,
    defense: number,
    agility: number,
    intelligence: number,
}

interface CharacterState {
    character: CharacterObject,
}

export interface CharacterProps {
  navigation: any
}

export default class Character extends React.Component<CharacterProps, CharacterState> {
  static navigationOptions = {
    title: 'Character Status'
  };

  constructor(props) {
      super(props);
      this.state = {
          character:
              {
                  name: "",
                  image: "",
                  strength: 0,
                  defense: 0,
                  agility: 0,
                  intelligence: 0
              }
      }
  }

  componentDidMount(): void {
    const { token } = this.props.navigation.getParam("data");
    Api.request("character", token).then((character: CharacterObject) => {
        this.setState({character});
    }).catch((error) => {
        console.error(error);
    });
  }

  render(): React.ReactNode {
    const { character } = this.state;
    return (
      <View style={styles.container}>
        <CharHeader
          name={character.name}
          image={character.image}
        />
        <View style={styles.skillsContainer}>
          <View style={styles.skillsTitle}>
            <Text style={styles.skillsTitleText}>
              {'Skills'}
            </Text>
          </View>
          <View style={styles.skillsContentBox}>
            <ScrollView
              style={styles.skillScroll}
              contentContainerStyle={styles.skillScrollContent}
            >
              <View style={styles.skill}>
                <SkillBar
                  label="Strength"
                  value={character.strength}
                  color="#e53935"
                />
              </View>
              <View style={styles.skill}>
                <SkillBar
                  label="Defense"
                  value={character.defense}
                  color="#1E88E5"
                />
              </View>
              <View style={styles.skill}>
                <SkillBar
                  label="Agility"
                  value={character.agility}
                  color="#FDD835"
                />
              </View>
              <View style={styles.skill}>
                <SkillBar
                  label="Intelligence"
                  value={character.intelligence}
                  color="#FB8C00"
                />
              </View>
            </ScrollView>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  skillsContainer: {
    flex: 2,
    margin: 10,
    borderWidth: 2,
    borderColor: '#ddd',
  },
  skillsTitle: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  skillsTitleText: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center',
    padding: 10,
  },
  skillsContentBox: { flex: 10 },
  skillScroll: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 20,
    borderColor: '#ddd',
  },
  skillScrollContent: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignContent: 'space-around',
  },
  skill: {
    minWidth: 100,
    borderColor: '#ddd',
    alignItems: 'flex-start',
  },
  skillName: {
    color: '#ddd'
  },
});
