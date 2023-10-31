import { View, Text, Pressable, StyleSheet } from 'react-native'
import { useTheme } from '../../Styles/theme'

function PrimaryButton({
  children,
  onPress,
  paddingVertical,
  paddingHorizontal,
  onLongPress,
}) {
  const { theme } = useTheme()
  const styles = getStyles(theme, paddingVertical, paddingHorizontal)
  return (
    <View style={styles.buttonOuterContainer}>
      <Pressable
        style={({ pressed }) =>
          pressed
            ? [styles.buttonInnerContainer, styles.pressed]
            : styles.buttonInnerContainer
        }
        onPress={onPress}
        onLongPress={onLongPress}
        android_ripple={{ color: theme.colors.primary }}
      >
        <Text style={styles.buttonText}>{children}</Text>
      </Pressable>
    </View>
  )
}

const getStyles = (theme, paddingHorizontal, paddingVertical) => {
  return StyleSheet.create({
    buttonOuterContainer: {
      borderRadius: 28,
      overflow: 'hidden',
    },
    buttonInnerContainer: {
      backgroundColor: theme.colors.primary,
      paddingVertical: paddingVertical,
      paddingHorizontal: paddingHorizontal,
      elevation: 2,
    },
    buttonText: {
      fontFamily: 'Inter-SemiBold',
      color: theme.colors.accentWhite,
      textAlign: 'center',
    },
    pressed: {
      opacity: 0.75,
    },
  })
}

export default PrimaryButton
