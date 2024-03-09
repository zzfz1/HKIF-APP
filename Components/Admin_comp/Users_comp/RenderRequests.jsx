import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Platform,
  FlatList,
} from 'react-native'
import React from 'react'
import RequestCard from './RequetCard'
import { useTheme } from '../../../Styles/theme'
import { useSelector } from 'react-redux'

const RenderRequests = () => {
  const userList = useSelector(state => state.user.data)
  const windowWidth = Dimensions.get('window').width
  const { theme } = useTheme()
  const styles = getStyles(theme, windowWidth)
  const filteredUsers = userList.filter(
    user =>
      user.membershipType == 'AWAITING_VERIFICATION_BASIC_MEMBERSHIP' ||
      user.membershipType == 'AWAITING_VERIFICATION_FULL_MEMBERSHIP'
  )

  return (
    <>
      <View style={styles.titleContainer}>
        <Text style={styles.header}>Pending Requests</Text>
        <Text style={styles.subHeader}>
          Approve the member's payment with Swish
        </Text>
      </View>
      {Platform.OS == 'web' ? (
        <View style={styles.container}>
          {filteredUsers.map((user, index) => (
            <RequestCard key={index} user={user} />
          ))}
        </View>
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={filteredUsers}
          renderItem={({ item, index }) => (
            <RequestCard key={index} user={item} />
          )}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.container}
        />
      )}
    </>
  )
}
const getStyles = (theme, windowWidth) => {
  const tabletPadding = windowWidth >= 720 ? 15 : 0
  const webWidth = windowWidth >= 900 ? '60%' : '85%'
  return StyleSheet.create({
    container: {
      width: '100%',
      backgroundColor: theme.colors.backgroundSecondary,
      alignItems: Platform.select({
        android: 'center',
        ios: 'center',
      }),
    },
    titleContainer: {
      /*     borderWidth: 2,
      borderColor: 'red', */
      width: Platform.select({
        ios: '90%',
        android: '90%',
        web: webWidth,
      }), // This ensures the titleContainer takes full width
      paddingHorizontal: tabletPadding, // This adds padding on the sides based on device width
      backgroundColor: theme.colors.backgroundSecondary,
      alignItems: 'flex-start', // This aligns children to the start along the cross axis
    },
    header: {
      fontFamily: 'Inter-Bold',
      fontSize: Platform.select({
        ios: 18,
        android: 16,
        web: 25,
      }),
      paddingBottom: 2,
      color: theme.colors.title,
    },
    subHeader: {
      fontFamily: 'Inter-Regular',
      fontSize: Platform.select({
        ios: 16,
        android: 14,
        web: 18,
      }),
      color: theme.colors.text,
      marginBottom: 8,
    },
  })
}

export default RenderRequests
