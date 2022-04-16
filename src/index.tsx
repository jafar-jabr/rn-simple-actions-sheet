import React, {
  FC,
  isValidElement,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Text,
  View,
  Dimensions,
  Modal,
  TouchableHighlight,
  Animated,
  ScrollView,
  Easing,
} from 'react-native';
import defaultStyle from './styles';

const isset = (prop: any) => {
  return typeof prop !== 'undefined';
};

const WARN_COLOR = '#FF3B30';
const MAX_HEIGHT = Dimensions.get('window').height * 0.7;

type propTypes = {
  isVisible: boolean;
  tintColor?: string;
  buttonUnderlayColor?: string;
  styles?: any;
  title: any;
  message?: any;
  cancelButtonIndex?: number;
  destructiveButtonIndex?: number;
  options: {
    title: string;
    action: () => void;
  }[];
};

const ActionSheet: FC<propTypes> = ({
  isVisible,
  title,
  message,
  cancelButtonIndex,
  options,
  styles,
  destructiveButtonIndex,
  buttonUnderlayColor,
  tintColor,
}): JSX.Element => {
  const [scrollEnabled, setScrollEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const propsStyles: any = useMemo(() => {
    const obj = {};
    Object.keys(defaultStyle).forEach((key) => {
      const arr = [defaultStyle[key as keyof typeof defaultStyle]];
      if (styles[key]) {
        arr.push(styles[key]);
      }
      obj[key as keyof typeof obj] = arr as never;
    });
    return obj;
  }, [styles]);

  const RenderTitle = memo(() => {
    if (!title) return null;
    return (
      <View style={propsStyles.titleBox}>
        {isValidElement(title) ? (
          title
        ) : (
          <Text style={propsStyles.titleText}>{title}</Text>
        )}
      </View>
    );
  });

  const RenderMessage = memo(() => {
    if (!message) return null;
    return (
      <View style={propsStyles.messageBox}>
        {isValidElement(message) ? (
          message
        ) : (
          <Text style={propsStyles.messageText}>{message}</Text>
        )}
      </View>
    );
  });

  const calculateHeight = useMemo(() => {
    const getHeight = (name: string) => {
      const styleOf = propsStyles[name as keyof typeof propsStyles];
      const pos = styleOf ? (styleOf as any).length - 1 : 0;
      const style: any = styleOf ? styleOf[pos] : {};
      let h = 0;
      ['height', 'marginTop', 'marginBottom'].forEach((attrName) => {
        if (typeof style[attrName] !== 'undefined') {
          h += style[attrName];
        }
      });
      return h;
    };
    let height = 0;
    if (title) height += getHeight('titleBox');
    if (message) height += getHeight('messageBox');
    if (isset(cancelButtonIndex)) {
      height += getHeight('cancelButtonBox');
      height += (options.length - 1) * getHeight('buttonBox');
    } else {
      height += options.length * getHeight('buttonBox');
    }
    if (height > MAX_HEIGHT) {
      setScrollEnabled(true);
      height = MAX_HEIGHT;
    } else {
      setScrollEnabled(false);
    }
    return height;
  }, [cancelButtonIndex, message, options.length, propsStyles, title]);
  const translateY = useMemo(() => calculateHeight, [calculateHeight]);
  const sheetAnim = useRef(new Animated.Value(translateY)).current;

  const showSheet = useCallback(() => {
    Animated.timing(sheetAnim, {
      useNativeDriver: false,
      toValue: 0,
      duration: 250,
      easing: Easing.out(Easing.ease),
    }).start();
  }, [sheetAnim]);

  const hideSheet = useCallback(
    (callback: () => void) => {
      Animated.timing(sheetAnim, {
        toValue: translateY,
        duration: 200,
        useNativeDriver: false,
      }).start(callback);
    },
    [sheetAnim, translateY]
  );

  const hide = useCallback(
    (callback: any = null) => {
      hideSheet(() => {
        setVisible(false);
        if (typeof callback === 'function') {
          callback();
        }
      });
    },
    [hideSheet]
  );

  const show = useCallback(() => {
    setVisible(true);
    showSheet();
  }, [showSheet]);

  useEffect(() => {
    if (isVisible) {
      show();
    } else {
      hide();
    }
  }, [hide, isVisible, show]);

  const cancel = () => {
    setVisible(false);
    if (isset(cancelButtonIndex)) {
      const index: any = cancelButtonIndex;
      const { action } = options[index] ?? {};
      hide(action);
    }
  };

  const createButton = (
    { title: btnTitle, action: btnAction }: any,
    index: number
  ) => {
    const fontColor = destructiveButtonIndex === index ? WARN_COLOR : tintColor;
    const buttonBoxStyle =
      cancelButtonIndex === index
        ? propsStyles.cancelButtonBox
        : propsStyles.buttonBox;
    return (
      <TouchableHighlight
        key={index}
        activeOpacity={1}
        underlayColor={buttonUnderlayColor}
        style={buttonBoxStyle}
        onPress={() => hide(btnAction)}
      >
        <Text style={[propsStyles.buttonText, { color: fontColor }]}>
          {btnTitle}
        </Text>
      </TouchableHighlight>
    );
  };

  const RenderCancelButton = memo(() => {
    if (!isset(cancelButtonIndex)) return null;
    const index: any = cancelButtonIndex;
    return createButton(options[index], index);
  });

  const RenderOptions = memo<any>(() => {
    return options.map((btn: any, index: number) => {
      return cancelButtonIndex === index ? null : createButton(btn, index);
    });
  });
  return (
    <Modal
      visible={visible}
      animationType="none"
      transparent
      onRequestClose={cancel}
    >
      <View style={[propsStyles.wrapper]}>
        <Text style={[propsStyles.overlay]} onPress={cancel} />
        <Animated.View
          style={[
            propsStyles.body,
            { height: translateY, transform: [{ translateY: sheetAnim }] },
          ]}
        >
          <RenderTitle />
          <RenderMessage />
          <ScrollView scrollEnabled={scrollEnabled}>
            <RenderOptions />
          </ScrollView>
          <RenderCancelButton />
        </Animated.View>
      </View>
    </Modal>
  );
};

ActionSheet.defaultProps = {
  tintColor: '#007AFF',
  buttonUnderlayColor: '#F4F4F4',
  styles: {},
  destructiveButtonIndex: undefined,
  cancelButtonIndex: 0,
  message: '',
};

const propsAreEqual = (prevProps: propTypes, nextProps: propTypes) => {
  return prevProps.isVisible === nextProps.isVisible;
};
export default memo(ActionSheet, propsAreEqual);
