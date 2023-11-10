interface IUser {
	id: any;
	username: string;
	password: string;
	email: string;
	firstName: string;
	lastName: string;
	address: string;
}

interface IAuth {
	email: string;
	password: string;
}

interface IRecord extends IAuth {
	id: string;
	email: string;
}

export { IUser, IAuth, IRecord };
