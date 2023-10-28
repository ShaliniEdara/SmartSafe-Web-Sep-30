import { StoreResponse } from "./storeResponse";

export class Corp{
    id:number;

	corpName:string;

	description:string;
	
	status:boolean;
     
     active: boolean;
	 streetName:string;

	  cityName:string;

	  zipCode:string;

	  stateName:string;
	  
	  storeInfoResponse:StoreResponse[];

	  locations:number;
	  
	  storeInfoId:number[];

	  todayInsertBillsAmount:number;

	  allCorpsTodayInsertBillsAmount:number;



}