const reportWebVitals = (onPerfEntry?: any) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import("web-vitals").then((webVitals) => {
      const { onCLS, onFCP, onLCP, onTTFB } = webVitals;

      onCLS(onPerfEntry);
      onFCP(onPerfEntry);
      onLCP(onPerfEntry);
      onTTFB(onPerfEntry);

      if (webVitals.onFID) {
        webVitals.onFID(onPerfEntry);
      }
    });
  }
};

export default reportWebVitals;
