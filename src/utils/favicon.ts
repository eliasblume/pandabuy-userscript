import { PageType } from '../find-type'

export const favicons = {
    product: 'https://github.com/eliasblume/pandabuy-userscript/raw/master/static/product.ico',
    productFav:
        'https://github.com/eliasblume/pandabuy-userscript/raw/master/static/product_favorite.ico',
    shop: 'https://github.com/eliasblume/pandabuy-userscript/raw/master/static/shop.ico',
    shopFav: 'https://github.com/eliasblume/pandabuy-userscript/raw/master/static/shop_favorite.ico',
}

export const setFavicon = (fav: Boolean, type: PageType) => {
    const link =
        document.querySelector<HTMLLinkElement>("link[rel*='icon']") || document.createElement('link')
    link.type = 'image/x-icon'
    link.rel = 'shortcut icon'
    if (type === PageType.PRODUCT) link.href = fav ? favicons.productFav : favicons.product
    if (type === PageType.SHOP) link.href = fav ? favicons.shopFav : favicons.shop
    document.getElementsByTagName('head')[0].appendChild(link)
}
