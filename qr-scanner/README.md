<h1 align="center">Qr Scanner</h1>
<p align="center">This library was designed to register callbacks to Qr Scanner/Barcode Scanner with a single library.</p>

<p align="center">
  <img src="https://badgen.net/npm/v/@rebase-team/qr-scanner"/> 
  <img src="https://badgen.net/npm/dt/@rebase-team/qr-scanner"/>
  <img src="https://badgen.net/npm/license/@rebase-team/qr-scanner"/>
  <img src="https://badgen.net/npm/types/@rebase-team/qr-scanner"/>
  <img src="https://badgen.net/badge/author/MurylloEx/red?icon=label"/>
</p>

You will need (>= Angular 9) to use this library, Ionic project (>= v3), qrscanner cordova plugin and the phonegap barcode scanner plugin.

## Installation

```sh
ionic cordova plugin add cordova-plugin-qrscanner
ionic cordova plugin add phonegap-plugin-barcodescanner
npm install @ionic-native/qr-scanner
npm install @ionic-native/barcode-scanner
npm install @rebase-team/qr-scanner
```

## Usage examples

``> APP.MODULE.TS``
```typescript
import { AppComponent } from "./app.component";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { BrowserModule } from "@angular/platform-browser";
import { QrScannerService } from "@rebase-team/qr-scanner";
import { QRScanner } from '@ionic-native/qr-scanner/ngx';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@NgModule({
  declarations: [AppComponent, UpdateVersionComponent, WelcomeComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    QRScanner,
    BarcodeScanner,
    QrScannerService
  ],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule { }
```

``> HOME.PAGE.TS``
```typescript
import { Component } from "@angular/core";
import { QrScannerService } from "@rebase-team/qr-scanner";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage {

  constructor(private qrScanner: QrScannerService) {
    this.qrScanner.DefinePlugin('QRSCANNER'); //Define the plugin name (QRSCANNER or BARCODESCANNER).
    this.qrScanner.OnScannedData(async (qrData) => {
      console.log(qrData); //Will print the scanned data.
      this.qrScanner.Close();
    });
    this.qrScanner.OnPermissionError(() => {	
      console.log('Não foi possível abrir a câmera para ler o QR-Code pois a permissão não foi habilitada.');	
    });	
    this.qrScanner.OnUnknownError((err) => {	
      console.log('Um problema ocorreu ao tentar abrir a câmera do celular para realizar a leitura do QR-Code.');
    });
    this.qrScanner.Scan();
  }

}
```

## Metadata

Muryllo Pimenta de Oliveira – muryllo.pimenta@upe.br

Distribuído sobre a licença MIT. Veja ``LICENSE`` para mais informações.

## Contributing

1. Fork it (<https://github.com/MurylloEx/Qr-Scanner/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request

