import { Component } from '@angular/core';

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

class Product{
  name: string;
  dtl: string;
  price: number;
  qty: number;
  ppn: number;
  
}
class Invoice{
  customerName: string;
  address: string;
  contactNo: string;
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
	
	header: [
    
      {

          image:
            'data:image/png;base64,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',
          width: 100,
          margin: [40, 15,0, 15], 
   },
],
	footer: 
	 [
	  
	  {
        "margin": [0, 12, 0, 0],
        canvas: [
            {
                type: 'line',
                x1: 25,
                y1: 5,
                x2: 570,
                y2: 5,
                lineWidth: 3
            }
        ]
    },
		
	 ],
  
  
      content: [
	  
	 
    {
      columns: [
	    
		{
			margin: [0,30,5,5],
            width: 150,
			text: [
				
				{text: 'CV. Sinar Wijaya Teknik',  fontSize: 13,bold: true},
				{text: '\nJl. Hayam Wuruk NO 2-5, Gedung Harco Glodok BLok E No. 27, Jakarta Barat.',  fontSize: 9,bold:false},
			],
			
		},
	    
	    [
        {
            text: 'FAKTUR',
            color: '#333333',
            width: '*',
            fontSize: 20,
            bold: true,
            alignment: 'right',
            margin: [0, 0, 0, 15],
         },
         
        
         {
      columns: [
        {
                    text: 'Bill No :',
                    color: '#aaaaab',
                    bold: true,
                    width: '*',
                    fontSize: 10,
                    alignment: 'right',
                  },
                  {
                    text: `${((Math.random() *1000).toFixed(0))}`,
                    bold: true,
                    color: '#333333',
                    fontSize: 10,
                    alignment: 'right',
                    width: 100,
                  },
				  
		
      ],
    },
	
	{
      columns: [
        {
                    text: 'Date :',
                    color: '#aaaaab',
                    bold: true,
                    width: '*',
                    fontSize: 10,
                    alignment: 'right',
                  },
                  {
                    text: `${new Date().toLocaleString('id-ID')}`,
                    bold: true,
                    color: '#333333',
                    fontSize: 10,
                    alignment: 'right',
                    width: 100,
                  },			  
		
      ],
    },  
    
         
         ]
         
         
	    
         
      ],
    },
	
	
        
    {
      columns: [
        {
          text: 'SELLER :',
          color: '#aaaaab',
          bold: true,
          fontSize: 11,
          alignment: 'left',
          margin: [0, 20, 0, 5],
        },
        {
          text: 'BUYER :',
          color: '#aaaaab',
          bold: true,
          fontSize: 11,
          alignment: 'left',
          margin: [0, 20, 0, 5],
        },
      ],
    },
    {
      columns: [
        {
          text: 'CV. Sinar Wijaya Teknik',
          bold: true,
          color: '#333333',
          alignment: 'left',
        },
        {
          text: this.invoice.customerName,
          bold: true,
          color: '#333333',
          alignment: 'left',
        },
      ],
    },
    {
      columns: [
        {
          text: 'TLP :',
          color: '#aaaaab',
          bold: true,
          margin: [0, 7, 0, 3],
        },
        {
          text: 'TLP :',
          color: '#aaaaab',
          bold: true,
          margin: [0, 7, 0, 3],
        },
      ],
    },
    {
      columns: [
        {
          text: '081375816536',
          style: 'invoiceBillingAddress',
        },
        {
          text: this.invoice.contactNo,
          style: 'invoiceBillingAddress',
        },
      ],
    },
	{
      columns: [
        {
          text: 'E-MAIL :',
          color: '#aaaaab',
          bold: true,
          margin: [0, 7, 0, 3],
        },
        {
          text: 'E-MAIL :',
          color: '#aaaaab',
          bold: true,
          margin: [0, 7, 0, 3],
        },
      ],
    },
    {
      columns: [
        {
          text: 'jurus32@gmai.com',
          margin: [0, 0 ,0, 15] 
        },
        {
          text: this.invoice.email,
          margin: [0, 0 ,0, 15] 
        },
      ],
    },
    
	
        {
		  style: 'tableExample',
          table: {			
            headerRows: 1,
            widths: [ '*', 'auto', 'auto', 'auto' ],
            body: [
              ['ITEM NAME', 'UNIT PRICE', 'QTY', 'TOTAL'],
              ...this.invoice.products.map(p => (
			    [
				{text: p.name,style: 'rowMask'},
				(p.price).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }), 
				{text: p.qty,style: 'rowMask'}, 
				(p.price*p.qty).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })]
				)),
              
			  // TOTAL 
			  [{text: 'TOTAL', colSpan: 3, bold: true, fillColor: '#dedede',alignment: 'right',}, 
			  {}, 
			  {}, 
			  this.invoice.products.reduce((sum, p)=> sum + (p.qty * p.price), 0).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })],
			  
			  // PPH 
			  [{text: 'PPN 10%', colSpan: 3, bold: true, fillColor: '#dedede',alignment: 'right',}, 
			  {}, 
			  {}, 
			  this.invoice.products.reduce((sum, p)=> sum + (p.ppn / 100 * p.qty * p.price), 0).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })],
			  
			  // SUB TOTAL
			  [{text: 'GRAND TOTAL', colSpan: 3, bold: true, fillColor: '#dedede',alignment: 'right',}, 
			  {}, 
			  {}, 
			  this.invoice.products.reduce((sum, p)=> sum + ((p.qty * p.price) + p.ppn / 100 * p.qty * p.price), 0).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })],
              			  
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
            
            [{ text: 'JAI PERGAS,', alignment: 'right', italics: true}],
          ]
        },
		{
          columns: [
            
            [{ text: 'Marketing', alignment: 'right', italics: true, bold: true}],
          ]
        },
        {
          text: 'Terms and Conditions',
          style: 'sectionHeader'
        },
        {
            ul: [
              'Harga diatas dihitung dalam Rupiah',
              'Jasa Transportasi : bebas biaya pengiriman di dalam Jakarta, dan akan dikenakan biaya terhadap pembeli untuk pengiriman diluar Jakarta.',
              'Lokasi Pengirim : ditentukan setelah penawaran disetujui',
            ],
			fontSize: 10,
        },
		'\n\n',
   
	
      ],
      styles: {
        sectionHeader: {
          bold: true,
          decoration: 'underline',
		  color: '#000',
          fontSize: 14,
          margin: [0, 15,0, 15],  
          	  
        },
		rowMask: {
		  bold: true,
          alignment: 'center',
		},
		
		 // Document Footer
	    
	    header: {
			fontSize: 18,
			bold: true
		},
		
		tableExample: {
			margin: [0, 5, 0, 15],
			fontSize: 10,
			alignment: 'center',
		},
		
      },
	   
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
