const DownLoad = () => import( /* webpackChunkName: "download-download" */ '@/views/pages/download/download');
export default [{
  path: '/download',
  component: DownLoad,
  meta: {
    title: "下载",
    noNeedCheckLogin: true,
  },
  children: [
    {
      path: '*',
      redirect: '/download'
    }
  ]
},

];
