// http.js
export default {
  // ⚠️ 3000 端口如果被占用的话，程序执行会出错，并且没有一个明确的错误提示。
  port: 3000,
  fetch(request: Request) {
    const url = new URL(request.url)

    const flowersRes = (opt = {}) => new Response(Bun.file("flowers.jpg"), opt)
    const jsonRes = (headers = {}) =>
      new Response(JSON.stringify({ name: "flowser" }), {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          ...headers,
        },
      })

    if (url.pathname === "/img") {
      return flowersRes()
    } else if (url.pathname === "/img/download") {
      return flowersRes({
        headers: {
          "Content-Disposition": 'attachment; filename="filename.jpg"',
        },
      })
    }

    if (url.pathname === "/json") {
      return jsonRes()
    } else if (url.pathname === "/json/download") {
      return jsonRes({
        "Content-Disposition": 'attachment; filename="filename.json"',
      })
    }
  },
}
