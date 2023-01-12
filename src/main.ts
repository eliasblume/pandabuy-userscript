import { findType, PageType } from './find-type'
import product from './pages/product'
;(async () => {
    console.log(process.env.USERSCRIPT_VERSION)
    const pageType = await findType()
    if (pageType === PageType.PRODUCT) {
        console.log('Product page')
        await product()
    }
})()

export {}
