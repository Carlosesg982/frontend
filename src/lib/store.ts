import { configureStore } from '@reduxjs/toolkit'
import vehicleListSlice from './features/core/vehicule/slice/vehicle-list.slice'
import brandListSlice from './features/core/brand/slice/brand-list.slice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      vehicleList: vehicleListSlice,
      brandList: brandListSlice,
    },
  })
}

// Inferir los tipos `RootState` y `AppDispatch` del propio store
export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']