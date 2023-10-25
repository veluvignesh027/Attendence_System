const postdata = (data) => {
fetch('localhost:3030', {
  method: 'POST',
  body: JSON.stringify({
    ...data
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})  
  .then((response) => response.json())
  .then((json) => console.log(json))}
  
export default postdata