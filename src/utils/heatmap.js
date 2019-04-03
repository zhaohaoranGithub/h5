import heatMap from '../../heatmap.json';

const getHeatMapConfig = (hostname) => {
  return _.find(heatMap, (config) => {
    return config.hostname.indexOf(hostname) !== -1;
  });
};

const heatMapConfig = getHeatMapConfig(window.location.hostname);

if (heatMapConfig) {
  (function (h, o, t, j, a, r) {
    h.hj = h.hj || function () {
      (h.hj.q = h.hj.q || []).push(arguments);
    };
    h._hjSettings = {hjid: heatMapConfig.hjid, hjsv: 6};
    a = o.getElementsByTagName('head')[0];
    r = o.createElement('script');
    r.async = 1;
    r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
    a.appendChild(r);
  })(window, document, 'https://static.hotjar.com/c/hotjar-', '.js?sv=');
}

