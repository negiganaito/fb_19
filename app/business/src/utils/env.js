const env = {
  ajaxpipe_token: null,
  compat_iframe_token: null,
  iframeKey: '',
  iframeTarget: '',
  iframeToken: '',
  isCQuick: !1,
  jssp_header_sent: !1,
  jssp_targeting_enabled: !1,
  loadHyperion: !1,
  start: Date.now(),
  nocatch: !1,
  useTrustedTypes: !1,
  isTrustedTypesReportOnly: !1,
  enableDefaultTrustedTypesPolicy: !1,
  ig_server_override: '',
  barcelona_server_override: '',
  ig_mqtt_wss_endpoint: '',
  ig_mqtt_polling_endpoint: '',
};

window.Env && Object.assign(env, window.Env);
window.Env = env;

export { env };
