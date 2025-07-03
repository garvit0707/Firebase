import React from 'react';
import { View, Text, Button } from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import { NativeModules } from 'react-native';

const PdfViewer = () => {
  const handleButton = async () => {
    const htmlContent = `<h1 style="text-align:center;">Invoice</h1>
            <p>Invoice Number: INV123</p>
            <p>Date: ${new Date().toLocaleDateString()}</p>
            <table border="1" style="width:100%;border-collapse:collapse;">
                <tr><th>Item</th><th>Quantity</th><th>Price</th></tr>
                <tr><td>Product A</td><td>2</td><td>$40</td></tr>
        <tr><td>Product B</td><td>1</td><td>$30</td></tr>
      </table>
      <h3 style="text-align:right;">Total: $70</h3>`;

    let options = {
      html: htmlContent,    
      filename: 'testing',
      directory: 'Documents',
    };
    console.log('clicked pdf generation button');

    let file = await RNHTMLtoPDF.convert(options);
    console.log('file path is', file.filePath);

    NativeModules.NotificationModule.showNotification(
      'PDF Downloaded',
      'Your PDF has been saved successfully.',
    );
  };

  return (
    <View>
      <Text>this is the pdf view component</Text>
      <Button title="Generate PDf File" onPress={handleButton}></Button>
    </View>
  );
};

export default PdfViewer;

// import React from 'react';
// import { View, Button, Alert, PermissionsAndroid, Platform } from 'react-native';
// import RNHTMLtoPDF from 'react-native-html-to-pdf';

// const PdfViewer = () => {
//   const createPDF = async () => {
//     // Request permission dynamically on Android
//     console.log("pdf is generated on click")
//     if (Platform.OS === 'android') {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
//         {
//           title: 'Storage Permission Required',
//           message: 'This app needs access to your storage to save the invoice PDF.',
//           buttonPositive: 'OK',
//         },
//       );
//       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//         Alert.alert('Storage permission granted');
//         return;
//       }
//       else{
//         Alert.alert('Permission denied', 'Cannot create PDF without storage permission.');
//       }
//     }

//     const htmlContent = `
//       <h1 style="text-align:center;">Invoice</h1>
//       <p>Invoice Number: INV123</p>
//       <p>Date: ${new Date().toLocaleDateString()}</p>
//       <table border="1" style="width:100%;border-collapse:collapse;">
//         <tr><th>Item</th><th>Quantity</th><th>Price</th></tr>
//         <tr><td>Product A</td><td>2</td><td>$40</td></tr>
//         <tr><td>Product B</td><td>1</td><td>$30</td></tr>
//       </table>
//       <h3 style="text-align:right;">Total: $70</h3>
//     `;

//     try {
//       const options = {
//         html: htmlContent,
//         fileName: `Invoice_${Date.now()}`,
//         directory: 'Download', // will create file in device's Download folder
//       };

//       const file = await RNHTMLtoPDF.convert(options);
//       console.log('PDF saved to:', file.filePath);

//       Alert.alert('Success', `PDF generated at:\n${file.filePath}`);
//     } catch (error) {
//       console.error('Error creating PDF:', error);
//       Alert.alert('Error', 'Could not generate PDF');
//     }

//     const hasPermission = await requestStoragePermission();
//     if (!hasPermission){
//         console.log("permission access denied")
//     };
//   }

//   return (
//     <View style={{  justifyContent: 'center' }}>
//       <Button title="Generate Invoice PDF" onPress={createPDF} />
//     </View>
//   );
// };

// export default PdfViewer;
