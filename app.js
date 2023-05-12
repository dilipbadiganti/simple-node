const http = require('http')
const fs = require('fs')

const server = http.createServer((req, res)=>{
    const url = req.url
    const method = req.method

    if (url === '/'){
        res.setHeader('content-Type', 'text/html')
        res.write('<html>')
        res.write('<head><title>Server101</title></head>')
        res.write('<body>')
        res.write('<form action="/message" method="POST">')
        res.write('<input type="text" placeholder="Enter Data" name="data"/>')
        res.write('<button type="submit">Submit</button>')
        res.write('</form>')
        res.write('</body>')
        res.write('</html>')
        return res.end()
    }
    if (url === '/message' && method === 'POST'){

        const body = []
        req.on('data', (chunk)=>{
            console.log(chunk)
            console.log(chunk.toString());
            body.push(chunk)
        })
        req.on('end', ()=>{
            const parseBody = Buffer.concat(body).toString()
            const message = parseBody.split('=')[1];
            fs.writeFileSync('userMessage.txt', message)
        })
        
        res.statusCode = 302
        res.setHeader('Location', '/messenger')
        return res.end()
    }
    res.setHeader('content-Type', 'text/html')
    res.write('<html>')
    res.write('<head>')
    res.write('<body><h1>Homer Noder!!</h1></body>')
    res.write('</html>')
    res.end()
})
const port = 5000
server.listen(port,()=>{
    console.log(`The server is listening on port ${port}`)
})