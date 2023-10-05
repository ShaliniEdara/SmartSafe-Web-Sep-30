import { LongDateFormatKey } from "moment";

export class StoreInfoRequest {
	  id:number;

	  storeName:string;

	  corpStoreNo:string;

	  serialNumber:string;

	  address:string;

	  streetName:string;

	  cityName:string;

	  zipCode:string;

	  stateName:string;

	  bankName:string;

	  accountNumber:string;

	  minimumBalance:DoubleRange;

	  configured:boolean;

	  status:boolean;


	  startTime: string;

	  endTime: string;

	  role:string;

	  users:string;

	  userIds:number;

	  crop:string;



}
