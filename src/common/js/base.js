/* eslint-disable */
import axios from 'axios';
var CryptoJS = require('crypto-js/core');
var AES = require('crypto-js/aes');
var hex_md5 = require('crypto-js/md5');
var ECB = require('crypto-js/mode-ecb');

function axios_post(data, url, completion) {
	// msg.loader();
	console.log(data);
	var con_url = check_url();
	var time = Date.parse(new Date());
	var hash = hex_md5(time + 'hotol');
	var syh_token = sessionStorage.getItem('syh_token');
	if (syh_token === undefined || syh_token === '' || syh_token === null) {
		syh_token = '';
	}
	axios({
		method: 'post',
		url: con_url + url,
		dataType: 'text',
		data: JSON.stringify(data),
		headers: {
			'token': syh_token,
			'version': '1',
			'client_type': '3',
			'Timestamp': time,
			'SignInfo': hash,
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'application/json;charset=UTF-8'
		}
	}).then(function (res) {
		//msg.hide();
		console.log(res);
		completion(res.data);
	}).catch(function (error) {
		// msg.hide();
		console.log(error);
	});
}

function axios_get(data, url, completion) {
	var con_url = check_url();
	var time = Date.parse(new Date());
	var hash = hex_md5(time + 'hotol');
	var syh_token = sessionStorage.getItem('syh_token');
	if (syh_token === undefined || syh_token === '' || syh_token === null) {
		syh_token = '';
	}
	if(data === 'getImageFlow') {
		axios({
			method: 'get',
			url: con_url + url,
			headers: {
				'token': syh_token,
				'version': '1',
				'client_type': '3',
				'Timestamp': time,
				'SignInfo': hash,
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/jsoncharset=UTF-8'
			},
			responseType: 'arraybuffer'
		}).then(res => {
			return 'data:image/png;base64,' + btoa(new Uint8Array(res.data).reduce((data, byte) => data + String.fromCharCode(byte), ''));
		}).then(imgdata => {
			console.log(imgdata);
			completion(imgdata);
		}).catch(error => {
			console.log(error);
		})
	}else {
		axios({
			method: 'get',
			url: con_url + url,
			dataType: 'text',
			params: data,
			headers: {
				'token': syh_token,
				'version': '1',
				'client_type': '3',
				'Timestamp': time,
				'SignInfo': hash,
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/jsoncharset=UTF-8'
			}
		}).then(function (res) {
			console.log(res);
			completion(res.data);
		}).catch(function (error) {
			console.log(error);
		})
	}
}

function check_url () {
	if (location.hostname.indexOf('localhost') !== -1) {
		return '/api';
	} else {
		return '/admin';
	}
}

// 加密
function Encrypt (key, word) {
	var key = CryptoJS.enc.Utf8.parse(key);
	var srcs = CryptoJS.enc.Utf8.parse(word);
	var encrypted = CryptoJS.AES.encrypt(srcs, key, {
		mode: CryptoJS.mode.ECB,
		padding: CryptoJS.pad.Pkcs7
	});
	return encrypted.toString();
}
// 解密
function Decrypt (key, word) {
	var key = CryptoJS.enc.Utf8.parse(key);
	var decrypt = CryptoJS.AES.decrypt(word, key, {
		mode: CryptoJS.mode.ECB,
		padding: CryptoJS.pad.Pkcs7
	});
	return CryptoJS.enc.Utf8.stringify(decrypt).toString();
}

// 转换时间格式
function trans_time (t, type) {
	if (!t) {
		return '';
	}
	var d = new Date(t);
	var y = d.getFullYear();
	var m = d.getMonth() + 1;
	var dd = d.getDate();
	var h = d.getHours();
	var mm = d.getMinutes();
	var s = d.getSeconds();
	if (type === 1) {
		return y + '-' + e(m) + '-' + e(dd);
	} else if (type === 2) {
		return y + '-' + e(m) + '-' + e(dd) + ' ' + e(h) + ':' + e(mm);
	} else if (type === 3) {
		return y + '-' + e(m) + '-' + e(dd) + ' ' + e(h) + ':' + e(mm) + ':' + e(s);
	} else if (type === 4) {
		return y + '年' + e(m) + '月' + e(dd) + '日';
	}
}

function e (t) {
	if (t < 10) {
		return t = '0' + t;
	} else {
		return t;
	}
}

export default {
	axios_post,
	axios_get,
	trans_time,
	Decrypt,
	Encrypt
};
