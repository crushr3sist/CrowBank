import swaggerJsdoc from "swagger-jsdoc";

const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "CrowBank v_stable",
			version: "1.0.0",
			description: "Restful API built in express ",
		},
	},
	apis: ["./src/**/*.ts"], // Adjust the path based on your project structure
};

const specs = swaggerJsdoc(options);

export { options, specs };
