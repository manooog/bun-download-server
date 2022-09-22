const fileRes = (path = "", opt = {}) => new Response(Bun.file(path), opt)
const jsonRes = (headers = {}) =>
  new Response(JSON.stringify({ name: "flowser" }), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...headers,
    },
  })

// http.js
export default {
  // ⚠️ 3005 端口如果被占用的话，程序执行会出错，并且没有一个明确的错误提示。
  port: 3005,
  fetch(request: Request) {
    const url = new URL(request.url)

    if (url.pathname === "/img") {
      return fileRes("flowers.jpeg")
    } else if (url.pathname === "/img/download") {
      return fileRes("flowers.jpeg", {
        headers: {
          "Content-Disposition": 'attachment; filename="flowers.jpeg"',
        },
      })
    }

    if (url.pathname === "/json") {
      return jsonRes()
    } else if (url.pathname === "/json/download") {
      return jsonRes({
        "Content-Disposition": 'attachment; filename="json.json"',
      })
    }

    if (url.pathname === "/download") {
      return fileRes("index.html")
    }

    if (url.pathname === "/stream") {
      return fileRes("stream.html")
    }
  },
}
