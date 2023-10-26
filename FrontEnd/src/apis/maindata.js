const getdata = async() =>{
const url = "http://localhost:3030/getall"
const options = {
	method: 'GET',
	
};

try {
	const response = await fetch(url, options);
	const result = await response.json();
	return result
} catch (error) {
	console.error(error);
}}

export default getdata