import { findType, PageType } from './find-type'
import product from './pages/product'
;(async () => {
    console.log(process.env.USERSCRIPT_VERSION)
    const pageType = await findType()
    if (pageType === PageType.PRODUCT) await product()
})()

export {}
