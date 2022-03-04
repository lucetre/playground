export default async (req, res) => {
    let url = process.env.NODE_ENV === 'development' ? "http://localhost:3000" : "https://lucetre.vercel.app";
    const playlist = await fetch(`${url}/api/playlist`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
    }).then((resp) => resp.json());

    const id = parseInt(req.query.id);
    res.status(200).json({ Src: playlist[id] });
}