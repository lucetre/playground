export default (req, res) => {
    return new Promise((resolve, reject) => {
        let url = process.env.NODE_ENV === 'development' ? "http://localhost:3000" : "https://lucetre.vercel.app";
        const https = process.env.NODE_ENV === 'development' ? require('http') : require('https');
        https.get(`${url}/music-player/music.json`, resp => {
            let data = "";
            resp.on('data', chunk => { data += chunk }) 
            resp.on('end', () => {
                res.status(200).json(data);
                resolve();
            })
        });
    });
}