export const STATE_KEY = 'apps';

export const ADD_TO_SERVER = `${STATE_KEY}/ADD_TO_SERVER`;
export const REMOVE_FROM_SERVER = `${STATE_KEY}/REMOVE_FROM_SERVER`;

const initialState = [
	{
		id: '1',
		title: 'Hadoop',
		color: '#f707a5'
	},
	{
		id: '2',
		title: 'Rails',
		color: '#3c2dee'
	},
	{
		id: '3',
		title: 'Chronos',
		color: '#01aafd'
	},
	{
		id: '4',
		title: 'Storm',
		color: '#2ce19c'
	}
]

export default function appsReducer (state = initialState, action) {
	return state;
}
