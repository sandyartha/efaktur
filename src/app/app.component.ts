import { Component } from '@angular/core';

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

class Product{
  name: string;
  price: number;
  qty: number;
  disc: number;
}
class Invoice{
  customerName: string;
  address: string;
  contactNo: number;
  email: string;
  
  products: Product[] = [];
  additionalDetails: string;

  constructor(){
    // Initially one empty product row we will show 
    this.products.push(new Product());
  }
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  invoice = new Invoice(); 
  
  generatePDF(action = 'open') {
    let docDefinition = {
      content: [
        {
          text: 'PT. WARUNG PAKDE CORP, Tbk.',
          fontSize: 16,
          alignment: 'center',
          color: '#047886'
        },
        {
          text: 'INVOICE',
          fontSize: 20,
          bold: true,
          alignment: 'center',
          decoration: 'underline',
          color: 'green'
        },
        {
          text: 'Kepada Yth,',
          style: 'sectionHeader'
        },
        {
          columns: [
            [
              {
                text: this.invoice.customerName,
                bold:true
              },
              { text: this.invoice.address },
              { text: this.invoice.email },
              { text: this.invoice.contactNo }
            ],
            [
              {
                text: `Date: ${new Date().toLocaleString()}`,
                alignment: 'right'
              },
              { 
                text: `Bill No : ${((Math.random() *1000).toFixed(0))}`,
                alignment: 'right'
              }
            ]
          ]
        },
        {
          text: 'Detail Pemesanan',
          style: 'sectionHeader'
        },
        {
          table: {
            headerRows: 1,
            widths: ['*', 'auto', 'auto', 'auto'],
            body: [
              ['Nama barang', 'Harga', 'Kuantitas', 'Total'],
              ...this.invoice.products.map(p => ([p.name, p.price, p.qty, (p.price*p.qty).toFixed(2)])),
              
			  [{text: 'Total', colSpan: 3, bold: true}, 
			  {}, 
			  {}, 
			  this.invoice.products.reduce((sum, p)=> sum + (p.qty * p.price), 0).toFixed(2)],
			  
			  [{text: 'Diskon', colSpan: 3, bold: true}, 
			  {}, 
			  {}, 
			  this.invoice.products.reduce((sum, p)=> sum + (p.qty * p.price * p.disc / 100), 0).toFixed(2)],
			  
			  [{text: 'Final', colSpan: 3, bold: true}, 
			  {}, 
			  {}, 
			  this.invoice.products.reduce((sum, p)=> sum + ((p.qty * p.price) - p.qty * p.price * p.disc / 100), 0).toFixed(2)],
            ]
          }
        },
        {
          text: 'Keterangan tambahan',
          style: 'sectionHeader'
        },
        {
            text: this.invoice.additionalDetails,
            margin: [0, 0 ,0, 15]          
        },
        {
          columns: [
            [{ qr: `${this.invoice.customerName}`, fit: '50' }],
            [{ text: 'Hormat Kami', alignment: 'right', italics: true}],
          ]
        },
		{
          columns: [
            
            [{ text: 'Jokowi,', alignment: 'right', italics: true}],
          ]
        },
		{
          columns: [
            
            [{ text: 'Manager Accounting', alignment: 'right', italics: true, bold: true}],
          ]
        },
        {
          text: 'Terms and Conditions',
          style: 'sectionHeader'
        },
        {
            ul: [
              'Garansi dapat diklaim maksimal 10 hari.',
              'Garansi produk tunduk pada syarat dan ketentuan pabrik.',
              'Ini adalah faktur yang dibuat dengan sistem statis.',
            ],
        }
      ],
      styles: {
        sectionHeader: {
          bold: true,
          decoration: 'underline',
          fontSize: 14,
          margin: [0, 15,0, 15]          
        }
      }
    };

    if(action==='download'){
      pdfMake.createPdf(docDefinition).download();
    }else if(action === 'print'){
      pdfMake.createPdf(docDefinition).print();      
    }else{
      pdfMake.createPdf(docDefinition).open();      
    }

  }

  addProduct(){
    this.invoice.products.push(new Product());
  }
  
}
