import { waitOnElem } from './utils/wait'

export enum PageType {
    PRODUCT,
    SHOP,
}
export const findType = async (): Promise<PageType> => {
    const product = await waitOnElem('#app > div.goods-detail, #app > div > div.shop-detail')
    if (product.classList.contains('goods-detail')) {
        return PageType.PRODUCT
    } else if (product.classList.contains('shop-detail')) {
        return PageType.SHOP
    }
}
