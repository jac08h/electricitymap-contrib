
export function getProductionCo2Intensity(mode, zoneData) {
  const isStorage = mode.indexOf('storage') !== -1;
  const resource = mode.replace(' storage', '');

  const storage = (zoneData.storage || {})[resource];
  const storageCo2Intensity = (zoneData.storageCo2Intensities || {})[resource];
  const dischargeCo2Intensity = (zoneData.dischargeCo2Intensities || {})[resource];
  const productionCo2Intensity = (zoneData.productionCo2Intensities || {})[resource];

  return isStorage
    ? (
      storage > 0
        ? storageCo2Intensity
        : dischargeCo2Intensity
    ) : (
      productionCo2Intensity
    );
}

export function getExchangeCo2Intensity(key, zoneData) {
  const exchangeCo2Intensity = (zoneData.exchangeCo2Intensities || {})[key];

  return exchangeCo2Intensity;
}

export function getTotalElectricity(zoneData, displayByEmissions) {
  return displayByEmissions
    ? (zoneData.totalCo2Production + zoneData.totalCo2Discharge + zoneData.totalCo2Import) // gCO₂eq/h
    : (zoneData.totalProduction + zoneData.totalDischarge + zoneData.totalImport);
}
