// const http = 'http://localhost:8080/'

// export async function getLogin(email, password, setError){
//     try{
//         const response = await fetch(`${http}login`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//               },
//             body: JSON.stringify({  
//                  "email": email,
//                  "password": password}),
//               });
//               // console.log(response)
//               if(response.ok){
//                 const datos= await response.json();
//                 return datos 
//               }
//         }catch(err){
//             setError('¡Ups! Algo salío mal. Compruebe sus credenciales')
//         }
//     }
