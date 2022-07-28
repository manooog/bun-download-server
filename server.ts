// http.js
export default {
  // ⚠️ 3000 端口如果被占用的话，程序执行会出错，并且没有一个明确的错误提示。
  port: 3000,
  fetch(request: Request) {
    const url = new URL(request.url)

    const flowersRes = (opt = {}) => new Response(Bun.file("flowers.jpg"), opt)

    if (url.pathname === "/") {
      return flowersRes()
    } else if (url.pathname === "/download") {
      return flowersRes({
        headers: {
          "Content-Disposition": 'attachment; filename="filename.jpg"',
        },
      })
    }
  },
}
