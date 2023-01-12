import { findType, PageType } from './find-type'
import product from './pages/product'
import shop from './pages/shop'

;(async () => {
    console.log(process.env.USERSCRIPT_VERSION)
    const pageType = await findType()
    if (pageType === PageType.PRODUCT) await product()
    if (pageType === PageType.SHOP) await shop()
})()

export {}
