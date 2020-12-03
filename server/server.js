const express = require('express');
const graphqlHTTP = require('express-graphql');
const cors = require('cors');
const { buildSchema } = require('graphql');
const { readFileSync } = require('fs');

// ------------------------------------------------------
// ------------------------------------------------------
// ------------------------------------------------------
// ------------------------------------------------------

const schemaString = readFileSync('./schema.graphql', { encoding: 'utf8' });

const schema = buildSchema(schemaString);

const allBooks = [
	{
		id: '1',
		title: 'Book 1',
		description: 'test description',
		author: {
			id: '1',
			firstName: 'First name',
			lastName: 'Last name'
		}
	},
	{
		id: '2',
		title: 'Book 2',
		description: 'test description',
		author: {
			id: '1',
			firstName: 'First name',
			lastName: 'Last name'
		}
	},
	{
		id: '3',
		title: 'Book 3',
		description: 'test description',
		author: {
			id: '1',
			firstName: 'First name',
			lastName: 'Last name'
		}
	},
	{
		id: '4',
		title: 'Book 4',
		description: 'test description',
		author: {
			id: '1',
			firstName: 'First name',
			lastName: 'Last name'
		}
	},
	{
		id: '5',
		title: 'Book 5',
		description: 'test description',
		author: {
			id: '1',
			firstName: 'First name',
			lastName: 'Last name'
		}
	},
];

const root = {
	getAllBooks: () => {
		return allBooks;
	},
	getBook: params => {
		return allBooks.find(({ id }) => params.id === id);
	},
	addBook: params => {
		allBooks.push({
			id: allBooks.length + 1,
			...params.book,
			author: {
				id: '1',
				firstName: 'first name stub',
				lastName: 'last name stub'
			}
		});

		return true;
	}
};

// ------------------------------------------------------
// ------------------------------------------------------
// ------------------------------------------------------
// ------------------------------------------------------

const app = express();

app.use(cors());

app.use(
	'/graphql',
	graphqlHTTP({
		schema: schema,
		rootValue: root,
		graphiql: true
	})
);

app.listen(6006);

console.log('Running a GraphQL API server at http://localhost:6006/graphql');
