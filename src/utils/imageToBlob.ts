export const imageToBlob = async (url: string) => {
    const blob: Blob = await new Promise((resolve) => {
        var req = new XMLHttpRequest()
        req.open('GET', url, true)
        req.responseType = 'blob'
        req.onload = function (event) {
            console.log(url)
            resolve(req.response)
        }
        req.send()
    })
    return URL.createObjectURL(blob)
}
