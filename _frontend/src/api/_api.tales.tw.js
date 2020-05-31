const api_base = 'https://api.tales.tw';

const getPixivUser = userID => fetch(`${api_base}/fetch/v1/pixiv-user/${userID}`,{
  method: 'post',
  // headers: {},
  // body: {},
}).then( res => res.json() );

export default {
  getPixivUser
}

/* 
	fetch('http://localhost/bloglance/ft',{
		method: 'post',
		headers: {
			'token': 'pc_887561e990b0894133d8a7bbc40f2b',
		},
		body: (()=>{
			let body_data = new FormData();
				body_data.append('version', '1.2');
				body_data.append('page', 1);
			return body_data;
		})()
	}).then(res=>{console.log('res',res.json());})
*/