import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import { PERMISSIONS, RESULTS, check, request } from 'react-native-permissions';
import InAppBrowser from 'react-native-inappbrowser-reborn';

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

   const openBrowser = async () => {
     try {
       const options = {
         showTitle: false,
         enableUrlBarHiding: true,
         toolbarColor: 'transparent',
       };

       await InAppBrowser.open('https://tesoreria-virtual.nl.gob.mx', options);
     } catch (error) {
       console.error('Error al abrir el navegador interno:', error);
     }
   };


    const sslPinningScript = `
      setTimeout(() => {
        // Aquí puedes realizar la lógica de SSL Pinning
        // Comprueba si el certificado recibido es el esperado
        // Si no coincide, puedes cerrar el navegador o realizar alguna acción
      }, 0);
    `;

    checkDownloadPermission();
    openBrowser();
  }, []);

  return null; // No necesitas renderizar nada ya que el navegador se abre en segundo plano
};

export default App;
