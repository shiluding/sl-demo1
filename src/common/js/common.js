import OSS from 'ali-oss';
let prefixFileName = ''; // 正式打包使用'proFile/'
if (location.hostname.indexOf('localhost') === -1 && location.hostname.indexOf('test') === -1) {
	prefixFileName = 'proFile/';
} else {
	prefixFileName = 'testFile/';
}

function client () {
	let client = new OSS({
		region: 'oss-cn-hangzhou',
		endpoint: 'oss-cn-hangzhou.aliyuncs.com',
		accessKeyId: 'UHjE2busSVGd5WZg',
		accessKeySecret: 'SIYLyYodtLrJVajliRRoIWmiV9B5EX',
		bucket: 'easymore'
	});
	return client;
}

function trim (str) {
	return str.replace(/(^\s*)|(\s*$)/g, '');
}

function limitStr (str, n) {
	if (str.length <= n) {
		return str;
	}
	return str.substr(0, n) + '...';
}

export {
	client,
	prefixFileName,
	trim,
	limitStr
};
