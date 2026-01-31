import { configureStore } from '@reduxjs/toolkit'
import vehicleListSlice from './features/core/vehicule/slice/vehicle-list.slice'
import vehicleCreateSlice from './features/core/vehicule/slice/vehicle-create.slice'
import brandListSlice from './features/core/brand/slice/brand-list.slice'
import modelListSlice from './features/core/model/slice/model-list.slice'
import vehicleDeleteSlice from './features/core/vehicule/slice/vehicle-delete.slice'
import vehicleUpdateSlice from './features/core/vehicule/slice/vehicle-update.slice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      vehicleList: vehicleListSlice,
      brandList: brandListSlice,
      modelList: modelListSlice,
      vehicleCreate: vehicleCreateSlice,
      vehicleUpdate: vehicleUpdateSlice,
      vehicleDelete: vehicleDeleteSlice,
    },
  })
}

// Inferir los tipos `RootState` y `AppDispatch` del propio store
export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']