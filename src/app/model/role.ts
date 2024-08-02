export class Role{
    id:number;

	name:string;

	firstname:string;

	description:string;

	webModule:string[];

	features:string[];
	
	active:boolean;
	
  permissions: any;

  additionalPermissions: { [key: string]: boolean };


}