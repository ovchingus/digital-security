/**
 * Actions
 */
export const OPEN_MODAL = 'OPEN_MODAL'
export const CLOSE_MODAL = 'CLOSE_MODAL'

export const openModal = (data) => ({
  type: OPEN_MODAL,
  data
})

export const closeModal = () => ({
  type: CLOSE_MODAL
})
