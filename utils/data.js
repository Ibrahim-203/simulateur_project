export const data_madagascar_est = {
  inputs: {
    location: { latitude: -18.283, longitude: 48.657, elevation: 1035.0 },
    meteo_data: {
      radiation_db: "PVGIS-SARAH2",
      meteo_db: "ERA-Interim",
      year_min: 2018,
      year_max: 2020,
      use_horizon: true,
      horizon_db: null,
      horizon_data: "DEM-calculated",
    },
    plane: {
      fixed_inclined_optimal: {
        slope: { value: 14, optimal: true },
        azimuth: { value: -180, optimal: false },
      },
    },
  },
  outputs: {
    monthly: [
      { year: 2020, month: 1, "H(i_opt)_m": 148.87, T2m: 20.5 },
      { year: 2020, month: 2, "H(i_opt)_m": 143.79, T2m: 20.5 },
      { year: 2020, month: 3, "H(i_opt)_m": 120.36, T2m: 20.4 },
      { year: 2020, month: 4, "H(i_opt)_m": 111.04, T2m: 18.5 },
      { year: 2020, month: 5, "H(i_opt)_m": 118.85, T2m: 17.3 },
      { year: 2020, month: 6, "H(i_opt)_m": 74.58, T2m: 15.0 },
      { year: 2020, month: 7, "H(i_opt)_m": 79.8, T2m: 13.9 },
      { year: 2020, month: 8, "H(i_opt)_m": 114.77, T2m: 14.4 },
      { year: 2020, month: 9, "H(i_opt)_m": 139.36, T2m: 15.7 },
      { year: 2020, month: 10, "H(i_opt)_m": 145.67, T2m: 18.4 },
      { year: 2020, month: 11, "H(i_opt)_m": 178.12, T2m: 19.5 },
      { year: 2020, month: 12, "H(i_opt)_m": 158.04, T2m: 19.6 },
    ],
  },
  meta: {
    inputs: {
      location: {
        description: "Selected location",
        variables: {
          latitude: { description: "Latitude", units: "decimal degree" },
          longitude: { description: "Longitude", units: "decimal degree" },
          elevation: { description: "Elevation", units: "m" },
        },
      },
      meteo_data: {
        description: "Sources of meteorological data",
        variables: {
          radiation_db: { description: "Solar radiation database" },
          meteo_db: {
            description:
              "Database used for meteorological variables other than solar radiation",
          },
          year_min: { description: "First year of the calculations" },
          year_max: { description: "Last year of the calculations" },
          use_horizon: { description: "Include horizon shadows" },
          horizon_db: { description: "Source of horizon data" },
        },
      },
      plane: {
        description: "plane",
        fields: {
          slope: {
            description: "Inclination angle from the horizontal plane",
            units: "degree",
          },
          azimuth: {
            description:
              "Orientation (azimuth) angle of the (fixed) PV system (0 = S, 90 = W, -90 = E)",
            units: "degree",
          },
        },
      },
    },
    outputs: {
      monthly: {
        type: "time series",
        timestamp: "monthly averages",
        variables: {
          "H(i_opt)_m": {
            description: "Irradiation on optimally inclined plane",
            units: "kWh/m2/mo",
          },
          T2m: {
            description: "24 hour average of temperature",
            units: "degree Celsius",
          },
        },
      },
    },
  },
};
