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
				{text: '\nPerumahan Permata Regensi Jln. Mutiara Barat No 01, Kota Cikampek, Kab. karawang.',  fontSize: 9,bold:false},
			],
			
		},
	    
	    [
        {
            text: 'FAKTUR1',
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
          text: 'Your Company Inc.',
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
          text: '+62823423483',
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
