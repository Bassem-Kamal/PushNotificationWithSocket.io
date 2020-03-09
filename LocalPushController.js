import PushNotification from 'react-native-push-notification'


PushNotification.configure({
  popInitialNotification: true,
  requestPermissions: true,

  ///// doesn't called !!!!?????????>>>>>
  onRegister: function (token) {
    console.log('in app registration', token);
  },
  // (required) Called when a remote or local notification is opened or received
  onNotification: function (notification) {
    console.log('LOCAL NOTIFICATION ==>', notification)
  }

});


export const LocalNotification = (textMessage) => {
  PushNotification.re({
    autoCancel: true,
    bigText: 'This is local notification demo ',
    subText: 'Local Notification Demo',
    title: 'Local Notification Title',
    message: textMessage,
    vibrate: true,
    vibration: 300,
    playSound: true,
    soundName: 'default'
  })
}