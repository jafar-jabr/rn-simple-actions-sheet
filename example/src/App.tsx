import * as React from 'react';

import { StyleSheet, View, Text, Button } from 'react-native';
import ActionsSheet from 'rn-simple-actions-sheet';
import { useState } from 'react';

export default function App() {
  const [isOpened, setIsOpen] = useState(false);
  const toggleSheet = () => {
    setIsOpen((prevState) => !prevState);
  };
  const options = [
    {
      title: 'Option1',
      action: () => {
        console.warn('option 1');
        toggleSheet();
      },
    },
    {
      title: 'Option2',
      action: () => {
        console.warn('option 2');
        toggleSheet();
      },
    },
    {
      title: 'Cancel',
      action: () => {
        console.warn('cancel');
        toggleSheet();
      },
    },
  ];

  return (
    <View style={styles.container}>
      <Button title="toggleSheet" onPress={toggleSheet} />
      <ActionsSheet
        isVisible={isOpened}
        title={<Text style={styles.title}>Title goes here </Text>}
        message={<Text style={styles.title}>Message goes here if needed</Text>}
        options={options}
        cancelButtonIndex={options.length - 1}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {},
  box: {
    backgroundColor: '#e87b7b',
    flex: 1,
    width: 360,
    height: 460,
    marginVertical: 20,
  },
});
