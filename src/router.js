import Vue from 'vue';
import Router from 'vue-router';
import organization from '@/components/data-center/organization';
import payConfig from '@/components/data-center/payConfig';
import logisticsConfig from '@/components/data-center/logisticsConfig';
import areaConfig from '@/components/data-center/areaConfig';
import terminalConfig from '@/components/data-center/terminalConfig';
import advertisingConfig from '@/components/data-center/advertisingConfig';
import slideshowConfig from '@/components/data-center/slideshowConfig';
import provinceConfig from '@/components/data-center/provinceConfig';
import goodsClassifyConfig from '@/components/data-center/goodsClassifyConfig';
import invoiceTypeConfig from '@/components/data-center/invoiceTypeConfig';
import tradeTypeConfig from '@/components/data-center/tradeTypeConfig';
import projectClassifyConfig from '@/components/data-center/projectClassifyConfig';
import partner from '@/components/data-center/partner';
import link from '@/components/data-center/link';
import information from '@/components/data-center/information';
import editInformation from '@/components/data-center/editInformation';
import showInformation from '@/components/data-center/showInformation';
import administratorList from '@/components/user-center/administratorList';
import emailUserList from '@/components/user-center/emailUserList';
import emailGoods from '@/components/goods-center/emailGoods';
import emailAssess from '@/components/goods-center/emailAssess';
import editEmailAssess from '@/components/goods-center/editEmailAssess';
import viewAssessState from '@/components/goods-center/viewAssessState';
import emailProjectTrends from '@/components/goods-center/emailProjectTrends';
import addEmailProject from '@/components/goods-center/addEmailProject';
import viewProjectTrends from '@/components/goods-center/viewProjectTrends';
import viewProjectDetail from '@/components/goods-center/viewProjectDetail';

Vue.use(Router);

export default new Router({
	routes: [
		{
			path: '/',
			component: projectClassifyConfig
		},
		{
			path: '/index',
			name: 'index',
			component: projectClassifyConfig
		},
		{
			path: '/organization',
			name: 'organization',
			component: organization
		},
		{
			path: '/payConfig',
			name: 'payConfig',
			component: payConfig
		},
		{
			path: '/logisticsConfig',
			name: 'logisticsConfig',
			component: logisticsConfig
		},
		{
			path: '/areaConfig',
			name: 'areaConfig',
			component: areaConfig
		},
		{
			path: '/terminalConfig',
			name: 'terminalConfig',
			component: terminalConfig
		},
		{
			path: '/advertisingConfig',
			name: 'advertisingConfig',
			component: advertisingConfig
		},
		{
			path: '/slideshowConfig',
			name: 'slideshowConfig',
			component: slideshowConfig
		},
		{
			path: '/provinceConfig',
			name: 'provinceConfig',
			component: provinceConfig
		},
		{
			path: '/goodsClassifyConfig',
			name: 'goodsClassifyConfig',
			component: goodsClassifyConfig
		},
		{
			path: '/invoiceTypeConfig',
			name: 'invoiceTypeConfig',
			component: invoiceTypeConfig
		},
		{
			path: '/tradeTypeConfig',
			name: 'tradeTypeConfig',
			component: tradeTypeConfig
		},
		{
			path: '/projectClassifyConfig',
			name: 'projectClassifyConfig',
			component: projectClassifyConfig
		},
		{
			path: '/partner',
			name: 'partner',
			component: partner
		},
		{
			path: '/link',
			name: 'link',
			component: link
		},
		{
			path: '/information',
			name: 'information',
			component: information
		},
		{
			path: '/editInformation/:id?',
			name: 'editInformation',
			component: editInformation,
			props: true
		},
		{
			path: '/showInformation/:id',
			name: 'showInformation',
			component: showInformation,
			props: true
		},
		{
			path: '/administratorList',
			name: 'administratorList',
			component: administratorList
		},
		{
			path: '/emailUserList',
			name: 'emailUserList',
			component: emailUserList
		},
		{
			path: '/emailGoods',
			name: 'emailGoods',
			component: emailGoods
		},
		{
			path: '/emailAssess',
			name: 'emailAssess',
			component: emailAssess
		},
		{
			path: '/editEmailAssess/:id?',
			name: 'editEmailAssess',
			component: editEmailAssess,
			props: true
		},
		{
			path: '/viewAssessState/:id',
			name: 'viewAssessState',
			component: viewAssessState,
			props: true
		},
		{
			path: '/emailProjectTrends',
			name: 'emailProjectTrends',
			component: emailProjectTrends
		},
		{
			path: '/addEmailProject',
			name: 'addEmailProject',
			component: addEmailProject
		},
		{
			path: '/viewProjectTrends/:id',
			name: 'viewProjectTrends',
			component: viewProjectTrends,
			props: true
		},
		{
			path: '/viewProjectDetail/:id',
			name: 'viewProjectDetail',
			component: viewProjectDetail,
			props: true
		}
	]
});
