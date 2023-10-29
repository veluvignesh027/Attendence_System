const postdata = (data) => {
fetch('http://localhost:3030/save', {
  method: 'POST',
  mode:'no-cors',
  body: JSON.stringify(
    data,
    null
  ),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
    'Host':'http://localhost:3000'
  },
})  
}
export default postdata