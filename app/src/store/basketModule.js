export const basketModule = {
    state: () => ({
        basket_cells: []
    }),
    getters: {
        
    },
    mutations: {
        basket_cells_set(state, basket_cells) {
            if(basket_cells) {
                state.basket_cells = basket_cells
                
                localStorage.setItem('basket_cells',JSON.stringify(basket_cells))
            }
        }
    },
    actions: {
        
    },
    namespaced: true
}