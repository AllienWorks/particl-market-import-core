import { Import } from '../interfaces';

import { Utils } from '../utils';
import { BaseCSV } from './base_csv';

export class Woocommerce extends BaseCSV implements Import {

	protected importMapping: any = {
    title: 'Name',
    shortDescription: 'Short description',
    longDescription: 'Description',
		category: {
			field: 'Categories',
			translate: async (catagory: string) => {
				return await Utils.searchCategories(catagory);
			}
		},
    basePrice: {
      field: 'Regular price',
      translate: (price: string) => {
        return parseFloat(price) * (1 / this.getimportParam('currency_rate'));
      }
    },
    domesticShippingPrice: undefined,
    internationalShippingPrice: undefined,
    images: {
      field: 'Images',
      translate: async (images: string) => {
        return await Utils.getImagesFromList(images);
      }
    }
  }

	getImportParams() {
		return {
			id: 'woocommerce-import',
			name: 'Woocommerce Import',
			networks: ['mainnet', 'testnet'],
			description: 'Populate the marketplace from a Woocommerce export',
			params: [
				{
					name: 'file',
					type: 'file',
					fileType: '.csv',
					message: 'Woocommerce export file',
					default: '',
					mandatory: true
        },
        {
					name: 'currency_rate',
					type: 'number',
					message: 'Fiat price per PART',
					default: '',
					mandatory: true
				}
			]
		}
	}
}