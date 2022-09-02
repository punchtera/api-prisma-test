import app from './app';

const port = 8088;

app.listen(port, () => {
    console.log(`running application at http://localhost:${port}`);
});