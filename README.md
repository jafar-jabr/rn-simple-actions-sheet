# rn-simple-actions-sheet

simple actions sheets for react-native

## Installation

```sh
npm install rn-simple-actions-sheet
```

## Usage

```js
import ActionsSheet from 'rn-simple-actions-sheet';

// ...

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
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

License
(MIT License)

Copyright © 2022-2023 Jafar Jabr

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
