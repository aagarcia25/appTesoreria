import React, {useEffect} from 'react';
import {Platform} from 'react-native';
import {PERMISSIONS, RESULTS, check, request} from 'react-native-permissions';
import {WebView} from 'react-native-webview';

const App = () => {
  useEffect(() => {
    const requestDownloadPermission = async () => {
      try {
        const permissions =
          Platform.OS === 'android'
            ? PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE
            : PERMISSIONS.IOS.PHOTO_LIBRARY;

        const permissionStatus = await request(permissions);
        if (permissionStatus === RESULTS.GRANTED) {
          console.log('Permiso de descarga concedido');
        } else {
          console.log('Permiso de descarga denegado');
        }
      } catch (error) {
        console.error('Error al solicitar permiso de descarga:', error);
      }
    };

    const checkDownloadPermission = async () => {
      try {
        const permissions =
          Platform.OS === 'android'
            ? PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE
            : PERMISSIONS.IOS.PHOTO_LIBRARY;

        const permissionStatus = await check(permissions);
        if (permissionStatus !== RESULTS.GRANTED) {
          requestDownloadPermission();
        } else {
          console.log('Permiso de descarga ya concedido');
        }
      } catch (error) {
        console.error('Error al verificar permiso de descarga:', error);
      }
    };

    checkDownloadPermission();
  }, []);

  return (
    <WebView
    style={{ flex: 1 }}
    source={{ uri: 'https://tesoreria-virtual.nl.gob.mx/' }}
    javaScriptEnabled={true}
    domStorageEnabled={true}
    allowFileAccess={true}
    mixedContentMode="always"
    originWhitelist={['*']}
    useWebKit={true} // Para iOS
    ignoreSslError={true} // Agrega esta línea para ignorar errores SSL
  />
  );
};

export default App;
