const api_base = 'https://api.tales.tw';

// 取得 pixiv 使用者資料
const getPixivUserData = userID => fetch(`${api_base}/fetch/v1/pixiv-user/${userID}`,{
  method: 'post',
}).then( res => res.json() )
.then( ({ illusts, mangas, profile, update }) => ({ 
	illusts: Object.values(illusts).reverse(), 
	mangas: Object.values(mangas).reverse(), 
	profile, update
}) );

const getPlurkPost = userName => fetch(`${api_base}/fetch/v1/plurk/${userName}/profile`,{
  method: 'post',
}).then( res => res.json() );

const getPlurkProfile = userName => fetch(`${api_base}/fetch/v1/plurk/${userName}/profile`,{
  method: 'post',
}).then( res => res.json() );

export default {
  getPixivUserData,
	getPlurkPost,
	getPlurkProfile,
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