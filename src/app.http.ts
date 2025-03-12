import fs from 'fs';
import http from 'http';

const server = http.createServer((req, res) => {
    
    // console.log(req.url);

    // res.write('hola');
    // res.end();

    // res.writeHead(200, {'Content-Type': 'text/html'});
    // res.write('<h1>hola</h1>');
    // res.end();

    // const data = { name: 'Jhon Doe', age: 30, city: 'New York' };
    // res.writeHead(200, {'Content-Type': 'application/json'});
    // res.write(JSON.stringify(data));

    if( req.url === '/' ) {
        const htmlFile = fs.readFileSync('./public/index.html', 'utf-8');
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end( htmlFile );
        return;
    }
    // } else {
    //     res.writeHead(404, {'Content-Type': 'text/html'});
    //     res.end( '<h1>404</h1>' );
    // }


    if( req.url?.endsWith('.js') ) {
        res.writeHead(200, {'Content-Type': 'application/javascript'});
    } else if( req.url?.endsWith('.css') ) {
        res.writeHead(200, {'Content-Type': 'text/css'});
    }

    const responseContent = fs.readFileSync(`./public${req.url}`, 'utf-8');
    res.end( responseContent );



});


server.listen(3000, () => {
    console.log('listening on port 3000');
});